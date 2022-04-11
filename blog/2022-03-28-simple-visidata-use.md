---
title: Lightning fast text file analysis with Visidata
date: 2022-03-28
summary: I came across Visidata a year or so again and loved the concept but my workflow then was almost exclusively based on data in Big Query rather raw text. Today though, I did end up for a bunch of text files to analyze so thought I should start climbing the learning curve.
tags:
  - visidata
  - python
  - data
---

I came across Visidata a year or so again and loved the concept but my workflow then was almost exclusively based on data in Big Query rather raw text. Today though, I did end up for a bunch of text files to analyze so thought I should start climbing the learning curve.

## Hang on, what is it? 

## Installation

## What do I want to do? 

The problem I was facing was trying to understand a huge data set within a very large TM1 cube. A TM1 cube is essentially a multi dimensional array of cells. This particular had millions and millions of cells... blah blah

The largest of these files came out at over 11gb which is, indeed, pretty big.

```bash
ls -lSh
total 34G
-rwxrwxrwx 1 alex alex  11G Mar 23 20:09 21_FCR_PM.csv
-rwxrwxrwx 1 alex alex 8.6G Mar 23 19:47 22_FCR.csv
-rwxrwxrwx 1 alex alex 6.0G Mar 23 19:28 21_FCR.csv
-rwxrwxrwx 1 alex alex 1.5G Mar 23 19:09 22_FCR_PM.csv
-rwxrwxrwx 1 alex alex 1.1G Nov 23  2020 18_FCR.csv
-rwxrwxrwx 1 alex alex 545M Nov 23  2020 18_BP.csv
...
```

Which is also > 75 million rows.

```bash
wc -l 21_FCR_PM.csv
75564322 21_FCR_PM.csv
```

I tried opening it with Visidata, just to see what would happen. I'm running it on a machine with 24gb of RAM but the consumption was up around 95% by the time Visidata had loaded 50% of the file at which point it stopped responding.

Note, unfortunately, I was stuck on Windows for this particular task and was running Visidata within a WSL terminal which is great but presumably has some level of overhead. At some point I might try the same thing natively on Linux.

That said, I wasn't really surprised that it couldn't manage a file that big and I could get a rough idea of the data by looking at one of the other export files.

So I picked a different file, one that was still much bigger than I deemed that dataset should be but only a meagre 1.5gb. I fired up Visidata and waited:

```bash
vd --header 0 22_FCR_PM.csv
```

Note, I've used the header option to specify that the file I'm using doesn't have a header row.S

It took a few minutes but we got there. The data consists of a single value column and a column for the element of each dimension element. I wanted to test the hypothesis that the cube data was full of millions of tiny numbers that make no material difference to the consolidated figures in the cube but do ruin the performance.

The first thing to do was to sort the data by value, not a particular sophisticated way of looking at but a simple piece of functionality I knew I wanted to be able use in Visidata. Sorting can be done by highlighting a column and using either `[` or `]` which will sort in ascending and descending order respectively.

Straight away though, I realised something was wrong, the value column was clearly being interpreted as text. So back to the cheat sheet I went and found that the column type can be changed to a float using `%`.

Sweet, but now it's formatted my data to two decimal places and I think I want more precision. To do this, I need to first open the columns sheet. At this point it's probably worth pointing out that visidata lets you edit the value of a cell by pressing `e`.

On the columns sheet, we can name our columns and also format them. My column with the numerical data I'm going to rename as `Value` and also change the formatting from 2 to 9 decimal places by changing `{:.09f}` to `{:.02f}`. You can note here that the type we set for the column can also just added to the type cell in this sheet.  

Then I realised that it would be really good to widen a column, this can be done on the columns sheetC


How to deal with German number formatting
