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
  const nav = header?.querySelector('.brand-nav');
  const toggle = header?.querySelector('.v-mobile-toggle');
  let menuOpen = false;
  const backgrounds = [...document.querySelectorAll('main,footer,.brand-utility,.v-skip')];
  const originalInert = new Map();
  const backdrop = document.createElement('div');
  backdrop.className = 'brand-menu-backdrop'; backdrop.hidden = true;
  backdrop.setAttribute('aria-hidden','true'); document.body.append(backdrop);
  const placeholder=document.createElement('div');placeholder.className='brand-menu-placeholder';placeholder.hidden=true;placeholder.setAttribute('aria-hidden','true');header?.before(placeholder);
  function menuHeight() {
    if (!menuOpen || !nav) return;
    const viewport = window.visualViewport;
    const bottom = viewport ? viewport.height + viewport.offsetTop : window.innerHeight;
    nav.style.setProperty('--mobile-nav-height', Math.max(80,Math.floor(bottom-header.getBoundingClientRect().bottom-24))+'px');
  }
  function setMenu(open, restoreFocus = false) {
    if (!nav || !toggle) return;
    const opening=Boolean(open&&!desktop.matches);
    if(opening&&!menuOpen){const rect=header.getBoundingClientRect(),style=getComputedStyle(header);placeholder.style.height=Math.ceil(rect.height+(parseFloat(style.marginTop)||0)+(parseFloat(style.marginBottom)||0))+'px';placeholder.hidden=false;}
    menuOpen = opening;
    if(!menuOpen)placeholder.hidden=true;
    nav.classList.toggle('is-open',menuOpen);
    header.classList.toggle('menu-open',menuOpen);
    document.documentElement.classList.toggle('vita-menu-open',menuOpen);
    toggle.setAttribute('aria-expanded',String(menuOpen));
    toggle.setAttribute('aria-label',menuOpen?'Fechar menu':'Abrir menu');
    if (window.VitaIcons) toggle.innerHTML = window.VitaIcons[menuOpen?'x':'menu'];
    backdrop.hidden = !menuOpen;
    if (menuOpen) {
      backgrounds.forEach(el=>{if(!originalInert.has(el))originalInert.set(el,el.inert);el.inert=true;});
      nav.scrollTop=0;menuHeight();
    } else {
      backgrounds.forEach(el=>{if(originalInert.has(el))el.inert=originalInert.get(el);});originalInert.clear();
      groups.forEach(group=>{group.open=false;});
      nav.style.removeProperty('--mobile-nav-height');
      if(restoreFocus)toggle.focus({preventScroll:true});
    }
  }
  toggle?.addEventListener('click',()=>setMenu(!menuOpen));
  backdrop.addEventListener('click',()=>setMenu(false,true));
  document.addEventListener('click',event=>{if(menuOpen&&!header.contains(event.target))setMenu(false);});
  nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{if(menuOpen)setMenu(false);}));
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){setMenu(false,menuOpen);groups.forEach(group=>{group.open=false;});return;}
    if(!menuOpen||event.key!=='Tab')return;
    const focusable=[...header.querySelectorAll('a[href],button,summary')].filter(el=>{
      if(el.disabled||el.closest('[hidden]'))return false;
      const closed=el.closest('.brand-menu-group:not([open])');return !closed||el===closed.querySelector('summary');
    });
    const first=focusable[0],last=focusable.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
  });
  document.addEventListener('touchmove',event=>{if(menuOpen&&!nav.contains(event.target))event.preventDefault();},{passive:false});
  desktop.addEventListener('change',()=>setMenu(false));
  window.addEventListener('resize',menuHeight,{passive:true});
  window.visualViewport?.addEventListener('resize',menuHeight,{passive:true});
  window.visualViewport?.addEventListener('scroll',menuHeight,{passive:true});

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
      const viewport = map.querySelector('.brand-map-viewport'); canvas.style.width = zoom === 1 ? '100%' : viewport.clientWidth*zoom+'px';
      if (zoom === 1) viewport.scrollTo({left:0,top:0});
    }));
  });
})();
