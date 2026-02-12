#!/usr/bin/env python3
"""
ModelScope Image Generation Script
Generates images using ModelScope's API with async task polling.

Usage:
    python generate.py --prompt "A golden cat" --output result.jpg [--model MODEL] [--api-key KEY]

Environment:
    MODELSCOPE_API_KEY: API key for ModelScope (optional, can use --api-key)
"""

import argparse
import os
import sys
import time
import json
import requests
import subprocess
from PIL import Image
from io import BytesIO

BASE_URL = "https://api-inference.modelscope.cn/"
DEFAULT_MODEL = "Tongyi-MAI/Z-Image-Turbo"


def generate_image(
    prompt: str,
    output_path: str,
    model: str = DEFAULT_MODEL,
    api_key: str = None,
    loras: str | dict | None = None,
) -> str:
    """
    Generate an image using ModelScope API.

    Args:
        prompt: Text prompt for image generation
        output_path: Path to save the generated image
        model: ModelScope model ID
        api_key: ModelScope API key (falls back to MODELSCOPE_API_KEY env var)
        loras: Optional LoRA configuration (string or dict)

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
        print(f"Status: {status} (attempt {attempt + 1}/{max_attempts})")

        if status == "SUCCEED":
            image_url = data["output_images"][0]
            image_response = requests.get(image_url)
            image_response.raise_for_status()

            image = Image.open(BytesIO(image_response.content))
            image.save(output_path)
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
        "--describe", "-d",
        action="store_true",
        help="Describe the generated image after creation"
    )
    parser.add_argument(
        "--language", "-l",
        default="zh",
        choices=["en", "zh"],
        help="Description language (en=English, zh=Chinese, default: zh)"
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
        generate_image(
            prompt=args.prompt,
            output_path=args.output,
            model=args.model,
            api_key=args.api_key,
            loras=loras,
        )

        # Describe image if requested
        if args.describe:
            script_dir = os.path.dirname(os.path.abspath(__file__))
            describe_script = os.path.join(script_dir, "describe.py")

            if os.path.exists(describe_script):
                print("\n📝 Generating image description...")
                subprocess.run([
                    sys.executable,
                    describe_script,
                    "--image", args.output,
                    "--language", args.language
                ], check=True)
            else:
                print(f"\n⚠️  Warning: describe.py not found, skipping description")

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
