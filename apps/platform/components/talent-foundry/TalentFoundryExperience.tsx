'use client';

import { useEffect, useMemo, useState } from 'react';
import { kellyCampaign, kellyCopy } from '../../lib/talent-foundry/campaigns/kelly';
import { advanceSession, excerptText } from '../../lib/talent-foundry/journey';
import { loadSession, resetSession, saveSession } from '../../lib/talent-foundry/session';
import type { TalentFoundrySession, WillingnessChoice } from '../../lib/talent-foundry/types';

export function TalentFoundryExperience() {
  const [session, setSession] = useState<TalentFoundrySession | null>(null);
  const [changeText, setChangeText] = useState('');

  useEffect(() => {
    const loaded = loadSession(kellyCampaign);
    setSession(loaded);
    const prior = loaded.evidence.find((item) => item.stateId === 'change_prompt' && item.kind === 'text');
    if (typeof prior?.value === 'string') setChangeText(prior.value);
  }, []);

  useEffect(() => {
    if (session) saveSession(kellyCampaign, session);
  }, [session]);

  const acknowledgment = useMemo(() => {
    const excerpt = excerptText(changeText);
    if (!excerpt) return 'Even the pause says something.';
    return excerpt;
  }, [changeText]);

  if (!session) {
    return <div className="tf-stage" aria-hidden />;
  }

  const go = (next: TalentFoundrySession) => setSession(next);

  const continueSpine = () => go(advanceSession(session, kellyCampaign));

  const submitChange = () => {
    go(
      advanceSession(session, kellyCampaign, [
        {
          stateId: 'change_prompt',
          kind: 'text',
          label: kellyCopy.changePrompt,
          value: changeText.trim(),
          dimensions: ['written_communication', 'passion'],
        },
      ]),
    );
  };

  const chooseWillingness = (choice: WillingnessChoice) => {
    go(
      advanceSession(
        session,
        kellyCampaign,
        [
          {
            stateId: 'willingness',
            kind: 'choice',
            label: kellyCopy.willingnessPrompt,
            value: { id: choice.id, label: choice.label },
            dimensions: ['willingness_to_volunteer', 'availability'],
          },
        ],
        { willingToAct: choice.willingToAct },
      ),
    );
  };

  return (
    <>
      <button type="button" className="tf-reset" onClick={() => { setChangeText(''); go(resetSession(kellyCampaign)); }}>
        Start over
      </button>
      <div className="tf-stage" key={session.stateId}>
        {session.stateId === 'entry' ? (
          <div className="tf-hold">
            <div className="tf-pulse" aria-hidden />
            <h1 className="tf-display">Something is already in motion.</h1>
            <p className="tf-body">It noticed you showed up.</p>
            <div className="tf-actions">
              <button type="button" className="tf-btn tf-btn-primary" onClick={continueSpine}>
                Begin
              </button>
            </div>
          </div>
        ) : null}

        {session.stateId === 'mystery' ? (
          <div className="tf-hold">
            <div className="tf-lines">
              <p>Something is happening in Arkansas.</p>
              <p>It does not start with a form.</p>
            </div>
            <div className="tf-actions" style={{ marginTop: 32 }}>
              <button type="button" className="tf-btn tf-btn-primary" onClick={continueSpine}>
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {session.stateId === 'change_prompt' ? (
          <div className="tf-hold">
            <p className="tf-kicker">A question</p>
            <h1 className="tf-display">{kellyCopy.changePrompt}</h1>
            <label className="sr-only" htmlFor="tf-change">
              {kellyCopy.changePrompt}
            </label>
            <textarea
              id="tf-change"
              className="tf-field"
              value={changeText}
              onChange={(e) => setChangeText(e.target.value)}
              placeholder={kellyCopy.changePlaceholder}
              maxLength={800}
              autoComplete="off"
            />
            <div className="tf-actions">
              <button type="button" className="tf-btn tf-btn-primary" onClick={submitChange}>
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {session.stateId === 'acknowledgment' ? (
          <div className="tf-hold">
            <p className="tf-kicker">Heard</p>
            {changeText.trim() ? <p className="tf-echo">“{acknowledgment}”</p> : null}
            <p className="tf-body">
              {changeText.trim()
                ? 'You named something real. Hold that. The rest of this is about whether you will do something with it.'
                : 'Even the pause says something. Not everyone is ready to name it out loud. You can still walk forward.'}
            </p>
            <div className="tf-actions">
              <button type="button" className="tf-btn tf-btn-primary" onClick={continueSpine}>
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {session.stateId === 'people_rule' ? (
          <div className="tf-hold">
            <p className="tf-kicker">{kellyCopy.peopleRuleEyebrow}</p>
            <h1 className="tf-display">{kellyCopy.peopleRuleTitle}</h1>
            <p className="tf-latin">{kellyCopy.peopleRuleLatin}</p>
            <p className="tf-body">{kellyCopy.peopleRuleBody}</p>
            <div className="tf-actions">
              <button type="button" className="tf-btn tf-btn-primary" onClick={continueSpine}>
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {session.stateId === 'willingness' ? (
          <div className="tf-hold">
            <p className="tf-kicker">A choice</p>
            <h1 className="tf-display">{kellyCopy.willingnessPrompt}</h1>
            <div className="tf-actions">
              {kellyCampaign.willingnessChoices.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  className="tf-btn"
                  onClick={() => chooseWillingness(choice)}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {session.stateId === 'opening_hold' ? (
          <div className="tf-hold">
            <p className="tf-kicker">Held</p>
            <h1 className="tf-display">You are still in the room.</h1>
            <p className="tf-body">
              That was the opening. The next movement is the real work — a room of people, no
              instructions, and a chance to show how you think.
            </p>
            <div className="tf-actions">
              <button type="button" className="tf-btn tf-btn-ghost" onClick={() => go(resetSession(kellyCampaign))}>
                Walk it again
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
