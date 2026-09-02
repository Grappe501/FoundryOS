# Company Foundry — Capability Reveal Engine

**Status:** CANON (Ernie 2026-09-02). Not a 15th spine stage.  
**Lives under:** stages 4–12. Phase 1 does not run it. The door must leave the room able to.

This is the experience logic underneath the academy. It is how we introduce GitHub, Cursor, Ernie, APIs, Postgres, PRs, production discipline, and eventually Oscar **without teaching a course**.

---

## Experience standard

> **The participant should rarely feel like they are being trained. They should feel like they are becoming capable.**

Forbidden mechanics:

- “Complete Module 3”
- Tutorial video then quiz
- Badge for installing Git
- Progress bar measuring course completion
- Certificates
- Traditional bootcamp checklists

The environment presents **problems that naturally require the next capability.**

| Do not | Do |
|---|---|
| Teach Git branching, then test it | Give them something worth changing. A branch becomes necessary. |
| Lecture database architecture, then quiz | Give them a UI problem whose obvious solution is wrong until they inspect the data model. |
| Teach debugging as a lesson | Hand them something that does not work. |
| Explain Oscar | Let the system become larger than any single project. Then they meet it. |

That distinction is what makes this more sophisticated than Campaign Foundry.

---

## The loop

```txt
Need → Friction → Discovery → Tool → Attempt → Evidence → Feedback → Increased Access
```

The participant encounters a **need** before being given the **tool**.

| Capability | Why it appears |
|---|---|
| GitHub | Collaboration requires history. |
| Cursor | The problem has become too large for manual editing. |
| Ernie (ChatGPT) | Architecture requires sustained reasoning. |
| APIs | The product needs intelligence. |
| Postgres | Information needs durable structure. |
| PRs | Another human is now depending on their work. |
| Production discipline | Their actions are beginning to matter. |
| **Oscar** | The system has become larger than any single project. |

Oscar stays hidden until that last condition is true. Do not explain him early.

---

## Method turn (E0.5-3)

After the first artifact, not at the door:

```txt
You made something.

Now we're going to show you how we make things here.
```

This is a **major environmental transition**, not ordinary copy. The interface must visibly change. They have crossed from being **observed** into being **equipped**.

Phase 1 does not reach this sentence. Phase 1 must leave a room that can make that change later — not a puzzle we throw away.

---

## Training repository (E0.5-5)

Isolated. Never live FoundryOS or campaign production.

It must **not feel like a tutorial repo**. It should resemble a real, slightly imperfect young product: history, decisions, technical debt, issues, data, unfinished work.

They graduate later into supervised Foundry product work (Stage 12, human gate).

---

## Relation to the spine

The engine does not add stages. A mission is a work object on an existing stage. Completing a loop writes **evidence**, not a skill score, not Increased Access as XP.

**Increased Access** is a human or mechanical unlock of the next *problem*, never a badge, never a cohort seat, never pay.
