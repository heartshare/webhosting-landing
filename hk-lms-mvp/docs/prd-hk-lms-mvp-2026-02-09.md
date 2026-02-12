# HK LMS MVP - Product Requirements Document (PRD)

**Document Version:** 1.0
**Created:** 2026-02-09
**Project Level:** 2 (Medium Feature Set)
**Author:** Auto-BMAD (Product Manager)

---

## 📋 Executive Summary

**Product Name:** HK LMS MVP
**Target Market:** Hong Kong students, teachers, and parents
**Launch Timeline:** 4-6 weeks (MVP)
**Platform:** Web (HTML/JS + Tailwind CSS), Vercel deployment
**Primary Device:** Mobile-first, desktop compatible

**Mission:**
Provide a mobile-first, bilingual Learning Management System tailored to Hong Kong's education context, focusing on HKDSE/IB exam preparation, seamless bilingual experience, and parent engagement.

---

## 👥 User Personas

### Persona 1: Student - "陳小明" (Chen Xiaoming)
**Age:** 16 years old
**School:** Secondary School (Form 5)
**Level:** Preparing for HKDSE
**Tech:** iPhone, studies on MTR commute
**Goals:**
- Complete lessons efficiently on mobile
- Submit assignments on time
- Track grades and improvement
- Prepare for HKDSE exams
- Ask questions anonymously (less shy)

**Pain Points:**
- School LMS is desktop-only, hard on phone
- English-heavy interface, prefers Chinese
- Confused about progress toward grades
- Can't ask questions comfortably in class

### Persona 2: Teacher - "李老師" (Teacher Li)
**Age:** 38 years old
**Subject:** Chinese Language
**Tech:** iPad Pro (classes), iPhone (communication)
**Goals:**
- Upload lessons quickly
- Grade assignments efficiently
- Send announcements to class
- Track student progress
- Communicate with parents

**Pain Points:**
- Manual grading takes too long
- No mobile communication tool
- Difficult to track who's falling behind
- Parent inquiries take time

### Persona 3: Parent - "陳太太" (Mrs. Chen)
**Age:** 45 years old
**Child:** 陳小明 (Student)
**Tech:** Android smartphone (WhatsApp, WeChat)
**Goals:**
- Know child's progress in school
- Receive attendance notifications
- Contact teachers easily
- Pay school fees online
- Understand curriculum

**Pain Points:**
- No visibility into child's grades
- Missed attendance alerts
- Teachers unreachable outside school hours
- Forms require physical visits

---

## 🎯 Product Vision

**Core Value Proposition:**
"The first mobile-first, bilingual LMS designed for Hong Kong students' learning journey - from MTR commute to exam hall."

**Key Differentiators:**
1. **Mobile-First by Design** - 80%+ usage on smartphones
2. **Seamless Bilingual** - English/繁體中文 toggle, everywhere
3. **HK Education Context** - HKDSE/IB aligned, exam preparation focus
4. **Parent Portal** - Transparent progress, easy communication
5. **MTR Study Ready** - Offline mode, fast loading

---

## 📊 Success Metrics (MVP)

### Primary KPIs
- **User Registration:** 500+ students in first month
- **Daily Active Users (DAU):** 40%+ of registered users
- **Lesson Completion:** 60%+ of enrolled lessons completed
- **Assignment Submission Rate:** 80%+ of assignments submitted before deadline
- **Parent Portal Usage:** 30%+ of students have parent accounts linked

### Secondary KPIs
- **Language Toggle Usage:** 70%+ of users use language feature
- **Mobile Usage:** 75%+ of sessions on mobile devices
- **Forum Participation:** 50%+ of students post in forums
- **Average Session Duration:** 15+ minutes per visit

---

## 🎯 Scope - MVP Features

### Feature Set 1: Course Management (Priority 1)

#### F1.1 Course Catalog
**Description:** Browse and discover courses available for enrollment

**User Stories:**
- **US-101:** As a student, I want to browse courses by subject so I can find relevant classes
- **US-102:** As a student, I want to filter courses by level (Form 1-6, DSE, IB) so I see appropriate options
- **US-103:** As a student, I want to search courses by keyword so I can find specific topics

**Acceptance Criteria:**
- [ ] Course cards display subject, level, and brief description
- [ ] Filter by subject (Chinese, English, Math, Science, etc.)
- [ ] Filter by level (Form 1-6, HKDSE, IB)
- [ ] Search bar with real-time filtering
- [ ] Course details show enrolled status (Not Enrolled / Enrolled)

**Wireframe:**
```
Course Catalog
┌─────────────────────────────────────┐
│ [Search courses...] 🔍          │
├─────────────────────────────────────┤
│ Filter: [Subject▼] [Level▼]    │
├─────────────────────────────────────┤
│ ┌──────┐  ┌──────┐          │
│ │Chinese │  │English│          │
│ │  Form 5│  │ Form 5│          │
│ │📚15 lessons│  │📚20 lessons│    │
│ └──────┘  └──────┘          │
│ ┌──────┐                     │
│ │ Math  │                      │
│ │  DSE  │                      │
│ │📚25 lessons│                 │
│ └──────┘                      │
└─────────────────────────────────────┘
```

#### F1.2 Course Enrollment
**Description:** Enroll in available courses with one click

**User Stories:**
- **US-104:** As a student, I want to enroll in a course with one click so I can start learning immediately
- **US-105:** As a student, I want to see my enrolled courses on dashboard so I know what I'm studying

**Acceptance Criteria:**
- [ ] Enroll button on course detail page
- [ ] Confirmation modal after enrollment
- [ ] Dashboard shows enrolled courses with progress
- [ ] "Enroll Now" disabled if already enrolled
- [ ] Maximum enrollment limit per student (prevent overload)

---

### Feature Set 2: Lesson Navigation (Priority 1)

#### F2.1 Lesson List
**Description:** View and navigate lessons within enrolled courses

**User Stories:**
- **US-106:** As a student, I want to see all lessons in a course so I know what to study
- **US-107:** As a student, I want to mark lessons as complete so I can track progress
- **US-108:** As a student, I want a "Continue Learning" button so I can resume where I left off

**Acceptance Criteria:**
- [ ] Lesson list shows title, duration, completion status
- [ ] Checkbox or toggle to mark lesson complete
- [ ] Progress ring shows completion percentage
- [ ] "Continue Learning" button goes to last incomplete lesson
- [ ] Completed lessons are visually distinct

**Wireframe:**
```
Course: Chinese Language (Form 5)
┌─────────────────────────────────────┐
│ ← Back to Courses                 │
├─────────────────────────────────────┤
│ 📖 Lesson 1: Introduction        │
│    [⬜] Complete   5 min          │
│                                    │
│ 📖 Lesson 2: Basic Concepts      │
│    [☑] Complete   12 min         │
│                                    │
│ 📖 Lesson 3: Grammar             │
│    [⬜] Complete   15 min         │
│                                    │
│ 📖 Lesson 4: Reading             │
│    [⬜] Complete   10 min         │
├─────────────────────────────────────┤
│ 🚀 Continue Learning (Lesson 3)       │
│ Progress: ████████░░░░░░ 25%      │
└─────────────────────────────────────┘
```

#### F2.2 Lesson Content View
**Description:** View lesson content (text, images, PDF, video)

**User Stories:**
- **US-109:** As a student, I want to view lesson content on mobile so I can study anywhere
- **US-110:** As a student, I want to download lessons for offline study so I can learn on MTR

**Acceptance Criteria:**
- [ ] Content responsive (mobile-first)
- [ ] Support PDF, images, and text
- [ ] Video player for video lessons (future)
- [ ] "Download for Offline" button
- [ ] Dark mode support

---

### Feature Set 3: Assignment Management (Priority 1)

#### F3.1 Assignment Dashboard
**Description:** View assignments with due dates and submission status

**User Stories:**
- **US-111:** As a student, I want to see all my assignments so I know what's due
- **US-112:** As a student, I want to see due date countdown so I don't miss deadlines
- **US-113:** As a student, I want to see submission status so I know if teacher received my work

**Acceptance Criteria:**
- [ ] Assignment cards show: title, course, due date, status
- [ ] Color-coded status (Not Started / In Progress / Submitted / Graded)
- [ ] Due date countdown (e.g., "Due in 2 days")
- [ ] Sort by due date (nearest first)
- [ ] Filter by course

**Wireframe:**
```
Assignments
┌─────────────────────────────────────┐
│ Due Date Filter: [All▼]           │
├─────────────────────────────────────┤
│ ⏰ Due Tomorrow              │
│ ┌─────────────────────────┐        │
│ │ Essay: HKDSE Practice │        │
│ │ English: Form 5       │        │
│ │ Due: Feb 10, 11:59 PM │       │
│ │ Status: ⬜ Not Started│        │
│ │ [Submit Now] 👉         │        │
│ └─────────────────────────┘        │
│                                    │
│ ⏰ Due in 3 Days            │
│ ┌─────────────────────────┐        │
│ │ Math Homework          │        │
│ │ Chinese: Form 5        │        │
│ │ Due: Feb 12, 11:59 PM │       │
│ │ Status: ⏳ In Progress│        │
│ │ [Continue] 👉            │        │
│ └─────────────────────────┘        │
└─────────────────────────────────────┘
```

#### F3.2 Assignment Submission
**Description:** Submit assignments with file uploads

**User Stories:**
- **US-114:** As a student, I want to upload files as assignments so I can submit homework
- **US-115:** As a student, I want to submit photos from camera so I can submit written work easily

**Acceptance Criteria:**
- [ ] File upload (PDF, images, documents)
- [ ] Camera capture button (take photo directly)
- [ ] Submit button with confirmation
- [ ] Submission timestamp recorded
- [ ] View past submissions (with grade)

---

### Feature Set 4: Grade Tracking (Priority 1)

#### F4.1 Grade Dashboard
**Description:** View grades by subject with historical trends

**User Stories:**
- **US-116:** As a student, I want to see my grades so I know my performance
- **US-117:** As a student, I want to see grade trends so I can track improvement
- **US-118:** As a student, I want HKDSE/IB grade predictions so I understand exam expectations

**Acceptance Criteria:**
- [ ] Grade card shows subject, grade, percentage, ranking
- [ ] Historical grade line chart (last 5 assessments)
- [ ] Grade trend indicator (↑ improving, ↓ declining, → stable)
- [ ] Class ranking (opt-in toggle for privacy)
- [ ] Grade prediction for HKDSE/IB based on current performance

**Wireframe:**
```
Grades
┌─────────────────────────────────────┐
│ Term: [2025-26▼]              │
├─────────────────────────────────────┤
│ 📊 Chinese Language               │
│    Grade: A (85%)                │
│    Class Rank: #3 (opt-in)        │
│    Trend: ↑ Improving (+5%)        │
│    DSE Prediction: Level 4-5       │
│                                    │
│    Grade History:                  │
│    A- │ A │ A │ B+ │           │
│    82% │ 85% │ 88% │ 85% │      │
│                                    │
│ 📊 English Language               │
│    Grade: B+ (78%)                │
│    Class Rank: #8                  │
│    Trend: → Stable                │
│    DSE Prediction: Level 3          │
│                                    │
│    Grade History:                  │
│    B │ B+ │ B+ │ A │            │
│    75% │ 76% │ 78% │ 78% │      │
└─────────────────────────────────────┘
```

---

### Feature Set 5: Bilingual UI (Priority 1)

#### F5.1 System-Wide Language Toggle
**Description:** Seamless English/繁體中文 switching throughout app

**User Stories:**
- **US-119:** As a student, I want to switch between English and Chinese so I can use my preferred language
- **US-120:** As a student, I want the system to auto-detect my language so I don't need to switch manually

**Acceptance Criteria:**
- [ ] Language toggle in header (persistent)
- [ ] Auto-detect browser/system language
- [ ] All UI elements support both languages
- [ ] Chinese font optimized (Noto Sans TC)
- [ ] Language preference saved to user profile

**Language Mapping:**
| English | 繁體中文 |
|----------|-----------|
| Dashboard | 儀表板 |
| Courses | 課程 |
| Assignments | 作業 |
| Grades | 成績 |
| Messages | 訊息 |
| Settings | 設定 |
| Submit | 提交 |
| Complete | 完成 |
| Due | 截止 |

---

### Feature Set 6: Mobile-First Design (Priority 1)

#### F6.1 Touch-Optimized Interface
**Description:** 44px+ touch targets, swipe gestures, dark mode

**User Stories:**
- **US-121:** As a student using mobile, I want large touch buttons so I can tap easily
- **US-122:** As a student, I want dark mode so I can study at night

**Acceptance Criteria:**
- [ ] Minimum 44px touch targets (Apple HIG)
- [ ] Swipe gestures (navigate, toggle, dismiss)
- [ ] Dark mode toggle (persistent)
- [ ] Responsive layout (mobile → tablet → desktop)
- [ ] Pull-to-refresh functionality
- [ ] Loading spinners and skeleton screens

---

### Feature Set 7: Parent Portal (Priority 1)

#### F7.1 Parent Dashboard
**Description:** View-only access to child's progress

**User Stories:**
- **US-123:** As a parent, I want to log in separately so I can check my child's progress
- **US-124:** As a parent, I want to see attendance alerts so I know if my child is absent
- **US-125:** As a parent, I want grade notifications so I know when grades are posted

**Acceptance Criteria:**
- [ ] Separate login for parents (view-only access)
- [ ] Link parent account to student account (student approves)
- [ ] Daily/weekly progress digest email
- [ ] Absent/late notification push
- [ ] Grade posted notification
- [ ] Message inbox (contact teachers)
- [ ] School announcements view

**Wireframe:**
```
Parent Portal - 陳太太's View
┌─────────────────────────────────────┐
│ Child: 陳小明 (Form 5)           │
│ View Mode: [Weekly Summary▼]       │
├─────────────────────────────────────┤
│ 📊 This Week's Progress           │
│    Lessons Completed: 15/20 (75%)  │
│    Assignments Submitted: 4/5 (80%)│
│    Attendance: 100% (no absences)   │
│                                    │
│ ⚠️ Alerts:                        │
│    🔔 Grade Posted: English (B+)      │
│    📅 No absences this week       │
│                                    │
│ 📝 Recent Messages:               │
│    👨‍🏫 Teacher Li:               │
│    "Xiaoming is doing great..."      │
│    [View Conversation] 👉           │
└─────────────────────────────────────┘
```

---

### Feature Set 8: Discussion Forums (Priority 2)

#### F8.1 Course Forums
**Description:** Ask questions and discuss course topics

**User Stories:**
- **US-126:** As a student, I want to post questions anonymously so I can ask comfortably
- **US-127:** As a student, I want to upvote helpful answers so quality content rises

**Acceptance Criteria:**
- [ ] Forum per course
- [ ] Anonymous posting option
- [ ] Upvote/downvote answers
- [ ] Teacher endorsement badge
- [ ] Search and filter
- [ ] File attachments
- [ ] Chinese input support (predictive text)

---

### Feature Set 9: Teacher Dashboard (Priority 2)

#### F9.1 Teacher Overview
**Description:** Quick class overview and management

**User Stories:**
- **US-128:** As a teacher, I want to see class overview so I know who's online/active
- **US-129:** As a teacher, I want bulk grading so I can grade many assignments quickly

**Acceptance Criteria:**
- [ ] Class roster with online status
- [ ] Recent submissions list
- [ ] Bulk grading interface
- [ ] Announcements broadcast
- [ ] Attendance tracker (present/absent toggle)
- [ ] Course material upload

---

### Feature Set 10: Exam Prep Module (Priority 2)

#### F10.1 Practice Tests
**Description:** HKDSE-style quiz formats with timed tests

**User Stories:**
- **US-130:** As a student, I want practice tests so I can prepare for HKDSE
- **US-131:** As a student, I want timed tests so I can simulate real exam conditions

**Acceptance Criteria:**
- [ ] HKDSE-style question formats (multiple choice, short answer, essay)
- [ ] Timer with countdown
- [ ] Immediate feedback after submission
- [ ] Review incorrect answers
- [ ] Previous year papers (teacher uploads)
- [ ] Performance analytics by question type

---

## 🎨 Design System (Tailwind CSS)

### Color Palette
```css
/* Primary Brand Colors */
--primary: #FF6B9D;    /* Coral Pink - Friendly, energetic */
--primary-dark: #FF5C8C;
--secondary: #4ECDC4;  /* Mint Teal - Fresh, calming */
--accent: #FFE66D;      /* Sunny Yellow - Cheerful */

/* Status Colors */
--success: #6BCB77;    /* Green - Complete, Good */
--warning: #FFA500;    /* Orange - Due Soon */
--danger: #FF6B6B;     /* Red - Overdue, Critical */
--info: #6495ED;       /* Blue - Info, Neutral */

/* Dark Mode */
--dark-bg: #1E1E1E;
--dark-card: #2D2D2D;
--dark-text: #FFFFFF;
```

### Typography
```css
/* Chinese Font Optimization */
--font-chinese: 'Noto Sans TC', 'Microsoft YaHei', sans-serif;

/* English Font */
--font-english: 'Inter', system-ui, sans-serif;

/* Headings */
--font-heading: 600;
--font-subheading: 500;

/* Body Text */
--font-body: 400;
--font-small: 14px;
--font-base: 16px;
--font-large: 18px;
```

### Spacing System
```css
/* Tailwind Spacing Scale (4px base) */
space-1: 4px;
space-2: 8px;
space-3: 12px;
space-4: 16px;
space-6: 24px;
space-8: 32px;
space-12: 48px;
```

### Component Guidelines

#### Buttons
- Minimum touch target: 44px × 44px (mobile)
- Primary: Coral pink background, white text
- Secondary: Transparent with pink border
- Icon buttons: 48px × 48px (easier to tap)

#### Cards
- Border radius: 12px-16px
- Box shadow: 0 4px 12px rgba(0,0,0,0.08)
- Hover: Transform translateY(-4px)

#### Inputs
- Touch targets: 48px height (minimum)
- Border radius: 8px
- Focus ring: 2px solid primary color
- Error state: Red border + error message

---

## 📱 Mobile-First Responsive Breakpoints

```css
/* Tailwind Breakpoints */
sm: 640px;   /* Large phones */
md: 768px;   /* Tablets */
lg: 1024px;  /* Small laptops */
xl: 1280px;  /* Desktop */
```

### Mobile (< 640px)
- Single column layout
- Bottom navigation bar
- Hamburger menu (if needed)
- Pull-to-refresh
- Swipe gestures (navigate, toggle)

### Tablet (640px - 1023px)
- Two column cards
- Side navigation (or top nav)
- Touch-friendly (44px+ targets)

### Desktop (≥ 1024px)
- Three column layout
- Persistent sidebar navigation
- Hover states enabled
- Keyboard shortcuts

---

## 🔐 Security & Privacy

### Data Privacy (Hong Kong Context)
- [ ] Comply with PDPO (Personal Data Privacy Ordinance)
- [ ] Student consent for parent portal access
- [ ] Anonymize forum posts (no real names unless approved)
- [ ] Grade ranking opt-in (default off for privacy)

### Authentication
- [ ] Email/password login
- [ ] Password reset via email
- [ ] Session timeout (30 minutes inactivity)
- [ ] Secure password hashing (bcrypt/argon2)

### Data Storage
- [ ] Student data encryption at rest
- [ ] Secure HTTPS only
- [ ] No PII in URLs

---

## 🚀 Technical Requirements

### Frontend Stack
- **HTML5** - Semantic markup
- **Vanilla JavaScript** - ES6+, no frameworks (MVP)
- **Tailwind CSS** - Styling via CDN
- **N/A** - No backend yet (MVP mock data)

### Performance
- [ ] < 2s initial load (3G)
- [ ] < 100ms interaction response
- [ ] 100/100 Lighthouse score
- [ ] Progressive loading (lazy load images)

### Browser Support
- [ ] iOS Safari 14+ (primary target for HK)
- [ ] Chrome 90+
- [ ] Safari macOS 14+
- [ ] Firefox 88+

### Accessibility (WCAG 2.1 AA)
- [ ] Color contrast ≥ 4.5:1
- [ ] Screen reader compatible (ARIA labels)
- [ ] Keyboard navigation
- [ ] Focus indicators visible
- [ ] Alt text for all images

---

## 📊 MVP Success Criteria

### Must Complete (MVP Launch)
1. ✅ All Priority 1 features (F1-F7) implemented
2. ✅ Bilingual UI (English/中文) functional
3. ✅ Mobile-first responsive design
4. ✅ Lighthouse score ≥ 90/100
5. ✅ Deployed to Vercel
6. ✅ Basic testing completed (iOS Safari, Chrome)

### Nice-to-Have (Post-MVP)
- Priority 2 features (F8-F10)
- Real backend integration
- User authentication
- Offline mode functionality
- Analytics dashboard

---

## 📅 Development Timeline (MVP)

### Week 1: Planning & Design
- Day 1-2: PRD finalization
- Day 3-4: UX design and wireframes
- Day 5: Design system setup (Tailwind)

### Week 2: Core Features (F1-F3)
- Day 1-2: Course management (F1)
- Day 3-4: Lesson navigation (F2)
- Day 5: Assignment management (F3)

### Week 3: Core Features (F4-F6)
- Day 1-2: Grade tracking (F4)
- Day 3: Bilingual UI (F5)
- Day 4: Mobile optimization (F6)
- Day 5: Parent portal (F7)

### Week 4: Polish & Testing
- Day 1-2: Priority 2 features (F8-F10)
- Day 3-4: Testing and bug fixes
- Day 5: Deployment to Vercel

### Week 5-6: User Testing & Iteration
- Day 1-5: Beta testing with 50 users
- Day 6-10: Feedback iteration and fixes

---

## 🎯 Next Steps

1. **UX Designer** → Create detailed wireframes for all features
2. **Developer** → Implement Priority 1 features (F1-F7)
3. **Testing** → Validate mobile experience on iOS Safari (primary HK device)
4. **Deployment** → Deploy to Vercel for MVP launch

---

*PRD Complete*
*Author: Auto-BMAD (Product Manager)*
*Hong Kong education context integrated*
*MVP scope defined*
