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

  const [isMuted,       setIsMuted]       = useState(false);
  const [isPlaying,     setIsPlaying]     = useState(true);
  const [showHint,      setShowHint]      = useState(false);
  const [hintFading,    setHintFading]    = useState(false);
  const [videoEnded,    setVideoEnded]    = useState(false);
  const [avatarReady,   setAvatarReady]   = useState(false);
  const [clickFeedback, setClickFeedback] = useState(null);

  // ── On mount: try autoplay WITH sound ──────────────────────
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play()
      .then(() => setIsMuted(false))
      .catch(() => {
        v.muted = true;
        setIsMuted(true);
        v.play().catch(() => {});
        setTimeout(() => setShowHint(true), 800);
        setTimeout(() => setHintFading(true), 5000);
        setTimeout(() => setShowHint(false), 6200);
      });
  }, []);

  // ── Shared mute-toggle logic (used by hero click + mute button) ──
  const applyMuteToggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    setClickFeedback(v.muted ? 'muted' : 'sound');
    if (!v.muted) { setHintFading(true); setTimeout(() => setShowHint(false), 700); }
    setTimeout(() => setClickFeedback(null), 700);
  }, []);

  // ── Click anywhere on hero/video = toggle mute ─────────────
  const handleHeroClick = useCallback(() => {
    if (videoEnded) return;
    applyMuteToggle();
  }, [videoEnded, applyMuteToggle]);

  // ── Dedicated mute button (same action, kept as its own control) ──
  const toggleMute = useCallback((e) => {
    e.stopPropagation();
    applyMuteToggle();
  }, [applyMuteToggle]);

  // ── Dedicated Play/Pause button — no longer tied to hero click ──
  const togglePlayPause = useCallback((e) => {
    e && e.stopPropagation();
    const v = videoRef.current;
    if (!v || videoEnded) return;
    if (v.paused) {
      v.play(); setIsPlaying(true);
    } else {
      v.pause(); setIsPlaying(false);
    }
  }, [videoEnded]);

  // ── Replay (resets video and plays from start with sound) ──
  const replayVideo = useCallback((e) => {
    e && e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    setVideoEnded(false);
    setAvatarReady(false);
    setIsPlaying(true);
    const bg = bgVideoRef.current;
    if (bg) {
      bg.style.transition = 'opacity 1.2s ease';
      bg.style.opacity = '1';
      bg.play().catch(() => {});
    }
    v.currentTime = 0;
    v.muted = false;
    setIsMuted(false);
    v.play().catch(() => {
      v.muted = true; setIsMuted(true); v.play().catch(() => {});
    });
  }, []);

  // ── Avatar click = toggle play/pause OR replay if ended ────
  const handleAvatarClick = useCallback((e) => {
    e.stopPropagation();
    replayVideo();
  }, [replayVideo]);

  // ── Video ended → show avatar ───────────────────────────────
  const onVideoEnded = useCallback(() => {
    setIsPlaying(false);
    setVideoEnded(true);
    setShowHint(false);
    const bg = bgVideoRef.current;
    if (bg) {
      bg.style.transition = 'opacity 2.5s ease';
      bg.style.opacity = '0';
      setTimeout(() => bg.pause(), 2600);
    }
  }, []);

  const onVideoPlay  = useCallback(() => { bgVideoRef.current?.play().catch(() => {}); }, []);
  const onVideoPause = useCallback(() => { if (!videoEnded) bgVideoRef.current?.pause(); }, [videoEnded]);

  const scrollToNext = useCallback((e) => {
    e.stopPropagation();
    heroRef.current?.nextElementSibling?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} onClick={handleHeroClick}>

      {/* Ambient blurred background */}
      <video ref={bgVideoRef} className={styles.bgVideo} src={videoSrc} autoPlay loop muted playsInline aria-hidden="true" />

      {/* Warm ambient glow — adds life/color behind the dark overlays */}
      <div className={styles.heroAurora} aria-hidden="true">
        <span className={styles.auroraBlobA} />
        <span className={styles.auroraBlobB} />
      </div>

      {/* Cinematic gradient overlays */}
      <div className={styles.gradientLeft}   aria-hidden="true" />
      <div className={styles.gradientRight}  aria-hidden="true" />
      <div className={styles.gradientBottom} aria-hidden="true" />
      <div className={styles.gradientTop}    aria-hidden="true" />
      <div className={styles.vignette}       aria-hidden="true" />

      {/* Three.js bokeh particles */}
      <CinematicLayer />

      {/* Video / avatar area */}
      <div className={styles.videoWrap}>
        <div className={styles.videoGlow} aria-hidden="true" />

        <video
          ref={videoRef}
          className={`${styles.mainVideo} ${videoEnded ? styles.videoHidden : ''}`}
          src={videoSrc}
          playsInline
          onPlay={onVideoPlay}
          onPause={onVideoPause}
          onEnded={onVideoEnded}
        />

        {/* Avatar — click to replay */}
        {videoEnded && (
          <div
            className={`${styles.avatarWrap} ${avatarReady ? styles.avatarVisible : ''}`}
            onClick={handleAvatarClick}
            role="button"
            aria-label="Replay intro video"
          >
            <img
              src={avatarSrc}
              alt="Sanjana Reddy Nenturi"
              className={styles.avatarImg}
              onLoad={() => setAvatarReady(true)}
              onError={() => setAvatarReady(true)}
            />
            <div className={styles.replayHint}>
              <IconPlay />
              <span>Replay</span>
            </div>
          </div>
        )}

        <div className={styles.videoEdgeFade} aria-hidden="true" />
      </div>

      {/* Click feedback flash */}
      {clickFeedback && (
        <div className={styles.clickFeedback}>
          {clickFeedback === 'muted' ? <IconMuted /> : <IconSound />}
        </div>
      )}

      {/* Text content */}
      <div className={styles.content}>
        <span className={styles.tagline}>
          Data Analytics Engineer&nbsp;·&nbsp;Portfolio 2026
        </span>
        <h1 className={styles.name}>
          <span className={styles.firstName}>Sanjana Reddy</span>
          <span className={styles.lastName}>Nenturi</span>
        </h1>
        <p className={styles.role}>
          Building data systems from raw signals to executive dashboards —<br />
          across research, healthcare, and business domains.
        </p>
      </div>

      {/* Controls — bottom right */}
      <div className={styles.controls} onClick={(e) => e.stopPropagation()}>
        <button className={styles.ctrlBtn} onClick={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <IconPause /> : <IconPlay />}
        </button>
        <button className={styles.ctrlBtn} onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
          {isMuted ? <IconMuted /> : <IconSound />}
        </button>
        <button className={styles.ctrlBtn} onClick={replayVideo} aria-label="Replay from start">
          <IconReplay />
        </button>
      </div>

      {/* Sound hint */}
      {showHint && !videoEnded && (
        <div className={`${styles.soundHint} ${hintFading ? styles.soundHintFade : ''}`}>
          <span className={styles.hintPulse} />
          Click anywhere for sound
        </div>
      )}

      {/* Scroll indicator */}
      <button className={styles.scrollIndicator} onClick={scrollToNext} aria-label="Scroll down">
        <span className={styles.scrollLabel}>scroll</span>
        <span className={styles.scrollTrack}><span className={styles.scrollThumb} /></span>
      </button>

    </section>
  );
}

/* ── Icons ────────────────────────────────────────────────── */
function IconPlay() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M2.5 1.5l10 5.5-10 5.5V1.5z" /></svg>;
}
function IconPause() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1.5" width="3.5" height="11" rx="1" /><rect x="8.5" y="1.5" width="3.5" height="11" rx="1" /></svg>;
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
      <line x1="9.5" y1="5" x2="13.5" y2="9" /><line x1="13.5" y1="5" x2="9.5" y2="9" />
    </svg>
  );
}
function IconReplay() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 7A5.5 5.5 0 1 0 7 1.5" />
      <polyline points="1.5,3.5 1.5,7 5,7" />
    </svg>
  );
}
