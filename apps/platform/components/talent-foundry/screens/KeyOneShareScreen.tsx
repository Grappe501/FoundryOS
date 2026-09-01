'use client';

export function KeyOneShareScreen({ onShare, onKeepGoing }: { onShare: () => void; onKeepGoing: () => void }) {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">With you</p>
      <h1 className="tf-display">Know someone who should see this?</h1>
      <p className="tf-body">Bring someone with you.</p>
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" onClick={onShare}>
          Share
        </button>
        <button type="button" className="tf-btn" onClick={onKeepGoing}>
          Keep going
        </button>
      </div>
    </div>
  );
}
