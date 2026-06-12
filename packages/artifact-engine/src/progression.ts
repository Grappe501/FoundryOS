/** World → Artifacts → Collections → Identity → Influence → Legacy */

export const ARTIFACT_PROGRESSION = [
  { stage: 'world', description: 'User participates in a world' },
  { stage: 'artifacts', description: 'World creates artifacts — evidence of participation' },
  { stage: 'collections', description: 'Artifacts compose collections' },
  { stage: 'identity', description: 'Collections and artifacts create identity' },
  { stage: 'influence', description: 'Identity enables reviews, recommendations, hosting' },
  { stage: 'legacy', description: 'Influence compounds into long-term archive' },
] as const;

export type ArtifactProgressionStage = (typeof ARTIFACT_PROGRESSION)[number]['stage'];
