# Brief template

The exact structure of `docs/parallax/brief.md`. Keep every heading and its number, so the orchestrator, the agents and `parallax-domain-learn` can refer to sections by number. Replace each `<...>` with the decision. Delete the `<!-- guide -->` comments when you fill the template.

The standard for every section: a builder who has never seen this domain can build it without making a design decision.

---

````markdown
# Brief: <project name>

Written <YYYY-MM-DD> by parallax-domain · Research: docs/parallax/domain-research.md

## 1. Summary
- Challenge: <name and one-paragraph summary>
- Idea: <the chosen idea, as the team phrased it>
- Sponsor: <name, what they do>
- Deadline: <YYYY-MM-DD HH:MM, time zone> · Hand-in: <video length, repo rules, other requirements>
- Judging criteria:
  | Criterion | Weight | What judges look for |
  | --- | --- | --- |

## 2. Users
### Primary persona
| Field | Value |
| --- | --- |
| Role | <job title as the industry writes it> |
| Environment | <desk / control room / field / ..., lighting, noise> |
| Device | <screens, size, input: mouse, keyboard, touch, gloves> |
| Session length | <for example a 10-hour shift with the tool always open> |
| Frequency | <items handled per hour or day> |
| Stress | <time pressure, cost of errors> |
| Expertise | <domain expertise, tech comfort> |
| Vocabulary | <the words they use; these become UI labels> |

### Secondary users
<role, what they need from the tool, or "None.">

## 3. Core tasks (ranked)
<!-- guide: rank by frequency x stakes; note which judging criterion each task serves -->
| Rank | Task | Trigger | Decision made | Information needed | Done looks like |
| --- | --- | --- | --- | --- | --- |

## 4. Domain facts and assumptions
### Facts
- <fact> [source](url)

### Assumptions
- <assumption> — what changes if it's wrong

## 5. Domain design principles
<!-- guide: 3 to 6 rules derived from the research or the library, each with its reason -->
1. **<rule>.** Why: <reason, with source or `library: <archetype> / <rule>`>

## 6. Screens
<!-- guide: one subsection per screen, ordered by the task rank they serve -->
### 6.<n> <Screen name>
- **Purpose:** <one sentence> · **Serves task:** <rank and name>
- **Primary view type:** <queue / table / map / timeline / form / board ...>
- **Layout regions:**
  | Region | Position and share of the screen | Contents |
  | --- | --- | --- |
- **Components:** <each component, with its exact behaviour>
- **Data fields:**
  | UI label | Source (`table.column`, `derived: <rule>` or `mock: <source>`) | Format | Example |
  | --- | --- | --- | --- |
- **States:**
  | State | What the user sees |
  | --- | --- |
  | Empty | |
  | Loading | |
  | Error | |
  | Alert | |
  | Stale data | |
- **Interactions:** <click, select, filter, sort, drag; what each does>
- **Keyboard shortcuts:** <key: action>, or "None: <why the domain doesn't expect them>"

## 7. Visual system
- **Fonts (picked by <name> at the checkpoint):**
  | Role | Family | Weights | Features | Source and licence | Fallback stack |
  | --- | --- | --- | --- | --- | --- |
  | UI | | | <tabular digits by default, or `tnum` where numbers are compared; `zero` if present> | | |
  | Mono | | | | | |
- **Type scale:**
  | Token | Size / line height | Weight | Used for |
  | --- | --- | --- | --- |
- **Tabular figures:** <where `font-variant-numeric: tabular-nums` is applied>
- **Colour tokens:**
  | Token | Hex | Meaning | Contrast on background | Used for |
  | --- | --- | --- | --- | --- |
- **Spacing and density:** <base unit, row height, table cell padding, gutters>
- **Borders, radius, elevation:** <values; where elevation is allowed>
- **Icon set:** <package and version, size, stroke; icons always paired with a text label unless listed here>
- **Chart rules:** <which charts are allowed, axis and label rules, colour use, or "No charts: <why>">
- **Component library theme:** <which default theme variables are replaced by which tokens, or "No component library">

## 8. Hero moment
- **What it shows:** <one sentence: the workflow step and why it matters to the sponsor>
- **Starting state:** <exact data: the dataset record ID if there is one, which fields, their values>
- **Script:**
  | Time | Presenter does or says | System does | On screen |
  | --- | --- | --- | --- |
  | 0:00 | | | |
- **The state change:** <what visibly changes, in which region, within about 10 seconds>
- **Reset:** <how to return to the starting state between takes>

## 9. Stack
<!-- guide: "From" is "starter lockfile" for packages the starter already has, "added" for new ones -->
| Package | Exact version | From | Why |
| --- | --- | --- | --- |
- Versions checked: <YYYY-MM-DD, command used>
- Run: `<command to start the app>` → <local URL>
- **Fallback:** <the starter repo's or challenge's stack, or the plainest version of the chosen one>
- **Switch rule:** <concrete, time-boxed condition>

## 10. UI ↔ logic contract
- **Contract file:** `<path in the repo, for example src/contract/index.ts>`
- **Types:**
  ```ts
  // the exact types both agents build against
  ```
- **Functions or endpoints:**
  | Name | Input | Output | Errors | Used by screen |
  | --- | --- | --- | --- | --- |
- **Mock data plan:** <source of mock data, size, seed, which records make the hero moment reproducible, how mocks are swapped for real data>

### Agent rules
<!-- guide: only if the idea includes an AI agent; otherwise write "No agent." -->
| Rule | Value | Source |
| --- | --- | --- |
| Does on its own | <for example read records, ask the driver, look up options> | <challenge rule or research> |
| Needs a person's approval | <for example any booking, date, cost or customer message> | |
| May contact | <who> | |
| Never contacts | <who> | |
| Identifies itself as | <for example "Bahn assistant (AI)" on every message to a person> | <for example AI disclosure law> |
| Records per action | <reason, evidence references, time, who approved> | |
| Stops and hands over when | <conditions> | |
| How the UI shows its work | <where proposals, evidence and its log appear> | |

## 11. Work split and order
### parallax-ui
1. <task> — done when <criterion>
### parallax-logic
1. <task> — done when <criterion>
### Integration points
| When | What is joined | Checked by |
| --- | --- | --- |

## 12. Ban list
<copy of references/ban-list.md, unchanged>

### Additions for this project
- <addition> — source: <research finding or checkpoint answer>. Or "None."

## 13. Acceptance criteria
<!-- guide: each criterion is checkable with yes or no, by looking or by a command -->
- [ ] <criterion>

## 14. Critic brief
- **Persona:** <name, role, years in the job, what they care about, what makes them reject a tool>
- **Scenario:** <a full working session, step by step, that touches every screen, every state the data can produce, and the hero moment>
- **What this persona would never accept:** <list>

## 15. Open questions
### For the sponsor or mentor
- <question> — if <answer>: <what changes>
### Unresolved assumptions
- <assumption> — decided for now as <decision>
````
