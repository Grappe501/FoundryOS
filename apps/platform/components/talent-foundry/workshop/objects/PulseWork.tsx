'use client';

import type { ArtifactTrack } from '../../../../lib/talent-foundry/implementations/company/spine/envelope';

export function PulseWork({
  trackId,
  label,
  happens,
  onLabel,
  onHappens,
  onTyping,
}: {
  trackId: ArtifactTrack;
  label: string;
  happens: string;
  onLabel: (value: string) => void;
  onHappens: (value: string) => void;
  onTyping: () => void;
}) {
  return (
    <aside
      className="ws-object ws-instrument ws-fragment"
      data-presence="focus"
      data-place="pulse"
      data-origin="found"
      data-life="changed"
      data-object-state="opened"
      data-work="true"
      aria-label="Pulse"
    >
      <div className="ws-chassis">
        <i className="ws-chassis-seam" aria-hidden />
        <div className="ws-chassis-face">
          <div className="ws-frag-top">
            <p className="ws-frag-name">Get started with Pulse</p>
            <span className="ws-badge">Draft · 14 conflicts</span>
          </div>
          {trackId === 'design' ? (
            <>
              <p className="ws-same">Account</p>
              <p className="ws-same">Danger zone</p>
              <textarea
                className="ws-field"
                value={label}
                onChange={(e) => onLabel(e.target.value)}
                onInput={onTyping}
                rows={3}
                aria-label="What you would change first"
              />
            </>
          ) : (
            <>
              <input
                className="ws-primary-edit"
                value={label}
                onChange={(e) => onLabel(e.target.value)}
                onInput={onTyping}
                aria-label="Primary control"
                placeholder="Delete workspace"
              />
              <textarea
                className="ws-field"
                value={happens}
                onChange={(e) => onHappens(e.target.value)}
                onInput={onTyping}
                rows={2}
                aria-label="What happens when someone presses it"
                placeholder="What happens when they press it."
              />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
