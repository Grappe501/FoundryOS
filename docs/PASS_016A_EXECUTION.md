# PASS-016A — Market Validation

> Not architecture. Not code velocity. **Validation.**

---

## Risk Shift

| Before PASS-015 | After PASS-016 |
|-----------------|----------------|
| Risk = Architecture Failure | Risk = Building Things Nobody Uses |

---

## Rule

**Do not start PASS-017** until PASS-016A answers:

```txt
Can a stranger arrive, understand, start, and return — without explanation?
```

If not, PASS-017/018/019 multiply the problem.

---

## Validation Dashboard

**URL:** `/validation`

### Acquisition

- Visitors
- Source
- Landing Page

### Activation

- Assessment Started
- Assessment Completed
- Path Started
- Project Started

### Retention

- Returned Tomorrow
- Returned This Week

### Conversion (wired, awaiting product)

- Created Account
- Started Trial
- Paid

---

## First Real User Goal

Not 100 users.

```txt
10 strangers
```

Learn from 10 strangers before building 10 more domains.

---

## Student Pilot (Manual)

| Group | Grades |
|-------|--------|
| A | Middle School 6–8 |
| B | High School 9–12 |

Ask: *"What do you want to become?"*

Observe natural choices vs. assumed Trinity paths.

---

## Marketing Asset

Primary entry point: **Future-Proof Assessment** (`/future-proof`)

Not AI Builder alone. People search:

```txt
How do I stay relevant?
How do I get ahead?
How do I prepare my kids?
```

---

## PASS-016 Exit Criteria (Revised)

~~AI Builder Active Domain~~

**New close:**

```txt
At least one complete stranger starts a transformation and returns.
```

Proves: Discovery · Activation · Retention

---

## Sequence

1. ✅ Commit + deploy PASS-016
2. ✅ Build PASS-016A validation layer
3. Put 10 strangers through `/future-proof`
4. Study `/validation` behavior
5. **Then** start PASS-017

---

## Technical

- Table: `validation_events`
- API: `POST /api/validation/event`
- Migration: `20260625000000_validation_pass016a.sql`
- Anonymous `visitor_id` in localStorage
