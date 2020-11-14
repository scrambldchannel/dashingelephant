---
title: Syntax highlighting of code blocks in Gridsome
path: /syntax-highlighting-gridsome
date: 2020-11-14
summary: I've been building a couple of sites in Gridsome and ran into a few little issues getting syntax highlighting applied to code blocks. This is how I solved it.
tags: ['shiki', 'prismjs', 'gridsome', 'vue']
---

I've been playing around with Gridsome for a little while now and have started migrating some content from my old Pelican powered blog. One thing that caused me a few headaches was getting embedded code blocks to be rendered elegantly with syntax highlighting support for a variety of languages.

The first issue was choosing a plugin to handle it. Having checked the list of plugins and looked at a few themes and templates, it seemed like there were a few options:

* [@gridsome/remark-prismjs](https://gridsome.org/plugins/@gridsome/remark-prismjs)
* [gridsome-plugin-remark-shiki](https://gridsome.org/plugins/gridsome-plugin-remark-shiki)
* [gridsome-plugin-remark-prismjs-all](https://gridsome.org/plugins/gridsome-plugin-remark-prismjs-all)


### @gridsome/remark-prismjs

Going by nothing other than the download numbers, I thought I'd try the prismjs version. I also noted that it seemed to be part of gridsome core and the docs were pretty clear. I updated my `main.js` and `gridsome.config.js` as follows:

```js{1}{codeTitle: "src/main.js"}
import 'prismjs/themes/prism.css'

export default function (Vue) {
  // ...
}
```

```js{15-17}{codeTitle: "gridsome.config.js"}
module.exports = {
  plugins: [
    // ...
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        },
        plugins: [
          '@gridsome/remark-prismjs'
        ]
      }
    }
  ]
}
```

This worked as expected when using the default theme but I didn't really like the look and wanted a dark theme. However switching the theme to `prism-twilight` left me with illegible text. The same was true for other dark themes, I ended up with some weird white gradient that looked awful. I'm guessing this was down to something in the css and maybe a conflict with the css from the theme I was using. Try as I might, I couldn't get it to work so decided to try something else.

### gridsome-plugin-remark-shiki

This plugin uses hte shiki library to do the highlighting. As it's a third party plugin, I needed to install it to my project.

```bash{promptUser: "alex"}{promptHost: "thinky"}
npm install gridsome-plugin-remark-shiki
```

There's no need to add anything to main.js, just the following to your config:

```js{15-19}{codeTitle: "gridsome.config.js"}
module.exports = {
  plugins: [
    // ...
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        },
        remark: {
          plugins: [
            ['gridsome-plugin-remark-shiki', { theme: 'nord', skipInline: true }]
          ],
        }
      }
    }
  ]
}
```

This worked great on initial testing but then I found an issue with the way code blocks without a language specified were handled. I had expected that, as with Github etc, code blocks without a language would appear without any highlighting but with the background according to the theme. This didn't happen, multi line code blocks were rendered as discontinuous blocks, not a good look. I tried specifying `text` as the language explicitly but that didn't work either.

A good amount of time down the rabbit hole and I found the issue and raised a PR. Just minutes ago, it was merged. I don't think I've contrinuted to a js project before so this is cause for mild celebration :) It's nice to be able to solve a problem, no matter how simple. Still, I wanted to try the third plugin too as it seemed to provide the ability too add titles and line numbers.

### gridsome-plugin-remark-prismjs-all

This is another third party plugin that uses the library prismjs. It wasn't entirely clear how it differed to the built in plugin but there is a [good demo application](https://kind-elion-23889d.netlify.app/demo-gridsome-plugin-remark-prismjs-all/) that shows how it can be used with examples of titles, line numbers and line highlighting.

```bash{promptUser: "alex"}{promptHost: "thinky"}
npm install gridsome-plugin-remark-prismjs-all
```

The plugin only comes bundled with a couple of themes, not clear how easy it is to get more but this gives me a nice dark look. According to the examples, for line numbers, it also needs `prism-line-numbers.css` and for prettifying command prompts in blocks, it uses `prism-command-line.css`. Note, in practice, I didn't actually find these require statements necessary but I'm not entirely sure why.

```js{1-3}{codeTitle: "src/main.js"}
require("gridsome-plugin-remark-prismjs-all/themes/night-owl.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");
require("prismjs/plugins/command-line/prism-command-line.css")

export default function (Vue) {
  // ...
}
```

```js{15-23}{codeTitle: "gridsome.config.js"}
module.exports = {
  plugins: [
    // ...
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        },
        remark: {
          plugins: [
            [
              'gridsome-plugin-remark-prismjs-all', {
                showLineNumbers: false, //  don't enable for every code block, use on a case by case basis
              },
            ],
          ],
        }
      }
    }
  ]
}
```

It also suggests adding some extra css:

```css
/**
 * Add back the container background-color, border-radius, padding, margin
 * and overflow that we removed from <pre>.
 */
.gridsome-highlight {
  background-color: #fdf6e3; //for solarized theme
  border-radius: 0.3em;
  margin: 0.5em 0;
  padding: 1em;
  overflow: auto;
}
.gridsome-highlight-code-line {
  background-color: #feb; //for solarized theme
  display: block;
  margin-right: -1em;
  margin-left: -1em;
  padding-right: 1em;
  padding-left: 0.75em;
  border-left: 0.25em solid #f99;
}

/**
 * Remove the default PrismJS theme background-color, border-radius, margin,
 * padding and overflow.
 * 1. Make the element just wide enough to fit its content.
 * 2. Always fill the visible space in .gatsby-highlight.
 * 3. Adjust the position of the line numbers
 */
.gridsome-highlight pre[class*="language-"] {
  background-color: transparent;
  margin: 0;
  padding: 0;
  overflow: initial;
  float: left; /* 1 */
  min-width: 100%; /* 2 */
}

/* Adjust the position of the line numbers */
.gridsome-highlight pre[class*="language-"].line-numbers {
  padding-left: 2.8em;
}

.gridsome-code-title {
  position: relative;
  z-index: 100;
  margin-bottom: -0.8em;
  background-color: #feb; //solarized highlight lines color
  color: red; // why not ;-)
  font-style: italic;
  font-weight: 100;
  text-align: center;
  font-family: PT Mono, Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  line-height: 1.5;
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
}

```



I'm really happy with the result. In the code blocks above I've used a bunch of other options for formatting code blocks with the help of the demo page, I might create another post to give myself a cheatsheet for building them in future. 

