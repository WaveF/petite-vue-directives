export function parseModifiersAsObject(modifiers = {}) {
  const result = {};
  for (const key in modifiers) {
    if (key.includes('_')) {
      // 有下划线，按 key_value1_value2... 解析
      const [mainKey, ...values] = key.split('_');
      if (values.length === 1) {
        result[mainKey] = values[0];
      } else {
        result[mainKey] = values;
      }
    } else {
      // 没有下划线，值为 undefined
      result[key] = undefined;
    }
  }
  return result;
}

export function parseModifiersAsArray(modifiers = {}) {
  const result = [];
  for (const key of Object.keys(modifiers)) {
    if (key.includes('_')) {
      const [mainKey, ...values] = key.split('_');
      result.push({
        key: mainKey,
        value: values.length === 1 ? values[0] : values,
      });
    } else {
      result.push({
        key,
        value: undefined,
      });
    }
  }
  return result;
}

// 创建统一的表达式生成器
export function createDetailExpression(detailProps, expression) {
  const detailStr = Object.entries(detailProps)
    .map(([key, value]) => `${key}:${value}`)
    .join(',');

  const code = `(()=>{const $v={${detailStr}};${expression}})()`;

  return code;
}
