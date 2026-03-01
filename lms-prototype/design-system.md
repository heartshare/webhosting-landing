# Design System: EduFlow LMS

## Pattern
- **Name:** Minimal Single Column
- **Conversion Focus:** Single CTA focus. Large typography. Lots of whitespace. No nav clutter. Mobile-first.
- **CTA Placement:** Center, large CTA button
- **Color Strategy:** Minimalist: Brand + white #FFFFFF + accent. Buttons: High contrast 7:1+. Text: Black/Dark grey
- **Sections:** 1. Hero headline, 2. Short description, 3. Benefit bullets (3 max), 4. CTA, 5. Footer

## Style
- **Name:** Micro-interactions
- **Keywords:** Small animations, gesture-based, tactile feedback, subtle animations, contextual interactions, responsive
- **Best For:** Mobile apps, touchscreen UIs, productivity tools, user-friendly, consumer apps, interactive components
- **Performance:** ⚡ Excellent | **Accessibility:** ✓ Good

## Colors
| Role | Hex | Tailwind |
|------|-----|---------|
| Primary | #4F46E5 | indigo-600 |
| Secondary | #818CF8 | indigo-400 |
| CTA | #22C55E | green-500 |
| Background | #EEF2FF | indigo-50 |
| Text | #312E81 | indigo-900 |
| White | #FFFFFF | white |
| Gray | #6B7280 | gray-500 |

*Notes: Learning indigo + progress green*

## Typography
- **Heading:** Baloo 2
- **Body:** Comic Neue
- **Mood:** kids, education, playful, friendly, colorful, learning
- **Best For:** Children's apps, educational games, kid-friendly content
- **Google Fonts:** https://fonts.google.com/share?selection?family=Baloo+2:wght@400;500;600;700|Comic+Neue:wght@300;400;700
- **CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700&family=Comic+Neue:wght@300;400;700&display=swap');
```

## Key Effects
Small hover (50-100ms), loading spinners, success/error state anim, gesture-triggered (swipe/pinch), haptic

## Anti-patterns to Avoid
- Dark modes
- Complex jargon
- Emoji icons (use SVG: Heroicons/Lucide)
- No hover states

## iPhone 16 Specifications
- Screen Size: 393px × 852px
- Border Radius: 50px
- Status Bar Height: 54px
- Tab Bar Height: 83px
- Safe Area Top: 54px
- Safe Area Bottom: 34px

## Images (Real Unsplash URLs)
- Home Hero: https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop
- Course Card 1: https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop
- Course Card 2: https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop
- Course Card 3: https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop
- Course Card 4: https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop
- Profile: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop
- Certificate: https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop

## Common Classes
```html
<!-- Card Hover -->
class="transition-all duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer"

<!-- Button -->
class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200 cursor-pointer"

<!-- Input -->
class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"

<!-- Progress Bar -->
class="w-full bg-gray-200 rounded-full h-2.5"
class="bg-green-500 h-2.5 rounded-full transition-all duration-500"
```

## Checklist
- [ ] No emojis as icons (use SVG)
- [ ] cursor-pointer on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode text contrast 4.5:1 minimum
- [ ] Focus states visible
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] Real images, no placeholders
- [ ] iOS status bar and tab bar
