'use client';

import { useRef, useState } from 'react';
import { kellyCopy } from '../../lib/talent-foundry/campaigns/kelly';

export function KellyVideoStage({
  videoUrl,
  onContinue,
}: {
  videoUrl: string | null;
  onContinue: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [transcriptOpen, setTranscriptOpen] = useState(!videoUrl);
  const [failed, setFailed] = useState(false);

  const hasVideo = Boolean(videoUrl) && !failed;

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el || !hasVideo) {
      setTranscriptOpen(true);
      return;
    }
    if (el.paused) {
      void el.play().then(() => setPlaying(true)).catch(() => setFailed(true));
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el || !hasVideo) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  return (
    <div className="tf-hold">
      <p className="tf-kicker">{kellyCopy.videoEyebrow}</p>
      <div className="tf-video" data-empty={!hasVideo || undefined}>
        {hasVideo ? (
          <video
            ref={videoRef}
            className="tf-video-el"
            src={videoUrl ?? undefined}
            playsInline
            preload="metadata"
            poster=""
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="tf-video-poster" aria-hidden>
            <span className="tf-video-name">{kellyCopy.kellyName}</span>
            <span className="tf-video-hint">{kellyCopy.videoMissing}</span>
          </div>
        )}
        <div className="tf-video-controls">
          <button type="button" className="tf-video-ctl" onClick={togglePlay} aria-pressed={playing}>
            {hasVideo ? (playing ? 'Pause' : 'Play') : 'Hear her words'}
          </button>
          <button
            type="button"
            className="tf-video-ctl"
            onClick={toggleMute}
            disabled={!hasVideo}
            aria-pressed={!muted}
          >
            {muted || !hasVideo ? 'Muted' : 'Sound on'}
          </button>
        </div>
      </div>
      <div className="tf-actions">
        <button
          type="button"
          className="tf-btn tf-btn-ghost"
          onClick={() => setTranscriptOpen((v) => !v)}
          aria-expanded={transcriptOpen}
        >
          {transcriptOpen ? kellyCopy.transcriptHide : kellyCopy.transcriptLabel}
        </button>
      </div>
      {transcriptOpen ? (
        <div className="tf-transcript" id="kelly-transcript">
          {kellyCopy.kellyScript.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" onClick={onContinue}>
          {kellyCopy.videoContinue}
        </button>
      </div>
    </div>
  );
}
