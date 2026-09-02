export function NamedReveal({ onContinue }: { onContinue: () => void }) {
  return (
    <>
      <h1 className="ws-named">THIS IS TALENT FOUNDRY.</h1>
      <p className="ws-line ws-line--quiet">We don’t start with résumés.</p>
      <p className="ws-line ws-line--quiet">We start with the work.</p>
      <button type="button" className="ws-next" onClick={onContinue}>
        Continue
      </button>
    </>
  );
}

export function LingerRest({ onReset }: { onReset: () => void }) {
  return (
    <>
      <p className="ws-line">You can go.</p>
      <p className="ws-line ws-line--quiet">The bench will still be here.</p>
      <button type="button" className="ws-ghost" onClick={onReset}>
        Start over
      </button>
    </>
  );
}
