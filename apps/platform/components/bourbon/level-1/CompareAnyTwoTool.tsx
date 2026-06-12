'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  allBottleCompareOptions,
  allProducerCompareOptions,
  compareBottlesAny,
  compareProducersAny,
} from '../../../lib/bourbon-depth/compare-any';
import { createComparisonArtifact } from '../../../lib/artifacts/create-from-action';

const ACCENT = 'var(--foundry-primary)';

type Mode = 'bottles' | 'producers';

function CompareBar({ label, leftScore, rightScore, leftLabel, rightLabel, insight }: {
  label: string;
  leftScore: number;
  rightScore: number;
  leftLabel: string | number;
  rightLabel: string | number;
  insight?: string;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ color: '#6B6B70', fontSize: 11, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'center' }}>
        <div>
          <p style={{ color: '#E8E8EC', fontSize: 13, margin: '0 0 6px' }}>{leftLabel}</p>
          <div style={{ height: 8, background: '#1A1A1E', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: `${leftScore}%`, height: '100%', background: ACCENT, borderRadius: 4 }} />
          </div>
        </div>
        <div>
          <p style={{ color: '#E8E8EC', fontSize: 13, margin: '0 0 6px', textAlign: 'right' }}>{rightLabel}</p>
          <div style={{ height: 8, background: '#1A1A1E', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: `${rightScore}%`, height: '100%', background: '#6B9BC9', borderRadius: 4, marginLeft: 'auto' }} />
          </div>
        </div>
      </div>
      {insight && <p style={{ color: '#8A8A8E', fontSize: 12, marginTop: 10, lineHeight: 1.6 }}>{insight}</p>}
    </div>
  );
}

export function CompareAnyTwoTool({ initialMode = 'bottles', initialA, initialB }: { initialMode?: Mode; initialA?: string; initialB?: string }) {
  const bottleOpts = allBottleCompareOptions();
  const producerOpts = allProducerCompareOptions();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [a, setA] = useState(initialA ?? (initialMode === 'producers' ? 'buffalo-trace' : 'buffalo-trace'));
  const [b, setB] = useState(initialB ?? (initialMode === 'producers' ? 'wild-turkey' : 'wild-turkey-101'));
  const [saved, setSaved] = useState(false);

  const opts = mode === 'bottles' ? bottleOpts : producerOpts;
  const dimensions = useMemo(() => {
    if (mode === 'bottles') return compareBottlesAny(a, b);
    return compareProducersAny(a, b);
  }, [mode, a, b]);

  const aName = opts.find((o) => o.slug === a)?.name ?? a;
  const bName = opts.find((o) => o.slug === b)?.name ?? b;

  function saveComparison() {
    createComparisonArtifact(mode, a, b, aName, bName);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['bottles', 'producers'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              if (m === 'bottles') {
                setA('buffalo-trace');
                setB('wild-turkey-101');
              } else {
                setA('buffalo-trace');
                setB('wild-turkey');
              }
            }}
            style={{
              padding: '8px 14px',
              borderRadius: 999,
              border: `1px solid ${mode === m ? ACCENT : '#2A2A2E'}`,
              background: mode === m ? '#2A2520' : 'transparent',
              color: mode === m ? '#E8E8EC' : '#6B6B70',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            Compare {m}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 24 }}>
        <label style={{ display: 'block' }}>
          <span style={{ color: '#6B6B70', fontSize: 11 }}>Left</span>
          <select value={a} onChange={(e) => setA(e.target.value)} style={{ width: '100%', marginTop: 6, padding: 10, background: '#111114', color: '#E8E8EC', border: '1px solid #2A2A2E', borderRadius: 6 }}>
            {opts.map((o) => (
              <option key={o.slug} value={o.slug}>{o.name}</option>
            ))}
          </select>
        </label>
        <label style={{ display: 'block' }}>
          <span style={{ color: '#6B6B70', fontSize: 11 }}>Right</span>
          <select value={b} onChange={(e) => setB(e.target.value)} style={{ width: '100%', marginTop: 6, padding: 10, background: '#111114', color: '#E8E8EC', border: '1px solid #2A2A2E', borderRadius: 6 }}>
            {opts.filter((o) => o.slug !== a).map((o) => (
              <option key={o.slug} value={o.slug}>{o.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ padding: 24, background: '#0F0F12', borderRadius: 10, border: '1px solid #1A1A1E' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
          <Link href={mode === 'bottles' ? `/bourbon/bottles/${a}` : `/bourbon/producers/${a}`} style={{ color: ACCENT, fontSize: 14, textDecoration: 'none' }}>{aName} →</Link>
          <span style={{ color: '#6B6B70', fontSize: 12 }}>vs</span>
          <Link href={mode === 'bottles' ? `/bourbon/bottles/${b}` : `/bourbon/producers/${b}`} style={{ color: '#6B9BC9', fontSize: 14, textDecoration: 'none' }}>{bName} →</Link>
        </div>

        {dimensions?.map((d) => (
          <CompareBar
            key={d.key}
            label={d.label}
            leftScore={d.leftScore}
            rightScore={d.rightScore}
            leftLabel={d.left}
            rightLabel={d.right}
            insight={d.insight}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={saveComparison}
        style={{
          marginTop: 16,
          padding: '10px 18px',
          background: saved ? '#2A3520' : '#4A4020',
          border: `1px solid ${ACCENT}66`,
          borderRadius: 6,
          color: '#E8E8EC',
          fontSize: 13,
          cursor: 'pointer',
        }}
      >
        {saved ? 'Comparison saved ✓' : 'Save comparison as artifact'}
      </button>
    </div>
  );
}
