---
name: make-image
description: >
  Generate AI images using ModelScope's API (Tongyi-MAI/Z-Image-Turbo and other models).
  Simple mode: generates image, sends to Telegram, shows prompt and path only.
  Supports LoRA fine-tuning and async generation.
  Use when the user asks to generate, create, or produce AI images, artwork, or visual content.
  Triggers: generate image, create image, AI image, draw, make picture, ModelScope image.
---

# ModelScope Image Generation

Generate AI images using ModelScope's inference API with async task polling.
**Simple mode**: generates image, sends to Telegram, shows prompt and path only (no description, no verbose output).

Use `--quiet` or `-q` flag to show **only prompt and path** (suppresses all intermediate output).

## Quick Start

```bash
# Set API key (one-time)
export MODELSCOPE_API_KEY="your-api-key"

# Generate an image
python scripts/generate.py --prompt "A golden cat sitting on a cloud" --output cat.jpg
```

## Usage

### Simple Mode (Recommended - Prompt & Path Only)

```bash
python scripts/generate.py \
  --prompt "A cute cat" \
  --output cat.jpg \
  --quiet
```
Shows only: prompt, path, and file size. No verbose output, no description.

### With Telegram Sending

```bash
python scripts/generate.py \
  --prompt "A cute dog" \
  --output dog.jpg \
  --send 350795515 \
  --quiet
```
Generates, sends to Telegram, and shows minimal output.

### Full Mode (With Description)

```bash
python scripts/generate.py \
  --prompt "A serene Japanese garden with cherry blossoms" \
  --output garden.jpg
```
This will generate image AND automatically describe it in Chinese.

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

## Arguments

| Argument | Short | Required | Default | Description |
|----------|-------|----------|---------|-------------|
| `--prompt` | `-p` | Yes | - | Text prompt for image generation |
| `--output` | `-o` | No | `result_image.jpg` | Output file path |
| `--model` | `-m` | No | `Tongyi-MAI/Z-Image-Turbo` | ModelScope model ID |
| `--api-key` | `-k` | No | `MODELSCOPE_API_KEY` env | API key |
| `--lora` | `-l` | No | - | Single LoRA repo ID |
| `--lora-config` | - | No | - | JSON file with LoRA weights |
| `--send` | - | No | - | Telegram chat ID to send image to after generation (requires `TELEGRAM_BOT_TOKEN`) |
| `--quiet` | `-q` | No | false | Show only prompt, path, and file size (suppresses all other output) |

## Environment Variables

- `MODELSCOPE_API_KEY`: Your ModelScope API token (required if not using `--api-key`)
- `TELEGRAM_BOT_TOKEN`: Telegram bot token for sending images (required when using `--send`)

## Notes

- Generation is async; script polls for up to 5 minutes
- Supports up to 6 LoRAs with weight coefficients summing to 1.0
- Output format determined by file extension (`.jpg`, `.png`, etc.)
- **Simple mode**: Use `--quiet` to show only prompt, path, and file size
- **Quiet mode**: Suppresses all intermediate output (task status, polling progress, etc.)
- **Telegram sending**: Use `--send <chat_id>` to send image directly to Telegram
- Image generates first, then sends to Telegram (if --send is used)
- **No description**: Simple mode doesn't generate AI descriptions (faster workflow)
- Telegram sending requires `TELEGRAM_BOT_TOKEN` environment variable
