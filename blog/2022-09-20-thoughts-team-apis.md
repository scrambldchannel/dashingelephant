---
title: Re-imagining our team using the concept Team APIs
date: 2022-09-20
summary: We are currently exploring the concept .
tags:
  - documentation
  - management
---

```
erDiagram
          MERMAIDS |o..|{ FAIRYTALES : "sometimes appear in"
          TEXT_EDITORS }o..|{ CHARTING_TOOLS : "can perform as"
          CHARTING_TOOLS }|..|{ LIBRARIES : "depend on"
          FAIRYTALES }o..o{ LIBRARIES : "are found in"
```

```mermaid
graph LR
    A(Idea) -->|scribble| B{Is this legible?}
    B -->|No| C[Think about what could have been]
    B -->|Yes| D[Make a million dollars]
```

```mermaid
graph TB
    subgraph staging
    datasource_1 --> |load| staging_1
    datasource_2 --> |load| staging_2
    datasource_3 --> |load| staging_3
    end
    subgraph transformation
    staging_1 --> |transform| dim_1
    staging_2 --> |transform| dim_2
    staging_3 --> |transform| fact_1
    end
    dim_1 --> |join| reporting_view
    dim_2 --> |join| reporting_view
    fact_1  --> |join| reporting_view
    subgraph reporting_layer
    reporting_view --> reports
    reporting_view --> dashboards

    end

```
