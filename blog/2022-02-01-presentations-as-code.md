---
title: Presentations as code thnkas to Marp
date: 2022-02-01
summary: I spent years dodging Powerpoint, with limited success. Whether it was me that was expected to deliver the presentation, or people imploring me to automate the creation of their slide decks, I hated few things more in day to day. What really pissed me off was the suspicion that it really didn't need to be this hard...
tags: ['marp', 'pdf', 'js', 'presentation', 'vscode']
---

I have spent years dodging Powerpoint, with limited success. Whether it was me that was expected to deliver the presentation, or people imploring me to automate the creation of their slide decks, I hated few things more in day to day. What really pissed me off was the feeling that it really didn't need to be this hard. Why do I need to click click click, why can't I just write some code? I thought I'd try out some modern tools that aim to address exactly this problem.

I actually found a meetup event named [Making slides with reStructuredText](https://www.meetup.com/CamPUG/events/283307340/) which I attended (shoutout to [CamPUG](http://campug.uk/), they're a friendly bunch). I tend to prefer Markdown but the talk got me thinking as most of the ideas could be applied to both and helped me define my requirements as a starting point.

### Goals

What I was hoping to develop was a workflow for creating simple slide decks from my editor. I don't have to present all that often, and when I do, I'm not really interested in animations and fancy transition effects. I just want to be able open my editor and knock out a dozen of so static slides in minutes and be able to leverage most of the features of Markdown. That is, text (obviously), lists, tables, embedded images and crucially, syntax highlighting of code blocks.

While HTML output might be nice, my key requirement is to able to be able to automatically create a PDF version of my presentation. One of the things I took away from the talk I attended is how robust PDFs are for presenting static slide decks. There's no need to worry about browser compatibility issues (even if these have mostly gone away these days) and pretty much any PDF viewer will have a presentation display mode. Sure, this precludes use of animations but, realistically, this is something I won't use 99% of the time.

Being able to add the build step to a CI tool would be the icing on the cake. If you did loads of presentations, and were likely to re-use them, how cool would it be to store the text in a git repository and be able to update them and re-produce them seamlessly?! Again, this probably isn't going to be super important for me (but would be fun to play with).

### Tools Considered

I did a little bit of digging and, thanks to the awesomeness of the open source community, there are dozens of different tools that I could use. A few that caught my eye after a cursory search were:

* [Pandoc](https://pandoc.org/) - a versatile document coverter written in Haskell which supports multiple different markup and output formats
* [reveal.js](https://revealjs.com/) - a fully fledged js framework for creating really slick HTML slides that supports Markdown and lots more
* [landslide](https://github.com/adamzap/landslide) - a tool written in Python for turning Markdown (and rST etc) into HTML
* [Marp](https://marp.app/) - a dedicated Markdown converter geared towards slide creation with an intuitive vscode extension

Of the above, Pandoc looks extremely useful but I was leaning towards a tool more focused on creating presentations specifically. Meanwhile, reveal.js was geared to creating fancy presentations in HTML but just seemed like overkill for my use case. I did play around with Landslide, which has the appeal of being written in Python, and it worked just fine but when I tried Marp, via the [vscode plugin](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode), I was hooked.

There are no doubt ways of achieving something similar with other tools, but the ability to type Markdown in an editor pane and have it renderred as slides in the preview pane, was exactly the experience I was looking for. Ideally, with this workflow, I would be able to knock out a simple slide deck in minutes and produce a PDF that I can  present just about anywhere.

### Getting Started with Marp

By installing the vscode extension, I was up and running in seconds. Of course I know that everyone uses different editors but the extension I'm using just builds on the Marp framework and there's no reason one can't use different tools within the ecosystem to produce slides in the same way. That said, having the preview pane in my editor is the perfect workflow for me. I can write my slides and see the result in real time.

Creating a simple slide deck is easy. All you need to do is create a Markdown file and add a [front matter](https://jekyllrb.com/docs/front-matter/) section with the following:

```markdown
---
marp: true
---
```

The only other thing to understand, beyond a knowledge of Markdown, is that a new slide is indicated using a "ruler" `---`. So we could create a simple title slide and and a few more pages with something like this:

```markdown
# Presentations as Code with Marp!

by Alexander Sutcliffe
+ [Github](https://github.com/scrambldchannel)
+ [Blog](https://dashingelephant.xyz/)

---

## Agenda
+ What is Marp?
+ Why use it to create presentations?
+ What cool features does it have?
+ Conclusion
---

## What is Marp?

The [Marp Presentation Ecosystem](https://marp.app/) (Marp for short) is a collection of tools that allow you to create elegant slide decks using the familiar Markdown syntax

---

## Why use it to create presentations?

* Creating slides with wysiwg tools (e.g. Powerpoint) is a nightmare
* Concentrate on content, not bells and whistles
* Slidedecks can be committed to version control!

---

```

### Syntax Highlighting

As I mentioned above, this is a key benefit for me. When giving technical presentations, it's quite common to want to be able to show some code, and while I will often drop to my editor to demo things live, it's nice to be able to produce a slide deck with some readable code examples included. Using Markdown to create your slides means you get this for free.

This is all getting a bit meta but, given that I'm writing this blog post in Markdown, it's difficult to illustrate but Marp will render a code block prefixed with three backticks and a language just as you would expect. That is, the following Python code will look appear highlighted according to the theme you're using.

```python

num_mouse_clicks_for_a_ppt = 1000000
for mouse_click in num_mouse_clicks_for_a_ppt:
    print(f"My RSI has been inflamed by {mouse_click} mouse clicks")

```

### Themes

Marp comes with a [few themes built in](https://github.com/marp-team/marp-core/tree/main/themes) but creating your own [seems well documented](https://marpit.marp.app/theme-css). For my use so far, I've been happy with the default theme but if I wanted to switch to the `gaia` theme I would simply specify this in the front matter section of my file:

```markdown
---
marp: true
theme: gaia

---
```

It's also possible to override the CSS of a theme using the `<style>` tag and enclosing your custom style. By default it will apply changes globally (i.e. to all slides) but if you use `<style scoped>`, it will only effect the slide it's added to. For example, the following can be added to a slide's markdown to change the rendering of the `emp` (i.e. text enclosed in `**` in Markdown) tag:

```html
<style scoped>
strong {
  font-size: 64px;
  color: lightblue;
}
</style>
```

### Using directives

[Directives](https://marpit.marp.app/directives) are extensions to the Markdown syntax that Marp provides that allow you to specify desired outwith standard Markdown. In fact `theme` is simply a directive. They can be used in a number of different ways. For example, rather than setting the `theme` key in the front matter as above, we can use the following directive to change the theme globally:

```markdown
<!-- theme: gaia -->
```

Another directive let's you add pagination to slides. Again this can either be specified in the front matter:

```markdown
---
marp: true
pagination: true

---
```

Or, alternatively, you can add the directive inline:

```markdown
<!-- paginate: true -->
```

Using the directive inline allows you to specify that it should only take effect from the page it is added to onwards, or until it is overwritten by another inline directive

You can further restrict the scope of a directive by prefixing it with an underscore:

```markdown
<!-- _paginate: true -->
```

The snippet above could be used to add a page number to the current slide only (although I'm not sure why you would necessarily want to do that). Other directives are available and provide other functionality that is relevant in the context of presentations such as adding headers as footers to slides.

### Images

Of course at some point you're likely to want to add an image or two to your presentation. Marp [extends the Markdown syntax](https://marpit.marp.app/image-syntax) to make this a bit easier. I still found this a bit of pain (but then I find embedding images neatly into anything a bit fiddly). Basic usage would be something like this:

```markdown
![](image.png)
```

Image can be scaled using width and height (or shorthand equivalents):

```markdown
![width: 200px height: 150px](image.png)
![w: 30cm h: 20cm](image.jpg)
```

You can also apply css filters with Marp. To be honest, not being a full time web developer, I didn't even know these things existed until today but I can see how some might be useful. For example, converting images to greyscale might be useful if colours aren't displaying properly for whatever reason:

```markdown
![grayscale](image.gif)
```

You can also use the `bg` keyword to set an image as the background for a slide. You can also use as many keywords as you like in combination. For example, this would set the slide background image and also set the opacity to 20% and blur the image somewhat. Something like this could be really useful for creating a cover slide or adding logos or watermarks to slides.

```markdown
![bg opacity:0.2 bg blur:5px](image.png)
```

In the Marp docs there is mention of an advanced backgrounds (experimental at the time of writing) which offers support for using multiple images and splitting backgrounds. The standard functionality is all I see myself needing, at least at this stage.

### Rendering a presentation

If you are using the vscode extension, and just want to produce a pdf on an ad hoc basis, you can simply click a button and export a pdf. I produced the following presentation doing exactly that:

<embed src="/blog/pdfs/presentations_as_code.pdf" title="presentations_as_code_pdf" width="100%" height="600px" allowfullscreen />

Still, there's a lot more power and flexibility you can unlock if you use the [Marp CLI](https://github.com/marp-team/marp-cli) package. You can install from npm or simply (and my preferred method) execute directly from npm using npx:

```bash{promptUser: "alex"}{promptHost: "deathstar"}
npx @marp-team/marp-cli@latest presentations_as_code.md --pdf
```

You'll note that I've used a flag to specify that I want to render as a pdf. HTML is the default and the Marp CLI can also output presentations in Powerpoint format and more. The CLI offers further options for customising your output. It would trivial to wrap your desired options in a simple Makefile or even to use Marp as part of a CI pipeline. I note that someone has created a [Github action](https://github.com/marketplace/actions/marp-action) that can output a presentation to a Github pages which seems interesting...

### What's missing?

As much as I find it hard to empathise with them, I'm sure there are Powerpoint and Prezi experts out there that would be horrified at the list of things they can't do. As much as super slick animated presentations can look really cool, they're not something I really aspire to being able to create. Partly because I'm lazy and devoid of artistic talent, but also because I feel these things are often a distraction or a massive waste of time.

There is one thing I hoped would work out of the box that didn't and that is being able to embed Mermaid charts. This would make Marp perfect for my needs but the good news is that there are ways of making it work, with a little bit of effort. This [issue thread](https://github.com/marp-team/marp-core/issues/139) outlines some workarounds and also hints that this functionality could be added via plugin. That's right, Marp has a plugin architecture, one that I haven't really explored but that makes me excited at the possibilities!
