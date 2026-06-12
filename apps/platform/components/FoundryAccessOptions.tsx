'use client';

import { useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

const ACCENT = 'var(--foundry-primary)';

export function FoundryAccessOptions({ compact }: { compact?: boolean }) {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    setInstalled(standalone);
    setIsIos(/iPad|iPhone|iPod/.test(navigator.userAgent));

    const onBip = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', onBip);
    return () => window.removeEventListener('beforeinstallprompt', onBip);
  }, []);

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  }

  if (installed) {
    return (
      <p style={{ color: 'var(--foundry-success)', fontSize: compact ? 12 : 13, margin: compact ? '12px 0 0' : '16px 0 0' }}>
        Running as installed app · same account, all worlds
      </p>
    );
  }

  return (
    <div
      style={{
        marginTop: compact ? 12 : 20,
        padding: compact ? 14 : 18,
        background: 'var(--foundry-surface-raised)',
        border: '1px solid var(--foundry-border-warm)',
        borderRadius: 8,
      }}
    >
      <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
        Use anywhere
      </p>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: compact ? 13 : 14, marginTop: 8, lineHeight: 1.6 }}>
        <strong style={{ color: 'var(--foundry-text)', fontWeight: 500 }}>Web</strong> — use in any browser now.
        {' '}
        <strong style={{ color: 'var(--foundry-text)', fontWeight: 500 }}>Phone</strong> — install to home screen; artifacts and passport sync when you sign in.
      </p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
        {deferred && (
          <button
            type="button"
            onClick={install}
            style={{
              padding: '10px 16px',
              background: 'var(--foundry-border-warm)',
              border: `1px solid ${ACCENT}55`,
              borderRadius: 6,
              color: 'var(--foundry-text)',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Install on this device
          </button>
        )}
        {isIos && !deferred && (
          <span style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>
            iPhone/iPad: Share → Add to Home Screen
          </span>
        )}
        {!deferred && !isIos && (
          <span style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>
            Android/desktop Chrome: Install when your browser offers it
          </span>
        )}
      </div>
    </div>
  );
}
