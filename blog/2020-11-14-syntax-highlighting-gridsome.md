---
title: Syntax highlighting of code blocks in Gridsome
path: /syntax-highlighting-gridsome
date: 2020-11-14
summary: I've been building a couple of sites in Gridsome and ran into a few little issues getting syntax highlighting applied to code blocks. This is how I solved it.
tags: ['shiki', 'gridsome', 'vue']
---

I've been playing around with Gridsome for a little while now and have started migrating some content from my old Pelican powered blog. One thing that caused me a few headaches was getting embedded code blocks to be rendered elegantly with syntax highlighting support for a variety of languages.

The first issue was choosing a plugin to handle it. Having checked the list of plugins and looked at a few themes and templates, it seemed like there were a couple of options:

* [@gridsome/remark-prismjs](https://gridsome.org/plugins/@gridsome/remark-prismjs)
* [gridsome-plugin-remark-shiki](https://gridsome.org/plugins/gridsome-plugin-remark-shiki)

Going by nothing other than the download numbers, I thought I'd try the prismjs version. I also noted that it seemed to be part of gridsome core and the docs were pretty clear. I updated my ```main.js``` and ```gridsome.config.js``` as follows:

#### main.js

```js
import 'prismjs/themes/prism.css'

export default function (Vue) {
  // ...
}
```

#### gridsome.config.js

```js
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

This worked as expected when using the default theme but I didn't really like the look and wanted a dark theme. However switching the theme to ```prism-twilight``` left me with illegible text. The same was true for other dark themes, I ended up with some weird white gradient that looked awful. I'm guessing this was down to something in the css and maybe a conflict with the css from the theme I was using. Try as I might, I couldn't get it to work so decided to move on to the other plugin.

There's no need to add anything to main.js, just the following:

#### gridsome.config.js

```js
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

This worked great on initial testing but then I found an issue with the way code blocks without a language specified were handled. I had expected that, as with Github etc, code blocks without a language would appear without any highlighting but with the background according to the theme. This didn't happen, multi line code blocks were rendered as discontinuous blocks, not a good look. I tried specifying ```text``` as the language explicitly but that didn't work either.

A good amount of time down the rabbit hole and I found the issue and raised a PR. Just minutes ago, it was merged. I don't think I've contrinuted to a js project before so this is cause for mild celebration :) I would like to re-visit this in future and potentially add in titles and line numbers but for now I have what I wanted. It's nice to be able to solve a problem, no matter how simple. 