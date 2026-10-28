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
summary: "A Unity tool I built, inspired by and based on Unreal's Environment Query System, designed to give District Underground's AI meaningful spatial awareness and improve decision-making."
relatedProjects: ["district-underground"]
---
## Why I built it

I built this tool for District Underground so enemy AI could read and react to the environment when choosing positions. Unity didn’t have a built-in system like this at the time, so I took inspiration from Unreal’s Environment Query System to guide the design.

## Main features

- environment-data queries
- visual feedback for query data and test results
- swappable, scriptable tests
- adjustable query shapes and point density
- optional height adjustment for uneven terrain

The tool came into play for things like combat positioning (flanking or special attacks), keeping line of sight, choosing cover, and finding hiding spots.
