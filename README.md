# Parallax

Two Claude Code skills for hackathons.

- **`parallax-domain`** takes a challenge and the idea your team chose, researches how real users in that domain work and what their real tools look like, and writes an exact brief and build plan. A separate coding session (an orchestrator with UI, logic and critic subagents) builds from it. The goal is a UI that follows the conventions of the industry's real tools, beats them where the sponsor says they are weak, and doesn't look like a typical AI-generated app.
- **`parallax-domain-learn`** runs after the event. It interviews you, proposes lessons, and saves the ones you confirm into a pattern library that `parallax-domain` reads next time.

`parallax-domain` writes no app code and never picks the idea.

## Install

### As a plugin (quickest)

In a Claude Code session (v2.1.275 or later):

```
/plugin install parallax --marketplace itswinther/parallax-skills
```

On older versions, add the marketplace first, then install:

```
/plugin marketplace add itswinther/parallax-skills
/plugin install parallax@parallax-skills
```

Plugin skills carry the plugin's name, so you run them as `/parallax:parallax-domain` and `/parallax:parallax-domain-learn`. Plain-language requests work too.

- **Update:** `/plugin marketplace update parallax-skills`, or turn on auto-update for it under **Marketplaces** in `/plugin`. Every push to this repo is a new version.
- **Remove:** `/plugin uninstall parallax@parallax-skills`.
- **Lessons:** the plugin gives you the pattern library as published here, but its folder is replaced on every update, so `parallax-domain-learn` can't save your own lessons into it. To keep your own lessons, use the linked install below instead.

### Linked clone (to save your own lessons)

Use this if you want `parallax-domain-learn` to save lessons, or to edit the skills. Uninstall the plugin first, so the skills don't load twice.

Clone the repo once (or your fork), then link both skill folders into `~/.claude/skills/`. Linking instead of copying means `git pull` updates the skills, and lessons saved by `parallax-domain-learn` land in the clone, where git tracks them.

```sh
git clone https://github.com/itswinther/parallax-skills.git
```

Below, `<toolkit>` is the absolute path of that clone, for example `C:\Users\<you>\parallax-skills` or `~/parallax-skills`.

#### Windows (cmd, no admin rights needed)

Junctions (`mklink /J`) work without admin rights or Developer Mode.

```bat
if not exist "%USERPROFILE%\.claude\skills" mkdir "%USERPROFILE%\.claude\skills"
mklink /J "%USERPROFILE%\.claude\skills\parallax-domain" "<toolkit>\skills\parallax-domain"
mklink /J "%USERPROFILE%\.claude\skills\parallax-domain-learn" "<toolkit>\skills\parallax-domain-learn"
```

The same in PowerShell:

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.claude\skills" | Out-Null
New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\skills\parallax-domain" -Target "<toolkit>\skills\parallax-domain"
New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\skills\parallax-domain-learn" -Target "<toolkit>\skills\parallax-domain-learn"
```

#### macOS and Linux

Use absolute paths; a relative symlink target is resolved from the link's folder, not from where you run the command.

```sh
mkdir -p ~/.claude/skills
ln -s "<toolkit>/skills/parallax-domain" ~/.claude/skills/parallax-domain
ln -s "<toolkit>/skills/parallax-domain-learn" ~/.claude/skills/parallax-domain-learn
```

#### Check, update, remove

- **Check:** start `claude` anywhere and type `/parallax`. Both skills should appear in the menu.
- **Update:** `git pull` in the clone. The links follow.
- **Remove:** delete the links, not the targets. Windows: `rmdir "%USERPROFILE%\.claude\skills\parallax-domain"` (removes only the junction). macOS/Linux: `rm ~/.claude/skills/parallax-domain` (no trailing slash).

### Requirements

- Claude Code with access to an Opus and a Sonnet model. The agent files use the `opus` and `sonnet` aliases, so they follow the latest versions.
- Web search enabled, and web fetch able to open vendor help centres and standards sites, for the domain research. Where pages are blocked (some cloud sessions allow only a short host list), the skill falls back to search results and says so at the checkpoint. Searches are shared by the parallel research tracks within one turn, so deep research can take more than one round.
- `npm` (or `pip`) on the path, so the skill can pin package versions when it writes the brief.
- Playwright in the code repo during the build, for screenshots and layout checks. The orchestrator adds it during setup if it's missing, and falls back to an installed Edge or Chrome if Playwright's own browser won't start.

## Use `parallax-domain`

Give it the challenge brief (file, pasted text or link), the chosen idea and the path of the code repo. Add the dataset, starter repo, judging criteria, deadline, sponsor info or feedback you've already had, if you have them. It also works on a repo that already has a UI: it then proposes what to keep and what to remove.

```
/parallax-domain challenge: C:\hack\bahn\PARTICIPANT-BRIEF.md | idea: an exceptions-first control room where an on-the-road agent handles missed ferries and asks the operator to approve the new plan | repo: C:\hack\bahn
```

Plain language works too: "We chose the exceptions queue idea for the Bahn challenge. The brief and data are in C:\hack\bahn. Plan the UI."

What happens:

1. It reads your inputs and its pattern library, and numbers everything the sponsor has said they want. Then it researches the domain live: users and tasks, real tools with their UI conventions and their weaknesses, standards and data conventions. It writes `docs/parallax/domain-research.md`.
2. **It stops once.** You get:
   - the users and tasks with sources, and what today's tools do badly;
   - the proposed screens, what the first screen tells a newcomer in 10 seconds, and the screen sizes it will be built for;
   - everything the sponsor asked for, each with where it is met or why it is declined;
   - 2 to 3 font pairings to choose from, and a palette;
   - the stack with pinned versions and a fallback;
   - the demo hero moment;
   - what it keeps and removes, if the repo already has a UI;
   - a time plan and a cut line, if there is a deadline;
   - any conflicts with the library, and questions to ask the sponsor.

   It also writes all of this to `docs/parallax/checkpoint.md`, so you can read it in full while answering. You pick the fonts and approve or change the rest.
3. It finishes without stopping again and writes, in the code repo:

| File | What it is |
| --- | --- |
| `docs/parallax/brief.md` | The brief: 15 sections, from users and screens to acceptance criteria |
| `docs/parallax/domain-research.md` | Research notes with sources |
| `docs/parallax/checkpoint.md` | What was proposed at the checkpoint, and what you chose |
| `docs/parallax/orchestrator-prompt.md` | Instructions for the coding session |
| `docs/parallax/page-checks.js` | Layout checks run in the browser: cut-off text, unreachable areas, overlapping text, columns that say the same thing on every row, fonts |
| `.claude/agents/parallax-ui.md` | UI builder |
| `.claude/agents/parallax-logic.md` | Data, API, agent logic and mock data builder |
| `.claude/agents/parallax-critic.md` | Read-only critic |

4. Start a new Claude Code session in the code repo, on the most capable model you have, at high effort. In the desktop app, open a new session with the code repo as its folder. In a terminal:

```sh
cd <code-repo>
claude --model opus --effort high
```

Then send one line:

```
Read docs/parallax/orchestrator-prompt.md and follow it.
```

That session is the orchestrator. It works through these steps:

1. Sets up the stack and the screenshot browser, and writes the UI ↔ logic contract into code.
2. Runs the two builders in parallel, then integrates.
3. Runs the first-screen test (including a quarter-size screenshot, to see what stands out), the hero moment and the layout checks at every screen size, opens every screen cold, and checks each sponsor ask against the screens.
4. Runs the critic, verifies each finding with its own research, and reports to you before fixing anything.
5. Applies the fixes you choose, then asks you to look at the app on your own screen before any second critic run.

Two critic runs is the default limit.

| Agent | Model | Effort | Job |
| --- | --- | --- | --- |
| Orchestrator (main session) | your most capable | high | Owns the brief and the contract, coordinates, integrates, verifies, reports |
| `parallax-ui` | `opus` | medium | Builds screens and components exactly to the brief |
| `parallax-logic` | `opus` | medium | Builds the data layer, API, agent and business logic, mock data |
| `parallax-critic` | `sonnet` | default | Read-only: walks through every task as the real user at every screen size, then checks the ban list |

During the build the orchestrator also writes `docs/parallax/critic-report-<n>.md`, `docs/parallax/findings-report-<n>.md` and `docs/parallax/build-log.md`. The retro reads them.

If the session is cut off, or you get new feedback after the brief is written, run `parallax-domain` again on the same repo: it resumes from the files in `docs/parallax/`, or revises the brief, without redoing the research.

### What the brief decides

Beyond screens, fonts and colours, the brief settles the things that decided the outcome in real runs:

- **First screen.** Three to five questions a newcomer must be able to answer from the first screen in 10 seconds, with a headline sentence computed from the data. The build checks it on a quarter-size screenshot, where only what stands out survives.
- **Emphasis.** At most three levels, and which one or two values get the top level on each screen. Dense is fine; flat is not.
- **Where it beats today's tools.** One to three deliberate departures from how the real tools work, each tied to a weakness the research or the sponsor named. Everything else follows the domain's conventions.
- **Sponsor asks.** Each one is met by a named screen element or declined at the checkpoint. None is dropped silently.
- **Screen sizes.** The user's screen, the demo laptop, and a phone if a link is shared, with what changes at each.
- **Real data.** Example values, column widths and constant columns are taken from the dataset, not guessed.
- **Cold open.** What each screen shows to a judge who clicks around without the script.
- **Time.** With a deadline: a plan worked back from it, and a cut line that says what is dropped first.

## Use `parallax-domain-learn`

Run it after the event, pointing at the event's code repo:

```
/parallax-domain-learn C:\hack\bahn
```

Or: "Let's do the retro for the Bahn hackathon."

It loads the brief, critic reports, findings reports and build log, then asks what the judges and sponsor said, what the result was, which brief decisions held up, what the team changed and why, which critic findings were real, and what you'd do differently. It proposes candidate lessons, each with its archetype, rule, reason, scope and evidence. You confirm, edit or reject each one. Only confirmed lessons are saved, to `skills/parallax-domain/library/domains/<archetype>.md`, and the index is updated. A new ban goes into the ban list only if you confirm it as a ban. It commits, then asks before pushing.

## How the library and ban list grow

- `skills/parallax-domain/library/` starts empty. Entries only come from `parallax-domain-learn`, after you confirm them, so `parallax-domain` can treat them as confirmed rules.
- A rule seen again gains evidence and a higher count. A rule contradicted by a later event is marked contested with both sides, and nothing is removed without your say-so.
- This repo is public, so lessons and bans become public once pushed. `parallax-domain-learn` asks before every push; keep sponsor-confidential details out of the evidence lines.
- `skills/parallax-domain/references/ban-list.md` holds the six bans on the "AI look". New bans enter only through `parallax-domain-learn`. A logo or wordmark you choose to keep is exempt from the font and letter-spacing bans.

## Status

The skills have been through one dry run and one full run: planning, build and four critic rounds on a real hackathon project, done after the event. The lessons from both are in this repo. The current version has not yet been run end to end since the last round of changes, so expect rough edges, and open an issue with what you find.

## Layout

```
README.md                         install + usage
LICENSE                           MIT
.claude-plugin/
  plugin.json                     plugin manifest (name: parallax)
  marketplace.json                lets /plugin install it from this repo
skills/parallax-domain/
  SKILL.md
  references/
    research-playbook.md          what to find out and where to look
    brief-template.md             exact structure of the brief
    ban-list.md                   banned "AI look" patterns
    font-guidance.md              how to suggest fonts (human picks)
  assets/
    orchestrator-prompt.md        template for the coding session's instructions
    page-checks.js                layout checks, copied into the code repo
    agents/
      parallax-ui.md              subagent definition
      parallax-logic.md           subagent definition
      parallax-critic.md          subagent definition
  library/
    INDEX.md                      domain archetypes + pattern counts
    domains/                      one file per archetype, created by -learn
skills/parallax-domain-learn/
  SKILL.md
```

## Licence

MIT. See [LICENSE](LICENSE).
