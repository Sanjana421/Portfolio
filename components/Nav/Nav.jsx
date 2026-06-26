'use client';

import { useEffect, useState } from 'react';
import styles from './Nav.module.css';

const links = [
  { href: '#work',       label: 'Work' },
  { href: '#stack',      label: 'Stack' },
  { href: '#trajectory', label: 'Trajectory' },
  { href: '#contact',    label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.pill}>
        {/* Home icon */}
        <a href="#" className={styles.home} aria-label="Home">
          <IconHome />
        </a>

        <div className={styles.divider} aria-hidden="true" />

        {/* Nav links */}
        <ul className={styles.links}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className={styles.link}>{label}</a>
            </li>
          ))}
        </ul>

        <div className={styles.divider} aria-hidden="true" />

        {/* CTA */}
        <a href="mailto:sanjanareddynenturi@gmail.com" className={styles.cta}>
          Let&apos;s Talk
        </a>
      </div>
    </nav>
  );
}

function IconHome() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" aria-hidden="true">
      <path d="M7.5 1.5L1.5 6.5V13.5H5.5V9.5H9.5V13.5H13.5V6.5L7.5 1.5Z" />
    </svg>
  );
}
