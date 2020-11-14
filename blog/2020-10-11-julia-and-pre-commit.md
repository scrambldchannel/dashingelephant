---
title: Julia are you sure I should commit?
path: /julia-and-pre-commit
date: 2020-10-11
summary: I've been working on Julia for a week now and wanted to try add some pre-commit hooks to the module I have started creating. One of the strengths of the pre-commit library for Python is the ability to create hooks for other languages. I didn't find much out there for Julia though so I tried to build one from scratch.
tags: ['julia', 'git']
---

I've been working on Julia for a week now and wanted to try add some pre-commit hooks to the module I have started creating. One of the strengths of the pre-commit library for Python is the ability to create hooks for other languages. I didn't find much out there dedicated to Julia although there are a few simpler hooks to handle whitespace etc that could be applied. I decided to investigate trying to build some Julia specific hooks from scratch.

Pre-commit hooks are great for code formatting so I had that goal in mind as well as applying some basic linting. I also wanted to look at having the option to run a suite of tests. Generally, I avoid running tests automatically on each commit as it just takes too long. That said, curiousity meant that I wanted to build it, as a proof of concept if nothing else.

### Where to get started?   

I was able to get some inspiration from the collection of scripts within the [Julia Actions](https://github.com/julia-actions) organisation on Github. It contains workflows for both testing and formatting. I'd already set these up as Github actions on my workflow but I wanted to try run something similar locally, rather than within Github.

The actions are defined as yaml and in both of these cases simply call a shell one-liner that uses the Julia interpreter to run the built in test runner and the JuliaFormatter package. I was able to grab that as a starting point for my hooks, thanks open source. That said, I didn't find any obvious linting tools to leverage. I tried one package but it didn't work out of the box so I moved on for now. 

### Creating a repository to define the hooks

Initially, I created some hooks that just ran a shell script saved in my project's repository but rather than including a copy of the script in all my Julia projects, I wanted to save my hooks to a separate repository to make it easier to share them around. Mainly though, I just wanted to understand how to implement this because it seemed cool. 

I created a [new repository](https://github.com/scrambldchannel/pre-commit-julia) and got started. In order for pre-commit to be able to run my hooks, the repository needs to contain a yaml file containing some metadata and any external code it needs to run. Here are the files I created:

#### .pre-commit-hooks.yaml

This defines two hooks that will be run when any Julia files are changed. The ```entry``` field defines where to find the script that needs to be run.

```yaml
-   id: format_julia
    name: 'format_julia'
    entry: pre_commit_hooks/format.sh
    files: '\.(jl|JL)$'
    verbose: true
    language: 'script'
    description: "Reformats Julia code"
-   id: runtests_julia
    name: 'runtests_julia'
    entry: pre_commit_hooks/runtests.sh
    files: '\.(jl|JL)$'
    verbose: true
    language: 'script'
    description: "Runs julia tests"
```

#### pre_commit_hooks/format.sh

This is the script for formatting Julia code that will be fired by the ```format_julia``` hook. It first checks whether Julia is available in your path and, if so, askes Julia to execute a simple one liner that uses the formatter package to clean up any code. It will be executed once for every matching file that has been staged.

```sh
#!/bin/bash

# check Julia is in path
if ! command which julia &>/dev/null; then
  >&2 echo 'julia not found'
  exit 1
fi

julia --color=yes -e  "using Pkg;Pkg.add(\"JuliaFormatter\");using JuliaFormatter;format(\".\");"
```

#### pre_commit_hooks/runtest.sh

This script also requires Julia and will run all the tests. It also takes a few arguments that allow setting a few parameters. These arguments can be passed to the hook when you add the hooks to your project.

```sh
#!/usr/bin/env bash

# check Julia is in path
if ! command which julia &>/dev/null; then
  >&2 echo 'julia not found'
  exit 1
fi

# defaults
checkbounds=yes
inline=yes
coverage=false

while :; do
    case $1 in
        coverage)
            coverage=true
            ;;
        noinline)
            inline=no
            ;;
        nocheckbounds)
            checkbounds=no
            ;;
        *)
            break
    esac

    shift
done
# need to check what this first line does because I honestly can't remember!
julia --color=yes -e 'using Pkg; VERSION >= v"1.5-" && !isdir(joinpath(DEPOT_PATH[1], "registries", "General")) && Pkg.Registry.add("General")'
julia --color=yes --check-bounds="$checkbounds" --inline="$inline" --project -e "using Pkg; Pkg.test(coverage=$coverage)"
```

### Adding the hooks to a Julia project

Assuming you have pre-commit installed in the project, you can add the hooks by adding something like this to your project repository. Note that I am specifying that I only want the tests to be run on a _push_. This is because they potentially take a long time so I don't want to run on every commit but I do want to run before pushing into Github because I'd rather a test fail locally than on Github's test runners. 


```yaml
- repo: https://github.com/scrambldchannel/pre-commit-julia
  rev: v0.1.5
  hooks:
    - id: runtests_julia
      files: '\.(jl|JL)$'
      stages: [push]
    - id: format_julia
      files: '\.(jl|JL)$'
```

### Conclusions

Well I got something working but I'm not sure how useful it is in practice due to how long the scripts take on even my relatively modest module. This is largely due to startup time of Julia's interpreter which is relatively slow compared to Python's. This is a deliberate trade off for Julia though, that startup time is relatively slow but that's what you're paying for the theoretical improvement in runtime speed. Anyway, it was a good learning experience. 



