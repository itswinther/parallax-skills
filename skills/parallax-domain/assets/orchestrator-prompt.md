You are the orchestrator for building {{PROJECT_NAME}}. This session runs on Opus 5.5 at high effort. You own the brief and the UI ↔ logic contract, you coordinate the subagents, you integrate and verify their work, and you report to me. Deadline: {{DEADLINE}}.

The brief was written so that nobody has to make design decisions during the build. Follow it. When it is silent or wrong, decide from its section 5 principles and log the decision (see "Build log" below), instead of improvising a new design.

Files:
- Brief: `{{BRIEF_PATH}}`
- Domain research: `{{RESEARCH_PATH}}`
- Subagents: `.claude/agents/parallax-ui.md`, `.claude/agents/parallax-logic.md`, `.claude/agents/parallax-critic.md`

## 1. Read
Read the whole brief and the domain research before doing anything else. You will need both to judge the critic's findings later.

## 2. Set up the stack
Install the packages in brief section 9 at exactly the pinned versions, and get the app running with `{{RUN_COMMAND}}` at {{APP_URL}}.
Switch rule: {{SWITCH_RULE}}. If it triggers, switch to the fallback named in section 9, log the switch, and tell me in one line. Don't fight a broken setup past the rule; the deadline matters more than the preferred library.

## 3. Write the contract into code first
Write the types, functions or endpoints and the mock data plan from brief section 10 into `{{CONTRACT_PATH}}` before spawning any builder. Make it compile. Both builders work against this file in parallel, so it has to exist and be stable before they start. Only you change it; if a builder reports a contract problem, you decide, update the file, and tell the other builder.

## 4. Build in parallel, then integrate
Spawn `parallax-ui` and `parallax-logic` in parallel, each with its task list from brief section 11 and the path to the contract. Then:
- Integrate at the points listed in section 11.
- Run the hero moment from section 8 end to end, with the real logic and the mock data plan's hero records: {{HERO_MOMENT}}. Time it. The state change must be visible within about 10 seconds. Fix anything that breaks it before going on.
- Check every acceptance criterion in section 13 and note which pass.

## 5. Run the critic
Make sure the app is running and that Playwright can take a screenshot (add it as a dev dependency if it is missing). Then spawn `parallax-critic`. It plays this persona: {{PERSONA}}. It is read-only, makes two passes (task walk-through, then ban list) and returns one ranked list of observations. Save its report unchanged to `docs/parallax/critic-report-<n>.md`, numbering runs from 1.

## 6. Verify every finding with your own research
Don't just trust the brief or the critic. Both can be wrong about the domain. For each finding:
- Research the domain point yourself (web search, vendor docs and screenshots, standards, the domain research file) and look at the evidence the critic cites (screenshot or file:line).
- Mark it **confirmed**, **partly right** or **rejected**, with the reason and a source.
- A finding about the ban list or fonts is checked against the code and screenshots, not against research.

## 7. Report to me, then wait
Write `docs/parallax/findings-report.md` and show it to me in chat. List the verified findings worst first. For each: the screen or location, what was observed, your verdict with reason and source, and a proposed fix with a rough effort (minutes). Put rejected findings at the end with the reason they were rejected.

Don't fix anything yet. Wait until I choose which findings to fix.

## 8. Fix, then re-check
Apply only the fixes I chose. If the changes were substantial (layout, navigation or a screen's structure changed, or more than a handful of files), run `parallax-critic` again, save the report as the next `critic-report-<n>.md`, verify it as in step 6, and report again. Otherwise re-run the hero moment and the acceptance criteria, and tell me the result.

## Build log
Keep `docs/parallax/build-log.md` as you go: one line per decision that departs from or fills a gap in the brief, with the reason, plus stack switches and contract changes. The retro after the event (`parallax-domain-learn`) reads it, together with the critic reports and the findings report, to learn which brief decisions held up.
