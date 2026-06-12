'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PROGRESSION_CHAINS, chainProgress } from '../../../lib/bourbon-level-1/intelligence/progression-chains';
import { slugsFromCollection } from '../../../lib/bourbon-level-1/intelligence/shelf-intelligence';
import { getCollection } from '../../../lib/bourbon-level-1/storage';

const ACCENT = 'var(--foundry-primary)';

export function ProgressionChainsView() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    setSlugs(slugsFromCollection(getCollection()));
  }, []);

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Legendary bottle chains — progression creates purpose. Where are you on each ladder?
      </p>
      <div style={{ marginTop: 28, display: 'grid', gap: 24 }}>
        {PROGRESSION_CHAINS.map((chain) => {
          const progress = chainProgress(slugs, chain);
          return (
            <article key={chain.id} style={{ padding: 22, background: 'var(--foundry-surface-raised)', borderRadius: 12, border: '1px solid var(--foundry-border-subtle)' }}>
              <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>{chain.house}</p>
              <p style={{ color: 'var(--foundry-text)', fontSize: 18, marginTop: 8 }}>{chain.title}</p>
              <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 6 }}>{chain.tagline}</p>
              {slugs.length > 0 && (
                <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 10 }}>
                  Your progress: {progress}/{chain.steps.filter((s) => s.slug).length} catalog bottles on this chain
                </p>
              )}
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {chain.steps.map((step, i) => {
                  const onShelf = step.slug ? slugs.includes(step.slug) : false;
                  return (
                    <div key={step.name} style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20 }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: onShelf ? ACCENT : '#3A3A3E', marginTop: 6 }} />
                        {i < chain.steps.length - 1 && <span style={{ width: 2, flex: 1, background: 'var(--foundry-border)', minHeight: 24 }} />}
                      </div>
                      <div style={{ paddingBottom: 20, flex: 1 }}>
                        <p style={{ color: onShelf ? ACCENT : 'var(--foundry-text)', fontSize: 15, margin: 0 }}>{step.name}</p>
                        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 4 }}>{step.note}</p>
                        {step.href && (
                          <Link href={step.href} style={{ fontSize: 12, color: 'var(--foundry-text-faint)', marginTop: 6, display: 'inline-block' }}>
                            Explore →
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
