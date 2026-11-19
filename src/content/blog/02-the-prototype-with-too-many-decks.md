---
id: 201
title: "My First Card Game Prototype Had Too Many Decks"
date: "2025-09-11"
author: "André Gottgtroy"
tags: ["Prototype", "Systems Design", "TCG"]
excerpt: "I gave resources their own deck. Then I tried explaining a turn with all those piles on the table."
featured: false
series: "TCG"
part: 2
relatedSlugs: ["tcg-part-one", "03-rebuilding-the-resource-loop"]
content:
- type: paragraph
  text: |-
    When I sat down to make my first TCG prototype, I already had a main deck, a resource deck and a deck for zones in mind. I still quite like the idea of a zone deck. The bit I hadn't worked out was what my family would actually do with all three on their first turn.
- type: paragraph
  text: |-
    [NOTE]***Quick note:*** These were paper cards. I could cross something out and play it differently the next time round, which turned out to be quite handy.[/NOTE]
- type: paragraph
  text: |-
    The pile I was most interested in was the **resource deck**. I'd enjoyed choosing which cards to pitch in Flesh and Blood. Could I get that kind of decision into my own game?
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
  text: "Which pile am I drawing from?"
- type: paragraph
  text: |-
    The resource system was supposed to support the rest of the game. Instead, it began consuming the design space around it. Separate piles introduced separate rules: how to draw them, when to use them, what happens when you don't see the right cards, how those cards interact with other effects, and what a new player is expected to remember.
- type: paragraph
  text: |-
    Even before anyone chose a card, I'd given them three places to look. I could explain each pile on its own. Explaining how to take a turn was quite a bit harder.
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
- type: heading-2
  text: "Could I lose the resource deck?"
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
    The question I wanted to keep was **which card am I willing to give up?** I could try that with the main deck I already had. That gave me somewhere to start the next prototype.
- type: paragraph
  text: |-
    [Previous: Making a TCG (Sort Of)](/design-writing/tcg-part-one) · [Next: One Deck, Two Jobs](/design-writing/03-rebuilding-the-resource-loop)
---
