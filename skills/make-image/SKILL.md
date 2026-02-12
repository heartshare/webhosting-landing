---
name: make-image
description: >
  Generate AI images using ModelScope's API (Tongyi-MAI/Z-Image-Turbo and other models).
  Simple mode: generates image, sends to YOU via OpenClaw messaging (Telegram), shows prompt and path only.
  Supports LoRA fine-tuning and async generation.
  Use when the user asks to generate, create, or produce AI images, artwork, or visual content.
  Triggers: generate image, create image, AI image, draw, make picture, ModelScope image.
---

# ModelScope Image Generation

Generate AI images using ModelScope's inference API with async task polling.
**Simple mode**: generates image, outputs marker for OpenClaw to send via Telegram, shows prompt & path only.

**Important**: Images are sent ONLY to your personal Telegram chat (ID: 350795515). No other destinations.

## How It Works

1. Script generates image using ModelScope API
2. Script outputs marker: `__OPENCLAW_SEND_IMAGE__: /path/to/image.jpg`
3. OpenClaw detects the marker and sends image using its message tool
4. No need for TELEGRAM_BOT_TOKEN - uses OpenClaw's messaging system

Use `--quiet` or `-q` flag to show **only prompt and path** (suppresses all intermediate output).

## Quick Start

```bash
# Set API key (one-time)
export MODELSCOPE_API_KEY="your-api-key"

# Generate an image
python scripts/generate.py --prompt "A golden cat sitting on a cloud" --output cat.jpg
```

## Usage

### Simple Mode (Recommended - Automatic Telegram Sending)

**Default behavior:** Image generates → Sends to your Telegram → Shows prompt & path

```bash
python scripts/generate.py \
  --prompt "A cute cat" \
  --output cat.jpg
```
No flags needed! It automatically sends to your Telegram chat.

**Note**: Images are sent ONLY to you. No option to send to other chats.

### Disable Telegram Sending

```bash
python scripts/generate.py \
  --prompt "A quick test" \
  --output test.jpg \
  --no-send
```
Use `--no-send` to skip automatic Telegram sending.

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
| `--no-send` | - | No | false | Disable automatic Telegram sending |
| `--quiet` | `-q` | No | false | Show only prompt, path, and file size (suppresses all other output) |

## Environment Variables

- `MODELSCOPE_API_KEY`: Your ModelScope API token (required if not using `--api-key`)

## Notes

- Generation is async; script polls for up to 5 minutes
- Supports up to 6 LoRAs with weight coefficients summing to 1.0
- Output format determined by file extension (`.jpg`, `.png`, etc.)
- **Automatic Telegram sending** - script outputs marker, OpenClaw sends to your chat (ID: 350795515)
- **Uses OpenClaw messaging** - no need for TELEGRAM_BOT_TOKEN
- **Simple mode**: Show only prompt, path, and file size (suppresses all other output)
- **`--no-send` flag**: Skip sending (just generate and save)
- File size display: Shows KB for <1MB files, MB for >=1MB files
- No description generation (faster workflow)
