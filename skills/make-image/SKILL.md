---
name: make-image
description: >
  Generate AI images using ModelScope's API (Tongyi-MAI/Z-Image-Turbo and other models).
  Simple mode: generates image, sends to Telegram by default, shows prompt and path only.
  Supports LoRA fine-tuning and async generation.
  Use when the user asks to generate, create, or produce AI images, artwork, or visual content.
  Triggers: generate image, create image, AI image, draw, make picture, ModelScope image.
---

# ModelScope Image Generation

Generate AI images using ModelScope's inference API with async task polling.
**Simple mode**: generates image, sends to Telegram by default, shows prompt and path only.

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

### With Specific Chat ID

```bash
python scripts/generate.py \
  --prompt "A cute dog" \
  --output dog.jpg \
  --send 123456789
```
Overrides the default chat ID.

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
| `--send` | - | No | - | Telegram chat ID to send to (overrides default) |
| `--no-send` | - | No | false | Disable automatic Telegram sending |
| `--quiet` | `-q` | No | false | Show only prompt, path, and file size (suppresses all other output) |

## Environment Variables

- `MODELSCOPE_API_KEY`: Your ModelScope API token (required if not using `--api-key`)
- `TELEGRAM_BOT_TOKEN`: Telegram bot token (required for sending images)
- `TELEGRAM_CHAT_ID`: Default Telegram chat ID to send to (optional, defaults to your ID)

## Notes

- Generation is async; script polls for up to 5 minutes
- Supports up to 6 LoRAs with weight coefficients summing to 1.0
- Output format determined by file extension (`.jpg`, `.png`, etc.)
- **Automatic Telegram sending enabled by default** - images sent to your chat after generation
- **Simple mode**: Show only prompt, path, and file size (suppresses all other output)
- **`--send` flag**: Override default chat ID to send to specific user
- **`--no-send` flag**: Disable automatic Telegram sending
- File size display: Shows KB for <1MB files, MB for >=1MB files
- No description generation (faster workflow)
