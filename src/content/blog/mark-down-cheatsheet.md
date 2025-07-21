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
    text: "This is a standard paragraph. You can write your main content here. To make text **bold**, you wrap it in double asterisks. To make it *italic*, you use single asterisks. For ***both***, use three."
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
    text: "For more control, you can use the 'html' type. This is how you can align text."
  - type: html
    value: '<p class="text-center">This entire paragraph is centered.</p>'
  - type: html
    value: '<p class="text-right">And this paragraph is right-aligned.</p>'
  
  - type: paragraph
    text: "You can also use this method to center images."
  - type: html
    value: '<div class="flex justify-center my-8"><img src="https://placehold.co/800x400/18181b/8b5cf6?text=Centered+Image" alt="A centered image" class="rounded-lg shadow-lg"></div>'

  - type: heading
    text: "Combining Styles"
  - type: paragraph
    text: "Finally, here is how you can combine multiple styles onto a single piece of text. My work is heavily influenced by the design talks on <a href='https://www.youtube.com/channel/UC0JB7TSe4MA MoscpbWGo-pA' target='_blank' rel='noopener noreferrer'><strong><em><span class='text-violet-400'>the official GDC channel</span></em></strong></a>, which is an invaluable resource for any game designer."
---