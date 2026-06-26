'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styles from './VideoIntro.module.css';

const CinematicLayer = dynamic(
  () => import('../CinematicLayer/CinematicLayer'),
  { ssr: false }
);

export default function VideoIntro({ videoSrc = '/Portfolio/videos/intro.mp4', avatarSrc = '/Portfolio/avatar.png' }) {
  const heroRef    = useRef(null);
  const videoRef   = useRef(null);
  const bgVideoRef = useRef(null);

  const [isMuted,     setIsMuted]     = useState(false); // try with sound first
  const [isPlaying,   setIsPlaying]   = useState(true);
  const [showHint,    setShowHint]    = useState(false); // only show if sound blocked
  const [hintFading,  setHintFading]  = useState(false);
  const [videoEnded,  setVideoEnded]  = useState(false);
  const [avatarReady, setAvatarReady] = useState(false);

  // ── On mount: try to autoplay WITH sound ─────────────────
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play()
      .then(() => {
        setIsMuted(false);
      })
      .catch(() => {
        // Browser blocked sound — fall back to muted autoplay
        v.muted = true;
        setIsMuted(true);
        v.play().catch(() => {});
        // Show hint after brief delay
        setTimeout(() => setShowHint(true), 800);
        const fade = setTimeout(() => setHintFading(true), 5000);
        const hide = setTimeout(() => setShowHint(false), 6200);
        return () => { clearTimeout(fade); clearTimeout(hide); };
      });
  }, []);

  // ── Click hero → unmute (only during first play while muted) ──
  const handleHeroClick = useCallback(() => {
    const v = videoRef.current;
    if (!v || !isMuted || videoEnded) return;
    v.muted = false;
    setIsMuted(false);
    setHintFading(true);
    setTimeout(() => setShowHint(false), 700);
  }, [isMuted, videoEnded]);

  // ── Manual controls ────────────────────────────────────────
  const toggleMute = useCallback((e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    if (!v.muted) { setHintFading(true); setTimeout(() => setShowHint(false), 700); }
  }, []);

  const togglePlay = useCallback((e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v || videoEnded) return;
    if (v.paused) { v.play(); setIsPlaying(true); }
    else          { v.pause(); setIsPlaying(false); }
  }, [videoEnded]);

  // ── Video ended → show avatar ──────────────────────────────
  const onVideoEnded = useCallback(() => {
    setIsPlaying(false);
    setVideoEnded(true);
    setShowHint(false);
    const bg = bgVideoRef.current;
    if (bg) {
      bg.style.transition = 'opacity 2.5s ease';
      bg.style.opacity    = '0';
      setTimeout(() => bg.pause(), 2600);
    }
  }, []);

  // ── Click avatar → replay video WITH sound ─────────────────
  const handleAvatarClick = useCallback((e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;

    // Reset avatar state
    setVideoEnded(false);
    setAvatarReady(false);
    setIsPlaying(true);

    // Bring bg video back
    const bg = bgVideoRef.current;
    if (bg) {
      bg.style.transition = 'opacity 1.2s ease';
      bg.style.opacity    = '1';
      bg.play().catch(() => {});
    }

    // Replay main video with sound
    v.currentTime = 0;
    v.muted = false;
    setIsMuted(false);
    v.play().catch(() => {
      // If still blocked, play muted
      v.muted = true;
      setIsMuted(true);
      v.play().catch(() => {});
    });
  }, []);

  // ── Keep bg in sync ────────────────────────────────────────
  const onVideoPlay  = useCallback(() => { bgVideoRef.current?.play().catch(() => {}); }, []);
  const onVideoPause = useCallback(() => { if (!videoEnded) bgVideoRef.current?.pause(); }, [videoEnded]);

  // ── Scroll to next ─────────────────────────────────────────
  const scrollToNext = useCallback((e) => {
    e.stopPropagation();
    heroRef.current?.nextElementSibling?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} onClick={handleHeroClick}>

      {/* Ambient blurred background */}
      <video
        ref={bgVideoRef}
        className={styles.bgVideo}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Cinematic gradient overlays */}
      <div className={styles.gradientLeft}   aria-hidden="true" />
      <div className={styles.gradientRight}  aria-hidden="true" />
      <div className={styles.gradientBottom} aria-hidden="true" />
      <div className={styles.gradientTop}    aria-hidden="true" />
      <div className={styles.vignette}       aria-hidden="true" />

      {/* Three.js bokeh particle layer */}
      <CinematicLayer />

      {/* Foreground: video → avatar crossfade */}
      <div className={styles.videoWrap}>
        <div className={styles.videoGlow} aria-hidden="true" />

        {/* Main video — plays once, no loop */}
        <video
          ref={videoRef}
          className={`${styles.mainVideo} ${videoEnded ? styles.videoHidden : ''}`}
          src={videoSrc}
          playsInline
          onPlay={onVideoPlay}
          onPause={onVideoPause}
          onEnded={onVideoEnded}
        />

        {/* Avatar — fades in after video ends, click to replay */}
        {videoEnded && (
          <div
            className={`${styles.avatarWrap} ${avatarReady ? styles.avatarVisible : ''}`}
            onClick={handleAvatarClick}
            role="button"
            aria-label="Replay intro video"
            title="Click to replay"
          >
            <img
              src={avatarSrc}
              alt="Sanjana Reddy Nenturi"
              className={styles.avatarImg}
              onLoad={() => setAvatarReady(true)}
              onError={() => setAvatarReady(true)}
            />
            {/* Replay hint on hover */}
            <div className={styles.replayHint}>
              <IconPlay />
              <span>Replay</span>
            </div>
          </div>
        )}

        <div className={styles.videoEdgeFade} aria-hidden="true" />
      </div>

      {/* Text content */}
      <div className={styles.content}>
        <span className={styles.tagline}>
          Data Analytics Engineer&nbsp;·&nbsp;Portfolio 2026
        </span>

        <h1 className={styles.name}>
          <span className={styles.firstName}>Sanjana</span>
          <span className={styles.lastName}>Reddy</span>
        </h1>

        <p className={styles.role}>
          Building data systems from raw signals to executive dashboards —<br />
          across research, healthcare, and business domains.
        </p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>3</span>
            <span className={styles.statLabel}>Concurrent Roles</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>300+</span>
            <span className={styles.statLabel}>Research Subjects</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>↓60%</span>
            <span className={styles.statLabel}>Analysis Turnaround</span>
          </div>
        </div>
      </div>

      {/* Glassmorphism controls */}
      <div className={styles.controls}>
        {!videoEnded && (
          <button
            className={styles.ctrlBtn}
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <IconPause /> : <IconPlay />}
          </button>
        )}
        <button
          className={styles.ctrlBtn}
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <IconMuted /> : <IconSound />}
        </button>
      </div>

      {/* Sound hint — only shows if browser blocked autoplay with sound */}
      {showHint && !videoEnded && (
        <div className={`${styles.soundHint} ${hintFading ? styles.soundHintFade : ''}`}>
          <span className={styles.hintPulse} />
          Click anywhere for sound
        </div>
      )}

      {/* Scroll indicator */}
      <button
        className={styles.scrollIndicator}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
      >
        <span className={styles.scrollLabel}>scroll</span>
        <span className={styles.scrollTrack}>
          <span className={styles.scrollThumb} />
        </span>
      </button>

    </section>
  );
}

/* ── Icons ──────────────────────────────────────────────── */
function IconPlay() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
      <path d="M2.5 1.5l10 5.5-10 5.5V1.5z" />
    </svg>
  );
}
function IconPause() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
      <rect x="2" y="1.5" width="3.5" height="11" rx="1" />
      <rect x="8.5" y="1.5" width="3.5" height="11" rx="1" />
    </svg>
  );
}
function IconSound() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <path d="M6.5 2L3.5 5H1v4h2.5L6.5 12V2z" fill="currentColor" stroke="none" />
      <path d="M9 5c.8.7 1.3 1.7 1.3 2.5S9.8 9.3 9 10" />
      <path d="M11 3.5c1.4 1.2 2.2 2.9 2.2 4S12.4 10.5 11 12" />
    </svg>
  );
}
function IconMuted() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <path d="M6.5 2L3.5 5H1v4h2.5L6.5 12V2z" fill="currentColor" stroke="none" />
      <line x1="9.5" y1="5" x2="13.5" y2="9" />
      <line x1="13.5" y1="5" x2="9.5" y2="9" />
    </svg>
  );
}
