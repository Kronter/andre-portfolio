---
id: 218
title: "Clarity Isn't the Same as Simplicity"
date: "2026-11-12"
author: "André Gottgtroy"
tags: ["Game UX", "Accessibility", "Design Philosophy"]
excerpt: "Why player comprehension and strategic depth are not opposites."
featured: false
series: "Design Philosophy"
part: 7
relatedSlugs: ["prototype-the-question-not-the-feature"]
content:
- type: paragraph
  text: |-
    I want people to spend their attention on the interesting choice. If they are still trying to work out what a button did, I have a different problem to solve.
- type: paragraph
  text: |-
    [NOTE]***Quick note:*** The examples here are design illustrations, rather than reports from particular playtests.[/NOTE]
- type: paragraph
  text: |-
    When I think about accessibility in design, I care less about counting mechanics than about whether players understand what they can do, why they might want to do it and what happened afterward. [VIOLET]That is clarity.[/VIOLET] It isn't identical to simplicity.
- type: heading-2
  text: "The difference shows up in play"
- type: paragraph
  text: |-
    Imagine a puzzle game with only one action: rotate a tile. The rules are short. But if the player cannot tell which tiles are connected or what rotation changes, the experience may be baffling. Now imagine a management game with several interacting systems, each represented through consistent icons and visible changes. The rules may be longer, yet the player can make a reasonable decision at every step.
- type: paragraph
  text: |-
    Neither example proves the more complex game is better. They show why I don't evaluate comprehension by word count alone. Rules, visual communication, timing, feedback and player expectations all contribute to how difficult something feels.
- type: paragraph
  text: |-
    I want complexity to come from considering interesting consequences, not from reconstructing hidden information or interpreting ambiguous terminology.
- type: heading-2
  text: "Show the state, don't just define it"
- type: paragraph
  text: |-
    A specification can describe a perfect system while the actual interface leaves the player guessing. If a cooldown is relevant, the player needs some indication of when the ability will return. If a relationship changes, the game should communicate enough for players to connect that change to their actions.
- type: paragraph
  text: |-
    That doesn't mean revealing every formula or removing the joy of discovery. I think of information in layers. Some things must be clear immediately: what is legal, what is currently happening, and what a chosen action is expected to affect. Other things [SIDENOTE]hidden patterns, strategic combinations or unexpected uses for a familiar tool[/SIDENOTE] can be discovered gradually.
- type: paragraph
  text: |-
    The distinction matters. Mystery about a world can be exciting. Mystery about whether clicking a button worked usually isn't.
- type: heading-2
  text: "Feedback is a conversation"
- type: paragraph
  text: |-
    Consider the act of hitting an enemy in an action game. The code can correctly reduce health without producing a satisfying response. The player may not be able to tell whether the attack connected, whether armour blocked it or whether they should adjust their timing.
- type: paragraph
  text: |-
    Animation, sound, timing, camera response and changes in enemy behaviour can turn the same calculation into legible feedback. They should help the player interpret a result, not bury it beneath noise.
- type: paragraph
  text: |-
    I am interested in that feedback as part of the decision loop. A player acts, the game responds, and the player uses that response to choose what to do next. If the response is missing or misleading, strategic learning becomes much harder even when the underlying rules are fair.
- type: paragraph
  text: |-
    This is one reason I admire interaction-focused games. They often give players enough immediate response to begin experimenting before they fully understand everything the game can do. That creates a path from approachable actions to deeper mastery.
- type: heading-2
  text: "Short words aren't always clearer words"
- type: paragraph
  text: |-
    Language has the same problem. A single invented term might be efficient for an experienced player and opaque for everyone else. A longer ordinary phrase may require more space while producing fewer misunderstandings.
- type: paragraph
  text: |-
    I don't have a rule against terminology. Good terms form a vocabulary that makes complex ideas easier to discuss. But the vocabulary should earn its cost through repetition and consistency. If I introduce a new name for an action that appears once, I need a good reason to believe the name helps.
- type: paragraph
  text: |-
    When possible, I test comprehension with people who don't share my assumptions. I ask them to explain an instruction in their own words, then compare their interpretation with the intended behaviour. Every mismatch is an opportunity to improve either the wording or the mechanic.
- type: paragraph
  text: |-
    Sometimes the confusion reveals that the rule itself is doing too many things. Sometimes the rule is fine and only the presentation needs work. Those require different fixes.
- type: heading-2
  text: "Accessible doesn't mean shallow"
- type: paragraph
  text: |-
    I like games where newcomers can make a reasonable first decision while experienced players can see consequences several steps ahead. The actions do not need to change between those players. Their understanding of the relationships changes.
- type: paragraph
  text: |-
    A building system can begin with obvious connections: a path joins two locations, a shelter protects from rain, a resource fuels a machine. As players learn, they notice bottlenecks, timing and emergent combinations. The same consistent rules support both entry and mastery.
- type: paragraph
  text: |-
    That is closer to the kind of accessibility I aim for than removing every challenging decision. Players should be allowed to become skilful. They shouldn't need to wrestle with the interface just to reach the interesting part of the challenge.
- type: heading-2
  text: "Test comprehension separately from enjoyment"
- type: paragraph
  text: |-
    One mistake I try to avoid is collapsing every playtest question into 'Was it fun?' Enjoyment matters, but it doesn't tell me which part of the experience worked or failed.
- type: paragraph
  text: |-
    I might freeze a game at a specific moment and ask a player what they believe they can do next. I might observe whether they notice a state change without prompting. I might compare how confidently a newcomer and an experienced player approach the same task.
- type: paragraph
  text: |-
    If they understand the state but don't find the choices interesting, I need to revisit the decisions. If the choices are promising but the players misinterpret the state, I may need better communication. If both fail, the core mechanic might need rethinking.
- type: paragraph
  text: |-
    Separating these outcomes prevents me from rewriting a good rule merely because I communicated it badly, or polishing an interface that faithfully explains an uninteresting decision.
- type: paragraph
  text: |-
    [BLOCK]My goal isn't minimal rules for their own sake. It's a game where the complexity players encounter is the complexity I intended them to enjoy. Clarity makes that possible. It gives players a solid understanding from which curiosity, experimentation and mastery can grow.[/BLOCK]
- type: paragraph
  text: |-
    [Previous: Prototype the Question, Not the Feature](/design-writing/prototype-the-question-not-the-feature)
---
