(function(d) {
  // implement some features for articles: sidenotes, number_sections, toc

  var config = [], toc_title = 'Contents', makeArray = function(x) {
    return x instanceof Array ? x : (x === null ? [] : [x]);
  };
  if (d.currentScript) {
    config = d.currentScript.dataset['pageFeatures'];
    config = config ? JSON.parse(config) : [];
    // local c1 to override global config c2
    var c1 = makeArray(config[0]), c2 = makeArray(config[1]);
    if (c1.length > 0) c2.forEach(function(x) {
      x1 = x.replace(/^[+-]/, '');
      var found = false;
      c1.forEach(function(x2) {
        if (found) return;
        found = x2.replace('/^[+-]/', '') == x1;
      });
      !found && c1.push(x);
    });
    c3 = config[2];  // toc title
    if (c3) toc_title = c3;
    config = c1;
  }

  var i, a, s;

  // process single articles
  var article = d.querySelector('main .article');
  if (!article) article = d.createElement('div');

  // move <figcaption> out of <figure> (and p.caption out of div.figure) so that <figure> can scroll
  d.querySelectorAll('.fullscroll figure > figcaption, .fullscroll .figure > .caption').forEach(el => {
    el.parentNode.after(el);
  });

  // move footnotes (ids start with fn) and citations (ids start with ref-) to sidenotes
  if (config.indexOf('-sidenotes') === -1) {
    d.querySelectorAll('.footnotes > ol > li[id^="fn"], #refs > div[id^="ref-"]').forEach(el => {
      // find <a> that points to note id in body
      const h = `a[href="#${el.id}"]`,
        a = d.querySelector(`${h} > sup, sup > ${h}, .citation > ${h}`);
      if (!a) return;
      const a2 = a.parentNode;
      (a.tagName === 'A' ? a : a2).removeAttribute('href');
      const s = d.createElement('div');  // insert a side div next to n in body
      s.className = 'side side-right';
      if (/^fn/.test(el.id)) {
        s.innerHTML = el.innerHTML;
        // add footnote number
        s.firstElementChild.insertAdjacentHTML('afterbegin', `<span class="bg-number">${a.innerText}</span> `);
        s.querySelector('a[href^="#fnref"]')?.remove();  // remove backreference
      } else {
        s.innerHTML = el.outerHTML;
      }
      // insert note after the <sup> or <span> that contains a
      a2.after(s);
      a2.classList.add('note-ref');
      el.remove();
    });
    // remove the footnote/citation section if it's empty now
    d.querySelectorAll('.footnotes, #refs').forEach(el => {
      /^\s*$/.test(el.innerText) && el.remove();
    });
  }

  // header level: <hN> -> N
  var level = function(x) {
    return parseInt(x.replace(/^h/i, ''));
  };
  // number sections (need to skip headers in TOC)
  var h, hs = article.querySelectorAll('h1, :not(#TOC) > h2, h3, h4, h5, h6'), t0 = 0, t1,
    dict = [0, 0, 0, 0, 0, 0];
  // generate section numbers x.x.x
  var number_section = function(i) {
    dict[i]++;
    return dict.filter(function(d) {return d != 0;}).join('.') + ' ';
  };
  // whether a string contains a leading section number x.x.x
  var has_number = function(x) {
    return /^[0-9]+[.0-9]* /.test(x);
  };
  // have sections been already numbered?
  var numbered;
  numbered = config.indexOf('+number_sections') >= 0 ? false : (
    config.indexOf('-number_sections') >= 0 ? true :
      article.querySelector('span.header-section-number')
  );
  if (!numbered) for (i = 0; i < hs.length; i++) {
    h = hs[i];
    numbered = has_number(h.innerText);
    if (numbered) break;
  }
  if (!numbered) hs.forEach(function(h) {
    t1 = level(h.tagName);
    if (t1 < t0) {
      for (var j = t1; j < dict.length; j++) {
        dict[j] = 0;
      }
    }
    h.insertBefore(d.createTextNode(number_section(t1 - 1)), h.firstChild);
    t0 = t1;
  });
  // avoid Pandoc's numbering from 0 (e.g., 0.1, 0.1.1, 0.2, ...) when top-level heading is not h1
  article.querySelectorAll('span.header-section-number').forEach(function(s) {
    s.innerText = s.innerText.replace(/^(0[.])+/, '');
  });

  // build TOC
  var toc = article.querySelector('#TOC');
  toc?.remove();  // delete and rebuild TOC if it has been generated (by Pandoc)
  var build_toc = config.indexOf('+toc') >= 0 || config.indexOf('-toc') === -1;
  toc = d.createElement('div');
  if (build_toc) {
    var li, ul;
    var p = toc;  // the current parent in which we insert child TOC items
    toc.id = 'TOC';
    t0 = 0;  // pretend there is a top-level <h0> for the sake of convenience
    hs.forEach(function(h) {
      t1 = level(h.tagName);
      li = d.createElement('li');
      if (t1 > t0) {
        // lower-level header: create a new ul
        ul = d.createElement('ul');
        ul.appendChild(li);
        p.appendChild(ul);
      } else if (t1 < t0) {
        // higher-level header: go back to upper-level ul
        for (var j = 0; j < t0 - t1; j++) {
          p = p.parentNode.parentNode;
        }
      }
      if (t1 <= t0) p.parentNode.appendChild(li);
      p = li;
      a = d.createElement('a');
      a.innerText = h.innerText;
      if (h.id) {
        a.href = '#' + h.id;
      } else {
        s = h.parentNode;
        if (s.classList.contains('section') && s.id) a.href = '#' + s.id;
      }
      p.appendChild(a);
      t0 = t1;
    });
    hs.length && article.insertBefore(toc, article.firstChild);
  }
  toc = article.querySelector('#TOC');
  if (toc) {
    var t = toc.firstElementChild;
    if (t && !/^H[1-6]$/.test(t.tagName)) {
      var h = d.createElement('h2'); h.innerText = toc_title;
      toc.insertBefore(h, t);
    }
    toc.className = 'side side-left';
    toc.querySelectorAll('ul > li').forEach(function(p) {
      has_number(p.innerText) && p.parentNode.classList.add('numbered');
    });
  }

  // make the top menu sticky
  if (config.indexOf('-sticky_menu') === -1 && config.indexOf('+sticky_menu') >= 0) {
    s = d.querySelector('.menu');
    if (s) {
      s.classList.add('sticky-top');
      var toc = article.querySelector('#TOC');
      if (toc) toc.style.top = s.offsetHeight + 'px';  // make sure menu won't cover TOC
    }
  }

  // add the edit link to the menu "Suggest an edit"
  s = d.querySelector('li#menu-edit');
  if (s) {
    a = d.querySelector('a#edit-link');
    if (a) {
      s = s.querySelector('a[href="#"]');
      if (s) s.href = a.href;
    } else {
      s.remove();  // no edit link available; delete the menu item
    }
  }

  // search
  a = d.querySelector('li#menu-search > a');
  if (a) {
    var t = a.innerText, fuse;
    a.addEventListener('click', function(e) {
      e.preventDefault();
      s = a.previousElementSibling;  // the search input
      if (a.innerText === '×') {
        if (s) s.style.display = 'none';
        d.body.classList.remove('search');
        a.innerText = t;  // restore menu text
        return;
      }
      if (!s) {
        s = document.createElement('div');
        s.innerHTML = '<input type="search" class="search-input" disabled placeholder="Loading search index...">';
        var input = s.firstElementChild;
        a.before(s);
        var c = d.createElement('div');  // container for search results
        c.className = 'container list search-results';
        var m = d.createElement('main');
        c.appendChild(m);
        d.querySelector('.container').before(c);
        // Esc to close search box when it's empty
        input.addEventListener('keydown', function(e) {
          if (this.value === '' && e.key === 'Escape') a.click();
        });
        // may need to debounce the search for better performance and UX
        input.addEventListener('input', function(e) {
          if (!fuse) return;
          // highlight the keyword of the maximum length in content
          var highlight = function(text, matches, len) {
            var indices;
            for (var item of matches) {
              if (item.key === 'content') indices = item.indices;
            }
            if (!indices) return text.substr(0, len);
            var p, pair, k = 0, n = Math.ceil(len / 2);
            while (pair = indices.shift()) {
              if (pair[1] - pair[0] >= k) {
                p = pair;
                k = p[1] - p[0];
              }
            }
            return (p[0] - n > 0 ? '[...] ' : '') + text.substring(p[0] - n, p[0]) +
              '<b>' + text.substring(p[0], p[1] + 1) + '</b>' +
              text.substring(p[1] + 1, p[1] + 1 + n) +
              (p[1] + 1 + n < text.length ? ' [...] ' : '');
          };
          var res, sec = d.createElement('section'), sec2, h, u, sum;
          sec.className = 'article-list';
          m.innerHTML = '';
          // display search results in <section class="article-list"> and highlight keywords
          for (res of fuse.search(this.value)) {
            sec2 = sec.cloneNode();
            h = d.createElement('h1');
            u = d.createElement('a');
            u.href = res.item.uri;
            u.target = '_blank';
            u.innerText = res.item.title;
            h.appendChild(u);
            sum = d.createElement('div');
            sum.innerHTML = highlight(res.item.content, res.matches, 300);
            sec2.appendChild(h);
            sec2.appendChild(sum);
            m.appendChild(sec2);
          };
        });
        if (!fuse) {
          var request = new XMLHttpRequest();
          request.responseType = 'json';
          request.addEventListener('load', function(e) {
            var res = request.response;
            if (!res || res.length === 0) {
              input.placeholder = 'Failed to load search index';
              return;
            }
            input.disabled = false;
            input.placeholder = 'Type to search';
            input.focus();
            fuse = new Fuse(request.response, {
              keys: ['title', 'content'],
              includeMatches: true,
              ignoreLocation: true,
              threshold: 0.1
            });
          }, false);
          request.open('GET', '/index.json');
          // if Fuse has not been loaded, load the latest version from CDN
          if (!window.Fuse) {
            var script = d.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.js';
            // fetch the search index after Fuse is ready
            script.onload = function(e) {
              request.send(null);
            };
            d.head.appendChild(script);
          } else {
            request.send(null);
          }
        }
      }
      s.style.display = 'block';
      s.firstElementChild.focus();
      a.innerText = '×';
      d.body.classList.add('search');
    });
  }
})(document);
