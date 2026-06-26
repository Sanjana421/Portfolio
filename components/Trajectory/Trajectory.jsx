'use client';

import { useRef, useEffect } from 'react';
import { timeline } from '@/data/timeline';
import styles from './Trajectory.module.css';

const typeStyle = {
  research:  { color: 'var(--cyan)',    label: 'Research' },
  industry:  { color: 'var(--orange)',  label: 'Industry' },
  education: { color: 'var(--muted)',   label: 'Education' },
};

export default function Trajectory() {
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
    <section id="trajectory" className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>

        <header className={styles.header} data-reveal data-delay="0">
          <span className={styles.eyebrow}>Journey</span>
          <h2 className={styles.heading}>
            The trajectory.
          </h2>
        </header>

        <div className={styles.timeline}>
          {timeline.map((entry, i) => {
            const ts = typeStyle[entry.type] || typeStyle.research;
            return (
              <div
                key={i}
                className={styles.entry}
                data-reveal
                data-delay={String(i * 70)}
              >
                {/* Left column: period + type */}
                <div className={styles.left}>
                  <span className={styles.period}>{entry.period}</span>
                  <span
                    className={styles.typeBadge}
                    style={{ color: ts.color, borderColor: `${ts.color}22` }}
                  >
                    {ts.label}
                  </span>
                  {entry.current && (
                    <span className={styles.currentBadge}>Active</span>
                  )}
                </div>

                {/* Center: connector line + dot */}
                <div className={styles.connector}>
                  <span
                    className={styles.dot}
                    style={{ background: ts.color, boxShadow: `0 0 12px ${ts.color}55` }}
                  />
                  {i < timeline.length - 1 && <span className={styles.line} />}
                </div>

                {/* Right column: content */}
                <div className={styles.right}>
                  <h3 className={styles.role}>{entry.role}</h3>
                  <p className={styles.org}>
                    {entry.org}
                    <span className={styles.location}>&nbsp;·&nbsp;{entry.location}</span>
                  </p>
                  <ul className={styles.highlights}>
                    {entry.highlights.map((h, j) => (
                      <li key={j} className={styles.highlight}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
