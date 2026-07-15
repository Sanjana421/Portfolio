import styles from './Contact.module.css';

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/sanjana-reddy-nenturi',
    handle: 'sanjana-reddy-nenturi',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/sanjana421',
    handle: 'sanjana421',
  },
  {
    label: 'Email',
    href: 'mailto:sanjanareddynenturi@gmail.com',
    handle: 'sanjanareddynenturi@gmail.com',
  },
];

const certs = [
  'OCI Data Science Professional',
  'OCI Generative AI Professional',
  'Certified Scrum Product Owner (CSPO)',
  'CITI Biomedical Researcher',
];

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.top}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>Get in Touch</span>
            <h2 className={styles.heading}>
              Let&apos;s build<br />
              <em>something worth it.</em>
            </h2>
            <p className={styles.sub}>
              Open to analytics engineering, data engineering, and AI/ML data roles
              at companies that care about what they ship. F-1 OPT active through Jan 2027,
              STEM-eligible. Anywhere in the US.
            </p>
            <a href="mailto:sanjanareddynenturi@gmail.com" className={styles.emailBtn}>
              sanjanareddynenturi@gmail.com
              <span className={styles.emailArrow}>↗</span>
            </a>
          </div>

          <div className={styles.right}>
            <div className={styles.socialsGroup}>
              <span className={styles.groupLabel}>Connect</span>
              {socials.map(({ label, href, handle }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialRow}
                >
                  <span className={styles.socialLabel}>{label}</span>
                  <span className={styles.socialHandle}>{handle} ↗</span>
                </a>
              ))}
            </div>

            <div className={styles.certsGroup}>
              <span className={styles.groupLabel}>Certifications</span>
              <ul className={styles.certList}>
                {certs.map((c) => (
                  <li key={c} className={styles.certItem}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>

      <footer className={styles.footer}>
        <span className={styles.footerName}>Sanjana Reddy Nenturi</span>
        <span className={styles.footerMid}>
          M.S. Intelligent Systems Engineering · Indiana University
        </span>
        <span className={styles.footerRight}>
          © {new Date().getFullYear()} · Data Analytics Engineer
        </span>
      </footer>
    </section>
  );
}
