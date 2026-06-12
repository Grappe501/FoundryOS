import Link from 'next/link';
import type { WorldMission } from './WorldMissionRunner';
import { FOUNDRY_MISSION_TRACKS_SUBTITLE } from '../../lib/voice-loop';

type TrackGroup = { track: string; trackLabel: string; missions: WorldMission[] };

function groupByTrack(missions: (WorldMission & { track?: string; trackLabel?: string })[]): TrackGroup[] {
  const map = new Map<string, TrackGroup>();
  for (const m of missions) {
    const track = m.track ?? 'missions';
    const trackLabel = m.trackLabel ?? 'Missions';
    if (!map.has(track)) map.set(track, { track, trackLabel, missions: [] });
    map.get(track)!.missions.push(m);
  }
  return Array.from(map.values());
}

export function WorldMissionTracks({
  missions,
  basePath,
  accent = 'var(--foundry-success)',
  subtitle,
}: {
  missions: (WorldMission & { track?: string; trackLabel?: string })[];
  basePath: string;
  accent?: string;
  subtitle?: string;
}) {
  const groups = groupByTrack(missions);
  const totalHours = missions.length * 1.5;

  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Missions</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
        {subtitle ?? FOUNDRY_MISSION_TRACKS_SUBTITLE}
      </p>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>
        {missions.length} missions · ~{Math.round(totalHours)}+ hours of immersion · 30+ days of engagement
      </p>

      {groups.map((group) => (
        <div key={group.track} style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 14, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
            {group.trackLabel}
          </h2>
          <div style={{ marginTop: 16 }}>
            {group.missions.map((m) => (
              <Link
                key={m.slug}
                href={`${basePath}/missions/${m.slug}`}
                style={{
                  display: 'block',
                  padding: 20,
                  marginBottom: 10,
                  background: m.number === 1 ? 'var(--foundry-surface)' : 'var(--foundry-surface-raised)',
                  border: m.number === 1 ? `1px solid ${accent}44` : '1px solid var(--foundry-border-subtle)',
                  borderRadius: 8,
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <p style={{ color: accent, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                  Mission {m.number}
                </p>
                <h3 style={{ fontSize: 17, fontWeight: 400, marginTop: 8, color: 'var(--foundry-text)' }}>{m.title}</h3>
                <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 6 }}>{m.subtitle}</p>
                <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 10 }}>{m.timeEstimate}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
