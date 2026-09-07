# 003 — Reduce gallery image hover transition duration from 350ms to 200ms

- **Status**: TODO
- **Commit**: f622d78
- **Severity**: MEDIUM
- **Category**: 5. Performance, 2. Easing & Duration
- **Estimated scope**: 1 file (src/App.jsx), 1 transition declaration

## Problem

Gallery images have a hover transform transition at 350ms, exceeding the 300ms budget for UI animations (AUDIT.md: "UI animations stay under 300ms").

**Current code — `src/App.jsx:2058`:**
```css
.gallery-item img {
  transition: transform 0.35s ease;
}

.gallery-item:hover img {
  transform: scale(1.06);
}
```

- Duration: 350ms > 300ms budget
- Easing: bare `ease` (should be `ease-out` per plan 001)
- Scale: 1.06 is acceptable (subtle)

## Target

```css
.gallery-item img {
  transition: transform 0.2s var(--ease-out);
}

.gallery-item:hover img {
  transform: scale(1.06);
}
```

- Duration: 200ms (within 150-250ms range for dropdowns/selects, hover is similar frequency)
- Easing: `var(--ease-out)` token (defined in plan 001)
- Scale: unchanged at 1.06

## Repo conventions to follow

- Easing token `var(--ease-out)` from plan 001
- All CSS in inline `<style>` block
- Exemplar: other hover transitions in the file (e.g., `.menu-card:hover` at line 1926 uses 0.2s)

## Steps

1. **Locate and update** line 2058 in `src/App.jsx`:
   ```css
   /* Before */
   .gallery-item img {
     transition: transform 0.35s ease;
   }
   
   /* After */
   .gallery-item img {
     transition: transform 0.2s var(--ease-out);
   }
   ```

2. **Verify** the hover transform remains `scale(1.06)` (line 2061)

## Boundaries

- Do NOT change the `scale(1.06)` value
- Do NOT modify `src/ThreeCoffeeMotion.jsx`
- Do NOT change React components
- Depends on plan 001 for `var(--ease-out)` token — if plan 001 not applied, use `cubic-bezier(0.23, 1, 0.32, 1)` inline

## Verification

- **Mechanical**: `npm run build` succeeds, `npm run lint` passes
- **Feel check**:
  - Open DevTools → Animations panel → 10% playback
  - Hover gallery images in the marquee
  - Confirm scale animation feels *snappy* — no perceptible lag at start
  - Compare to 350ms version (if reverting): 200ms should feel crisper, more responsive
  - Rapidly hover/unhover multiple images — confirm no animation queue buildup (transitions interrupt cleanly)
  - Toggle `prefers-reduced-motion` — confirm transform animation drops but image remains visible
- **Done when**: Transition is 200ms with `var(--ease-out)`, build passes