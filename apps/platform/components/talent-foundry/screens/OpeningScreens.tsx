'use client';

import { kellyCampaign, kellyCopy } from '../../../lib/talent-foundry/campaigns/kelly';
import type { WillingnessChoice } from '../../../lib/talent-foundry/types';

export function OpeningScreens({
  stateId,
  changeText,
  acknowledgment,
  onChangeText,
  onBegin,
  onContinue,
  onSubmitChange,
  onWillingness,
}: {
  stateId: string;
  changeText: string;
  acknowledgment: string;
  onChangeText: (value: string) => void;
  onBegin: () => void;
  onContinue: () => void;
  onSubmitChange: () => void;
  onWillingness: (choice: WillingnessChoice) => void;
}) {
  if (stateId === 'entry' || stateId === 'mystery') {
    return (
      <div className="tf-hold">
        <div className="tf-pulse" aria-hidden />
        <h1 className="tf-display">Something is already in motion.</h1>
        <p className="tf-body">It noticed you showed up.</p>
        <div className="tf-actions">
          <button type="button" className="tf-btn tf-btn-primary" onClick={onBegin}>
            Begin
          </button>
        </div>
      </div>
    );
  }

  if (stateId === 'change_prompt') {
    return (
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
          onChange={(e) => onChangeText(e.target.value)}
          placeholder={kellyCopy.changePlaceholder}
          maxLength={800}
          autoComplete="off"
        />
        <div className="tf-actions">
          <button type="button" className="tf-btn tf-btn-primary" onClick={onSubmitChange}>
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (stateId === 'acknowledgment' || stateId === 'people_rule') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{kellyCopy.peopleRuleEyebrow}</p>
        {changeText.trim() ? <p className="tf-echo">“{acknowledgment}”</p> : null}
        <h1 className="tf-display">{kellyCopy.peopleRuleTitle}</h1>
        <p className="tf-latin">{kellyCopy.peopleRuleLatin}</p>
        <div className="tf-actions">
          <button type="button" className="tf-btn tf-btn-primary" onClick={onContinue}>
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (stateId === 'willingness') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">A choice</p>
        <h1 className="tf-display">{kellyCopy.willingnessPrompt}</h1>
        <div className="tf-actions">
          {kellyCampaign.willingnessChoices.map((choice) => (
            <button key={choice.id} type="button" className="tf-btn" onClick={() => onWillingness(choice)}>
              {choice.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
