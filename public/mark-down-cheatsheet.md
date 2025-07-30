---
id: 102
title: "Markdown Cheatsheet & Full Feature Showcase"
date: "2025-07-21"
author: "Andre Gottgtroy"
tags: ["Reference", "Template", "Markdown"]
featured: false
series: "Website Guide"
part: 2
content:
  - type: heading
    text: "Basic Content Types"
  - type: paragraph
    text: "This is a standard paragraph. You can now use standard Markdown for **bold**, *italic*, and ***both***."
  - type: paragraph
    text: "&nbsp;&nbsp;&nbsp;&nbsp;This is a indented single line paragraph in paragraph."
  - type: paragraph
    text: "[INDENT]This is a indented full block paragraph in paragraph.[/INDENT]"
  - type: paragraph
    text: "[INDENT=2]This is a indented full block paragraph in paragraph with multiple indents.[/INDENT]"
  - type: list
    items:
      - "This is the first item in a list."
      - "This is the second item."
      - "<strong>This item uses HTML for bolding.</strong>"
      - "<em>This item uses HTML for italics.</em>"
      - "<u>This item uses HTML for italics.</u>"
      - "&nbsp;&nbsp;&nbsp;&nbsp;single line indentation"
      - "<div style='padding-left: 2em;'>block of text indentation in lists </div>"
  - type: html
    value: "<p>This is using a htlm link to a <a href='https://www.youtube.com/channel/UC0JB7TSe4MA MoscpbWGo-pA' target='_blank' rel='noopener noreferrer'><span class='text-teal-400'><u>site</u></span></a>.</p>"
  - type: html
    value: "<p>this is using html to <span class='text-violet-400'>color a text</span>.</p>"
  - type: blockquote
    text: "This is a blockquote. It's great for highlighting a key takeaway or a quote that inspired you during development."

  - type: heading
    text: "Media Content Types"
  - type: paragraph
    text: "Below is an example of a single, standard image. It will align to the left by default."
  - type: image
    src: '/ravenhill-image.png'
    alt: "A standard image example."
  - type: paragraph
    text: "Next is a video, which is perfect for showing gameplay."
  - type: video
    videoId: "oq9raTB9cHM"
    alt: "YouTube trailer for the game Ravenhill."
  - type: paragraph
    text: "And here is an auto-sliding gallery for multiple screenshots."
  - type: gallery
    screenshots:
      - "https://placehold.co/1600x900/18181b/8b5cf6?text=Gallery+Image+1"
      - "https://placehold.co/1600x900/18181b/8b5cf6?text=Gallery+Image+2"
      - "https://placehold.co/1600x900/18181b/8b5cf6?text=Gallery+Image+3"
    alt: "A gallery showing various in-game screenshots."

  - type: heading
    text: "Advanced Formatting with HTML"
  - type: paragraph
    text: "For complex cases, like a colored link, you can use the 'html' type."
  - type: html
    value: "<p>My work is heavily influenced by the design talks on <a href='https://www.youtube.com/channel/UC0JB7TSe4MA MoscpbWGo-pA' target='_blank' rel='noopener noreferrer'><strong><em><span class='text-teal-400'><u>the official GDC channel</u></span></em></strong></a>.</p>"

  - type: heading
    text: "Heading types"
  - type: heading-1
    text: "heading-1"
  - type: heading-2
    text: "heading-2"
  - type: heading-3
    text: "heading-3"
  - type: heading
    text: "heading"
  - type: subheading
    text: "subheading"
  - type: subheading-2
    text: "subheading-2"
---