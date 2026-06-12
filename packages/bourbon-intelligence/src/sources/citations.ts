import type { ContentSource, SourceCitation, SourceConfidence, SourcedValue } from '../types';

export const ECFR_BOURBON_STANDARD: SourceCitation = {
  label: '27 CFR Part 5 Subpart I — Standards of Identity for Distilled Spirits (eCFR)',
  url: 'https://www.ecfr.gov/current/title-27/chapter-I/subchapter-A/part-5/subpart-I',
  type: 'legal',
  accessed_at: '2026-06-10',
};

export const BUFFALO_TRACE_HARLEN: SourceCitation = {
  label: 'Buffalo Trace Distillery — Harlen Wheatley',
  url: 'https://www.buffalotracedistillery.com/our-distillery/legendary-people/harlen-wheatley/',
  type: 'official',
  accessed_at: '2026-06-10',
};

export const WILD_TURKEY_OFFICIAL: SourceCitation = {
  label: 'Wild Turkey — Our Distillers (official)',
  url: 'https://www.wildturkeybourbon.com/our-story/our-distillers/',
  type: 'official',
  accessed_at: '2026-06-10',
};

export function sv<T>(
  value: T,
  confidence: SourceConfidence,
  content_source: ContentSource,
  citations?: SourceCitation[],
  notes?: string,
): SourcedValue<T> {
  return { value, confidence, content_source, citations, notes };
}

export function unknownField<T>(notes?: string): SourcedValue<T> {
  return {
    value: 'unknown' as T,
    confidence: 'unknown',
    content_source: 'editorial',
    notes: notes ?? 'Not publicly disclosed',
  };
}

export function unknownGrain(notes?: string) {
  return unknownField<number | 'unknown'>(notes ?? 'Grain percentage not publicly disclosed');
}
