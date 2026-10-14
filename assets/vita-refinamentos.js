/* Interações dos ajustes de 14/10/2026. */
(() => {
  'use strict';
  const nav = document.querySelector('.brand-header .brand-nav');
  const normalizedPath = path => path.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
  const syncCurrent = () => {
    if (!nav) return;
    const links = [...nav.querySelectorAll('a[href]')];
    const groups = [...nav.querySelectorAll('.brand-menu-group')];
    links.forEach(link => link.removeAttribute('aria-current'));
    groups.forEach(group => group.classList.remove('is-current'));
    const candidates = links.filter(link => {
      const url = new URL(link.href, location.href);
      return url.origin === location.origin && normalizedPath(url.pathname) === normalizedPath(location.pathname);
    });
    const current = candidates.find(link => new URL(link.href, location.href).hash === location.hash)
      || candidates.find(link => !new URL(link.href, location.href).hash);
    if (current) {
      current.setAttribute('aria-current','page');
      current.closest('.brand-menu-group')?.classList.add('is-current');
    }
  };
  syncCurrent();
  window.addEventListener('hashchange', syncCurrent);

  document.querySelectorAll('[data-vita-faq]').forEach(root => {
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const panels = [...root.querySelectorAll('[role="tabpanel"]')];
    if (tabs.length !== 6 || panels.length !== 6) return;
    const activate = (index, focus = false, updateHash = false) => {
      const active = Math.max(0, Math.min(tabs.length - 1, index));
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === active));
        tab.tabIndex = i === active ? 0 : -1;
        panels[i].hidden = i !== active;
      });
      if (focus) tabs[active].focus({preventScroll:true});
      if (updateHash) {
        try { history.replaceState(null, '', '#' + panels[active].id); }
        catch { /* File previews also work without History API access. */ }
      }
    };
    const syncHash = () => {
      const index = panels.findIndex(panel => '#' + panel.id === location.hash);
      if (index >= 0) activate(index);
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(index, false, true));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { event.preventDefault(); activate(next, true, true); }
      });
    });
    root.querySelectorAll('.vs-faq').forEach(group => {
      group.querySelectorAll('details').forEach(item => item.addEventListener('toggle', () => {
        if (item.open) group.querySelectorAll('details').forEach(other => { if (other !== item) other.open = false; });
      }));
    });
    activate(0); syncHash();
    window.addEventListener('hashchange', syncHash);
  });

  // O mapa do site usa o clique e o teclado nativos de <details>/<summary>.
  // Passar o mouse não altera seu estado de abertura.
})();
