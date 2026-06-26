'use client';

import { useRef, useEffect } from 'react';
import { stack } from '@/data/stack';
import styles from './Stack.module.css';

export default function Stack() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('[data-reveal]');
    if (!els) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Number(entry.target.dataset.delay || 0);
            setTimeout(() => entry.target.classList.add('revealed'), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stack" className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>

        <header className={styles.header} data-reveal data-delay="0">
          <span className={styles.eyebrow}>Technology</span>
          <h2 className={styles.heading}>
            What I build with.
          </h2>
        </header>

        <div className={styles.grid}>
          {stack.map(({ category, items }, i) => (
            <div
              key={category}
              className={styles.group}
              data-reveal
              data-delay={String(i * 60)}
            >
              <h3 className={styles.category}>{category}</h3>
              <ul className={styles.list}>
                {items.map((item) => (
                  <li key={item} className={styles.item}>
                    <span className={styles.bullet} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
