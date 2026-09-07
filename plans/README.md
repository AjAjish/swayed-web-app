# Animation Improvement Plans

Generated: 2026-09-07
Commit: f622d78

## Plan Index

| # | Title | Severity | Category | Status | Dependencies |
|---|-------|----------|----------|--------|--------------|
| 001 | Define easing tokens and replace all bare `ease` transitions | HIGH | 2, 7 | DONE | — |
| 002 | Fix physicality: remove scale(0) entrances, add press feedback | HIGH/MEDIUM | 3 | DONE | 001 (fadeIn keyframes) |
| 003 | Reduce gallery image hover transition 350ms → 200ms | MEDIUM | 2, 5 | DONE | 001 (ease token) |
| 004 | Optimize Three.js frame budget (throttle, reduce particles) | MEDIUM | 5 | DONE | — |

## Recommended Execution Order

1. **001** — Foundational: defines tokens used by 002, 003
2. **002** — High user-facing impact: press feedback on every interactive element
3. **003** — Quick win: single line change, depends on 001 token
4. **004** — Independent: Three.js optimization, can run in parallel

## Dependencies Detail

- **002 → 001**: Both modify `@keyframes fadeIn`. Execute 001 first, then 002 uses the updated keyframes.
- **003 → 001**: Uses `var(--ease-out)` token. If 001 not done, inline the cubic-bezier.
- **004**: Independent — no CSS token dependencies.

## Verification Checklist (Post-Execution)

After all plans applied:

- [x] `npm run build` passes
- [x] `npm run lint` passes
- [x] DevTools Animations panel: all UI transitions use `cubic-bezier(0.23, 1, 0.32, 1)` or `linear`
- [x] Every button/link/chip/card has `:active scale(0.97)` feedback
- [x] Gallery hover is 200ms, feels snappy
- [x] Smoke particles don't pop from scale(0)
- [x] FadeIn entrance uses scale(0.97) + translateY(-4px)
- [x] Three.js pauses in background tab / offscreen
- [x] `prefers-reduced-motion`: movement stops, color/opacity feedback remains
- [x] Mobile touch: press states work on tap-hold

## Notes

- Plans are written for zero-context executor — all values inlined
- Feel checks require human verification at 10% playback speed
- If code has drifted since commit f622d78, executor must STOP and report