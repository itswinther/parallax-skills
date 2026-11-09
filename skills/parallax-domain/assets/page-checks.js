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
// not a verdict: a column that truncates by design and keeps its full value in a tooltip is fine,
// and so is a Decision column that reads "—" on every row before anyone has decided.
//
// The thumbnail test (brief section 6) needs a quarter-size screenshot of the same layout:
//   const small = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 0.25 });
//   await small.goto(url); /* wait as above */ await small.screenshot({ path: "first-screen-thumb.png" });
// The page still lays out at W x H; only the pixels shrink. Look at that image before the full one.
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

  // Table columns that carry no signal in the data on screen: one value on nearly every row,
  // or a status colour on most rows. Such a column belongs in a summary line, with only the
  // exceptions left in the rows.
  const sameValueColumns = [];
  const colouredColumns = [];
  const saturated = (css) => {
    const m = css.match(/[\d.]+/g);
    if (!m || m.length < 3 || (m.length > 3 && Number(m[3]) === 0)) return false;
    const [r, g, b] = m.slice(0, 3).map(Number);
    return Math.max(r, g, b) - Math.min(r, g, b) > 60;
  };
  for (const table of document.querySelectorAll("table")) {
    if (!shown(table, getComputedStyle(table))) continue;
    const rows = [...table.querySelectorAll("tbody tr")].filter((r) => shown(r, getComputedStyle(r)));
    const widths = rows.map((r) => r.cells.length);
    const usual = widths.sort((a, b) => widths.filter((w) => w === b).length - widths.filter((w) => w === a).length)[0];
    const dataRows = rows.filter((r) => r.cells.length === usual);
    if (dataRows.length < 5) continue;
    const heads = [...table.querySelectorAll("thead th")].map((th) => text(th));
    for (let c = 0; c < usual; c++) {
      const cells = dataRows.map((r) => r.cells[c]);
      const values = cells.map((cell) => text(cell));
      const counts = {};
      for (const v of values) counts[v] = (counts[v] || 0) + 1;
      const [top, n] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
      const name = heads[c] || "column " + (c + 1);
      if (top && n / cells.length >= 0.8) sameValueColumns.push({ table: where(table), column: name, value: top.slice(0, 40), rows: n + " of " + cells.length });
      const coloured = cells.filter((cell) =>
        text(cell) &&
        [cell, ...cell.querySelectorAll("*")].some((el) => {
          const cs = getComputedStyle(el);
          return saturated(cs.backgroundColor) || (ownText(el) && saturated(cs.color));
        })
      ).length;
      if (coloured / cells.length > 0.5) colouredColumns.push({ table: where(table), column: name, rows: coloured + " of " + cells.length });
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
    sameValueColumns: cap(sameValueColumns),
    colouredColumns: cap(colouredColumns),
    fontFamiliesRendered: Object.fromEntries(families),
    fontsLoaded: [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family.replace(/["']/g, "") + " " + f.weight),
  };
})()
