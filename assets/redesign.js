(() => {
  "use strict";
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
    let show = function(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((s, i) => {
        const active = i === current;
        s.classList.toggle("is-active", active);
        s.setAttribute("aria-hidden", String(!active));
        s.inert = !active;
        s.querySelectorAll("a,button,input,select,textarea").forEach((el) => {
          if (!el.hasAttribute("data-carousel-tab")) el.setAttribute("data-carousel-tab", el.getAttribute("tabindex") || "");
          if (active) {
            const saved = el.getAttribute("data-carousel-tab");
            if (saved) el.setAttribute("tabindex", saved);
            else el.removeAttribute("tabindex");
          } else el.setAttribute("tabindex", "-1");
        });
        const video = s.querySelector("video");
        if (video) {
          if (active && !paused) video.play().catch(() => {
          });
          else video.pause();
        }
      });
      dots.forEach((d, i) => d.setAttribute("aria-pressed", String(i === current)));
      hero.querySelector("[data-slide-current]").textContent = String(current + 1).padStart(2, "0");
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
