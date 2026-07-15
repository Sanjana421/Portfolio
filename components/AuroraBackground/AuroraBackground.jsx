'use client';

import { useEffect, useRef } from 'react';
import styles from './AuroraBackground.module.css';

export default function AuroraBackground() {
  const glowRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const g = glowRef.current;
      if (g) { g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px'; }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div className={styles.aurora} aria-hidden="true">
        <span className={styles.a1} />
        <span className={styles.a2} />
        <span className={styles.a3} />
      </div>
      <div className={styles.gridLines} aria-hidden="true" />
      <div className={styles.glow} ref={glowRef} aria-hidden="true" />
    </>
  );
}
