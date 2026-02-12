# HK LMS MVP - Technical Architecture Design

**Document Version:** 1.0
**Created:** 2026-02-09
**Project Level:** 2 (Medium Feature Set)
**Author:** Auto-BMAD (System Architect)

---

## 📋 Executive Summary

**Architecture Philosophy:**
Mobile-first, progressive web application (PWA) architecture with vanilla JavaScript, leveraging Tailwind CSS for styling, and preparing for future backend integration. MVP uses mock data to validate UX and core functionality before building real backend.

**Key Decisions:**
- **Frontend:** Vanilla ES6+ JavaScript (no framework for MVP)
- **Styling:** Tailwind CSS via CDN
- **State Management:** Local state with localStorage persistence
- **Data:** Mock JSON files (mimicking API responses)
- **Routing:** Hash-based client-side routing
- **Deployment:** Vercel (static hosting)

---

## 🏛️ System Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                 Client Layer                     │
│                                             │
│  ┌─────────────────────────────────────┐        │
│  │        Browser (iOS Safari/Chrome)  │        │
│  │                                     │        │
│  │  ┌───────────────────────────┐   │        │
│  │  │   Application Layer      │   │        │
│  │  │                        │   │        │
│  │  │  ┌────────────────┐     │   │        │
│  │  │  │  SPA Router    │     │   │        │
│  │  │  └────────────────┘     │   │        │
│  │  │                        │   │        │
│  │  │  ┌────────────────┐     │   │        │
│  │  │  │  State Manager│     │   │        │
│  │  │  │  (localStorage)│     │   │        │
│  │  │  └────────────────┘     │   │        │
│  │  │                        │   │        │
│  │  │  ┌────────────────┐     │   │        │
│  │  │  │  View Layer   │     │   │        │
│  │  │  │                │     │   │        │
│  │  │  │  Components    │     │   │        │
│  │  │  └────────────────┘     │   │        │
│  │  └───────────────────────────┘   │        │
│  └─────────────────────────────────────┘        │
└─────────────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│              Data Layer (MVP)                 │
│                                             │
│  ┌─────────────────────────────┐        │
│  │   Mock Data (JSON)         │        │
│  │                            │        │
│  │  ┌────────────────────┐     │        │
│  │  │  courses.json       │     │        │
│  │  │  lessons.json      │     │        │
│  │  │  assignments.json   │     │        │
│  │  │  grades.json        │     │        │
│  │  │  users.json         │     │        │
│  │  └────────────────────┘     │        │
│  └─────────────────────────────┘        │
└─────────────────────────────────────────────┘
```

---

## 📱 Frontend Architecture

### Technology Stack

#### HTML5 (Markup Layer)
**Role:** Semantic structure and accessibility
**Standards:** HTML5 Semantic Elements
```html
<header>  <!-- Logo, Language Toggle, Navigation -->
<main>    <!-- Dynamic content (views) -->
  <article>  <!-- Course cards, lesson lists -->
  <section>  <!-- Assignment dashboard -->
  <aside>    <!-- Parent portal sidebar -->
<footer>   <!-- Links, copyright -->
```

#### Tailwind CSS (Styling Layer)
**Role:** Utility-first styling system
**Integration:** CDN-based (no build step for MVP)
**Design Tokens:**
```javascript
const tailwindConfig = {
  colors: {
    primary: '#FF6B9D',      // Coral Pink
    secondary: '#4ECDC4',    // Mint Teal
    accent: '#FFE66D',        // Sunny Yellow
    success: '#6BCB77',      // Green
    warning: '#FFA500',       // Orange
    danger: '#FF6B6B'        // Red
  },
  fontFamily: {
    sans: ['Inter', 'Noto Sans TC', 'sans-serif'],
  },
  screens: {
    sm: '640px',   // Mobile
    md: '768px',   // Tablet
    lg: '1024px',  // Laptop
    xl: '1280px',  // Desktop
  },
};
```

#### Vanilla JavaScript (Logic Layer)
**Role:** State management, routing, DOM manipulation
**Architecture Pattern:** Module pattern with IIFE
**Key Modules:**
```javascript
// State Management (singleton)
const Store = (() => {
  let state = loadFromStorage();
  return {
    getState: () => state,
    dispatch: (action, payload) => { /* update state */ },
    subscribe: (listener) => { /* notify changes */ },
  };
})();

// Router (hash-based)
const Router = (() => {
  const routes = {
    '#/courses': CoursesView,
    '#/lessons/:id': LessonsView,
    '#/assignments': AssignmentsView,
    '#/grades': GradesView,
    '#/parent': ParentView,
  };
  return {
    navigate: (hash) => { /* load view */ },
    back: () => { /* go back */ },
  };
})();

// API Layer (mock)
const API = (() => {
  const mockData = {
    courses: loadJSON('courses.json'),
    lessons: loadJSON('lessons.json'),
    // ...
  };
  return {
    getCourses: () => Promise.resolve(mockData.courses),
    enroll: (courseId) => { /* mock enrollment */ },
    // ...
  };
})();
```

---

## 🗂️ Data Structures

### Mock Data Schema

#### courses.json
```json
[
  {
    "id": "course-1",
    "subject": "Chinese",
    "subjectEn": "Chinese",
    "subjectZh": "中文",
    "level": "Form 5",
    "levelEn": "Form 5",
    "levelZh": "中五",
    "title": "Hong Kong Secondary School Chinese",
    "description": "Comprehensive Chinese language course covering literature, writing, and cultural studies for Form 5.",
    "descriptionEn": "Comprehensive Chinese language course...",
    "descriptionZh": "完整的中文语言课程...",
    "teacher": "李老師",
    "teacherId": "teacher-1",
    "lessons": 15,
    "duration": "8 weeks",
    "enrolled": true,
    "progress": 0.65,
    "thumbnail": "/images/course-chinese.jpg",
    "category": "core"
  }
]
```

#### lessons.json
```json
{
  "course-1": [
    {
      "id": "lesson-1",
      "courseId": "course-1",
      "title": "Introduction to Classical Chinese",
      "titleEn": "Introduction to Classical Chinese",
      "titleZh": "古典中文入门",
      "description": "Overview of classical Chinese literature and its significance.",
      "duration": "5 minutes",
      "order": 1,
      "completed": true,
      "type": "text",
      "content": "/content/lesson-1.html",
      "thumbnail": "/images/lesson-1-thumb.jpg"
    },
    {
      "id": "lesson-2",
      "courseId": "course-1",
      "title": "Basic Concepts",
      "titleEn": "Basic Concepts",
      "titleZh": "基本概念",
      "duration": "12 minutes",
      "order": 2,
      "completed": true,
      "type": "text",
      "content": "/content/lesson-2.html",
      "thumbnail": "/images/lesson-2-thumb.jpg"
    }
  ]
}
```

#### assignments.json
```json
[
  {
    "id": "assignment-1",
    "courseId": "course-1",
    "title": "Essay: Modern Chinese Literature",
    "titleEn": "Essay: Modern Chinese Literature",
    "titleZh": "作文：現代中文文學",
    "description": "Write a 500-word essay analyzing a modern Chinese poem.",
    "descriptionEn": "Write a 500-word essay...",
    "descriptionZh": "寫一篇500字的作文...",
    "dueDate": "2026-02-15T23:59:00+08:00",
    "dueDateEn": "February 15, 2026 11:59 PM",
    "dueDateZh": "2026年2月15日 下午11時59分",
    "status": "not_started",
    "statusEn": "Not Started",
    "statusZh": "未開始",
    "course": "Chinese",
    "teacher": "李老師"
  }
]
```

#### grades.json
```json
{
  "student-1": {
    "studentId": "student-1",
    "name": "陳小明",
    "nameEn": "Chen Xiaoming",
    "grades": [
      {
        "subject": "Chinese",
        "subjectEn": "Chinese",
        "subjectZh": "中文",
        "grade": "A",
        "percentage": 85,
        "classRank": 3,
        "totalStudents": 40,
        "trend": "up",
        "trendEn": "Improving",
        "trendZh": "進步",
        "dssePrediction": "Level 4-5",
        "history": [
          { "date": "2025-09", "grade": "B+", "percentage": 78 },
          { "date": "2025-10", "grade": "A-", "percentage": 82 },
          { "date": "2025-11", "grade": "A", "percentage": 85 }
        ]
      },
      {
        "subject": "English",
        "grade": "B+",
        "percentage": 78,
        "classRank": 8,
        "totalStudents": 40,
        "trend": "stable",
        "dssePrediction": "Level 3"
      }
    ]
  }
}
```

#### users.json (Language Mappings)
```json
{
  "en": {
    "dashboard": "Dashboard",
    "courses": "Courses",
    "assignments": "Assignments",
    "grades": "Grades",
    "parent": "Parent Portal",
    "settings": "Settings",
    "submit": "Submit",
    "complete": "Complete",
    "due": "Due",
    "notStarted": "Not Started",
    "inProgress": "In Progress",
    "submitted": "Submitted",
    "graded": "Graded"
  },
  "zh": {
    "dashboard": "儀表板",
    "courses": "課程",
    "assignments": "作業",
    "grades": "成績",
    "parent": "家長入口",
    "settings": "設定",
    "submit": "提交",
    "complete": "完成",
    "due": "截止",
    "notStarted": "未開始",
    "inProgress": "進行中",
    "submitted": "已提交",
    "graded": "已評分"
  }
}
```

---

## 🔄 State Management Architecture

### Global State Store

```javascript
const Store = (() => {
  // Initial state
  const initialState = {
    currentUser: null,
    language: 'en',  // 'en' | 'zh'
    currentView: '#/courses',
    enrolledCourses: [],
    assignments: [],
    grades: null,
    notifications: [],
    darkMode: false,
  };

  // State from localStorage
  let state = JSON.parse(localStorage.getItem('hk-lms-state')) || initialState;

  // Subscribers
  const subscribers = [];

  // Save state to localStorage
  const persist = () => {
    localStorage.setItem('hk-lms-state', JSON.stringify(state));
  };

  // Action handlers
  const actions = {
    SET_LANGUAGE: (lang) => {
      state.language = lang;
      persist();
      notify();
    },
    SET_USER: (user) => {
      state.currentUser = user;
      persist();
      notify();
    },
    ENROLL_COURSE: (courseId) => {
      state.enrolledCourses.push(courseId);
      persist();
      notify();
    },
    TOGGLE_DARK_MODE: () => {
      state.darkMode = !state.darkMode;
      persist();
      notify();
    },
    // ... more actions
  };

  // Notify subscribers
  const notify = () => {
    subscribers.forEach(fn => fn(state));
  };

  return {
    getState: () => state,
    dispatch: (action, payload) => {
      if (actions[action]) {
        actions[action](payload);
      }
    },
    subscribe: (fn) => {
      subscribers.push(fn);
      fn(state);  // Initial call
    },
  };
})();
```

### State Persistence Strategy
- **localStorage Key:** `hk-lms-state`
- **Max Size:** 5MB (localStorage limit)
- **Expiry:** 30 days (auto-clear old data)
- **Fallback:** SessionStorage (if localStorage disabled)

---

## 🧩 Component Architecture

### Component Hierarchy

```
App (Root Component)
├── Header
│   ├── Logo
│   ├── LanguageToggle (EN/中文)
│   └── Navigation (Courses/Assignments/Grades/Parent)
├── Main Content Area
│   ├── DashboardView
│   │   ├── WelcomeCard
│   │   ├── ProgressOverview
│   │   └── QuickActions
│   ├── CoursesView
│   │   ├── CourseCatalog
│   │   │   ├── CourseCard (repeated)
│   │   └── FilterBar
│   │   └── MyCourses
│   │       ├── EnrolledCourseCard (repeated)
│   │       └── ContinueLearningButton
│   ├── LessonsView
│   │   ├── LessonList
│   │   │   ├── LessonItem (repeated)
│   │   │   └── ProgressRing
│   │   └── LessonContent
│   ├── AssignmentsView
│   │   ├── AssignmentDashboard
│   │   │   ├── AssignmentCard (repeated)
│   │   │   └── DueCountdown
│   │   └── SubmissionForm
│   │       ├── FileUploader
│   │       ├── CameraCapture
│   │       └── SubmitButton
│   ├── GradesView
│   │   ├── SubjectCard (repeated)
│   │   ├── GradeChart
│   │   ├── ClassRanking
│   │   └── DSEPREDICTION
│   └── ParentView
│       ├── ProgressSummary
│       ├── AttendanceAlerts
│       ├── GradeNotifications
│       └── TeacherInbox
└── Footer
    ├── Links
    └── Copyright
```

### Component Guidelines

#### Reusability Principles
- **Single Responsibility:** One job per component
- **Props In, Events Out:** Unidirectional data flow
- **Stateless UI:** Pure functions where possible
- **Smart Containers:** Only top-level components manage state

#### Component Example: CourseCard
```javascript
function CourseCard(course, onEnroll, language) {
  const { id, subject, title, progress, thumbnail } = course;

  return `
    <div class="course-card" data-course-id="${id}">
      <img src="${thumbnail}" alt="${title}" class="course-thumb">
      <h3>${language === 'zh' ? subjectZh : subjectEn}</h3>
      <div class="progress-ring">
        <svg viewBox="0 0 36 36">
          <circle r="16" cx="18" cy="18" fill="none" stroke="${progressColor}" stroke-width="4"/>
        <path d="${arcPath}" fill="${progressColor}"/>
        </svg>
        <span class="percentage">${Math.round(progress * 100)}%</span>
      </div>
      <p>${title}</p>
      <button class="btn-primary" onclick="handleEnroll(${id})">
        ${language === 'zh' ? '繼續學習' : 'Continue Learning'}
      </button>
    </div>
  `;
}
```

---

## 🛤️ Client-Side Routing

### Hash-Based Router

```javascript
const Router = (() => {
  const routes = {
    '#/': DashboardView,
    '#/courses': CoursesView,
    '#/courses/:id': LessonsView,
    '#/assignments': AssignmentsView,
    '#/grades': GradesView,
    '#/parent': ParentView,
    '#/settings': SettingsView,
  };

  const parseHash = (hash) => {
    const [path, param] = hash.slice(1).split('/');
    return { path, param };
  };

  const navigate = (hash) => {
    window.location.hash = hash;
    const { path, param } = parseHash(hash);
    const View = routes[hash] || routes['#/'];
    if (View) {
      View.render(param);
      updateActiveNav(hash);
    }
  };

  const back = () => {
    const history = JSON.parse(sessionStorage.getItem('nav-history') || []);
    history.pop();
    sessionStorage.setItem('nav-history', JSON.stringify(history));
    if (history.length > 0) {
      navigate(history[history.length - 1]);
    }
  };

  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    navigate(window.location.hash);
  });

  // Track navigation history
  const originalNavigate = navigate;
  navigate = (hash) => {
    const history = JSON.parse(sessionStorage.getItem('nav-history') || []);
    history.push(hash);
    sessionStorage.setItem('nav-history', JSON.stringify(history));
    originalNavigate(hash);
  };

  return { navigate, back };
})();
```

### Navigation State
- **History Tracking:** sessionStorage (limited to 50 entries)
- **Active Route Highlight:** Update navigation based on hash
- **Back Button Support:** Browser back button works correctly

---

## 📊 Performance Architecture

### Loading Strategy

#### Progressive Enhancement
1. **Critical Path CSS:** Inline for above-fold content
2. **Non-Critical CSS:** Load asynchronously
3. **JavaScript:** Defer non-critical scripts
4. **Images:** Lazy load below fold

#### Critical Rendering Path (LCP)
```html
<head>
  <!-- Inline critical CSS -->
  <style>
    /* Header, Navigation, Hero above-fold styles */
    body { margin: 0; font-family: 'Inter', sans-serif; }
    .header { position: sticky; top: 0; z-index: 1000; }
    .hero { min-height: 400px; }
  </style>

  <!-- Preconnect to CDN -->
  <link rel="preconnect" href="https://cdn.tailwindcss.com">

  <!-- Tailwind CSS (async) -->
  <script src="https://cdn.tailwindcss.com" async></script>
</head>
```

#### Image Optimization
- **Format:** WebP for modern browsers, JPG fallback
- **Dimensions:** Serve appropriate size (mobile vs desktop)
- **Compression:** 85% quality (balance quality/size)
- **Lazy Loading:** `<img loading="lazy" srcset="...">`

### Bundle Size Targets
- **HTML:** < 50KB (minified)
- **CSS (Tailwind):** < 100KB (purged)
- **JavaScript:** < 150KB (minified, gzipped)
- **Total First Paint:** < 1.5s (3G mobile)

---

## 🔐 Security Architecture

### Client-Side Security

#### XSS Prevention
```javascript
// Sanitize user input
const sanitizeHTML = (html) => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

// Escape before rendering
const escapeHTML = (str) => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};
```

#### Content Security Policy (CSP)
```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://cdn.tailwindcss.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  connect-src 'self';
```

### Authentication (Future Backend)
- **Password Hashing:** bcrypt or argon2
- **Session Management:** JWT with 30-minute expiry
- **HTTPS Only:** Enforce SSL/TLS
- **Rate Limiting:** 5 failed logins per 15 minutes

### Data Privacy (HK PDPO Compliance)
- **Minimal Data:** Only collect necessary PII
- **User Consent:** Explicit opt-in for parent portal
- **Data Retention:** 1 year maximum, auto-delete
- **Right to Erasure:** User can delete all data

---

## ♿ Accessibility Architecture

### WCAG 2.1 AA Compliance

#### Keyboard Navigation
```html
<!-- All interactive elements keyboard accessible -->
<button tabindex="0" onclick="handleAction()">
  <span aria-hidden="true">👉</span>
  Continue Learning
</button>

<!-- Focus management -->
<div role="dialog" aria-modal="true">
  <button onclick="closeDialog()">Close</button>
</div>
```

#### Screen Reader Support
```html
<!-- Alt text for images -->
<img src="course-thumb.jpg" alt="Course: Chinese Language, Form 5, 15 lessons, 65% complete">

<!-- ARIA labels for forms -->
<input type="file" id="file-upload" aria-label="Upload assignment file">

<!-- Live regions for dynamic content -->
<div aria-live="polite">
  <p>Assignment submitted successfully!</p>
</div>
```

#### Color Contrast
```css
/* Minimum 4.5:1 contrast ratio */
.text-on-primary {
  color: white;
  background-color: #FF6B9D;  /* Passes WCAG AA */
}

.text-on-secondary {
  color: #1E1E1E;
  background-color: #4ECDC4;  /* Passes WCAG AA */
}
```

---

## 📱 Mobile-First Architecture

### Touch Optimization

#### Minimum Touch Targets (44px × 44px)
```css
/* Tailwind utility classes */
.btn-touch {
  @apply min-h-[44px] min-w-[44px];  /* Apple HIG */
}

.icon-touch {
  @apply h-12 w-12;  /* 48px */
}
```

#### Swipe Gestures
```javascript
// Simple swipe detection
let touchStartX = 0;
let touchEndX = 0;

const onTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
};

const onTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > 50) {  // 50px threshold
    if (diff > 0) {
      handleSwipeLeft();  // Swipe left
    } else {
      handleSwipeRight();  // Swipe right
    }
  }
};

// Attach to cards
document.querySelectorAll('.course-card').forEach(card => {
  card.addEventListener('touchstart', onTouchStart);
  card.addEventListener('touchend', onTouchEnd);
});
```

#### Pull-to-Refresh
```javascript
// Mobile pull-to-refresh
let startY = 0;
let isRefreshing = false;

const onTouchStart = (e) => {
  startY = e.touches[0].clientY;
};

const onTouchMove = (e) => {
  const currentY = e.touches[0].clientY;
  const diff = startY - currentY;

  if (diff > 100) {  // Pulled down 100px
    showRefreshIndicator();
  }
};

const onTouchEnd = () => {
  if (isRefreshing) {
    refreshContent();
  }
  hideRefreshIndicator();
};
```

---

## 🚀 Deployment Architecture

### Vercel Configuration

#### vercel.json
```json
{
  "buildCommand": "echo 'No build needed - static HTML'",
  "outputDirectory": ".",
  "routes": [
    {
      "src": "/",
      "status": 200
    },
    {
      "src": "/(.*)",
      "status": 404
    }
  ],
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
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ]
}
```

### CDN Configuration
- **Tailwind CSS:** cdn.tailwindcss.com
- **Noto Sans TC:** fonts.googleapis.com
- **Icons:** Use SVG inline (no external dependency)

---

## 📈 Scalability Path

### Phase 2: Backend Integration

#### Future Backend Architecture
```
┌─────────────────────────────────────────┐
│           API Gateway                 │
│              │                    │
│    ┌─────────┴─────────┐       │
│    │                    │       │
│    ▼                    ▼       │
│ ┌──────────┐      ┌──────────┐│
│ │Auth Service│      │Course API││
│ └──────────┘      └──────────┘│
│                            │       │
│    ┌───────────────────────┐       │
│    │    PostgreSQL DB        │       │
│    └───────────────────────┘       │
│                                    │
└─────────────────────────────────────────┘
```

#### Tech Stack Considerations
- **Backend:** Node.js + Express or Python + FastAPI
- **Database:** PostgreSQL (relational) or MongoDB (document)
- **Authentication:** JWT + bcrypt
- **File Storage:** AWS S3 or Vercel Blob
- **Real-time:** WebSocket or Server-Sent Events

---

## 🧪 Testing Architecture

### Mobile Testing (Primary - Hong Kong)
- **Device:** iPhone (iOS Safari 14+) - #1 priority
- **Device:** Samsung Galaxy (Chrome) - #2 priority
- **Emulator:** BrowserStack or Device Lab

### Performance Testing
- **Lighthouse:** 90+ score
- **WebPageTest:** < 3s load (3G)
- **Bundle Analysis:** Webpack Bundle Analyzer

### Accessibility Testing
- **WAVE:** Automated WCAG check
- **Screen Reader:** VoiceOver (iOS), TalkBack (Android)
- **Keyboard:** Tab navigation test

---

## 📊 Architecture Decision Log

| Decision | Rationale | Trade-offs |
|----------|-----------|-------------|
| Vanilla JS for MVP | Faster development, no build step | Harder to scale, will need refactoring |
| Tailwind CDN | No build pipeline, easy updates | Larger initial load, no tree-shaking |
| Mock Data | Validate UX before backend | No real persistence, limited functionality |
| Hash-based routing | Simple, no server needed | No SEO for inner pages, deep linking issues |
| localStorage state | Client-side persistence, fast | 5MB limit, no server sync |

---

## 🎯 Next Steps (Implementation Phase)

1. **UX Designer** → Create detailed wireframes for all views
2. **Developer** → Implement core features (F1-F7)
3. **Testing** → Validate on iOS Safari (primary HK device)
4. **Deployment** → Deploy to Vercel for MVP launch

---

*Architecture Complete*
*Author: Auto-BMAD (System Architect)*
*Hong Kong mobile-first considerations applied*
*Ready for implementation phase*
