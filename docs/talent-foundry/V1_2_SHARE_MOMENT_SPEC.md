# Talent Foundry V1.2 — Key One share moment

**Branch:** `feat/talent-foundry-v1-2-resume-share`  
**QR target (unchanged):** `https://foundry-os.netlify.app/talent-foundry`

One contextual invitation. Nowhere else. No referral system.

---

## Moment

After Key One is revealed, state `key_one_share`:

**Know someone who should see this?**  
**Bring someone with you.**

- **Share** — opens the existing full-screen Share QR takeover
- **Keep going** — continues to identity

Flag: `keyOneSharePromptSeen`. Set when they Share or Keep going. The prompt does not appear again on this journey.

A friend who scans always starts at the beginning.

---

## What this is not

No referral count, points, tracking, leaderboard, unlock requirement, contact upload, or “recruit three friends” copy.

Share does not mutate assessment evidence. The flag is UX only.

---

## Haptics (V1.2 cleanup)

| Moment | Behavior |
|---|---|
| Key One discovery | Keep. Now respects `prefers-reduced-motion` |
| Layer 2 interruption | Keep. Already gated |
| Key Two discovery | Keep. Already gated |
| Layer 2 wave/time ticks | **Removed** |
| Share QR opens | Very short pulse, Android-only, reduced-motion gated. Not on the prompt itself |
| You’re In | **Not added** (uncertain in preview) |

iOS `vibrate` remains a silent no-op.
