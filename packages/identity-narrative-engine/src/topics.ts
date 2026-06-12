import type { IdentitySignalBundle } from './types';
import type { WorldNarrativeConfig } from './worlds';

function haystack(signals: IdentitySignalBundle): string {
  return [
    ...signals.mission_titles,
    ...signals.reflections,
    ...signals.consequence_node_ids,
    ...signals.consequence_labels,
    ...signals.events_voted,
    ...signals.events_completed,
    ...signals.events_saved,
    ...signals.debate_topics,
    ...signals.active_collections.map((c) => c.title),
    ...signals.completed_collection_ids,
    ...signals.recent_artifact_titles,
    ...signals.recent_artifact_types,
  ]
    .join(' ')
    .toLowerCase();
}

export function detectTopics(signals: IdentitySignalBundle, config: WorldNarrativeConfig): string[] {
  const text = haystack(signals);
  const found: string[] = [];
  for (const [topic, keywords] of Object.entries(config.topic_keywords)) {
    if (keywords.some((k) => text.includes(k))) found.push(topic);
  }
  return found.slice(0, 4);
}

export function topicsToPhrase(topics: string[], config: WorldNarrativeConfig): string {
  if (topics.length === 0) {
    return 'the foundations — vocabulary, context, and first reps';
  }
  const phrases = topics.map((t) => config.topic_phrases[t]).filter(Boolean);
  if (phrases.length === 1) return phrases[0]!;
  if (phrases.length === 2) return `${phrases[0]} and ${phrases[1]}`;
  return `${phrases.slice(0, -1).join(', ')}, and ${phrases[phrases.length - 1]}`;
}
