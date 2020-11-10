(function(d) {
  // implement some features for articles: sidenotes, number_sections, toc

  var config = [];
  if (d.currentScript) {
    config = d.currentScript.dataset['pageFeatures'];
    config = config ? JSON.parse(config) : [];
  }

  var removeEl = function(el) {
    if (!el) return;
    el.remove ? el.remove() : el.parentNode.removeChild(el);
  };

  var insertAfter = function(prev, sib) {
    prev.after ? prev.after(sib) : (
      prev.parentNode.insertBefore(sib, prev.nextSibling)
    );
  };

  var i, a, s;

  // process single articles
  var article = d.querySelector('main .article');
  if (!article) article = d.createElement('div');

  // move <figcaption> out of <figure> so that <figure> can scroll
  d.querySelectorAll('.fullscroll figure > figcaption').forEach(function(el) {
    var p = el.parentNode;
    if (p.tagName === 'FIGURE') insertAfter(p, el);
  });

  // move footnotes to sidenotes
  if (config.indexOf('-sidenotes') === -1) {
    d.querySelectorAll('section.footnotes li[id^="fn:"]').forEach(function(fn) {
      a = d.querySelector('a[href="#' + fn.id + '"]');  // <a> that contains footnote number in body
      if (!a) return;
      a.removeAttribute('href');
      var n = a.innerText;   // footnote number
      s = d.createElement('div');  // insert a side div next to n in body
      s.className = 'side side-right';
      s.innerHTML = fn.innerHTML;
      s.firstElementChild.innerHTML = '<span class="bg-number">' + n +
        '</span> ' + s.firstElementChild.innerHTML;
      removeEl(s.querySelector('a[href^="#fnref:"]'));  // remove backreference in footnote
      removeEl(fn);
      insertAfter(a.parentNode, s);  // insert note after the <sup> that contains a
    });
    // remove the footnote section if it's empty now
    var fns = d.querySelector('section.footnotes');
    fns && fns.querySelector('ol').childElementCount === 0 && removeEl(fns);
  }

  // header level: <hN> -> N
  var level = function(x) {
    return parseInt(x.replace(/^h/i, ''));
  };
  // number sections
  var h, hs = article.querySelectorAll('h1,h2,h3,h4,h5,h6'), t0 = 0, t1,
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

  // build TOC
  var build_toc = config.indexOf('+toc') >= 0 ? true : (
    config.indexOf('-toc') >= 0 ? false : !article.querySelector('#TOC')
  );
  if (build_toc) {
    var li, toc = d.createElement('div'), ul;
    var p = toc;  // the current parent in which we insert child TOC items
    toc.id = 'TOC'; toc.className = 'side side-left';
    h = d.createElement('h3'); h.innerText = 'Contents'
    toc.appendChild(h);
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
      s = a.innerText = h.innerText;
      if (h.id) a.href = '#' + h.id;
      p.appendChild(a);
      has_number(s) && p.parentNode.classList.add('numbered');
      t0 = t1;
    });
    hs.length && article.insertBefore(toc, article.firstChild);
  }

  // make the top menu sticky
  if (config.indexOf('-sticky_menu') === -1 && config.indexOf('+sticky_menu') >= 0) {
    s = d.querySelector('.menu');
    if (s) {
      s.classList.add('sticky-top');
      var toc = d.querySelector('#TOC');
      if (toc) toc.style.top = s.offsetHeight + 'px';  // make sure menu won't cover TOC
    }
  }
})(document);
