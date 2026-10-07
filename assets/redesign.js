(() => {
  'use strict';
  const main = document.querySelector('main');
  const skip = document.querySelector('.v-skip');
  if (main && skip) { skip.href = '#' + main.id; main.tabIndex = -1; }
  const nav = document.querySelector('.v-nav');
  const toggle = document.querySelector('.v-mobile-toggle');
  function closeMenu() { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); }
  toggle.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); });
  document.addEventListener('click', e => { if (!e.target.closest('.v-header')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); document.querySelectorAll('.v-nav details[open]').forEach(d => d.open = false); } });
  nav.querySelectorAll('details').forEach(d => d.addEventListener('toggle', () => { if (d.open) nav.querySelectorAll('details').forEach(o => { if (o !== d) o.open = false; }); }));
  nav.querySelectorAll('a').forEach(a => { if (new URL(a.href).pathname === location.pathname) a.setAttribute('aria-current', 'page'); });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduced.matches) {
    document.documentElement.classList.add('reveal-enabled');
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); } }), { threshold: .07, rootMargin: '0px 0px 35px 0px' });
    reveals.forEach(el => observer.observe(el));
  }
  const hero = document.querySelector('.s-hero');
  if (hero) {
    const slides = [...hero.querySelectorAll('.s-slide')], dots = [...hero.querySelectorAll('[data-go-slide]')];
    const pause = hero.querySelector('.s-carousel-pause');
    let current = 0, paused = reduced.matches, timer;
    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((s, i) => { const active = i === current; s.classList.toggle('is-active', active); s.setAttribute('aria-hidden', String(!active)); s.inert = !active; const video = s.querySelector('video'); if (video) { if (active && !paused) video.play().catch(() => {}); else video.pause(); } });
      dots.forEach((d, i) => d.setAttribute('aria-pressed', String(i === current)));
      hero.querySelector('[data-slide-current]').textContent = String(current + 1).padStart(2, '0');
      hero.dataset.heroMode = current === 0 ? 'intro' : 'official';
    }
    function schedule() { clearInterval(timer); if (!paused) timer = setInterval(() => { if (!document.hidden && !hero.contains(document.activeElement) && !hero.matches(':hover')) show(current + 1); }, 8500); }
    function pauseLabel() { pause.setAttribute('aria-pressed', String(paused)); pause.setAttribute('aria-label', paused ? 'Retomar carrossel' : 'Pausar carrossel'); pause.innerHTML = window.VitaIcons[paused ? 'play' : 'pause']; }
    hero.querySelector('.s-carousel-next').addEventListener('click', () => { show(current + 1); schedule(); });
    hero.querySelector('.s-carousel-prev').addEventListener('click', () => { show(current - 1); schedule(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { show(i); schedule(); }));
    pause.addEventListener('click', () => { paused = !paused; pauseLabel(); show(current); schedule(); });
    hero.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); show(current + (e.key === 'ArrowRight' ? 1 : -1)); schedule(); } });
    let touch;
    hero.addEventListener('touchstart', e => { touch = [e.touches[0].clientX, e.touches[0].clientY]; }, { passive: true });
    hero.addEventListener('touchend', e => { if (!touch) return; const dx = e.changedTouches[0].clientX - touch[0], dy = e.changedTouches[0].clientY - touch[1]; if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy)) { show(current + (dx < 0 ? 1 : -1)); schedule(); } touch = null; }, { passive: true });
    reduced.addEventListener('change', () => { if (reduced.matches) { paused = true; pauseLabel(); schedule(); } });
    pauseLabel(); show(0); schedule();
  }
  document.querySelectorAll('.s-faq-item').forEach(d => d.addEventListener('toggle', () => { if (d.open) document.querySelectorAll('.s-faq-item').forEach(o => { if (o !== d) o.open = false; }); }));
  const billModel = document.querySelector('.s-invoice-model');
  if (billModel) {
    const mobile = matchMedia('(max-width:760px)');
    function modelLayout() { billModel.open = !mobile.matches; }
    modelLayout(); mobile.addEventListener('change', modelLayout);
    document.querySelectorAll('[data-invoice-field]').forEach(b => b.addEventListener('click', () => {
      document.querySelectorAll('[data-invoice-field]').forEach(o => o.classList.toggle('is-selected', o === b));
      const target = document.querySelector('[data-invoice-explanation="' + b.dataset.invoiceField + '"]');
      document.querySelectorAll('[data-invoice-explanation]').forEach(d => d.open = d === target);
      target.scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth', block: 'center' });
      target.querySelector('summary').focus({ preventScroll: true });
    }));
  }
  // The downloaded edition has no WordPress submission backend.
  document.querySelectorAll('.wpcf7-form').forEach(form => {
    const button = form.querySelector('[type="submit"]');
    if (button) button.remove();
    const note = document.createElement('p'); note.className = 'v-form-notice'; note.textContent = 'O envio da solicitação é realizado pelo formulário oficial de atendimento.';
    const link = document.createElement('a'); link.href = 'https://vitasertao.tribox.info/fale-conosco/'; link.textContent = 'Abrir formulário de atendimento'; link.className = 'v-button';
    form.append(note, link); form.addEventListener('submit', e => e.preventDefault());
  });
})();
