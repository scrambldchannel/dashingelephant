---
title: Removing the lint from BigQuery SQL with SQLFluff
date: 2021-02-14
summary: Our reporting stack is built atop a somewhat tangled web of over 15k lines of BigQuery SQL. I wanted a linter that could help me clean up the code and also potentially be integrated with pre-commit and Github Actions. The search proved a little harder than anticipated, largely because few such tools support BigQuery's flavour of SQL but I came across SQLFluff and have been checking how feasible it would be to use on this project.
tags:
- sql
- bigquery
- formatter
- devops
---

Our reporting stack is built atop over 15k lines of BigQuery SQL that I have been trying to tame. Having made good use of Python formatters and linters like Black and Flake8, I wanted a linter that could help me clean up the code and also potentially be integrated with pre-commit and Github Actions.

The search proved a little harder than anticipated, largely because few such tools support BigQuery's flavour of SQL but I came across [SQLFluff](https://www.sqlfluff.com/) which is a really cool tool and I've tried to outline my experiences implementing it.

## Installation

SQLFluff is written in Python so can be installed with pip:

```bash{promptHost: "deathstar"}
pip install sqlfluff
```

## Interactive Usage

SQLFluff can be run from the command line in either lint or fix mode. The difference between the modes is pretty simple - where linting just complains, fix mode will attempt to automatically fix certain problems.

### Linting

This command that will lint the specified file, providing feedback to stdout. The `--dialect` flag is optional and by default, will try to process your files using it's standard ansi SQL parser.

```bash{promptHost: "deathstar"}
sqlfluff lint sales_report.sql --dialect bigquery
```

Using the BigQuery dialect ensures that SQLFluff will handle the idiosyncrasies of the flavour of SQL it uses. This is important, not least because BigQuery allows certain things that the standard doesn't.

A good example of this is trailing commas after the last column in a SELECT clause. This is valid in BigQuery but is a deviation from the standard. That is, the following is valid in BigQuery but will throw in an error if the dialect isn't specified.

```SQL
SELECT as_at_date, division, sum(sales),
from `my-project.reporting.sales` sales,
        `my-project.reporting.products` prod
where as_at_date = '2021-09-30'
```

Now in the above snippet, I've deliberately included a few inconsistencies but, while it's trivial in scale, it's pretty representative of a lot of SQL I see in the wild. SQLFluff's opinion on it is fairly chastening though:

```
== [sales_report.sql] FAIL
L:   1 | P:   1 | L036 | Select targets should be on a new line unless there is
                       | only one select target.
L:   1 | P:   8 | L027 | Unqualified reference 'as_at_date' found in select with
                       | more than one referenced table/view.
L:   1 | P:  20 | L027 | Unqualified reference 'division' found in select with
                       | more than one referenced table/view.
L:   1 | P:  30 | L013 | Column expression without alias. Use explicit `AS`
                       | clause.
L:   1 | P:  34 | L027 | Unqualified reference 'sales' found in select with more
                       | than one referenced table/view.
L:   1 | P:  40 | L038 | Trailing comma in select statement forbidden
L:   2 | P:   1 | L010 | Keywords must be consistently upper case.
L:   2 | P:   6 | L057 | Do not use special characters in identifiers.
L:   2 | P:  35 | L011 | Implicit/explicit aliasing of table.
L:   2 | P:  35 | L031 | Avoid aliases in from clauses and join conditions.
L:   3 | P:   9 | L003 | Line over-indented compared to line #2
L:   3 | P:   9 | L057 | Do not use special characters in identifiers.
L:   3 | P:  41 | L011 | Implicit/explicit aliasing of table.
L:   3 | P:  41 | L031 | Avoid aliases in from clauses and join conditions.
L:   4 | P:   1 | L010 | Keywords must be consistently upper case.
L:   4 | P:   7 | L027 | Unqualified reference 'as_at_date' found in select with
                       | more than one referenced table/view.
L:   5 | P:   1 | L003 | Indent expected and not found compared to line #4
L:   5 | P:   1 | L010 | Keywords must be consistently upper case.
L:   5 | P:  29 | L009 | Files must end with a single trailing newline.
All Finished 📜 🎉!
```

The output will be familiar if you've used other linting tools. Essentially it is a list of all the terrible mistakes in my beautiful SQL code, including the line and position and some extra information. The third column indicates the rule that was violated.

Based on the feedback, I should be able to edit my SQL file and silence them all. Happily, in many cases, SQLFluff will do that for us.

### Fixing

In fix mode, SQLFluff will essentially find all the linting violations and then see if it can fix them. This won't perform miracles, if your SQL is invalid, you've got more immediate problems to sort out but I does do a good job of automating a lot of boring stuff.

Running in fix mode is simple:

```bash{promptHost: "deathstar"}
sqlfluff fix sales_report.sql --dialect bigquery
```

The output from fix mode will look something like this:

```
==== finding fixable violations ====
== [sales_report.sql] FAIL
L:   1 | P:   1 | L036 | Select targets should be on a new line unless there is
                       | only one select target.
L:   1 | P:  40 | L038 | Trailing comma in select statement forbidden
L:   2 | P:   1 | L010 | Keywords must be consistently upper case.
L:   2 | P:  35 | L011 | Implicit/explicit aliasing of table.
L:   2 | P:  35 | L031 | Avoid aliases in from clauses and join conditions.
L:   3 | P:   9 | L003 | Line over-indented compared to line #2
L:   3 | P:  41 | L011 | Implicit/explicit aliasing of table.
L:   3 | P:  41 | L031 | Avoid aliases in from clauses and join conditions.
L:   4 | P:   1 | L010 | Keywords must be consistently upper case.
L:   5 | P:   1 | L003 | Indent expected and not found compared to line #4
L:   5 | P:   1 | L010 | Keywords must be consistently upper case.
L:   5 | P:  29 | L009 | Files must end with a single trailing newline.
==== fixing violations ====
12 fixable linting violations found
```

Being a cavalier sort, I can select `Y` and SQLFluff will format my file in place, giving me something that looks a bit cleaner:

```sql
SELECT
    as_at_date,
    division,
    sum(`my-project.reporting.sales`)
FROM `my-project.reporting.sales`,
    `my-project.reporting.products`
WHERE as_at_date = '2021-09-30'
    AND `my-project.reporting.sales`.product_id = `my-project.reporting.products`.id
```

However, one thing I don't really like is that it's removed my table aliases. Looking through the output, I think rule `L031` is to blame and I respectfully disagree with this change. The good news is that I can exclude any rules I don't really agree with, in either lint or fix mode, using the `--exclude-rules` flag.

```bash{promptHost: "deathstar"}
sqlfluff fix --exclude-rules L031,L038 sales_report.sql --dialect bigquery
```

In the above invocation, I've excluded the rule about aliases and also the one about trailing commas. On the latter, I don't really have a strong opinion either way but, pragmatically, I know this is quite widely used in our codebase and getting bogged down by something so minor seems self defeating.

The result is somewhat more pleasing:

```sql
SELECT
    as_at_date,
    division,
    sum(sales)
FROM `my-project.reporting.sales` AS sales,
    `my-project.reporting.products` AS prod
WHERE as_at_date = '2021-09-30'
    AND sales.product_id = prod.id
```


That said, the list of fixable violations are only a subset of the issues that made SQLFluff sad in lint mode. When you look into though, it's easy to see why. One of the things that SQLFluff is great for picking up, is ambiguity but I can't make those decisions for you.

For example, In my SQL, I'm joining two tables but I'm not specifying which table each column I use in my SELECT and WHERE clauses is actually from. This SQL may well be valid but, at a glance, it's difficult for a human, new to the codebase, to determine which table a column like `as_at_date` actually exists in. SQLFluff is giving me a (not so gentle) reminder to make life easier for others.

```bash{promptHost: "deathstar"}
sqlfluff fix --exclude-rules L031 bigquery/dataengine
```



## Configuration

.sqlfluff file (seems to need to be in the root of the repository), skipping rules

## Integration with vscode

## pre-commit

## Github actions
