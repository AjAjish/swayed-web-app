# 004 — Optimize Three.js animation frame budget: throttle rAF, reduce particle count, respect prefers-reduced-motion

- **Status**: TODO
- **Commit**: f622d78
- **Severity**: MEDIUM
- **Category**: 5. Performance
- **Estimated scope**: 1 file (src/ThreeCoffeeMotion.jsx), ~150 lines

## Problem

The Three.js canvas runs a continuous `requestAnimationFrame` loop updating:
- 42 coffee bean meshes (position, rotation)
- 160 steam particles (position, pool recycling)
- 2 rotation groups

Every frame (60fps target), all 202 objects are updated. Under load (mobile, low-end devices, background tabs), this drops frames and consumes CPU/GPU unnecessarily for a decorative hero background.

**Current code — `src/ThreeCoffeeMotion.jsx:140`:**
```javascript
const animate = () => {
  const elapsed = clock.getElapsedTime();

  beansGroup.rotation.y = elapsed * 0.11;
  beansGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.08;

  beans.forEach((bean, index) => {
    const { speed, phase } = bean.userData;
    bean.position.y += Math.sin(elapsed * speed + phase + index * 0.1) * 0.0026;
    bean.rotation.x += 0.01;
    bean.rotation.y += 0.006;
  });

  const positionAttr = steamGeometry.getAttribute("position");
  for (let index = 0; index < steamCount; index += 1) {
    const i3 = index * 3;
    let x = positionAttr.array[i3];
    let y = positionAttr.array[i3 + 1];
    x += Math.sin(elapsed * 0.4 + index * 0.13) * 0.0019;
    y += 0.008 + Math.sin(elapsed + index) * 0.001;
    if (y > 3.7) {
      y = -2.5;
      x = (Math.random() - 0.5) * 7;
    }
    positionAttr.array[i3] = x;
    positionAttr.array[i3 + 1] = y;
  }
  positionAttr.needsUpdate = true;

  steam.rotation.y = elapsed * 0.08;
  renderer.render(scene, camera);
  frameId = requestAnimationFrame(animate);
};
```

Issues:
1. **No frame budget awareness** — runs at max speed regardless of device capability
2. **160 steam particles** — high for a subtle background effect
3. **42 beans with per-frame math** — `Math.sin` called 126+ times/frame
4. **`prefers-reduced-motion` handled** (good) but static fallback still renders canvas
5. **No visibility check** — runs in background tabs, offscreen

## Target

1. **Throttle to 30fps** for decorative background (imperceptible for slow ambient motion)
2. **Reduce particles**: 160 → 80 steam, 42 → 24 beans
3. **Precompute animation values** where possible
4. **Pause when tab hidden** (Page Visibility API)
5. **Pause when offscreen** (IntersectionObserver)
6. **Static fallback for reduced-motion** should not mount Three.js at all

## Repo conventions to follow

- Component at `src/ThreeCoffeeMotion.jsx`
- Lazy-loaded with `Suspense` in `src/App.jsx`
- `prefers-reduced-motion` already detected via `matchMedia`
- CSS static fallback in `App.jsx` (`.three-motion-static` with `.static-coffee-scene`)

## Steps

1. **Reduce particle counts** in `ThreeCoffeeMotion.jsx`:
   ```javascript
   // Line ~187: beans
   for (let index = 0; index < 24; index += 1) {  // was 42
   
   // Line ~209: steam
   const steamCount = 80;  // was 160
   ```

2. **Add frame throttling** (target ~30fps = 33ms per frame):
   ```javascript
   let lastFrameTime = 0;
   const targetFrameTime = 1000 / 30; // 33.33ms
   
   const animate = (currentTime) => {
     if (currentTime - lastFrameTime < targetFrameTime) {
       frameId = requestAnimationFrame(animate);
       return;
     }
     lastFrameTime = currentTime;
     // ... rest of animation logic
   };
   ```

3. **Add Page Visibility API pause**:
   ```javascript
   useEffect(() => {
     const handleVisibilityChange = () => {
       if (document.hidden) {
         cancelAnimationFrame(frameId);
       } else {
         lastFrameTime = performance.now();
         animate(lastFrameTime);
       }
     };
     document.addEventListener("visibilitychange", handleVisibilityChange);
     return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
   }, []);
   ```

4. **Add IntersectionObserver for offscreen pause**:
   ```javascript
   useEffect(() => {
     if (!mountRef.current) return;
     
     const observer = new IntersectionObserver(
       ([entry]) => {
         if (entry.isIntersecting) {
           lastFrameTime = performance.now();
           animate(lastFrameTime);
         } else {
           cancelAnimationFrame(frameId);
         }
       },
       { rootMargin: "100px" } // pause 100px before leaving viewport
     );
     
     observer.observe(mountRef.current);
     return () => observer.disconnect();
   }, []);
   ```

5. **Optimize steam particle update** — precompute sin/cos tables or use simpler math:
   ```javascript
   // Instead of per-particle Math.sin, use a shared time uniform
   // Or reduce to simple linear rise with occasional jitter
   
   // Simplified version:
   for (let index = 0; index < steamCount; index += 1) {
     const i3 = index * 3;
     let y = positionAttr.array[i3 + 1];
     y += 0.008; // constant rise
     // Only add jitter to every 4th particle
     if (index % 4 === 0) {
       const x = positionAttr.array[i3];
       positionAttr.array[i3] = x + Math.sin(elapsed * 0.4 + index * 0.13) * 0.0019;
     }
     if (y > 3.7) {
       positionAttr.array[i3 + 1] = -2.5;
       positionAttr.array[i3] = (Math.random() - 0.5) * 7;
     } else {
       positionAttr.array[i3 + 1] = y;
     }
   }
   ```

6. **Ensure reduced-motion static fallback doesn't mount Three.js** — already handled by early return in `useEffect`, verify the `ThreeLoadingFallback` in `App.jsx` shows the static scene without canvas.

## Boundaries

- Do NOT change the visual appearance significantly — motion should feel similar
- Do NOT modify `src/App.jsx` except if needed for static fallback
- Do NOT add new dependencies (Three.js already present)
- Keep `prefers-reduced-motion` handling intact

## Verification

- **Mechanical**: `npm run build` succeeds, `npm run lint` passes
- **Feel check**:
  - Open DevTools → Performance tab → record 10s interaction
  - Confirm Three.js frame time < 16ms (ideally < 10ms) on desktop
  - Test on mobile (Chrome DevTools device toolbar) — confirm no jank
  - Switch to background tab → CPU usage should drop to near zero
  - Scroll hero offscreen → animation pauses (check via `requestAnimationFrame` not firing)
  - Toggle `prefers-reduced-motion` → Three.js unmounts, static scene shows
  - Visual comparison: side-by-side with original — motion quality should be indistinguishable at normal speed
- **Done when**: Frame budget met, background/offscreen pauses work, particle counts reduced, build passes