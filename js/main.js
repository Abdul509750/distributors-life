/**
 * Distribution Life — monday.com-style interactions
 */
(function () {
  'use strict';

  const CONTACT_EMAIL = 'i240824@isb.nu.edu.pk';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isMobile = !isFinePointer;

  function tr(key, fallback) {
    return window.DLI18n && typeof window.DLI18n.t === 'function' ? window.DLI18n.t(key) : fallback;
  }

  function markMobileExperience() {
    if (isMobile) document.body.classList.add('is-mobile');
  }

  function initPageLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) {
      document.body.classList.add('is-ready');
      return;
    }

    document.body.classList.add('is-loading');

    const finish = () => {
      loader.classList.add('is-done');
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-ready');
      window.setTimeout(() => loader.remove(), 700);
    };

    if (prefersReducedMotion || isMobile) {
      finish();
      return;
    }

    if (document.readyState === 'complete') {
      window.setTimeout(finish, 350);
    } else {
      window.addEventListener('load', () => window.setTimeout(finish, 350), { once: true });
    }
  }

  function initCopyEmail() {
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const copyEmailFeedback = document.getElementById('copy-email-feedback');
    if (!copyEmailBtn) return;

    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(CONTACT_EMAIL);
        if (copyEmailFeedback) copyEmailFeedback.textContent = tr('cta.copied', 'Email copied to clipboard.');
      } catch {
        window.prompt(tr('cta.copyPrompt', 'Copy this email address:'), CONTACT_EMAIL);
        if (copyEmailFeedback) {
          copyEmailFeedback.textContent = tr(
            'cta.copyFallback',
            'Email shown — copy it from the dialog if needed.'
          );
        }
      }
      if (copyEmailFeedback) {
        copyEmailFeedback.classList.remove('hidden');
        window.setTimeout(() => copyEmailFeedback.classList.add('hidden'), 3000);
      }
    });
  }

  function initMobileNav() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('icon-open');
    const iconClose = document.getElementById('icon-close');
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.toggle('hidden');
      iconOpen?.classList.toggle('hidden', isOpen);
      iconClose?.classList.toggle('hidden', !isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        iconOpen?.classList.remove('hidden');
        iconClose?.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initScrollReveal() {
    const heroReveals = document.querySelectorAll('#hero [data-reveal]');
    const scrollReveals = document.querySelectorAll('[data-reveal]:not(#hero [data-reveal])');

    if (!prefersReducedMotion) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          heroReveals.forEach((el) => el.classList.add('is-visible'));
        });
      });
    } else {
      heroReveals.forEach((el) => el.classList.add('is-visible'));
    }

    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      scrollReveals.forEach((el) => observer.observe(el));
    } else {
      scrollReveals.forEach((el) => el.classList.add('is-visible'));
    }
  }

  function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;

    const update = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function initMagneticButtons() {
    if (prefersReducedMotion || !isFinePointer) return;

    document.querySelectorAll('.btn-magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  function initProductTour() {
    const tour = document.getElementById('product-tour');
    if (!tour) return;

    const tabs = tour.querySelectorAll('[data-tour-tab]');
    const panels = tour.querySelectorAll('[data-tour-panel]');
    if (!tabs.length || !panels.length) return;

    const tabOrder = ['login', 'dashboard', 'guide'];
    let activeId = 'login';
    let autoTimer = null;
    let paused = false;

    const activate = (id) => {
      if (!tabOrder.includes(id)) return;
      activeId = id;

      tabs.forEach((tab) => {
        const isActive = tab.dataset.tourTab === id;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });

      panels.forEach((panel) => {
        const isActive = panel.dataset.tourPanel === id;
        panel.classList.toggle('is-active', isActive);
        panel.hidden = !isActive;
      });
    };

    const nextTab = () => {
      const idx = tabOrder.indexOf(activeId);
      activate(tabOrder[(idx + 1) % tabOrder.length]);
    };

    const startAuto = () => {
      if (prefersReducedMotion || isMobile) return;
      if (autoTimer) window.clearInterval(autoTimer);
      autoTimer = window.setInterval(() => {
        if (!paused) nextTab();
      }, 5500);
    };

    const stopAuto = () => {
      if (autoTimer) window.clearInterval(autoTimer);
      autoTimer = null;
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        activate(tab.dataset.tourTab);
        paused = true;
        stopAuto();
        window.setTimeout(() => {
          paused = false;
          startAuto();
        }, 12000);
      });

      tab.addEventListener('keydown', (e) => {
        const idx = tabOrder.indexOf(tab.dataset.tourTab);
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const dir = e.key === 'ArrowRight' ? 1 : -1;
          const next = tabOrder[(idx + dir + tabOrder.length) % tabOrder.length];
          activate(next);
          tour.querySelector(`[data-tour-tab="${next}"]`)?.focus();
        }
      });
    });

    tour.addEventListener('mouseenter', () => {
      paused = true;
    });

    tour.addEventListener('mouseleave', () => {
      paused = false;
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAuto();
      else startAuto();
    });

    activate(activeId);
    startAuto();
  }

  function initScrollShowcase() {
    const section = document.getElementById('scroll-showcase');
    const scene = section?.querySelector('.scroll-showcase__scene');
    const center = document.getElementById('showcase-center');
    const cards = section?.querySelectorAll('.orbit-card');
    if (!section || !scene || !center || !cards?.length) return;

    if (prefersReducedMotion || isMobile) return;

    let ticking = false;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollRange = scene.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) {
        ticking = false;
        return;
      }

      const progress = Math.max(0, Math.min(1, -rect.top / scrollRange));

      const centerFadeStart = 0.72;
      const centerOpacity =
        progress <= centerFadeStart
          ? 1
          : Math.max(0, 1 - (progress - centerFadeStart) / (1 - centerFadeStart));
      center.style.transform = `translate3d(0, ${progress * 70}px, 0) scale(${1 - progress * 0.04})`;
      center.style.opacity = String(centerOpacity);

      cards.forEach((card, index) => {
        const speed = parseFloat(card.getAttribute('data-float-speed') || '1');
        const drift = parseFloat(card.getAttribute('data-float-drift') || '0');
        const fadeStart = parseFloat(card.getAttribute('data-fade-start') || String(index * 0.07));
        const fadeSpan = 0.42;
        const fadeT = Math.max(0, Math.min(1, (progress - fadeStart) / fadeSpan));
        const opacity = 1 - fadeT;
        const scale = 1 - fadeT * 0.12;
        const y = progress * speed * 220 + fadeT * 40;
        const x = progress * drift;
        const isCentered = card.classList.contains('orbit-card--5') || card.classList.contains('orbit-card--6');
        const transform = isCentered
          ? `translate3d(calc(-50% + ${x}px), ${y}px, 0) scale(${scale})`
          : `translate3d(${x}px, ${y}px, 0) scale(${scale})`;

        card.style.transform = transform;
        card.style.opacity = String(opacity);
        card.style.pointerEvents = opacity < 0.05 ? 'none' : '';
      });

      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      },
      { passive: true }
    );

    update();
  }

  function initAutofillDemo() {
    const stage = document.getElementById('autofill-stage');
    if (!stage) return;

    const rows = stage.querySelectorAll('.autofill-row[data-field]');
    const cursor = stage.querySelector('.autofill-cursor');
    const saveBtn = stage.querySelector('.autofill-save');
    const floats = stage.querySelectorAll('.autofill-float');
    if (!rows.length || !cursor || !saveBtn) return;

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const typeText = async (el, text, delay = 28) => {
      el.textContent = '';
      for (let i = 0; i < text.length; i += 1) {
        el.textContent += text[i];
        await sleep(delay);
      }
    };

    const moveCursor = (target) => {
      const stageRect = stage.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const x = targetRect.left - stageRect.left + targetRect.width * 0.72;
      const y = targetRect.top - stageRect.top + targetRect.height * 0.5;
      cursor.style.transform = `translate(${x}px, ${y}px)`;
      cursor.classList.add('is-visible');
    };

    const showStatus = (row) => {
      const status = row.querySelector('.autofill-status');
      const key = row.getAttribute('data-status-key');
      if (!status || !key) return;
      status.textContent = window.DLI18n?.t(key) || status.textContent;
      status.classList.add('is-show');
    };

    const showFloat = (id) => {
      if (!id) return;
      const card = stage.querySelector(`.autofill-float[data-float="${id}"]`);
      card?.classList.add('is-show');
    };

    const resetDemo = () => {
      rows.forEach((row) => {
        row.classList.remove('is-active', 'is-filled');
        row.querySelectorAll('.autofill-input__text').forEach((el) => {
          el.textContent = '';
        });
        row.querySelector('.autofill-status')?.classList.remove('is-show');
      });
      floats.forEach((card) => card.classList.remove('is-show'));
      saveBtn.classList.remove('is-ready');
      cursor.classList.remove('is-visible');
    };

    const fillRow = async (row) => {
      row.classList.add('is-active');

      if (row.classList.contains('autofill-row--pack')) {
        const packInputs = row.querySelectorAll('[data-pack]');
        for (let i = 0; i < packInputs.length; i += 1) {
          const input = packInputs[i];
          const textEl = input.querySelector('.autofill-input__text');
          moveCursor(input);
          await sleep(180);
          await typeText(textEl, input.getAttribute('data-value') || '', 24);
          await sleep(120);
        }
      } else {
        const input = row.querySelector('.autofill-input');
        const textEl = row.querySelector('.autofill-input__text');
        moveCursor(input);
        await sleep(180);
        await typeText(textEl, row.getAttribute('data-value') || '', 26);
      }

      row.classList.remove('is-active');
      row.classList.add('is-filled');
      showStatus(row);
      showFloat(row.getAttribute('data-float'));
      await sleep(420);
    };

    const fillAllInstant = () => {
      rows.forEach((row) => {
        row.classList.add('is-filled');
        if (row.classList.contains('autofill-row--pack')) {
          row.querySelectorAll('[data-pack]').forEach((input) => {
            const textEl = input.querySelector('.autofill-input__text');
            if (textEl) textEl.textContent = input.getAttribute('data-value') || '';
          });
        } else {
          const textEl = row.querySelector('.autofill-input__text');
          if (textEl) textEl.textContent = row.getAttribute('data-value') || '';
        }
        showStatus(row);
      });
      floats.forEach((card) => card.classList.add('is-show'));
      saveBtn.classList.add('is-ready');
    };

    let playing = false;
    let loopTimer = null;

    const runLoop = async () => {
      if (playing || !stage.isConnected) return;
      playing = true;
      resetDemo();
      await sleep(500);

      for (let i = 0; i < rows.length; i += 1) {
        if (!playing) break;
        await fillRow(rows[i]);
      }

      if (!playing) return;
      moveCursor(saveBtn);
      showFloat('4');
      saveBtn.classList.add('is-ready');
      await sleep(2200);
      playing = false;
      loopTimer = setTimeout(runLoop, 600);
    };

    const stopLoop = () => {
      playing = false;
      if (loopTimer) {
        clearTimeout(loopTimer);
        loopTimer = null;
      }
    };

    if (prefersReducedMotion || isMobile) {
      fillAllInstant();
      return;
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) runLoop();
            else stopLoop();
          });
        },
        { threshold: 0.35 }
      );
      observer.observe(stage);
    } else {
      runLoop();
    }

    document.addEventListener('dl:langchange', () => {
      rows.forEach((row) => {
        const status = row.querySelector('.autofill-status');
        const key = row.getAttribute('data-status-key');
        if (status?.classList.contains('is-show') && key) {
          status.textContent = window.DLI18n.t(key);
        }
      });
    });
  }

  function initPdfDemo() {
    const stage = document.getElementById('pdf-stage');
    const saveBtn = document.getElementById('pdf-save-btn');
    const popup = document.getElementById('pdf-popup');
    const float = document.getElementById('pdf-float');
    const cursor = stage?.querySelector('.pdf-cursor');
    if (!stage || !saveBtn || !popup || !float || !cursor) return;

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let playing = false;
    let loopTimer = null;

    const moveCursorTo = (el) => {
      const stageRect = stage.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      const x = rect.left - stageRect.left + rect.width * 0.65;
      const y = rect.top - stageRect.top + rect.height * 0.55;
      cursor.style.transform = `translate(${x}px, ${y}px)`;
      cursor.classList.add('is-visible');
    };

    const resetDemo = () => {
      stage.classList.remove('is-exporting', 'is-done');
      saveBtn.classList.remove('is-pressed', 'is-armed');
      float.classList.remove('is-show');
      cursor.classList.remove('is-visible');
      popup.setAttribute('aria-hidden', 'true');
    };

    const runExport = async () => {
      if (playing) return;
      playing = true;
      resetDemo();
      await sleep(400);

      saveBtn.classList.add('is-armed');
      moveCursorTo(saveBtn);
      await sleep(700);

      saveBtn.classList.remove('is-armed');
      saveBtn.classList.add('is-pressed');
      stage.classList.add('is-exporting');
      await sleep(280);

      stage.classList.remove('is-exporting');
      stage.classList.add('is-done');
      popup.setAttribute('aria-hidden', 'false');
      float.classList.add('is-show');
      saveBtn.classList.remove('is-pressed');
      await sleep(3200);

      resetDemo();
      playing = false;
    };

    const showInstant = () => {
      stage.classList.add('is-done');
      popup.setAttribute('aria-hidden', 'false');
      float.classList.add('is-show');
    };

    saveBtn.addEventListener('click', () => {
      if (playing) return;
      runExport();
    });

    if (prefersReducedMotion || isMobile) {
      showInstant();
      return;
    }

    const scheduleLoop = () => {
      if (loopTimer) clearTimeout(loopTimer);
      loopTimer = setTimeout(async () => {
        if (!playing) await runExport();
        if (stage.isConnected) scheduleLoop();
      }, 1200);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) scheduleLoop();
            else {
              if (loopTimer) clearTimeout(loopTimer);
              loopTimer = null;
              playing = false;
              resetDemo();
            }
          });
        },
        { threshold: 0.4 }
      );
      observer.observe(stage);
    } else {
      scheduleLoop();
    }
  }

  function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      const toggle = item.querySelector('.faq-toggle');
      const answer = item.querySelector('.faq-answer');
      const chevron = item.querySelector('.faq-chevron');
      if (!toggle || !answer) return;

      toggle.addEventListener('click', () => {
        const willOpen = !item.classList.contains('open');

        faqItems.forEach((other) => {
          other.classList.remove('open');
          const otherAnswer = other.querySelector('.faq-answer');
          const otherChevron = other.querySelector('.faq-chevron');
          const otherToggle = other.querySelector('.faq-toggle');
          if (otherAnswer) otherAnswer.style.maxHeight = '0px';
          otherChevron?.classList.remove('rotate-180');
          otherToggle?.setAttribute('aria-expanded', 'false');
        });

        if (willOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          chevron?.classList.add('rotate-180');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('dl:langchange', () => {
      faqItems.forEach((item) => {
        if (!item.classList.contains('open')) return;
        const answer = item.querySelector('.faq-answer');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    markMobileExperience();
    initPageLoader();
    initCopyEmail();
    initMobileNav();
    initScrollReveal();
    initHeaderScroll();
    initMagneticButtons();
    initProductTour();
    initAutofillDemo();
    initPdfDemo();
    initScrollShowcase();
    initFaq();
  });
})();
