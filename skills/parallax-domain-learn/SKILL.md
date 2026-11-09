---
name: parallax-domain-learn
description: After a hackathon, turn the lessons the user confirms into the pattern library that parallax-domain reads, so the next brief starts from what actually worked. Use for a hackathon retro or post-mortem, "what did we learn", reviewing how a parallax brief, critic report or demo held up, or updating the parallax library or its ban list. Interviews the user, proposes candidate lessons one by one, saves only the ones the user explicitly confirms, then commits and asks before pushing.
argument-hint: <code repo path of the event>
---

# Parallax: learn

`parallax-domain` treats every rule in its library as confirmed, so a wrong rule would quietly steer every future brief. This skill exists to keep the library trustworthy: it turns an event's experience into short, evidenced rules, and nothing is saved without the user's explicit confirmation of that specific lesson.

## 0. Find the real library path

The skill folders are normally installed as symlinks (macOS, Linux) or junctions (Windows) pointing into a git clone. Writes and the commit must happen in that clone: changes written through a copied install aren't versioned and disappear on reinstall.

1. Resolve the real path of this skill's folder, `${CLAUDE_SKILL_DIR}`:
   - macOS, Linux, or Git Bash on Windows: `cd "${CLAUDE_SKILL_DIR}" && pwd -P`, or `realpath "${CLAUDE_SKILL_DIR}"`.
   - Windows PowerShell: `(Get-Item -LiteralPath "${CLAUDE_SKILL_DIR}").Target` prints the junction's target. Empty output means the folder is not a link.
   - Windows cmd: `dir /AL "%USERPROFILE%\.claude\skills"` lists junctions with their targets in brackets.
2. From the real path, the library is `../parallax-domain/library/` and the ban list is `../parallax-domain/references/ban-list.md`.
3. Check both: `library/INDEX.md` exists, and `git -C "<real path>" rev-parse --show-toplevel` succeeds. If the real path isn't inside a git work tree, the skills were installed as a plugin (the path is under `~/.claude/plugins/`) or copied. Don't write there: a plugin's folder is replaced on every update, and the lessons would be lost. Stop and tell the user, in two or three lines:
   - Saving lessons needs the linked install from the README: a clone of the repo (or their fork) linked into `~/.claude/skills/`, with the plugin uninstalled so the two installs don't both load.
   - If they already have a clone, ask for its path and continue there. Say that a plugin install of `parallax-domain` only sees these lessons once they're pushed to the repo the plugin was installed from and the plugin updates.
4. Run `git -C "<repo root>" status --porcelain` and note files that are already changed, so the commit in step 8 includes only this skill's changes.

Use the resolved paths for every read and write below.

## 1. Load the event

Ask for the event's code repo path if it wasn't given. If the current directory has `docs/parallax/brief.md`, offer that one. Read:

- `docs/parallax/brief.md`. Required; if it's missing, ask where the brief is.
- `docs/parallax/checkpoint.md`: what `parallax-domain` proposed and what the user chose (fonts, palette, stack, hero moment), if available.
- `docs/parallax/critic-report-*.md`, if any.
- `docs/parallax/findings-report*.md`, the orchestrator's verified findings, one per critic run, if available. Count the findings per run: a count that doesn't fall from run to run means the later runs were chasing their own fixes.
- `docs/parallax/build-log.md`, the orchestrator's log of departures from the brief, if available. Read the entries for fixes the user asked for after looking at the app themselves with particular care: they are what the brief and the critic both missed, and the most likely source of a lesson.
- `docs/parallax/domain-research.md`: skim for the library rules applied and the assumptions made.
- `git log --oneline` of the code repo since the brief's date, to see what changed during the build.

Then read `library/INDEX.md` and the archetype files the brief cites (section 5 cites them as `library: <archetype> / <rule>`), so you can tell a new lesson from a repeat or a contradiction.

Take the event name, date and challenge from brief section 1, and confirm them in the interview. Every lesson's evidence line needs them.

## 2. Interview

Ask these six questions in one message. Under each, put what the documents already say, so the user corrects instead of recalling from scratch. For example: "The build log shows the grid was replaced by a plain table 2 hours in. Why?"

1. What did judges and the sponsor say about the UI?
2. What was the result?
3. Which brief decisions held up? List the main ones from the brief (primary view type, density, colour semantics, screens, stack, hero moment, fonts) so the user can answer per decision.
4. What did the team change during the build, and why?
5. Which critic findings were real? Ask this with AskUserQuestion, multi-select, listing the findings the orchestrator marked confirmed or partly right, worst first (up to 4 options per question and 4 questions per call; with more findings than that, list the top ones and take the rest in chat). Mention that rejected findings can be named under Other. Also list what the user fixed themselves after the critic runs, from the build log, and ask why each mattered.
6. What would you do differently?

Follow up where an answer is too vague to become a rule. "The judges liked it" can't guide a future brief; "the judges said the queue showed only what needed a person, and that was the point" can.

## 3. Propose candidate lessons

Draft lessons from the answers and the documents. A good lesson holds beyond this event, is specific enough to change a future brief, and rests on something that happened, not an opinion. "Keep it clean" fails all three. "In exception-driven operations tools, open on the queue of items needing a person, not on an overview" can pass.

Each candidate has:

- **Kind:** rule (do this) or didn't work (avoid this). Failures are lessons too.
- **Archetype:** an existing one from `INDEX.md` if it fits, so lessons accumulate. Otherwise propose a new kebab-case name with a one-line description.
- **Rule:** one line.
- **Why it holds.**
- **Applies when.**
- **Evidence:** `<date> <event>, <challenge> — <what happened>`.
- **Relation to the library:** new, repeats "<existing rule>", or contradicts "<existing rule>".

Separately, list **ban candidates**: patterns the user's answers suggest should never appear in any project, whatever the domain. A ban is much stronger than a lesson, so only propose one when the user's own words point that way.

Also list, separately, any improvements to the skills themselves that came up (for example "the checkpoint should also ask about X"). They are not library entries. Don't apply them; show them so the user can decide.

Show all candidates as a numbered list in chat, in full.

## 4. Confirm each lesson individually

Use AskUserQuestion with multi-select: "Which lessons should be saved exactly as written?", with up to 4 lessons per question, each option labelled with the lesson number and its rule, and as many questions as needed. For every lesson the user doesn't tick, their notes or the Other field say whether to edit or reject it. If that isn't clear, ask once.

- A ticked lesson is confirmed.
- An edited lesson: show the edited version and confirm it before saving.
- A rejected lesson is dropped. It isn't saved anywhere.
- A repeat, once confirmed, adds evidence to the existing rule.
- A contradiction, once confirmed, marks the existing rule as contested. Ask separately before removing any rule; never remove one on your own.
- Ban candidates: ask per candidate whether to save it as a ban (into the ban list, for every project), only as a lesson for its archetype, or not at all.

Save only what was confirmed.

## 5. Write the lessons

Write each confirmed lesson to `library/domains/<archetype>.md`. Create the file if it's new, using the archetype file format in `library/INDEX.md`: title, one-line description, a `## Rules` section and a `## Rejected / didn't work` section.

A rule goes under `## Rules`, in exactly this format:

```
### <rule, one line>
- Why:
- Applies when:
- Evidence: <date> <event>, <challenge> — <what happened>
- Confirmed at: <n> event(s)
```

A "didn't work" lesson goes under `## Rejected / didn't work` in the same format, with `- Why it failed:` in place of `- Why:`.

- **Repeat:** add a new `- Evidence:` line under the existing rule and increase `Confirmed at` by one. Keep the rule's wording unless the user asked to change it.
- **Contradiction:** keep the rule where it is and add `- Status: contested` and `- Counter-evidence: <date> <event>, <challenge> — <what happened>`. The library now shows both sides; `parallax-domain` treats it as an open question.
- **Removal the user approved:** move the rule with its full history to `## Rejected / didn't work` and add `- Retired: <date> — <reason>`.

## 6. Update the index

Update the table in `library/INDEX.md`: one row per archetype with its file, one-line description, number of rules, number contested, number under "Rejected / didn't work", and today's date as last updated. Count the `### ` headings in each section of the file instead of keeping a running tally, so the index can't drift. Remove the "None yet." line once the table has a row.

## 7. Ban list additions

Only for candidates the user confirmed as a ban, not just as a lesson: add each to `references/ban-list.md` under "Confirmed additions", numbered after the last ban, with the same parts as the existing bans (Banned, Why, Instead, How the critic finds it) plus `Learned: <date> <event>`. Replace "None yet." with the first addition. `parallax-domain` copies this file into every brief and the critic checks it, so the wording must be precise.

## 8. Commit, then ask before pushing

1. Stage only the files this skill changed: the archetype files, `library/INDEX.md` and, if changed, `references/ban-list.md`. Leave everything that was already changed in step 0 alone; in a shared clone other work may be in progress.
2. Commit in the resolved repo with a message like:
   ```
   parallax library: lessons from <event> (<n> new, <m> reinforced, <k> contested)

   - <archetype>: <rule>
   - ...
   ```
3. Show the user what was committed, then ask whether to push and to which remote and branch. Push only after a yes.
