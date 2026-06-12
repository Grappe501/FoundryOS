'use client';

import { Fragment, useMemo } from 'react';
import { AtlasTerm } from './AtlasTerm';
import { atlasMatchTerms } from '../../lib/bourbon-atlas/registry';

type Props = {
  text: string;
};

export function AtlasRichText({ text }: Props) {
  const terms = useMemo(() => atlasMatchTerms(), []);

  const parts = useMemo(() => linkParts(text, terms), [text, terms]);

  return (
    <>
      {parts.map((part, i) =>
        part.type === 'text' ? (
          <Fragment key={i}>{part.value}</Fragment>
        ) : part.slug ? (
          <AtlasTerm key={i} term={part.slug}>
            {part.value}
          </AtlasTerm>
        ) : (
          <Fragment key={i}>{part.value}</Fragment>
        ),
      )}
    </>
  );
}

type Part = { type: 'text' | 'term'; value: string; slug?: string };

function linkParts(text: string, terms: ReturnType<typeof atlasMatchTerms>): Part[] {
  if (!text) return [{ type: 'text', value: text }];

  const lower = text.toLowerCase();
  const matches: { start: number; end: number; slug: string; value: string }[] = [];

  for (const t of terms) {
    for (const pattern of t.patterns) {
      const pLower = pattern.toLowerCase();
      let idx = 0;
      while (idx < lower.length) {
        const found = lower.indexOf(pLower, idx);
        if (found === -1) break;
        const before = found > 0 ? text[found - 1] : ' ';
        const after = found + pattern.length < text.length ? text[found + pattern.length] : ' ';
        const wordChar = /[\w']/;
        if (!wordChar.test(before) && !wordChar.test(after)) {
          matches.push({
            start: found,
            end: found + pattern.length,
            slug: t.slug,
            value: text.slice(found, found + pattern.length),
          });
        }
        idx = found + pattern.length;
      }
    }
  }

  matches.sort((a, b) => a.start - b.start || b.end - a.end - (a.end - a.start));
  const deduped: typeof matches = [];
  let lastEnd = -1;
  for (const m of matches) {
    if (m.start >= lastEnd) {
      deduped.push(m);
      lastEnd = m.end;
    }
  }

  if (deduped.length === 0) return [{ type: 'text', value: text }];

  const parts: Part[] = [];
  let cursor = 0;
  for (const m of deduped) {
    if (m.start > cursor) parts.push({ type: 'text', value: text.slice(cursor, m.start) });
    parts.push({ type: 'term', value: m.value, slug: m.slug });
    cursor = m.end;
  }
  if (cursor < text.length) parts.push({ type: 'text', value: text.slice(cursor) });
  return parts;
}
