---
id: 214
title: "Can You Read a Jam from Across the Table?"
date: "2026-10-12"
author: "André Gottgtroy"
tags: ["Game UX", "Readability", "Tracers"]
excerpt: "Hand someone a table halfway through a Jam. Can they tell which Maneuver came last?"
featured: false
series: "TCG"
part: 12
relatedSlugs: ["tracers-entrances-visible-progression", "06-what-playtesting-made-me-remove"]
content:
- type: paragraph
  text: |-
    If I hand you a Tracers table halfway through a Jam, can you point to the last card I played? I know the answer because I put it there. You shouldn't have to ask me.
- type: paragraph
  text: |-
    [NOTE]***Quick note:*** Some layout changes are explorations. The unfamiliar-player test at the end is a proposal, not a reported result.[/NOTE]
- type: paragraph
  text: |-
    In a digital game I can highlight the last move or let you open a log. With physical cards I have to leave that information somewhere you'll actually look [SIDENOTE]which might be the pile itself[/SIDENOTE].
- type: heading-2
  text: "A rule can exist and still be invisible"
- type: paragraph
  text: |-
    One of the clearest lessons came from Sequences. I could define a Sequence in a document and understand exactly which Maneuvers belonged to it. That didn't mean the people at the table could identify it consistently.
- type: paragraph
  text: |-
    Early arrangements relied too heavily on implicit order and memory. Players needed to remember where a chain began and when it broke. The fix I explored was to make boundaries explicit and arrange cards so the relevant grouping was visible. A fan stack or declaration could carry information the rules were otherwise expecting players to hold in their heads.
- type: paragraph
  text: |-
    There is an important difference between a rule being [VIOLET]*specified*[/VIOLET] and a game state being *readable*. An elegant rules document can still describe a cumbersome table experience. If two players repeatedly stop to reconstruct state, the system is asking for a better interface.
- type: heading-2
  text: "Information should live where players look"
- type: paragraph
  text: |-
    A designer can place correct information on a card and still put it in the wrong place. During a Jam, players need to compare Maneuvers, resource generation, printed costs and effects. These are not all read at the same moment, so the card needs a visual hierarchy.
- type: paragraph
  text: |-
    I tried giving **printed cost** a home in the top-left corner, with **resource generation** down the side. When you Improv a Maneuver, you want the cost symbols. When you play it normally, you want the generation. I'd like you to be able to point to the right value from across the table.
- type: paragraph
  text: |-
    If those two values look similar, the error is easy to make. If zero generation is visually ambiguous, a player may infer a value that isn't there. If the card name or important type is obscured when cards overlap on the Line, players can't reliably read the sequence of actions.
- type: paragraph
  text: |-
    Those are interface problems, but they are also rules problems. The way information appears determines which decisions players are confident enough to make.
- type: heading-2
  text: "Which end of the Line came first?"
- type: paragraph
  text: |-
    The Line is the shared physical record of the Maneuvers played during a Jam. Its order matters for positional effects and for reading how the performance has developed. That makes direction another piece of information the game must represent.
- type: paragraph
  text: |-
    In the later prototype decisions, each player may choose their own Line direction at the start of each Jam. Cards are placed in visible chronological order, and orientation can indicate the chosen direction. The aim is that players can work out which cards came before others without memorising an invisible convention.
- type: paragraph
  text: |-
    I am still interested in whether that representation holds up at a real table. Two players leaning over cards can interpret left, right, first and last differently. A direction marker that's obvious in a clean diagram may be unclear when several cards are overlapped or rotated.
- type: paragraph
  text: |-
    That's why an acceptance test needs to involve actual cards, real table distance and unfamiliar readers. A layout solution isn't proven merely because it makes sense to the person who invented it.
- type: heading-2
  text: "Words have an interface too"
- type: paragraph
  text: |-
    Language carries a similar burden. During the talk I compared earlier compact terminology with more familiar phrasing. A short term such as 'scry' may be instantly clear to an experienced TCG player but confusing to someone else. A phrase such as 'the last card you play' may be longer while being easier to interpret.
- type: paragraph
  text: |-
    That doesn't mean every keyword is bad. Repeated, well-defined terms can save a lot of explanation once players understand them. The problem is using familiar genre vocabulary as a shortcut for a specific intended audience without checking what they think it means.
- type: paragraph
  text: |-
    I increasingly ask a tester to describe an effect back to me in their own words. Who chooses the target? Does 'next Maneuver' include a discarded card? When does the effect resolve? Are you allowed to take this action after passing? Those questions reveal ambiguities that an experienced designer may read past automatically.
- type: heading-2
  text: "Readability affects strategic depth"
- type: paragraph
  text: |-
    It may sound as though all this work is about making the game easier. I see it as protecting depth. If players spend their attention deciphering the state, they have less capacity to think about the choices that state offers.
- type: paragraph
  text: |-
    A clear board doesn't decide what a player should do. It gives them the information to consider the alternatives. A reliable rule doesn't remove uncertainty about the opponent's plan. It removes uncertainty about whether the rules themselves will behave as expected.
- type: paragraph
  text: |-
    This distinction is especially valuable in Tracers because I want indirect interaction. A player cannot respond intelligently to a publicly visible commitment if they cannot tell what has been committed or when the condition expires.
- type: heading-2
  text: "Could someone else read this table?"
- type: paragraph
  text: |-
    I think the most useful evidence for this part of the project would be a side-by-side photograph of the Line before and after a readability change. I'd annotate where the older version hid state, which mistaken interpretations were possible, and how the new arrangement makes the answer observable.
- type: paragraph
  text: |-
    I would then run a quick unfamiliar-player test. Give someone a frozen mid-Jam table and ask: whose action happened last, which resource increased, what can happen next, and what still needs to resolve? Record where they hesitate rather than jumping in to explain. That test would validate the interface, not just my intentions.
- type: paragraph
  text: |-
    [BLOCK]I'd learn quite a bit from the first thing someone points at. If they reach for the rulebook just to find the last card I played, I'd try moving the cards before rewriting the rule.[/BLOCK]
- type: paragraph
  text: |-
    [Previous: When Should a Tracer Join the Jam?](/design-writing/tracers-entrances-visible-progression) · [Next: What Playtesting Tracers Made Me Remove](/design-writing/06-what-playtesting-made-me-remove)
---
