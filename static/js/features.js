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
})(document);