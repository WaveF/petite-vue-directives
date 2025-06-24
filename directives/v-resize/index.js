export default (ctx) => {
  const modifiers = ctx.modifiers || {};
  const isDocumentResize = modifiers.document;

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      try {
        ctx.get(`(()=>{
          const $width = ${entry.contentRect.width};
          const $height = ${entry.contentRect.height};
          ${ctx.exp}
        })()`)
      } catch (e) {
        console.warn('expression error:', e)
      }
    });
  };

  const resizeObserver = new ResizeObserver(observerCallback);

  if (isDocumentResize) {
    resizeObserver.observe(document.documentElement);
  } else {
    resizeObserver.observe(ctx.el);
  }

  return () => resizeObserver.disconnect();
};
