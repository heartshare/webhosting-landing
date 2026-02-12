#!/usr/bin/env python3
"""
Image Description Script
Describes generated images using vision AI models.

Usage:
    python describe.py --image path/to/image.jpg [--model MODEL] [--api-key KEY]
"""

import argparse
import os
import sys
import base64
import requests

# Default vision model - using a compatible API
DEFAULT_MODEL = "gpt-4o-mini"  # OpenAI GPT-4 Vision compatible
VISION_API_BASE = "https://api.openai.com/v1/chat/completions"


def encode_image(image_path: str) -> str:
    """Encode image to base64."""
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')


def describe_image(
    image_path: str,
    model: str = DEFAULT_MODEL,
    api_key: str = None,
    language: str = "en"
) -> str:
    """
    Describe an image using vision AI.

    Args:
        image_path: Path to the image file
        model: Vision model to use
        api_key: API key for the vision service
        language: Description language (en, zh, etc.)

    Returns:
        Image description text

    Raises:
        ValueError: If no API key provided or image not found
        RuntimeError: If description fails
    """
    api_key = api_key or os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("API key required. Set OPENAI_API_KEY env var or use --api-key")

    if not os.path.exists(image_path):
        raise ValueError(f"Image not found: {image_path}")

    # Encode image
    base64_image = encode_image(image_path)

    # Set language-specific prompt
    if language == "zh":
        system_prompt = "你是一个专业的图像描述助手。请详细、准确地描述这张图片的内容，包括场景、物体、颜色、风格等细节。"
        user_prompt = "请描述这张图片"
    else:
        system_prompt = "You are a professional image description assistant. Provide a detailed, accurate description of this image, including scene, objects, colors, style, and other details."
        user_prompt = "Please describe this image"

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    payload = {
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": user_prompt
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        }
                    }
                ]
            }
        ],
        "max_tokens": 500
    }

    response = requests.post(VISION_API_BASE, headers=headers, json=payload)
    response.raise_for_status()

    result = response.json()
    description = result["choices"][0]["message"]["content"]

    return description


def main():
    parser = argparse.ArgumentParser(
        description="Describe images using AI vision models"
    )
    parser.add_argument(
        "--image", "-i",
        required=True,
        help="Path to the image file to describe"
    )
    parser.add_argument(
        "--model", "-m",
        default=DEFAULT_MODEL,
        help=f"Vision model to use (default: {DEFAULT_MODEL})"
    )
    parser.add_argument(
        "--api-key", "-k",
        help="API key for the vision service (or set OPENAI_API_KEY env var)"
    )
    parser.add_argument(
        "--language", "-l",
        default="en",
        choices=["en", "zh"],
        help="Description language (en=English, zh=Chinese)"
    )

    args = parser.parse_args()

    try:
        description = describe_image(
            image_path=args.image,
            model=args.model,
            api_key=args.api_key,
            language=args.language
        )

        print("\n" + "="*60)
        print("📸 Image Description")
        print("="*60)
        print(f"\n{description}\n")
        print("="*60 + "\n")

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
