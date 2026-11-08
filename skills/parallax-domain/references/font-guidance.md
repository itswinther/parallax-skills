# Font guidance

The AI suggests, the human decides. Never put a font in the brief that the human didn't pick at the checkpoint. If the human names their own pairing, check it against the criteria below and mention any problem once (for example missing tabular figures), then use it.

## What to check

| Criterion | Why it matters | How to check |
| --- | --- | --- |
| Legibility at small sizes and high density | Dense tools run at 12 to 14px for hours. Open shapes and a large x-height stay readable; tight, stylish faces blur. | Render a real table row from the dataset at 12px and 14px. |
| Tabular figures | Numbers compared in columns (times, prices, counts) must line up, and live values must not jitter as digits change. | Check that the font has the `tnum` OpenType feature (on its Google Fonts or foundry page, or with a tool like wakamaifondue.com), then render `11:11` above `08:08`. |
| Clear 0/O and 1/l/I | IDs, registration plates, VINs and codes get misread otherwise, and a misread ID is a wrong car or a wrong order. | Render the test string below. A slashed or dotted zero (`zero` feature) helps; check if it exists and whether it is on by default. |
| Language coverage | Names and places must render without fallback glyphs. Finnish and Swedish need ä ö å; names from other countries in the data may need more. | Render the test string. Check the font's language list or Unicode ranges against the names in the dataset. |
| A monospace for codes and logs | Where the domain shows codes, logs, raw messages or agent traces, a monospace keeps them scannable and visibly different from prose. | Suggest a mono only if the domain uses codes, logs or traces on screen. |
| Open licence | Hackathon repos are public. The font must be free to ship in a public repo and to use in a recorded demo. | SIL Open Font License (OFL) or Apache 2.0, from Google Fonts or Fontsource. |
| What real tools in the domain use | Users trust what looks familiar. The research (track 2) shows which faces the domain's real tools and design systems use. | If the real tools use a system font or a proprietary face, suggest an open face with similar proportions and say which one it stands in for. |

Test string:

```
0O 1lI| rn m 5S 8B 2Z  11:11 08:08  1 234,56 €  2026-10-21 09:00  Ääkkönen Åström Øresund
```

Swap in real IDs, names and numbers from the dataset where you have them.

## How to build the options

1. Start from the research: what the domain's real tools, standards or design systems use, and how dense the screens will be.
2. Assemble 2 to 3 pairings. A pairing is a UI face plus, only if the domain needs one, a monospace. A single family with a mono companion counts as a pairing.
3. Make the options really different, so the choice means something: for example one that matches what the domain's tools use, one tuned for maximum legibility, one with the best language coverage.
4. For each option, say why it fits *this* domain, in one or two lines that name the criteria it wins on. Generic praise ("clean, modern") is not a reason.
5. Don't reuse a pairing across projects out of habit. Each pairing has to be justified by this domain's research.

## Candidate pool

A starting point for finding open fonts that meet the criteria, not a default list. Verify features and licence at brief time; foundries update fonts.

| Family | Licence | Notes |
| --- | --- | --- |
| IBM Plex Sans + IBM Plex Mono | OFL | Designed for IBM's product UIs; broad language coverage; matching mono. |
| Source Sans 3 + Source Code Pro | OFL | Adobe's UI family; open shapes; matching mono. |
| Atkinson Hyperlegible Next + Atkinson Hyperlegible Mono | OFL | Braille Institute, designed so similar characters stay distinct for low-vision readers. |
| B612 + B612 Mono | OFL | Commissioned by Airbus for cockpit displays; built for small sizes and fast reading under stress. |
| Fira Sans + Fira Mono | OFL | Made for small screens; wide language coverage. |
| Noto Sans + Noto Sans Mono | OFL | Widest language coverage; a safe choice when the data has names from many scripts. |
| Public Sans | OFL | The US Web Design System's font; neutral, made for government services. |
| Inter + JetBrains Mono | OFL | Inter is designed for UI text and has tabular and slashed-zero features; JetBrains Mono is made for code. |

## Recording the pick

Once the human picks, section 7 of the brief lists for each role: family, weights used, OpenType features to turn on (`tnum`, `zero` where needed), the source (Google Fonts, or a Fontsource package with its pinned version), the licence, and the fallback stack. Name who picked it.
