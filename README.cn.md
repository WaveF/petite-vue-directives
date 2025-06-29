# Petite-Vue Directives

[English](./README.md) | 简体中文

一个为 petite-vue 设计的自定义指令集合。

## 安装

```bash
npm install petite-vue-directives
```

## 使用方法

```js
import { createApp } from 'petite-vue'
import { vRef, vResize, vIntersect } from 'petite-vue-directives'

const app = createApp()
app.directive('ref', vRef)
app.directive('resize', vResize)
app.directive('intersect', vIntersect)
app.mount()
```

## 可用指令

### v-ref

用于获取DOM元素引用：

```html
<div v-ref="myDiv">这个div可以通过 this.$refs.myDiv 访问</div>
```

### v-resize

监听元素尺寸变化：

```html
<!-- 监听元素自身尺寸 -->
<div v-resize="size=[$detail.width, $detail.height]">当前尺寸: {{size}}</div>

<!-- 监听指定id的元素尺寸 -->
<div v-resize:elemId="size=[$detail.width, $detail.height]">元素尺寸: {{size}}</div>

<!-- 监听文档尺寸 -->
<div v-resize.document="docSize=[$detail.width, $detail.height]">文档尺寸: {{docSize}}</div>
```

### v-intersect

监听元素与视口的交集状态：

```html
<!-- 基本用法 -->
<div v-intersect="shown=$detail.intersect">
  元素{{shown ? '可见' : '不可见'}}
</div>

<!-- 设置阈值 -->
<div v-intersect.threshold_50="shown=$detail.intersect">
  50%可见时触发
</div>

<!-- 使用语义修饰符 -->
<div v-intersect.half="shown=$detail.intersect">
  50%可见时触发
</div>

<div v-intersect.full="shown=$detail.intersect">
  完全可见时触发
</div>

<!-- 设置边距 -->
<div v-intersect.margin_-10px="shown=$detail.intersect">
  提前10px触发
</div>

<div v-intersect.margin_-10px_20px="shown=$detail.intersect">
  上下提前10px，左右提前20px触发
</div>
```

## 修饰符说明

### v-intersect 修饰符

- **threshold_数值**: 设置触发阈值（0-100）
- **half**: 50%可见时触发（等同于 threshold_50）
- **full**: 完全可见时触发（等同于 threshold_99）
- **margin_值**: 设置根边距，支持以下格式：
  - `margin_10px`: 四个方向都是10px
  - `margin_10px_20px`: 上下10px，左右20px
  - `margin_10px_20px_30px`: 上10px，左右20px，下30px
  - `margin_10px_20px_30px_40px`: 上右下左分别为10px、20px、30px、40px

### v-resize 参数

- **无参数**: 监听元素自身尺寸变化
- **元素id**: 监听指定id的元素尺寸变化
- **document**: 监听文档尺寸变化

## 数据对象

所有指令都通过 `$detail` 对象传递详细数据：

- **v-intersect**: `$detail.intersect` - 元素是否与视口相交
- **v-resize**: `$detail.width`, `$detail.height` - 元素的宽度和高度

## 许可证
MIT