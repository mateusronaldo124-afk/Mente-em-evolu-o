
"use strict";


(function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("primaryNav");
  if (!toggle || !nav) return;

  const close = function () {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  
  nav.addEventListener("click", function (event) {
    if (event.target instanceof HTMLAnchorElement) close();
  });

  
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") close();
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 960) close();
  });
})();


(function initScrollUI() {
  const header = document.getElementById("siteHeader");
  const toTop = document.getElementById("toTop");
  let ticking = false;

  const update = function () {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-stuck", y > 20);
    if (toTop) toTop.classList.toggle("is-visible", y > 600);
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();


(function initSmoothScroll() {
  const HEADER_OFFSET = 84;

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      
      
      const target = document.getElementById(hash.slice(1));
      if (!target) return;

      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });
})();


(function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = Number(el.getAttribute("data-reveal-delay") || 0);
        window.setTimeout(function () {
          el.classList.add("is-visible");
        }, delay);
        observer.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach(function (el) {
    observer.observe(el);
  });
})();


/* Parallax / tilt no hero: move as glows e inclina o livro conforme o ponteiro */
(function initHeroParallax() {
  const hero = document.getElementById("hero");
  const glowA = hero ? hero.querySelector('.hero__glow--a') : null;
  const glowB = hero ? hero.querySelector('.hero__glow--b') : null;
  const book = hero ? hero.querySelector('.hero__book') : null;
  if (!hero) return;

  hero.addEventListener('mousemove', function (e) {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (glowA) {
      glowA.style.transform = `translate3d(${x * 30}px, ${y * 20}px, 0) scale(1.02)`;
    }
    if (glowB) {
      glowB.style.transform = `translate3d(${x * -26}px, ${y * -18}px, 0) scale(1.02)`;
    }
    if (book) {
      const rx = (y * 12).toFixed(2);
      const ry = (x * -18).toFixed(2);
      book.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  });

  hero.addEventListener('mouseleave', function () {
    if (glowA) glowA.style.transform = '';
    if (glowB) glowB.style.transform = '';
    if (book) book.style.transform = '';
  });
})();


(function initFaq() {
  const buttons = document.querySelectorAll(".faq__question");

  const collapse = function (button) {
    const panel = document.getElementById(button.getAttribute("aria-controls") || "");
    button.setAttribute("aria-expanded", "false");
    if (panel) panel.style.maxHeight = "0px";
  };

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const panel = document.getElementById(button.getAttribute("aria-controls") || "");
      const isOpen = button.getAttribute("aria-expanded") === "true";

      buttons.forEach(collapse); 

      if (!isOpen && panel) {
        button.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
})();


(function initRipple() {
  document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.width = size + "px";
      ripple.style.height = size + "px";
      ripple.style.left = event.clientX - rect.left - size / 2 + "px";
      ripple.style.top = event.clientY - rect.top - size / 2 + "px";
      btn.appendChild(ripple);
      window.setTimeout(function () {
        ripple.remove();
      }, 620);
    });
  });
})();


(function initCountdown() {
  const root = document.getElementById("countdown");
  if (!root) return;

  const cells = {
    hours: document.getElementById("cdHours"),
    minutes: document.getElementById("cdMinutes"),
    seconds: document.getElementById("cdSeconds"),
  };

  const STORAGE_KEY = "me_offer_deadline";
  const DURATION_MS = 24 * 60 * 60 * 1000;

  
  
  let deadline = Number(window.localStorage.getItem(STORAGE_KEY));
  if (!Number.isFinite(deadline) || deadline <= Date.now()) {
    deadline = Date.now() + DURATION_MS;
    try {
      window.localStorage.setItem(STORAGE_KEY, String(deadline));
    } catch (error) {
      
    }
  }

  const pad = function (value) {
    return String(value).padStart(2, "0");
  };

  // guarda últimos valores para animar mudança
  const prev = { hours: null, minutes: null, seconds: null };

  const tick = function () {
    const remaining = Math.max(0, deadline - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const updateCell = function (key, el, value) {
      if (!el) return;
      const text = pad(value);
      if (el.textContent !== text) {
        el.textContent = text;
        el.classList.add('countdown__num--pulse');
        el.addEventListener('animationend', function handler() {
          el.classList.remove('countdown__num--pulse');
          el.removeEventListener('animationend', handler);
        });
      }
      prev[key] = value;
    };

    updateCell('hours', cells.hours, hours);
    updateCell('minutes', cells.minutes, minutes);
    updateCell('seconds', cells.seconds, seconds);

    if (remaining === 0) window.clearInterval(timer);
  };

  const timer = window.setInterval(tick, 1000);
  tick();
})();


(function initForm() {
  const form = document.getElementById("checkoutForm");
  if (!form) return;

  const status = document.getElementById("formStatus");
  const fields = {
    name: document.getElementById("fieldName"),
    email: document.getElementById("fieldEmail"),
    phone: document.getElementById("fieldPhone"),
  };

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  const DIGITS_RE = /\D+/g;

  const setError = function (input, message) {
    if (!input) return;
    const errorEl = document.getElementById(input.id + "Error");
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (errorEl) errorEl.textContent = message; 
  };

  const validate = function (input) {
    if (!input) return true;
    const value = input.value.trim();

    if (input === fields.name) {
      if (value.length < 3) return setError(input, "Informe seu nome completo."), false;
      if (value.length > 80) return setError(input, "Máximo de 80 caracteres."), false;
    }

    if (input === fields.email) {
      if (value.length > 120) return setError(input, "E-mail muito longo."), false;
      if (!EMAIL_RE.test(value)) return setError(input, "Digite um e-mail válido."), false;
    }

    if (input === fields.phone) {
      const digits = value.replace(DIGITS_RE, "");
      if (digits.length < 10 || digits.length > 11) {
        return setError(input, "Informe DDD + número (10 ou 11 dígitos)."), false;
      }
    }

    setError(input, "");
    return true;
  };

  Object.keys(fields).forEach(function (key) {
    const input = fields[key];
    if (!input) return;
    input.addEventListener("blur", function () {
      validate(input);
    });
    input.addEventListener("input", function () {
      if (input.getAttribute("aria-invalid") === "true") validate(input);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const results = Object.keys(fields).map(function (key) {
      return validate(fields[key]);
    });
    const isValid = results.every(Boolean);

    if (!isValid) {
      if (status) status.textContent = "Revise os campos destacados para continuar.";
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
      return;
    }

    
    
    
    if (status) status.textContent = "Dados validados! Redirecionando para o pagamento seguro...";
    form.reset();
    Object.keys(fields).forEach(function (key) {
      setError(fields[key], "");
    });
  });
})();



