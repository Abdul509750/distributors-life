/**
 * Distribution Life — homepage interactions only.
 */
(function () {
  'use strict';

  const CONTACT_EMAIL = 'i240824@isb.nu.edu.pk';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initCopyEmail() {
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const copyEmailFeedback = document.getElementById('copy-email-feedback');
    if (!copyEmailBtn) return;

    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(CONTACT_EMAIL);
        if (copyEmailFeedback) copyEmailFeedback.textContent = 'Email copied to clipboard.';
      } catch {
        window.prompt('Copy this email address:', CONTACT_EMAIL);
        if (copyEmailFeedback) {
          copyEmailFeedback.textContent = 'Email shown — copy it from the dialog if needed.';
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

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        heroReveals.forEach((el) => el.classList.add('is-visible'));
      });
    });

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
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
      );
      scrollReveals.forEach((el) => observer.observe(el));
    } else {
      scrollReveals.forEach((el) => el.classList.add('is-visible'));
    }
  }

  function initHeroParallax() {
    const heroInner = document.getElementById('hero-inner');
    if (prefersReducedMotion || !heroInner) return;

    let ticking = false;
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const limit = window.innerHeight;
          if (y <= limit) {
            heroInner.style.transform = `translateY(${y * 0.3}px)`;
            heroInner.style.opacity = String(Math.max(0, 1 - y / (limit * 0.85)));
          }
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  function initHeaderShadow() {
    const header = document.getElementById('site-header');
    if (!header) return;

    window.addEventListener(
      'scroll',
      () => {
        header.classList.toggle('shadow-md', window.scrollY > 8);
      },
      { passive: true }
    );
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
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCopyEmail();
    initMobileNav();
    initScrollReveal();
    initHeroParallax();
    initHeaderShadow();
    initFaq();
  });
})();
