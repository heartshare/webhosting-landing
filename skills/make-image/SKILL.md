---
name: make-image
description: >
  Generate AI images using ModelScope's API (Tongyi-MAI/Z-Image-Turbo and other models).
  Automatically describe generated images with vision AI. Supports LoRA fine-tuning and async generation.
  Use when the user asks to generate, create, or produce AI images, artwork, or visual content.
  Triggers: generate image, create image, AI image, draw, make picture, ModelScope image.
---

# ModelScope Image Generation

Generate AI images using ModelScope's inference API with async task polling. Automatically describe generated images after creation.

## Quick Start

```bash
# Set API key (one-time)
export MODELSCOPE_API_KEY="your-api-key"

# Generate an image
python scripts/generate.py --prompt "A golden cat sitting on a cloud" --output cat.jpg
```

## Usage

### Basic Generation

```bash
python scripts/generate.py \
  --prompt "A serene Japanese garden with cherry blossoms" \
  --output garden.jpg
```

### With Custom Model

```bash
python scripts/generate.py \
  --prompt "A futuristic city skyline" \
  --output city.jpg \
  --model "your-model-id"
```

### With LoRA

Single LoRA:
```bash
python scripts/generate.py \
  --prompt "A cat in anime style" \
  --output anime_cat.jpg \
  --lora "your-lora-repo-id"
```

Multiple LoRAs (create a JSON file first):
```json
{
  "lora-repo-1": 0.6,
  "lora-repo-2": 0.4
}
```

```bash
python scripts/generate.py \
  --prompt "A stylized portrait" \
  --output portrait.jpg \
  --lora-config loras.json
```

### With Auto-Description (Recommended)

Generate and automatically describe the image:

```bash
python scripts/generate.py \
  --prompt "A futuristic city at sunset" \
  --output city.jpg \
  --describe \
  --language zh
```

Generate with English description:

```bash
python scripts/generate.py --prompt "A golden cat" --output cat.jpg --describe --language en
```

### Standalone Image Description

Describe an existing image:

```bash
python scripts/describe.py --image path/to/image.jpg --language zh
```

## Arguments

| Argument | Short | Required | Default | Description |
|----------|-------|----------|---------|-------------|
| `--prompt` | `-p` | Yes | - | Text prompt for image generation |
| `--output` | `-o` | No | `result_image.jpg` | Output file path |
| `--model` | `-m` | No | `Tongyi-MAI/Z-Image-Turbo` | ModelScope model ID |
| `--api-key` | `-k` | No | `MODELSCOPE_API_KEY` env | API key |
| `--lora` | `-l` | No | - | Single LoRA repo ID |
| `--lora-config` | - | No | - | JSON file with LoRA weights |
| `--describe` | `-d` | No | false | Auto-describe generated image after creation |
| `--language` | - | No | `zh` | Description language: `zh` (Chinese) or `en` (English) |

## Environment Variables

- `MODELSCOPE_API_KEY`: Your ModelScope API token (required if not using `--api-key`)
- `OPENAI_API_KEY`: OpenAI API key for image description (required when using `--describe`)

## Notes

- Generation is async; script polls for up to 5 minutes
- Supports up to 6 LoRAs with weight coefficients summing to 1.0
- Output format determined by file extension (`.jpg`, `.png`, etc.)
- `--describe` requires `OPENAI_API_KEY` environment variable set
- Image description uses GPT-4 Vision model for detailed analysis
