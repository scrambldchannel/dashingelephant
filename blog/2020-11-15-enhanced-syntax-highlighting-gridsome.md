---
title: Enhanced syntax highlighting options for Gridsome
path: /enhanced-syntax-highlighting-gridsome
date: 2020-11-15
summary: Having managed to syntax highlighting to work in Gridsome I wanted to explore some of the extra features offered by gridsome-plugin-remark-prismjs-all.
tags: ['prismjs', 'gridsome', 'vue']
---

Having managed to get [syntax highlighting working in Gridsome](/syntax-highlighting-gridsome), I wanted to explore some of the extra features offered by [gridsome-plugin-remark-prismjs-all](https://gridsome.org/plugins/gridsome-plugin-remark-prismjs-all).

The examples make it easy to enhance your code blocks with extra shiny stuff. Adding titles, line numbers and line highlighting to blocks is as simple as adding a bit of extra metadata.

### Specify a language

Obviously, a code block needs to know which language grammar to apply to the code.

````
```python
"""
Fizz Buzz solution
"""
output3 = ["Fizz", "", ""]
output5 = ["Buzz", "", "", "", ""]

for x in range(1, 101):
    print "%s%s" % (output3[x % 3], output5[x % 5]) or x
print my_date.strftime('%d %A %a')
```
````

The above code will be formatted as if it were Python code:

```python
"""
Fizz Buzz solution
"""
output3 = ["Fizz", "", ""]
output5 = ["Buzz", "", "", "", ""]

for x in range(1, 101):
    print "%s%s" % (output3[x % 3], output5[x % 5]) or x
print my_date.strftime('%d %A %a')
```

### Titles

Use `codeTitle` to set a title for your code block:

````text
```html{codeTitle: "index.html"}
<template>
  <Layout>
    <div>
      <h1>Hello World</h1>
    </div>

  </Layout>
</template>
```
````

This will have a heading with the title you provide: 

```html{codeTitle: "index.html"}
<template>
  <Layout>
    <div>
      <h1>Page Not Found</h1>
    </div>

  </Layout>
</template>
```

### Line numbering

Other options can be added to the same block. 

````
```js{codeTitle: "main.js"}{numberLines: true}
// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import VueScrollTo from 'vue-scrollto'
import VueFuse from 'vue-fuse'
// ....
```
```` 

Here we can add line numbering and specify the line we want to start numbering from:

```js{codeTitle: "main.js"}{numberLines: true}
// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import VueScrollTo from 'vue-scrollto'
import VueFuse from 'vue-fuse'
// ....
```

You can also start the line count at an arbitrary number:

````
```js{codeTitle: "main.js"}{numberLines: 4}
import DefaultLayout from '~/layouts/Default.vue'
import VueScrollTo from 'vue-scrollto'
import VueFuse from 'vue-fuse'
// ....
```
```` 

Here we start the count from line 4:

```js{codeTitle: "main.js"}{numberLines: 4}
import DefaultLayout from '~/layouts/Default.vue'
import VueScrollTo from 'vue-scrollto'
import VueFuse from 'vue-fuse'
// ....
```



### Line highlighting

Here we can highlight lines by specifiying individual lines and ranges which is useful if you want to draw attention to specific lines of code while retaining the context. You can specify a set of numbers or ranges

````
```cpp{codeTitle: "supertux/src/badguy/badguy.cpp"}{numberLines: true}{1-2,16}
SuperTux
//  Copyright (C) 2006 Matthias Braun <matze@braunis.de>
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.

#include "badguy/badguy.hpp"
```
````
Gives:

```cpp{codeTitle: "supertux/src/badguy/badguy.cpp"}{numberLines: true}{1-2,16}
SuperTux
//  Copyright (C) 2006 Matthias Braun <matze@braunis.de>
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.
#include "badguy/badguy.hpp"
```

### Adding a prompt

Another cool little trick is to add a nicely formatted prompt for shell commands: 

````
```bash{promptUser: "root"}{promptHost: "deathstar"}
rm -fr /
```
````

The above gives a prompt based on the values provided:

```bash{promptUser: "root"}{promptHost: "deathstar"}
rm -fr /
```

So the plugin offers some really nice features for displaying code in your blog!