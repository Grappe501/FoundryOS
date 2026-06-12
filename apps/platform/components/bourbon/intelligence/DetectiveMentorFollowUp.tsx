'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getDetectiveMentorFollowUp } from '../../../lib/bourbon-level-1/intelligence/detective-mentor';
import { getDetectiveSolved, markDetectiveSolved } from '../../../lib/bourbon-level-1/storage';

const ACCENT = '#C8A96E';

export function DetectiveMentorFollowUp({ caseSlug }: { caseSlug: string }) {
  const followUp = getDetectiveMentorFollowUp(caseSlug);
  const [show, setShow] = useState(false);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    const wasSolved = getDetectiveSolved().includes(caseSlug);
    setSolved(wasSolved);
    if (wasSolved) setShow(true);
  }, [caseSlug]);

  if (!followUp) return null;

  function closeCase() {
    markDetectiveSolved(caseSlug);
    setSolved(true);
    setShow(true);
  }

  return (
    <>
      {!solved && (
        <button
          type="button"
          onClick={closeCase}
          style={{ marginTop: 16, padding: '10px 16px', borderRadius: 8, border: `1px solid ${ACCENT}`, background: 'transparent', color: ACCENT, cursor: 'pointer', fontSize: 13 }}
        >
          Close case — hear from your mentor
        </button>
      )}
      {(show || solved) && (
        <article style={{ marginTop: 24, padding: 24, background: 'linear-gradient(135deg, #0F0F12 0%, #1A1814 100%)', borderRadius: 12, border: `1px solid ${ACCENT}` }}>
          <p style={{ color: ACCENT, fontSize: 11, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Case closed · Mentor responds</p>
          <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 12, lineHeight: 1.55 }}>{followUp.mentorLine}</p>
          <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 16 }}>{followUp.becauseYouSolved}</p>
          <ul style={{ marginTop: 12, paddingLeft: 0, listStyle: 'none' }}>
            {followUp.recommendations.map((r) => (
              <li key={r.href} style={{ marginTop: 10 }}>
                <Link href={r.href} style={{ color: ACCENT, fontSize: 15, textDecoration: 'none' }}>{r.label} →</Link>
                <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>{r.why}</p>
              </li>
            ))}
          </ul>
        </article>
      )}
    </>
  );
}
