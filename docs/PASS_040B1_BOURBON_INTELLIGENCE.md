# PASS-040B1 — Bourbon Intelligence Inventory

## Goal

Build the deepest **structured** bourbon inventory we can legally and honestly support — schema first, pages second.

## Package

`@foundry/bourbon-intelligence`

## Registries

| Registry | Count (v1) | Rule |
|----------|------------|------|
| Producers | 11 | distiller · craft · sourced · NDP · legacy |
| Bottles | 20 | catalog facts + confidence labels |
| People | 4 | sourced facts only; 2 publishable |
| Mash bills | 16 | no invented percentages |
| Terroir | 11 | explicit "not disclosed" |
| Leader slots | 8 | 2 verified (Harlen Wheatley, Eddie Russell) |
| Legal standards | 7 + Canadian comparison | eCFR Part 5 spine |
| Graph edges | 100+ | auto-built from registries |

## Source confidence

```txt
verified · producer_disclosed · commonly_reported · editorial · unknown
```

## Hard rules

- No unsourced verified claims
- No invented mash bill percentages
- No fabricated master distiller bios
- Grain source / soil: show "Not publicly disclosed" when unknown
- Pages generate from registry — do not bulk-author copy

## Chain model

```txt
Bottle → Producer → Master Distiller → Mash Bill → Terroir → Comparables → Artifacts → Reviews
```

## Integration

- Operator: `/operator/bourbon/inventory`
- Bottle pages: `BourbonIntelligencePanel`
- Leader slots: synced from `leaderSlotExport()`
- Audit: `npm run audit:bourbon-intelligence`

## Next (040B)

Seed per-bottle atlas graphs from inventory relationships — mechanical, not hand-authored.
