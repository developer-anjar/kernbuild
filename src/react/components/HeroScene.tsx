import { useEffect, useRef, useState } from 'react';
import type * as THREE from 'three';

const CONTINENTS: number[][][] = [
  [[-168, 70], [-145, 72], [-125, 62], [-112, 52], [-95, 49], [-82, 25], [-98, 15], [-114, 30], [-128, 48], [-150, 58]],
  [[-82, 12], [-66, 10], [-50, 4], [-36, -8], [-48, -28], [-58, -44], [-70, -56], [-78, -25]],
  [[-12, 72], [28, 72], [42, 58], [62, 58], [82, 66], [112, 60], [145, 52], [160, 43], [142, 30], [126, 17], [109, 7], [94, 10], [80, 23], [65, 25], [51, 39], [34, 34], [22, 48], [7, 53], [-8, 48]],
  [[-18, 35], [4, 38], [31, 31], [43, 12], [37, -9], [28, -33], [14, -35], [3, -22], [-5, -5], [-16, 9]],
  [[112, -11], [130, -10], [153, -22], [148, -38], [128, -44], [114, -32]],
  [[46, -13], [51, -16], [50, -25], [45, -24]],
];

function isLand(longitude: number, latitude: number): boolean {
  return CONTINENTS.some(polygon => {
    let inside = false;
    for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index++) {
      const [x1, y1] = polygon[index];
      const [x2, y2] = polygon[previous];
      if ((y1 > latitude) !== (y2 > latitude) && longitude < ((x2 - x1) * (latitude - y1)) / (y2 - y1) + x1) inside = !inside;
    }
    return inside;
  });
}

export function HeroScene({ fallbackImage }: { fallbackImage: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<THREE.Group | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    let destroyed = false;
    let visible = true;
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrame = 0;
    let three: typeof import('three') | undefined;
    let renderer: THREE.WebGLRenderer | undefined;
    let scene: THREE.Scene | undefined;
    let camera: THREE.OrthographicCamera | undefined;
    let clock: THREE.Clock | undefined;
    let observer: ResizeObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;
    let pointerX = 0;
    let pointerY = 0;

    const renderOnce = () => {
      if (renderer && scene && camera) renderer.render(scene, camera);
    };
    const stopRendering = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };
    const animate = () => {
      animationFrame = 0;
      const globe = globeRef.current;
      if (!renderer || !scene || !camera || !globe || !visible || document.hidden) return;
      const elapsed = clock?.getElapsedTime() ?? 0;
      globe.position.y = -0.14 + Math.sin(elapsed * 0.42) * 0.035;
      globe.rotation.y += (-0.46 + elapsed * 0.075 + pointerX * 0.16 - globe.rotation.y) * 0.025;
      globe.rotation.x += (-0.1 - pointerY * 0.08 - globe.rotation.x) * 0.025;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };
    const updateRendering = () => {
      if (!renderer || !visible || document.hidden) { stopRendering(); return; }
      if (reducedMotion) { stopRendering(); renderOnce(); }
      else if (!animationFrame) { clock?.start(); animationFrame = requestAnimationFrame(animate); }
    };
    const resize = () => {
      if (!renderer || !camera) return;
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const halfHeight = 3.2;
      const halfWidth = halfHeight * bounds.width / bounds.height;
      camera.left = -halfWidth;
      camera.right = halfWidth;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(bounds.width, bounds.height, false);
      renderOnce();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion) return;
      const bounds = host.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      pointerX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointerY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    };
    const onPointerLeave = () => { pointerX = 0; pointerY = 0; };
    const onVisibilityChange = () => updateRendering();
    const onMotionChange = (event: MediaQueryListEvent) => { reducedMotion = event.matches; updateRendering(); };

    const initialize = async () => {
      try {
        three = await import('three');
        if (destroyed) return;
        clock = new three.Clock();
        renderer = new three.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setClearColor(0x000000, 0);
        renderer.outputEncoding = three.sRGBEncoding;
        scene = new three.Scene();
        camera = new three.OrthographicCamera(-3, 3, 3.2, -3.2, 0.1, 30);
        camera.position.set(0, 0, 12);
        camera.lookAt(0, 0, 0);
        scene.add(new three.AmbientLight(0xffffff, 1.8));
        const keyLight = new three.DirectionalLight(0xffc28c, 2.2);
        keyLight.position.set(-4, 5, 8);
        scene.add(keyLight);

        const globe = new three.Group();
        globe.rotation.set(-0.1, -0.46, 0.02);
        globe.position.y = -0.14;
        globeRef.current = globe;
        const radius = 1.9;
        globe.add(new three.Mesh(new three.SphereGeometry(radius + 0.055, 64, 48), new three.MeshBasicMaterial({ color: 0xff5a12, side: three.BackSide, transparent: true, opacity: 0.3 })));
        globe.add(new three.Mesh(new three.SphereGeometry(radius, 72, 56), new three.MeshBasicMaterial({ color: 0x090c12 })));

        const landDots: number[] = [];
        for (let latitude = -58; latitude <= 78; latitude += 4) {
          for (let longitude = -180; longitude <= 180; longitude += 4) {
            if (!isLand(longitude, latitude)) continue;
            const lat = latitude * Math.PI / 180;
            const lon = longitude * Math.PI / 180;
            const dotRadius = radius + 0.018;
            landDots.push(dotRadius * Math.cos(lat) * Math.sin(lon), dotRadius * Math.sin(lat), dotRadius * Math.cos(lat) * Math.cos(lon));
          }
        }
        const landGeometry = new three.BufferGeometry();
        landGeometry.setAttribute('position', new three.Float32BufferAttribute(landDots, 3));
        globe.add(new three.Points(landGeometry, new three.PointsMaterial({ color: 0xf2e3d5, size: 0.027, transparent: true, opacity: 0.9, sizeAttenuation: true })));
        const worldOrbit = new three.Mesh(new three.TorusGeometry(radius + 0.15, 0.012, 6, 120), new three.MeshBasicMaterial({ color: 0xff7629, transparent: true, opacity: 0.62 }));
        worldOrbit.rotation.set(0.1, 0.24, -0.12);
        worldOrbit.position.z = -0.06;
        globe.add(worldOrbit);
        scene.add(globe);

        const orbit = new three.Mesh(new three.TorusGeometry(2.67, 0.012, 6, 100), new three.MeshBasicMaterial({ color: 0xff8a00, transparent: true, opacity: 0.38 }));
        orbit.rotation.set(0.35, 0.62, -0.24);
        orbit.position.z = -0.25;
        scene.add(orbit);
        const purpleRing = new three.Mesh(new three.TorusGeometry(2.9, 0.009, 5, 100), new three.MeshBasicMaterial({ color: 0x6426e8, transparent: true, opacity: 0.28 }));
        purpleRing.rotation.set(-0.28, -0.5, 0.15);
        purpleRing.position.z = -0.4;
        scene.add(purpleRing);
        const accent = new three.Mesh(new three.SphereGeometry(0.075, 12, 10), new three.MeshBasicMaterial({ color: 0xff5a0a }));
        accent.position.set(2.25, 1.73, 0.65);
        scene.add(accent);
        const secondAccent = new three.Mesh(new three.SphereGeometry(0.055, 12, 10), new three.MeshBasicMaterial({ color: 0x6426e8 }));
        secondAccent.position.set(-2.58, 1.55, 0.5);
        scene.add(secondAccent);
        const positions = new Float32Array(54 * 3);
        for (let index = 0; index < 54; index++) {
          positions[index * 3] = Math.sin(index * 12.9898) * 3.1;
          positions[index * 3 + 1] = Math.cos(index * 7.233) * 2.25;
          positions[index * 3 + 2] = -0.75 + (index % 5) * 0.12;
        }
        const stars = new three.BufferGeometry();
        stars.setAttribute('position', new three.BufferAttribute(positions, 3));
        scene.add(new three.Points(stars, new three.PointsMaterial({ color: 0xff8a00, size: 0.045, transparent: true, opacity: 0.62 })));

        resize();
        if ('ResizeObserver' in window) { observer = new ResizeObserver(resize); observer.observe(canvas.parentElement ?? canvas); }
        if ('IntersectionObserver' in window) {
          intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updateRendering(); });
          intersectionObserver.observe(canvas);
        }
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('pointerleave', onPointerLeave, { passive: true });
        document.addEventListener('visibilitychange', onVisibilityChange);
        window.addEventListener('resize', resize);
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', onMotionChange);
        updateRendering();
      } catch (error) {
        if (!destroyed) {
          console.warn('The interactive hero scene could not be initialized. Showing its static fallback instead.', error);
          setUnavailable(true);
        }
      }
    };

    void initialize();
    return () => {
      destroyed = true;
      stopRendering();
      observer?.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', resize);
      window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', onMotionChange);
      scene?.traverse(object => {
        if (three && (object instanceof three.Mesh || object instanceof three.Points)) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach(material => material.dispose());
        }
      });
      renderer?.dispose();
      renderer?.forceContextLoss();
      globeRef.current = null;
    };
  }, []);

  return (
    <div className="hero-scene" ref={hostRef}>
      <canvas ref={canvasRef} className="hero-scene__canvas" aria-hidden="true" />
      {unavailable && fallbackImage && <img className="hero-scene__fallback" src={fallbackImage} alt="KernBuild workspace illustration" />}
      {unavailable && !fallbackImage && <div className="hero-scene__message" role="status">Interactive preview unavailable</div>}
    </div>
  );
}
