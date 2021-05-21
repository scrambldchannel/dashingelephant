---
title: Visidata tips and tricks
date: 2021-05-21
summary: I came across visidata a while back but I've started trying to integrate it into my workflow a bit more. There are a million cheatsheets available but here are some of the things that I find myself using more and more
tags:
- visidata
- data

---

# General 

You can open a file with a pretty old school interface

csvs, text get interpreted pretty easily

what about json?

binary formats like xls? 

## Types

If you importa csv for example, stuff will just be interpreted as strings


Convert a column to a float - %

$ seems to turn it into 

## Reordering

You can move columns around by using shit + arrow key


## Sorting

Sorting by a column - asc - [ desc - ]

How do I sort by multiple columns?

## Splitting a column

Hit : to split a column by a regex

So a real life example I had was trying to split the output from wc -l which comes out with a right justified text, then a space and the count. I guess I could have made this easier by piping the output through something to format it. As an aside wc, doesn't have so many options


## Plugins

I can write my own! https://www.visidata.org/docs/api/
