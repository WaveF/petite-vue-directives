export default (ctx) => {
  const modifiers = ctx.modifiers || {};
  const isDocumentResize = modifiers.document;

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      try {
        ctx.get(`(()=>{
          const $detail = {
            width:  ${entry.contentRect.width},
            height: ${entry.contentRect.height},
          };
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
