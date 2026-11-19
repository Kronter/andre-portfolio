---
id: 208
title: "Prototype the Question, Not the Feature"
date: "2026-10-30"
author: "André Gottgtroy"
tags: ["Prototyping", "Design Philosophy", "R&D"]
excerpt: "A small prototype should answer the right question before proving a complete feature."
featured: false
series: "Design Philosophy"
part: 6
relatedSlugs: ["constraints-as-design-teachers", "clarity-is-not-the-same-as-simplicity"]
content:
- type: paragraph
  text: |-
    Before I build a prototype, I want to know what it is going to tell me. I have not always asked that early enough.
- type: paragraph
  text: |-
    [NOTE]***Quick note:*** The proposed tests are examples of how I would investigate a question, rather than completed experiments.[/NOTE]
- type: paragraph
  text: |-
    I still ask that sometimes, [SIDENOTE]especially when collaborating with engineers[/SIDENOTE]. But a more useful question often comes first: **[VIOLET]what is the smallest thing I need to answer the question I'm actually uncertain about?[/VIOLET]**
- type: paragraph
  text: |-
    Those two formulations sound similar. They can lead to very different prototypes.
- type: paragraph
  text: |-
    The first makes the feature the centre of the exercise. The second makes the uncertainty the centre. That difference is important because a feature can be technically complete and still fail to tell you whether the experience is worth pursuing.
- type: heading-2
  text: "Name the unknown before building"
- type: paragraph
  text: |-
    Suppose I'm designing a movement ability for an action game. I might be tempted to build a full level, a set of enemies, polished animations, a skill tree and a tutorial. After weeks of work, I could finally ask whether the movement itself creates interesting choices.
- type: paragraph
  text: |-
    Or I can start with a basic character controller and three deliberately different obstacles. I can make the player choose between using the ability now and keeping it for a more difficult jump. Do they spot multiple routes? Does the ability reward timing, or is there one obviously correct answer? Can they predict where they will land?
- type: paragraph
  text: |-
    That smaller experiment doesn't establish the full game feel or balance. It answers an earlier question: is this movement decision interesting enough to develop? Animation and audio may be essential for a later test, but they aren't automatically the first uncertainty.
- type: paragraph
  text: |-
    I've found that a prototype can easily accumulate supporting systems before its central interaction has earned that investment. The scope may look reasonable on a planning board while the important question remains unanswered. The useful correction is to stop adding completeness and start isolating the decision I want to understand.
- type: heading-2
  text: "A playable slice isn't always the smallest useful test"
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
    In my NZGDC talk, I used an example from professional digital development: a player-facing event/offer feature. I won't share confidential implementation details or metrics, but the transferable design work was about testing earlier, clarifying choices, surfacing the system and connecting short-, medium- and longer-term goals.
- type: paragraph
  text: |-
    The feature received a strong player response and performed well against its intended goals. I don't attribute that result to one magic rule copied from a physical game. The lesson was that the way I approached the problem changed: fewer assumptions hidden behind the interface, earlier challenges to weak directions and a clearer picture of what the player was working toward.
- type: paragraph
  text: |-
    It was a useful reminder that learning from one kind of experiment can improve professional work without the finished products looking remotely alike.
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
    [BLOCK]That habit changes the conversation. Instead of asking whether a feature is finished, I can ask whether the uncertainty has been reduced enough to justify the next investment. And instead of feeling that a failed prototype wasted time, I can judge whether it actually answered the question it was built to ask.[/BLOCK]
- type: paragraph
  text: |-
    [Previous: Constraints Are Design Teachers, Not Just Production Limits](/design-writing/constraints-as-design-teachers) · [Next: Clarity Isn't the Same as Simplicity](/design-writing/clarity-is-not-the-same-as-simplicity)
---
