'use client';

import { useEffect, useRef } from 'react';
import styles from './CinematicLayer.module.css';

export default function CinematicLayer() {
  const canvasRef = useRef(null);
  const frameRef  = useRef(null);
  const mouseRef  = useRef({ x: 0, y: 0 });
  const threeRef  = useRef({});

  useEffect(() => {
    let THREE;
    let mounted = true;

    async function init() {
      THREE = await import('three');
      if (!mounted || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const W = window.innerWidth;
      const H = window.innerHeight;

      // ── Renderer ─────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0);

      // ── Scene & Camera ────────────────────────────────
      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
      camera.position.z = 80;

      // ── Particles — kept subtle so text stays readable ─
      const COUNT     = 70;                // was 280
      const positions = new Float32Array(COUNT * 3);
      const colors    = new Float32Array(COUNT * 3);
      const sizes     = new Float32Array(COUNT);
      const phases    = new Float32Array(COUNT);
      const speeds    = new Float32Array(COUNT);

      // Warm palette — mostly dim whites/golds, rare orange
      const palette = [
        new THREE.Color('#FFD08A'),  // warm gold
        new THREE.Color('#FFF0D4'),  // pale cream
        new THREE.Color('#FF8C42'),  // orange  (rare)
        new THREE.Color('#FFFFFF'),  // white
        new THREE.Color('#FFB347'),  // amber
      ];
      // Weights: make orange appear only ~10% of the time
      const weights = [3, 3, 1, 3, 2];
      const weightedPalette = [];
      palette.forEach((c, i) => {
        for (let w = 0; w < weights[i]; w++) weightedPalette.push(c);
      });

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;

        positions[i3]     = (Math.random() - 0.5) * 200;
        positions[i3 + 1] = (Math.random() - 0.5) * 120;
        positions[i3 + 2] = (Math.random() - 0.5) * 60 - 10;

        const c = weightedPalette[Math.floor(Math.random() * weightedPalette.length)];
        colors[i3]     = c.r;
        colors[i3 + 1] = c.g;
        colors[i3 + 2] = c.b;

        // Much smaller sizes — max ~1.5 px for large bokeh, ~0.5 standard
        sizes[i] = Math.random() < 0.12
          ? 0.8 + Math.random() * 0.7   // rare larger bokeh: 0.8–1.5
          : 0.2 + Math.random() * 0.4;  // standard: 0.2–0.6

        phases[i] = Math.random() * Math.PI * 2;
        speeds[i] = 0.12 + Math.random() * 0.18;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color',    new THREE.BufferAttribute(colors,    3));
      geometry.setAttribute('size',     new THREE.BufferAttribute(sizes,     1));

      // ── Soft bokeh texture ────────────────────────────
      function buildBokehTexture(size = 64) {
        const cv   = document.createElement('canvas');
        cv.width   = cv.height = size;
        const ctx  = cv.getContext('2d');
        const half = size / 2;
        const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
        grad.addColorStop(0,    'rgba(255,255,255,1)');
        grad.addColorStop(0.3,  'rgba(255,210,140,0.6)');
        grad.addColorStop(0.7,  'rgba(255,140,60,0.15)');
        grad.addColorStop(1,    'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);
        return new THREE.CanvasTexture(cv);
      }

      const bokehTex = buildBokehTexture(64);

      const material = new THREE.PointsMaterial({
        size:            2,
        map:             bokehTex,
        vertexColors:    true,
        blending:        THREE.AdditiveBlending,
        transparent:     true,
        depthWrite:      false,
        sizeAttenuation: true,
        opacity:         0.28,     // was 0.85 — very subtle now
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      threeRef.current = { renderer, scene, camera, geometry, material, points, phases, speeds };

      // ── Mouse parallax ────────────────────────────────
      function onMouse(e) {
        mouseRef.current = {
          x: (e.clientX / window.innerWidth  - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        };
      }
      function onTouch(e) {
        const t = e.touches[0];
        mouseRef.current = {
          x: (t.clientX / window.innerWidth  - 0.5) * 2,
          y: (t.clientY / window.innerHeight - 0.5) * 2,
        };
      }
      window.addEventListener('mousemove', onMouse, { passive: true });
      window.addEventListener('touchmove', onTouch, { passive: true });

      // ── Resize ────────────────────────────────────────
      function onResize() {
        const w = window.innerWidth, h = window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      window.addEventListener('resize', onResize);

      threeRef.current._cleanup = () => {
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('touchmove', onTouch);
        window.removeEventListener('resize', onResize);
      };

      // ── Animate ───────────────────────────────────────
      const posAttr = geometry.getAttribute('position');
      const originY = new Float32Array(COUNT);
      const originX = new Float32Array(COUNT);
      for (let i = 0; i < COUNT; i++) {
        originY[i] = posAttr.getY(i);
        originX[i] = posAttr.getX(i);
      }

      let t = 0;
      function tick() {
        if (!mounted) return;
        frameRef.current = requestAnimationFrame(tick);
        t += 0.006;  // slower drift

        for (let i = 0; i < COUNT; i++) {
          const ph = phases[i], sp = speeds[i];
          posAttr.setY(i, originY[i] + Math.sin(t * sp + ph) * 5);
          posAttr.setX(i, originX[i] + Math.cos(t * sp * 0.5 + ph) * 2.5);
        }
        posAttr.needsUpdate = true;

        // Gentle camera parallax
        camera.position.x += (mouseRef.current.x * 5  - camera.position.x) * 0.03;
        camera.position.y += (-mouseRef.current.y * 3 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);

        // Very slow rotation
        points.rotation.y = t * 0.008;

        renderer.render(scene, camera);
      }
      tick();
    }

    init();

    return () => {
      mounted = false;
      cancelAnimationFrame(frameRef.current);
      const { renderer, geometry, material, _cleanup } = threeRef.current;
      _cleanup?.();
      geometry?.dispose();
      material?.dispose();
      renderer?.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
