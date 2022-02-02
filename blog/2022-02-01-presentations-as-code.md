---
title: Presentations as code
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

By installing the vscode extension, I was up and running in seconds. Of course I know that everyone uses different editors but the extension I'm using just builds on the Marp framework and there's no reason one can't use different tools within the ecosystem to produce slides in the same way. That said, having the preview pane in my editor is the perfect workflow for me. I can write my slides and see the preview update in real time.

Creating a simple slide deck is easy. All you need to do is create a Markdown file and add a [front matter](https://jekyllrb.com/docs/front-matter/) section with the following:


```markdown
---
marp: true
---
```

The only other thing to understand, beyond a knowledge of Markdown, is that a new slide is indicated using a "ruler" `---`. So we could create a simple title slide and and a second page with an agenda with something like this:

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
```

### Syntax Highlighting

As I mentioned above, this is a key benefit for me. When giving technical presentations, it's quite common to want to be able to show some code, and while I will often drop to my editor to show things live, it's nice to be able to produce a slide deck with some code examples included. Adding syntax highlighting is a really nice feature and Marp gives you this for free.

This is all getting a bit meta and, given that I'm writing this blog post in Markdown, difficult to illustrate but Marp will render a code block prefixed with three backticks and a language just as you would expect. That is, the following Python code will look appear highlighted according to the theme you're using.

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

Another directive let's you add pagination to slides. Again this can either be specified in the front matter or inline:

```markdown
---
marp: true
pagination: true

---
```

Alternatively, add the directive inline:

```markdown
<!-- paginate: true -->
```

Using the directive inline allows you to specify that it should only take effect from the page it is added to onwards. You can further restrict the scope of a directive by prefixing it with an underscore:

```markdown
<!-- _paginate: true -->
```

The snippet above could be used to add a page number to the current slide only, and not all proceeding slides (although I'm not sure why you would necessarily want to do that). Other directives available allow you to add headers and footers to slides and

### Command line usage

The vscode extension enables you to create a PDF of your presentation by clicking a button but I was keen to explore the ecosystem further rather than rely on a mouse click.

### Github actions


### Plugins

### What's missing?


Adding a simple background image? I guess this can be done at the theme level or within the front matter?


Creating my own theme? Is this as simple as simply extending the css?

Directives for doing more complicated stuff - give some examples of this?

Github actions to automate building of pdfs and saving these artifacts somewhere? How cool would it be to simply push a commit and have your slides rebuild devops style? Where would they actually get saved though? Does github let me store binary files like this somewhere?
