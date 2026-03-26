/* ═══════════════════════════════════════════
   V10 — EDITORIAL LUXURY · Script (optimized)
   GSAP ScrollTrigger reveals + counters
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');

  // ── Nav scroll state ──
  const nav = document.querySelector('.nav');
  let lastScroll = 0;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 80);
    lastScroll = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile burger ──
  const burger = document.querySelector('.nav__burger');
  const links = document.querySelector('.nav__links');
  if (burger) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      links.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      // Trap focus in mobile menu when open
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    // Close menu on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        links.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    // Close menu on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        burger.classList.remove('open');
        links.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        burger.focus();
      }
    });
  }

  // ── GSAP ScrollTrigger reveals ──
  gsap.registerPlugin(ScrollTrigger);

  const reveals = document.querySelectorAll('[data-reveal]');
  reveals.forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: .9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
        delay: (i % 3) * .12,
        onComplete: () => el.classList.add('revealed'),
      }
    );
  });

  // ── Count-up numbers ──
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(el => {
    const target = +el.dataset.count;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].val);
          },
        });
      },
    });
  });

  // ── Hero subtle parallax ──
  const heroImg = document.querySelector('.hero__image img');
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // ── Fullbleed parallax ──
  const fullbleedImg = document.querySelector('.fullbleed img');
  if (fullbleedImg) {
    gsap.fromTo(fullbleedImg,
      { scale: 1.1 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.fullbleed',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }

  // ── Staggered villa card reveals ──
  const villaCards = document.querySelectorAll('.villa-card');
  villaCards.forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: .8,
        ease: 'power3.out',
        delay: i * .15,
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          once: true,
        },
      }
    );
  });

  // ── Lifestyle images stagger ──
  const lifestyleImgs = document.querySelectorAll('.lifestyle__img');
  lifestyleImgs.forEach((img, i) => {
    gsap.fromTo(img,
      { opacity: 0, y: 40, scale: .97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: .9,
        ease: 'power3.out',
        delay: i * .2,
        scrollTrigger: {
          trigger: img,
          start: 'top 90%',
          once: true,
        },
      }
    );
  });

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = nav.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ── Simple form validation ──
  const form = document.querySelector('.contact__form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.querySelector('input[name="name"]');
      const phone = form.querySelector('input[name="phone"]');
      if (name.value.trim() && phone.value.trim()) {
        const btn = form.querySelector('.btn');
        btn.textContent = 'Заявка отправлена!';
        btn.style.background = '#2a7a4b';
        btn.disabled = true;
        form.reset();
        setTimeout(() => {
          btn.textContent = 'Отправить заявку';
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }
    });
  }
});
