# PASS-032 — World Immersion Expansion

> **Not new domains.** Make existing worlds feel endless before PASS-034 testers arrive.

## Goal

```txt
Every active world contains enough content, projects, missions, community activity,
tools, trackers, and experiences to keep a serious user engaged for 30+ days.
```

## Key shift

```txt
NOT: More lessons
YES: More experiences
```

A lesson is consumed. An experience is remembered.

## Mission counts

| World | Missions | Hours | Tracks |
|-------|----------|-------|--------|
| AI Builder | 25 | 50+ | AI for School · Business · Creativity · Automation · Entrepreneurship |
| Financial Independence | 15 | 40+ | Foundations · Banking · Investing · Business · Retirement |
| Public Speaking | 15 | 40+ | Conversation · Storytelling · Presentations · Leadership · Performance |
| Civic Engagement | 15 | 45+ | Voting · Local Gov · Advocacy · Organizing · Leadership |
| Bourbon / BBQ / Poker | 10 each | 30+ | Steward / Pitmaster / Strategic experiences |

## Package

`apps/platform/lib/immersion/` — mission builder, track registry, experience hubs

## Consumer routes

- `/{world}/missions` — track-grouped mission list (`WorldMissionTracks`)
- `/{world}/experiences` — tools, journals, trackers (`WorldExperiencesHub`)
- Portfolio pages use `getMissionCount(slug)` dynamically

## Pass sequence (updated)

```txt
PASS-032 World Immersion  ← current
PASS-033 Growth Flywheel  ✅ built
PASS-034 First 25 Testers ← after immersion
```

## Architecture impact

**Reusable system:** Immersion engine — blueprint → 6-step mission, track grouping, experience registry, central mission counts.

**Benefits:** First tester reaction: "Wow, there is way more here than I expected."

**Affected launches:** All 7 consumer worlds — depth before distribution scale.
