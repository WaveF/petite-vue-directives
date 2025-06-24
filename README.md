# Petite-Vue Directives

[English](./README.en.md) | 简体中文

一个为 petite-vue 设计的自定义指令集合。

## 安装

```bash
npm install petite-vue-directives
```

## 使用方法

```js
import { createApp } from 'petite-vue'
import { vRef, vResize } from 'petite-vue-directives'

const app = createApp()
app.directive('ref', vRef)
app.directive('resize', vResize)
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
<!-- 监听元素尺寸 -->
<div v-resize="size=[$width,$height]">当前尺寸: {{size}}</div>

<!-- 监听文档尺寸 -->
<div v-resize.document="docSize=[$width,$height]">文档尺寸: {{docSize}}</div>
```

## 许可证
MIT