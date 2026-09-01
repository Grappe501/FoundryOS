'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { MemoryPerson } from '../../lib/talent-foundry/people-memory';

export function PeopleDrawer({ people }: { people: MemoryPerson[] }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (!open) triggerRef.current?.focus();
  }, [open]);

  if (!people.length) return null;

  return (
    <div className="tf-people-wrap">
      <button
        ref={triggerRef}
        type="button"
        className="tf-people-tab"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        People · {people.length}
      </button>
      {open ? (
        <div className="tf-people-sheet" role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <div className="tf-people-sheet-inner">
            <div className="tf-people-sheet-bar">
              <h2 id={titleId}>People</h2>
              <button ref={closeRef} type="button" className="tf-btn" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <ul className="tf-people-sheet-list">
              {people.map((person) => (
                <li key={person.id}>
                  <strong>{person.name}</strong>
                  {person.facts.map((fact) => (
                    <span key={fact}>{fact}</span>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
