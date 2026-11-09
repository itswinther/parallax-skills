# Brief template

The exact structure of `docs/parallax/brief.md`. Keep every heading and its number, so the orchestrator, the agents and `parallax-domain-learn` can refer to sections by number. Replace each `<...>` with the decision. Delete the `<!-- guide -->` comments when you fill the template.

The standard for every section: a builder who has never seen this domain can build it without making a design decision.

Keep the "When this brief disagrees" lines in the filled brief as they are. A long brief will contradict itself or the data somewhere, and the builders need one rule for what wins.

---

````markdown
# Brief: <project name>

Written <YYYY-MM-DD> by parallax-domain · Research: docs/parallax/domain-research.md

**When this brief disagrees:**
- With itself: the more specific part wins. A screen's own subsection in section 6 beats a summary, a principle or an acceptance criterion that describes the same thing.
- With the data: the data wins over any example value written here.
- Either way, the orchestrator logs the case in `docs/parallax/build-log.md`.

## 1. Summary
- Challenge: <name and one-paragraph summary>
- Idea: <the chosen idea, as the team phrased it>
- Sponsor: <name, what they do>
- Deadline: <YYYY-MM-DD HH:MM, time zone, or "None: <why>"> · Hand-in: <video length, repo rules, other requirements>
- Who judges, and how they see it: <who; live demo, recorded video, or a link they open themselves; on which device>
- Existing UI: <"None", or what the repo already has, what this build keeps and what it removes, as approved at the checkpoint>
- Feedback so far: <what the sponsor, mentors or judges have already said about the idea or an earlier version, or "None">
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

### Viewports
<!-- guide: browser viewport, not monitor size (a 1920×1080 monitor leaves about 1920×970). The first row is the primary user's screen. Always list the laptop the demo is recorded or presented on. List a phone if anyone will open a deployed link. -->
| Viewport (width × height) | Who sees the tool at this size | What changes from the primary layout |
| --- | --- | --- |
| | <primary user> | Primary layout |

At every viewport listed, every region can be reached by scrolling, no text is drawn over other text, and the page is no wider than the window.

## 3. Core tasks (ranked)
<!-- guide: rank by frequency x stakes; note which judging criterion each task serves -->
| Rank | Task | Trigger | Decision made | Information needed | Done looks like |
| --- | --- | --- | --- | --- | --- |

## 4. Domain facts and assumptions
### Facts
- <fact> [source](url)

### Assumptions
- <assumption> — what changes if it's wrong

### Sponsor asks
<!-- guide: every concrete thing the sponsor said they want to see or do, in their words. Each is met by a named element in section 6, or declined with the reason approved at the checkpoint. None is left blank. -->
| # | Ask, in their words | Where they said it | Met by (screen and element), or "Declined: <why>" |
| --- | --- | --- | --- |

## 5. Domain design principles
<!-- guide: 3 to 6 rules derived from the research or the library, each with its reason -->
1. **<rule>.** Why: <reason, with source or `library: <archetype> / <rule>`>

### Where this beats today's tools
<!-- guide: one to three deliberate departures from how the real tools do it, each tied to a weakness from the research or the sponsor's own words. Everything else follows the domain's conventions. -->
| Today's tools | This build | Source of the weakness |
| --- | --- | --- |

## 6. Screens
### First-screen test
<!-- guide: what someone who has never used the tool reads off the first screen in 10 seconds, with no click and no scrolling. 3 to 5 questions about the whole workload, not about one item. Answers are computed from the data, with the query. -->
- **Opens on:** <screen 6.<n>, and with which data loaded>
- **Headline:** <the one sentence at top emphasis that states the answers in the users' words, as a template with the fields it is computed from, and one real example>
- **Questions the first screen answers:**
  | Question | Answer from the data (query or file) | Where on the first screen it is read |
  | --- | --- | --- |
- **Thumbnail test:** in a screenshot of this screen at the primary viewport, shrunk to a quarter of its size, what catches the eye is <the elements, which must be the answers above>, and not <what must stay quiet: constant values, navigation, decoration>.

<!-- guide: then one subsection per screen, ordered by the task rank they serve -->
### 6.<n> <Screen name>
- **Purpose:** <one sentence> · **Serves task:** <rank and name>
- **Primary view type:** <queue / table / map / timeline / form / board ...>
- **Top emphasis:** <the one or two values on this screen that get emphasis level 1 from section 7, and why the user's decision turns on them>
- **Layout regions:**
  | Region | Position and share of the screen | Contents |
  | --- | --- | --- |
- **Scrolling:** <which region scrolls at the primary viewport, and what changes at each other viewport in section 2>
- **Components:** <each component, with its exact behaviour>
- **Data fields:**
  <!-- guide: "Longest real value" comes from the dataset, so widths are not guessed. Examples are copied from real records. -->
  | UI label | Source (`table.column`, `derived: <rule>` or `mock: <source>`) | Format | Example (record ID) | Longest real value |
  | --- | --- | --- | --- | --- |
- **When a row doesn't fit:** <which column gives way first, and how: truncate with the full value in a tooltip, wrap, or hide the column. Name the columns that never truncate.>
- **Constant values:** <any column or status colour that one value fills on most rows of the real data, counted, and where that common case is stated once instead. Or "None: checked against <dataset>.">
- **Charts:** <for each chart or graphic on this screen: the one sentence a user reads off it, and the smallest size at which that works. Or "None.">
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
- **Emphasis levels:**
  <!-- guide: at most three. Level 1 is for data the decision turns on, never for a title, a tagline or the product name. -->
  | Level | Type token and weight | Used for |
  | --- | --- | --- |
  | 1 | | <the first-screen headline; each screen's top-emphasis values> |
  | 2 | | |
  | 3 | | <everything else> |
- **Tabular figures:** <where `font-variant-numeric: tabular-nums` is applied>
- **Colour tokens:**
  | Token | Hex | Meaning | Contrast on background | Used for |
  | --- | --- | --- | --- | --- |
- **Spacing and density:** <base unit, row height, table cell padding, gutters>
- **Borders, radius, elevation:** <values; where elevation is allowed>
- **Brand mark:** <the logo or wordmark the human chose to keep at the checkpoint: where it sits, its font, size and letter-spacing. The font and letter-spacing bans don't apply to it. Or "None.">
- **Icon set:** <package and version, size, stroke; icons always paired with a text label unless listed here>
- **Chart rules:** <which charts are allowed, axis and label rules, colour use, or "No charts: <why>". Every chart has its "reads as" sentence in its screen's section; one that can't deliver it with the real data is replaced by a ranked table or a sentence.>
- **Component library theme:** <which default theme variables are replaced by which tokens, or "No component library">

## 8. Hero moment
- **What it shows:** <one sentence: the workflow step and why it matters to the sponsor>
- **Starting state:** <exact data: the dataset record ID if there is one, which fields, their values, and where the record sits under the screen's default sort and filters from section 6>
- **Script:**
  | Time | Presenter does or says | System does | On screen |
  | --- | --- | --- | --- |
  | 0:00 | | | |
- **The state change:** <what visibly changes, in which region, within about 10 seconds>
- **Reset:** <how to return to the starting state between takes>

### What a judge sees cold
<!-- guide: someone opens the demo link, or clicks to any screen, without the script. One row per screen in section 6. No screen opens on a bare empty state: seed the demo data, or make the empty state show a real example. -->
| Screen | Opening state in the demo | What it shows without a click |
| --- | --- | --- |

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

### Time plan
<!-- guide: worked back from the deadline in section 1. Recording the video and the hand-in come last and are never cut. With no deadline, write "No deadline: no time plan." and keep the cut line as a priority order. -->
| Phase | From | To |
| --- | --- | --- |
| Setup, browser check and contract | | |
| Build (both builders) | | |
| Integration, page checks and first-screen test | | |
| Critic run 1 and fixes | | |
| The human looks at it on their own screens | | |
| Critic run 2 and fixes, if the plan has room | | |
| Record the video and hand in | | |

### Cut line
<!-- guide: what is dropped first when a phase overruns, most expendable first. The first-screen test and the hero moment are never on this list. -->
1. <screen, state or feature> — dropped if <phase> is not done by <time>

## 12. Ban list
<copy of references/ban-list.md, unchanged>

### Additions for this project
- <addition> — source: <research finding or checkpoint answer>. Or "None."

## 13. Acceptance criteria
<!-- guide: each criterion is checkable with yes or no, by looking or by a command. The first five are always these. -->
- [ ] **First screen.** At the primary viewport, with no click and no scrolling, the first screen answers every question in section 6's first-screen test, and each answer matches the data.
- [ ] **Thumbnail.** In a quarter-size screenshot of the first screen, what catches the eye is what section 6's thumbnail test names, and nothing it says must stay quiet.
- [ ] **Sponsor asks.** Every ask in section 4 that isn't declined can be pointed at on a screen.
- [ ] **Cold open.** Every screen opens in the demo as section 8's cold-open table says, with no bare empty state.
- [ ] **Viewports.** At every viewport in section 2, on every screen: every region can be reached by scrolling, no text is drawn over other text, the page is no wider than the window, and the only cut-off text is in the columns section 6 says may truncate.
- [ ] <criterion>

## 14. Critic brief
- **Persona:** <name, role, years in the job, what they care about, what makes them reject a tool>
- **Scenario:** <a full working session, step by step, that starts with the first-screen test, touches every screen, every state the data can produce and the hero moment, and repeats the main task at each other viewport in section 2>
- **What this persona would never accept:** <list>

## 15. Open questions
### For the sponsor or mentor
- <question> — if <answer>: <what changes>
### Unresolved assumptions
- <assumption> — decided for now as <decision>
````
