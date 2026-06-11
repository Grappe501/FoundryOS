# Evidence Engine — PASS-011

The biggest missing registry before Collections + Communities.

## Principle

```txt
Identity → requires → Evidence
```

Without evidence, expertise becomes **self-declared**.

With evidence, expertise becomes **earned**.

Prevents Foundry from becoming another badge system.

## Evidence Tiers

Not for policing people — for strengthening trust.

| Tier | Example |
|------|---------|
| **Claimed** | I gave a speech. |
| **Verified** | Event recorded. |
| **Community Confirmed** | Peers confirmed. |
| **Demonstrated** | Artifact exists. |
| **Mentored** | Others learned from it. |

## Exemplar Profiles

### Public Speaker

- Delivered 5 speeches
- Hosted workshop
- Received peer ratings
- Mentored speaker

### Bourbon Steward

- Completed tastings
- Published reviews
- Hosted events
- Mentored members

### Campaign Strategist

- Managed campaign
- Recruited volunteers
- Built field plan
- Trained organizers

## Table

`evidence_profiles` — exemplar registry (schema)

`evidence_submissions` — PASS-011 live submissions linked to `transformation_loops`

## PASS-011 Verification

`/evidence` — Demo User first speech evidence at **Verified** tier, linked to PASS-010 loop.

Exit: **Evidence Engine: OPERATIONAL** + `Database: persisted ✓`

## Code

`@foundry/evidence-engine` — tiers, submissions, verification, guidance, KPIs

`@foundry/db` — `ensureDemoEvidenceSubmission()`, `getEvidenceKpiCounts()`
