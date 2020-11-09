---
title: About Hugo Stoic
author: Yihui Xie
categories: [Hugo, Theme]
tags: [menu, TOC, sidenote, appendix, citation, numbered section]
appendix:
  acknowledgments: >
    We thank the authors of the [Wowchemy](https://wowchemy.com) theme, [tufte-css](https://github.com/edwardtufte/tufte-css), and the
    [Distill](https://distill.pub) framework for inspirations. Many users in the R community have asked
    for a Distill-like Hugo theme directly or indirectly, including but not limited to
    [Emi Tanaka](https://emitanaka.org/r/posts/2018-12-12-scientific-and-technical-blogging-radix-vs-blogdown/),
    [Duncan Garmonsway](https://twitter.com/nacnudus/status/1098910973266743296),
    [Frank Harrell](https://stackoverflow.com/q/54388451/559676),
    [Josiah Parry](https://twitter.com/JosiahParry/status/1231280231543164928), and
    [Alison Hill](https://twitter.com/apreshill/status/1070550028274429952). We are not sure if this Hugo
    Stoic theme would make it easier or even harder to answer the frequently asked question "blogdown or
    distill?"
features: [+toc, +number_sections, +sidenotes, -citation]
---

**Hugo Stoic** is a minimalist theme derived from the [**XMin**
theme](https://github.com/yihui/hugo-xmin), and inspired by
[Wowchemy](https://wowchemy.com) (previously known as the Academic theme),
[Distill](https://distill.pub),
[tufte-css](https://github.com/edwardtufte/tufte-css), and
[Stoicism](https://en.wikipedia.org/wiki/Stoicism). This theme itself is
completely plain-text and lightweight, and does not use any icons, images, or
emojis.[^1] By default, the theme only uses two JavaScript libraries, MathJax
and highlight.js, and they are loaded only when necessary. The rest of
JavaScript is written from scratch and also relatively short. This theme does
not use any CSS frameworks, and the full CSS code is also written from scratch
(about 300 lines).

[^1]: This example website does contain images and videos as demos, though.

<div class="quote-right">

> It is not the man who has too little that is poor, but the one who hankers after more.
>
> --- _Letters from a Stoic_

</div>

As Stoicism preaches, moderation is key, function is more important than form,
and we should not live in excess. Stoicism does not advocate sacrifices. You
just need to be content with "enough." The natural question to ask is, how much
is enough? Of course, different people will have different answers. Is a
professional headshot on our homepage necessary?[^2] Is a huge banner image at
the top of each post necessary?[^3] Is the contact form necessary?[^4] Is
"mobile friendly" necessary?[^5] Are these footnotes necessary?[^6] The answers
are not necessarily "No," but you may want to spend some quality time on
reflecting the pain and gain of each element on your website, and whether you
use them because you need them or just happen to have them.

[^2]: Is our picture more important than our contribution to the world?

[^3]: Especially when these banner images are only loosely relevant to the
    posts.

[^4]: How many of our readers do not know how to send emails?

[^5]: Aren't we addicted enough to our mobile devices?

[^6]: Why cannot we write so clearly and smoothly that readers do not have to
    stop from time to time to look at our side thoughts?

This page introduces the features of this Hugo theme that you can fiddle with.
I'm not sure when you will be bored by this theme, but I think from the moment
when you first see this theme, the clock has started ticking, just like the
ever-decreasing joy of online shopping after you hit the checkout button.

## Site configurations

As a minimalist theme, its configurations are relatively simple. For now, you
can configure the following elements.

### Menus

Each page has a menu in the header and a menu in the footer. The header menu is
defined in the `header` option in `menu` in `config.yaml`, and similarly, the
footer menu is defined in the `footer` option, e.g.,

``` yaml
menu:
  header:
    - name: Home
      url: "/"
      weight: 1
    - name: About
      url: "/about/"
      weight: 2
  footer:
    - name: Contact
      url: "/404.html"
      weight: 1
    - name: Categories
      url: "/categories/"
      weight: 2
      identifier: "categories"
```

The `url` of a menu item can be either a relative URL pointing to a page on this
website, or an external link (e.g., `url: "https://github.com/yihui"`). The
order of the menu items is determined by the `weight` values. If a menu item has
an `identifier`, it indicates that this menu item will be hidden on small
screens.[^7]

[^7]: These may be the unimportant items that you do not mind hiding on smaller
    screens.

### Home page

The body of the home page consists of an introduction, followed by a series of
info cards, and then a number of the latest posts and pages.

-   The introduction comes from `content/_index.md`. The Markdown content can
    contain arbitrary elements.

-   The info cards come from the `content/card/` directory. Each (Markdown) file
    is displayed on the home page as a separate card. The title is displayed
    vertically on the left or right side.[^8] If you want to customize the style
    of a certain card, you may use the YAML option `style` in the file, e.g.,

    ``` yaml
    ---
    title: "Courses"
    style: "background: darkorange; color: white;"
    ---
    ```

    This will add a dark orange background to the card, and change the color of
    text to white. You can use any CSS styles here (e.g., `font-size`,
    `background-image`, and `padding`).

-   The number of latest posts and pages can be defined via the `homePosts`
    option in `params` in `config.yaml`, e.g.,

    ``` yaml
    params:
      homePosts: 10
    ```

    The default is 5.

[^8]: We recommend that you keep the title short so it can fit on one line.

### Footer

Besides the menu in the footer, you can specify a copyright statement in the
`footer` parameter in `config.yaml`, e.g.,

``` yaml
params:
  footer: "&copy; Frida Gomam 2015 -- 2020"
```

## Articles

> At the moment, I'm too tired to complete the documentation. If you want to be
> an early adopter of this theme, you might have to read the source.

### Multiple authors

If an article has multiple authors, specify their names in an array in the
`author` field.

Author's bio is loaded from the database `data/authors.yaml`.

### Table of contents

TOC can be automatically generated, no matter if you use Hugo/goldmark or
Pandoc/R Markdown.

### Number sections

Section headers can be automatically numbered, no matter if you use
Hugo/goldmark or Pandoc/R Markdown.

### Footnotes and sidenotes

Footnotes are moved to the right margin by default. If you want to write
arbitrary sidenotes, use the classes `side` and `side-left`/`side-right`.

<div class="side side-left">

This is a sidenote on the left side. You can include anything in the note. For example, here is a bullet list:

- Get up
- Do the work
- Go to bed

</div>

``` html
<div class="side side-left">

Content to be displayed as a sidenote.

</div>
```

### Appendix

-   Author's bio

-   Custom fields

-   License

-   Suggest changes

-   Citation

### References

## Floats

### Full-width elements

Apply the class `fullwidth`, e.g.,

``` html
<div class="fullwidth">

Content to be displayed with its maximum width.

</div>
```

<div class="fullwidth">

{{< figure src="https://upload.wikimedia.org/wikipedia/en/timeline/c8fff6bec6e98dfe6399084a540293e3.png" alt="History of stoics" caption="Figure 3.1: Beginning around 301 BC, Zeno taught philosophy at the Stoa Poikile (\"Painted Porch\"), from which his philosophy got its name. Unlike the other schools of philosophy, such as the Epicureans, Zeno chose to teach his philosophy in a public space, which was a colonnade overlooking the central gathering place of Athens, the Agora." >}}

</div>

If you want the full-width element to be scrollable, you can apply an additional
class `fullscroll`, e.g.,

``` html
<div class="fullwidth fullscroll">

Super wide content to be scrolled horizontally.

</div>
```

<div class="fullwidth fullscroll">

{{< figure src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Along_the_River_During_the_Qingming_Festival_%28Qing_Court_Version%29.jpg/10000px-Along_the_River_During_the_Qingming_Festival_%28Qing_Court_Version%29.jpg" alt="Along the River During the Qingming Festival" caption="Figure 3.2: This painting is known as the \"Qing Court Version\" of _Along the River During the Qingming Festival_. Here, the figural scenes are numerous and detailed, happening around noteworthy landmarks and places such as the serene rustic countryside, the Rainbow Bridge (虹橋) and its crowded markets, the lively surroundings and throughways at the city walls and gates, the busy streets and various packed shops, the secluded literati gardens, the Songzhu Hall (松竹軒) as well as the beautiful site of the Jinming Lake (金明池)." >}}

</div>

### Embedded elements

Use the `embed-left` or `embed-right` class to embed a content block to be
floated to the left or right, and the block will exceed the article margin,
e.g.,

``` html
<div class="embed-right">

Content to be embedded onto the margin.

</div>
```

<div class="embed-right">
<iframe src="https://player.vimeo.com/video/469252441" width="640" height="400" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
</div>

One application is to embed videos in an article, when the video needs a
narrative. For example, you can embed a video on the right side, and provide a
narrative in the body of the article, which will be on the left side of the
video.

By default, the width of the embedded element is 600px, out of which 200px will
be in the margin, meaning that there will be 400px left for the narrative in the
article body.

When the screen width is smaller than 1200px, the embedded elements will be
floated back into the article as normal block-level elements.

### Quotes

Use the `quote-left` or `quote-right` class to make content float to the left or
right.

``` html
<div class="quote-left">

A quote to be floated to the left.

</div>
```

The quotes do not have to be literally quotes. These environments can contain
any content, although quotes may be the most common application.

<div class="quote-left">

> Here is a quote that I've never said.

</div>

The default width of the content is 45% of the container. You have seen an
example of `quote-right` at the beginning of this article. Here is an example of
`quote-left` on the left side. The quotes will stop floating and become normal
block-level elements when the screen width is smaller than 800px.

## Custom layouts

## TODO

Currently only `.md` files are tested. The full support for `.Rmd` and
`.Rmarkdown` will come soon.
