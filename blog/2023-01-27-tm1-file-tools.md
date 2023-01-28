---
title: TM1 File Tools - scratching an itch
date: 2023-01-27
summary: Over the years, I'd built up a number of scripts and hacks for carrying out various tasks. Having often worked in pretty locked down environments, my only recourse was often batch files, vb script or powershell. I don't enjoy working in any of those so as opportunities to use Python have increased, I started creating a common library for use on projects.

tags:
  - tm1
  - python
  - hack
---

Over the years, I'd built up a number of scripts and hacks for carrying out various tasks. Having often worked in pretty locked down environments, my only recourse was often batch files, vb script or powershell. I don't enjoy working in any of those so as opportunities to use Python have increased, I started creating a common library to automate tasks such as:

- Removing junk from a TM1 instance's folders like blbs
- Identifying and removing `orhapaned` objects like `rux` files for a cubes that don't exist
- Processing transaction logs and `cma` files
- Derive information from text files like `pro`, `vue` and `sub` for example

I worked on in it in a couple of weekends so it's still a bit rough around the edges. I'm not really happy with the api so will be refactoring and making some breaking changes in the next iteration but I have already found it useful, especially for hoovering up garbage that has accumulated. For anyone curious, the project is hosted [here.](https://github.com/scrambldchannel/tm1-file-tools)

There are some other features I'd like to add such as log rotation, processing of error and server logs and adding linting features although going too far in that direction would require writing proper parsers for `rux` and `pro` files which seems a bit intimidating right now.

Perhaps there are some uses within a CI/CD environment too? One thing I have almost gotten to work is converting a TI `pro` file to a json object that TM1py can read and instantiate as a process on a connected TM1 server. Depending on your workflow, this might be useful if you want to translate between `pro` and json files in a git repository for example. In fact I started looking at doing this with all the Bedrock processes which might simplify automated installs. Still a work in progress though.

As a final aside, I also set the project up with automated documentation using Sphinx that creates html docs based on docstrings. I love this sort of tooling, it makes it easy to scaffold slick documentation for a project and build it up over time.
