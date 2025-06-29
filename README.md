# Petite-Vue Directives

English | [简体中文](./README.cn.md)

A collection of custom directives designed specifically for [petite-vue](https://github.com/vuejs/petite-vue).

## Installation

```bash
npm install petite-vue-directives
```

## Usage

```js
import { createApp } from 'petite-vue'
import { vRef, vResize, vIntersect } from 'petite-vue-directives'

const app = createApp()
app.directive('ref', vRef)
app.directive('resize', vResize)
app.directive('intersect', vIntersect)
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
<div v-resize="size=[$detail.width,$detail.height]">Current size: {{size}}</div>

<!-- Watch specified element by id -->
<div v-resize:elemId="size=[$detail.width,$detail.height]">Element size: {{size}}</div>

<!-- Watch document size -->
<div v-resize:document="docSize=[$detail.width,$detail.height]">Document size: {{docSize}}</div>
```

### v-intersect

Watch for element intersection with viewport:

```html
<!-- Basic usage -->
<div v-intersect="shown=$detail.intersect">
  Element is {{shown ? 'visible' : 'hidden'}}
</div>

<!-- Set threshold -->
<div v-intersect.threshold_50="shown=$detail.intersect">
  Trigger when 50% visible
</div>

<!-- Use semantic modifiers -->
<div v-intersect.half="shown=$detail.intersect">
  Trigger when 50% visible
</div>

<div v-intersect.full="shown=$detail.intersect">
  Trigger when fully visible
</div>

<!-- Set margin -->
<div v-intersect.margin_-10px="shown=$detail.intersect">
  Trigger 10px early
</div>

<div v-intersect.margin_-10px_20px="shown=$detail.intersect">
  Trigger 10px early on top/bottom, 20px early on left/right
</div>

<!-- Combined usage -->
<div v-intersect.threshold_30.margin_-50px="shown=$detail.intersect">
  Trigger when 30% visible and 50px early
</div>
```

## Modifiers

### v-intersect Modifiers

- **threshold_value**: Set trigger threshold (0-100)
- **half**: Trigger when 50% visible (equivalent to threshold_50)
- **full**: Trigger when fully visible (equivalent to threshold_99)
- **margin_value**: Set root margin, supports the following formats:
  - `margin_10px`: 10px on all four sides
  - `margin_10px_20px`: 10px on top/bottom, 20px on left/right
  - `margin_10px_20px_30px`: 10px on top, 20px on left/right, 30px on bottom
  - `margin_10px_20px_30px_40px`: 10px, 20px, 30px, 40px on top, right, bottom, left respectively

### v-resize Arguments

- **(empty)**：watch self size changes
- **elementId**: Watch specified element by id
- **document**: Watch document size changes

## Data Object

All directives pass detailed data through the `$detail` object:

- **v-intersect**: `$detail.intersect` - Whether the element intersects with viewport
- **v-resize**: `$detail.width`, `$detail.height` - Element width and height

## License

MIT