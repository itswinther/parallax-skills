// Parallax page checks: mechanical layout checks, so the critic's time goes to domain problems.
//
// This file is one expression. Evaluate it in the page and it returns a report object:
//   const report = await page.evaluate(fs.readFileSync("docs/parallax/page-checks.js", "utf8"));
//
// Before evaluating, wait until the page is really ready, or the report describes a half-loaded page:
//   await page.evaluate(() => document.fonts.ready);   // widths change when a web font arrives
//   await page.waitForSelector("<a real data row>");   // wait for rows, not for a fixed delay
//
// Run it on every screen at every viewport in brief section 2. Each entry is a lead to look at,
// not a verdict: a column that truncates by design and keeps its full value in a tooltip is fine.
(() => {
  const LIMIT = 40;
  const clips = (v) => v === "hidden" || v === "clip";
  const flows = (s) => s.position === "static" || s.position === "relative";
  const text = (el) => (el.innerText || "").replace(/\s+/g, " ").trim();
  const ownText = (el) =>
    [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(" ").replace(/\s+/g, " ").trim();
  const shown = (el, s) => {
    const r = el.getBoundingClientRect();
    return r.width > 1 && r.height > 1 && s.visibility !== "hidden" && s.display !== "none" && s.opacity !== "0";
  };
  const where = (el) => {
    const parts = [];
    for (let e = el; e && e !== document.body && parts.length < 4; e = e.parentElement) {
      const cls = typeof e.className === "string" && e.className.trim() ? "." + e.className.trim().split(/\s+/).slice(0, 2).join(".") : "";
      parts.unshift(e.tagName.toLowerCase() + (e.id ? "#" + e.id : cls));
    }
    return parts.join(" > ");
  };

  const cutText = [];      // text wider than its box, with the rest hidden
  const clippedAreas = []; // content taller than its box, hidden, and no scrollbar to reach it
  const spills = [];       // text wider than its box and not hidden, so it is drawn over its neighbour
  const overlaps = [];     // two neighbouring boxes with text, drawn on top of each other
  const families = new Map();

  for (const el of document.querySelectorAll("body *")) {
    const s = getComputedStyle(el);
    if (!shown(el, s)) continue;
    const t = text(el);

    if (ownText(el)) {
      const family = s.fontFamily.split(",")[0].replace(/["']/g, "").trim();
      families.set(family, (families.get(family) || 0) + 1);
    }
    if (!t || el.clientWidth <= 1 || el.clientHeight <= 1) continue;

    if (el.scrollWidth > el.clientWidth + 1 && (clips(s.overflowX) || s.textOverflow === "ellipsis")) {
      cutText.push({ where: where(el), text: t.slice(0, 80), hasTitle: !!el.closest("[title]"), shownPx: el.clientWidth, neededPx: el.scrollWidth });
    }
    if (el.scrollWidth > el.clientWidth + 1 && s.overflowX === "visible" && ownText(el) && !(el instanceof SVGElement)) {
      spills.push({ where: where(el), text: ownText(el).slice(0, 60), shownPx: el.clientWidth, neededPx: el.scrollWidth });
    }
    if (el.scrollHeight > el.clientHeight + 4 && clips(s.overflowY)) {
      clippedAreas.push({ where: where(el), text: t.slice(0, 60), shownPx: el.clientHeight, neededPx: el.scrollHeight });
    }

    const kids = [...el.children].filter((k) => {
      const ks = getComputedStyle(k);
      return shown(k, ks) && flows(ks) && text(k);
    });
    if (kids.length > 1 && kids.length <= 40) {
      const rects = kids.map((k) => k.getBoundingClientRect());
      for (let i = 0; i < kids.length; i++) {
        for (let j = i + 1; j < kids.length; j++) {
          const w = Math.min(rects[i].right, rects[j].right) - Math.max(rects[i].left, rects[j].left);
          const h = Math.min(rects[i].bottom, rects[j].bottom) - Math.max(rects[i].top, rects[j].top);
          if (w > 2 && h > 2) overlaps.push({ where: where(el), a: text(kids[i]).slice(0, 40), b: text(kids[j]).slice(0, 40), overlapPx: Math.round(w) });
        }
      }
    }
  }

  const root = document.documentElement;
  const rootStyle = getComputedStyle(root);
  const bodyStyle = getComputedStyle(document.body);
  const cap = (list) => ({ count: list.length, items: list.slice(0, LIMIT) });

  return {
    url: location.href,
    viewport: innerWidth + "x" + innerHeight,
    // The page is wider than the window: on a phone this means sideways scrolling or a zoomed-out layout.
    pageWiderThanWindow: root.scrollWidth > innerWidth + 1 ? { windowPx: innerWidth, pagePx: root.scrollWidth } : null,
    // The page is taller than the window but cannot scroll, so whatever is below the fold is unreachable.
    pageCutOffBelow:
      root.scrollHeight > innerHeight + 1 && (clips(rootStyle.overflowY) || clips(bodyStyle.overflowY))
        ? { windowPx: innerHeight, pagePx: root.scrollHeight }
        : null,
    cutText: cap(cutText),
    clippedAreas: cap(clippedAreas),
    spills: cap(spills),
    overlaps: cap(overlaps),
    fontFamiliesRendered: Object.fromEntries(families),
    fontsLoaded: [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family.replace(/["']/g, "") + " " + f.weight),
  };
})()
