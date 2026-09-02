# Company Foundry — Academy Curriculum (as missions)

**Status:** Phase 0.5 NEW. Not a course catalog. Not Phase 1 UI.  
**Rule:** Do not teach this as a conventional school. A mission is unfinished work with a definition of done. Completing it is evidence. Completing it is not a grade, a badge wall, or a hire.

A new cohort should **eventually** learn what follows. They do not see this list. They meet one mission at a time after they have already made something.

---

## The method they are joining

```txt
problem → research → architecture → master build plan
  → slices → implementation → validation → documentation → handoff
```

That is the Foundry method. It is how Burt and Ernie already work. It is what the academy teaches by making them do it, not by lecturing it.

They should also learn the operating rhythm: build maps, progress ledgers, Cursor return reports, Ernie review, gates, documentation, Git commits after meaningful slices, preserving institutional knowledge.

---

## When curriculum may begin

| Too early | Right |
|---|---|
| At the door | After they have **made** something (Stage 4) |
| As a syllabus page | As the next object on the bench |
| “Week 1: install Git” | A mission that cannot continue until the tool exists |
| Live FoundryOS / campaign prod | Isolated training repo, then sandbox, then human-gated real work |

The turn copy (canonical unless Ernie edits):

```txt
You made something.

Now we're going to show you how we make things here.
```

No company pitch. No “welcome to the academy.” No November date.

---

## Mission families

Each family is a **set of missions**, not a module with a quiz. A mission has: a bench object, a definition of done, a thinking-tape surface, and a work tier (`simulated` / `sandbox` / `supervised`).

Forbidden on every mission: live production experimentation, committed secrets, PII as training data, AI hire/score, “you passed Git.”

### 1. The Foundry method

They run the loop on a small object: name the problem, research, write a thin architecture, a master build plan, one slice, implement, validate, document, hand off.

**Done when:** another person could continue from the handoff without asking them what they meant.

### 2. Burt + Ernie + Oscar

See `AI_PARTNERS.md`. Early missions use Cursor as hands and ChatGPT as reasoning. Oscar is not introduced until later.

**Done when:** they can write a handoff the other partner can use, and they can say when AI must not decide.

### 3. Local development

Filesystem, terminal, clone, branches / worktrees, `.env`, npm, dev servers, localhost, builds, logs, debugging.

**First setup mission:** the tools exist on their machine. The workshop can see a *fact* that the environment reported ready — not a vibe that they “seem technical.”

**Done when:** they can start the training app locally and read a log without asking the room to do it for them.

### 4. GitHub

Account, SSH / auth, organizations, repositories, issues, branches, commits, PRs, reviews, merge discipline. How a cohort shares a repo without destroying each other’s work.

**Done when:** they open a PR on the training repo that another person can review. Merge is a human/mentor rule, not a green checkbox from the Foundry.

### 5. Cursor

Install, paid account, open the **correct** repository, terminal, context, rules / instructions, read before write, large-pass / slice instead of uncontrolled prompting.

**Done when:** a slice lands that matches the plan, and the tape shows they read before they wrote.

### 6. ChatGPT

Paid account, project reasoning, research, architecture, critique, handoffs. AI as collaborator, not a code vending machine.

**Done when:** they produce a plan or critique that Burt can implement without inventing the problem.

### 7. OpenAI API

Account / project / key, environment variables, never committing keys, usage / cost awareness, model calls, structured outputs. ChatGPT ≠ API.

**Done when:** a key lives only in `.env`, a call returns structured output, and they can say what it cost. No key ever enters the thinking tape or a commit.

### 8. Databases

Postgres: schemas, tables, relationships, IDs, constraints, migrations, indexes, RLS / security. Dev vs production data. Supabase / Neon patterns. **Design the data model before building UI around it.**

**Inspect-before-code mission:** they are given a database (or a schema) and asked what is true before they touch a component.

**Done when:** they can name what belongs in the database vs the UI, and they do not invent a table to decorate a screen.

### 9. Software architecture

Frontend / backend / API / database / auth / storage / deployment. Where a change belongs before they make it.

**Done when:** they can point to the layer they will change and the layer they will leave alone.

### 10. Product engineering

Why → How → What. Journey, requirements, acceptance criteria, edge cases, accessibility, responsive / mobile-first, experience design.

**Done when:** the slice has acceptance criteria and they tested the edge they named.

### 11. AI engineering discipline

Context boundaries, hallucination detection, source-of-truth documents, testing AI output, human decision gates, knowing when AI must **not** decide.

**Done when:** they refuse at least one AI suggestion with a cited source of truth — or they show the test that would have caught it.

### 12. Production discipline

Secrets, PII, least privilege, sandbox vs production, migrations, CI, Netlify / deployment, rollback thinking. **Never experiment against live systems.**

**Broken-build mission:** they receive a build that fails on purpose. They read logs. They do not “just prompt until it starts.”

**Done when:** they can say what they would not deploy, and why.

### 13. The Foundry operating system

Build maps, progress ledgers, Cursor return reports, Ernie review, gates, documentation, commits after meaningful slices, institutional knowledge.

**Done when:** the next person (or the next day’s Burt) can resume from what they left.

---

## Suggested first sequence (after MAKE)

Do not ship all of this in Phase 2. This is the **order they should meet the world**, not a sprint plan.

1. Method turn — *you made something; here is how we make things.*
2. Setup — tools exist (Cursor, terminal, Git, Node).
3. Clone the **training** repository.
4. Branch without breaking `main`.
5. Broken build — read the log.
6. Inspect a database / schema before touching UI.
7. First PR + human review (staff or fictional reviewer, then a real person).
8. **They encounter another participant.** That is when the cohort begins to exist.

Until step 8, COLLABORATE may stay fictional (Rafi). After step 8, fictional partners are training wheels, not the product.

---

## Mapping to the spine

| Mission family | Earliest stage | Work tier default |
|---|---|---|
| Method turn + local setup | 4–5 | simulated |
| Clone / branch / broken build | 6–7 | sandbox (training repo) |
| Inspect data / architecture / product | 6–9 | sandbox |
| GitHub org + real other person | 7+ | sandbox → supervised (human) |
| API keys / production discipline | 7–12 | sandbox only until a human gate |
| Supervised Foundry product work | 12 | supervised (human) |
| Paid / ownership | 13–14 | legal gates |

A mission that needs a production secret or a live database is **out of order** until Stage 12 + gate.

---

## What the tape records (facts only)

Allowed: mission id, definition of done, started / finished / abandoned, repo / branch / PR identifiers they chose to attach, review received, revision submitted, whether they inspected the named region (schema, log, failing test).

Forbidden: “Git skill score,” “seniority,” “fast learner,” “not technical enough,” key material, production URLs as trophies, cohort seat implied by mission completion.

---

## What this is not

- Not Coursera with a Foundry skin
- Not a bootcamp funnel
- Not unpaid labor on live products
- Not a certificate
- Not an automatic internship
- Not a reason to put November 15 on the public bench
