'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type Props = {
  title: string;
  tagline: string;
  ctaHref: string;
  ctaLabel: string;
};

export function BourbonCinematicLanding({ title, tagline, ctaHref, ctaLabel }: Props) {
  const [phase, setPhase] = useState(0);
  const [reduced, setReduced] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    if (mq.matches) {
      setPhase(4);
      return;
    }
    const steps = [400, 1100, 2000, 2800].map((ms, i) =>
      window.setTimeout(() => setPhase(i + 1), ms),
    );
    return () => steps.forEach(clearTimeout);
  }, []);

  function scrollToWorld() {
    const target = document.getElementById('bourbon-world-entry');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section
      ref={sectionRef}
      className="bourbon-cinematic"
      aria-label="Welcome to Bourbon World"
    >
      <div className="bourbon-cinematic__aurora" aria-hidden />
      <div className="bourbon-cinematic__beam bourbon-cinematic__beam--1" aria-hidden />
      <div className="bourbon-cinematic__beam bourbon-cinematic__beam--2" aria-hidden />
      <div className="bourbon-cinematic__grain" aria-hidden />

      <div className="bourbon-cinematic__content">
        <p
          className={`bourbon-cinematic__arrival${phase >= 1 ? ' bourbon-cinematic__arrival--visible' : ''}`}
        >
          You have arrived
        </p>

        <h1
          className={`bourbon-cinematic__title foundry-display${phase >= 2 ? ' bourbon-cinematic__title--visible' : ''}`}
        >
          {title}
        </h1>

        <p
          className={`bourbon-cinematic__tagline${phase >= 3 ? ' bourbon-cinematic__tagline--visible' : ''}`}
        >
          {tagline}
        </p>

        <div
          className={`bourbon-cinematic__actions${phase >= 4 ? ' bourbon-cinematic__actions--visible' : ''}`}
        >
          <Link href={ctaHref} className="foundry-btn foundry-btn--primary">
            {ctaLabel} →
          </Link>
          <button type="button" className="foundry-btn foundry-btn--ghost" onClick={scrollToWorld}>
            Look around first
          </button>
        </div>
      </div>

      {!reduced && phase >= 4 && (
        <button
          type="button"
          className="bourbon-cinematic__scroll-hint"
          onClick={scrollToWorld}
          aria-label="Scroll to explore"
        >
          <span className="bourbon-cinematic__scroll-line" />
        </button>
      )}
    </section>
  );
}
