# Ban list

Patterns that make a tool look AI-generated instead of like the real tools of its domain. Builders avoid them, and the critic checks for them in pass 2.

This list changes only through `parallax-domain-learn`, after the user confirms a new item as a ban. Project-specific additions belong in the brief's section 12, not here.

The "How the critic finds it" lines are search aids for existing bans, not extra bans. A grep hit is a lead to inspect, not automatically a violation.

## 1. Gradients and glow

**Banned:** gradient fills, glassmorphism, blurred blobs, glowing or neon borders, "AI sparkle" decoration.

**Why:** These carry no information, and in a tool colour has a job: it shows state. A gradient or glow competes with the status colours for attention and makes the screen look like a demo instead of something people work in for a shift. Blur and transparency also lower text contrast.

**Instead:** flat surfaces from the neutral tokens, 1px borders to separate regions, and elevation (a small, soft shadow) only for things that float above the page, such as menus and dialogs. Let the semantic status colours be the only saturated colour on screen.

**Not covered:** a colour scale that encodes data, such as a heat map legend. That is a chart, governed by the brief's chart rules.

**How the critic finds it:** grep for `linear-gradient`, `radial-gradient`, `conic-gradient`, `bg-gradient-`, `from-` with `to-` classes, `backdrop-filter`, `backdrop-blur`, `blur(`, `filter: blur`, `box-shadow` with a zero offset and a large blur, `drop-shadow`, `glow`, `neon`, `Sparkles`, `✨`, `bg-clip-text` with `text-transparent`. In screenshots, look for colour fading across a surface and halos around borders or buttons.

## 2. Marketing-page layout on a tool

**Banned:** hero sections, taglines, "AI-powered" copy, big centred headings, feature-card grids.

**Why:** A tool's user has already chosen it; they open it to work. A landing-page layout pushes the work below the fold and tells the judges the team built a pitch instead of a product. "AI-powered" says nothing about what the system did.

**Instead:** open straight into the working view (the queue, the table, the map). Put the product name small in the top bar. Left-align headings at the size of the content they label. Describe what the system did in the domain's words, for example "Checked 3 later ferry departures; 14:30 has space", instead of labelling it as AI.

**How the critic finds it:** grep for `hero`, `tagline`, `AI-powered`, `Powered by AI`, `AI-driven`, `text-center` on page-level headings, `text-4xl` and larger, and grids of cards that each hold an icon, a title and a sentence. In screenshots, check what is above the fold on first load.

## 3. Small dots that serve no purpose

**Banned:** small dots that serve no purpose. A dot is allowed only if it encodes a state that is also explained in text or a legend.

**Why:** Decorative dots (before list items, next to headings, "live" pulses with nothing behind them) read as status indicators, so users look for a meaning that isn't there. A real status dot that nobody explains is just as bad: colour alone fails colour-blind users and anyone looking at a washed-out projector.

**Instead:** use a text status label, or an icon paired with a label. If a dot earns its place, for example in a dense table column, pair it with a visible text label or a legend on the same screen.

**How the critic finds it:** grep for `rounded-full` with small fixed sizes (`w-1` to `w-3`, `h-1` to `h-3`), `border-radius: 50%` on elements under about 12px, `•`, `·` used as decoration, `animate-pulse`, `animate-ping`. For each dot found in a screenshot, find the text or legend that explains it.

## 4. Eyebrows without a real purpose

**Banned:** small labels above headings that repeat the heading, the section or the navigation, or that add nothing.

**Why:** An eyebrow such as "OVERVIEW" above "Overview", or "DASHBOARD" above a section the sidebar already names, costs vertical space and attention in a dense tool and says nothing new. It is a marketing-page habit.

**Instead:** delete it. If the label carries information the heading doesn't, such as an order number above a customer name, keep it and style it as data, not as decoration.

**How the critic finds it:** look for small uppercase or letter-spaced text directly above a heading: grep for `uppercase` with `tracking-` classes, `letter-spacing` on small text, `eyebrow`, `overline`, `kicker`. Compare each one with its heading and the navigation.

## 5. Random italics

**Banned:** italics used for flair or emphasis. Italics appear only where an established convention requires them.

**Why:** Italic text is harder to read at small sizes and on low-resolution screens, and when it is used for mood it looks like styling for its own sake. In a tool, emphasis should mean something specific.

**Instead:** use weight or a semantic colour token for emphasis, sparingly, and only where the brief says so. Use italics only where a convention demands them, for example scientific names or mathematical variables, and name that convention in the brief.

**How the critic finds it:** grep for `italic`, `font-style: italic`, `<em>`, `<i>` that wraps text rather than an icon, and `*text*` in rendered Markdown. For each, find the convention the brief names.

## 6. Fonts picked by the AI

**Banned:** any font the human didn't pick. The skill only suggests; the human chooses at the checkpoint.

**Why:** Left to itself, an AI reaches for the same few fashionable fonts every time, which is part of why AI-made tools look alike. The font also has to fit the domain (small sizes, tabular figures, clear 0/O and 1/l/I, language coverage), and that judgement belongs to the person who knows the team and the sponsor.

**Instead:** use only the families, weights and fallback stacks listed in the brief's section 7. Don't add web fonts, and don't let a component library load its own font.

**How the critic finds it:** grep for `font-family`, `@font-face`, `fonts.googleapis`, `@fontsource`, `next/font`, `fontFamily` in Tailwind or theme config. In the running app, list the families actually rendered, for example with Playwright: collect `getComputedStyle(el).fontFamily` for all elements and check `document.fonts`. Flag any family not named in the brief.

## Confirmed additions

Bans added through `parallax-domain-learn` after the user confirmed them. Each has the same parts as above, plus the event where it was learned.

None yet.
