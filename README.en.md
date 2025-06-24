# Petite-Vue Directives

[简体中文](./README.md) | English

A collection of custom directives designed specifically for [petite-vue](https://github.com/vuejs/petite-vue).

## Installation

```bash
npm install petite-vue-directives
```

## Usage

```js
import { createApp } from 'petite-vue'
import { vRef, vResize } from 'petite-vue-directives'

const app = createApp()
app.directive('ref', vRef)
app.directive('resize', vResize)
app.mount()
```

## Available Directives

### v-ref

Use to obtain a reference to a DOM element:

```html
<div v-ref="myDiv">This div can be accessed via this.$refs.myDiv</div>
```

### v-resize

Watch for element size changes:

```html
<!-- Watch element size -->
<div v-resize="size = [$width, $height]">Current size: {{size}}</div>

<!-- Watch document size -->
<div v-resize.document="docSize = [$width, $height]">Document size: {{docSize}}</div>
```

## License

MIT