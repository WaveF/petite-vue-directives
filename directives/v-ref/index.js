export default (ctx) => {
  try {
    ctx.get(`(()=>{$refs["${ctx.exp}"]=$el})()`);
  } catch (e) {
    console.warn('expression error:', e);
  }
};
