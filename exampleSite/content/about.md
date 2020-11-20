---
title: About Hugo Prose
author: Yihui Xie
categories: [Hugo, Theme]
tags: [menu, TOC, sidenote, appendix, citation, numbered section]
menu:
  header:
    name: About
    weight: 2
appendix:
  acknowledgments: |
    We thank the authors of the [Wowchemy](https://wowchemy.com) theme, [tufte.css](https://github.com/edwardtufte/tufte.css), and the
    [Distill](https://distill.pub) framework for inspirations. Many users in the R community have asked
    for a Distill-like Hugo theme directly or indirectly, including but not limited to
    [Emi Tanaka](https://emitanaka.org/r/posts/2018-12-12-scientific-and-technical-blogging-radix-vs-blogdown/),
    [Duncan Garmonsway](https://twitter.com/nacnudus/status/1098910973266743296),
    [Frank Harrell](https://stackoverflow.com/q/54388451/559676),
    [Josiah Parry](https://twitter.com/JosiahParry/status/1231280231543164928), and
    [Alison Hill](https://twitter.com/apreshill/status/1070550028274429952). We are not sure if this Hugo
    Prose theme would make it easier or even harder to answer the frequently asked question "blogdown or
    distill?"
    
    The images on this page are from Wikipedia entries [Stoicism](https://en.wikipedia.org/wiki/Stoicism)
    and [清明上河图](https://zh.wikipedia.org/wiki/%E6%B8%85%E6%98%8E%E4%B8%8A%E6%B2%B3%E5%9C%96). The
    CSS style for draft posts was borrowed from Fabian Tamp's
    [paperesque](https://github.com/capnfabs/paperesque/) theme. [Wladimir Palant's tutorial](https://palant.info/2020/06/04/the-easier-way-to-use-lunr-search-with-hugo/)
    helped a lot with our implementation of the client-side search.
features: [+toc, +number_sections, +sidenotes, -citation]
---

**Hugo Prose** is a minimalist theme derived from the [**XMin**
theme](https://github.com/yihui/hugo-xmin), and inspired by
[Wowchemy](https://wowchemy.com) (previously known as the Academic theme),
[Distill](https://distill.pub), and
[tufte.css](https://github.com/edwardtufte/tufte.css). This theme itself is
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

This page introduces the features of this Hugo theme that you can fiddle with.

## Site configurations

Below are the possible options that you may configure for a site based on this
theme.

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
      pre: "optional"
```

The `url` of a menu item can be either a relative URL pointing to a page on this
website, or an external link (e.g., `url: "https://github.com/yihui"`). The
order of the menu items is determined by the `weight` values. If a menu item has
a `pre` value, it will be used as the class of the menu item. The special value
`optional` indicates that this menu item will be hidden on small screens.[^2]

[^2]: For example, `pre: "optional"` will generate the menu item
    `<li class="optional">`. It may be an unimportant item that you do not mind
    hiding on smaller screens.

The header menu can be made sticky via the parameter `pageFeatures` in
`config.yaml`:

``` yaml
params:
  pageFeatuers: [+sticky_menu]
```

This feature can be disabled per-page if enabled globally in
`config.yaml`----add `-sticky_menu` to the `features` YAML field in the single
page, e.g.,

``` yaml
features: [-sticky_menu]
```

### Home page

The body of the home page consists of an introduction, followed by a series of
info cards, and then a number of the latest posts and pages.

-   The introduction comes from `content/_index.md`. The Markdown content can
    contain arbitrary elements.

-   The info cards come from the `content/card/` directory. Each (Markdown) file
    is displayed on the home page as a separate card. The title is displayed
    vertically on the left or right side.[^3] If you want to customize the style
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

    The default is 6.

-   The `mainSections` parameter can be used to select the sections of pages to
    be included on the home page, e.g.,

    ``` yaml
    params:
      mainSections: ["post", "news"]
    ```

[^3]: We recommend that you keep the title short so it can fit on one line.

### Footer

Besides the menu in the footer, you can specify a copyright statement in the
`footer` parameter in `config.yaml`, e.g.,

``` yaml
params:
  footer: "&copy; Frida Gomam 2015 -- 2020"
```

### Comments

Disqus, Utterances

### Searching

This theme supports searching out of the box based on
[Fuse.js](https://fusejs.io). A few critical configurations:

-   The site needs to generate a JSON index. This is done via a layout file
    `index.json.json` in `layouts/_default/`, and the config in `config.yaml`:

    ``` yaml
    outputs:
      home: [html, rss, json]
    ```

-   A menu item with the ID `menu-search` configured in `config.yaml`, e.g.,

    ``` yaml
    menu:
      header:
        - name: Search
          url: "#"
          identifier: menu-search
    ```

-   The version of Fuse can be configured via the parameter `fuseVersion` in
    `config.yaml`, e.g.,

    ``` yaml
    params:
      fuseVersion: 6.4.3
    ```

    If no `fuseVersion` is specified, the latest version of Fuse.js will be
    used. You may also download a copy of Fuse.js to the `static/` folder of
    your site and use this copy instead of loading it from CDN. To do that, you
    may download Fuse.js to, say, `static/js/fuse.js` and modify the partial
    template `layouts/partials/foot_custom.html`. Replace

    ``` html
    {{ with .Site.Params.fuseVersion }}
    <script src="https://cdn.jsdelivr.net/npm/fuse.js@{{ . }}"></script>
    {{ end }}
    ```

    with

    ``` html
    <script src="{{ relURL "/js/fuse.js" }}"></script>
    ```

    That way, you can also use search when viewing the site offline, because
    Fuse.js is no longer loaded from CDN.

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

### Footnotes, citations, and sidenotes

Footnotes and citation entries[^4] are moved to the right margin by default. If
you want to write arbitrary sidenotes, use the classes `side` and
`side-left`/`side-right`.

[^4]: Note that if you want to use citations, you have [the R Markdown
    format](https://bookdown.org/yihui/blogdown/output-format.html) with the R
    package **blogdown**. Plain Markdown posts (`.md` files) do not support
    citations.

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

### Drafts

Mark an article as draft by adding `draft: true` to the YAML metadata. Draft
articles are styled with a background of diagonal lines and a watermark "Draft."
For listing pages, draft articles are also indicated by the background.

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
floated to the left or right, and the block will exceed the article margin by
200px, e.g.,

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

By default, the `max-width` of the embedded element is 600px (the actual width
could be smaller), out of which 200px will be in the margin, meaning that there
will be at least 400px left for the narrative in the article body.

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

## List pages

### Open face characters

The first alphabetical character in each summary block is converted to an [open
face character](https://www.w3.org/TR/xml-entity-names/double-struck.html) such
as:

<div style="font-size: 3em; line-height: 1em;">

> &Aopf; &Bopf; &Copf; &Dopf; &Eopf; &Fopf; &Gopf; &Hopf; &Iopf; &Jopf; &Kopf; &Lopf; &Mopf; &Nopf; &Oopf; &Popf; &Qopf; &Ropf; &Sopf; &Topf; &Uopf; &Vopf; &Wopf; &Xopf; &Yopf; &Zopf; &aopf; &bopf; &copf; &dopf; &eopf; &fopf; &gopf; &hopf; &iopf; &jopf; &kopf; &lopf; &mopf; &nopf; &oopf; &popf; &qopf; &ropf; &sopf; &topf; &uopf; &vopf; &wopf; &xopf; &yopf; &zopf;

</div>

### Navigation links

## Responsive design

### Screen size

|                   | Attribute \\ width | 650 - 800px | 800 - 1280px  | \> 1280px                  |
|-------------------|--------------------|-------------|---------------|----------------------------|
| Menu              | optional items     | hidden      | shown         | \<=                        |
| Table of contents | position           | =\>         | body / static | left margin / sticky       |
| Floats            | position           | =\>         | body / static | beside or overlapping body |
| Sidenotes         | position           | =\>         | body / static | side                       |
| Home posts        | layout             | one column  | two columns   | \<=                        |

### Dark theme

This theme uses the
[`prefer-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
CSS media feature to respond to the dark color theme of the system. If you
change your system to the dark mode, the web pages will automatically switch to
the dark mode.

## Custom layouts

## TODO

section anchors
