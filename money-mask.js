// ============================================================================
// money-mask.js — auto-mask all currency values across the app.
// • Walks DOM, wraps any text matching ฿XXX,XXX with <span data-money>
// • When body has class "mask-money" (default ON), textContent is swapped
//   to "฿*****" (real value stashed on data-money-real). Hover reveals.
// • Toggle via window.toggleMoneyMask() — wired up by PersonaShell topbar
// ============================================================================

(function () {
  const MASK_TEXT = "฿*****";
  // Match Thai baht symbol (฿) followed by digits/commas/decimals, plus
  // optional K/M suffix (e.g. ฿7.58M, ฿1.82M). Greedy but bounded.
  const MONEY_RE = /฿\s*[\d,]+(?:\.\d+)?(?:[KMBkmb])?/g;
  const TAG_SKIP = new Set(['STYLE', 'SCRIPT', 'NOSCRIPT', 'INPUT', 'TEXTAREA']);

  function isMoneyText(s) { return s && /฿\s*[\d,]/.test(s); }

  // Apply the visible state (masked text vs real text) to one element.
  function paint(el, masked) {
    if (!el) return;
    if (!el.dataset.moneyReal) el.dataset.moneyReal = el.textContent;
    const want = masked ? MASK_TEXT : el.dataset.moneyReal;
    if (el.textContent !== want) el.textContent = want;
  }
  function paintAll() {
    const masked = document.body.classList.contains('mask-money');
    document.querySelectorAll('[data-money]').forEach(el => paint(el, masked));
  }

  function wrapMoneyIn(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => {
        const p = n.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        if (p.hasAttribute('data-money')) return NodeFilter.FILTER_REJECT;
        if (p.closest('[data-money]')) return NodeFilter.FILTER_REJECT;
        if (TAG_SKIP.has(p.tagName)) return NodeFilter.FILTER_REJECT;
        return isMoneyText(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    for (const node of nodes) {
      const text = node.nodeValue;
      const parts = [];
      let last = 0;
      let m;
      MONEY_RE.lastIndex = 0;
      while ((m = MONEY_RE.exec(text))) {
        if (m.index > last) parts.push({ t: text.slice(last, m.index), money: false });
        parts.push({ t: m[0], money: true });
        last = m.index + m[0].length;
      }
      if (last < text.length) parts.push({ t: text.slice(last), money: false });
      if (parts.length === 0) continue;
      const frag = document.createDocumentFragment();
      for (const p of parts) {
        if (p.money) {
          const span = document.createElement('span');
          span.setAttribute('data-money', '');
          span.dataset.moneyReal = p.t;
          span.textContent = document.body.classList.contains('mask-money') ? MASK_TEXT : p.t;
          frag.appendChild(span);
        } else if (p.t) {
          frag.appendChild(document.createTextNode(p.t));
        }
      }
      node.parentNode && node.parentNode.replaceChild(frag, node);
    }
  }

  let scheduled = false;
  function scheduleWrap() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      wrapMoneyIn(document.body);
    });
  }

  function startObserver() {
    if (!document.body) return;
    const obs = new MutationObserver((muts) => {
      // Skip if all mutations are inside [data-money] (our own writes)
      for (const m of muts) {
        const t = m.target;
        if (t && t.nodeType === 1 && (t.hasAttribute && (t.hasAttribute('data-money') || t.closest('[data-money]')))) continue;
        scheduleWrap();
        return;
      }
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    scheduleWrap();
  }

  // Body class management — default ON (masked)
  const KEY = 'humi-mask-money';
  function applyState() {
    const saved = localStorage.getItem(KEY);
    const on = saved === null ? true : saved !== 'false';
    if (document.body) document.body.classList.toggle('mask-money', on);
    return on;
  }

  // Hover-to-reveal: temporarily swap to real value on mouseenter,
  // restore to mask on mouseleave (only while body.mask-money is on).
  function bindHover() {
    document.addEventListener('mouseover', (e) => {
      const t = e.target;
      if (!(t && t.nodeType === 1 && t.hasAttribute && t.hasAttribute('data-money'))) return;
      if (!document.body.classList.contains('mask-money')) return;
      if (t.dataset.moneyReal) t.textContent = t.dataset.moneyReal;
    }, true);
    document.addEventListener('mouseout', (e) => {
      const t = e.target;
      if (!(t && t.nodeType === 1 && t.hasAttribute && t.hasAttribute('data-money'))) return;
      if (!document.body.classList.contains('mask-money')) return;
      t.textContent = MASK_TEXT;
    }, true);
  }

  function init() {
    applyState();
    startObserver();
    bindHover();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API for the topbar toggle button
  window.toggleMoneyMask = function () {
    const on = !document.body.classList.contains('mask-money');
    document.body.classList.toggle('mask-money', on);
    localStorage.setItem(KEY, on ? 'true' : 'false');
    paintAll();
    // Notify any subscribed listeners (PersonaShell button) to re-render
    window.dispatchEvent(new CustomEvent('money-mask-change', { detail: { masked: on } }));
    return on;
  };
  window.isMoneyMasked = function () {
    return document.body.classList.contains('mask-money');
  };
})();
