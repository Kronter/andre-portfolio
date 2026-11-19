---
id: 201
title: "My First Card Game Prototype Had Too Many Decks"
date: "2025-11-13"
author: "André Gottgtroy"
tags: ["Prototype", "Systems Design", "TCG"]
excerpt: "What the deliberately rough first prototype revealed about complexity and separate resource decks."
featured: false
series: "TCG"
part: 2
relatedSlugs: ["tcg-part-one", "03-rebuilding-the-resource-loop"]
content:
- type: paragraph
  text: |-
    I like the part of designing a game where a table full of paper starts asking awkward questions. My first prototype gave me plenty.
- type: paragraph
  text: |-
    [NOTE]***Quick note:*** This is about my first rough prototype, rather than a recommendation against separate decks in general.[/NOTE]
- type: paragraph
  text: |-
    So I chose an awkward problem on purpose: make a resource system that is interesting in its own right, but doesn't stop players doing the interesting things.
- type: paragraph
  text: |-
    That sounds reasonable until you try to make it work using pieces of paper.
- type: heading-2
  text: "A prototype should be cheap to change"
- type: paragraph
  text: |-
    My first prototype was rough [SIDENOTE]intentionally so[/SIDENOTE]. I wasn't trying to sell anyone on the art, a world or a polished rules book. I needed something I could rearrange, cross out and throw away. It was much easier to admit a mechanic wasn't working when replacing it meant changing a few cards rather than rebuilding a digital feature.
- type: paragraph
  text: |-
    I arrived with plenty of ideas: a main deck, a separate resource deck, a deck for zones, and other possibilities involving units, leaders and artifacts. Each element had an explanation. Resource cards could create choices around investment. Zones could change the context of a turn. Leaders could give a deck identity. On paper, they seemed like promising parts of a complete design.
- type: paragraph
  text: |-
    The trouble was what happened when I put them together.
- type: heading-2
  text: "The smallest deck made the biggest demands"
- type: paragraph
  text: |-
    The resource system was supposed to support the rest of the game. Instead, it began consuming the design space around it. Separate piles introduced separate rules: how to draw them, when to use them, what happens when you don't see the right cards, how those cards interact with other effects, and what a new player is expected to remember.
- type: paragraph
  text: |-
    Each small system asked for space on the table and space in the player's head. None of those requests was outrageous in isolation. Together they made the game increasingly about servicing its infrastructure.
- type: paragraph
  text: |-
    I had to distinguish [VIOLET]*complexity that creates decisions*[/VIOLET] from *complexity that explains why decisions are allowed*. A player deciding whether to keep a flexible card or commit it as a resource might be interesting. A player spending time working out which deck to consult, or which step of a separate procedure they were in, was less convincing.
- type: paragraph
  text: |-
    More mechanics would not solve that problem. The system had become too expensive to interact with before it had earned that cost.
- type: heading-2
  text: "A deck is not a game loop"
- type: paragraph
  text: |-
    It is easy to look at a familiar TCG and break it into recognisable ingredients: costs, resources, units, permanent effects, deck identities and turns. It is harder to notice the relationships that make those ingredients worthwhile. A resource is meaningful because it changes what you can do next. A card's cost matters because there was another useful way to spend what you had. A turn structure matters because someone is responding to what you just did.
- type: paragraph
  text: |-
    I found myself thinking about the pieces rather than the experience I was trying to produce. I wanted fluid turns, indirect competition and a resource economy that rewarded planning. Yet the prototype was asking players to learn multiple parallel procedures before they could get to those decisions.
- type: paragraph
  text: |-
    This wasn't proof that multiple decks are inherently bad. Plenty of good games use them. It was evidence that *my particular combination* didn't yet justify itself.
- type: paragraph
  text: |-
    That distinction matters. Removing a subsystem because it is unfamiliar is not the same as removing one because testing reveals it isn't contributing enough.
- type: heading-2
  text: "Change the connection, not the goal"
- type: paragraph
  text: |-
    The turning point was a different question: could resource play become part of the main deck gameplay, rather than live alongside it?
- type: paragraph
  text: |-
    That changed the direction of the experiment. Instead of asking how to improve the resource deck, I asked what valuable choice it was supposed to create and whether the existing cards could carry that choice. The goal survived. The implementation was negotiable.
- type: paragraph
  text: |-
    A multi-use card opens useful tension: do I spend this card for its immediate effect, or turn it into the means to play something else? It's not automatically a solution—too much flexibility can flatten the decision, and poorly tuned conversion can create runaway economies—but it's a connection worth testing.
- type: paragraph
  text: |-
    This was also the first time I clearly saw the difference between removing an idea and removing its purpose. I didn't abandon resources. I stopped treating a separate resource deck as sacred.
- type: heading-2
  text: "What I took away"
- type: paragraph
  text: |-
    The prototype did exactly what I needed it to do. It exposed a complexity problem, limits on future design space, awkward flow and missing interaction. Those discoveries weren't glamorous, but they were usable. A beautiful mock-up might have helped me sell the idea. The ugly cards helped me question it.
- type: paragraph
  text: |-
    [BLOCK]When evaluating a system now, I like asking: what decision does this create, what other system does it connect to, and what would disappear if I removed it? If the last answer is mostly bookkeeping, that is interesting information.[/BLOCK]
- type: paragraph
  text: |-
    I also try to resist a common temptation: adding a new mechanic to make an underperforming mechanic feel important. Sometimes the better answer is to move the responsibility to something players already understand. I would rather have one repeated decision that the players can explain than several separate subsystems that are technically interesting but largely invisible during play. The first prototype gave me permission to test that distinction instead of protecting the original structure.
- type: paragraph
  text: |-
    [Previous: Making a TCG (Tracers)](/design-writing/tcg-part-one) · [Next: Rebuilding the Resource Loop Instead of Adding More Rules](/design-writing/03-rebuilding-the-resource-loop)
---
