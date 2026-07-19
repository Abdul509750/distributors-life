/**
 * FAQ sidebar + prev/next navigation.
 */
(function () {
  'use strict';

  function t(key) {
    return window.DLI18n && typeof window.DLI18n.t === 'function' ? window.DLI18n.t(key) : key;
  }

  function buildHubList() {
    const hub = document.getElementById('faq-hub-list');
    if (!hub || !window.FAQ_PAGES) return;

    const list = document.createElement('ol');
    list.className = 'faq-home-list';

    window.FAQ_PAGES.forEach((page) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = `${page.slug}.html`;
      link.className = 'faq-home-link';
      link.innerHTML = `<span data-i18n="${page.qKey}">${t(page.qKey)}</span><span class="faq-home-link__arrow" aria-hidden="true">\u2192</span>`;
      li.appendChild(link);
      list.appendChild(li);
    });

    hub.innerHTML = '';
    hub.appendChild(list);
  }

  function buildSidebar(currentSlug) {
    const aside = document.getElementById('faq-sidebar');
    if (!aside || !window.FAQ_PAGES) return;

    const isHub = aside.dataset.faqHub === 'true';
    const list = document.createElement('ol');
    list.className = 'faq-sidebar__list';

    window.FAQ_PAGES.forEach((page, index) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = `${page.slug}.html`;
      link.className = 'faq-sidebar__link';
      link.dataset.i18n = page.qKey;
      link.textContent = t(page.qKey);

      if (!isHub && page.slug === currentSlug) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }

      li.appendChild(link);
      list.appendChild(li);
    });

    aside.innerHTML = '';
    const label = document.createElement('p');
    label.className = 'faq-sidebar__label';
    label.dataset.i18n = 'faqPage.allQuestions';
    label.textContent = t('faqPage.allQuestions');
    aside.appendChild(label);
    aside.appendChild(list);
  }

  function buildPager(currentSlug) {
    const pager = document.getElementById('faq-pager');
    if (!pager || !window.FAQ_PAGES) return;

    const index = window.FAQ_PAGES.findIndex((p) => p.slug === currentSlug);
    if (index < 0) return;

    const prev = window.FAQ_PAGES[index - 1];
    const next = window.FAQ_PAGES[index + 1];

    pager.innerHTML = '';

    if (prev) {
      const prevLink = document.createElement('a');
      prevLink.href = `${prev.slug}.html`;
      prevLink.className = 'faq-pager__link faq-pager__link--prev';
      prevLink.innerHTML = `<span class="faq-pager__dir" data-i18n="faqPage.prev">${t('faqPage.prev')}</span><span data-i18n="${prev.qKey}">${t(prev.qKey)}</span>`;
      pager.appendChild(prevLink);
    } else {
      pager.appendChild(document.createElement('span'));
    }

    if (next) {
      const nextLink = document.createElement('a');
      nextLink.href = `${next.slug}.html`;
      nextLink.className = 'faq-pager__link faq-pager__link--next';
      nextLink.innerHTML = `<span class="faq-pager__dir" data-i18n="faqPage.next">${t('faqPage.next')}</span><span data-i18n="${next.qKey}">${t(next.qKey)}</span>`;
      pager.appendChild(nextLink);
    }
  }

  function initFaqNav() {
    const sidebar = document.getElementById('faq-sidebar');
    const pager = document.getElementById('faq-pager');
    const hub = document.getElementById('faq-hub-list');
    if (!sidebar && !pager && !hub) return;

    const current = sidebar?.dataset.faqCurrent || pager?.dataset.faqCurrent || '';
    buildHubList();
    buildSidebar(current);
    buildPager(current);

    document.addEventListener('dl:langchange', () => {
      buildHubList();
      buildSidebar(current);
      buildPager(current);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFaqNav);
  } else {
    initFaqNav();
  }
})();
