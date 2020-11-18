---
title: Trying to stay on the right track with git
date: 2020-09-28
summary: For when my memories are murky, this is a list of common git commands I tend
  to use, aimed at a relative newbie. I actually used it to give an intro to git presentation
  to my team a few years ago but it's still a nice reminder of basic usage.
tags:
- git
- github
- bash

---
This is a list of common git commands I tend to use, aimed at a relative newbie. I actually used it to give an intro to git presentation to my team a few years ago but it's still a nice reminder of basic usage. I'll tweak it as I go along.

### Clone a repo

Probably one of the first operations you want to use is to clone a remote repository, e.g. one that exists on Github:

```bash{promptUser: "alex"}{promptHost: "thinky"}
git clone https://github.com/scrambldchannel/tm1py
```

### Create a local branch and check it out

When you're hacking on code, you probably want to do it in a separate branch. A branch can be created and then checked out by doing the following:

```bash
git branch features/my_new_feature
git checkout features/my_new_feature
```

This is fine, but I've lost count of the times I've created the branch but forgotten to check it out. This has sometimes led me to commit changes to the wrong branch and having to clean up the mess. So I generally use this command to both steps in a single line:

```bash
git checkout -b features/my_new_feature
```

### Stage a file

Once you've changed some files, you want to save them to the repository. This command stages changes to a file which means it will be committed to the repository on the next commit:

```bash
git stage TM1py/Objects/Process.py Tests/Process.py
```

### Commit staged changes

This will commit all staged changes to the repository with the commit message you provide. Note, this is the point it which it can be worth taking a deep breath and checking that you're really doing what you want.

```bash
git commit -m "added my cool new feature"
```

### List staged files

What you might want to do before committing is to check which files are staged:

```bash
git diff --name-only --cached
```

### Merge changes from a branch

Once you've committed some changes to a branch, you may want to add these changes into another branch. For example, I might want to merge the changes made in features/my_new_feature into my master branch:

```bash
git checkout master
git merge features/my_new_feature
```

### Delete a branch

Once your changes have been merged into master, you can delete the branch you used to develop the feature:

```bash
git branch -D features/my_new_feature
```

### Push local changes to remote

When working on a project hosted remotely (e.g. on Github) you will eventually want to push your changes up to the remote git repository. If the branch you're working on already exists, you can push changes with this command:

```bash
git push
```

If the branch doesn't already exist on the remote repo, you can create it and push to it with this command:

```bash
git push --set-upstream origin features/my_new_feature
```

### Add an upstream remote

When working on projects owned by other people on Github, the workflow I follow is to create my own fork on Github, clone it locally, create a branch for what I'm working on, push it to Github and then create a PR from there. Adding an upstream allows me to receive any changes made by the owner into my fork.

```bash{promptUser: "alex"}{promptHost: "thinky"}
git remote add upstream https://github.com/cubewise-code/tm1py.git
```

### Fetch changes from a remote

When changes have been made upstream, I fetch changes and rebase my local master branch before pushing it my remote fork. Changes can be fetched from upstream with this command:

```bash{promptUser: "alex"}{promptHost: "thinky"}
git fetch upstream
```

### Rebase a local branch on remote

I can rebase the branch I'm working on with a remote fork (in this case upstream) in order to apply any changes made upstream to my local fork. This is a good idea before raising a PR and ensures your PR is easier to understand.

```bash{promptUser: "alex"}{promptHost: "thinky"}
git rebase upstream/master
```

In this case, I can then push my changes up to my remote fork so it is tracking upstream.

### Checkout a remote branch

Sometimes someone will create a new fork in the upstream repository that I wish to clone locally. Or perhaps I want to check out a branch I've pushed to my remote fork repository from a different development environment.

```bash{promptUser: "alex"}{promptHost: "thinky"}
git checkout --track upstream/issue/cube-get-last-data-update
```
