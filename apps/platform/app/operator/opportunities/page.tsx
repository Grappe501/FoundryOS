import Link from 'next/link';

import { getGrowthFlywheelSnapshot, isSupabaseConfigured } from '@foundry/db';

import { FLYWHEEL_STRATEGIC_LOCK } from '../../../lib/growth-flywheel-ui';

import {

  ACQUISITION_AVENUE_LABELS,

  listIncomingWorldsByRank,

  type AcquisitionAvenue,

} from '../../../lib/incoming-worlds';



export const dynamic = 'force-dynamic';



function formatAvenues(avenues: AcquisitionAvenue[]): string {

  return avenues.map((a) => ACQUISITION_AVENUE_LABELS[a]).join(' · ');

}



export default async function OperatorOpportunitiesPage() {

  const flywheel = isSupabaseConfigured() ? await getGrowthFlywheelSnapshot() : null;

  const domains = flywheel?.domain_expansion ?? [];

  const incoming = listIncomingWorldsByRank();



  return (

    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 1040, margin: '0 auto' }}>

      <Link href="/operator" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>

      <Link href="/operator/flywheel" style={{ color: '#8B4545', fontSize: 13, marginLeft: 16 }}>Flywheel</Link>

      <Link href="/growth/opportunities" style={{ color: '#6B6B70', fontSize: 13, marginLeft: 16 }}>Traffic registry</Link>



      <p style={{ color: '#8B4545', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>PASS-032 · System 4</p>

      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>Incoming Worlds & Acquisition</h1>

      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>

        Ranked pipeline for paths Steve is considering — not a build queue. Add worlds here, rank by acquisition potential, then prove channels before depth.

      </p>



      <section style={{ marginTop: 20, padding: 16, background: '#1A1410', border: '1px solid #3A2020', borderRadius: 8 }}>

        <p style={{ color: '#C8A96E', fontSize: 13, margin: 0, fontWeight: 500 }}>{FLYWHEEL_STRATEGIC_LOCK.focus}</p>

        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>

          {FLYWHEEL_STRATEGIC_LOCK.detail}

        </p>

      </section>



      <section style={{ marginTop: 28 }}>

        <h2 style={{ fontSize: 14, color: '#6B9BC9', margin: 0 }}>Incoming worlds (ranked)</h2>

        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>

          Source: <code style={{ color: '#8A8A8E' }}>apps/platform/lib/incoming-worlds.ts</code> · Chess is rank #9 — prototype only.

        </p>

        <div style={{ overflowX: 'auto', marginTop: 16 }}>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>

            <thead>

              <tr style={{ color: '#6B6B70', textAlign: 'left', borderBottom: '1px solid #1A1A1E' }}>

                <th style={{ padding: 10 }}>#</th>

                <th style={{ padding: 10 }}>World</th>

                <th style={{ padding: 10 }}>Status</th>

                <th style={{ padding: 10 }}>Score</th>

                <th style={{ padding: 10 }}>Acquisition avenues</th>

                <th style={{ padding: 10 }}>Note</th>

              </tr>

            </thead>

            <tbody>

              {incoming.map((w) => (

                <tr key={w.slug} style={{ borderBottom: '1px solid #1A1A1E' }}>

                  <td style={{ padding: 10, color: '#6B6B70' }}>{w.rank}</td>

                  <td style={{ padding: 10, color: '#E8E8EC' }}>

                    {w.live_href ? (

                      <Link href={w.live_href} style={{ color: '#E8E8EC', textDecoration: 'none' }}>

                        {w.name}

                      </Link>

                    ) : (

                      w.name

                    )}

                    <div style={{ color: '#6B6B70', fontSize: 10, marginTop: 2 }}>

                      {w.frame} · {w.outcome}

                    </div>

                  </td>

                  <td style={{ padding: 10 }}>

                    <span

                      style={{

                        color:

                          w.status === 'live'

                            ? '#6B9B6B'

                            : w.status === 'in_build'

                              ? '#6B9BC9'

                              : w.status === 'queued'

                                ? '#C8A96E'

                                : '#6B6B70',

                      }}

                    >

                      {w.status}

                    </span>

                  </td>

                  <td style={{ padding: 10, color: '#C8A96E' }}>{w.score}</td>

                  <td style={{ padding: 10, color: '#8A8A8E', maxWidth: 200 }}>{formatAvenues(w.acquisition_avenues)}</td>

                  <td style={{ padding: 10, color: '#8A8A8E', fontSize: 11 }}>{w.note}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>



      {!flywheel ? (

        <p style={{ marginTop: 24, color: '#C96B6B' }}>Supabase not configured — flywheel scores unavailable.</p>

      ) : (

        <section style={{ marginTop: 36 }}>

          <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Flywheel domain expansion scores</h2>

          <div style={{ overflowX: 'auto', marginTop: 16 }}>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>

              <thead>

                <tr style={{ color: '#6B6B70', textAlign: 'left', borderBottom: '1px solid #1A1A1E' }}>

                  <th style={{ padding: 10 }}>Domain</th>

                  <th style={{ padding: 10 }}>Status</th>

                  <th style={{ padding: 10 }}>Traffic</th>

                  <th style={{ padding: 10 }}>Conversion</th>

                  <th style={{ padding: 10 }}>Retention</th>

                  <th style={{ padding: 10 }}>Revenue</th>

                  <th style={{ padding: 10 }}>Community</th>

                  <th style={{ padding: 10, color: '#C8A96E' }}>Score</th>

                </tr>

              </thead>

              <tbody>

                {domains.map((d) => (

                  <tr key={d.slug} style={{ borderBottom: '1px solid #1A1A1E' }}>

                    <td style={{ padding: 10, color: '#E8E8EC' }}>

                      {d.display_name}

                      <div style={{ color: '#6B6B70', fontSize: 10, marginTop: 2 }}>{d.recommendation}</div>

                    </td>

                    <td style={{ padding: 10 }}>

                      <span style={{ color: d.status === 'live' ? '#6B9B6B' : '#6B9BC9' }}>{d.status}</span>

                    </td>

                    <td style={{ padding: 10, color: '#8A8A8E' }}>{d.scores.traffic}</td>

                    <td style={{ padding: 10, color: '#8A8A8E' }}>{d.scores.conversion}</td>

                    <td style={{ padding: 10, color: '#8A8A8E' }}>{d.scores.retention}</td>

                    <td style={{ padding: 10, color: '#8A8A8E' }}>{d.scores.revenue}</td>

                    <td style={{ padding: 10, color: '#8A8A8E' }}>{d.scores.community_potential}</td>

                    <td style={{ padding: 10, color: '#C8A96E', fontWeight: 600, fontSize: 15 }}>{d.total_score}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 16 }}>

            Live worlds scored from validation events · Candidates use baseline until flywheel data exists.

          </p>

        </section>

      )}

    </main>

  );

}


