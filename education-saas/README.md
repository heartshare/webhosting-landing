# 🎨 EduFlow — Education SaaS Theme

A modern, glassmorphism-styled theme for education platforms built with HTML, Tailwind CSS, and Lucide icons.

---

## 🚀 Live Demo

**Production:** https://education-saas-pi.vercel.app

---

## 📦 What's Included

| Page | File | URL |
|------|------|-----|
| **Home** | `index.html` | `/` |
| **Pricing** | `pricing.html` | `/pricing.html` |
| **Courses** | `courses.html` | `/courses.html` |
| **About** | `about.html` | `/about.html` |
| **Contact** | `contact.html` | `/contact.html` |
| **Login** | `login.html` | `/login.html` |
| **Signup** | `signup.html` | `/signup.html` |

---

## 🎨 Design System

### Colors

| Role | Hex | Tailwind | Usage |
|------|-----|---------|-------|
| Primary | `#6366F1` | `indigo-500` | Buttons, links, accents |
| CTA | `#10B981` | `emerald-500` | Primary actions |
| Background | `#F5F3FF` | `indigo-50` | Page background |
| Text | `#1E1B4B` | `indigo-950` | Headlines, body text |

### Typography

**Font:** Plus Jakarta Sans
**Import:** Included via Google Fonts

### Style: Glassmorphism

```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

---

## 🚀 Quick Start

### 1. Open Pages Locally

Simply open any HTML file in your browser:

```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# Or just double-click the file
```

### 2. Use a Local Server (Recommended)

For best results with links and forms:

```bash
cd /root/clawd/education-saas

# Using Python 3
python3 -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000/`

---

## ✨ Features

### ✅ All Pages Include:
- **Glassmorphism design** with backdrop blur effects
- **Responsive layout** (mobile, tablet, desktop)
- **Smooth transitions** (150-300ms)
- **Hover states** on interactive elements
- **Focus states** for keyboard navigation
- **Lucide icons** via CDN
- **Google Fonts** (Plus Jakarta Sans)
- **Accessible** with ARIA labels and semantic HTML

### 🎯 Key Components:
- Floating glass navbar
- Glass cards with hover shadows
- Gradient buttons
- Category filters (courses page)
- Pricing toggle (monthly/yearly)
- FAQ accordion
- Social login buttons
- Contact form

---

## 🛠️ Customization

### Change Colors

Edit Tailwind config in each HTML file:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#YOUR_COLOR',      // Main brand color
        cta: '#YOUR_CTA_COLOR',      // Call-to-action
        background: '#YOUR_BG',       // Page background
        text: '#YOUR_TEXT',          // Text color
      }
    }
  }
}
```

### Change Fonts

Update Google Fonts link and Tailwind config:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR+FONT:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

```javascript
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"YOUR FONT"', 'sans-serif'],
      }
    }
  }
}
```

### Adjust Glass Effect

Modify `.glass` and `.glass-card` CSS:

```css
.glass {
  background: rgba(255, 255, 255, 0.7);  /* Adjust opacity */
  backdrop-filter: blur(20px);             /* Adjust blur */
  border: 1px solid rgba(255, 255, 255, 0.2);  /* Adjust border */
}
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Use |
|------------|-------|-----|
| Default | < 640px | Mobile |
| `md` | ≥ 768px | Tablets |
| `lg` | ≥ 1024px | Laptops |
| `xl` | ≥ 1280px | Desktops |
| `2xl` | ≥ 1536px | Large screens |

---

## ♿ Accessibility

All pages follow WCAG guidelines:

- ✅ Keyboard navigation support
- ✅ Focus indicators on interactive elements
- ✅ ARIA labels on icon-only buttons
- ✅ Semantic HTML structure
- ✅ `prefers-reduced-motion` support
- ✅ Color contrast (4.5:1 minimum)

---

## 🔧 Dependencies

All dependencies are loaded via CDN:

- **Tailwind CSS:** `https://cdn.tailwindcss.com`
- **Lucide Icons:** `https://unpkg.com/lucide@latest/dist/umd/lucide.js`
- **Google Fonts:** `https://fonts.googleapis.com`

No installation required!

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
cd /root/clawd/education-saas
vercel --prod
```

### Netlify

```bash
cd /root/clawd/education-saas
netlify deploy --prod
```

### GitHub Pages

Push to GitHub and enable GitHub Pages in repository settings.

---

## 📄 License

This theme is free to use for personal and commercial projects.

---

## 🤝 Support

Need help? Check design system:

```
design-system/education-saas/MASTER.md
```

---

## 🎉 Next Steps

1. ✅ Customized colors and branding
2. ✅ Updated content to match platform
3. ⏳ Connect forms to your backend
4. ⏳ Add custom domain

---

**Built with ❤️ using UI/UX Pro Max design system**

**Deployed to:** https://education-saas-pi.vercel.app
