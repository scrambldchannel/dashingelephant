---
title: Enhanced syntax highlighting options for Gridsome
path: /enhanced-syntax-highlighting-gridsome
date: 2020-11-15
summary: I've been building a couple of sites in Gridsome and ran into a few little issues getting syntax highlighting applied to code blocks. This is how I solved it.
tags: ['prismjs', 'gridsome', 'vue']
---

#### Adding titles, line numbers and line highlighting to code blocks

The examples on the demo page make it easy to enhance your code blocks with extra shiny stuff. I've already used this higher up on the page. Adding them to blocks is as simple as adding a bit of extra metadata. Here are some examples:

##### Titles

Use codeTitle to set a title for your code block:

```
```js{codeTitle: "src/main.js"}
require("gridsome-plugin-remark-prismjs-all/themes/night-owl.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");

export default function (Vue) {
  // ...
}
```

```js{codeTitle: "src/main.js"}
require("gridsome-plugin-remark-prismjs-all/themes/night-owl.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");

export default function (Vue) {
  // ...
}
```

##### Line numbering

Other options can be added to the same block. Here we can add line numbering and specify the line we want to start numbering from:

```
```js{codeTitle: "src/main.js"}{numberLines: 1}
require("gridsome-plugin-remark-prismjs-all/themes/night-owl.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");

export default function (Vue) {
  // ...
}
```

```js{codeTitle: "src/main.js"}{numberLines: 1}
require("gridsome-plugin-remark-prismjs-all/themes/night-owl.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");

export default function (Vue) {
  // ...
}
```

 Here we can highlight lines by specifiying individual lines and ranges:

 {1-2,4,6}