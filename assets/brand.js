/* Compatibility build for Safari 12+; no external runtime. */
(() => {
  (() => {
    "use strict";
    var _a, _b;
    function watchMedia(mq, fn) {
      if (mq.addEventListener) mq.addEventListener("change", fn);
      else if (mq.addListener) mq.addListener(fn);
    }
    const header = document.querySelector(".brand-header");
    const groups = [...document.querySelectorAll(".brand-menu-group")];
    const desktop = matchMedia("(min-width:961px)");
    groups.forEach((group) => {
      let timer;
      group.addEventListener("mouseenter", () => {
        if (desktop.matches) {
          clearTimeout(timer);
          groups.forEach((other) => {
            other.open = other === group;
          });
        }
      });
      group.addEventListener("mouseleave", () => {
        if (desktop.matches) timer = setTimeout(() => {
          if (!group.contains(document.activeElement)) group.open = false;
        }, 160);
      });
      group.addEventListener("focusout", (event) => {
        if (desktop.matches && !group.contains(event.relatedTarget)) group.open = false;
      });
      group.addEventListener("toggle", () => {
        if (group.open) groups.forEach((other) => {
          if (other !== group) other.open = false;
        });
      });
    });
    document.addEventListener("click", (event) => {
      if (!(header == null ? void 0 : header.contains(event.target))) groups.forEach((group) => {
        group.open = false;
      });
    });
    const nav = header == null ? void 0 : header.querySelector(".brand-nav");
    const toggle = header == null ? void 0 : header.querySelector(".v-mobile-toggle");
    let menuOpen = false;
    let frozenScroll = null;
    function lockPage(lock) {
      const body = document.body;
      if (lock && !frozenScroll) {
        frozenScroll = { y: window.scrollY || 0, position: body.style.position, top: body.style.top, left: body.style.left, right: body.style.right, width: body.style.width };
        body.style.position = "fixed";
        body.style.top = -frozenScroll.y + "px";
        body.style.left = "0";
        body.style.right = "0";
        body.style.width = "100%";
      } else if (!lock && frozenScroll) {
        const saved = frozenScroll;
        frozenScroll = null;
        ["position", "top", "left", "right", "width"].forEach((key) => {
          body.style[key] = saved[key];
        });
        const previous = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, saved.y);
        document.documentElement.style.scrollBehavior = previous;
      }
    }
    const backgrounds = [...document.querySelectorAll("main,footer,.brand-utility,.v-skip")];
    const originalInert = /* @__PURE__ */ new Map();
    const backdrop = document.createElement("div");
    backdrop.className = "brand-menu-backdrop";
    backdrop.hidden = true;
    backdrop.setAttribute("aria-hidden", "true");
    document.body.append(backdrop);
    const placeholder = document.createElement("div");
    placeholder.className = "brand-menu-placeholder";
    placeholder.hidden = true;
    placeholder.setAttribute("aria-hidden", "true");
    header == null ? void 0 : header.before(placeholder);
    function menuHeight() {
      if (!menuOpen || !nav) return;
      const viewport = window.visualViewport;
      const bottom = viewport ? viewport.height + viewport.offsetTop : window.innerHeight;
      nav.style.setProperty("--mobile-nav-height", Math.max(80, Math.floor(bottom - header.getBoundingClientRect().bottom - 24)) + "px");
    }
    function setMenu(open, restoreFocus = false) {
      if (!nav || !toggle) return;
      const opening = Boolean(open && !desktop.matches);
      if (opening && !menuOpen) {
        const rect = header.getBoundingClientRect(), style = getComputedStyle(header);
        placeholder.style.height = Math.ceil(rect.height + (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0)) + "px";
        placeholder.hidden = false;
      }
      menuOpen = opening;
      if (!menuOpen) placeholder.hidden = true;
      nav.classList.toggle("is-open", menuOpen);
      header.classList.toggle("menu-open", menuOpen);
      document.documentElement.classList.toggle("vita-menu-open", menuOpen);
      toggle.setAttribute("aria-expanded", String(menuOpen));
      toggle.setAttribute("aria-label", menuOpen ? "Fechar menu" : "Abrir menu");
      if (window.VitaIcons) toggle.innerHTML = window.VitaIcons[menuOpen ? "x" : "menu"];
      backdrop.hidden = !menuOpen;
      lockPage(menuOpen);
      if (menuOpen) {
        backgrounds.forEach((el) => {
          if (!originalInert.has(el)) originalInert.set(el, el.inert);
          el.inert = true;
        });
        nav.scrollTop = 0;
        menuHeight();
      } else {
        backgrounds.forEach((el) => {
          if (originalInert.has(el)) el.inert = originalInert.get(el);
        });
        originalInert.clear();
        groups.forEach((group) => {
          group.open = false;
        });
        nav.style.removeProperty("--mobile-nav-height");
        if (restoreFocus) toggle.focus({ preventScroll: true });
      }
    }
    toggle == null ? void 0 : toggle.addEventListener("click", () => setMenu(!menuOpen));
    backdrop.addEventListener("click", () => setMenu(false, true));
    document.addEventListener("click", (event) => {
      if (menuOpen && !header.contains(event.target)) setMenu(false);
    });
    nav == null ? void 0 : nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      if (menuOpen) setMenu(false);
    }));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenu(false, menuOpen);
        groups.forEach((group) => {
          group.open = false;
        });
        return;
      }
      if (!menuOpen || event.key !== "Tab") return;
      const focusable = [...header.querySelectorAll("a[href],button,summary")].filter((el) => {
        if (el.disabled || el.closest("[hidden]")) return false;
        const closed = el.closest(".brand-menu-group:not([open])");
        return !closed || el === closed.querySelector("summary");
      });
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last == null ? void 0 : last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first == null ? void 0 : first.focus();
      }
    });
    document.addEventListener("touchmove", (event) => {
      if (menuOpen && !nav.contains(event.target)) event.preventDefault();
    }, { passive: false });
    watchMedia(desktop, () => setMenu(false));
    window.addEventListener("resize", menuHeight, { passive: true });
    (_a = window.visualViewport) == null ? void 0 : _a.addEventListener("resize", menuHeight, { passive: true });
    (_b = window.visualViewport) == null ? void 0 : _b.addEventListener("scroll", menuHeight, { passive: true });
    function openTargetFold() {
      let id;
      try {
        id = decodeURIComponent(location.hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      const fold = target.matches(".brand-content-fold") ? target : target.closest(".brand-content-fold");
      if (fold) {
        fold.open = true;
        requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
      }
    }
    openTargetFold();
    window.addEventListener("hashchange", openTargetFold);
    document.querySelectorAll("[data-vita-map]").forEach((map) => {
      const select = map.querySelector("[data-city-select]");
      const canvas = map.querySelector(".brand-map-canvas");
      const pins = [...map.querySelectorAll("[data-city]")];
      let zoom = 1;
      function choose(key) {
        var _a2;
        const city = (_a2 = window.VITA_MUNICIPIOS) == null ? void 0 : _a2[key];
        if (!city) return;
        select.value = key;
        map.querySelector("[data-city-name]").textContent = city.name;
        map.querySelector("[data-city-address]").textContent = city.address;
        map.querySelector("[data-city-contact]").textContent = city.contact;
        pins.forEach((pin) => pin.setAttribute("aria-pressed", String(pin.dataset.city === key)));
        if (matchMedia("(max-width:760px)").matches) map.querySelector(".brand-city-result").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth", block: "nearest" });
      }
      pins.forEach((pin) => pin.addEventListener("click", () => choose(pin.dataset.city)));
      select.addEventListener("change", () => choose(select.value));
      map.querySelectorAll("[data-map-zoom]").forEach((button) => button.addEventListener("click", () => {
        zoom = button.dataset.mapZoom === "reset" ? 1 : Math.max(1, Math.min(2.5, zoom + (button.dataset.mapZoom === "in" ? 0.25 : -0.25)));
        const viewport = map.querySelector(".brand-map-viewport");
        canvas.style.width = zoom === 1 ? "100%" : viewport.clientWidth * zoom + "px";
        if (zoom === 1) viewport.scrollTo({ left: 0, top: 0 });
      }));
    });
  })();
})();
