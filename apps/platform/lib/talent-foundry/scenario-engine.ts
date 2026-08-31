import type { ScenarioBeat, ScenarioDecision, ScenarioDef, ScenarioRunState } from './types';

export function createRun(scenarioId: string): ScenarioRunState {
  return { scenarioId, beatIndex: 0, decisions: [] };
}

export function currentBeat(def: ScenarioDef, run: ScenarioRunState | undefined): ScenarioBeat | null {
  const index = run?.beatIndex ?? 0;
  return def.beats[index] ?? null;
}

export function isScenarioComplete(def: ScenarioDef, run: ScenarioRunState | undefined): boolean {
  return (run?.beatIndex ?? 0) >= def.beats.length;
}

export function advanceReveal(run: ScenarioRunState): ScenarioRunState {
  return { ...run, beatIndex: run.beatIndex + 1 };
}

export function recordDecision(
  run: ScenarioRunState,
  beat: ScenarioBeat,
  choiceId: string,
  choiceLabel: string,
  reasoning: string | undefined,
  now = new Date(),
): ScenarioRunState {
  const decision: ScenarioDecision = {
    beatId: beat.id,
    choiceId,
    choiceLabel,
    reasoning: reasoning?.trim() || undefined,
    order: run.decisions.length + 1,
    at: now.toISOString(),
  };
  return {
    ...run,
    beatIndex: run.beatIndex + 1,
    decisions: [...run.decisions, decision],
  };
}

export function choiceOn(decisions: ScenarioDecision[], beatId: string): string | undefined {
  return decisions.find((d) => d.beatId === beatId)?.choiceId;
}
