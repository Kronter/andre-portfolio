---
id: 201
title: "My First Card Game Prototype Had Too Many Decks"
date: "2025-09-11"
author: "André Gottgtroy"
tags: ["Prototype", "Systems Design", "TCG"]
coverImage: "/tcg-prototype-one.jpg"
excerpt: "The smallest deck in my first prototype did most of the work. It left too little room for everything else."
featured: false
series: "TCG"
part: 2
relatedSlugs: ["tcg-part-one", "03-rebuilding-the-resource-loop"]
content:
- type: paragraph
  text: |-
    I started my first TCG prototype with three separate decks: a main deck, a resource deck and a deck for zones. Each had a purpose on paper. But the first time I tried putting it all on a table, I had to ask what a new player would actually do with those three piles.
- type: paragraph
  text: |-
    I was especially interested in the resources. I liked the immediacy of games such as *Marvel Snap*, and the more tangible decisions around resources in games such as the *One Piece Card Game*. I wanted to see whether I could bring some of those ideas together, then take the resource system further.
- type: paragraph
  text: |-
    In Prototype 1, resources weren't simply fuel you collected and spent. You generated them, used them and recycled them. Recycled resources could then provide utility or trigger special effects. I wanted that layer to keep creating decisions instead of being a simple calculation before playing a card. At first, it really was interesting.
- type: paragraph
  text: |-
    [NOTE]***Quick note:*** This was an early, deliberately rough test of a game I wanted my family and more casual players to pick up. I'm not arguing that a complicated resource engine is wrong for every card game.[/NOTE]
- type: heading-2
  text: "A prototype should be cheap to change"
- type: image
  src: "/tcg-prototype-cheap.jpg"  
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
  text: "Cognitive and resource overload"
- type: image
  src: "/tcg-too-many-decks.png" 
- type: paragraph
  text: |-
    The first problem was cognitive load. Three decks meant three sets of expectations: where to draw from, when each pile mattered, how resources could be recycled, and how all of those steps interacted with the main game. Knowing what to do next was becoming a task of its own.
- type: paragraph
  text: |-
    But it wasn't only a question of explaining the rules. The **resource deck was the smallest deck in the game**, yet I'd made it responsible for a huge amount of the gameplay. A lot of the efficiency, utility and interesting decisions lived there. It was effectively the engine driving everything else.
- type: paragraph
  text: |-
    In one sense, I'd achieved exactly what I set out to do: resources mattered. The trouble was that they mattered **too much**.
- type: paragraph
  text: |-
    Generating, spending and recycling resources already created so many possible interactions that I had to keep the cards in the main deck relatively simple. Whenever I considered a more interesting main-deck effect, I had to think about everything the resource layer might do to it. Put too much on those cards and the game became overwhelming very quickly.
- type: paragraph
  text: |-
    That was the strange part. The system I'd expected to open up design space was taking design space away from the rest of the game. The smallest deck was doing most of the interesting work, which left much less room to make the main deck interesting.
- type: paragraph
  text: |-
    And the multiple decks made that imbalance more visible. Players weren't just choosing between strategies. They were managing where things came from, which system was active and what a recycled resource might do. Some of that complexity created genuine choices. Some of it was just work required to reach those choices.
- type: paragraph
  text: |-
    For a heavier game aimed at players who enjoy mastering an intricate economy, that tradeoff might be completely worthwhile. For **the more approachable game I was trying to make**, it was a mismatch. Complexity has to earn its place in the experience, not just look clever in the rules.
- type: subheading
  text: "A deck is not a game loop"
- type: paragraph
  text: |-
    It is easy to look at a familiar TCG and break it into recognisable ingredients: costs, resources, units, permanent effects, deck identities and turns. It is harder to notice the relationships that make those ingredients worthwhile. A resource is meaningful when gaining or spending it changes what you can do next. A card's cost becomes interesting when paying it means giving up another worthwhile option. A turn structure matters because it shapes what each player can do in response to the other. Those relationships are where more meaningful and interesting choices come from, rather than from simply adding more mechanics.
- type: paragraph
  text: |-
    I found myself thinking about the pieces rather than the experience I was trying to produce. I wanted fluid turns, indirect competition and a resource economy that rewarded planning. Yet the prototype was asking players to learn multiple parallel procedures before they could get to those decisions.
- type: paragraph
  text: |-
    This wasn't proof that multiple decks are inherently bad. Plenty of good games use them. It was evidence that *my particular combination* didn't yet justify itself.
- type: subheading
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
