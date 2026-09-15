---
name: prime-promote
description: >-
  Promotes a Prime Warsaw candidate to champion (`/` shows the landing; hub at
  `/lab`; status champion). Use when the user asks for prime-promote, make
  champion, or to put a ready candidate on the root route.
disable-model-invocation: true
---

# prime-promote

Make **one** candidate the lab champion. Stop — do not do M4 ship (meta/OG, deploy, CTA).

## Before you start

- Lifecycle: [`docs/AGENT_FLOW.md`](../../../docs/AGENT_FLOW.md); motion notes: [`docs/MOTION.md`](../../../docs/MOTION.md)
- Require CONCEPT/registry status ≥ `ready`
- Refuse `c00-dry-run`
- Confirm target with the user if more than one ready candidate or target is ambiguous
- Runtime already supports champion: `getChampion()` in `src/app/candidates.ts`, `/` → champion when set, `/lab` → hub

## Steps

1. **One champion** — If another entry has `status: champion`, demote it to `ready` in both its CONCEPT.md and `src/app/candidates.ts`.
2. **Promote** — Set target CONCEPT + registry `status` → `champion`.
3. **Hub links** — On the champion candidate (and optionally siblings you already touch), point “Back to hub” / lab Links to `/lab` so `/` can own the landing. Do not mass-edit unrelated candidates unless asked.
4. **Router** — Do **not** invent a new per-candidate route. Confirm `/` uses `getChampion()` / `ChampionPage` and `/lab` serves `HubPage` (already wired in M3). Fix only if broken.
5. **Verify** — `pnpm lint` and `pnpm build` stay green. Mentally: `/` → champion, `/lab` → hub, `/c/<id>-<slug>` still works.
6. **Stop** — Report champion key + URLs. Leave Meta/OG, deploy, Instagram/Telegram CTA to **M4**.

## Hard limits

- Exactly one `champion` at a time
- Do not delete the candidate folder
- No M4 ship work (meta, deploy, production CTAs)
- Do not promote below `ready` unless the user explicitly overrides

## Done when

- Target is `champion`; previous champion (if any) is `ready`
- `/` resolves to the champion page; hub remains at `/lab`
