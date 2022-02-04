---
title: Syntax highlighting of code blocks in Gridsome
date: 2020-11-14
summary:
  I've been building a couple of sites in Gridsome and ran into a few little
  issues getting syntax highlighting applied to code blocks. This is how I solved
  it.
tags:
  - shiki
  - prismjs
  - gridsome
  - vue
---

I've been playing around with Gridsome for a little while now and have started migrating some content from my old Pelican powered blog. One thing that caused me a few headaches was getting embedded code blocks to be rendered elegantly with syntax highlighting support for a variety of languages.

The first issue was choosing a plugin to handle it. Having checked the list of plugins and looked at a few themes and templates, it seemed like there were a few options:

- [@gridsome/remark-prismjs](https://gridsome.org/plugins/@gridsome/remark-prismjs)
- [gridsome-plugin-remark-shiki](https://gridsome.org/plugins/gridsome-plugin-remark-shiki)
- [gridsome-plugin-remark-prismjs-all](https://gridsome.org/plugins/gridsome-plugin-remark-prismjs-all)

### @gridsome/remark-prismjs

Going by nothing other than the download numbers, I thought I'd try the prismjs version. I also noted that it seemed to be part of Gridsome core and the docs were pretty clear. I updated my `main.js` and `gridsome.config.js` as follows:

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

This worked as expected when using the default theme but I didn't really like the look and wanted a dark theme. However, switching the theme to `prism-twilight` left me with illegible text. The same was true for other dark themes, I ended up with some weird white gradient that looked awful. I'm guessing this was down to something in the css and maybe a conflict with the css from the theme I was using. Try as I might, I couldn't get it to work so decided to try something else.

### gridsome-plugin-remark-shiki

This plugin uses the shiki library to do the highlighting. As it's a third-party plugin, I needed to install it to my project.

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

This worked great on initial testing but then I found an issue with the way code blocks without a language specified were handled. I had expected that, as with Github etc, code blocks without a language would appear without any highlighting but with the background according to the theme. This didn't happen, multi-line code blocks were rendered as discontinuous blocks, not a good look. I tried specifying `text` as the language explicitly but that didn't work either.

A good amount of time down the rabbit hole and I found the issue and raised a PR. Just minutes ago, it was merged. I don't think I've contributed to a js project before so this is cause for mild celebration :) It's nice to be able to solve a problem, no matter how simple. Still, I wanted to try the third plugin too as it seemed to provide the ability to add titles and line numbers.

### gridsome-plugin-remark-prismjs-all

This is another third party plugin that uses the library prismjs. It wasn't entirely clear how it differed to the built-in plugin but there is a [good demo application](https://kind-elion-23889d.netlify.app/demo-gridsome-plugin-remark-prismjs-all/) that shows how it can be used with examples of titles, line numbers and line highlighting.

```bash{promptUser: "alex"}{promptHost: "thinky"}
npm install gridsome-plugin-remark-prismjs-all
```

The plugin only comes bundled with a couple of themes, not clear how easy it is to get more but this gives me a nice dark look. According to the examples, for line numbers, it also needs `prism-line-numbers.css` and for prettifying command prompts in blocks, it uses `prism-command-line.css`.

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

It also suggests adding some extra css to theme the titles, highlighting and line numbers. This isn't strictly necessary if you're using a theme bundled with the plugin but might be if you are using a standard prism theme. I'm using the night-owl theme and am pretty happy with the result out of the box. That said, I wanted to override the styling of the code block headings to fit in with my site's theme. I overwrote the css with the following:

```css
.gridsome-code-title {
  position: relative;
  margin-bottom: -0.8em;
  background-color: #2c7a7b;
  color: #f7fafc;
  font-size: 0.875rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
    monospace;
}
```

The other issue is with the styling of inline code blocks. Initially, I had a css clash for code blocks causing the background to be overwritten from my prism theme which I fixed easily enough but then I was left with lots of inline sentences with a black background on a white page. It didn't look great and I wanted my theme to take care of them rather than the plugin.

I thought it would be possible to switch off the rendering of inline blocks by adding the following config option but this didn't seem to have any effect. It's possible that it only turns off syntax highlighting within code blocks rather than all the other formatting.

```js{7}{codeTitle: "gridsome.config.js"}
        // ...
        remark: {
          plugins: [
            [
              'gridsome-plugin-remark-prismjs-all', {
                showLineNumbers: false, //  don't enable for every code block, use on a case by case basis
                noInlineHighlight: true,

              },
            ],
          ],
        }
```

I couldn't see an obvious way to add style to only the inline blocks either and my experiments with css so far have only resulted in fudges that only solve part of the problem. I tried manually overriding the css but this would result in doing something undesirable to the multiline blocks. I've left it as it is for now, hopefully, I can find a work around later.
