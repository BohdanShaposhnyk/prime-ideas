---
name: prime-build-candidate
description: >-
  Full pipeline for a Prime Warsaw candidate: invent/scaffold concept, implement
  (hero + structure + light deepen), then wire GSAP motion — status motion. Use
  when the user asks for prime-build-candidate, build a full candidate,
  invent+implement+wire, or end-to-end without staged review.
disable-model-invocation: true
---

# prime-build-candidate

One-shot from **concept → motion**. Composes existing skills; does not invent parallel steps.
Stop before polish/promote.

## Before you start

- Refuse `c00-dry-run`
- Read skill bodies as you go (do not skip their hard limits)
- Target: invent a new candidate, **or** continue an existing CONCEPT through implement + motion

## Pipeline

| Stage | Delegate |
|-------|----------|
| Invent + scaffold (if needed) | [`prime-concept`](../prime-concept/SKILL.md) |
| Hero + inert scroll skeleton + light deepen | [`prime-implement-candidate`](../prime-implement-candidate/SKILL.md) |
| GSAP from Motion signature | [`prime-wire-motion`](../prime-wire-motion/SKILL.md) |

## Steps

1. **Concept** — If no folder/CONCEPT yet (or user asked invent): run **prime-concept** in full. If CONCEPT already exists: skip scaffold; do not re-invent axes unless asked.
2. **Implement** — Run **prime-implement-candidate** in full (hero → structure → light deepen). If already past structure with a real page, skip or only fill gaps, then continue.
3. **Motion** — Run **prime-wire-motion** in full (`motion/`, reduced-motion skip, status `motion`).
4. **Status** — Leave CONCEPT + registry at `motion` (do not set `ready` / `champion`).
5. **Verify** — `pnpm lint` and `pnpm build` stay green after the pipeline.
6. **Stop** — Hub link `/c/<id>-<slug>`. Summarize thesis, scroll grammar, and motion effects. Do **not** run polish/promote unless asked.

## Hard limits

- One candidate only; never touch siblings
- Same limits as delegates: no asset asks, free Bits only when CONCEPT/user says so, no Pro, no new global deps without README note
- Do not auto-run `prime-polish` or `prime-promote`

## Done when

- Candidate exists with hero + structure + wired motion
- Status is `motion`
- Agent did not pause for staged review or assets mid-pipeline
