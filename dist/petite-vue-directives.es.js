const f = (n) => {
  try {
    n.get(`(()=>{$refs["${n.exp}"]=$el})()`);
  } catch (t) {
    console.warn("expression error:", t);
  }
};
function a(n = {}) {
  const t = [];
  for (const e of Object.keys(n))
    if (e.includes("_")) {
      const [r, ...s] = e.split("_");
      t.push({
        key: r,
        value: s.length === 1 ? s[0] : s
      });
    } else
      t.push({
        key: e,
        value: void 0
      });
  return t;
}
function c(n, t) {
  return `(()=>{const $v={${Object.entries(n).map(([s, o]) => `${s}:${o}`).join(",")}};${t}})()`;
}
const h = (n) => {
  const t = n.arg, e = (s) => {
    s.forEach((o) => {
      try {
        const i = c(
          {
            width: o.contentRect.width,
            height: o.contentRect.height
          },
          n.exp
        );
        n.get(i);
      } catch (i) {
        console.warn("expression error:", i);
      }
    });
  }, r = new ResizeObserver(e);
  if (t === "document")
    r.observe(document.documentElement);
  else if (t === "window")
    r.observe(document.documentElement);
  else if (typeof t == "string" && t !== "") {
    const s = document.querySelector(`#${t}`);
    s ? r.observe(s) : console.error(`v-resize: Element with id "${t}" not found`);
  } else
    r.observe(n.el);
  return () => r.disconnect();
}, v = (n) => {
  const t = a(n.modifiers), e = u(t) || 0, r = d(t), s = new IntersectionObserver(
    (o) => {
      o.forEach((i) => {
        const l = c(
          {
            intersect: i.isIntersecting
          },
          n.exp
        );
        n.get(l);
      });
    },
    {
      threshold: e,
      rootMargin: r
    }
  );
  return requestAnimationFrame(() => s.observe(n.el)), () => s.disconnect();
};
function u(n) {
  let t = 0;
  return n.forEach(({ key: e, value: r }, s) => {
    e === "half" ? t = 0.5 : e === "full" ? t = 0.99 : e === "threshold" && (t = (Number(r) || 0.99) / 100);
  }), t;
}
function d(n) {
  const t = n.find((r) => r.key === "margin");
  if (!t) return "0px";
  let e = Array.isArray(t.value) ? t.value : [t.value];
  return e.length === 1 ? e = [e[0], e[0], e[0], e[0]] : e.length === 2 ? e = [e[0], e[1], e[0], e[1]] : e.length === 3 ? e = [e[0], e[1], e[2], e[1]] : e.length === 4 ? e = e : e = e.slice(0, 4), e.join(" ");
}
export {
  v as vIntersect,
  f as vRef,
  h as vResize
};
