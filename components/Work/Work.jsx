'use client';

import { useRef, useEffect, useState } from 'react';
import { work } from '@/data/work';
import styles from './Work.module.css';

const META = {
  '01': { viz: 'wave',  color: 'var(--cyan)',   domain: 'Research · CARES Lab' },
  '02': { viz: 'brain', color: 'var(--cyan)',   domain: 'Research · SPIN Lab' },
  '03': { viz: 'bars',  color: 'var(--amber)',  domain: 'Data · Self-directed' },
  '04': { viz: 'nodes', color: 'var(--violet)', domain: 'AI · Self-directed' },
  '05': { viz: 'line',  color: 'var(--amber)',  domain: 'Data · Self-directed' },
  '06': { viz: 'dash',  color: 'var(--amber)',  domain: 'Data · Self-directed' },
  '07': { viz: 'traffic', color: 'var(--green)', domain: 'Robotics · Govt-funded' },
};

function Viz({ type }) {
  if (type === 'wave')
    return <div className={styles.vizInner}><div className={styles.wave}>{Array.from({ length: 13 }).map((_, i) => <i key={i} style={{ animationDelay: `${i * 0.08}s` }} />)}</div></div>;
  if (type === 'bars')
    return <div className={styles.vizInner}><div className={styles.bars}>{Array.from({ length: 7 }).map((_, i) => <i key={i} style={{ animationDelay: `${i * 0.15}s` }} />)}</div></div>;
  if (type === 'brain')
    return (
      <div className={styles.vizInner}><div className={styles.brain}>
        <svg viewBox="0 0 120 96"><path d="M60 8C40 8 26 20 26 40c-10 4-14 18-6 28 4 14 20 20 40 20s36-6 40-20c8-10 4-24-6-28 0-20-14-32-34-32z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M60 12v72M40 24c8 6 8 14 0 20M80 24c-8 6-8 14 0 20" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.5" /></svg>
        <span className={styles.scanline} />
      </div></div>
    );
  if (type === 'nodes')
    return (
      <div className={styles.vizInner}><div className={styles.nodes}>
        <svg><line x1="20" y1="20" x2="90" y2="55" /><line x1="90" y1="55" x2="140" y2="20" /><line x1="90" y1="55" x2="60" y2="90" /><line x1="20" y1="20" x2="60" y2="90" /></svg>
        {[[14, 14, 0], [84, 49, 0.4], [134, 14, 0.8], [54, 84, 1.2]].map(([l, t, d], i) => <span key={i} className={styles.node} style={{ left: l, top: t, animationDelay: `${d}s` }} />)}
      </div></div>
    );
  if (type === 'line')
    return <div className={styles.vizInner}><svg className={styles.lchart} viewBox="0 0 170 90"><path className={styles.lpath} d="M4 70 L34 52 L60 60 L88 30 L116 40 L146 12" /><circle cx="146" cy="12" r="4" /></svg></div>;
  if (type === 'dash')
    return <div className={styles.vizInner}><div className={styles.dash}><span className={styles.donut} /><div className={styles.minibars}>{Array.from({ length: 6 }).map((_, i) => <i key={i} style={{ animationDelay: `${i * 0.12}s` }} />)}</div></div></div>;
  if (type === 'traffic')
    return (
      <div className={styles.road}>
        <span className={styles.lane} />
        <span className={`${styles.car} ${styles.c1}`} />
        <span className={`${styles.car} ${styles.c2}`} />
        <span className={styles.tlight}><i className={styles.onR} /><i className={styles.onY} /><i className={styles.onG} /></span>
      </div>
    );
  return null;
}

export default function Work() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('[data-reveal]');
    if (!els) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = Number(entry.target.dataset.delay || 0);
          setTimeout(() => entry.target.classList.add('revealed'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActive(null); };
    if (active) { document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden'; }
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [active]);

  return (
    <section id="work" className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <header className={styles.header} data-reveal data-delay="0">
          <span className={styles.eyebrow}>Selected Work</span>
          <h2 className={styles.heading}>Systems built,<br /><em>problems solved.</em></h2>
          <p className={styles.lede}>Each card is a different kind of work. Click one to open the full story.</p>
        </header>

        <div className={styles.grid}>
          {work.map((item, i) => {
            const m = META[item.id] || META['01'];
            return (
              <article
                key={item.id}
                className={`${styles.card} ${item.featured ? styles.featured : ''}`}
                style={{ '--c': m.color }}
                data-reveal
                data-delay={String(i * 70)}
                onClick={() => setActive({ item, m })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setActive({ item, m }); }}
              >
                <span className={styles.openHint}>Open ↗</span>
                <div className={styles.viz}><Viz type={m.viz} /></div>
                <div className={styles.cbody}>
                  <span className={styles.dom}>{m.domain}</span>
                  <h3 className={styles.ctitle}>{item.title}</h3>
                  <p className={styles.corg}>{item.org}</p>
                  <div className={styles.tags}>
                    {item.tags.slice(0, 4).map((t) => <span key={t} className={styles.tag}>{t}</span>)}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {active && (
        <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) setActive(null); }}>
          <div className={styles.modal} style={{ '--c': active.m.color }}>
            <button className={styles.close} onClick={() => setActive(null)} aria-label="Close">✕</button>
            <span className={styles.dom}>{active.m.domain}</span>
            <h3 className={styles.mtitle}>{active.item.title}</h3>
            <p className={styles.corg}>{active.item.org}</p>
            <p className={styles.msub}>{active.item.subtitle}</p>
            <p className={styles.mdesc}>{active.item.description}</p>
            <ul className={styles.impact}>
              {active.item.impact.map((p, j) => <li key={j} className={styles.impactItem}>{p}</li>)}
            </ul>
            {(active.item.github || active.item.link) && (
              <div className={styles.mlinks}>
                {active.item.github && <a href={active.item.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
                {active.item.link && <a href={active.item.link} target="_blank" rel="noopener noreferrer">Live ↗</a>}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
