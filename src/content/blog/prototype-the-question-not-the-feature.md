---
id: 208
title: "What Do I Need This Prototype to Tell Me?"
date: "2026-09-23"
author: "André Gottgtroy"
tags: ["Prototyping", "Design Philosophy", "R&D"]
excerpt: "I recreated part of a digital event on the table. Choosing which part to build was a design decision in its own right."
featured: false
series: "Design Philosophy"
part: 4
relatedSlugs: ["constraints-as-design-teachers", "when-two-good-mechanics-make-a-worse-game"]
content:
- type: paragraph
  text: |-
    At work I was asked to design an event or offer that would get more players to engage with it. That’s a perfectly reasonable goal to hand a designer. It also leaves a lot open. What does a player see when they arrive? What can they decide right now? Why would they care what happens next?
- type: paragraph
  text: |-
    I ended up recreating part of the feature physically. I’d been making a card game in my own time, so the idea of taking one piece out and playing with it felt fairly natural. The interesting decision was which piece of a digital event was worth putting on a table.
- type: paragraph
  text: |-
    The part I cared about was the relationship between the choice in front of the player and the goal they could see themselves working towards. If that relationship was weak, building the rest of the event would give me a much more expensive way to discover the same thing.
- type: heading-2
  text: "Name the unknown before building"
- type: paragraph
  text: |-
    Suppose I'm designing a movement ability for an action game. I might be tempted to build a full level, a set of enemies, polished animations, a skill tree and a tutorial. After weeks of work, I could finally ask whether the movement itself creates interesting choices.
- type: paragraph
  text: |-
    For a first pass, I'd give myself a basic character controller and three obstacles. Can you see two routes? Can you tell where you'll land? Is there a jump worth saving the ability for? I can find out quite a bit before I need an enemy or a skill tree.
- type: paragraph
  text: |-
    That smaller experiment doesn't establish the full game feel or balance. It answers an earlier question: is this movement decision interesting enough to develop? Animation and audio may be essential for a later test, but they aren't automatically the first uncertainty.
- type: paragraph
  text: |-
    I've found that a prototype can easily accumulate supporting systems before its central interaction has earned that investment. The scope may look reasonable on a planning board while the important question remains unanswered. The useful correction is to stop adding completeness and start isolating the decision I want to understand.
- type: heading-2
  text: "Three obstacles and a jump"
- type: paragraph
  text: |-
    I like vertical slices. They're valuable for showing how technology, art, audio, UI and gameplay work together. But if I'm uncertain about a single choice, a polished slice can be too large and too expensive an answer.
- type: paragraph
  text: |-
    Sometimes the right test is one decision repeated in several conditions. Sometimes it's a paper flow, a rough encounter, a single combat interaction, or two people following a written rules sheet. Sometimes it is a playable slice, because the uncertainty is specifically about the interaction between multiple finished-feeling parts.
- type: paragraph
  text: |-
    The test should match the risk. If the risk is readability, I don't need complete progression. If the risk is feel, a spreadsheet might be too abstract. If the risk is long-term resource snowballing, a single turn may not reveal it. Prototyping isn't synonymous with building something small at all costs. It means spending effort where it can actually reduce uncertainty.
- type: heading-2
  text: "Watch behaviour, not just opinions"
- type: paragraph
  text: |-
    People can enjoy a prototype and still be confused by it. They can also say a system is complicated while making interesting decisions with very little help. I need to pay attention to what they do, not only whether they report having fun.
- type: paragraph
  text: |-
    For a movement prototype, a test without progression can tell me whether the basic action is satisfying. A test of cooldown length can show whether timing creates decisions or merely waiting. An encounter with an enemy that telegraphs its next move can reveal whether information changes player behaviour or simply decorates the screen.
- type: paragraph
  text: |-
    These are different experiments. Combining them all at once makes interpretation harder. If the game improves, I won't know which change helped. If it becomes worse, I may discard a good idea because another one interfered with it.
- type: paragraph
  text: |-
    The same applies to success metrics in digital development. A result can look positive without proving my proposed mechanism caused it. I want to know what evidence I need before I decide what to build next.
- type: heading-2
  text: "The feature that changed because the process changed"
- type: paragraph
  text: |-
    Coming back to the event, I had a reason to ask what the player could choose, what they could see immediately afterwards, and how that helped them understand the longer goal. I let go of early designs and reworked the feature while those questions were still cheap to answer. Making a physical prototype was one part of that process.
- type: paragraph
  text: |-
    The event got a strong player response and performed well against its goals. I can talk about the design change more precisely than I can talk about the numbers publicly. I tried alternatives earlier, made the goal easier to follow and gave the player more opportunities to participate. Several things changed together, so I wouldn’t put the result down to any one of them.
- type: heading-2
  text: "Know what to throw away"
- type: paragraph
  text: |-
    An experiment is most useful when I'm willing to act on its answer. I can spend a lot of effort trying to rescue a mechanic because I've already built it, even when the test has shown that the original problem is better solved another way.
- type: paragraph
  text: |-
    I try to separate three things: the experience goal, the proposed solution and the evidence. The goal might be making players feel clever when they recognize an enemy's intentions. The proposed solution might be a complicated counterattack system. The evidence might show that better attack telegraphs and one deliberate dodge already create most of the desired feeling of mastery.
- type: paragraph
  text: |-
    In that case, throwing away the larger solution is progress. The goal remains valid. The experiment has narrowed the design space.
- type: paragraph
  text: |-
    This is why I like keeping rejected prototypes and notes. Not as a museum of unfinished features, but as a record of what each version answered. Later, a discarded idea might find a better home elsewhere.
- type: heading-2
  text: "The habit I want to keep"
- type: paragraph
  text: |-
    Before I start implementing, I try to write a sentence beginning, 'I need to find out whether…' Then I identify what I would observe if the hypothesis were true, and what would make me reconsider it.
- type: paragraph
  text: |-
    [BLOCK]If three obstacles tell me the landing is impossible to judge, I know what I'd work on tomorrow. I'd be quite happy to find that out before building the rest of the level.[/BLOCK]
- type: paragraph
  text: |-
    [Previous: What Can I Learn with One Less Tool?](/design-writing/constraints-as-design-teachers) · [Next: When Two Good Mechanics Make a Worse Game](/design-writing/when-two-good-mechanics-make-a-worse-game)
---
