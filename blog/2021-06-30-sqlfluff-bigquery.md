---
title: Removing the lint from BigQuery SQL with SQLFluff
date: 2021-12-14
summary: Our reporting stack is built atop over 15k lines of BigQuery SQL that I have been trying to tame. Having made good use of Python formatters and linters like Black and Flake8, I wanted a linter that could help me clean up the code and also potentially be integrated with pre-commit and Github Actions.
tags:
- sql
- bigquery
- formatter
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
from my-project.reporting.sales sales,
        my-project.reporting.products prod
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
sqlfluff fix --exclude-rules L031,L038,L057 sales_report.sql --dialect bigquery
```

In the above invocation, I've excluded the rule about aliases, the one about trailing commas and the special characters in table names. I don't really have a strong opinion either way on the trailing comma questions but it's pretty common in our codebase and doesn't strike me as a massive problem. Likewise, the special characters rule here seems to be triggered by my SQL enclosing the table names in in backticks. BigQuery does this when using it's auto formatter, so again, it's quite common in our code.

The goal of a linter is to flag up a issues but you also need to use a bit of pragmatism. If your codebase uses patterns that SQLFluff doesn't agree with, I'd suggest not getting bogged down in them, especially when you're trying to sell the idea to colleagues. I will continue to tweak my config to find a nice balance, depending on the context.

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


That said, the fixable violations are only a subset of the issues that made SQLFluff sad in lint mode. When you look into though, it's easy to see why. One of the things that SQLFluff is good at flagging is ambiguity but it can't make those decisions for you.

For example, In my SQL, I'm joining two tables but I'm not specifying which table each column I use in my SELECT and WHERE clauses is actually from. This SQL may well be valid but, at a glance, it can be difficult for a human, especially one new to the codebase, to determine which table a column like `as_at_date` actually exists in. SQLFluff is giving me a (not so gentle) reminder to make life easier for others.

So for that reason, rules like that can be really useful but you're left to your own devices when it comes to fixing them. Changing the code to something like the following will make SQLFluff happy and make your code easier to read:

```sql
SELECT
    sales.as_at_date,
    sales.division,
    sum(sales.sales) AS total_sales,
FROM `my-project.reporting.sales` AS sales,
    `my-project.reporting.products` AS prod
WHERE sales.as_at_date = '2021-09-30'
    AND sales.product_id = prod.id
```

So that's an overview of pretty basic SQLFluff usage. There's a lot more that can be done, including setting a repository wide config file, linting jinja and dbt templates and integrating SQLFluff with your CI/CD pipeline via pre-commit hooks and Github actions. I'm working on this very topic currently and hope to get around to writing about my progress.
