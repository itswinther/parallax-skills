# Font guidance

The AI suggests, the human decides. Never put a font in the brief that the human didn't pick at the checkpoint. If the human names their own pairing, check it against the criteria below and mention any problem once (for example missing tabular figures), then use it.

## What to check

| Criterion | Why it matters | How to check |
| --- | --- | --- |
| Legibility at small sizes and high density | Dense tools run at 12 to 14px for hours. Open shapes and a large x-height stay readable; tight, stylish faces blur. | Render a real table row from the dataset at 12px and 14px. |
| Tabular figures | Numbers compared in columns (times, prices, counts) must line up, and live values must not jitter as digits change. | Measure the advance widths of 0–9 in the file you'll ship. Many UI fonts have tabular digits by default and no `tnum` feature at all; others have proportional defaults and need `tnum` turned on. Either works, as long as the brief says which. |
| Clear 0/O and 1/l/I | IDs, registration plates, VINs and codes get misread otherwise, and a misread ID is a wrong car or a wrong order. | Render the test string below and look at it. Some families draw capital I and lowercase l identically, which rules them out for codes. A slashed or dotted zero helps; check whether it is the default glyph or needs the `zero` feature. |
| Language coverage | Names and places must render without fallback glyphs. Finnish and Swedish need ä ö å; names from other countries in the data may need more. | Render the test string. Check the font's language list or Unicode ranges against the names in the dataset. |
| A monospace for codes and logs | Where the domain shows codes, logs, raw messages or agent traces, a monospace keeps them scannable and visibly different from prose. | Suggest a mono only if the domain uses codes, logs or traces on screen. |
| Open licence | Hackathon repos are public. The font must be free to ship in a public repo and to use in a recorded demo. | SIL Open Font License (OFL) or Apache 2.0, from Google Fonts or Fontsource. System fonts are not shipped, so they need no licence check. |
| What real tools in the domain use | Users trust what looks familiar. The research (track 2) shows which faces the domain's real tools and design systems use. | If the real tools use a proprietary face, suggest an open face with similar proportions and say which one it stands in for. If they use the system font stack, that stack is itself an option (see below). |

Test string:

```
0O 1lI| rn m 5S 8B 2Z  11:11 08:08  1 234,56 €  2026-10-21 09:00  Ääkkönen Åström Øresund
```

Swap in real IDs, names and numbers from the dataset where you have them.

## Check the file you'll ship

Check the exact package the builders will install, not the foundry's description. Webfont builds (Fontsource, Google Fonts subsets) can carry fewer OpenType features than the foundry release: the Fontsource builds checked for this guide kept only a handful, such as `frac` and `liga`, so a `zero` or stylistic-set feature named on a foundry page may be missing. If the font CDN is blocked, the npm registry usually isn't:

```sh
npm pack @fontsource/<family>@<version>      # then extract the .tgz
pip install fonttools brotli pillow
```

```python
from fontTools.ttLib import TTFont
f = TTFont("<extracted>/package/files/<family>-latin-400-normal.woff2")
cmap, hmtx = f.getBestCmap(), f["hmtx"]
print("digit widths:", sorted({hmtx[cmap[ord(c)]][0] for c in "0123456789"}))   # one width = tabular
print("features:", sorted({r.FeatureTag for r in f["GSUB"].table.FeatureList.FeatureRecord}) if "GSUB" in f else "none")
f.flavor = None; f.save("check.ttf")   # Pillow can render the .ttf: ImageFont.truetype("check.ttf", 48)
```

Render the test string at a large size (48px) for the 0/O and 1/l/I check, and look at the image.

## The system font stack

`system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` is what some real tools use (Zendesk's agent workspace, for example). It loads nothing and feels native on every machine. The costs: it renders differently per operating system, tabular figures and a distinct zero are not guaranteed, and the demo video shows only the recording machine's font. Offer it when the domain's tools use it, pair it with an open monospace for codes, and say these costs at the checkpoint. It is still the human's pick, like any other font.

## How to build the options

1. Start from the research: what the domain's real tools, standards or design systems use, and how dense the screens will be.
2. Assemble 2 to 3 pairings. A pairing is a UI face plus, only if the domain needs one, a monospace. A single family with a mono companion counts as a pairing.
3. Make the options really different, so the choice means something: for example one that matches what the domain's tools use, one tuned for maximum legibility, one with the best language coverage.
4. Check every option in the shipped files, as above. Drop any that fails a criterion the domain depends on, and say at the checkpoint which ones you dropped and why.
5. For each option, say why it fits *this* domain, in one or two lines that name the criteria it wins on. Generic praise ("clean, modern") is not a reason.
6. Don't reuse a pairing across projects out of habit. Each pairing has to be justified by this domain's research.

## Candidate pool

A starting point for finding open fonts that meet the criteria, not a default list. Rows marked "checked" were inspected in the Fontsource 5.3.x packages on 2026-11-08 (Latin subset, weight 400); re-check them at brief time, because packages change. The rest are unchecked.

| Family | Licence | Notes |
| --- | --- | --- |
| IBM Plex Sans + IBM Plex Mono | OFL | Checked. Sans: tabular digits by default, capital I with serifs, no slashed zero in this build. Mono: dotted zero, tabular. Broad language coverage. |
| Atkinson Hyperlegible Next + Atkinson Hyperlegible Mono | OFL | Checked. Next: slashed zero and distinct 1/l/I by default; proportional digits by default, `tnum` available. Mono: slashed zero, tabular. Designed so similar characters stay distinct for low-vision readers. |
| Source Sans 3 + Source Code Pro | OFL | Checked. Source Sans 3: capital I and lowercase l look identical, so keep IDs out of it. Source Code Pro: dotted zero, tabular. |
| B612 + B612 Mono | OFL | Checked. Commissioned by Airbus for cockpit displays. B612: capital I and lowercase l look identical, zero not distinguished. B612 Mono: distinct 1/l/I, zero not distinguished. Wide letterforms cost density. |
| Fira Sans + Fira Mono | OFL | Unchecked. Made for small screens; wide language coverage. |
| Noto Sans + Noto Sans Mono | OFL | Unchecked. Widest language coverage; a safe choice when the data has names from many scripts. |
| Public Sans | OFL | Unchecked. The US Web Design System's font; neutral, made for government services. |
| Inter + JetBrains Mono | OFL | Unchecked. Inter is designed for UI text; check whether its tabular and slashed-zero features survive in the build you ship. JetBrains Mono is made for code. |

## Recording the pick

Once the human picks, section 7 of the brief lists for each role: family, weights used, whether digits are tabular by default or need `tnum`, other OpenType features to turn on (`zero` where needed and present), the source (Google Fonts, or a Fontsource package with its pinned version), the licence, and the fallback stack. Name who picked it.
