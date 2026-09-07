# 001 — Define easing tokens and replace all bare `ease` transitions

- **Status**: TODO
- **Commit**: f622d78
- **Severity**: HIGH
- **Category**: 2. Easing & Duration, 7. Cohesion & Tokens
- **Estimated scope**: 1 file (src/App.jsx), ~40 transition declarations

## Problem

Every UI transition in the codebase uses bare `ease` (which resolves to `ease-in-out` in some browsers) or `ease-in-out` / `ease-in`. Per AUDIT.md:

- **Entering/exiting UI → `ease-out`** (starts fast, feels responsive)
- **Hover/color change → `ease`** (acceptable)
- **`ease-in` on UI is always a finding** — starts slow, delays perceived response
- **No shared tokens** — 8+ hardcoded easing values scattered across the file

Current code excerpts (all from `src/App.jsx` inline `<style>` block):

```css
/* App.jsx:1159 — nav shell scroll transition */
.nav-shell {
  transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

/* App.jsx:1212 — nav link hover */
.nav-link {
  transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

/* App.jsx:1253 — buttons, chips, toggles */
.solid-btn,
.ghost-btn,
.theme-btn,
.menu-toggle,
.chip {
  transition: 0.22s ease;
}

/* App.jsx:1359 — hero orbs (decorative, constant motion) */
.hero-orb {
  animation: orbFloat 12s ease-in-out infinite;
}

/* App.jsx:1428 — hero shot images (decorative) */
.hero-shot-row img {
  animation: shotFloat 6s ease-in-out infinite;
}

/* App.jsx:1496 — smoke particles (constant motion) */
.smoke {
  animation: smokeRise 4.8s ease-in infinite;
}

/* App.jsx:1537 — cup base (decorative) */
.cup-base {
  animation: cupFloat 3.6s ease-in-out infinite;
}

/* App.jsx:1649 — story image cards (decorative) */
.story-image-card {
  animation: drift 10s ease-in-out infinite;
}

/* App.jsx:1650 — story card hover (interactive) */
.story-image-card {
  transition: transform 0.24s ease, box-shadow 0.24s ease;
}

/* App.jsx:1768 — gallery marquee (constant motion) */
.gallery-track {
  animation: marqueeMove 34s linear infinite;
}

/* App.jsx:1834 — search suggestions */
.search-suggestions li {
  transition: background 0.15s ease;
}

/* App.jsx:1896 — menu cards (interactive) */
.menu-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* App.jsx:2058 — gallery images hover (interactive) */
.gallery-item img {
  transition: transform 0.35s ease;
}

/* App.jsx:2182 — mobile menu links */
.mobile-link {
  transition: background 0.2s ease, color 0.2s ease;
}

/* App.jsx:2249 — contact detail links */
.contact-detail {
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

/* App.jsx:2315 — form inputs focus */
.form-field input,
.form-field textarea {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

/* App.jsx:2418 — trust items */
.trust-item {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* App.jsx:2475, 2491 — submit success/error fadeIn */
.submit-success,
.submit-error {
  animation: fadeIn 0.3s ease;
}
```

## Target

Define 3 easing tokens in the `:root` block, then replace every transition/animation:

```css
/* Add to :root block (around line 752 in App.jsx) */
:root {
  /* existing tokens... */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);        /* strong ease-out for UI entrances/exits */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);    /* strong ease-in-out for on-screen movement */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);     /* iOS-like drawer curve (future use) */
}

/* Usage rules:
   - transform/opacity transitions on interactive elements → var(--ease-out)
   - color/background/border transitions on hover → ease (or var(--ease-out) for consistency)
   - constant motion (marquee, ambient float) → linear
   - on-screen morphing (drawer, modal) → var(--ease-in-out)
   - decorative infinite animations → linear or var(--ease-in-out)
*/
```

**Replacement mapping:**

| Current | Target | Rationale |
|---------|--------|-----------|
| `transition: ... 0.25s ease` (nav-shell) | `transition: background 0.25s var(--ease-out), border-color 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out);` | State change entering/exiting |
| `transition: ... 0.2s ease` (nav-link) | `transition: color 0.2s var(--ease-out), background 0.2s var(--ease-out), transform 0.2s var(--ease-out);` | Interactive element |
| `transition: 0.22s ease` (buttons/chips) | `transition: all 0.22s var(--ease-out);` | Interactive — use `all` is acceptable here since only color/transform/border change |
| `animation: ... ease-in-out` (hero orbs, shots, cup, story cards) | `animation: ... linear` | Constant ambient motion — linear prevents easing artifacts at loop boundary |
| `animation: smokeRise ... ease-in` | `animation: smokeRise 4.8s linear infinite` | Constant motion — `ease-in` is a finding |
| `animation: marqueeMove ... linear` | **Keep as-is** | Already correct for constant motion |
| `transition: ... 0.15s ease` (search suggestions) | `transition: background 0.15s var(--ease-out);` | Interactive hover |
| `transition: ... 0.2s ease` (menu cards) | `transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);` | Interactive hover |
| `transition: transform 0.35s ease` (gallery images) | `transition: transform 0.2s var(--ease-out);` | **Also reduce duration to 200ms** (see plan 003) |
| `transition: ... 0.2s ease` (mobile links, contact details, form inputs, trust items) | `transition: ... 0.2s var(--ease-out);` | Interactive hover/focus |
| `animation: fadeIn 0.3s ease` (submit messages) | `animation: fadeIn 0.3s var(--ease-out);` | Entrance animation |

**Updated `@keyframes fadeIn` (line 2494-2496):**
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
```

## Repo conventions to follow

- All CSS lives in the inline `<style>` block in `src/App.jsx` (lines 749-2500)
- CSS custom properties defined in `:root` and `:root[data-theme='dark']`
- No external CSS files for component styles
- Exemplar: existing `--brand`, `--stroke`, `--shadow` tokens in `:root` (lines 752-762)

## Steps

1. **Add easing tokens to `:root` block** (after `--shadow`, around line 761):
   ```css
   --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
   --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
   --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
   ```

2. **Add same tokens to `:root[data-theme='dark']`** (after `--shadow`, around line 773) for consistency:
   ```css
   --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
   --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
   --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
   ```

3. **Replace all bare `ease` in transitions** with `var(--ease-out)` for transform/opacity, keep `ease` only for color/background/border if desired (but `var(--ease-out)` is fine for all). Use find/replace across the style block.

4. **Change decorative infinite animations** from `ease-in-out`/`ease-in` to `linear`:
   - `.hero-orb` (line 1359): `animation: orbFloat 12s linear infinite;`
   - `.hero-shot-row img` (line 1428): `animation: shotFloat 6s linear infinite;`
   - `.smoke` (line 1496): `animation: smokeRise 4.8s linear infinite;`
   - `.cup-base` (line 1537): `animation: cupFloat 3.6s linear infinite;`
   - `.story-image-card` (line 1649): `animation: drift 10s linear infinite;`

5. **Update `@keyframes fadeIn`** (lines 2494-2496) to include initial scale per physicality rules:
   ```css
   @keyframes fadeIn {
     from { opacity: 0; transform: translateY(-4px) scale(0.97); }
     to { opacity: 1; transform: translateY(0) scale(1); }
   }
   ```

6. **Update `@media (prefers-reduced-motion: reduce)` block** (line 1094-1103) to preserve opacity/color transitions but drop transform:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *,
     *::before,
     *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
     /* Allow color/opacity transitions for feedback */
     button, a, input, textarea, select, .chip, .menu-card, .gallery-item, .contact-detail, .trust-item {
       transition: background-color 0.01ms, color 0.01ms, border-color 0.01ms, opacity 0.01ms !important;
     }
   }
   ```

## Boundaries

- Do NOT modify `src/ThreeCoffeeMotion.jsx` — Three.js animations handled separately
- Do NOT change HTML structure or React components — only CSS in the inline `<style>` block
- Do NOT add new dependencies
- Do NOT change durations except gallery hover (0.35s → 0.2s) which is also a performance finding

## Verification

- **Mechanical**: `npm run build` succeeds, `npm run lint` passes
- **Feel check**:
  - Open DevTools → Animations panel → set playback to 10%
  - Hover nav links, buttons, menu cards, gallery images — confirm they respond *instantly* (no lag at start)
  - Click/tap buttons — confirm press feels crisp (no ease-in sluggishness)
  - Toggle `prefers-reduced-motion` (Rendering panel) — confirm movement animations stop but hover color changes remain
  - Watch hero orbs/smoke/cup — confirm smooth linear loop (no easing stutter at loop boundary)
  - Submit contact form — confirm success message enters with `scale(0.97)` + fade, not just translateY
- **Done when**: All transitions use `var(--ease-out)` or `linear`, tokens defined in both themes, build passes