(() => {
  'use strict';
  const header = document.querySelector('.brand-header');
  const groups = [...document.querySelectorAll('.brand-menu-group')];
  const desktop = matchMedia('(min-width:961px)');
  groups.forEach(group => {
    let timer;
    group.addEventListener('mouseenter', () => { if (desktop.matches) { clearTimeout(timer); groups.forEach(other => { other.open = other === group; }); } });
    group.addEventListener('mouseleave', () => { if (desktop.matches) timer = setTimeout(() => { if (!group.contains(document.activeElement)) group.open = false; }, 160); });
    group.addEventListener('focusout', event => { if (desktop.matches && !group.contains(event.relatedTarget)) group.open = false; });
    group.addEventListener('toggle', () => { if (group.open) groups.forEach(other => { if (other !== group) other.open = false; }); });
  });
  document.addEventListener('click', event => { if (!header?.contains(event.target)) groups.forEach(group => { group.open = false; }); });
  desktop.addEventListener('change', () => { groups.forEach(group => { group.open = false; }); document.querySelector('.v-nav')?.classList.remove('is-open'); document.querySelector('.v-mobile-toggle')?.setAttribute('aria-expanded', 'false'); });
  function openTargetFold() {
    let id; try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id); if (!target) return;
    const fold = target.matches('.brand-content-fold') ? target : target.closest('.brand-content-fold');
    if (fold) { fold.open = true; requestAnimationFrame(() => target.scrollIntoView({block:'start'})); }
  }
  openTargetFold(); window.addEventListener('hashchange', openTargetFold);
  document.querySelectorAll('[data-vita-map]').forEach(map => {
    const select = map.querySelector('[data-city-select]'); const canvas = map.querySelector('.brand-map-canvas'); const pins = [...map.querySelectorAll('[data-city]')]; let zoom = 1;
    function choose(key) {
      const city = window.VITA_MUNICIPIOS?.[key]; if (!city) return; select.value = key;
      map.querySelector('[data-city-name]').textContent = city.name; map.querySelector('[data-city-address]').textContent = city.address; map.querySelector('[data-city-contact]').textContent = city.contact;
      pins.forEach(pin => pin.setAttribute('aria-pressed', String(pin.dataset.city === key)));
      if (matchMedia('(max-width:760px)').matches) map.querySelector('.brand-city-result').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'nearest'});
    }
    pins.forEach(pin => pin.addEventListener('click', () => choose(pin.dataset.city))); select.addEventListener('change', () => choose(select.value));
    map.querySelectorAll('[data-map-zoom]').forEach(button => button.addEventListener('click', () => {
      zoom = button.dataset.mapZoom === 'reset' ? 1 : Math.max(1,Math.min(2.5,zoom+(button.dataset.mapZoom==='in'?.25:-.25)));
      const viewport = map.querySelector('.brand-map-viewport'); canvas.style.width = Math.max(viewport.clientWidth,matchMedia('(max-width:760px)').matches?560:600)*zoom+'px';
      if (zoom === 1) viewport.scrollTo({left:0,top:0});
    }));
  });
})();
