---
id: "environment-query-system"
slug: "environment-query-system"
order: 8
title: "Environment Query System Tool"
category: "Technical"
browseGroup: "Technical"
projectType: "Student Technical Tool"
dates: "2018–2019"
engine: "Unity"
platforms: ["Unity editor"]
tags: ["AI Tools", "Queries", "Unity"]
selectedWork: false
image: "/eqs-image.webp"
imageAlt: "Unity Environment Query System debug view"
videoId: "agZPd6LQoQ8"
roles: ["Tools Designer", "Programmer"]
responsibilityAreas: ["Environment sampling", "Query scoring", "Visual debugging", "Reusable query tests"]
summary: "A Unity tool inspired by Unreal's Environment Query System, built to give District Underground's AI useful spatial information."
relatedProjects: ["district-underground"]
---
## Why I built it

I created this tool for District Underground so enemy AI could query the environment and use the results when choosing positions. Unity did not provide an equivalent at the time, so I used Unreal's Environment Query System as a reference for the approach.

## Main features

- environment-data queries;
- visual feedback for query data and test results;
- swappable, scriptable tests;
- adjustable query shapes and point density;
- optional height adjustment for uneven terrain.

Use cases included combat positioning for flanking or specific attacks, maintaining line of sight, choosing cover and finding hiding positions.
