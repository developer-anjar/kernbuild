import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, ViewChild, signal } from '@angular/core';
import type * as THREE from 'three';

@Component({
  selector: 'app-hero-scene',
  standalone: true,
  templateUrl: './hero-scene.component.html',
  styleUrl: './hero-scene.component.scss',
})
export class HeroSceneComponent implements AfterViewInit, OnDestroy {
  @Input() fallbackImage = '';
  @ViewChild('canvas') private canvasRef?: ElementRef<HTMLCanvasElement>;

  readonly unavailable = signal(false);

  private renderer?: THREE.WebGLRenderer;
  private three?: typeof import('three');
  private scene?: THREE.Scene;
  private camera?: THREE.OrthographicCamera;
  private globe?: THREE.Group;
  private observer?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;
  private motionQuery?: MediaQueryList;
  private animationFrame = 0;
  private visible = true;
  private reducedMotion = false;
  private destroyed = false;
  private pointerX = 0;
  private pointerY = 0;
  private clock?: THREE.Clock;
  private readonly onVisibilityChange = (): void => this.updateRendering();
  private readonly onPointerMoveListener = (event: PointerEvent): void => this.onPointerMove(event);
  private readonly onPointerLeaveListener = (): void => this.onPointerLeave();
  private readonly onMotionChange = (event: MediaQueryListEvent): void => {
    this.reducedMotion = event.matches;
    this.updateRendering();
  };

  constructor(
    private readonly zone: NgZone,
    private readonly hostElement: ElementRef<HTMLElement>,
  ) {}

  async ngAfterViewInit(): Promise<void> {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas || typeof window === 'undefined') return;

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    try {
      this.three = await import('three');
      if (this.destroyed) return;
      this.initializeScene(canvas, this.three);
    } catch (error) {
      console.warn('The interactive hero scene could not be initialized. Showing its static fallback instead.', error);
      this.unavailable.set(true);
      return;
    }

    if (this.destroyed) return;

    this.zone.runOutsideAngular(() => {
      this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.motionQuery.addEventListener('change', this.onMotionChange);

      if ('ResizeObserver' in window) {
        this.observer = new ResizeObserver(() => this.resize());
        this.observer.observe(canvas.parentElement ?? canvas);
      }

      if ('IntersectionObserver' in window) {
        this.intersectionObserver = new IntersectionObserver(([entry]) => {
          this.visible = entry.isIntersecting;
          this.updateRendering();
        });
        this.intersectionObserver.observe(canvas);
      }

      this.hostElement.nativeElement.addEventListener('pointermove', this.onPointerMoveListener);
      this.hostElement.nativeElement.addEventListener('pointerleave', this.onPointerLeaveListener);
      document.addEventListener('visibilitychange', this.onVisibilityChange);
      this.updateRendering();
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.stopRendering();
    this.observer?.disconnect();
    this.intersectionObserver?.disconnect();
    this.motionQuery?.removeEventListener('change', this.onMotionChange);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    this.hostElement.nativeElement.removeEventListener('pointermove', this.onPointerMoveListener);
    this.hostElement.nativeElement.removeEventListener('pointerleave', this.onPointerLeaveListener);

    this.scene?.traverse(object => {
      if (this.three && (object instanceof this.three.Mesh || object instanceof this.three.Points)) {
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach(material => material.dispose());
      }
    });

    this.renderer?.dispose();
    this.renderer?.forceContextLoss();
    this.renderer = undefined;
  }

  onPointerMove(event: PointerEvent): void {
    if (this.reducedMotion || !this.globe) return;
    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    this.pointerX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    this.pointerY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
  }

  onPointerLeave(): void {
    this.pointerX = 0;
    this.pointerY = 0;
  }

  private initializeScene(canvas: HTMLCanvasElement, three: typeof import('three')): void {
    this.clock = new three.Clock();
    this.renderer = new three.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputEncoding = three.sRGBEncoding;

    this.scene = new three.Scene();
    this.camera = new three.OrthographicCamera(-3, 3, 3.2, -3.2, 0.1, 30);
    this.camera.position.set(0, 0, 12);
    this.camera.lookAt(0, 0, 0);

    const ambient = new three.AmbientLight(0xffffff, 1.8);
    this.scene.add(ambient);
    const keyLight = new three.DirectionalLight(0xffc28c, 2.2);
    keyLight.position.set(-4, 5, 8);
    this.scene.add(keyLight);

    this.globe = this.createGlobe(three);
    this.scene.add(this.globe);
    this.addOrbitAccents(this.scene, three);
    this.addParticles(this.scene, three);
    this.resize();
  }

  private createGlobe(three: typeof import('three')): THREE.Group {
    const group = new three.Group();
    group.rotation.set(-0.1, -0.46, 0.02);
    group.position.y = -0.14;

    const radius = 1.9;
    const atmosphere = new three.Mesh(
      new three.SphereGeometry(radius + 0.055, 64, 48),
      new three.MeshBasicMaterial({
        color: 0xff5a12,
        side: three.BackSide,
        transparent: true,
        opacity: 0.3,
      }),
    );
    group.add(atmosphere);

    const planet = new three.Mesh(
      new three.SphereGeometry(radius, 72, 56),
      new three.MeshBasicMaterial({ color: 0x090c12 }),
    );
    group.add(planet);

    const landDots: number[] = [];
    for (let latitude = -58; latitude <= 78; latitude += 4) {
      for (let longitude = -180; longitude <= 180; longitude += 4) {
        if (!this.isLand(longitude, latitude)) continue;
        const lat = (latitude * Math.PI) / 180;
        const lon = (longitude * Math.PI) / 180;
        const dotRadius = radius + 0.018;
        landDots.push(
          dotRadius * Math.cos(lat) * Math.sin(lon),
          dotRadius * Math.sin(lat),
          dotRadius * Math.cos(lat) * Math.cos(lon),
        );
      }
    }

    const landGeometry = new three.BufferGeometry();
    landGeometry.setAttribute('position', new three.Float32BufferAttribute(landDots, 3));
    group.add(new three.Points(
      landGeometry,
      new three.PointsMaterial({
        color: 0xf2e3d5,
        size: 0.027,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
      }),
    ));

    const orbit = new three.Mesh(
      new three.TorusGeometry(radius + 0.15, 0.012, 6, 120),
      new three.MeshBasicMaterial({ color: 0xff7629, transparent: true, opacity: 0.62 }),
    );
    orbit.rotation.set(0.1, 0.24, -0.12);
    orbit.position.z = -0.06;
    group.add(orbit);

    return group;
  }

  private isLand(longitude: number, latitude: number): boolean {
    const continents: number[][][] = [
      [[-168, 70], [-145, 72], [-125, 62], [-112, 52], [-95, 49], [-82, 25], [-98, 15], [-114, 30], [-128, 48], [-150, 58]],
      [[-82, 12], [-66, 10], [-50, 4], [-36, -8], [-48, -28], [-58, -44], [-70, -56], [-78, -25]],
      [[-12, 72], [28, 72], [42, 58], [62, 58], [82, 66], [112, 60], [145, 52], [160, 43], [142, 30], [126, 17], [109, 7], [94, 10], [80, 23], [65, 25], [51, 39], [34, 34], [22, 48], [7, 53], [-8, 48]],
      [[-18, 35], [4, 38], [31, 31], [43, 12], [37, -9], [28, -33], [14, -35], [3, -22], [-5, -5], [-16, 9]],
      [[112, -11], [130, -10], [153, -22], [148, -38], [128, -44], [114, -32]],
      [[46, -13], [51, -16], [50, -25], [45, -24]],
    ];

    return continents.some(polygon => {
      let inside = false;
      for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index++) {
        const [x1, y1] = polygon[index];
        const [x2, y2] = polygon[previous];
        const crosses = (y1 > latitude) !== (y2 > latitude);
        if (crosses && longitude < ((x2 - x1) * (latitude - y1)) / (y2 - y1) + x1) {
          inside = !inside;
        }
      }
      return inside;
    });
  }

  private addOrbitAccents(scene: THREE.Scene, three: typeof import('three')): void {
    const orbitMaterial = new three.MeshBasicMaterial({
      color: 0xff8a00,
      transparent: true,
      opacity: 0.38,
    });
    const orbit = new three.Mesh(new three.TorusGeometry(2.67, 0.012, 6, 100), orbitMaterial);
    orbit.rotation.set(0.35, 0.62, -0.24);
    orbit.position.z = -0.25;
    scene.add(orbit);

    const purpleRing = new three.Mesh(
      new three.TorusGeometry(2.9, 0.009, 5, 100),
      new three.MeshBasicMaterial({ color: 0x6426e8, transparent: true, opacity: 0.28 }),
    );
    purpleRing.rotation.set(-0.28, -0.5, 0.15);
    purpleRing.position.z = -0.4;
    scene.add(purpleRing);

    const accentGeometry = new three.SphereGeometry(0.075, 12, 10);
    const accent = new three.Mesh(accentGeometry, new three.MeshBasicMaterial({ color: 0xff5a0a }));
    accent.position.set(2.25, 1.73, 0.65);
    scene.add(accent);

    const secondAccent = new three.Mesh(
      new three.SphereGeometry(0.055, 12, 10),
      new three.MeshBasicMaterial({ color: 0x6426e8 }),
    );
    secondAccent.position.set(-2.58, 1.55, 0.5);
    scene.add(secondAccent);
  }

  private addParticles(scene: THREE.Scene, three: typeof import('three')): void {
    const positions = new Float32Array(54 * 3);
    for (let index = 0; index < 54; index++) {
      positions[index * 3] = Math.sin(index * 12.9898) * 3.1;
      positions[index * 3 + 1] = Math.cos(index * 7.233) * 2.25;
      positions[index * 3 + 2] = -0.75 + (index % 5) * 0.12;
    }

    const geometry = new three.BufferGeometry();
    geometry.setAttribute('position', new three.BufferAttribute(positions, 3));
    const points = new three.Points(
      geometry,
      new three.PointsMaterial({ color: 0xff8a00, size: 0.045, transparent: true, opacity: 0.62 }),
    );
    scene.add(points);
  }

  private resize(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas || !this.renderer || !this.camera) return;

    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const halfHeight = 3.2;
    const halfWidth = halfHeight * (bounds.width / bounds.height);
    this.camera.left = -halfWidth;
    this.camera.right = halfWidth;
    this.camera.top = halfHeight;
    this.camera.bottom = -halfHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(bounds.width, bounds.height, false);
    this.renderOnce();
  }

  private updateRendering(): void {
    const shouldRender = Boolean(this.renderer && this.visible && !document.hidden);
    if (!shouldRender) {
      this.stopRendering();
      return;
    }

    if (this.reducedMotion) {
      this.stopRendering();
      this.renderOnce();
    } else if (!this.animationFrame) {
      this.clock?.start();
      this.animationFrame = requestAnimationFrame(this.animate);
    }
  }

  private readonly animate = (): void => {
    this.animationFrame = 0;
    if (!this.renderer || !this.scene || !this.camera || !this.globe || !this.visible || document.hidden) return;

    const elapsed = this.clock?.getElapsedTime() ?? 0;
    this.globe.position.y = -0.14 + Math.sin(elapsed * 0.42) * 0.035;
    this.globe.rotation.y += (-0.46 + elapsed * 0.075 + this.pointerX * 0.16 - this.globe.rotation.y) * 0.025;
    this.globe.rotation.x += (-0.1 - this.pointerY * 0.08 - this.globe.rotation.x) * 0.025;
    this.renderer.render(this.scene, this.camera);
    this.animationFrame = requestAnimationFrame(this.animate);
  };

  private renderOnce(): void {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  private stopRendering(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = 0;
    }
  }
}
