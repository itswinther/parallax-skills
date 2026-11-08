---
name: parallax-domain
description: Turn a hackathon challenge plus the team's already-chosen idea into a domain-correct UI brief and build plan for a separate Claude Code coding session (orchestrator plus UI, logic and critic subagents). Use when the user wants hackathon UI or UX for a chosen idea, a "domain-correct" interface, a UI that looks like the real tools of that industry instead of AI-generated, a build brief or handoff for a coding session, or a plan for which screens to build for a challenge. Researches the domain live, stops once so the user can pick fonts and approve palette, stack and demo moment, then writes the brief and the handoff files. Writes no app code and never picks the idea.
argument-hint: <challenge brief path or link> | <chosen idea> | <code repo path>
---

# Parallax: domain brief

The coding session that follows builds exactly what the brief says. Every design decision the brief leaves open becomes a builder's guess, and builders guess "generic AI app": gradient cards, KPI tiles, a chat panel. This skill makes those decisions up front, grounds each one in research about the real users and the real tools of the domain, and writes them down so precisely that nobody downstream has to design.

The output is files, not code:

| File (in the code repo) | What it is |
| --- | --- |
| `docs/parallax/domain-research.md` | Full research notes with source links |
| `docs/parallax/checkpoint.md` | What was proposed at the checkpoint, and what the human chose |
| `docs/parallax/brief.md` | The brief, structured by `references/brief-template.md` |
| `docs/parallax/orchestrator-prompt.md` | Paste-ready prompt for the coding session |
| `.claude/agents/parallax-ui.md` | UI builder subagent |
| `.claude/agents/parallax-logic.md` | Logic builder subagent |
| `.claude/agents/parallax-critic.md` | Read-only critic subagent |

Bundled files, relative to `${CLAUDE_SKILL_DIR}`:

| File | Read it |
| --- | --- |
| `references/research-playbook.md` | Before step 2 |
| `references/font-guidance.md` | Before preparing font options in step 3 |
| `references/ban-list.md` | Before step 3, and copy it into the brief in step 5 |
| `references/brief-template.md` | Before step 5 |
| `assets/orchestrator-prompt.md`, `assets/agents/*.md` | In step 6 |
| `library/INDEX.md`, `library/domains/*.md` | At the start of step 2 |

## Ground rules

- **The idea is given.** Never propose, rank or tweak ideas. If the idea is missing, ask for it and wait. Choosing the idea is the team's call, and a brief built on a guessed idea is wasted hours at an event.
- **No app code.** Types and function signatures in the brief are specifications. The orchestrator writes them into code.
- **One stop.** The checkpoint in step 4 is the only time you wait for the human. Gather everything you need from them there. After it, decide yourself and log anything unresolved under Open questions. At a hackathon the human is building, pitching and talking to sponsors; a skill that keeps asking gets abandoned.
- **Fonts are suggested, never chosen.** The human picks. See `references/font-guidance.md`.
- **Source or assumption.** Every domain claim in the research and the brief has a source link, or sits in the Assumptions list. This is what makes the brief trustworthy enough to build from without re-checking.

## 1. Inputs

Required:
- the challenge brief (file, pasted text or link)
- the chosen idea
- the path of the code repo the brief goes into

Optional: the dataset or its schema, a starter repo, judging criteria, deadline, sponsor or mentor info.

If a required input is missing, ask for all missing ones in a single message and wait. Do not start research without the idea; research without it drifts toward the whole domain instead of the workflow the idea touches.

Read everything you were given. Fetch links. In the code repo or starter, read `package.json`, the lockfile, framework config, `README` and any agent instructions (`AGENTS.md`, `CLAUDE.md`) to learn the stack and its versions. For a dataset, read the schema file and a few sample rows of each table, not the whole dataset.

Extract and keep these facts. They feed every later step:
- **Sponsor**, and what they sell or run.
- **Who will actually use the result.** Often not the judges. Look for role names in the brief.
- **Judging criteria** with weights.
- **Deadline**, with date, time and time zone, plus the hand-in format (video length, repo rules).
- **Data schema:** tables or files, columns, types, units, ID formats, timestamps and their time zone, status enums, and how entities link. Note where the data is deliberately messy; that mess is usually what the users fight with every day.
- **Starter stack:** framework, language, database, UI libraries, exact versions.

## 2. Domain research

### 2a. Library first

Read `library/INDEX.md`. Pick the archetype or archetypes that match this challenge (a dispatch tool can match both an operations archetype and a field-mobile one if drivers use phones). Open only those files under `library/domains/`.

- Rules there were confirmed at past events. Treat them as rules, apply them, and cite them in the brief as `library: <archetype> / <rule>`.
- A rule marked contested is an open question. Research it.
- Entries under "Rejected / didn't work" are approaches to avoid unless research shows this context really differs.
- Live research can extend a rule. If research contradicts one, keep both and raise it at the checkpoint. The human decides; the library only changes through `parallax-domain-learn`.

If the library has no matching archetype yet, say so in one line and continue.

### 2b. Live research

Follow `references/research-playbook.md`. It lists the questions, where to look and the output format.

**Check your reach first.** Fetch one help-centre or docs page of a product in this domain with WebFetch. If it doesn't open (a network allowlist or proxy can block vendor and standards sites), tell the subagents, so they rely on search results and say so instead of failing page by page. Knowing this up front also tells you how much the screenshot evidence will be worth.

Run the three research tracks as parallel subagents (Agent tool, general-purpose), one each for:
1. users and tasks
2. real tools and their UI conventions
3. standards, constraints and data conventions

Give each subagent the extracted input facts, the idea, its track's questions and sources from the playbook, the playbook's subagent output format, and a search budget. Parallel tracks are faster, and each subagent keeps its page dumps out of your context.

**Budget the searches.** Web searches can run out within one turn, and parallel subagents share the budget: in testing, three tracks shared about 200 searches and all three ran out before finishing. Give each track roughly a third of what's available and tell it to spend searches on its weakest questions first. "No limit" here means no limit across rounds, not within one: when a round runs out, run the next round on the thin questions in a later turn.

Then merge the results and check whether research is **sufficient**:
- every question in the playbook's question list has an answer backed by a source, or is explicitly listed as an assumption, and
- your latest round of searches did not change any answer.

If it is not sufficient, run another round on the thin questions only. There is no time limit; keep going until both conditions hold. The second condition matters because the first thing you find is often a vendor's marketing page, and only saturation tells you that you have seen the real picture. It needs at least two rounds to test. If you had to stop after one, say so at the checkpoint.

Check before moving on: you have looked at the actual screens of named products (help-centre screenshots, docs, demo videos), not concept shots. Concept shots on Dribbble or Behance show what designers imagine, and they are where the AI look comes from. If pages could not be opened and screenshots were never seen, density and layout findings are assumptions, not facts; list them that way and add a sponsor question where they matter.

### 2c. Sponsor questions

For every assumption that would change a screen, a field, the stack or the hero moment, write a question the team can ask the sponsor or a mentor at the event. Phrase it so a short answer settles it, and say what changes depending on the answer. Assumptions that change nothing visible do not need a question.

### 2d. Write the research file

Write `<code-repo>/docs/parallax/domain-research.md` in the playbook's format now, before the checkpoint, so the human can open it while answering and the coding session has the evidence behind every decision. Update it after the checkpoint if anything changed.

## 3. Design reasoning

Work in this order. Each step depends on the one before.

1. **Tasks to screens.** Rank the core tasks by how often they happen times what is at stake, then note which ones the judging criteria reward. For each task, name the view that serves it. Merge two tasks into one screen only when the same person does them in the same moment. Never start from a layout template such as sidebar plus KPI row plus chart plus table; that shape is what builders produce when nobody decided, and it serves no particular task.
2. **Primary view type.** Pick it from the domain: queue, table, map, timeline, form, monitoring board, or whatever the research shows real tools use for this decision. Use KPI tiles, cards or a chat panel only if a research finding shows users need them, and cite that finding.
3. **Density, navigation and colour semantics.** Set them from the research. In operations and HMI work, colour signals state and abnormal conditions, not decoration, so most of the screen is neutral and colour draws the eye to what needs action. Give every colour exactly one meaning, and make sure the meaning is also carried by text or an icon, because colour-blind users and washed-out projectors exist.
4. **States.** For every screen decide what the user sees when it is empty, loading, in error, in an alert condition, and when data is stale. Real operators judge a tool by these states; stale data shown as fresh is how wrong decisions get made.
5. **Interactions.** Add keyboard shortcuts where the domain expects them (dispatch, support queues, trading, data entry), not where it doesn't (kiosks, field mobile).
6. **Agent rules,** if the idea includes an AI agent. Decide what it may do on its own (read, ask, look up), what needs a person's approval, whom it may contact and whom never, how it identifies itself to the people it talks to, what it records for each action (reason, evidence, time), and when it stops and hands over. Take these from the challenge rules and the standards research; laws on AI disclosure and human oversight can turn a nice-to-have into a requirement. Builders who aren't told will guess, and an agent that oversteps is the fastest way to lose a judge's trust.
7. **Stack.** Choose it per domain: a data grid library for dense operations tables, a map library for dispatch, plain HTML for a kiosk.
   - Pin exact versions. For packages the starter repo already has, use the version its lockfile resolves (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `poetry.lock` and so on), not the latest release: upgrading the framework mid-event risks breakage for no gain. For packages you add, check now with `npm view <pkg> version`, plus `npm view <pkg>@<version> peerDependencies` to confirm it fits the starter's framework version. For Python, `pip index versions <pkg>`. Record the date you checked.
   - Name a fallback: the stack the starter repo or challenge brief uses. If neither names one, the plainest version of the chosen stack (for example a plain HTML table instead of a grid library).
   - State a concrete switch rule, such as "if the grid is not rendering real rows from the contract within 1 hour of setup, switch to the fallback."
   - If a component library is used, list which theme variables get replaced by the brief's tokens. Default themes are a large part of the generic look.
8. **Hero moment.** Design exactly one for the 2 to 3 minute demo video.
   - It is a real step in the workflow, such as an exception resolving or a row moving from "needs action" to "done".
   - The state change is visible on camera within about 10 seconds, using realistic data.
   - It impresses through what the system does, never through visual effects.
   - Prefer the step that best shows the highest-weighted judging criterion.
   - If the challenge has a dataset, search it for a real record that fits the idea and use it as the starting state, citing its ID. Sponsors recognise their own cases, and a real record comes with the messy details that make the system's work visible. Prefer a record whose story shows the system's judgement, such as checking before acting or concluding that nobody else needs to be contacted, over one that only shows speed.
   - Make its data part of the mock data plan so every take of the video starts from the same state.
9. **Fonts and palette.** Prepare 2 to 3 font pairings by `references/font-guidance.md`. Build a palette of neutrals plus semantic status colours, each with one meaning and a hex value. Check contrast: at least 4.5:1 for text and 3:1 for non-text UI such as borders and status markers (WCAG 2.2 AA). Compute the ratios rather than eyeballing them.
10. **Ban list check.** Read `references/ban-list.md` and check every proposal against it. If research suggests a project-specific addition (for example, "red only for abnormal states" in HMI), prepare it with its source for the checkpoint. Project additions go into this brief only, never into `references/ban-list.md`.

## 4. Checkpoint: the one stop

Write the following to `<code-repo>/docs/parallax/checkpoint.md` and present it in chat, compactly, in this order. The file matters because the question dialog can cover the chat while the human answers, and because the retro later needs to know what was proposed and what was chosen.

1. **Users and tasks:** who the primary user is and the ranked core tasks, plus the 5 to 10 domain facts that drove the design, each with its source. Say how the evidence was gathered: pages and screenshots actually opened, or search results only, and how many research rounds ran.
2. **Screens:** one line each, naming the task it serves and its primary view type.
3. **Fonts:** 2 to 3 pairings, each with reasons specific to this domain.
4. **Palette:** a table of token, hex, meaning and contrast ratio.
5. **Stack:** packages with pinned versions and the date checked, the fallback, and the switch rule.
6. **Hero moment:** the steps, what changes on screen, and the timing.
7. **Library conflicts:** where live research contradicts a library rule, with both sides. Say "none" if there are none.
8. **Project ban additions**, if any, each with its source.
9. **Sponsor questions**, each with what changes depending on the answer.

Then ask with AskUserQuestion. The dialog may hide your earlier text, so make every question self-contained, name the options in full, and point to `docs/parallax/checkpoint.md` for the details:

- **Fonts** (single select): one option per pairing, labelled with the family names, with a one-line reason as the description. The human can type their own pairing under Other.
- **Approve as proposed** (multi-select): Screens, Palette, Stack, Hero moment (plus Project ban additions if you proposed any). Anything left unticked needs a change; the human describes it in the notes or under Other.
- **Sponsor answers** (single select): "Not asked yet, keep them as open questions" or "I have answers" (typed under Other).

If something is unticked without a description of the change, ask once in chat. That is still part of this checkpoint. Append the human's answers to `docs/parallax/checkpoint.md` under a "Chosen" heading. Then finish without stopping again. If a new question comes up later, decide it from the research and the principles, and log it under Open questions in the brief.

## 5. Brief

Read `references/brief-template.md` and fill every section in order. Write the result to `<code-repo>/docs/parallax/brief.md`.

The test for every section: could a builder who has never seen this domain build it from this section alone, without making a design decision? To pass:
- Use the users' own vocabulary for every label, column header and status name, taken from the research.
- Map every displayed field to a dataset column (`table.column`), or mark it `derived: <rule>` or `mock: <source>`.
- Give exact tokens, sizes and proportions, not adjectives.
- Name only the fonts the human picked.
- Copy `references/ban-list.md` into section 12 as it is, then add the project additions the human approved.
- If the idea includes an agent, write its rules from step 3 into section 10 and add acceptance criteria that test them (for example, "no booking changes without an approval event").
- Write acceptance criteria that a person or a script can check with a yes or no.
- Write the critic brief as a concrete persona and a full session scenario that touches every screen and the hero moment.

Before handing off, scan the brief for words that hide an undecided design decision: "TBD", "TODO", "e.g.", "or similar", "something like", "as appropriate", "modern", "clean", "sleek". Replace each with the decision. Check that every screen lists all five states, every section from 1 to 15 is present, and every font named is one the human picked.

## 6. Handoff to the coding session

A skill can't start a session with a set model, so the handoff is files plus a prompt the human pastes.

1. **Agents.** Copy `assets/agents/parallax-ui.md`, `parallax-logic.md` and `parallax-critic.md` into `<code-repo>/.claude/agents/`. Overwrite earlier `parallax-*` files; leave every other agent alone. Fill the placeholders from the table below.
2. **Orchestrator prompt.** Fill `assets/orchestrator-prompt.md` with the same values and write it to `<code-repo>/docs/parallax/orchestrator-prompt.md`.
3. **Check.** Grep the four written files for `{{`. No placeholder may remain.
4. **Print and instruct.** Print the filled orchestrator prompt in chat inside one code block, so it can be copied in one go. Then tell the human: open a terminal in the code repo, start the session with `claude --model claude-opus-5-5 --effort high`, and paste the prompt. That session is the orchestrator. The agent files set their own models: `parallax-ui` and `parallax-logic` run Opus 5.5 at medium effort, `parallax-critic` runs Sonnet 5.5.
5. **List the files** you wrote. Don't commit in the code repo unless asked; the team may have its own branch rules.

| Placeholder | Value |
| --- | --- |
| `{{PROJECT_NAME}}` | Short name of the idea, from brief section 1 |
| `{{BRIEF_PATH}}` | `docs/parallax/brief.md` |
| `{{RESEARCH_PATH}}` | `docs/parallax/domain-research.md` |
| `{{CONTRACT_PATH}}` | Where the contract types live in code, from brief section 10 |
| `{{RUN_COMMAND}}` | How to start the app locally, from brief section 9 |
| `{{APP_URL}}` | Local URL of the running app, from brief section 9 |
| `{{DEADLINE}}` | Date, time and time zone, from brief section 1 |
| `{{PERSONA}}` | One line: the critic's persona, from brief section 14 |
| `{{HERO_MOMENT}}` | One line: the hero moment, from brief section 8 |
| `{{SWITCH_RULE}}` | The stack switch rule, from brief section 9 |

All paths in the filled files are relative to the code repo root, so the files keep working if the repo moves.
