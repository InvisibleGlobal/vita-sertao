/* VITA App: informe os links das lojas somente neste arquivo. */
(function () {
  "use strict";
  const storeLinks = {
    android: "", // URL do VITA App na Google Play.
    ios: "" // URL do VITA App na App Store.
  };
  function applyLinks(links) {
    document.querySelectorAll("[data-vita-app]").forEach(function (element) {
      const raw = links[element.dataset.vitaApp];
      let target = null;
      try { if (raw) { const parsed = new URL(raw); if (parsed.protocol === "https:") target = parsed.href; } } catch (_) {}
      if (target) {
        element.href = target;
        element.target = "_blank";
        element.rel = "noopener noreferrer";
        element.removeAttribute("aria-disabled");
      } else {
        element.removeAttribute("href");
        element.setAttribute("aria-disabled", "true");
      }
    });
  }
  window.VitaApp = { setLinks: function (links) { Object.assign(storeLinks, links); applyLinks(storeLinks); } };
  applyLinks(Object.assign(storeLinks, window.VITA_APP_LINKS || {}));
})();

/* PDFs tarifários oficiais: informe uma URL geral ou uma URL específica por município.
 * Exemplo de caminho local depois de adicionar o arquivo: /assets/tarifas.pdf
 * Não use o PDF da fatura neste campo. */
window.VITA_TARIFAS_PDFS = Object.assign({geral:""},window.VITA_TARIFAS_PDFS || {});
