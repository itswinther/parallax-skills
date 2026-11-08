# Pattern library

Lessons confirmed at real events, grouped by domain archetype. `parallax-domain` reads this file at the start of its research, opens only the archetype files that match the challenge, and treats their rules as confirmed. `parallax-domain-learn` is the only thing that writes here, and only after the user confirms each lesson, so the library stays trustworthy.

The library starts empty on purpose. Every entry has to come from an event.

## Archetypes

| Archetype | File | What it covers | Rules | Contested | Didn't work | Last updated |
| --- | --- | --- | --- | --- | --- | --- |

None yet.

## Naming archetypes

One file per archetype in `domains/`, named in kebab-case: `domains/<archetype>.md`. Reuse an existing archetype when it fits, so lessons accumulate instead of scattering. Examples of archetype names (no files exist until `parallax-domain-learn` creates them):

- `operations-control-room`: people watching many live jobs and handling exceptions (dispatch, logistics, fleet)
- `public-sector-service`: citizen-facing or case-worker services with accessibility and language obligations
- `field-mobile`: work done on a phone or tablet away from a desk
- `industrial-hmi`: operating and monitoring physical processes
- `back-office-finance`: reconciliation, approvals, ledgers
- `consumer`: products used by the public by choice

## Format of an archetype file

```markdown
# <Archetype title>

<One line: what kind of tools and users this archetype covers.>

## Rules

### <rule, one line>
- Why:
- Applies when:
- Evidence: <date> <event>, <challenge> — <what happened>
- Confirmed at: <n> event(s)

## Rejected / didn't work

### <approach, one line>
- Why it failed:
- Applies when:
- Evidence: <date> <event>, <challenge> — <what happened>
- Confirmed at: <n> event(s)
```

- A rule seen again gets another `Evidence:` line and a higher `Confirmed at:` count.
- A rule contradicted by new evidence stays in place with two extra lines: `- Status: contested` and `- Counter-evidence: <date> <event>, <challenge> — <what happened>`. `parallax-domain` treats contested rules as open questions.
- A rule is removed only when the user says so. It then moves to "Rejected / didn't work" with its full history, because a rule that stopped holding is a lesson too.
