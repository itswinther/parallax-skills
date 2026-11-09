# Parallax

Two Claude Code skills for hackathons.

- **`parallax-domain`** takes a challenge and the idea your team chose, researches how real users in that domain work and what their real tools look like, and writes an exact brief and build plan. A separate coding session (an orchestrator with UI, logic and critic subagents) builds from it. The goal is a UI that looks and behaves like the industry's real tools, not like a typical AI-generated app.
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

- Claude Code with access to Opus 5.5 (`claude-opus-5-5`) and Sonnet 5.5 (`claude-sonnet-5-5`).
- Web search enabled, and web fetch able to open vendor help centres and standards sites, for the domain research. Where pages are blocked (some cloud sessions allow only a short host list), the skill falls back to search results and says so at the checkpoint. Searches are shared by the parallel research tracks within one turn, so deep research can take more than one round.
- `npm` (or `pip`) on the path, so the skill can pin package versions when it writes the brief.
- Playwright in the code repo during the build, for the critic's screenshots. The orchestrator adds it if it's missing.

## Use `parallax-domain`

Give it the challenge brief (file, pasted text or link), the chosen idea and the path of the code repo. Add the dataset, starter repo, judging criteria, deadline or sponsor info if you have them.

```
/parallax-domain challenge: C:\hack\bahn\PARTICIPANT-BRIEF.md | idea: an exceptions-first control room where an on-the-road agent handles missed ferries and asks the operator to approve the new plan | repo: C:\hack\bahn
```

Plain language works too: "We chose the exceptions queue idea for the Bahn challenge. The brief and data are in C:\hack\bahn. Plan the UI."

What happens:

1. It reads your inputs and its pattern library, then researches the domain live: users and tasks, real tools and their UI conventions, standards and data conventions. It writes `docs/parallax/domain-research.md`.
2. **It stops once.** You get the users and tasks with sources, the proposed screens, 2 to 3 font pairings to choose from, a palette, the stack with pinned versions and a fallback, the demo hero moment, any conflicts with the library, and questions to ask the sponsor. It also writes all of this to `docs/parallax/checkpoint.md`, so you can read it in full while answering. You pick the fonts and approve or change the rest.
3. It finishes without stopping again and writes, in the code repo:

| File | What it is |
| --- | --- |
| `docs/parallax/brief.md` | The brief: 15 sections, from users and screens to acceptance criteria |
| `docs/parallax/domain-research.md` | Research notes with sources |
| `docs/parallax/checkpoint.md` | What was proposed at the checkpoint, and what you chose |
| `docs/parallax/orchestrator-prompt.md` | The prompt for the coding session, also printed in chat |
| `.claude/agents/parallax-ui.md` | UI builder |
| `.claude/agents/parallax-logic.md` | Data, API, agent logic and mock data builder |
| `.claude/agents/parallax-critic.md` | Read-only critic |

4. Start the coding session in the code repo and paste the prompt:

```sh
cd <code-repo>
claude --model claude-opus-5-5 --effort high
```

That session is the orchestrator. It sets up the stack, writes the UI ↔ logic contract into code, runs the builders in parallel, integrates, runs the critic, verifies each finding with its own research, and reports to you before fixing anything.

| Agent | Model | Effort | Job |
| --- | --- | --- | --- |
| Orchestrator (main session) | Opus 5.5 | high | Owns the brief and the contract, coordinates, integrates, verifies, reports |
| `parallax-ui` | Opus 5.5 | medium | Builds screens and components exactly to the brief |
| `parallax-logic` | Opus 5.5 | medium | Builds the data layer, API, agent and business logic, mock data |
| `parallax-critic` | Sonnet 5.5 | default | Read-only: walks through every task as the real user, then checks the ban list |

During the build the orchestrator also writes `docs/parallax/critic-report-<n>.md`, `docs/parallax/findings-report.md` and `docs/parallax/build-log.md`. The retro reads them.

## Use `parallax-domain-learn`

Run it after the event, pointing at the event's code repo:

```
/parallax-domain-learn C:\hack\bahn
```

Or: "Let's do the retro for the Bahn hackathon."

It loads the brief, critic reports, findings report and build log, then asks what the judges and sponsor said, what the result was, which brief decisions held up, what the team changed and why, which critic findings were real, and what you'd do differently. It proposes candidate lessons, each with its archetype, rule, reason, scope and evidence. You confirm, edit or reject each one. Only confirmed lessons are saved, to `skills/parallax-domain/library/domains/<archetype>.md`, and the index is updated. A new ban goes into the ban list only if you confirm it as a ban. It commits, then asks before pushing.

## How the library and ban list grow

- `skills/parallax-domain/library/` starts empty. Entries only come from `parallax-domain-learn`, after you confirm them, so `parallax-domain` can treat them as confirmed rules.
- A rule seen again gains evidence and a higher count. A rule contradicted by a later event is marked contested with both sides, and nothing is removed without your say-so.
- This repo is public, so lessons and bans become public once pushed. `parallax-domain-learn` asks before every push; keep sponsor-confidential details out of the evidence lines.
- `skills/parallax-domain/references/ban-list.md` holds the six bans on the "AI look". New bans enter only through `parallax-domain-learn`.

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
    orchestrator-prompt.md        template for the paste-ready prompt
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
