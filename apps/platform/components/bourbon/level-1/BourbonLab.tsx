'use client';

import { useMemo, useState } from 'react';

const ACCENT = 'var(--foundry-primary)';

const CHAR_LEVELS = [
  { level: 1, label: 'Char #1', caramel: 20, vanilla: 15, smoke: 5, oak: 10, tannin: 5 },
  { level: 2, label: 'Char #2', caramel: 40, vanilla: 30, smoke: 10, oak: 20, tannin: 10 },
  { level: 3, label: 'Char #3', caramel: 70, vanilla: 55, smoke: 25, oak: 45, tannin: 25 },
  { level: 4, label: 'Char #4', caramel: 90, vanilla: 70, smoke: 40, oak: 65, tannin: 45 },
];

const AGES = [
  { years: 4, label: '4 years', sweetness: 60, oak: 30, tannin: 15, note: 'Young and energetic — corn sweetness still loud.' },
  { years: 6, label: '6 years', sweetness: 55, oak: 45, tannin: 25, note: 'Sweet spot for many shelf staples — balance emerging.' },
  { years: 8, label: '8 years', sweetness: 45, oak: 60, tannin: 35, note: 'Oak structure clear; spice and depth building.' },
  { years: 10, label: '10 years', sweetness: 35, oak: 75, tannin: 50, note: 'Leather, dried fruit — age showing elegantly.' },
  { years: 15, label: '15 years', sweetness: 25, oak: 85, tannin: 70, note: 'Risk zone — can be magnificent or over-oaked.' },
];

const PROOFS = [
  { proof: 80, heat: 15, flavor: 50, mouthfeel: 40, note: 'Gentle — flavors muted, easy sipping.' },
  { proof: 90, heat: 35, flavor: 70, mouthfeel: 55, note: 'Classic bourbon proof — balance of flavor and burn.' },
  { proof: 100, heat: 55, flavor: 85, mouthfeel: 65, note: 'BiB territory — flavor intensity jumps.' },
  { proof: 110, heat: 75, flavor: 90, mouthfeel: 70, note: 'Barrel proof entry — water recommended for tasting.' },
  { proof: 120, heat: 90, flavor: 95, mouthfeel: 75, note: 'Intense — heat can mask nuance until diluted.' },
  { proof: 140, heat: 100, flavor: 80, mouthfeel: 60, note: 'White dog territory — not bottled bourbon, but educational extreme.' },
];

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--foundry-text-muted)', marginBottom: 4 }}>
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div style={{ height: 8, background: 'var(--foundry-border-subtle)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 4, transition: 'width 0.3s' }} />
      </div>
    </div>
  );
}

export function BourbonLab() {
  const [char, setChar] = useState(3);
  const [age, setAge] = useState(2);
  const [proof, setProof] = useState(2);

  const charData = CHAR_LEVELS[char - 1];
  const ageData = AGES[age];
  const proofData = PROOFS[proof];

  const barrelColor = useMemo(() => {
    const t = char / 4;
    const r = Math.round(80 + t * 100);
    const g = Math.round(50 + t * 40);
    return `rgb(${r},${g},30)`;
  }, [char]);

  return (
    <div>
      <SimulatorBlock title="Barrel Char Simulator" subtitle="Drag char level — see flavor compound extraction (educational, not lab-exact)">
        <input type="range" min={1} max={4} value={char} onChange={(e) => setChar(Number(e.target.value))} style={{ width: '100%', accentColor: ACCENT }} />
        <p style={{ color: ACCENT, fontSize: 14, marginTop: 8 }}>{charData.label} — most bourbon uses #3 or #4</p>
        <div style={{ marginTop: 16, height: 80, background: `linear-gradient(180deg, ${barrelColor} 0%, #3A2810 100%)`, borderRadius: 8, border: '2px solid #2A2010' }} aria-hidden />
        <div style={{ marginTop: 20 }}>
          <Bar label="Caramel" value={charData.caramel} color="var(--foundry-primary)" />
          <Bar label="Vanilla" value={charData.vanilla} color="#E8D4A0" />
          <Bar label="Smoke" value={charData.smoke} color="var(--foundry-text-faint)" />
          <Bar label="Oak" value={charData.oak} color="#8B6914" />
          <Bar label="Tannin" value={charData.tannin} color="#4A3020" />
        </div>
      </SimulatorBlock>

      <SimulatorBlock title="Age Simulator" subtitle="Time in the barrel — benefits and risks">
        <input type="range" min={0} max={4} value={age} onChange={(e) => setAge(Number(e.target.value))} style={{ width: '100%', accentColor: ACCENT }} />
        <p style={{ color: ACCENT, fontSize: 14, marginTop: 8 }}>{ageData.label}</p>
        <div style={{ display: 'flex', gap: 4, marginTop: 16 }}>
          {AGES.map((a, i) => (
            <div key={a.years} style={{ flex: 1, height: 40, background: i <= age ? ACCENT : 'var(--foundry-border-subtle)', borderRadius: 4, opacity: i <= age ? 0.4 + i * 0.15 : 0.3 }} title={a.label} />
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <Bar label="Sweetness" value={ageData.sweetness} color="var(--foundry-primary)" />
          <Bar label="Oak influence" value={ageData.oak} color="#8B6914" />
          <Bar label="Tannin / dry" value={ageData.tannin} color="#4A3020" />
        </div>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12, lineHeight: 1.6 }}>{ageData.note}</p>
      </SimulatorBlock>

      <SimulatorBlock title="Proof Simulator" subtitle="What heat and intensity should you expect?">
        <input type="range" min={0} max={5} value={proof} onChange={(e) => setProof(Number(e.target.value))} style={{ width: '100%', accentColor: ACCENT }} />
        <p style={{ color: ACCENT, fontSize: 14, marginTop: 8 }}>{proofData.proof} proof</p>
        <Bar label="Heat / burn" value={proofData.heat} color="#B44" />
        <Bar label="Flavor intensity" value={proofData.flavor} color={ACCENT} />
        <Bar label="Mouthfeel / body" value={proofData.mouthfeel} color="#6B9BC9" />
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12, lineHeight: 1.6 }}>{proofData.note}</p>
      </SimulatorBlock>
    </div>
  );
}

function SimulatorBlock({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <article style={{ marginTop: 28, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 12, border: '1px solid var(--foundry-border-subtle)' }}>
      <h2 style={{ fontSize: 18, fontWeight: 400, margin: 0, color: 'var(--foundry-text)' }}>{title}</h2>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginTop: 6 }}>{subtitle}</p>
      <div style={{ marginTop: 20 }}>{children}</div>
    </article>
  );
}
