---
title: Using bigquery-utils to unpack complicated json
date: 2023-01-29
summary: I've been working on an pipeline that takes a collection of json files, stages them in a big query table, then models the contents using dbt. One of the issues I hit was dealing with nested keys that had different values for each row. I was able to make progress by using some UDFs from the bigquery-utils project but a few steps were required.

tags:
  - big query
  - udf
  - dbt
  - sql
---

I've been working on an pipeline that takes a collection of json files, stages them in a big query table, then models the contents using dbt. One of the issues I hit was dealing with nested keys that had different values for each row. Take this trivial example with two different rows:

Row 1:

```json
{
  "teams": ["Burnley", "Arsenal"],
  "captains": {
    "Burnley": "Ben Mee",
    "Arsenal": "Granit Xhaka"
  }
}
```

Row 1:

```json
{
  "teams": ["Argentina", "Australia"],
  "captains": {
    "Argentina": "Lionel Messi",
    "Australia": "Mathew Ryan"
  }
}
```

It's easy enough to parse this for human eyes but what wasn't obvious is how I could return a result with a row per team with its captain. That is, something like this:

| team      | captain      |
| --------- | ------------ |
| Argentina | Lionel Messi |
| Australia | Mathew Ryan  |
| Burnley   | Ben Mee      |
| Arsenal   | Granit Xhaka |

The problem is that big query functions like [JSON_EXTRACT_SCALAR](https://cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_extract_scalar) require a json_path - e.g. `'$.captains.Argentina'` - which changes for every row.

In this instance, I thought I might be able to work around it by using the fact there were only ever going to be two teams and that we usefully had their names separately in an array. However this doesn't work, I tried a simple example to pull both captains for each row:

```sql
WITH
  my_data AS (
  SELECT
    1 id,
    '{"teams" : [ "Burnley", "Arsenal"], "captains": {"Burnley": "Ben Mee", "Arsenal": "Granit Xhaka"}}' json
  UNION ALL
  SELECT
    2,
    '{"teams" : ["Argentina", "Australia"], "captains": {"Argentina": "Lionel Messi", "Australia": "Mathew Ryan"}}' ),
  with_teams AS (
  SELECT
    *,
    -- I can extract the individual teams
    JSON_EXTRACT_SCALAR(json, "$.teams[0]") AS team_1,
    JSON_EXTRACT_SCALAR(json, "$.teams[1]") AS team_2,
  FROM
    my_data )
SELECT *,
      -- but trying to dynamically create a json_path doesn't work
      JSON_EXTRACT(json, CONCAT("$.captains.", team_1)) as team_1_captain,
      JSON_EXTRACT(json, CONCAT("$.captains.", team_2)) as team_2_captain
FROM with_teams
```

The above query returns the following error:

`JSONPath must be a string literal or query parameter`

A bit of googling showed that this approach won't work. In any case, I wasn't always going to have the names in an array somewhere else in the json. A few workarounds suggested on Stack Overflow wouldn't work me...

After a few coffees, I eventually made some progress by using the UDFs from [bigquery-utils](https://github.com/GoogleCloudPlatform/bigquery-utils). Using a combination of `json_extract_keys` and `json_extract_values), I was able to extract the information I wanted:

```sql
WITH
  my_data AS (
  SELECT
    1 id,
    '{"teams" : [ "Burnley", "Arsenal"], "captains": {"Burnley": "Ben Mee", "Arsenal": "Granit Xhaka"}}' json
  UNION ALL
  SELECT
    2,
    '{"teams" : ["Argentina", "Australia"], "captains": {"Argentina": "Lionel Messi", "Australia": "Mathew Ryan"}}' )
SELECT
  team,
  captain
FROM
  my_data,
  UNNEST([STRUCT(JSON_EXTRACT(json, '$.captains') AS captains)]),
  UNNEST(bqutil.fn.json_extract_keys(captains)) AS team
WITH
OFFSET
JOIN
  UNNEST(bqutil.fn.json_extract_values(captains)) captain
WITH
OFFSET
USING
  (
  OFFSET
    )
```

Sweet, this gives me the results I was after:

| team      | captain      |
| --------- | ------------ |
| Burnley   | Ben Mee      |
| Arsenal   | Granit Xhaka |
| Argentina | Lionel Messi |
| Australia | Mathew Ryan  |

I still wasn't entirely sure what I'd just done but I had something to apply to my more complicated, use cases.

Still, there was another hitch. I tried to replace the simple static json with data from my real table:

```sql
SELECT
  team,
  captain
FROM
  `my-project.my-dataset.matches`,
  UNNEST([STRUCT(JSON_EXTRACT(json, '$.captains') AS captains)]),
  UNNEST(bqutil.fn.json_extract_keys(captains)) AS team
WITH
OFFSET
JOIN
  UNNEST(bqutil.fn.json_extract_values(captains)) captain
WITH
OFFSET
USING
  (
  OFFSET
    )
```

Running this led to an error along the lines of:

`Not found: Dataset my-project:my-dataset was not found in location US`

I'm in Europe so have used `europe-west1` as my location. I often find this error a bit mysterious, not always grasping why it's looking for my data in the US. After a bit of investigating I realised the `bqutil` project isn't available in my region for reasons I didn't really understand.

Further reading led to the [instructions for installing the UDFs](https://github.com/GoogleCloudPlatform/bigquery-utils/tree/master/udfs) in one's own projects. The installation was straight forward using the gcloud cli, I just needed to download the repository and make sure I ran the commands from the udfs directory when the relevant `deploy.yaml` file is found.

Naively, I thought that would fix it but my query still didn't work. It quickly dawned on me that I'd installed the UDFs in my project, not a project called `bqutil` in my region. So all I had to do was replace references to the US project to mine:

That is:

```sql
UNNEST(bqutil.fn.json_extract_keys(captains)) AS team
```

Needs to be:

```sql
UNNEST(my-project.fn.json_extract_keys(captains)) AS team
```

So, after a few hours of head scratching, I'm moving forward again, I think I will probably understand a bit more about json wrangling in big query over the next few weeks.
