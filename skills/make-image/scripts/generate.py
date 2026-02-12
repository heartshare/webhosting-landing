#!/usr/bin/env python3
"""
ModelScope Image Generation Script
Generates images using ModelScope's API with async task polling.
Simple mode: generates image, sends to Telegram, shows prompt and path only.

Usage:
    python generate.py --prompt "A golden cat" --output result.jpg [--model MODEL] [--api-key KEY]

Environment:
    MODELSCOPE_API_KEY: API key for ModelScope (optional, can use --api-key)
    TELEGRAM_BOT_TOKEN: Telegram bot token (required for --send flag)
"""

import argparse
import os
import sys
import time
import json
import requests
from PIL import Image
from io import BytesIO

BASE_URL = "https://api-inference.modelscope.cn/"
DEFAULT_MODEL = "Tongyi-MAI/Z-Image-Turbo"


def send_to_telegram(image_path: str, chat_id: str, quiet: bool = True) -> bool:
    """
    Send image to Telegram via bot API.

    Args:
        image_path: Path to image file
        chat_id: Telegram chat ID to send to
        quiet: Suppress output messages

    Returns:
        True if sent successfully, False otherwise
    """
    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN")
    if not bot_token:
        if not quiet:
            print("⚠️  TELEGRAM_BOT_TOKEN not set, cannot send to Telegram")
        return False

    if not os.path.exists(image_path):
        if not quiet:
            print(f"⚠️  Image not found: {image_path}")
        return False

    try:
        url = f"https://api.telegram.org/bot{bot_token}/sendPhoto"
        with open(image_path, 'rb') as photo:
            files = {'photo': photo}
            data = {'chat_id': chat_id}
            response = requests.post(url, files=files, data=data)

        if response.status_code == 200:
            if not quiet:
                print(f"✅ Image sent to Telegram chat {chat_id}")
            return True
        else:
            if not quiet:
                print(f"⚠️  Failed to send to Telegram: {response.text}")
            return False
    except Exception as e:
        if not quiet:
            print(f"⚠️  Error sending to Telegram: {e}")
        return False


def generate_image(
    prompt: str,
    output_path: str,
    model: str = DEFAULT_MODEL,
    api_key: str = None,
    loras: str | dict | None = None,
    quiet: bool = True,
) -> str:
    """
    Generate an image using ModelScope API.

    Args:
        prompt: Text prompt for image generation
        output_path: Path to save the generated image
        model: ModelScope model ID
        api_key: ModelScope API key (falls back to MODELSCOPE_API_KEY env var)
        loras: Optional LoRA configuration (string or dict)
        quiet: Suppress output messages

    Returns:
        Path to the saved image

    Raises:
        ValueError: If no API key provided
        RuntimeError: If image generation fails
    """
    api_key = api_key or os.environ.get("MODELSCOPE_API_KEY")
    if not api_key:
        raise ValueError("API key required. Set MODELSCOPE_API_KEY env var or use --api-key")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": model,
        "prompt": prompt,
    }

    if loras:
        payload["loras"] = loras

    # Submit async task
    response = requests.post(
        f"{BASE_URL}v1/images/generations",
        headers={**headers, "X-ModelScope-Async-Mode": "true"},
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
    )
    response.raise_for_status()
    task_id = response.json()["task_id"]

    if not quiet:
        print(f"Task submitted: {task_id}")

    # Poll for result
    max_attempts = 60  # 5 minutes max
    for attempt in range(max_attempts):
        result = requests.get(
            f"{BASE_URL}v1/tasks/{task_id}",
            headers={**headers, "X-ModelScope-Task-Type": "image_generation"},
        )
        result.raise_for_status()
        data = result.json()

        status = data.get("task_status", "UNKNOWN")
        if not quiet:
            print(f"Status: {status} (attempt {attempt + 1}/{max_attempts})")

        if status == "SUCCEED":
            image_url = data["output_images"][0]
            image_response = requests.get(image_url)
            image_response.raise_for_status()

            image = Image.open(BytesIO(image_response.content))
            image.save(output_path)
            if not quiet:
                print(f"Image saved: {output_path}")
            return output_path

        elif status == "FAILED":
            error_msg = data.get("message", "Unknown error")
            raise RuntimeError(f"Image generation failed: {error_msg}")

        time.sleep(5)

    raise RuntimeError("Timeout waiting for image generation")


def main():
    parser = argparse.ArgumentParser(
        description="Generate images using ModelScope API"
    )
    parser.add_argument(
        "--prompt", "-p",
        required=True,
        help="Text prompt for image generation"
    )
    parser.add_argument(
        "--output", "-o",
        default="result_image.jpg",
        help="Output image path (default: result_image.jpg)"
    )
    parser.add_argument(
        "--model", "-m",
        default=DEFAULT_MODEL,
        help=f"ModelScope model ID (default: {DEFAULT_MODEL})"
    )
    parser.add_argument(
        "--api-key", "-k",
        help="ModelScope API key (or set MODELSCOPE_API_KEY env var)"
    )
    parser.add_argument(
        "--lora", "-l",
        help="LoRA repo ID (optional)"
    )
    parser.add_argument(
        "--lora-config",
        help="JSON file with LoRA config for multiple LoRAs"
    )
    parser.add_argument(
        "--send",
        help="Send image to Telegram chat ID after generation (requires TELEGRAM_BOT_TOKEN env var)"
    )
    parser.add_argument(
        "--quiet", "-q",
        action="store_true",
        help="Show only prompt and path, suppress all other output"
    )

    args = parser.parse_args()

    # Handle LoRA configuration
    loras = None
    if args.lora:
        loras = args.lora
    elif args.lora_config:
        with open(args.lora_config) as f:
            loras = json.load(f)

    try:
        # Generate image (quiet mode by default)
        generate_image(
            prompt=args.prompt,
            output_path=args.output,
            model=args.model,
            api_key=args.api_key,
            loras=loras,
            quiet=args.quiet,
        )

        # Send to Telegram if requested
        if args.send:
            if not args.quiet:
                print("\n📤 Sending to Telegram...")
            send_to_telegram(args.output, args.send, quiet=args.quiet)

        # Show summary (only in non-quiet mode)
        if not args.quiet:
            print("\n" + "="*60)
            print("📊 Image Generated")
            print("="*60)
            print(f"Prompt: {args.prompt}")
            print(f"Path:   {args.output}")

            # Show file size
            if os.path.exists(args.output):
                file_size = os.path.getsize(args.output)
                file_size_kb = file_size / 1024
                print(f"Size:   {file_size_kb:.1f} KB")

    except Exception as e:
        if not args.quiet:
            print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
