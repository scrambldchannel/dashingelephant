---
title: Removing the lint from BigQuery SQL with SQLFluff
date: 2021-02-14
summary: Our reporting stack is built atop a somewhat tangled web of over 15k lines of BigQuery SQL. I wanted a linter that could help me clean up the code and also potentially be integrated with pre-commit and Github Actions. The search proved a little harder than anticipated, largely because few such tools support BigQuery's flavour of SQL but I came across SQLFluff and have been checking how feasible it would be to use on this project.
tags:
- sql
- bigquery
- formatter
- vscode

---

Our reporting stack is built atop a somewhat tangled web of over 15k lines of BigQuery SQL. I wanted a linter that could help me clean up the code and also potentially be integrated with pre-commit and Github Actions. The search proved a little harder than anticipated, largely because few such tools support BigQuery's flavour of SQL but I came across [SQLFluff](https://www.sqlfluff.com/) and thought I'd try to document my experience with it. 

## Installation

SQLFluff is written in Python so can be installed with pip:

```bash{promptHost: "deathstar"}
pip install sqlfluff
```

## Usage

SQLFluff can be run in either linting or fix mode, where linting just complains while fix mode tries to automatically fix certain problems. 

### Linting

```bash{promptHost: "deathstar"}
sqlfluff lint test.sql
```

Note, the default dialect is the ansi standard but it's important to specify the correct dialect, particularly if your SQL code contains a lot of vendor specific features. For example, if I don't specify BigQuery, a large number of my SQL files fail to parse.

For example, the following command will lint all the sql files in `bigquery/reporting/` using the bigquery dialect.

```bash{promptHost: "deathstar"}
sqlfluff lint rentals_and_items.sql --dialect bigquery
```

Anyway, here is the output I get:

```
== [rentals_and_items.sql] FAIL
L:   3 | P:   9 | L003 | Line over-indented compared to line #2
L:   3 | P:   9 | L034 | Use wildcards then simple targets before calculations
                       | and aggregates in select statements.
L:   3 | P:   9 | L036 | Select targets should be on a new line unless there is
                       | only one select target.
L:   3 | P:  31 | L010 | Inconsistent capitalisation of keywords.
L:   4 | P:  15 | L010 | Inconsistent capitalisation of keywords.
L:   5 | P:  28 | L010 | Inconsistent capitalisation of keywords.
L:   6 | P:   1 | L001 | Unnecessary trailing whitespace.
L:  13 | P:  26 | L010 | Inconsistent capitalisation of keywords.
L:  14 | P:  27 | L010 | Inconsistent capitalisation of keywords.
L:  18 | P:  24 | L010 | Inconsistent capitalisation of keywords.
L:  19 | P:  22 | L010 | Inconsistent capitalisation of keywords.
L:  24 | P:   9 | L039 | Unnecessary whitespace found.
L:  24 | P:  61 | L031 | Avoid using aliases in join condition
L:  25 | P:  14 | L001 | Unnecessary trailing whitespace.
L:  26 | P:  13 | L003 | Line over-indented compared to line #25
L:  26 | P:  49 | L010 | Inconsistent capitalisation of keywords.
L:  26 | P:  52 | L031 | Avoid using aliases in join condition
L:  27 | P:   5 | L003 | Indent expected and not found compared to line #25
L:  28 | P:   5 | L003 | Indent expected and not found compared to line #25
L:  30 | P:   1 | L022 | Blank line expected but not found after CTE closing
                       | bracket.
L:  33 | P:   1 | L009 | Files must end with a trailing newline.
All Finished 📜 🎉!
```

This output will be familiar if you've used other linting tools. Essentially it is a list of all the flagrant rule violations in my beautiful SQL code including the line and position and some explanatory text.

### Fixing

The good news is that SQLFluff can fix at least some of these issues. Running in fix mode is as simple as:

```bash{promptHost: "deathstar"}
sqlfluff fix rentals_and_items.sql --dialect bigquery
```

This will give me the same list of issues but some feedback on what can and can't be fixed automatically (not I've excluded the list of violations for brevity).

```
==== finding fixable violations ====
WARNING    One fix for L003 not applied, it would re-cause the same error.

[..]

==== fixing violations ====
22 fixable linting violations found
Are you sure you wish to attempt to fix these? [Y/n] ...
Attempting fixes...
Persisting Changes...
== [rentals_and_items.sql] PASS
Done. Please check your files to confirm.
All Finished 📜 🎉!
```

Somewhat mysteriously though, when I run the linter again, I would expect to get just one issue reported (i.e. the one it couldn't fix) but I get a load of new stuff. I guess it isn't perfect at this stage....

### Rules

SQLFluff, like tools like Black for Python, is opinionated but easily configured. You can choose to include/exclude any of the [built in rules](https://docs.sqlfluff.com/en/stable/rules.html#module-sqlfluff.core.rules) that you may not agree with or that are just too hard to apply to your legacy codebase.

For example, I am not totally onboard with a couple of the issues SQLFluff raises. In the example above specifically, I don't necessarily agree with L031:

```
L:  24 | P:  61 | L031 | Avoid using aliases in join condition
L:  26 | P:  52 | L031 | Avoid using aliases in join condition
```

The lines of SQL that violate this rule are something like this: 

```sql
FROM    `my-project.dataset.items` AS st
FULL JOIN 
        `my-project.dataset.rentals` AS ren
```

Personally I think using aliases, ather than using the much longer fully qualified names, aids readability in the code above r.

To exclude rule(s) you can use the `--exclude-rules` option:

```bash{promptHost: "deathstar"}
sqlfluff fix --exclude-rules L031 bigquery/dataengine
```



## Configuration 

.sqlfluff file (seems to need to be in the root of the repository), skipping rules

## Integration with vscode

## pre-commit

## Github actions
