# Company Foundry — Operating Environment

**Status:** Phase 0.5 NEW. Design only. The workshop becomes the place they work — not a marketing site with a hidden LMS.

**Door:** `/workshop`  
**Rule:** Do not tell them they entered an internship funnel. Let them discover they walked into something larger.

---

## The experiential thesis

Do not teach the academy as a conventional course.

The website itself should **progressively transform into their development environment.**

```txt
unusual puzzle
  → they make something
  → "now we show you how we make things here"
  → setup mission (tools)
  → clone a training repository
  → branching
  → a build that is broken on purpose
  → inspect a database before touching code
  → they encounter another participant
  → the cohort exists
```

Later, GitHub activity feeds the same room: assigned project, branch, PR, review, revision, completed contribution, mentor feedback, artifacts.

Instead of a résumé, they accumulate a **living body of demonstrated work**.

Phase 0 already pointed here: append-only evidence, anonymous visitor → remembered builder → cohort → real work → leadership → ownership conversation. Phase 0.5 makes the room the operating system of that path.

---

## How the room grows (do not implement in Phase 1)

Phase 1 may only be dark / cinematic. It must **leave structural room** for later panes. Do not hard-code a one-sitting ending that cannot grow a bench, a repo strip, or another person.

| Moment | What the room may add | Still hidden |
|---|---|---|
| Door → linger | Dark workshop. Unfinished object. Tape starts. | Method, tools, company, people |
| After MAKE | A second surface: the thing they made stays. Method turn. | GitHub, cohort, pay |
| After setup / clone | A repo fact on the bench (training repo name, branch). | Production, Oscar |
| After broken build | The log is an object they can notice. | That this is “DevOps class” |
| After inspect-data | Schema / table list as a region they can ignore | Live customer data (never) |
| After they meet someone | Another bench. Shared object. | Seat count, Nov 15, hiring |
| After GitHub loop | PR / review / revision as first-class objects | Equity, partner track |
| After human gates | Real Foundry product bounds | Anything unpaid-as-if-employed |

The room changes because of **facts** (`FUTURE_SURFACES.md`). Never XP. Never KEY 02. Never “coding level unlocked.”

---

## Training repo vs Foundry products

| Surface | Who touches it | When |
|---|---|---|
| Isolated **training** repository | Remembered participants on missions | Stages 6–9 (sandbox) |
| Cohort sandbox repos | Invited members | After they have met another person |
| Actual Foundry products | Human-gated BUILD | Stage 12+ |
| Live campaign / production FoundryOS | **Never** as a classroom | Not a mission. Not a broken-build toy. |

Broken builds, bad schemas, and “delete the draft” objects are **fictional or training-only**. They are not production incidents.

---

## GitHub as a feedback loop (not a login wall)

GitHub is how cohorts collaborate without destroying each other’s work. It is not the public door.

**Do not** require a GitHub account to ENTER the workshop.

Attach GitHub only after Remember Me + method turn, when a mission cannot continue without a repo.

### Facts the Foundry may store (when they connect or paste a link)

- assigned project id
- repository (training or sandbox)
- branch name
- issue / PR numbers
- review received (text, author, at)
- revision submitted
- contribution marked complete (human or obvious merge fact)
- mentor feedback (human-authored)

### Facts the Foundry must not store

- access tokens in the session or tape
- private key material
- other people’s private repos they were not assigned
- a “commit velocity score”
- “strong GitHub profile” inference from scraped history

A living body of work is **the objects they made here**, plus attached PRs they chose to bind. It is not a scrape of their old GitHub to rank them.

---

## Living body of demonstrated work

Over time the person record can show, in order:

1. Thinking tape from the door (NOTICE, MESS, clocks)
2. First artifact (MAKE track)
3. Return / respond / deliver calls
4. Setup and training-repo missions
5. PRs, reviews, revisions
6. Collaboration with a real other person
7. Mentored work / multiply
8. Human-gated supervised product work
9. Paid / legal records only after those gates

This replaces the résumé as the thing staff open. It does not produce an employability score.

Staff may still ask for a résumé later in a human conversation. The door never does.

---

## Environment reports (facts, not spyware)

Setup missions may ask the **participant** to confirm:

- Cursor is installed
- they opened the training repo
- `npm` / the dev server ran
- the failing test or log line they found

Optional later: a local helper they run that prints a **redacted** ready-check (node version, repo name, branch — never `.env` contents).

Forbidden: keyloggers, clipboard capture, webcam, silent filesystem scans, hidden agents on their machine.

If we cannot see a fact without becoming surveillance, we do not collect it. They type or paste the fact.

---

## Production and secret doctrine (academy copy of company law)

- `.env` never committed. Keys never in the tape.
- Training data is fictional or staff-provided sandbox. No real PII as a lesson.
- Least privilege on any org they join.
- Migrations and production deploys are human-gated. Classroom missions do not run against live Netlify / live Supabase of FoundryOS.
- Rollback thinking is taught on the training repo first.
- Campaign QR and RedDirt remain out of bounds.

---

## What Phase 1 must leave open

When Ernie later builds the door:

- `stateId` linger is the **end of visit one**, not the end of the product.
- Session envelope already has spine + artifact + remember + collaborate/respond/deliver. Later missions add work objects to that envelope — they do not get a second session type.
- Visual shell should be able to grow a pane. Do not paint a finished “thanks for playing” wall.
- No course nav. No “Module 1 of 13.”

---

## Command center (later)

Phase 6 still holds: funnel + open artifact + thinking strip + human decisions.

Phase 0.5 adds: **open PR / mission / schema inspection** on the same workbench. If a reviewer can rank without opening the work, the UI has failed.
