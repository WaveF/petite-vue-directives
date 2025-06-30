const f = (n) => {
  try {
    n.get(`(()=>{const $detail={el:$el};$refs["${n.exp}"]=$el})()`);
  } catch (t) {
    console.warn("expression error:", t);
  }
};
function a(n = {}) {
  const t = [];
  for (const e of Object.keys(n))
    if (e.includes("_")) {
      const [s, ...r] = e.split("_");
      t.push({
        key: s,
        value: r.length === 1 ? r[0] : r
      });
    } else
      t.push({
        key: e,
        value: void 0
      });
  return t;
}
function c(n, t) {
  return `(()=>{const $detail={${Object.entries(n).map(([r, o]) => `${r}:${o}`).join(",")}};${t}})()`;
}
const h = (n) => {
  const t = n.arg, e = (r) => {
    r.forEach((o) => {
      try {
        const i = c({
          width: o.contentRect.width,
          height: o.contentRect.height
        }, n.exp);
        n.get(i);
      } catch (i) {
        console.warn("expression error:", i);
      }
    });
  }, s = new ResizeObserver(e);
  if (t === "document")
    s.observe(document.documentElement);
  else if (t === "window")
    s.observe(document.documentElement);
  else if (typeof t == "string" && t !== "") {
    const r = document.querySelector(`#${t}`);
    r ? s.observe(r) : console.error(`v-resize: Element with id "${t}" not found`);
  } else
    s.observe(n.el);
  return () => s.disconnect();
}, v = (n) => {
  const t = a(n.modifiers), e = d(t) || 0, s = u(t), r = new IntersectionObserver((o) => {
    o.forEach((i) => {
      const l = c({
        intersect: i.isIntersecting
      }, n.exp);
      n.get(l);
    });
  }, {
    threshold: e,
    rootMargin: s
  });
  return requestAnimationFrame(() => r.observe(n.el)), () => r.disconnect();
};
function d(n) {
  let t = 0;
  return n.forEach(({ key: e, value: s }, r) => {
    e === "half" ? t = 0.5 : e === "full" ? t = 0.99 : e === "threshold" && (t = (Number(s) || 0.99) / 100);
  }), t;
}
function u(n) {
  const t = n.find((s) => s.key === "margin");
  if (!t) return "0px";
  let e = Array.isArray(t.value) ? t.value : [t.value];
  return e.length === 1 ? e = [e[0], e[0], e[0], e[0]] : e.length === 2 ? e = [e[0], e[1], e[0], e[1]] : e.length === 3 ? e = [e[0], e[1], e[2], e[1]] : e.length === 4 ? e = e : e = e.slice(0, 4), e.join(" ");
}
export {
  v as vIntersect,
  f as vRef,
  h as vResize
};
