/**
 * Distribution Life — monday.com-style interactions
 */
(function () {
  'use strict';

  const WHATSAPP_NUMBER = '923187252818';
  const WHATSAPP_DISPLAY = '+92 318 7252818';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isMobile = !isFinePointer;
  const isNarrowViewport = window.matchMedia('(max-width: 767px)').matches;

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

  function runCountUp(el) {
    if (!el || el.dataset.counted === 'true') return;
    const target = Number(el.getAttribute('data-count'));
    if (!Number.isFinite(target)) return;

    el.dataset.counted = 'true';
    el.classList.add('is-counting');

    const prefix = el.getAttribute('data-count-prefix') || '';
    const suffix = el.getAttribute('data-count-suffix') || '';

    const render = (value) => {
      el.textContent = `${prefix}${value}${suffix}`;
    };

    if (prefersReducedMotion) {
      render(String(target));
      el.classList.remove('is-counting');
      return;
    }

    const duration = 1820;
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 4);

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      render(String(Math.round(easeOut(progress) * target)));
      if (progress < 1) requestAnimationFrame(tick);
      else {
        render(String(target));
        el.classList.remove('is-counting');
      }
    };

    requestAnimationFrame(tick);
  }

  function triggerMotion(el) {
    if (el.hasAttribute('data-reveal')) {
      el.classList.add('is-visible');
    }
    if (el.hasAttribute('data-count')) {
      runCountUp(el);
    }
    el.querySelectorAll('[data-count]').forEach(runCountUp);
  }

  function initScrollReveal() {
    const heroReveals = document.querySelectorAll('#hero [data-reveal]');
    const motionTargets = document.querySelectorAll('[data-reveal]:not(#hero [data-reveal]), [data-count]:not(#hero [data-count])');

    if (!prefersReducedMotion) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          heroReveals.forEach((el) => triggerMotion(el));
        });
      });
    } else {
      heroReveals.forEach((el) => triggerMotion(el));
    }

    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            triggerMotion(entry.target);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
      );
      motionTargets.forEach((el) => observer.observe(el));
    } else {
      motionTargets.forEach((el) => triggerMotion(el));
    }
  }

  function initStaggerGroups() {
    if (prefersReducedMotion) return;

    document.querySelectorAll('[data-stagger]').forEach((group) => {
      const step = parseInt(group.getAttribute('data-stagger'), 10) || 130;
      group.querySelectorAll('[data-reveal]').forEach((el, index) => {
        if (!el.style.getPropertyValue('--d')) {
          el.style.setProperty('--d', `${index * step}ms`);
        }
      });
    });
  }

  function initAmbientScroll() {
    if (prefersReducedMotion || isMobile) return;

    const hero = document.getElementById('hero');
    const mesh = hero?.querySelector('.hero-mesh');
    if (!hero || !mesh) return;

    let ticking = false;

    const update = () => {
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(rect.height, 1)));
      mesh.style.transform = `translate3d(0, ${progress * 36}px, 0)`;
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
        if (isActive && !prefersReducedMotion) {
          const img = panel.querySelector('.reveal-media img');
          if (img) {
            img.classList.remove('is-tab-zoom');
            void img.offsetWidth;
            img.classList.add('is-tab-zoom');
          }
        }
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
    const compact = isNarrowViewport;

    const typeText = async (el, text, delay = compact ? 0 : 28) => {
      if (compact || delay === 0) {
        el.textContent = text;
        await sleep(60);
        return;
      }
      el.textContent = '';
      for (let i = 0; i < text.length; i += 1) {
        el.textContent += text[i];
        await sleep(delay);
      }
    };

    const moveCursor = (target) => {
      if (compact) return;
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
      const rowPause = compact ? 80 : 180;
      const packPause = compact ? 50 : 120;
      const afterPause = compact ? 180 : 420;

      if (row.classList.contains('autofill-row--pack')) {
        const packInputs = row.querySelectorAll('[data-pack]');
        for (let i = 0; i < packInputs.length; i += 1) {
          const input = packInputs[i];
          const textEl = input.querySelector('.autofill-input__text');
          moveCursor(input);
          await sleep(rowPause);
          await typeText(textEl, input.getAttribute('data-value') || '', compact ? 0 : 24);
          await sleep(packPause);
        }
      } else {
        const input = row.querySelector('.autofill-input');
        const textEl = row.querySelector('.autofill-input__text');
        moveCursor(input);
        await sleep(rowPause);
        await typeText(textEl, row.getAttribute('data-value') || '', compact ? 0 : 26);
      }

      row.classList.remove('is-active');
      row.classList.add('is-filled');
      showStatus(row);
      showFloat(row.getAttribute('data-float'));
      await sleep(afterPause);
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

    let active = false;
    let playing = false;
    let loopTimer = null;
    const PAUSE_BETWEEN = compact ? 900 : 1400;

    const scheduleNext = (delay = PAUSE_BETWEEN) => {
      if (!active || loopTimer) return;
      loopTimer = window.setTimeout(() => {
        loopTimer = null;
        runLoop();
      }, delay);
    };

    const stopLoop = () => {
      active = false;
      playing = false;
      if (loopTimer) {
        clearTimeout(loopTimer);
        loopTimer = null;
      }
    };

    const startLoop = () => {
      active = true;
      if (!playing && !loopTimer) runLoop();
    };

    const runLoop = async () => {
      if (!active || playing || !stage.isConnected) return;
      playing = true;

      try {
        resetDemo();
        await sleep(compact ? 250 : 500);

        for (let i = 0; i < rows.length; i += 1) {
          if (!active) break;
          await fillRow(rows[i]);
        }

        if (!active) return;
        moveCursor(saveBtn);
        showFloat('4');
        saveBtn.classList.add('is-ready');
        await sleep(compact ? 1200 : 2200);
      } finally {
        playing = false;
        if (active) scheduleNext();
      }
    };

    if (prefersReducedMotion) {
      fillAllInstant();
      return;
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) startLoop();
            else {
              stopLoop();
              resetDemo();
            }
          });
        },
        { threshold: 0.35 }
      );
      observer.observe(stage);
    } else {
      startLoop();
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
    const compact = isNarrowViewport;
    let active = false;
    let playing = false;
    let loopTimer = null;
    const PAUSE_BETWEEN = compact ? 900 : 1600;

    const moveCursorTo = (el) => {
      if (compact) return;
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

    const scheduleNext = (delay = PAUSE_BETWEEN) => {
      if (!active || loopTimer) return;
      loopTimer = window.setTimeout(() => {
        loopTimer = null;
        runCycle();
      }, delay);
    };

    const stopLoop = () => {
      active = false;
      playing = false;
      if (loopTimer) {
        clearTimeout(loopTimer);
        loopTimer = null;
      }
    };

    const startLoop = () => {
      active = true;
      if (!playing && !loopTimer) runCycle();
    };

    const runCycle = async ({ manual = false } = {}) => {
      if (playing || (!active && !manual)) return;
      playing = true;

      try {
        resetDemo();
        await sleep(compact ? 200 : 400);

        saveBtn.classList.add('is-armed');
        moveCursorTo(saveBtn);
        await sleep(compact ? 350 : 700);

        saveBtn.classList.remove('is-armed');
        saveBtn.classList.add('is-pressed');
        stage.classList.add('is-exporting');
        await sleep(compact ? 180 : 280);

        stage.classList.remove('is-exporting');
        stage.classList.add('is-done');
        popup.setAttribute('aria-hidden', 'false');
        float.classList.add('is-show');
        saveBtn.classList.remove('is-pressed');
        await sleep(compact ? 1800 : 3200);

        resetDemo();
      } finally {
        playing = false;
        if (active) scheduleNext();
      }
    };

    const showInstant = () => {
      stage.classList.add('is-done');
      popup.setAttribute('aria-hidden', 'false');
      float.classList.add('is-show');
    };

    saveBtn.addEventListener('click', () => {
      if (playing) return;
      runCycle({ manual: true });
    });

    if (prefersReducedMotion) {
      showInstant();
      return;
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) startLoop();
            else {
              stopLoop();
              resetDemo();
            }
          });
        },
        { threshold: 0.4 }
      );
      observer.observe(stage);
    } else {
      startLoop();
    }
  }

  function initSalesForm() {
    const form = document.getElementById('sales-demo-form');
    if (!form) return;

    const formWrap = document.getElementById('sales-form-wrap');
    const success = document.getElementById('sales-form-success');
    const supabaseConfig = window.DL_SUPABASE || {};

    const buildRecord = (data) => ({
      full_name: data.fullName,
      company_name: data.company,
      email: data.email ? data.email.toLowerCase() : null,
      phone: data.phone,
      industry: data.industry || null,
      company_size: data.companySize || null,
      drivers: data.drivers || null,
      current_process: data.currentProcess || null,
      challenge: data.challenge || null,
      message: data.message || null,
      source: 'contact_form',
    });

    function supabaseFetchHeaders(key) {
      const headers = {
        apikey: key,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      };
      // Legacy anon/service_role JWT keys need Authorization; sb_publishable_ keys must not use Bearer.
      if (key.startsWith('eyJ')) {
        headers.Authorization = `Bearer ${key}`;
      }
      return headers;
    }

    async function submitDemoRequest(data) {
      if (data.website) return true;

      try {
        const apiResponse = await fetch('/api/submit-demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (apiResponse.ok) return true;
      } catch {
        /* local preview — fall through to direct Supabase */
      }

      const { url, key } = supabaseConfig;
      if (!url || !key) {
        throw new Error('not_configured');
      }

      const response = await fetch(`${url}/rest/v1/demo_requests`, {
        method: 'POST',
        headers: supabaseFetchHeaders(key),
        body: JSON.stringify(buildRecord(data)),
      });

      if (!response.ok) {
        console.error('Supabase insert failed:', response.status, await response.text());
        throw new Error('supabase_failed');
      }

      return true;
    }

    const showError = (fieldId, message) => {
      const input = document.getElementById(fieldId);
      const error = document.getElementById(`${fieldId}-error`);
      if (input) input.classList.add('is-invalid');
      if (error) {
        error.textContent = message;
        error.hidden = false;
      }
    };

    const clearErrors = () => {
      form.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
      form.querySelectorAll('.sales-field-error').forEach((el) => {
        el.textContent = '';
        el.hidden = true;
      });
    };

    const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors();

      const formError = document.getElementById('sales-form-error');
      if (formError) {
        formError.textContent = '';
        formError.hidden = true;
      }

      const data = {
        fullName: form.fullName.value.trim(),
        company: form.company.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        industry: form.industry.value,
        companySize: form.companySize.value,
        drivers: form.drivers.value,
        currentProcess: form.currentProcess.value,
        challenge: form.challenge.value,
        message: form.message.value.trim(),
        website: form.website?.value?.trim() || '',
      };

      let valid = true;

      if (!data.fullName) {
        showError('sales-name', tr('sales.form.errorRequired', 'This field is required.'));
        valid = false;
      }
      if (!data.company) {
        showError('sales-company', tr('sales.form.errorRequired', 'This field is required.'));
        valid = false;
      }
      if (data.email && !isValidEmail(data.email)) {
        showError('sales-email', tr('sales.form.errorEmail', 'Enter a valid email address.'));
        valid = false;
      }
      if (!data.phone) {
        showError('sales-phone', tr('sales.form.errorRequired', 'This field is required.'));
        valid = false;
      }

      if (!valid) {
        const firstInvalid = form.querySelector('.is-invalid');
        firstInvalid?.focus();
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]');
      const defaultLabel = submitBtn?.textContent || '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
        submitBtn.textContent = tr('sales.form.submitting', 'Submitting…');
      }

      try {
        await submitDemoRequest(data);

        if (formWrap) formWrap.hidden = true;
        if (success) {
          success.hidden = false;
          success.focus();
        }
      } catch {
        if (formError) {
          formError.textContent = tr(
            'sales.form.errorSubmit',
            'Something went wrong. Please try again or message us on WhatsApp.'
          );
          formError.hidden = false;
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-loading');
          submitBtn.textContent = defaultLabel;
        }
      }
    });

    const copyBtn = document.getElementById('sales-copy-phone-btn');
    const copyFeedback = document.getElementById('sales-copy-feedback');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(WHATSAPP_DISPLAY);
          if (copyFeedback) {
            copyFeedback.textContent = tr('cta.phoneCopied', 'Number copied to clipboard.');
            copyFeedback.hidden = false;
          }
        } catch {
          window.prompt(tr('cta.copyPhonePrompt', 'Copy this phone number:'), WHATSAPP_DISPLAY);
          if (copyFeedback) {
            copyFeedback.textContent = tr(
              'cta.copyFallback',
              'Number shown — copy it from the dialog if needed.'
            );
            copyFeedback.hidden = false;
          }
        }
        if (copyFeedback) {
          window.setTimeout(() => {
            copyFeedback.hidden = true;
          }, 3000);
        }
      });
    }
  }

  function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      const toggle = item.querySelector('.faq-toggle');
      const answer = item.querySelector('.faq-answer');
      const chevron = item.querySelector('.faq-chevron');
      if (!toggle || !answer) return;

      answer.style.maxHeight = '0px';

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

  function initPrivacyToc() {
    const tocLinks = document.querySelectorAll('.privacy-toc__link');
    const sections = document.querySelectorAll('.privacy-section[id]');
    if (!tocLinks.length || !sections.length) return;

    const setActive = (id) => {
      tocLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (visible[0]) setActive(visible[0].target.id);
        },
        { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
      );
      sections.forEach((section) => observer.observe(section));
    }

    tocLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const id = link.getAttribute('href')?.slice(1);
        if (id) setActive(id);
      });
    });
  }

  function siteRootPrefix() {
    const path = (window.location.pathname || '').replace(/\\/g, '/');
    return path.includes('/faq/') ? '../' : '';
  }

  function initAzadiSideTag() {
    const offerEnds = new Date('2026-08-31T23:59:59+05:00');
    if (Date.now() > offerEnds.getTime()) {
      document.querySelectorAll('.azadi-gift-band').forEach((el) => el.remove());
      return;
    }

    try {
      if (sessionStorage.getItem('dl-azadi-band-dismissed') === '1') {
        document.querySelectorAll('.azadi-gift-band').forEach((el) => el.remove());
        return;
      }
    } catch (_) {
      /* ignore */
    }

    const root = siteRootPrefix();
    const pricingHref = `${root}pricing.html`;
    const flagSrc = `${root}assets/images/Pakistani_Flag.webp`;

    let band = document.querySelector('.azadi-gift-band');

    if (!band) {
      band = document.createElement('aside');
      band.className = 'azadi-gift-band';
      band.setAttribute('aria-label', tr('azadi.tag.aria', 'Distribution Life is free of cost until 31st of August'));

      const makeChunk = () =>
        '<span class="azadi-gift-band__chunk">' +
        '<img class="azadi-gift-band__flag" src="' +
        flagSrc +
        '" alt="" width="28" height="18" loading="lazy" decoding="async" />' +
        '<strong data-azadi-i18n="azadi.tag.title">Free until 31 Aug</strong>' +
        '<span class="azadi-gift-band__dot" aria-hidden="true">•</span>' +
        '<span data-azadi-i18n="azadi.tag.sub">Free of cost</span>' +
        '<span class="azadi-gift-band__dot" aria-hidden="true">•</span>' +
        '<span data-azadi-i18n="azadi.tag.eyebrow">14 August</span>' +
        '<span class="azadi-gift-band__dot" aria-hidden="true">•</span>' +
        '</span>';

      band.innerHTML =
        '<a class="azadi-gift-band__link" href="' +
        pricingHref +
        '">' +
        '<span class="azadi-gift-band__track">' +
        makeChunk() +
        makeChunk() +
        makeChunk() +
        makeChunk() +
        '</span>' +
        '</a>' +
        '<button type="button" class="azadi-gift-band__close" aria-label="' +
        tr('azadi.tag.dismiss', 'Dismiss banner') +
        '">&times;</button>';

      document.body.appendChild(band);
    }

    const applyCopy = () => {
      const fallbacks = {
        'azadi.tag.eyebrow': '14 August',
        'azadi.tag.title': 'Free until 31 Aug',
        'azadi.tag.sub': 'Free of cost',
      };
      band.querySelectorAll('[data-azadi-i18n]').forEach((el) => {
        const key = el.getAttribute('data-azadi-i18n');
        el.textContent = tr(key, fallbacks[key] || '');
      });
      band.setAttribute('aria-label', tr('azadi.tag.aria', 'Distribution Life is free of cost until 31st of August'));
      const closeBtn = band.querySelector('.azadi-gift-band__close');
      if (closeBtn) {
        closeBtn.setAttribute('aria-label', tr('azadi.tag.dismiss', 'Dismiss banner'));
      }
    };

    applyCopy();

    const closeBtn = band.querySelector('.azadi-gift-band__close');
    if (closeBtn && !closeBtn.dataset.bound) {
      closeBtn.dataset.bound = '1';
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        band.classList.add('is-hiding');
        try {
          sessionStorage.setItem('dl-azadi-band-dismissed', '1');
        } catch (_) {
          /* ignore */
        }
        window.setTimeout(() => band.remove(), 250);
      });
    }

    document.addEventListener('dl:langchange', applyCopy);
  }

  document.addEventListener('DOMContentLoaded', () => {
    markMobileExperience();
    initPageLoader();
    initMobileNav();
    initScrollReveal();
    initStaggerGroups();
    initAmbientScroll();
    initHeaderScroll();
    initMagneticButtons();
    initProductTour();
    initAutofillDemo();
    initPdfDemo();
    initScrollShowcase();
    initSalesForm();
    initFaq();
    initPrivacyToc();
    initAzadiSideTag();
  });
})();
