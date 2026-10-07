/* Compatibility build for Safari 12+; no external runtime. */
(() => {
  (() => {
    "use strict";
    var _a;
    function watchMedia(mq, fn) {
      if (mq.addEventListener) mq.addEventListener("change", fn);
      else if (mq.addListener) mq.addListener(fn);
    }
    const main = document.querySelector("main");
    const skip = document.querySelector(".v-skip");
    if (main && skip) {
      skip.href = "#" + main.id;
      main.tabIndex = -1;
    }
    const nav = document.querySelector(".v-nav");
    nav.querySelectorAll("a").forEach((a) => {
      if (new URL(a.href).pathname === location.pathname) a.setAttribute("aria-current", "page");
    });
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const reveals = document.querySelectorAll("[data-reveal]");
    if (typeof window.IntersectionObserver === "function" && !reduced.matches) {
      document.documentElement.classList.add("reveal-enabled");
      const observer = new IntersectionObserver((entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          observer.unobserve(e.target);
        }
      }), { threshold: 0.07, rootMargin: "0px 0px 35px 0px" });
      reveals.forEach((el) => observer.observe(el));
    }
    const hero = document.querySelector(".s-hero");
    if (hero) {
      let measureHero = function() {
        if (!mobileHero.matches) {
          hero.style.removeProperty("--mobile-hero-height");
          hero.style.removeProperty("--mobile-official-height");
          return;
        }
        const intro = hero.querySelector(".s-hero-inner");
        const introHeight = Math.max(600, Math.ceil(intro.scrollHeight) + 8);
        const landscape = hero.querySelector(".brand-landscape-copy");
        let officialHeight = Math.max(530, Math.ceil((landscape == null ? void 0 : landscape.scrollHeight) || 0) + 76);
        hero.querySelectorAll(".s-slide--official").forEach((slide) => {
          const art = slide.querySelector(".s-slide-art-link"), copy = slide.querySelector(".s-mobile-banner-copy");
          officialHeight = Math.max(officialHeight, Math.ceil(((art == null ? void 0 : art.getBoundingClientRect().height) || 0) + ((copy == null ? void 0 : copy.scrollHeight) || 0)) + 12);
        });
        hero.style.setProperty("--mobile-hero-height", introHeight + "px");
        hero.style.setProperty("--mobile-official-height", officialHeight + "px");
      }, scheduleMeasure = function() {
        cancelAnimationFrame(measureFrame);
        measureFrame = requestAnimationFrame(measureHero);
      }, show = function(index) {
        current = (index + slides.length) % slides.length;
        slides.forEach((s, i) => {
          const active = i === current;
          s.classList.toggle("is-active", active);
          s.setAttribute("aria-hidden", String(!active));
          s.inert = !active;
          const video = s.querySelector("video");
          if (video) {
            if (active && !paused) video.play().catch(() => {
            });
            else video.pause();
          }
        });
        dots.forEach((d, i) => d.setAttribute("aria-pressed", String(i === current)));
        hero.querySelector("[data-slide-current]").textContent = String(current + 1).padStart(2, "0");
        hero.dataset.heroMode = current === 0 ? "intro" : "official";
        scheduleMeasure();
      }, schedule = function() {
        clearInterval(timer);
        if (!paused) timer = setInterval(() => {
          if (!document.hidden && !document.documentElement.classList.contains("vita-menu-open") && !hero.contains(document.activeElement) && (!matchMedia("(hover:hover) and (pointer:fine)").matches || !hero.matches(":hover"))) show(current + 1);
        }, 8500);
      }, pauseLabel = function() {
        pause.setAttribute("aria-pressed", String(paused));
        pause.setAttribute("aria-label", paused ? "Retomar carrossel" : "Pausar carrossel");
        pause.innerHTML = window.VitaIcons[paused ? "play" : "pause"];
      };
      const slides = [...hero.querySelectorAll(".s-slide")], dots = [...hero.querySelectorAll("[data-go-slide]")];
      const pause = hero.querySelector(".s-carousel-pause");
      let current = 0, paused = reduced.matches, timer;
      const mobileHero = matchMedia("(max-width:760px)");
      let measureFrame;
      if (typeof window.ResizeObserver === "function") {
        const observer = new ResizeObserver(scheduleMeasure);
        hero.querySelectorAll(".s-hero-inner,.brand-landscape-copy,.s-mobile-banner-copy").forEach((el) => observer.observe(el));
      }
      window.addEventListener("resize", scheduleMeasure, { passive: true });
      watchMedia(mobileHero, scheduleMeasure);
      (_a = document.fonts) == null ? void 0 : _a.ready.then(scheduleMeasure);
      hero.querySelector(".s-carousel-next").addEventListener("click", () => {
        show(current + 1);
        schedule();
      });
      hero.querySelector(".s-carousel-prev").addEventListener("click", () => {
        show(current - 1);
        schedule();
      });
      dots.forEach((d, i) => d.addEventListener("click", () => {
        show(i);
        schedule();
      }));
      pause.addEventListener("click", () => {
        paused = !paused;
        pauseLabel();
        show(current);
        schedule();
      });
      hero.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          show(current + (e.key === "ArrowRight" ? 1 : -1));
          schedule();
        }
      });
      let touch;
      hero.addEventListener("touchstart", (e) => {
        touch = e.touches.length === 1 && !e.target.closest("a,button,summary,input,select,textarea") ? [e.touches[0].clientX, e.touches[0].clientY] : null;
      }, { passive: true });
      hero.addEventListener("touchend", (e) => {
        if (!touch || e.touches.length || !e.changedTouches.length) {
          touch = null;
          return;
        }
        const dx = e.changedTouches[0].clientX - touch[0], dy = e.changedTouches[0].clientY - touch[1];
        if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy)) {
          show(current + (dx < 0 ? 1 : -1));
          schedule();
        }
        touch = null;
      }, { passive: true });
      hero.addEventListener("touchcancel", () => {
        touch = null;
      }, { passive: true });
      watchMedia(reduced, () => {
        if (reduced.matches) {
          paused = true;
          pauseLabel();
          schedule();
        }
      });
      pauseLabel();
      show(0);
      schedule();
    }
    document.querySelectorAll(".s-faq-item").forEach((d) => d.addEventListener("toggle", () => {
      if (d.open) document.querySelectorAll(".s-faq-item").forEach((o) => {
        if (o !== d) o.open = false;
      });
    }));
    const billModel = document.querySelector(".s-invoice-model");
    if (billModel) {
      let modelLayout = function() {
        billModel.open = !mobile.matches;
      };
      const mobile = matchMedia("(max-width:760px)");
      modelLayout();
      watchMedia(mobile, modelLayout);
      document.querySelectorAll("[data-invoice-field]").forEach((b) => b.addEventListener("click", () => {
        document.querySelectorAll("[data-invoice-field]").forEach((o) => o.classList.toggle("is-selected", o === b));
        const target = document.querySelector('[data-invoice-explanation="' + b.dataset.invoiceField + '"]');
        document.querySelectorAll("[data-invoice-explanation]").forEach((d) => d.open = d === target);
        target.scrollIntoView({ behavior: reduced.matches ? "instant" : "smooth", block: "center" });
        target.querySelector("summary").focus({ preventScroll: true });
      }));
    }
    document.querySelectorAll(".wpcf7-form").forEach((form) => {
      const button = form.querySelector('[type="submit"]');
      if (button) button.remove();
      const note = document.createElement("p");
      note.className = "v-form-notice";
      note.textContent = "O envio da solicita\xE7\xE3o \xE9 realizado pelo formul\xE1rio oficial de atendimento.";
      const link = document.createElement("a");
      link.href = "https://vitasertao.tribox.info/fale-conosco/";
      link.textContent = "Abrir formul\xE1rio de atendimento";
      link.className = "v-button";
      form.append(note, link);
      form.addEventListener("submit", (e) => e.preventDefault());
    });
  })();
})();
