import { parseModifiersAsArray, createDetailExpression } from '../shared/utils.js'

export default (ctx) => {
  const mods = parseModifiersAsArray(ctx.modifiers)
  console.log('mods', mods)
  
  const threshold = getThreshold(mods) || 0
  const rootMargin = getRootMargin(mods)
  console.log({threshold, rootMargin})

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const code = createDetailExpression({
        intersect: entry.isIntersecting
      }, ctx.exp);
      ctx.get(code);
    });
  }, {
    threshold,
    rootMargin
  })

  requestAnimationFrame(() => observer.observe(ctx.el));

  return () => observer.disconnect();
};

function getThreshold(modifiers) {
  let _threshold = 0

  modifiers.forEach(({key,value}, index) => {
    if (key === 'half') {
      _threshold = 0.5
    }
    else if (key === 'full') {
      _threshold = 0.99
    }
    else if (key === 'threshold') {
      const _value = Number(value) || 0.99
      _threshold = _value / 100
    }
  })
  
  return _threshold
}

function getRootMargin(modifiers) {
  // 找到 margin 修饰符
  const marginMod = modifiers.find(m => m.key === 'margin')
  if (!marginMod) return '0px' // 默认值

  // 支持 margin_10%_25px_25%_25px 这种写法
  let values = Array.isArray(marginMod.value) ? marginMod.value : [marginMod.value]
  
  // 根据 CSS margin 规则补齐到4个值
  if (values.length === 1) {
    // 1个值：四个方向都是这个值
    values = [values[0], values[0], values[0], values[0]]
  } else if (values.length === 2) {
    // 2个值：上下是第一个值，左右是第二个值
    values = [values[0], values[1], values[0], values[1]]
  } else if (values.length === 3) {
    // 3个值：上、左右、下
    values = [values[0], values[1], values[2], values[1]]
  } else if (values.length === 4) {
    // 4个值：上右下左，保持不变
    values = values
  } else {
    // 超过4个值，只取前4个
    values = values.slice(0, 4)
  }
  
  return values.join(' ')
}

