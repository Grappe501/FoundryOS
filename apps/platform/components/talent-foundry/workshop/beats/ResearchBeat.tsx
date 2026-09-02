'use client';

export function ResearchLook({ soulLine, onLook }: { soulLine?: string | null; onLook: () => void }) {
  return (
    <>
      {soulLine ? <p className="ws-soul">{soulLine}</p> : null}
      <button type="button" className="ws-threshold" onClick={onLook} aria-label="Go look">
        <span className="ws-threshold-mark" aria-hidden />
      </button>
    </>
  );
}

export function ResearchAway({ onBack }: { onBack: () => void }) {
  return (
    <>
      <p className="ws-line ws-line--quiet">The work is still on the bench.</p>
      <button type="button" className="ws-threshold" onClick={onBack} aria-label="I'm back">
        <span className="ws-threshold-mark" aria-hidden />
      </button>
    </>
  );
}

export function ResearchBack({
  finding,
  changed,
  rejected,
  tools,
  onFinding,
  onChanged,
  onRejected,
  onTools,
  onBring,
}: {
  finding: string;
  changed: string;
  rejected: string;
  tools: string;
  onFinding: (value: string) => void;
  onChanged: (value: string) => void;
  onRejected: (value: string) => void;
  onTools: (value: string) => void;
  onBring: () => void;
}) {
  const ready = finding.trim().length > 0;
  return (
    <>
      <p className="ws-soul">What did you find?</p>
      <textarea
        className="ws-field"
        value={finding}
        onChange={(e) => onFinding(e.target.value)}
        rows={3}
        aria-label="What did you find?"
      />
      {ready ? (
        <>
          <p className="ws-prompt">What changed because of it?</p>
          <textarea
            className="ws-field"
            value={changed}
            onChange={(e) => onChanged(e.target.value)}
            rows={2}
            aria-label="What changed because of it?"
          />
          <p className="ws-prompt">What did you reject?</p>
          <textarea
            className="ws-field"
            value={rejected}
            onChange={(e) => onRejected(e.target.value)}
            rows={2}
            aria-label="What did you reject?"
          />
          <p className="ws-prompt">What did you use?</p>
          <textarea
            className="ws-field"
            value={tools}
            onChange={(e) => onTools(e.target.value)}
            rows={2}
            aria-label="What did you use?"
          />
          <button type="button" className="ws-threshold" onClick={onBring} aria-label="Leave it beside the work">
            <span className="ws-threshold-mark" aria-hidden />
          </button>
        </>
      ) : null}
    </>
  );
}

export function ResearchReceipt({
  tool,
  usedFor,
  onTool,
  onUsedFor,
  onLeave,
}: {
  tool: string;
  usedFor: string;
  onTool: (value: string) => void;
  onUsedFor: (value: string) => void;
  onLeave: () => void;
}) {
  const ready = tool.trim().length > 0 && usedFor.trim().length > 0;
  return (
    <div className="ws-receipt">
      <p className="ws-prompt">What did you use?</p>
      <input
        className="ws-field ws-field--line"
        value={tool}
        onChange={(e) => onTool(e.target.value)}
        aria-label="Tool"
      />
      <textarea
        className="ws-field"
        value={usedFor}
        onChange={(e) => onUsedFor(e.target.value)}
        rows={2}
        aria-label="How you used it"
      />
      {ready ? (
        <button type="button" className="ws-threshold" onClick={onLeave} aria-label="Leave a tool receipt">
          <span className="ws-threshold-mark" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
