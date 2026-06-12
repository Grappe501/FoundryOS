import type { GraphConfidence } from '@foundry/atlas-graph-engine';
import { FORBIDDEN_INVENTION_TOPICS, UNKNOWN_SOURCE_MESSAGE } from './types';

const LOW_CONFIDENCE: GraphConfidence[] = ['unknown', 'editorial'];

export function isLowConfidence(confidence?: GraphConfidence): boolean {
  return !confidence || LOW_CONFIDENCE.includes(confidence);
}

export function shouldRefuseInvention(topic: string): boolean {
  const hay = topic.toLowerCase();
  return FORBIDDEN_INVENTION_TOPICS.some((t) => hay.includes(t.split(' ')[0]!));
}

export function unknownFieldNotice(field: string): string {
  return `${field}: ${UNKNOWN_SOURCE_MESSAGE}`;
}

export function guardClaim(field: string, confidence: GraphConfidence, value: string): string {
  if (confidence === 'unknown') return unknownFieldNotice(field);
  if (confidence === 'editorial') return `${value} (Foundry editorial — not producer-verified.)`;
  return value;
}
