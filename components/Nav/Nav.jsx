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
      <a href="#" className={styles.logo}>
        <span className={styles.logoFirst}>S</span>RN
      </a>

      <ul className={styles.links}>
        {links.map(({ href, label }) => (
          <li key={href}>
            <a href={href} className={styles.link}>{label}</a>
          </li>
        ))}
      </ul>

      <a
        href="mailto:sanjanareddynenturi@gmail.com"
        className={styles.cta}
      >
        Let&apos;s talk
      </a>
    </nav>
  );
}
