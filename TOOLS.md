# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:
- Camera names and locations
- SSH hosts and aliases  
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras
- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH
- home-server → 192.168.1.100, user: admin

### TTS
- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

## API Keys & Credentials

### ModelScope Image Generation
- **API Key:** stored in local env
- Model: `Tongyi-MAI/Z-Image-Turbo`
- Location: `/root/clawd/skills/make-image/`
- Usage: Generate AI images via ModelScope API

### Perplexity Web Search
- **API Key:** stored in local env
- Model: `perplexity/sonar-pro`
- Config: `tools.web.search.enabled: true`

### Vercel
- **API Token:** stored in local env
- Organization: `heartshares-projects`
- Deployed Projects:
  - `webhosting-landing` → https://webhosting-landing-one.vercel.app
  - `webhosting-test` → https://webhosting-test.vercel.app

### GitHub
- Authenticated as: `heartshare`
- Token: stored in local env
- Scopes: gist, read:org, repo, workflow

## Projects

### Web Hosting Landing Page
- **Repo:** `heartshare/webhosting-landing`
- **Location:** `/root/clawd/webhosting-landing/`
- **Tech Stack:** Next.js 16.1.6, Remotion 4.0.421, React 19
- **Deployed:** https://webhosting-landing-one.vercel.app
- **Features:** Remotion video player + AI-generated feature images

### Web Hosting Test
- **Repo:** `heartshare/webhosting-test`
- **Location:** `/root/clawd/webhosting-test/`
- **Tech Stack:** Next.js 16.1.6, React 19, TypeScript, Tailwind CSS
- **Deployed:** https://webhosting-test.vercel.app
- **Features:** Test page with environment check

---

Add whatever helps you do your job. This is your cheat sheet.
