'use client';

import { useEffect, useId, useRef, useState } from 'react';
import {
  TALENT_FOUNDRY_QR_SVG,
  TALENT_FOUNDRY_SHARE_URL,
} from '../../lib/talent-foundry/constants';

function focusableIn(root: HTMLElement): HTMLElement[] {
  return [
    ...root.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ].filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);
}

async function copyShareUrl(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(TALENT_FOUNDRY_SHARE_URL);
    return true;
  } catch {
    return false;
  }
}

export function ShareQrTakeover({ open, onClose }: { open: boolean; onClose: () => void }) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [shareHint, setShareHint] = useState<string | null>(null);
  const [nativeShare, setNativeShare] = useState(false);

  useEffect(() => {
    if (!open) {
      setCopied(false);
      setShareHint(null);
      return;
    }
    setNativeShare(typeof navigator.share === 'function');
    const prev = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const root = dialogRef.current;
    const first = root ? focusableIn(root)[0] : null;
    first?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !root) return;
      const list = focusableIn(root);
      if (list.length === 0) return;
      const firstEl = list[0];
      const lastEl = list[list.length - 1];
      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      prev?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const onShare = async () => {
    setShareHint(null);
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: 'Talent Foundry',
          text: 'Begin here.',
          url: TALENT_FOUNDRY_SHARE_URL,
        });
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
      }
    }
    const ok = await copyShareUrl();
    setShareHint(ok ? 'Link copied.' : 'Copy the link below.');
    if (ok) setCopied(true);
  };

  const onCopy = async () => {
    const ok = await copyShareUrl();
    setCopied(ok);
    setShareHint(ok ? 'Link copied.' : 'Could not copy. Long-press the address.');
  };

  return (
    <div className="tf-share" role="presentation">
      <div className="tf-share-backdrop" onClick={onClose} />
      <div
        ref={dialogRef}
        className="tf-share-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <p id={titleId} className="tf-share-title">
          Bring someone with you.
        </p>
        <div className="tf-share-qr-wrap">
          <img
            className="tf-share-qr"
            src={TALENT_FOUNDRY_QR_SVG}
            alt="QR code. Scan to begin Talent Foundry."
            width={320}
            height={320}
          />
        </div>
        <p className="tf-share-lead">Scan to begin.</p>
        <p className="tf-share-rule">The People Rule.</p>
        {shareHint || copied ? (
          <p className="tf-share-status" role="status">
            {shareHint || 'Link copied.'}
          </p>
        ) : null}
        <div className="tf-share-actions">
          {nativeShare ? (
            <button type="button" className="tf-btn tf-btn-primary" onClick={() => void onShare()}>
              Share link
            </button>
          ) : null}
          <button type="button" className={nativeShare ? 'tf-btn' : 'tf-btn tf-btn-primary'} onClick={() => void onCopy()}>
            Copy link
          </button>
          <button type="button" className="tf-btn tf-btn-ghost" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
