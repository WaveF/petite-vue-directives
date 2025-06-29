import { createDetailExpression } from '../shared/utils.js'

export default (ctx) => {
  const target = ctx.arg;
  console.log(ctx.arg)

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      try {
        const code = createDetailExpression({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        }, ctx.exp);
        ctx.get(code)
      } catch (e) {
        console.warn('expression error:', e)
      }
    });
  };

  const resizeObserver = new ResizeObserver(observerCallback);

  if (target === 'document') {
    resizeObserver.observe(document.documentElement);
  }
  else if (target === 'window') {
    resizeObserver.observe(document.documentElement);
  }
  else if (typeof target === 'string' && target !== '') {
    const targetElement = document.querySelector(`#${target}`);
    if (targetElement) {
      resizeObserver.observe(targetElement);
    } else {
      console.error(`v-resize: Element with id "${target}" not found`);
    }
  }
  else {
    resizeObserver.observe(ctx.el);
  }

  return () => resizeObserver.disconnect();
};
