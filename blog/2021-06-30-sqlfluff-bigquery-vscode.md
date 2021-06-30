---
title: Removing the lint from BigQuery SQL with SQLFluff
date: 2021-02-14
summary: Our reporting stack is built atop a somewhat tangled web of over 15k lines of BigQuery SQL. The web UI has a formatter built in but I wanted a formatter I could use with vscode and also integrate with pre-commit and Github Actions. Enter SQLFluff, a formatter and linter written in Python that supports BigQuery's SQL dialect     
tags:
- sql
- bigquery
- formatter
- vscode

---

Our reporting stack is built atop a somewhat tangled web of over 17k lines of BigQuery SQL. The web UI has a formatter built in but I wanted a formatter I could use with vscode and also integrate with pre-commit and Github Actions. Enter [SQLFluff](https://www.sqlfluff.com/), a formatter and linter written in Python that supports BigQuery's SQL dialect.

## Installation

SQLFluff is written in Python so can be installed with pip:

```bash{promptHost: "deathstar"}
pip install sqlfluff
```

## Usage from the command line

i.e. specifying a dialect etc

## Configuration 

.sqlfluff file, skipping rules

## Integration with vscode

## pre-commit

## Github actions
