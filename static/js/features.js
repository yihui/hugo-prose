(function(d) {
  // move <figcaption> out of <figure> (and p.caption out of div.figure) so that <figure> can scroll
  d.querySelectorAll('.fullscroll figure > figcaption, .fullscroll .figure > .caption').forEach(el => {
    el.parentNode.after(el);
  });

  // make TOC stiky beneath the top menu
  const menu = d.querySelector('.menu'), toc = d.querySelector('#TOC');
  if (menu?.classList.contains('sticky-top')) {
    if (toc) toc.style.top = menu.offsetHeight + 'px';
  }
  toc?.classList.add('side', 'side-left');

  // add the edit link to the menu "Suggest an edit"
  let s = d.querySelector('li#menu-edit');
  if (s) {
    const a = d.querySelector('a#edit-link');
    if (a) {
      s = s.querySelector('a[href="#"]');
      if (s) s.href = a.href;
    } else {
      s.remove();  // no edit link available; delete the menu item
    }
  }

  // search
  const a = d.querySelector('li#menu-search > a');
  if (a) {
    let t = a.innerText, fuse;
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
        const input = s.firstElementChild;
        a.before(s);
        const c = d.createElement('div');  // container for search results
        c.className = 'container list search-results';
        const m = d.createElement('main');
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
          function highlight(text, matches, len) {
            let indices;
            for (let item of matches) {
              if (item.key === 'content') indices = item.indices;
            }
            if (!indices) return text.substr(0, len);
            let p, pair, k = 0, n = Math.ceil(len / 2);
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
          let res, sec = d.createElement('section'), sec2, h, u, sum;
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
          const request = new XMLHttpRequest();
          request.responseType = 'json';
          request.addEventListener('load', function(e) {
            const res = request.response;
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
            const script = d.createElement('script');
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