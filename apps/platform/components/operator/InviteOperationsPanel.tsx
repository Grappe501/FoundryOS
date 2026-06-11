'use client';

import { useCallback, useMemo, useState } from 'react';
import { buildInviteMessage, FIRST_25_TESTER_PLAN, STARTING_WORLDS } from '../../lib/beta-tester-plan';
import type { BetaInviteEntry } from '@foundry/db';

const SEGMENTS = [
  { value: 'student', label: 'Student' },
  { value: 'parent', label: 'Parent' },
  { value: 'adult_learner', label: 'Adult learner' },
  { value: 'educator', label: 'Educator' },
  { value: 'hobbyist', label: 'Hobbyist' },
] as const;

type Props = {
  initialRows: BetaInviteEntry[];
  stats: {
    pending: number;
    invited: number;
    joined: number;
    active: number;
    by_cohort: Record<string, { invited: number; joined: number; active: number; target: number }>;
  };
};

const STATUS_COLOR: Record<string, string> = {
  pending: '#8A8A8E',
  approved: '#6B9B6B',
  invited: '#C8A96E',
  joined: '#6B9BC9',
  active: '#6BC96B',
  declined: '#C96B6B',
};

export function InviteOperationsPanel({ initialRows, stats }: Props) {
  const [rows, setRows] = useState(initialRows);
  const [filter, setFilter] = useState<'all' | 'pending' | 'invited' | 'joined' | 'active'>('all');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return rows;
    return rows.filter((r) => r.status === filter);
  }, [rows, filter]);

  const refreshRow = useCallback((entry: BetaInviteEntry) => {
    setRows((prev) => prev.map((r) => (r.id === entry.id ? entry : r)));
  }, []);

  async function handleApprove(row: BetaInviteEntry, form: FormData) {
    setBusyId(row.id);
    setError(null);

    const assigned_segment = String(form.get('assigned_segment') || row.segment);
    const starting_world_slug = String(form.get('starting_world_slug') || row.interested_worlds?.[0] || 'ai-builder');
    const operator_notes = String(form.get('operator_notes') || '');

    const res = await fetch('/api/operator/invites/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: row.id,
        assigned_segment,
        starting_world_slug,
        operator_notes: operator_notes || undefined,
      }),
    });

    const data = await res.json();
    setBusyId(null);

    if (!res.ok) {
      setError(data.error ?? 'Approve failed');
      return;
    }

    refreshRow(data.entry);
  }

  async function handleDecline(id: string) {
    setBusyId(id);
    setError(null);

    const res = await fetch('/api/operator/invites/decline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    setBusyId(null);

    if (!res.ok) {
      setError(data.error ?? 'Decline failed');
      return;
    }

    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'declined' } : r)));
  }

  async function copyInvite(row: BetaInviteEntry) {
    if (!row.invite_code || !row.starting_world_slug) return;

    const message = buildInviteMessage({
      email: row.email,
      inviteCode: row.invite_code,
      startingWorldSlug: row.starting_world_slug,
      segment: row.assigned_segment ?? row.segment,
    });

    await navigator.clipboard.writeText(message);
    setCopiedId(row.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div>
      <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 12 }}>
        <Stat label="Pending" value={stats.pending} />
        <Stat label="Invited" value={stats.invited} />
        <Stat label="Joined" value={stats.joined} />
        <Stat label="Active" value={stats.active} />
      </div>

      <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E' }}>
        <h2 style={{ fontSize: 13, color: '#C8A96E', margin: '0 0 12px' }}>First 25 tester plan</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
          {FIRST_25_TESTER_PLAN.map((plan) => {
            const cohort = stats.by_cohort[plan.cohort] ?? { invited: 0, joined: 0, active: 0, target: plan.count };
            return (
              <div key={plan.cohort} style={{ padding: 12, background: '#111114', borderRadius: 6, fontSize: 12 }}>
                <div style={{ color: '#E8E8EC' }}>{plan.label}</div>
                <div style={{ color: '#6B6B70', marginTop: 6 }}>
                  {cohort.active}/{plan.count} active · {cohort.joined} joined · {cohort.invited} invited
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['all', 'pending', 'invited', 'joined', 'active'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 12px',
              fontSize: 12,
              borderRadius: 6,
              border: `1px solid ${filter === f ? '#2A4A2A' : '#1A1A1E'}`,
              background: filter === f ? '#1A2A1A' : '#111114',
              color: filter === f ? '#6B9B6B' : '#8A8A8E',
              cursor: 'pointer',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {error && <p style={{ color: '#C96B6B', fontSize: 13, marginTop: 16 }}>{error}</p>}

      <div style={{ marginTop: 16 }}>
        {filtered.map((row) => (
          <WaitlistRow
            key={row.id}
            row={row}
            busy={busyId === row.id}
            copied={copiedId === row.id}
            onApprove={handleApprove}
            onDecline={handleDecline}
            onCopy={copyInvite}
          />
        ))}
        {filtered.length === 0 && (
          <p style={{ color: '#6B6B70', fontSize: 13, padding: 24, textAlign: 'center' }}>No entries for this filter.</p>
        )}
      </div>
    </div>
  );
}

function WaitlistRow({
  row,
  busy,
  copied,
  onApprove,
  onDecline,
  onCopy,
}: {
  row: BetaInviteEntry;
  busy: boolean;
  copied: boolean;
  onApprove: (row: BetaInviteEntry, form: FormData) => void;
  onDecline: (id: string) => void;
  onCopy: (row: BetaInviteEntry) => void;
}) {
  const defaultWorld = row.starting_world_slug ?? row.interested_worlds?.[0] ?? 'ai-builder';
  const canInvite = !['declined', 'active'].includes(row.status);

  return (
    <article style={{ marginBottom: 12, padding: 16, background: '#111114', borderRadius: 8, border: '1px solid #1A1A1E' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, alignItems: 'flex-start' }}>
        <div>
          <span style={{ color: '#E8E8EC', fontSize: 14 }}>{row.email}</span>
          <span style={{ color: STATUS_COLOR[row.status] ?? '#8A8A8E', marginLeft: 10, fontSize: 11, textTransform: 'uppercase' }}>
            {row.status}
          </span>
        </div>
        <span style={{ color: '#6B6B70', fontSize: 11 }}>{new Date(row.created_at).toLocaleDateString()}</span>
      </div>

      <p style={{ color: '#8A8A8E', fontSize: 12, margin: '8px 0 0' }}>
        Applied: {row.segment.replace(/_/g, ' ')} · Interest: {(row.interested_worlds ?? []).join(', ') || '—'}
      </p>

      {row.invite_code && (
        <p style={{ color: '#C8A96E', fontSize: 12, margin: '8px 0 0' }}>
          Code: {row.invite_code}
          {row.starting_world_slug && ` · World: ${row.starting_world_slug}`}
          {row.invited_at && ` · Invited ${new Date(row.invited_at).toLocaleDateString()}`}
          {row.joined_at && ` · Joined ${new Date(row.joined_at).toLocaleDateString()}`}
          {row.active_at && ` · Active ${new Date(row.active_at).toLocaleDateString()}`}
        </p>
      )}

      {canInvite && row.status === 'pending' && (
        <form
          style={{ marginTop: 12, display: 'grid', gap: 10 }}
          onSubmit={(e) => {
            e.preventDefault();
            onApprove(row, new FormData(e.currentTarget));
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <label style={{ fontSize: 12, color: '#8A8A8E' }}>
              Assign segment
              <select
                name="assigned_segment"
                defaultValue={row.segment}
                style={fieldStyle}
              >
                {SEGMENTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>
            <label style={{ fontSize: 12, color: '#8A8A8E' }}>
              Starting world
              <select name="starting_world_slug" defaultValue={defaultWorld} style={fieldStyle}>
                {STARTING_WORLDS.map((w) => (
                  <option key={w.slug} value={w.slug}>{w.label}</option>
                ))}
              </select>
            </label>
          </div>
          <label style={{ fontSize: 12, color: '#8A8A8E' }}>
            Operator notes
            <input name="operator_notes" placeholder="Optional" style={fieldStyle} />
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button type="submit" disabled={busy} style={approveBtn}>
              {busy ? 'Approving…' : 'Approve & invite'}
            </button>
            <button type="button" disabled={busy} onClick={() => onDecline(row.id)} style={declineBtn}>
              Decline
            </button>
          </div>
        </form>
      )}

      {row.invite_code && ['invited', 'joined', 'active', 'approved'].includes(row.status) && (
        <button type="button" onClick={() => onCopy(row)} style={{ ...approveBtn, marginTop: 12 }}>
          {copied ? 'Copied!' : 'Copy invite message'}
        </button>
      )}
    </article>
  );
}

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  marginTop: 6,
  background: '#0F0F12',
  border: '1px solid #1A1A1E',
  borderRadius: 6,
  color: '#E8E8EC',
  fontSize: 13,
};

const approveBtn: React.CSSProperties = {
  padding: '8px 16px',
  background: '#2A4A2A',
  border: 'none',
  borderRadius: 6,
  color: '#E8E8EC',
  fontSize: 12,
  cursor: 'pointer',
};

const declineBtn: React.CSSProperties = {
  padding: '8px 16px',
  background: 'transparent',
  border: '1px solid #3A2A2A',
  borderRadius: 6,
  color: '#C96B6B',
  fontSize: 12,
  cursor: 'pointer',
};

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ padding: 14, background: '#111114', borderRadius: 8 }}>
      <div style={{ fontSize: 22, fontWeight: 300, color: '#C8A96E' }}>{value}</div>
      <div style={{ fontSize: 11, color: '#6B6B70', marginTop: 4 }}>{label}</div>
    </div>
  );
}
