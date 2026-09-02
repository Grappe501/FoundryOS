'use client';

import { PHASE_1_MESS } from '../../../../lib/talent-foundry/implementations/company/scenarios/lab';

export function MessChoices({ onChoose }: { onChoose: (choiceId: string) => void }) {
  return (
    <>
      <ul className="ws-facts">
        {PHASE_1_MESS.facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
      {PHASE_1_MESS.choices.map((choice) => (
        <button key={choice.id} type="button" className="ws-choice" onClick={() => onChoose(choice.id)}>
          {choice.label}
        </button>
      ))}
    </>
  );
}

export function MessAftermath({
  consequence,
  soulLine = null,
  onContinue,
}: {
  consequence: string;
  soulLine?: string | null;
  onContinue: () => void;
}) {
  return (
    <>
      <p className="ws-consequence">{consequence}</p>
      {soulLine ? <p className="ws-soul">{soulLine}</p> : null}
      <button type="button" className="ws-threshold" onClick={onContinue} aria-label="Continue">
        <span className="ws-threshold-mark" aria-hidden />
      </button>
    </>
  );
}
