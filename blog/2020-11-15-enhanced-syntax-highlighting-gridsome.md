---
title: Enhanced syntax highlighting options for Gridsome
path: /enhanced-syntax-highlighting-gridsome
date: 2020-11-15
summary: Having managed to syntax highlighting to work in Gridsome I wanted to explore some of the extra features offered by gridsome-plugin-remark-prismjs-all.
tags: ['prismjs', 'gridsome', 'vue']
---

Having managed to get [syntax highlighting working in Gridsome](/syntax-highlighting-gridsome), I wanted to explore some of the extra features offered by [gridsome-plugin-remark-prismjs-all](https://gridsome.org/plugins/gridsome-plugin-remark-prismjs-all).

The examples make it easy to enhance your code blocks with extra shiny stuff. Adding titles, line numbers and line highlighting to blocks is as simple as adding a bit of extra metadata.

Here's a simple piece of Python code that will be placed in each block:

```
"""
Fizz Buzz solution
"""
output3 = ["Fizz", "", ""]
output5 = ["Buzz", "", "", "", ""]

for x in range(1, 101):
    print "%s%s" % (output3[x % 3], output5[x % 5]) or x
print my_date.strftime('%d %A %a')
```

### Specify a language

Kind of obvious you need to specify a language for highligting to take effect

```
```python
```

Gives:

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

```
```python{codeTitle: "fizzbuzz.py"}
```

Gives:

```python{codeTitle: "fizzbuzz.py"}
"""
Fizz Buzz solution
"""
output3 = ["Fizz", "", ""]
output5 = ["Buzz", "", "", "", ""]

for x in range(1, 101):
    print "%s%s" % (output3[x % 3], output5[x % 5]) or x
print my_date.strftime('%d %A %a')
```

### Line numbering

Other options can be added to the same block. Here we can add line numbering and specify the line we want to start numbering from:

```
```python{codeTitle: "fizzbuzz.py"}{numberLines: true}
```

Gives:

```python{codeTitle: "fizzbuzz.py"}{numberLines: true}
"""
Fizz Buzz solution
"""
output3 = ["Fizz", "", ""]
output5 = ["Buzz", "", "", "", ""]

for x in range(1, 101):
    print "%s%s" % (output3[x % 3], output5[x % 5]) or x
print my_date.strftime('%d %A %a')
```

### Line highlighting

Here we can highlight lines by specifiying individual lines and ranges which is useful if you want to draw attention to specific lines of code while retaining the context. You can specify a set of numbers or ranges

```
```python{codeTitle: "fizzbuzz.py"}{numberLines: true}{1,3,5-7}
```
Gives:

```python{codeTitle: "fizzbuzz.py"}{numberLines: true}{4,7-9}
"""
Fizz Buzz solution
"""
output3 = ["Fizz", "", ""]
output5 = ["Buzz", "", "", "", ""]

for x in range(1, 101):
    print "%s%s" % (output3[x % 3], output5[x % 5]) or x
print my_date.strftime('%d %A %a')
```

### Adding a nice prompt

Another cool little trick is to add a nicely formatted prompt for shell commands: 

```
```bash{promptUser: "alex"}{promptHost: "thinky"}
```

Gives:

```bash{promptUser: "alex"}{promptHost: "thinky"}
python ./fizzbuzz.py
```