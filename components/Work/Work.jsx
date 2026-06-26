'use client';

import { useRef, useEffect } from 'react';
import { work } from '@/data/work';
import styles from './Work.module.css';

export default function Work() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('[data-reveal]');
    if (!els) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // stagger delay via data-delay attribute
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, delay * 1);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const featured = work.find((w) => w.featured);
  const rest     = work.filter((w) => !w.featured);

  return (
    <section id="work" className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>

        {/* ── Header ── */}
        <header className={styles.header} data-reveal data-delay="0">
          <span className={styles.eyebrow}>Selected Work</span>
          <h2 className={styles.heading}>
            Systems built,<br />
            <em>problems solved.</em>
          </h2>
        </header>

        {/* ── Featured card ── */}
        {featured && (
          <article
            className={`${styles.card} ${styles.featured}`}
            data-reveal
            data-delay="80"
          >
            <div className={styles.featuredInner}>
              <div className={styles.featuredLeft}>
                <div className={styles.cardTop}>
                  <span className={styles.featuredBadge}>Flagship Project</span>
                  <span className={styles.caseNum}>{featured.id}</span>
                </div>
                <h3 className={styles.cardTitle}>{featured.title}</h3>
                <p className={styles.cardOrg}>{featured.org}</p>
                <p className={styles.cardSubtitle}>{featured.subtitle}</p>
                <div className={styles.tags}>
                  {featured.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className={styles.featuredRight}>
                <p className={styles.cardDesc}>{featured.description}</p>
                <ul className={styles.impact}>
                  {featured.impact.map((point, i) => (
                    <li key={i} className={styles.impactItem}>
                      <span className={styles.impactDot} />
                      {point}
                    </li>
                  ))}
                </ul>
                {(featured.github || featured.link) && (
                  <div className={styles.cardLinks}>
                    {featured.github && (
                      <a href={featured.github} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                        GitHub ↗
                      </a>
                    )}
                    {featured.link && (
                      <a href={featured.link} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                        Live ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </article>
        )}

        {/* ── Grid ── */}
        <div className={styles.grid}>
          {rest.map((item, i) => (
            <article
              key={item.id}
              className={styles.card}
              data-reveal
              data-delay={String((i + 1) * 80)}
            >
              <div className={styles.cardTop}>
                <span className={styles.caseNum}>{item.id}</span>
                <div className={styles.cardLinks}>
                  {item.github && (
                    <a href={item.github} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                      GitHub ↗
                    </a>
                  )}
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                      Live ↗
                    </a>
                  )}
                </div>
              </div>

              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardOrg}>{item.org}</p>
              <p className={styles.cardSubtitle}>{item.subtitle}</p>

              <div className={styles.tags}>
                {item.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>

              <p className={styles.cardDesc}>{item.description}</p>

              <ul className={styles.impact}>
                {item.impact.map((point, j) => (
                  <li key={j} className={styles.impactItem}>
                    <span className={styles.impactDot} />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
