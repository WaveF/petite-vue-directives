export default (ctx) => {
  // the element the directive is on
  ctx.el;
  // the raw value expression
  // e.g. v-my-dir="x" then this would be "x"
  ctx.exp;
  // v-my-dir:foo -> "foo"
  ctx.arg;
  // v-my-dir.mod -> { mod: true }
  ctx.modifiers;
  // evaluate the expression and get its value
  ctx.get();
  // evaluate arbitrary expression in current scope
  ctx.get(`${ctx.exp} + 10`);

  // run reactive effect
  ctx.effect(() => {
    // this will re-run every time the get() value changes
    console.log(ctx.get());
  });

  return () => {
    // cleanup if the element is unmounted
  };
};
