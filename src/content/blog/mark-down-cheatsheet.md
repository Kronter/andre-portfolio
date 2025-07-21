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
    text: "You can also add a standard Markdown link like this: [GDC's YouTube channel](https://www.youtube.com/channel/UC0JB7TSe4MA MoscpbWGo-pA)."
  - type: list
    items:
      - "This is the first item in a list."
      - "This is the second item."
      - "<strong>This item uses HTML for bolding.</strong>"
      - "<em>This item uses HTML for italics.</em>"
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
    value: "<p>My work is heavily influenced by the design talks on <a href='https://www.youtube.com/channel/UC0JB7TSe4MA MoscpbWGo-pA' target='_blank' rel='noopener noreferrer'><strong><em><span class='text-violet-400'>the official GDC channel</span></em></strong></a>.</p>"
  - type: paragraph
    text: "You can also use 'html' for alignment. Remember to use single quotes for local image paths."
  - type: html
    value: "<div class='flex justify-center my-8'><img src='/ravenhill_image.png' alt='A centered image' class='rounded-lg shadow-lg'></div>"
---