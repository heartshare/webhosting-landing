---
name: make-image
description: >
  Generate AI images using ModelScope's API (Tongyi-MAI/Z-Image-Turbo and other models).
  Automatically describes generated images with vision AI. Supports LoRA fine-tuning and async generation.
  Use when the user asks to generate, create, or produce AI images, artwork, or visual content.
  Triggers: generate image, create image, AI image, draw, make picture, ModelScope image.
---

# ModelScope Image Generation

Generate AI images using ModelScope's inference API with async task polling.
**Images are automatically described after generation** using GPT-4 Vision.

## Quick Start

```bash
# Set API key (one-time)
export MODELSCOPE_API_KEY="your-api-key"

# Generate an image
python scripts/generate.py --prompt "A golden cat sitting on a cloud" --output cat.jpg
```

## Usage

### Basic Generation (Auto-Description Enabled)

```bash
python scripts/generate.py \
  --prompt "A serene Japanese garden with cherry blossoms" \
  --output garden.jpg
```
This will generate the image AND automatically describe it in Chinese.

### Disable Description

```bash
python scripts/generate.py \
  --prompt "A quick image test" \
  --output test.jpg \
  --no-describe
```
Use `--no-describe` to skip the automatic description step.

### With Custom Model

```bash
python scripts/generate.py \
  --prompt "A futuristic city skyline" \
  --output city.jpg \
  --model "your-model-id"
```

### English Description

```bash
python scripts/generate.py \
  --prompt "A golden retriever playing in snow" \
  --output dog.jpg \
  --lang en
```

### Send to Telegram After Generation

Generate and automatically send to Telegram (requires `TELEGRAM_BOT_TOKEN` env var):

```bash
python scripts/generate.py \
  --prompt "A cute puppy" \
  --output puppy.jpg \
  --send 123456789
```
Where `123456789` is the Telegram chat ID. This sends the image first, then describes it.

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

### Standalone Image Description

Describe an existing image without generation:

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
| `--no-describe` | - | No | `false` | Disable automatic image description |
| `--lang` | - | No | `zh` | Description language: `zh` (Chinese) or `en` (English) |
| `--send` | - | No | - | Telegram chat ID to send image to after generation (requires `TELEGRAM_BOT_TOKEN`) |

## Environment Variables

- `MODELSCOPE_API_KEY`: Your ModelScope API token (required if not using `--api-key`)
- `OPENAI_API_KEY`: OpenAI API key for image description (optional, disables description if not set)
- `TELEGRAM_BOT_TOKEN`: Telegram bot token for sending images (required when using `--send`)

## Notes

- Generation is async; script polls for up to 5 minutes
- Supports up to 6 LoRAs with weight coefficients summing to 1.0
- Output format determined by file extension (`.jpg`, `.png`, etc.)
- **Description is enabled by default** - use `--no-describe` to disable
- **Telegram sending**: Use `--send <chat_id>` to send image directly to Telegram
- Image sends first, then description is generated (if enabled)
- Description requires `OPENAI_API_KEY` environment variable; gracefully skips if missing
- Telegram sending requires `TELEGRAM_BOT_TOKEN` environment variable
- Image description uses GPT-4 Vision model for detailed analysis
