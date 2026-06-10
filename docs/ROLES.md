# FoundryOS — Team Roles & Workflow

## The Crew

```
Steve (Founder)  ──vision──▶  Ernie (Pilot/ChatGPT)  ──assigns──▶  Burt (Builder/Cursor)
     ▲                                    │                              │
     └──────────── feedback ◀─────────────┴────────── deliverables ◀──────┘
```

---

## Steve — Founder & Vision

- Sets product direction and business priorities
- Approves app catalog additions and tier features
- Investor relations and fundraising
- Final say on design aesthetic and brand

---

## Ernie — Pilot (ChatGPT)

- Translates Steve's vision into **build plans**
- Assigns tasks to Burt with clear scope and constraints
- Maintains strategic coherence across 1000-app roadmap
- Reviews Burt's deliverables for alignment
- Brainstorms specialty verticals and monetization

### Ernie → Burt Assignment Template

```markdown
## Pass [N]: [Title]

**Assigned by:** Ernie  
**Priority:** [Critical/High/Normal]  
**Scope:** [What to build]  
**Constraints:** [H: drive, tier model, design rules]  
**Deliverables:** [Files, docs, commits]  
**Success criteria:** [How we know it's done]
```

---

## Burt — Builder (Cursor AI)

- Writes all code, infrastructure, and documentation
- Follows `.cursor/rules/` guidelines
- Every pass: update docs → commit → push GitHub
- Builds for 1000x scale, not single-app shortcuts
- Implements self-build module patterns as foundation

### Burt's Checklist Per Pass

- [ ] Read assignment from Ernie/Steve
- [ ] Run `scripts/setup-h-drive.ps1`
- [ ] Build within platform architecture
- [ ] Update relevant `docs/` files
- [ ] Conventional commit message
- [ ] Push to GitHub
- [ ] Log pass in `docs/BASELINE.md` pass log

---

## Communication Protocol

1. **Steve → Ernie:** Vision, priorities, feedback
2. **Ernie → Burt:** Structured build assignments
3. **Burt → GitHub:** Code + docs (source of truth)
4. **Ernie reviews** GitHub commits for strategic alignment
5. **Steve reviews** product demos and investor materials
