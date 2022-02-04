---
title: There's no excuse not to be Pretty (or bad spelling)
date: 2022-02-03
summary: There's no body shaming here but as a big proponent of code formatters and pre-commit hooks, I was a little shocked by the extent of the makeover Prettier gave my code (and I learned how to spell "curiosity")
tags:
  - pre-commit
  - dev-ops
  - prettier
  - formatter
  - codespell
---

There's no body shaming here but as a big proponent of code formatters and pre-commit hooks, I was a little shocked by the extent of the makeover Prettier gave the code that builds this website. One of the reasons I created this site in the first place (apart from trying to sell my self to the highest bidder) was to explore the jamstack and try to automate everything.

So when I did a quick overhaul of the naive cypress test suite to stop it failing (and add some vague comments for my future self) I realised I was writing actual js code and, much like I cajole my colleagues into using formatters and linters in the python space, even if they are just starting out, I should probably find something for this janky javascript I'm writing.

### Using Prettier as pre-commit hook

Thing is, I'd vaguely heard of [Prettier](https://prettier.io/) and had assumed it was a javascript tool. So I innocently added the following to my `.pre-commit-config.yaml`:

```yaml{codeTitle: ".pre-commit.yaml"}
  - repo: https://github.com/pre-commit/mirrors-prettier
    rev: "v2.5.1"
    hooks:
      - id: prettier
```

Still thinking it was just going to have a look at my `.js` files, I figured I'd run it for all files:

```bash{promptUser: "alex"}{promptHost: "deathstar"}
pre-commit run --all-files prettier
```

The source control icon in vscode proceeded to light up like a christmas tree! It was at this point I realised I should have read the manual... I had [red ink](https://github.com/scrambldchannel/dashingelephant/commit/ebdbb549afd1f9623186b5e214814aeb0d48600b) all over over my js, json, Markdown, yaml, css and vue files. That is, Prettier had something to say about just about everything which I hadn't expected.

So I went to the site and while it is fair to say that it's aimed at people working on the web, with support for js, json and html etc, it does a lot more. It can also be extended with plugins and lists support for Ruby, PHP, Java and more. It doesn't mention Python though although, presumably because that space has been taken up by Black.

### Arguing with Codespell

Despite the magnitude, I was fairly comfortable with the changes - my site still looked OK and my sketchy test suite still passed - so I figured I'd commit them. This is where I ran into some previously unnoticed (or possibly just ignored) issues with my spelling, or at least Codespell thought so.

One sticking point was `curiosity` which as non-US English speaker, I could have sworn had a second `u` in it. I googled it, turns out I was wrong... The second issue was a little less obvious. I was getting the following text flagged:

```bash
codespell................................................................Failed
- hook id: codespell
- exit code: 1

blog/2020-09-25-strava-api.md:223: BA ==> BY, BE
```

Now the thing is, that is the ISO-3166 code for [Bosnia and Herzogovina](https://laendercode.net/en/2-letter-code/ba). Fun fact, I originally speled `Herzegovina` wrong and codespell was totally cool with that. None of the other country codes in that post were causing an issue and although I don't know enough about codespell, I suspect it was telling me that it thought I was trying to spell the words `by` and `be` rather than suggesting that I meant Belarus or Belgium. Codespell got even more annoyed with me after I started writing about it in this post!

Anyway, I fiddled around a bit and got it to ignore those words. I think there are a number of ways to achieve it but the one that worked for was to pass an ignore file as an arg to the hook:

```text{codeTitle: ".codespellignore"}
ba
BA
```

```yaml{codeTitle: ".pre-commit.yaml"}{6}
  - repo: https://github.com/codespell-project/codespell
    rev: v1.17.1
    hooks:
      - id: codespell
        files: \.(md|rst)$
        args: [-I, .codespellignore]
```

Of course the downside is that I might end up misspelling `by` all the time but codespell is just a guard rail for obvious and common mistakes, I'm sure there are plenty of typos and grammatical mistakes on this site, I need something like Grammarly for vscode... That said, it just stopped me making this, somewhat meta, mistake:

```bash
codespell................................................................Failed
- hook id: codespell
- exit code: 1

blog/2022-02-03-there-is-no-excuse-not-to-be-prettier.md:70: mispelling ==> misspelling
```

Of course now I'm in a classic catch 22 situation because I can't put that output in this post without triggering a failure. I also don't really want to ignore it because, as I've just seen, it is exactly the kind of stupid mistake I would make! There's an [enhancement request](https://github.com/codespell-project/codespell/issues/1212) to support ignoring on a case by case basis but I imagine this is a pretty thorny problem to solve. I guess this is what `--no-verify` is for....
