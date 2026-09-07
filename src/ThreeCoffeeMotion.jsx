import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function ThreeCoffeeMotion() {
  const mountRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!mountRef.current || prefersReducedMotion) return undefined;

    const container = mountRef.current;
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 15);

    const ambientLight = new THREE.AmbientLight(0xffe4c8, 0.75);
    scene.add(ambientLight);

    const warmLight = new THREE.PointLight(0xffb163, 1.1, 36);
    warmLight.position.set(4, 5, 9);
    scene.add(warmLight);

    const coolLight = new THREE.PointLight(0xc4d8ff, 0.5, 30);
    coolLight.position.set(-5, -3, 7);
    scene.add(coolLight);

    const beanMaterial = new THREE.MeshStandardMaterial({
      color: 0x6c3c1f,
      metalness: 0.2,
      roughness: 0.5,
    });
    const beanGeometry = new THREE.SphereGeometry(0.16, 16, 16);
    const beansGroup = new THREE.Group();
    const beans = [];

    // Reduced from 42 to 24 beans
    for (let index = 0; index < 24; index += 1) {
      const mesh = new THREE.Mesh(beanGeometry, beanMaterial);
      const radius = 2.1 + Math.random() * 3.8;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 4.8;
      mesh.position.set(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius * 0.55,
      );
      mesh.scale.setScalar(0.8 + Math.random() * 0.9);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      mesh.userData = {
        speed: 0.2 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2,
      };
      beans.push(mesh);
      beansGroup.add(mesh);
    }
    scene.add(beansGroup);

    const steamGeometry = new THREE.BufferGeometry();
    // Reduced from 160 to 80 steam particles
    const steamCount = 80;
    const steamPositions = new Float32Array(steamCount * 3);
    for (let index = 0; index < steamCount; index += 1) {
      const i3 = index * 3;
      steamPositions[i3] = (Math.random() - 0.5) * 7;
      steamPositions[i3 + 1] = Math.random() * 6 - 2.5;
      steamPositions[i3 + 2] = (Math.random() - 0.5) * 4;
    }
    steamGeometry.setAttribute("position", new THREE.BufferAttribute(steamPositions, 3));

    const steamMaterial = new THREE.PointsMaterial({
      color: 0xf3d8bc,
      size: 0.08,
      transparent: true,
      opacity: 0.46,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const steam = new THREE.Points(steamGeometry, steamMaterial);
    steam.position.y = -1.8;
    scene.add(steam);

    const clock = new THREE.Clock();
    let frameId;
    let lastFrameTime = 0;
    const targetFrameTime = 1000 / 30; // ~30fps for decorative background
    let isVisible = true;
    let isTabActive = true;

    const onResize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    onResize();
    window.addEventListener("resize", onResize, { passive: true });

    // Page Visibility API - pause when tab hidden
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive && isVisible) {
        lastFrameTime = performance.now();
        animate(lastFrameTime);
      } else {
        cancelAnimationFrame(frameId);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // IntersectionObserver - pause when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && isTabActive) {
          lastFrameTime = performance.now();
          animate(lastFrameTime);
        } else {
          cancelAnimationFrame(frameId);
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(container);

    const animate = (currentTime) => {
      // Frame throttling to ~30fps
      if (currentTime - lastFrameTime < targetFrameTime) {
        frameId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;

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
        // Only add jitter to every 4th particle for performance
        if (index % 4 === 0) {
          x += Math.sin(elapsed * 0.4 + index * 0.13) * 0.0019;
        }
        y += 0.008; // constant rise
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

    animate(performance.now());

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      beanGeometry.dispose();
      beanMaterial.dispose();
      steamGeometry.dispose();
      steamMaterial.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className="three-motion three-motion-static" ref={mountRef} aria-hidden="true">
        <div className="static-coffee-scene" />
      </div>
    );
  }

  return <div className="three-motion" ref={mountRef} aria-hidden="true" />;
}