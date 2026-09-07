# 002 — Fix physicality: remove scale(0) entrances, add press feedback to all interactive elements

- **Status**: TODO
- **Commit**: f622d78
- **Severity**: HIGH (scale(0)) + MEDIUM (missing press feedback)
- **Category**: 3. Physicality & Origin
- **Estimated scope**: 1 file (src/App.jsx), ~25 selectors

## Problem

### 1. `scale(0)` entrances violate physicality

Nothing in the real world appears from nothing. AUDIT.md: "Never `scale(0)` — nothing in the real world appears from nothing. Target: `scale(0.9–0.97)` + `opacity: 0`."

**Current code — `src/App.jsx:1542` (`smokeRise` keyframes):**
```css
@keyframes smokeRise {
  0% {
    transform: translateY(0) translateX(0) scale(0.6);
    opacity: 0;
  }
  20% {
    opacity: 0.38;
  }
  70% {
    opacity: 0.22;
  }
  100% {
    transform: translateY(-88px) translateX(18px) scale(1.8);
    opacity: 0;
  }
}
```
- Starts at `scale(0.6)` — too small, feels like "popping into existence"
- Ends at `scale(1.8)` — excessive growth

**Current code — `src/App.jsx:2494-2496` (`fadeIn` keyframes):**
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
```
- Missing initial scale — pure translate entrance feels like "sliding in from nowhere"

### 2. Missing press (`:active`) feedback on all interactive elements

AUDIT.md: "Press feedback: `transform: scale(0.97)` on `:active` with `transition: transform 160ms ease-out`. Keep it subtle (0.95–0.98)."

**Interactive elements with NO `:active` state:**
- `.nav-link` (line 1212)
- `.solid-btn`, `.ghost-btn`, `.theme-btn`, `.menu-toggle`, `.chip` (line 1253)
- `.menu-card` (line 1896)
- `.gallery-item` (line 2058)
- `.mobile-link` (line 2182)
- `.contact-detail` (line 2249)
- `.trust-item` (line 2418)
- Form inputs (focus has border/box-shadow but no press)
- `.social-btn` (inline style, no active)
- `.map-link` (inline style, no active)
- `.mobile-order` (line 2187)
- `.form-submit-btn` (inline style, no active)

## Target

### Fix 1: Update `smokeRise` keyframes (line 1540-1555)
```css
@keyframes smokeRise {
  0% {
    transform: translateY(0) translateX(0) scale(0.9);
    opacity: 0;
  }
  15% {
    opacity: 0.4;
  }
  70% {
    opacity: 0.2;
  }
  100% {
    transform: translateY(-88px) translateX(18px) scale(1.2);
    opacity: 0;
  }
}
```
- Start: `scale(0.9)` (not 0.6)
- End: `scale(1.2)` (not 1.8)
- Opacity peak earlier (15% vs 20%) for more natural dissipation

### Fix 2: Update `fadeIn` keyframes (line 2494-2496) — already covered in plan 001 but repeated here for completeness
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
```

### Fix 3: Add `:active` press feedback to all interactive elements

Add after each element's base rule (or in a consolidated block):

```css
/* Nav links */
.nav-link:active {
  transform: scale(0.97);
  transition: transform 160ms ease-out;
}

/* Buttons, chips, toggles */
.solid-btn:active,
.ghost-btn:active,
.theme-btn:active,
.menu-toggle:active,
.chip:active {
  transform: scale(0.97);
  transition: transform 160ms ease-out;
}

/* Menu cards */
.menu-card:active {
  transform: scale(0.99) translateY(-1px);
  transition: transform 160ms ease-out, box-shadow 160ms ease-out;
}

/* Gallery items */
.gallery-item:active img {
  transform: scale(1.02);
  transition: transform 160ms ease-out;
}

/* Mobile menu links */
.mobile-link:active {
  transform: scale(0.98);
  transition: transform 160ms ease-out;
}

/* Contact detail links */
.contact-detail:active {
  transform: scale(0.98) translateX(2px);
  transition: transform 160ms ease-out;
}

/* Trust items */
.trust-item:active {
  transform: scale(0.98);
  transition: transform 160ms ease-out;
}

/* Form inputs — subtle press */
.form-field input:active,
.form-field textarea:active {
  transform: scale(0.995);
  transition: transform 120ms ease-out;
}

/* Social buttons, map link, mobile order, submit button — inline styles need CSS */
/* These have inline styles, so add classes or move to CSS */
```

### Fix 4: Move inline-styled buttons to CSS classes for `:active` support

Elements with inline `style={{...}}` that need press feedback:
- `.social-btn` (Contact section, line ~800)
- `.map-link` (Contact section, line ~825)
- `.mobile-order` (line 2187)
- `.form-submit-btn` (line ~860)

**Action**: Add CSS classes for these and apply `:active` in stylesheet.

## Repo conventions to follow

- All CSS in inline `<style>` block in `src/App.jsx`
- Use `var(--ease-out)` for press transition (160ms ease-out = `cubic-bezier(0.23, 1, 0.32, 1)` at 160ms)
- Exemplar: existing hover transforms like `.nav-link:hover { transform: translateY(-1px); }` (line 1221)

## Steps

1. **Update `smokeRise` keyframes** (lines 1540-1555) with new scale values
2. **Update `fadeIn` keyframes** (lines 2494-2496) — coordinate with plan 001
3. **Add consolidated `:active` block** after all component styles (before `@media` queries, around line 2500):
   ```css
   /* Press feedback — :active states */
   .nav-link:active,
   .solid-btn:active,
   .ghost-btn:active,
   .theme-btn:active,
   .menu-toggle:active,
   .chip:active,
   .mobile-link:active,
   .contact-detail:active,
   .trust-item:active {
     transform: scale(0.97);
     transition: transform 160ms var(--ease-out);
   }
   
   .menu-card:active {
     transform: scale(0.99) translateY(-1px);
     transition: transform 160ms var(--ease-out), box-shadow 160ms var(--ease-out);
   }
   
   .gallery-item:active img {
     transform: scale(1.02);
     transition: transform 160ms var(--ease-out);
   }
   
   .form-field input:active,
   .form-field textarea:active {
     transform: scale(0.995);
     transition: transform 120ms var(--ease-out);
   }
   ```

4. **Refactor inline-styled buttons** to use CSS classes:
   - Search for `style={{` in Contact component
   - Replace with `className="social-btn"` etc.
   - Add corresponding CSS rules with `:active`

5. **Ensure `:active` works on touch** — add `touch-action: manipulation` to interactive elements if needed (but default is fine for buttons/links)

## Boundaries

- Do NOT modify `src/ThreeCoffeeMotion.jsx`
- Do NOT change React component structure — only CSS and minimal className additions
- Do NOT add new dependencies
- Coordinate `fadeIn` change with plan 001 (same keyframes)

## Verification

- **Mechanical**: `npm run build` succeeds, `npm run lint` passes
- **Feel check**:
  - Open DevTools → Animations panel → 10% playback
  - **Tap/click every interactive element** (nav links, buttons, chips, menu cards, gallery images, contact details, trust items, form inputs)
  - Confirm each shows subtle `scale(0.97)` press feedback that releases smoothly
  - On mobile/tablet: tap and hold — confirm press state shows during touch
  - Watch smoke animation — confirm particles don't "pop" from tiny scale
  - Submit form — confirm success message scales in from 0.97, not just slides
  - Toggle `prefers-reduced-motion` — confirm press feedback still works (opacity/color only, transform dropped per reduced-motion block)
- **Done when**: All interactive elements have `:active` scale, `scale(0.6)` removed, `scale(0.97)` on fadeIn, build passes