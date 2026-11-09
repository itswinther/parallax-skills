# Research playbook

A guide to what to find out, where to look and how to judge what you find. It is not a rulebook: the domain decides the design, and this file only helps you find out what the domain is like. Examples below are illustrations, not defaults.

## The question list

Research is sufficient when every question here has an answer backed by a source, or is explicitly listed as an assumption, and new searches have stopped changing the answers.

| # | Question | A good answer looks like |
| --- | --- | --- |
| Q1 | Who is the primary user? Role, expertise, the vocabulary they use. | A job title as the industry writes it, years of experience typical for the role, and 10 to 20 words they use for the things on screen (for example "ETA", "POD", "no-show", "exception"). If the challenge names several roles or desks, the primary user is the one the idea serves; list the others as secondary users. |
| Q2 | Where and how do they use it? Desk, control room, field, mobile, gloves, sunlight, multiple monitors, shared screen. | Device, screen count, size and resolution, posture, lighting, noise, whether others look at the same screen. The resolution sets the brief's primary viewport; if no source gives it, say so, because it becomes a sponsor question. |
| Q3 | How often, and for how long? Glance vs. long shifts. Interruptions. | Shift length, how many items they handle per hour, how often they are interrupted and by what (calls, radio, alarms). Counts computed from the challenge data are valid evidence when no public source exists; state the query and scale it to the sponsor's stated volume. |
| Q4 | What's at stake? Stress level, cost of errors, time pressure. | The worst realistic mistake and what it costs (money, safety, a customer), and how fast a decision must be made. |
| Q5 | What do they use today? Named products, Excel, radio, paper. | Product names, plus what they complain about in those products. |
| Q6 | What are the core decisions they make, and what information does each decision need? | A list of decisions, each with its trigger, the facts needed, who else is involved, and what "done" looks like. |
| Q7 | What do real tools in this industry look like? Layout, density, navigation, colour meaning, table/map/timeline/queue/form conventions. | At least three named products, each with links to actual screenshots, docs or demo videos, and notes on layout, density, navigation, what colour means, and the typeface where you can identify it. |
| Q8 | Which standards or constraints apply? | The standards that apply and the concrete rules they impose on this UI, or a sourced statement that none apply. Examples: ISA-101 and ISO 11064 for industrial and control-room HMI, accessibility rules for the public sector, national design systems, language requirements such as Finnish and Swedish characters. If the idea includes an AI agent, also the rules on what it must disclose and where a person must stay in the loop (for example AI disclosure and human-oversight laws, platform-work rules). |
| Q9 | Data conventions: units, number formats, ID formats, time zones. | Formats as users read them (decimal separator, date format, 24-hour clock), ID patterns with a real-looking example, the time zone users think in. |

Q6 is the one to get most right. Screens are derived from decisions, so a vague answer here produces a vague brief.

## Research tracks for parallel subagents

| Track | Questions | Lean on these sources |
| --- | --- | --- |
| 1. Users and tasks | Q1 to Q6 | Job postings, practitioner communities, day-in-the-life articles and videos, trade press, the challenge's own data and transcripts |
| 2. Real tools and UI conventions | Q7, plus Q5 product names from track 1 if known | Vendor help centres and user guides, demo videos, review-site screenshots, conference talks |
| 3. Standards, constraints, data conventions | Q8, Q9 | Standards bodies, regulators, national design systems, government guidance, format standards |

### Subagent brief (fill and send one per track)

Leave out the library lines when no library rules apply; they only add noise.

```
You are researching the domain for a hackathon UI brief. Do live web research and stop only
when new searches no longer change your answers.

Search budget: about <n> web searches this round. Web searches are shared with the other
research tracks running now, so spend them on your weakest questions first. If you run out,
say which questions are still thin; another round will follow.
Page access: <"pages open normally" or "vendor and standards sites could not be fetched; rely on
search results and say so">.
PDFs: if a fetch returns a PDF as binary, save the file and read it instead of settling for the
search snippet. Seminar and training slide decks often hold the only real screenshots of a tool.

Challenge: <one paragraph>
Chosen idea: <one paragraph>
Sponsor: <name and what they do>
Users named in the brief: <roles or desks; say which one the idea serves>
Data highlights: <entities, notable fields, formats, and any counts already computed>
Library rules already confirmed for this archetype: <list>

Your track: <track name>
Answer these questions: <Q-numbers with their text from the playbook>
Lean on these sources: <from the track table>
Do not use as evidence: Dribbble, Behance, UI-kit marketplaces, template galleries, AI-generated
mockups, vendor hero images that are clearly mockups.

Return, for each question:
- Answer: concrete, as long as it needs to be. For Q7, a table with one row per product view
  (product, view, source URL, what it shows) plus a short summary.
- Evidence: bullet list of URL + what exactly it shows (for screenshots: product, view, what the
  layout/density/colours are). Say whether you read the page or only a search result.
- Confidence: high (2+ independent sources or a standard), medium (1 good source), low (inference).
- Open: what you could not settle, and what would settle it.
Then list anything surprising that the designer should know, and any library rule your findings
support or contradict.
```

## Where to look

| Source type | Good for | Watch out for |
| --- | --- | --- |
| Vendor help centres, knowledge bases, user guides, release notes | Real screenshots of real views, field names, workflow steps, keyboard shortcuts | Old screenshots; note the date |
| Product demo videos and webinars | Real density, interaction speed, what is on screen during a typical task | Note the timestamp you used |
| Review sites (G2, Capterra and similar) | User-uploaded screenshots; complaints reveal pain points | Reviews can be vendor-seeded |
| Job postings for the role | Tools used, vocabulary, shift patterns, KPIs the role is measured on | Wish lists, not daily reality |
| Practitioner communities (subreddits for the role, trade forums, LinkedIn posts) | Vocabulary, workarounds, what people hate about current tools | Anecdote; look for repetition |
| Trade press and industry associations | Market leaders, regulation in practice, typical volumes | Sponsored content |
| Standards bodies and regulators | Hard constraints (alarm design, accessibility, language) | Paywalled standards: use official summaries and secondary sources, say so |
| National design systems and government guidance | Public-sector UI rules, accessibility, language versions | Check it applies to this sponsor |
| Academic human-factors and HCI papers | Control rooms, situation awareness, alarm floods, interruption | Lab settings; check the population |
| Format standards (for example ISO 8601 dates, ISO 3779 VIN, ISO 3166 country codes) | Data conventions, validation rules | The users' local habits may differ from the standard |
| The challenge's own material (brief, data, transcripts, mockups, starter app) | What the sponsor already believes, vocabulary, the messy parts of the data | A starter UI is often "how it works today", not the answer |

Do not use as evidence: Dribbble, Behance, UI-kit marketplaces, dashboard template galleries, AI-generated mockups. They show what designers imagine, not what users use, and they are the source of the look this skill exists to avoid.

## Methods

- **Name products first, then find their screens.** Search for "<product> user guide", "<product> help center <feature>", "<product> demo", "<product> screenshot <view>". Screens found this way are real; screens found by searching "<industry> dashboard" usually aren't.
- **Find the role, then its day.** Search "<role> day in the life", "<role> job description", "<role> shift", "<role> software". The role's own words beat the vendor's.
- **Record each screenshot you rely on:** product, view, URL, date if known, and what it shows about layout, density, navigation and colour meaning.
- **Triangulate.** Treat a UI convention as established when at least two independent products or a standard show it. One product is a data point.
- **Look for where tools differ.** Differences between real tools mark the design decisions; agreement marks conventions to follow.
- **Use the challenge data.** Fields that disagree, free-text notes, and ambiguous statuses show where the users' real work is. Count it too: how many records would need a person, how severities and statuses are distributed. A skewed distribution (for example most alerts marked "high") tells you that ranking by the data's own severity won't work.
- **Know your reach.** If pages can't be opened, search results still name products and conventions, but they rarely show density, row height, empty states or typefaces. Mark those as assumptions instead of guessing them from text.
- **Separate fact, source and confidence** in your notes, so the brief can cite and the checkpoint can flag weak spots.
- **Read PDFs, don't skip them.** Standards, regulator guidance and seminar slide decks usually come as PDFs, and a fetch can return them as binary. Save the file and read it: the Read tool renders the pages, including slides that show a tool's real screens. In one run this was how most of the real screens of the domain's tools were seen.
- **Stop at saturation.** When a full round of new searches changes no answer, stop. Until then, keep going, within the time budget the skill sets. A round searches every thin question again with different terms or sources; two or three extra searches are not a round.
- **Remember who judges.** At sponsored hackathons the judges are often the sponsor's operations staff or their managers, so domain-correct details are noticed.

## Output format: domain-research.md

```
# Domain research: <project name>

Date: <YYYY-MM-DD> · Challenge: <name> · Idea: <one line> · Sponsor: <name>
Method: <n> research rounds · <pages and screenshots opened, or search results only>

## Inputs extracted
Sponsor, real users, judging criteria with weights, deadline with time zone, hand-in format,
data schema summary, starter stack with versions.

## Library rules applied
- <archetype> / <rule> — how it applies here (or "Library has no matching archetype yet.")

## Answers
### Q1 Primary user
Answer. Evidence (links). Confidence.
... one subsection per question Q1–Q9 ...

## Real tools reviewed
| Product | View | Source | What it shows |

## Vocabulary
| Term users say | Meaning | Use in UI as |

## Conflicts with the library
<rule> — library says ..., research says ... (sources). Or "None."

## Assumptions
- <assumption> — why we assume it, what changes if it's wrong

## Sponsor questions
- <question> — if yes: ..., if no: ...

## Sources
Numbered list of every URL used, with a one-line description.
```
