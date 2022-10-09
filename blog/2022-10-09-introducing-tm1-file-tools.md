---
title: Using tm1-file-tools to clean up your data directory
date: 2022-10-09
summary: Over the years I've hacked together numerous throwaway scripts (in multiple languages) for working with the files a TM1 server creates. I recently started to organise some of these ideas in a lightweight Python library which I've published an alpha version of on Github
tags:
  - tm1
  - python
  - open source
---

Over the years I've hacked together numerous throwaway scripts (in multiple languages) for working with the files a TM1 server creates. I recently started to organise some of these ideas in a lightweight library [(tm1-file-tools)](https://github.com/scrambldchannel/tm1-file-tools) which I've published an alpha version of.

### Overview of a typical TM1 directory

Most projects are structured with separate log and data directories and the config file is either in the parent directory of both or a separate directory at the same level as the log and data folders. This can vary _wildly_ of course but an example structure might be something like this:

```
tm1
│   tm1s.cfg
└── data
│   │   My Cube.cub
│   │   My Cube.feeders
│   │   My Cube.rux
│   │   My Dim1.dim
│   │   My Dim2.dim
│   │   My Dim3.dim
│   │   My Process.pro
│   │   ...
│   └── My Cube}vues
│   │   |   Default.vue
│   │   |   ...
│   └── My Cube}vues
|   |   |   All.sub
|   |   |   ...
│   └── Alex
|   │   └── My Cube}vues
|   |   |   |   ...
|   │   └── My Cube}vues
|   |   |   |   ...
└── logs
│   │   tm1s20221002093541.log
│   │   ...
│   │   tm1server.log
│   │   tm1s.log
```

Obviously there will be many more files in there once you throw in all the control objects. People often also nested other folders for things like text exports or scripts they execute for doing various things or for backups. The tool I'm working on is largely focused on the TM1 specific stuff.

### Cruft builds up over time

The problem I've often come across a lot of crap gets left behind. This is often down to lazy development practices but is also exacerbated by gaps in the tooling that mean objects are still often promoted to a production environment by manually copying files which circumvents some of the cleanup the server does for you. There has been innovation in the tooling space and some teams are more sophisticated but the problem still remains in a lot of implementations.

Examples of the sort of stuff that builds up can be:

- _Orphaned_ files (e.g. a `.rux` file for a cube that longer exists)
- Subsets and views that were intended to be temporary but didn't get cleaned up (often prefixed with a `}` so not visible to most users are still annoying)
- What I think of as _ghost_ cubes - i.e. a cube file still exists but some of its dimensions no longer exist
- Giant log files that never get cleaned out
- Random text files containing exports of cube data
- Private views and subsets for non-existent users

Sure, some of these things aren't a big deal as they're invisible to most users. However they all degrade the signal to noise ratio. Some can cause serious problems such as running out of disk space owing to 300gb of old log files or a a process dying because there is a ghost cube that has somehow remained in the `}Cubes` dimension.

### Using Python to aid cleanup

Most solid implementations will have a solution for rotating logs and there is a lot you can do to
