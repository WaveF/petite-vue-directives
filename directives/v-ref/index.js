export default (ctx) => {
  try {
    ctx.get(`(()=>{const $detail={el:$el};$refs["${ctx.exp}"]=$el})()`);
  } catch (e) {
    console.warn('expression error:', e);
  }
};
