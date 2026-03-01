# Hong Kong Secondary School Website - Technical Architecture

**Author:** User (via BMAD Architecture Design)
**Date:** 2026-03-01
**Project Level:** 3 (Comprehensive multi-audience platform)
**Status:** Draft
**Version:** 1.0

---

## 📋 Executive Summary

This document describes the technical architecture for the Hong Kong Secondary School Website, a comprehensive bilingual platform serving parents, students, teachers, alumni, and the general public across four development phases.

**Architecture Approach:**
- **Static-first:** Prioritize static HTML/CSS/JavaScript for performance and SEO
- **Progressive enhancement:** Add dynamic features (portals, forms) via serverless functions
- **Component-based:** Reusable HTML components using Tailwind CSS + daisyUI
- **Bilingual-by-design:** Internationalization baked into content structure
- **Mobile-first:** Responsive design from mobile breakpoints up

**Key Principles:**
1. Simplicity: Use vanilla JavaScript and proven patterns
2. Performance: Fast load times through static assets and CDN
3. Accessibility: WCAG 2.1 AA compliance built into components
4. Scalability: Vercel's edge network handles traffic automatically
5. Maintainability: Clean, documented code with clear separation of concerns

---

## 🏗️ System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                   User Browsers                          │
│              (Chrome, Safari, Firefox, Edge)             │
└───────────────────────┬─────────────────────────────────┘
                        │
                        │ HTTPS (Vercel CDN)
                        │
┌───────────────────────▼─────────────────────────────────┐
│                    Vercel Edge Network                    │
│              (Static Assets + Serverless)                 │
└─────┬─────────────────────┬───────────────────────────┘
      │                     │
      │ Static Content      │ Serverless Functions
      │                     │
┌─────▼──────┐    ┌──────▼──────────────────────┐
│  Public     │    │  Vercel Serverless Functions  │
│  Website    │    │  (Forms, Auth, API)        │
│  (HTML+JS) │    └──────┬──────────────────────┘
└─────┬──────┘           │
      │                  │
      │                  │
┌─────▼──────┐    ┌──────▼──────────────────────┐
│  JSON/     │    │  External Services           │
│  Supabase  │    │  (Auth0, Firebase, Email)  │
│  Content    │    └───────────────────────────────┘
└─────────────┘
```

### Architecture Layers

**Layer 1: Client-Side (User Interface)**
- HTML5 semantic structure
- CSS3 with Tailwind CSS + daisyUI
- Vanilla JavaScript (ES6+) for interactivity
- Client-side routing (hash-based or query-based)
- LocalStorage for language preference and session

**Layer 2: CDN & Delivery (Vercel)**
- Static asset serving from edge locations
- Automatic HTTPS/TLS
- Built-in CDN for global performance
- Preview deployments for testing

**Layer 3: Serverless Backend (Vercel Functions)**
- Form submission handling
- Authentication endpoints
- Dynamic content API (if needed)
- Email sending integration
- File upload processing

**Layer 4: Data Storage**
- JSON files for static content (Phase 1)
- Supabase for dynamic data (Phases 2-4, optional)
- Asset storage: Vercel Blob or external CDN

**Layer 5: External Services**
- Auth0 / Firebase Auth for authentication
- Email service (SendGrid, Mailgun, or Vercel's built-in)
- Analytics (Google Analytics or Plausible)

---

## 🎨 Component Architecture

### Frontend Components

```
src/
├── components/              # Reusable HTML components
│   ├── header/             # Navigation header
│   │   ├── header.html
│   │   ├── header.js         # Mobile menu, language switcher
│   │   └── header.css        # Tailwind + custom
│   ├── footer/             # Footer with links
│   ├── hero/               # daisyUI hero component
│   ├── card/               # Article, event cards
│   ├── modal/              # Lightboxes, forms
│   ├── forms/              # Contact, application forms
│   │   ├── contact-form.html
│   │   └── application-form.html
│   ├── language-switcher/  # i18n toggle
│   └── ui/                # Buttons, inputs, badges (daisyUI)
├── pages/                  # Page templates
│   ├── index.html           # Homepage
│   ├── about/
│   │   ├── index.html       # About overview
│   │   ├── history.html
│   │   ├── values.html
│   │   └── mission.html
│   ├── admissions/
│   │   ├── index.html
│   │   └── apply.html
│   ├── news/
│   │   ├── index.html
│   │   └── article.html
│   ├── calendar/
│   ├── facilities/
│   ├── contact/
│   ├── portal/
│   │   ├── student.html
│   │   └── parent.html
│   └── alumni/
│       ├── index.html
│       └── profile.html
├── assets/
│   ├── css/
│   │   ├── tailwind.config.js
│   │   └── custom.css      # Custom styles
│   ├── js/
│   │   ├── main.js         # Global scripts
│   │   ├── routing.js     # Client-side routing
│   │   ├── i18n.js        # Internationalization
│   │   └── auth.js        # Authentication logic
│   ├── images/
│   └── fonts/
├── content/                # CMS content (JSON)
│   ├── en/
│   │   ├── home.json
│   │   ├── about.json
│   │   └── news.json
│   └── zh-hk/
│       ├── home.json
│       ├── about.json
│       └── news.json
├── api/                   # Vercel serverless functions
│   ├── submit-contact.js
│   ├── submit-application.js
│   └── auth/
│       └── login.js
└── public/                 # Static assets
    ├── favicon.ico
    ├── robots.txt
    └── sitemap.xml
```

### Component Design Principles

1. **Single Responsibility:** Each component has one clear purpose
2. **Reusable:** Components designed for multiple contexts
3. **Accessible:** ARIA labels, keyboard navigation, semantic HTML
4. **Styled with Tailwind:** Utility classes + daisyUI components
5. **Data Binding:** Simple vanilla JS for dynamic content

### Component Examples

**Header Component:**
```html
<!-- components/header/header.html -->
<header class="navbar bg-base-100 shadow-lg">
  <nav class="container mx-auto px-4">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <a href="/" class="btn btn-ghost normal-case text-xl">
        <img src="/assets/images/logo.png" alt="School Logo" />
        <span>School Name</span>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex gap-4">
        <a href="/about" class="btn btn-ghost">About</a>
        <a href="/admissions" class="btn btn-ghost">Admissions</a>
        <a href="/news" class="btn btn-ghost">News</a>
        <a href="/portal" class="btn btn-primary">Portal</a>
      </div>

      <!-- Language Switcher & Mobile Menu -->
      <div class="flex gap-2">
        <button id="language-switcher" class="btn btn-sm btn-outline">
          EN / 繁
        </button>
        <button id="mobile-menu-toggle" class="btn btn-square btn-ghost md:hidden">
          <svg class="w-6 h-6" fill="none" stroke="currentColor">...</svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden">
      <ul class="menu bg-base-200 rounded-box">
        <li><a href="/about">About</a></li>
        <li><a href="/admissions">Admissions</a></li>
        <li><a href="/news">News</a></li>
        <li><a href="/portal">Portal</a></li>
      </ul>
    </div>
  </nav>
</header>
```

**Hero Component (daisyUI):**
```html
<!-- components/hero/hero.html -->
<div class="hero min-h-screen" style="background-image: url('/assets/images/hero-bg.jpg')">
  <div class="hero-overlay bg-opacity-60"></div>
  <div class="hero-content text-neutral-content text-center">
    <h1 class="text-5xl font-bold mb-6">Welcome to School Name</h1>
    <p class="text-xl mb-8">Empowering minds, shaping futures</p>
    <div class="flex gap-4 justify-center">
      <a href="/admissions" class="btn btn-primary btn-lg">Apply Now</a>
      <a href="/about" class="btn btn-outline btn-lg">Learn More</a>
    </div>
  </div>
</div>
```

---

## 💾 Data Storage Strategy

### Phase 1: JSON-Based Content (Recommended)

**Structure:**
```
content/
├── en/                    # English content
│   ├── home.json          # Homepage content
│   ├── about/
│   │   ├── history.json
│   │   ├── values.json
│   │   └── mission.json
│   ├── admissions.json
│   ├── news.json          # Array of news articles
│   ├── calendar.json       # Array of events
│   └── facilities.json
├── zh-hk/                # Traditional Chinese
│   ├── home.json
│   ├── about/
│   ├── admissions.json
│   ├── news.json
│   └── calendar.json
└── shared/               # Shared resources
    ├── school-info.json
    ├── contact.json
    └── social-links.json
```

**JSON Content Example:**
```json
{
  "hero": {
    "title": "Welcome to [School Name]",
    "subtitle": "Empowering minds, shaping futures",
    "cta": {
      "primary": { "text": "Apply Now", "url": "/admissions" },
      "secondary": { "text": "Learn More", "url": "/about" }
    }
  },
  "highlights": [
    {
      "title": "Academic Excellence",
      "description": "Consistent top-tier examination results",
      "icon": "graduation-cap"
    },
    {
      "title": "Holistic Development",
      "description": "Over 50 co-curricular activities",
      "icon": "users"
    }
  ]
}
```

### Phase 2-4: Supabase (Optional for Portals)

**Use Cases:**
- User accounts (students, parents, alumni)
- Application data
- Homework and grades
- Portal-specific dynamic content

**Tables:**
```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL, -- student, parent, alumni, admin
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

-- Students
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  student_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  class VARCHAR(50),
  graduation_year INTEGER,
  parent_ids UUID[] REFERENCES users(id)
);

-- Applications
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'submitted',
  submitted_at TIMESTAMP DEFAULT NOW(),
  data JSONB NOT NULL -- Flexible storage
);

-- Homework
CREATE TABLE homework (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id VARCHAR(50) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Grades
CREATE TABLE grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  subject VARCHAR(100) NOT NULL,
  grade VARCHAR(10) NOT NULL,
  term VARCHAR(50) NOT NULL,
  year INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Decision: JSON vs Database

| Factor | JSON (Phase 1) | Supabase (Phases 2-4) |
|--------|-------------------|----------------------------|
| **Complexity** | Low | Medium |
| **Performance** | Excellent (static) | Good |
| **Scalability** | Limited | High |
| **Maintenance** | Simple | Requires DB management |
| **Cost** | Free | Free tier available |
| **Use Case** | Static content | Dynamic user data |

**Recommendation:** Start with JSON for Phase 1, add Supabase for Phases 2-4 when portals require user accounts.

---

## 🔐 Authentication Architecture

### Authentication Flow

```
┌──────────┐
│  User    │
└────┬─────┘
     │
     │ Login Request
     ▼
┌─────────────────────────────────────┐
│  Login Page (HTML Form)          │
│  - Email/Student ID + Password    │
└────────┬────────────────────────────┘
         │
         │ POST /api/auth/login
         ▼
┌─────────────────────────────────────┐
│  Vercel Serverless Function        │
│  - Validate credentials            │
│  - Call Auth0/Firebase API       │
└────────┬────────────────────────────┘
         │
         │ Token (JWT)
         ▼
┌─────────────────────────────────────┐
│  Store in localStorage           │
│  - accessToken                 │
│  - userRole                  │
│  - userId                     │
└─────────────────────────────────────┘
         │
         │ Redirect to Portal
         ▼
┌─────────────────────────────────────┐
│  Protected Portal Page             │
│  - Check localStorage token       │
│  - Fetch user data              │
└─────────────────────────────────────┘
```

### Authentication Options

**Option 1: Auth0 (Recommended)**
- ✅ Full-featured, enterprise-ready
- ✅ Easy integration with Vercel
- ✅ Supports social login (Google, Facebook)
- ✅ Built-in MFA support
- ✅ Free tier for first 7,000 MAU

**Option 2: Firebase Auth**
- ✅ Google ecosystem
- ✅ Free tier generous
- ✅ Real-time database included (if needed)
- ⚠️ Requires Firebase SDK integration

**Option 3: Custom JWT + Vercel Functions**
- ✅ Full control
- ✅ No external dependency
- ⚠️ Requires security implementation
- ⚠️ More development effort

**Recommendation:** Auth0 for production, Firebase for MVP/low-budget scenarios.

### Session Management

```javascript
// assets/js/auth.js
const Auth = {
  login: async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    const { token, user } = await response.json();

    localStorage.setItem('accessToken', token);
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('userId', user.id);

    return user;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    window.location.href = '/';
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },

  getUser: () => {
    return {
      role: localStorage.getItem('userRole'),
      id: localStorage.getItem('userId')
    };
  }
};
```

### Protected Routes

```javascript
// assets/js/routing.js
const Router = {
  navigate: (path) => {
    // Check if route is protected
    const protectedRoutes = ['/portal/student', '/portal/parent', '/portal/admin'];
    const isProtected = protectedRoutes.some(route => path.startsWith(route));

    if (isProtected && !Auth.isAuthenticated()) {
      window.location.href = '/login?redirect=' + encodeURIComponent(path);
      return;
    }

    // Update URL (hash-based or history API)
    window.location.hash = path;
  }
};
```

---

## 🌍 Internationalization (i18n) Architecture

### Language Structure

```
content/
├── en/
│   ├── home.json
│   ├── about/
│   ├── news.json
│   └── ...
└── zh-hk/
    ├── home.json
    ├── about/
    ├── news.json
    └── ...
```

### i18n Implementation

```javascript
// assets/js/i18n.js
const I18n = {
  currentLanguage: 'en',

  init: () => {
    // Check localStorage or browser preference
    I18n.currentLanguage = localStorage.getItem('language') || 'en';
    I18n.loadContent();
  },

  loadContent: async () => {
    const response = await fetch(`/content/${I18n.currentLanguage}/home.json`);
    I18n.content = await response.json();
    I18n.renderContent();
  },

  switchLanguage: (lang) => {
    if (lang !== I18n.currentLanguage) {
      I18n.currentLanguage = lang;
      localStorage.setItem('language', lang);
      I18n.loadContent();
    }
  },

  t: (key) => {
    // Simple key-based lookup
    return I18n.content[key] || key;
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  I18n.init();
});
```

### Content Rendering

```html
<!-- Example: Dynamic content based on language -->
<h1 data-i18n="hero.title"></h1>
<p data-i18n="hero.subtitle"></p>

<!-- JavaScript renders content -->
<script>
document.querySelectorAll('[data-i18n]').forEach(el => {
  const key = el.getAttribute('data-i18n');
  el.textContent = I18n.t(key);
});
</script>
```

### URL Structure

**Option 1: Hash-based (Simplest)**
```
/en/#/about/history
/zh-hk/#/about/history
```

**Option 2: Query-based**
```
/about/history?lang=en
/about/history?lang=zh-hk
```

**Recommendation:** Hash-based for simplicity and static hosting compatibility.

---

## 🚀 Deployment Architecture

### Vercel Deployment

**Directory Structure for Vercel:**
```
/
├── vercel.json              # Vercel configuration
├── public/                 # Static assets (served from root)
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── api/                   # Serverless functions
│   └── auth/
│       └── login.js
├── pages/                  # HTML pages
├── assets/                 # CSS, JS, images
└── content/                # JSON content files
```

**vercel.json Configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": null,
  "regions": ["hkg1"],  // Hong Kong region
  "functions": {
    "api/**/*.js": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Deployment Pipeline

**Git Workflow:**
1. Create feature branch from `main`
2. Implement user story
3. Commit with conventional commits
4. Push to GitHub
5. Create Pull Request
6. Vercel auto-deploys PR preview
7. Code review and merge
8. Vercel auto-deploys to production

**CI/CD (GitHub Actions):**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🔒 Security Architecture

### Security Layers

**Layer 1: HTTPS/TLS (Vercel)**
- Automatic SSL certificates
- HSTS headers
- Secure cookies only

**Layer 2: Input Validation**
- Server-side validation on all forms
- XSS sanitization
- CSRF tokens on state-changing operations

**Layer 3: Authentication**
- Secure password storage (bcrypt)
- JWT token expiration (1 hour)
- MFA support (via Auth0)

**Layer 4: Data Protection**
- PDPO compliance
- Encrypted data at rest (Supabase)
- GDPR-compliant cookie consent

### Security Headers

```javascript
// vercel.json headers configuration
"headers": [
  {
    "source": "/(.*)",
    "headers": [
      { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" },
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
      { "key": "X-XSS-Protection", "value": "1; mode=block" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
      { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
    ]
  }
]
```

---

## ⚡ Performance Architecture

### Performance Optimization

**1. Static Asset Delivery**
- Vercel CDN for global edge distribution
- Image optimization (WebP format, lazy loading)
- CSS minification (Tailwind purge)
- JavaScript minification

**2. Caching Strategy**
- Browser caching headers for static assets
- CDN caching for JSON content
- Cache invalidation on content updates

**3. Code Splitting**
- Separate CSS/JS bundles per page
- Load critical CSS inline
- Defer non-critical JavaScript

**4. Performance Budget**
- HTML: < 20KB
- CSS: < 50KB
- JS: < 100KB
- Images: < 500KB per image

### Lighthouse Targets

| Metric | Target | Current (Estimated) |
|--------|---------|-------------------|
| Performance | > 90 | 95 |
| Accessibility | > 90 | 100 |
| Best Practices | > 90 | 95 |
| SEO | > 90 | 95 |

---

## 📊 Scalability Architecture

### Vercel's Auto-Scaling

**Edge Network:**
- 100+ edge locations globally
- Hong Kong region (hkg1) for local users
- Automatic load balancing

**Serverless Functions:**
- Automatic scaling based on request volume
- Zero cold starts (Vercel keeps functions warm)
- 30-second execution limit per function

**Static Assets:**
- Unlimited bandwidth
- Automatic CDN caching
- No server capacity limits

### Scalability Limits

| Resource | Limit | Mitigation |
|-----------|--------|-------------|
| Serverless Function Duration | 30s | Break up long operations |
| Function Concurrency | 1000 | Use queue for heavy tasks |
| Asset Size | 50MB per request | Optimize images |
| Free Tier | 100GB bandwidth | Upgrade to Pro if needed |

---

## 🔧 Infrastructure & DevOps

### Development Environment

**Local Development:**
```bash
# Start development server
npm run dev

# Live reload with browser-sync
npm run dev:watch
```

**Configuration:**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.html',
    './components/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003366',  // School brand color
        secondary: '#FFD700',
      }
    }
  },
  plugins: [require('daisyui')]
};
```

### Testing Strategy

**Manual Testing:**
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile testing (iOS Safari, Chrome Mobile)
- Responsive testing (320px - 2560px)
- Accessibility testing (WAVE, axe DevTools)

**Automated Testing:**
```javascript
// Jest + Testing Library
import { render } from '@testing-library/dom';
import Header from './components/header/header.html';

test('Header renders logo and navigation', () => {
  const { getByText } = render(Header);
  expect(getByText('School Name')).toBeInTheDocument();
});
```

### Monitoring

**Error Tracking:** Sentry
```javascript
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});
```

**Analytics:** Google Analytics or Plausible
```javascript
// assets/js/analytics.js
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');
```

---

## 📝 Decision Log

| Decision ID | Decision | Alternatives | Rationale | Date |
|-----------|----------|-------------|-----------|-------|
| AD-001 | Frontend: HTML + JS (ES6+) | React, Vue, Next.js | Simpler, faster development, no build step needed for basic features | 2026-03-01 |
| AD-002 | CSS Framework: Tailwind + daisyUI | Bootstrap, Bulma, Custom CSS | Utility-first, modern components, excellent documentation | 2026-03-01 |
| AD-003 | Content Storage: JSON (Phase 1) | CMS-only, Database | Simpler, faster, sufficient for static content | 2026-03-01 |
| AD-004 | Hosting: Vercel | Netlify, AWS, Self-hosted | Auto-deploy from Git, built-in CDN, free tier | 2026-03-01 |
| AD-005 | Authentication: Auth0 (recommended) | Firebase, Custom JWT | Enterprise-ready, easy integration, MFA support | 2026-03-01 |
| AD-006 | i18n: JSON-based files | next-intl, i18next | Simplest approach, no build step, works with vanilla JS | 2026-03-01 |
| AD-007 | Routing: Hash-based | History API, Query params | Works best with static hosting, no server config | 2026-03-01 |
| AD-008 | Database for Portals: Supabase (optional) | PostgreSQL, MongoDB, Firebase | PostgreSQL-based, generous free tier, real-time features | 2026-03-01 |

---

## 🎯 Implementation Guardrails

### Technical Decisions

**DO:**
- ✅ Use Tailwind CSS utility classes
- ✅ Follow daisyUI component patterns
- ✅ Write semantic HTML5
- ✅ Implement ARIA labels for accessibility
- ✅ Use vanilla JavaScript (ES6+)
- ✅ Follow PRD requirements strictly
- ✅ Test on mobile devices
- ✅ Optimize images before upload

**DO NOT:**
- ❌ Introduce heavy frameworks (React, Vue) without justification
- ❌ Use inline styles (use Tailwind classes)
- ❌ Hardcode content (use JSON content files)
- ❌ Ignore accessibility requirements
- ❌ Skip testing on mobile
- ❌ Commit secrets to git
- ❌ Use deprecated APIs

### Code Standards

**HTML:**
- Use semantic elements (`<header>`, `<nav>`, `<main>`, `<footer>`)
- All images have `alt` text
- Forms have proper labels
- Heading hierarchy (h1-h6)

**CSS:**
- Use Tailwind utility classes
- Custom styles in `assets/css/custom.css`
- Mobile-first responsive design
- Dark mode support (daisyUI theme)

**JavaScript:**
- ES6+ syntax (const, let, arrow functions)
- Async/await for API calls
- Error handling (try-catch)
- Clear function and variable names
- Comment complex logic

---

## 📋 Quality Checklist

- [x] PRD and epics reviewed
- [x] Tech stack decisions documented
- [x] Component architecture defined
- [x] Data storage strategy selected
- [x] Authentication flow designed
- [x] i18n approach defined
- [x] Deployment architecture specified
- [x] Security requirements addressed
- [x] Performance targets set
- [x] Scalability plan documented
- [x] Decision log created
- [x] Implementation guardrails defined

---

**Architecture Status:** ✅ **READY FOR DEVELOPMENT**

**Next Step:** Begin Epic 1, Story 1.1 using bmad-development-execution skill.

_Generated via BMAD Workflow Skills (v1.0.0) using BMAD v6-alpha spec_
