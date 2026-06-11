# PASS-033 — Growth Flywheel Engine

> Connect four factories. Learn faster than competitors build. (Built before PASS-032 immersion priority shift.)

## The four factories

```txt
World Factory · Marketing Factory · Learning Engine · Revenue Engine
```

## Flywheel loop

```txt
traffic → users → missions → community → revenue → insights → better marketing
```

## Four connected systems

| System | Loop | Route |
|--------|------|-------|
| 1 | Insight → Marketing | `/operator/marketing` |
| 2 | Marketing → World | `/operator/flywheel` |
| 3 | Revenue → Product | `/operator/flywheel` |
| 4 | Domain expansion scoring | `/operator/opportunities` |

## Package

`@foundry/db` — `getGrowthFlywheelSnapshot()`

## Pass sequence

Runs after immersion data exists (PASS-034 testers feed the flywheel).

See also `docs/PASS_032_EXECUTION.md` (immersion before testers).
