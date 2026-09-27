---
id: "behavior-tree"
slug: "behavior-tree"
order: 7
title: "Behaviour Tree Tool"
category: "Technical"
browseGroup: "Technical"
projectType: "Student Technical Tool"
dates: "2018–2020"
engine: "Unity"
platforms: ["Unity editor"]
tags: ["AI Tools", "Unity", "Technical Design"]
selectedWork: false
image: "/behavior-tree-image.webp"
imageAlt: "Unity Behaviour Tree visual editor"
videos:
  - videoId: "gWdGxazrgqw"
  - videoId: "ntX2sU9pToA"
videoId: "gWdGxazrgqw"
roles: ["Tools Designer", "Programmer"]
responsibilityAreas: ["Behaviour Tree framework", "Visual editor", "Real-time debugging", "Reusable ScriptableObject structure"]
summary: "A visual authoring and debugging tool created for the code-first Behaviour Tree used in District Underground."
relatedProjects: ["district-underground"]
---
## Why I built it

District Underground's original Behaviour Tree existed only in code. That made its structure difficult to read and slowed down debugging, so I created a Unity editor tool that made the tree visible and easier to author.

## Main features

- Behaviour Tree construction and visualisation;
- real-time flow viewing and debugging;
- a ScriptableObject base for trees, actions and nodes;
- a structure that could be moved between projects more easily.

The tool was both a programming project and an early technical-design exercise: it translated a system into an interface that made iteration clearer.
