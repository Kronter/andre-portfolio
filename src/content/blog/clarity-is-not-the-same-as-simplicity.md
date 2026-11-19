---
id: 218
title: "Clarity Isn't the Same as Simplicity"
date: "2026-11-09"
author: "André Gottgtroy"
tags: ["Game UX", "Accessibility", "Design Philosophy"]
excerpt: "A familiar card-game term made perfect sense to me. I had to think about what it asked a new player to know."
featured: false
series: "Design Philosophy"
part: 7
relatedSlugs: ["prototype-the-question-not-the-feature"]
content:
- type: paragraph
  text: |-
    I used the word *Scry* on a card. If you’ve played enough card games, you may already have a fairly good guess about what it does. That was exactly why it was easy for me to overlook the word when I read the card back. I brought the explanation with me.
- type: paragraph
  text: |-
    In my NZGDC talk I showed the change to *Prep*. I like what that word does before anyone knows the exact procedure. It suggests I’m getting something ready for later. I still owe the player an explanation of what they can do with the cards. At least the name and the explanation are pulling in the same direction.
- type: heading-2
  text: "One tile, one rule"
- type: paragraph
  text: |-
    Imagine a tile puzzle that lets you rotate one piece. I can explain the control in four words. If you can’t see which tiles are joined, you still can’t predict what your move will turn. Showing those joins gives you more to think about. It also gives you a fair chance to think about it.
- type: paragraph
  text: |-
    That’s the distinction I kept running into on the tabletop. When I could point to the connection, the interesting question survived. Which piece should I turn? When I had to remember the connection for both of us, much of the puzzle was happening in my head.
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
- type: heading-2
  text: "Short words aren't always clearer words"
- type: paragraph
  text: |-
    Another example from the talk was *Closer*. I’d been using words along the lines of ‘the last card you play’. Last as in most recent? Or last as in the move that finishes the performance? Naming the role gave me a way to explain it once and let the theme do some of the remembering.
- type: paragraph
  text: |-
    I don't have a rule against terminology. Good terms form a vocabulary that makes complex ideas easier to discuss. But the vocabulary should earn its cost through repetition and consistency. If I introduce a new name for an action that appears once, I need a good reason to believe the name helps.
- type: paragraph
  text: |-
    I like asking someone to read an instruction and tell me, in their own words, what they're about to do. If their reading makes perfect sense and gives them the wrong move, I probably owe them a better instruction.
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
  text: "What do you think just happened?"
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
    [BLOCK]I'd be pleased to hear someone say, ‘I can see exactly how these tiles connect. I just haven't worked out how to get them where I want them yet.’ That's the part of the puzzle I meant to be difficult.[/BLOCK]
- type: paragraph
  text: |-
    [Previous: What Do I Need This Prototype to Tell Me?](/design-writing/prototype-the-question-not-the-feature)
---
