
(function () {
  'use strict';

  /* ================== 1) DADOS: edite aqui ================== */
  // ibge: código do município (7 dígitos). tipo: 'sede' | 'unidade' | 'atendimento'.
  // itens: os bullets do card. equipe (unidades) ou base (atendimento) vão no rodapé do card.
  var CIDADES = [{"ibge": "2611101", "nome": "Petrolina", "tipo": "sede", "clientes": 1, "itens": ["Sede administrativa: Av. Cardoso de Sá · São José · Petrolina/PE · CEP 56302-110", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2601102", "nome": "Araripina", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2612208", "nome": "Salgueiro", "tipo": "unidade", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2609907", "nome": "Ouricuri", "tipo": "unidade", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2612604", "nome": "Santa Maria da Boa Vista", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2603009", "nome": "Cabrobó", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2605301", "nome": "Exu", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2610400", "nome": "Parnamirim", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2608750", "nome": "Lagoa Grande", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2615607", "nome": "Trindade", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2602001", "nome": "Bodocó", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2607307", "nome": "Ipubi", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2613503", "nome": "São José do Belmonte", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2614006", "nome": "Serrita", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2605152", "nome": "Dormentes", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2600203", "nome": "Afrânio", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2609808", "nome": "Orocó", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2614303", "nome": "Moreilândia", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2612455", "nome": "Santa Cruz", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2612554", "nome": "Santa Filomena", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2616100", "nome": "Verdejante", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2604304", "nome": "Cedro", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2615201", "nome": "Terra Nova", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}, {"ibge": "2606309", "nome": "Granito", "tipo": "atendimento", "clientes": 1, "itens": ["Endereço da unidade em atualização. Consulte os canais oficiais antes de se deslocar.", "Telefone e WhatsApp: consulte os canais oficiais de atendimento."]}];

  var TIPOS = {
    sede:        { rotulo: 'Sede',                 grupo: 'a' },
    unidade:     { rotulo: 'Polo operacional',      grupo: 'a' },
    atendimento: { rotulo: 'Município da concessão', grupo: 'b' }
  };
  var GRUPOS = { a: 'Presença operacional', b: 'Área de concessão' };

  // Nomes no mapa: [texto, longitude, latitude]
  var ESTADOS = [['Bahia', -39.4, -9.35], ['Piauí', -41.25, -7.9], ['Ceará', -39.6, -7.18], ['Paraíba', -38.35, -7.45]];
  var NOME_RIO = { texto: 'Rio São Francisco', lon: -38.75 };   // o nome acompanha o rio perto desta longitude
  var NOME_LAGO = { texto: 'Lago de Sobradinho', lon: -41.28, lat: -9.63 };

  var TEMA_INICIAL = 'claro';              // 'auto' (segue o aparelho), 'escuro' ou 'claro'
  var MOSTRAR_SELETOR_DE_TEMA = false;

  // Mapa de fundo: OpenStreetMap (sem chave, crédito obrigatório). No visual escuro ele é escurecido por CSS.
  // Imagens externas não carregam dentro do preview do Claude; no site o fundo aparece.
  var MAPA_BASE = {
    url: '',
    atribuicao: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
    // Alternativa da CARTO (dados do OSM; chave grátis em carto.com/basemaps), clara e escura:
    // url: 'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=SUA_CHAVE',
    // atribuicao: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
  };

  /* ================== 2) Montagem ================== */
  var docEl;
  var root = document.getElementById('mapa-atuacao');
  docEl = root;
  var $ = function (s) { return root.querySelector(s); };
  var viewEl = $('.ma-view'), mapEl = $('#ma-map'), stageEl = $('.ma-stage'), listEl = $('.ma-list');
  var cardEl = $('.ma-card'), leaderEl = $('.ma-leader'), hintEl = $('.ma-hint');
  var ctrlEl = $('.ma-ctrl');
  var mqDesk = window.matchMedia('(min-width: 960px)');
  var mqTouch = window.matchMedia('(hover: none) and (pointer: coarse)');
  var mqCalm = window.matchMedia('(prefers-reduced-motion: reduce)');
  var nf = new Intl.NumberFormat('pt-BR');
  var pf = new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 1 });
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  var iconSvg = function (k) { return window.VitaIcons[{loja:'store',rota:'wrench',arrow:'arrow-right',diagonal:'arrow-up-right'}[k] || k]; };
  root.querySelectorAll('[data-icon]').forEach(function (el) { el.innerHTML = iconSvg(el.getAttribute('data-icon')); });

  // Tema: claro/escuro. 'auto' segue o aparelho (e o tema do visualizador do Claude).
  if (TEMA_INICIAL === 'escuro' || TEMA_INICIAL === 'claro') docEl.setAttribute('data-ma-tema', TEMA_INICIAL);
  var temaBox = $('.ma-tema');
  if (!MOSTRAR_SELETOR_DE_TEMA) temaBox.hidden = true;
  var css = getComputedStyle(root);
  var tok = function (n) { return css.getPropertyValue(n).trim(); };
  var scheme = function () { return tok('--ma-scheme') === 'claro' ? 'claro' : 'escuro'; };

  var hex = function (h) { h = h.replace('#', ''); if (h.length === 3) h = h.replace(/./g, '$&$&'); var n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
  var toHex = function (c) { return '#' + c.map(function (v) { return Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0'); }).join(''); };
  var mix = function (a, b, t) { var A = hex(a), B = hex(b); return toHex(A.map(function (v, i) { return v + (B[i] - v) * t; })); };
  var lum = function (h) { var c = hex(h).map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };

  var byId = new Map(), grupos = { a: [], b: [] }, total = 0;
  CIDADES.forEach(function (c) {
    c.id = String(c.ibge); c.g = (TIPOS[c.tipo] || TIPOS.atendimento).grupo;
    grupos[c.g].push(c); byId.set(c.id, c); total += c.clientes;
  });
  var logs = CIDADES.map(function (c) { return Math.log(Math.max(1, c.clientes)); });
  var lo = Math.min.apply(null, logs), hi = Math.max.apply(null, logs);
  CIDADES.forEach(function (c) { c.t = c.g === 'a' ? 0.85 : 0.5; });
  function paintCities() {
    var a = tok('--ma-fill-lo'), b = tok('--ma-fill-hi'), hot = tok('--ma-fill-hot'), navy = tok('--ma-navy');
    CIDADES.forEach(function (c) {
      c.color = mix(a, b, c.t);
      c.hot = hot;
      c.ink = lum(c.color) > 0.42 ? navy : '#ffffff';
      if (c.chip) { c.chip.style.setProperty('--c', c.color); c.chip.style.setProperty('--ci', c.ink); }
    });
  }
  paintCities();

  // Cabeçalho
  var setTxt = function (k, v) { var el = root.querySelector('[data-ma="' + k + '"]'); if (el) el.textContent = v; };
  setTxt('total-cidades', CIDADES.length);
  setTxt('n-a', grupos.a.length);
  setTxt('n-b', grupos.b.length);
  setTxt('clientes', nf.format(total));
  if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) setTxt('mod', '⌘');

  // Lista
  ['a', 'b'].forEach(function (k) {
    var g = grupos[k].slice().sort(function (x, y) { return x.nome.localeCompare(y.nome, 'pt-BR'); });
    if (!g.length) return;
    var sec = document.createElement('section');
    sec.innerHTML = '<h2 class="ma-gh"><span class="ma-ic ' + k + '">' + iconSvg(k === 'a' ? 'loja' : 'rota') + '</span>' + GRUPOS[k] + '<span class="n">' + g.length + '</span></h2><ul class="ma-chips"></ul>';
    var ul = sec.querySelector('ul');
    g.forEach(function (c) {
      var li = document.createElement('li');
      li.innerHTML = '<button type="button" class="ma-chip" aria-pressed="false" aria-label="' + esc(c.nome + ', ' + TIPOS[c.tipo].rotulo) + '"><span class="nm">' + esc(c.nome) + '</span><span class="vl" aria-hidden="true">' + iconSvg('diagonal') + '</span></button>';
      c.chip = li.firstChild;
      c.chip.style.setProperty('--c', c.color); c.chip.style.setProperty('--ci', c.ink);
      c.chip.addEventListener('mouseenter', function () { if (!mqTouch.matches) setHover(c.id, 'list'); });
      c.chip.addEventListener('mouseleave', function () { clearHover(c.id); });
      c.chip.addEventListener('focus', function () { if (!mqTouch.matches) setHover(c.id, 'list'); });
      c.chip.addEventListener('blur', function () { clearHover(c.id); });
      c.chip.addEventListener('click', function () { togglePin(c.id, 'list'); });
      ul.appendChild(li);
    });
    listEl.appendChild(sec);
  });

  // Card
  var cardName = $('.ma-card-name'), cardSub = $('.ma-card-sub'), cardBadge = $('.ma-badge');
  var cardKpi = $('.ma-card-kpi strong'), cardLs = $('.ma-card-ls'), cardFt = $('.ma-card-ft');
  function fillCard(c) {
    cardBadge.textContent = c.uf || 'PE';
    cardName.textContent = c.nome;
    cardSub.innerHTML = '<span class="ma-ic ' + c.g + '">' + iconSvg(c.g === 'a' ? 'loja' : 'rota') + '</span>' + esc(TIPOS[c.tipo].rotulo);
    cardKpi.textContent = '';
    cardLs.innerHTML = c.itens.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
    cardFt.innerHTML = '<a class="ma-contact-link" href="fale-conosco/index.html">Consultar atendimento ' + iconSvg('arrow') + '</a>';
    cardEl.classList.remove('is-empty');
  }

  /* ================== 3) Estado: hover, fixar, ativar ================== */
  var hoverId = null, pinnedId = null, activeId = null, source = 'map', offTimer = 0;
  function setHover(id, src) { clearTimeout(offTimer); hoverId = id; source = src; render(); }
  function clearHover(id) {
    if (hoverId !== id) return;
    clearTimeout(offTimer);
    offTimer = setTimeout(function () { hoverId = null; render(); }, 90);
  }
  function togglePin(id, src) {
    clearTimeout(offTimer);
    if (pinnedId === id && !mqTouch.matches && src === 'map') { render(); return; }
    pinnedId = (pinnedId === id && mqTouch.matches) ? null : id;
    if (mqTouch.matches) hoverId = null;
    source = src; render();
    if (!mqDesk.matches && pinnedId && src === 'list') {
      var r = viewEl.getBoundingClientRect();
      if (r.bottom < 80 || r.top > window.innerHeight - 120) viewEl.scrollIntoView({ block: 'start', behavior: mqCalm.matches ? 'auto' : 'smooth' });
    }
  }
  function unpin() { pinnedId = null; hoverId = null; render(); }

  var api = null;
  function render() {
    var next = hoverId || pinnedId || null;
    if (next !== activeId) {
      if (activeId) deactivate(byId.get(activeId));
      activeId = next;
      if (activeId) activate(byId.get(activeId));
      root.classList.toggle('ma-has-active', !!activeId);
    }
    cardEl.classList.toggle('is-pinned', !!activeId && activeId === pinnedId);
    if (!activeId) hideCard();
    if (api) { api.placeCard(); api.drawLeader(); }
  }
  function activate(c) {
    if (!c) return;
    fillCard(c);
    if (c.chip) { c.chip.classList.add('is-on'); c.chip.setAttribute('aria-pressed','true'); if (source === 'map' && mqDesk.matches) keepInList(c.chip); }
    if (api) api.highlight(c, true);
    showCard();
  }
  function deactivate(c) {
    if (!c) return;
    if (c.chip) { c.chip.classList.remove('is-on'); c.chip.setAttribute('aria-pressed','false'); }
    if (api) api.highlight(c, false);
  }
  function keepInList(chip) {
    var lr = listEl.getBoundingClientRect(), cr = chip.getBoundingClientRect();
    if (cr.top < lr.top + 8) listEl.scrollTop -= (lr.top + 8 - cr.top);
    else if (cr.bottom > lr.bottom - 8) listEl.scrollTop += (cr.bottom - lr.bottom + 8);
  }
  function showCard() {
    if (!mqDesk.matches) { cardEl.classList.add('is-on'); return; }
    if (!cardEl.classList.contains('is-on')) {
      cardEl.classList.add('no-anim');
      if (api) api.placeCard();
      void cardEl.offsetWidth;
      cardEl.classList.remove('no-anim');
      cardEl.classList.add('is-on');
    }
  }
  function hideCard() {
    cardEl.classList.remove('is-on', 'is-pinned');
    if (!mqDesk.matches) cardEl.classList.add('is-empty');
  }
  $('.ma-card-x').addEventListener('click', unpin);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && (pinnedId || hoverId)) unpin(); });

  /* ================== 4) Mapa ================== */
  function syncTemaButtons() {
    var s = scheme();
    temaBox.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-tema') === s)); });
  }
  syncTemaButtons();
  if (!window.L || !window.topojson) {
    mapEl.innerHTML = '<p class="ma-err">Não foi possível abrir o mapa. Consulte os municípios na lista abaixo.</p>';
    $('.ma-ctrl').hidden = true;
    return;
  }

  var topo = JSON.parse(document.getElementById('ma-geo').textContent);
  var agua = JSON.parse(document.getElementById('ma-agua').textContent);
  var obj = topo.objects.mun;
  var fc = topojson.feature(topo, obj);
  var isServed = function (p) { return p.s === 1 && byId.has(String(p.i)); };
  var fade = function (p) { return isServed(p) ? 1 : (p.f == null ? 1 : p.f); };
  var servedF = [], ctxF = [];
  fc.features.forEach(function (f) { (isServed(f.properties) ? servedF : ctxF).push(f); });
  CIDADES.forEach(function (c) { if (!servedF.some(function (f) { return String(f.properties.i) === c.id; })) console.warn('[mapa] Sem contorno para', c.nome, c.id); });

  var map = L.map(mapEl, {
    zoomControl: false, attributionControl: false, scrollWheelZoom: false, boxZoom: false, keyboard: true,
    dragging: !mqTouch.matches, zoomSnap: 0.25, zoomDelta: 0.5, maxZoom: 12,
    zoomAnimation: !mqCalm.matches, fadeAnimation: !mqCalm.matches
  });

  [['ctx', 300], ['lake', 310], ['srv', 320], ['mesh', 330], ['states', 335], ['river', 338], ['hl', 340], ['stlbl', 345], ['lbl', 450]].forEach(function (p) {
    var el = map.createPane(p[0]); el.style.zIndex = p[1];
    if (p[0] !== 'srv') el.style.pointerEvents = 'none';
  });

  // Enquadramento inicial: as 24 cidades juntas, sem ficar embaixo da lista.
  var servedBounds = L.geoJSON({ type: 'FeatureCollection', features: servedF }).getBounds();
  var userMoved = false;
  function listGap() { return mqDesk.matches ? listEl.offsetWidth + 24 : 0; }
  function fitAll(animate) {
    var d = mqDesk.matches, pad = d ? 40 : 10;
    var tl = L.point(pad + (d ? 40 : 0), pad + (d ? 26 : 44)), br = L.point(pad + listGap(), pad + (d ? 14 : 12));
    var z = map.getBoundsZoom(servedBounds, false, tl.add(br));
    map.setMinZoom(Math.max(4, Math.floor((z - 1.5) * 4) / 4));
    map.fitBounds(servedBounds, { paddingTopLeft: tl, paddingBottomRight: br, animate: !!animate && !mqCalm.matches });
  }
  fitAll(false);

  var ctxAlpha = 0.92, hasBase = false;
  var ctxLayer = L.geoJSON({ type: 'FeatureCollection', features: ctxF }, { pane: 'ctx', interactive: false, style: ctxStyle }).addTo(map);
  function ctxStyle(f) { return { stroke: false, fillColor: tok('--ma-ctx'), fillOpacity: ctxAlpha * fade(f.properties) }; }

  var lakeLayer = L.geoJSON(agua.lagos, { pane: 'lake', interactive: false, style: function () { return { stroke: false, fillColor: tok('--ma-water'), fillOpacity: 1 }; } }).addTo(map);
  var riverLayer = L.geoJSON(agua.rios, { pane: 'river', interactive: false, style: function () { return { color: tok('--ma-river'), weight: 2.4, opacity: 1, lineCap: 'round', lineJoin: 'round' }; } }).addTo(map);

  var srvLayer = L.geoJSON({ type: 'FeatureCollection', features: servedF }, {
    pane: 'srv',
    style: function (f) { return { stroke: false, fillColor: byId.get(String(f.properties.i)).color, fillOpacity: 1 }; },
    onEachFeature: function (f, layer) {
      var c = byId.get(String(f.properties.i));
      c.layer = layer; c.feature = f; c.uf = f.properties.u;
      layer.on('mouseover', function () { if (!mqTouch.matches) setHover(c.id, 'map'); });
      layer.on('mouseout', function () { clearHover(c.id); });
      layer.on('click', function (e) { L.DomEvent.stopPropagation(e); togglePin(c.id, 'map'); });
    }
  }).addTo(map);

  // Bordas: municipais e divisas estaduais, esmaecendo junto com a malha.
  var level = function (v) { return v >= 0.875 ? 0 : v >= 0.625 ? 1 : v >= 0.4 ? 2 : v >= 0.22 ? 3 : 4; };
  var LV = [1, 0.74, 0.5, 0.3, 0.14];
  var meshLayers = [], stateLayers = [];
  LV.forEach(function (op, k) {
    var m = topojson.mesh(topo, obj, function (a, b) { return a !== b && level(Math.min(fade(a.properties), fade(b.properties))) === k; });
    if (m.coordinates.length) meshLayers.push(L.geoJSON(m, { pane: 'mesh', interactive: false, style: { color: tok('--ma-mesh'), weight: 0.9, opacity: op } }).addTo(map));
    var s = topojson.mesh(topo, obj, function (a, b) { return a !== b && a.properties.u !== b.properties.u && level(Math.min(fade(a.properties), fade(b.properties))) === k; });
    if (s.coordinates.length) stateLayers.push(L.geoJSON(s, { pane: 'states', interactive: false, style: { color: tok('--ma-state'), weight: 1.9, opacity: op } }).addTo(map));
  });

  // Contorno da cidade em destaque
  var hlHalo = L.geoJSON(null, { pane: 'hl', interactive: false, style: function () { return { color: tok('--ma-hl-halo'), opacity: 0.55, weight: 6, fill: false, lineJoin: 'round' }; } }).addTo(map);
  var hlLine = L.geoJSON(null, { pane: 'hl', interactive: false, style: function () { return { color: tok('--ma-hl'), opacity: 1, weight: 2.3, fill: false, lineJoin: 'round' }; } }).addTo(map);

  // Pinos na sede de cada cidade + nome em pílula
  var pinSvg = function () {
    return window.VitaIcons['map-pin'].replace('<path ', '<path class="b" ').replace('<circle ', '<circle class="i" ');
  };
  CIDADES.forEach(function (c) {
    if (!c.layer) return;
    var p = c.feature.properties;
    c.seat = (p.sx != null) ? L.latLng(p.sy, p.sx) : (p.lx != null ? L.latLng(p.ly, p.lx) : c.layer.getBounds().getCenter());
    var html = '<span class="ma-pin ' + c.g + '">' + pinSvg(c.g === 'a' ? 'loja' : 'rota') + '</span><span class="ma-pill" data-side="r">' + esc(c.nome) + '</span>';
    c.mk = L.marker(c.seat, { pane: 'lbl', interactive: true, keyboard: true, title: c.nome, alt: c.nome, icon: L.divIcon({ className: 'ma-mk', html: html, iconSize: null }) }).addTo(map);
    var el = c.mk.getElement();
    c.mkEl = el; c.pinEl = el.querySelector('.ma-pin'); c.pillEl = el.querySelector('.ma-pill');
    c.mk.on('mouseover', function () { if (!mqTouch.matches) setHover(c.id, 'map'); });
    c.mk.on('mouseout', function () { clearHover(c.id); });
    c.mk.on('click', function (e) { L.DomEvent.stopPropagation(e); togglePin(c.id, 'map'); });
  });

  // Nomes dos estados, do rio e do lago
  var mkText = function (ll, cls, text) {
    var m = L.marker(ll, { pane: 'stlbl', interactive: false, keyboard: false, icon: L.divIcon({ className: 'ma-mk', html: '<span class="' + cls + '">' + esc(text) + '</span>', iconSize: null }) }).addTo(map);
    return m.getElement().firstElementChild;
  };
  var stLabels = ESTADOS.map(function (s) { return mkText([s[2], s[1]], 'ma-st', s[0]); });
  var waterLabels = [];
  (function () {
    // nome do rio: no trecho mais perto da longitude escolhida, inclinado como o rio, do lado de fora da área
    var best = null;
    (agua.rios.features || []).forEach(function (f) {
      var lines = f.geometry.type === 'LineString' ? [f.geometry.coordinates] : f.geometry.coordinates;
      lines.forEach(function (ln) {
        for (var i = 0; i < ln.length - 1; i++) {
          var mid = (ln[i][0] + ln[i + 1][0]) / 2, d = Math.abs(mid - NOME_RIO.lon);
          if (!best || d < best.d) best = { d: d, a: ln[i], b: ln[i + 1] };
        }
      });
    });
    if (best) {
      var ll = L.latLng((best.a[1] + best.b[1]) / 2, (best.a[0] + best.b[0]) / 2);
      var pa = map.project([best.a[1], best.a[0]], 10), pb = map.project([best.b[1], best.b[0]], 10);
      var ang = Math.atan2(pb.y - pa.y, pb.x - pa.x) * 180 / Math.PI;
      if (ang > 90) ang -= 180; if (ang < -90) ang += 180;
      var el = mkText(ll, 'ma-wl', NOME_RIO.texto);
      el.style.transform = 'translate(-50%,-50%) rotate(' + ang.toFixed(1) + 'deg) translateY(13px)';
      waterLabels.push(el);
    }
    if (NOME_LAGO) {
      var el2 = mkText([NOME_LAGO.lat, NOME_LAGO.lon], 'ma-wl', NOME_LAGO.texto);
      el2.style.transform = 'translate(-50%,-50%)';
      waterLabels.push(el2);
    }
  })();

  // Limites de navegação
  map.setMaxBounds(L.latLngBounds(ctxLayer.getBounds().getSouthWest(), ctxLayer.getBounds().getNorthEast()).pad(0.15));

  // Nomes sem sobreposição: os pinos ficam sempre; o nome vai à direita, senão à esquerda, senão some (volta no hover).
  function layoutLabels() {
    var vr = viewEl.getBoundingClientRect(), lr = mqDesk.matches ? listEl.getBoundingClientRect() : null;
    var box = function (r, p) { return { l: r.left - p, t: r.top - p, r: r.right + p, b: r.bottom + p }; };
    var out = function (b) { return b.l < vr.left + 4 || b.r > vr.right - 4 || b.t < vr.top + 4 || b.b > vr.bottom - 4 || (lr && b.r > lr.left - 6 && b.b > lr.top && b.t < lr.bottom); };
    var placed = [];
    var hit = function (b) { return placed.some(function (p) { return b.l < p.r && b.r > p.l && b.t < p.b && b.b > p.t; }); };
    var cs = CIDADES.filter(function (c) { return c.mk; });
    cs.forEach(function (c) { placed.push(box(c.pinEl.getBoundingClientRect(), 1)); });
    cs.slice().sort(function (x, y) { return (y.g === 'a') - (x.g === 'a') || y.clientes - x.clientes; }).forEach(function (c) {
      var el = c.pillEl, ok = false;
      ['r', 'l', 'b', 't'].some(function (side) {
        el.setAttribute('data-side', side); el.classList.remove('is-off');
        var b = box(el.getBoundingClientRect(), 2);
        if (!out(b) && !hit(b)) { placed.push(b); ok = true; c.side = side; }
        return ok;
      });
      if (!ok) { el.classList.add('is-off'); el.setAttribute('data-side', c.side || 'r'); }
    });
    stLabels.concat(waterLabels).forEach(function (el) {
      el.classList.remove('is-off');
      var b = box(el.getBoundingClientRect(), 4);
      var bad = out(b) || hit(b);
      el.classList.toggle('is-off', bad);
      if (!bad) placed.push(b);
    });
  }
  function updateListMask() {
    listEl.classList.toggle('can-scroll', listEl.scrollHeight > listEl.clientHeight + 2);
    listEl.classList.toggle('at-end', listEl.scrollTop + listEl.clientHeight >= listEl.scrollHeight - 2);
  }

  function highlight(c, on) {
    srvLayer.eachLayer(function (l) {
      var cc = byId.get(String(l.feature.properties.i));
      if (on) l.setStyle(cc === c ? { fillColor: c.hot, fillOpacity: 1 } : { fillColor: cc.color, fillOpacity: 0.6 });
      else l.setStyle({ fillColor: cc.color, fillOpacity: 1 });
    });
    hlHalo.clearLayers(); hlLine.clearLayers();
    if (on) { hlHalo.addData(c.feature); hlLine.addData(c.feature); }
    if (c.mk) {
      c.mkEl.classList.toggle('is-active', on);
      c.mk.setZIndexOffset(on ? 10000 : 0);
      c.pillEl.setAttribute('data-side', c.side || 'r');
    }
  }

  // Card ao lado da cidade, com a seta apontando para o pino; nunca embaixo da lista.
  function placeCard() {
    if (!mqDesk.matches || !activeId) return;
    var c = byId.get(activeId); if (!c || !c.layer) return;
    var W = viewEl.clientWidth, H = viewEl.clientHeight, right = W - listGap();
    var b = c.layer.getBounds();
    var p1 = map.latLngToContainerPoint(b.getNorthWest()), p2 = map.latLngToContainerPoint(b.getSouthEast());
    var pin = map.latLngToContainerPoint(c.seat); pin.y -= 18;
    var vr = viewEl.getBoundingClientRect(), pr = c.pillEl.getBoundingClientRect();
    p1 = L.point(Math.min(p1.x, pr.left - vr.left), Math.min(p1.y, pr.top - vr.top));
    p2 = L.point(Math.max(p2.x, pr.right - vr.left), Math.max(p2.y, pr.bottom - vr.top));
    var mid = map.latLngToContainerPoint(servedBounds.getCenter());
    var cw = cardEl.offsetWidth, ch = cardEl.offsetHeight, g = 18, m = 12;
    var preferLeft = source === 'list' || (p1.x + p2.x) / 2 <= mid.x;
    var fitsL = p1.x - g - cw >= m, fitsR = p2.x + g + cw <= right - m;
    var x, y, tail;
    if (preferLeft ? fitsL : !fitsR && fitsL) { x = p1.x - g - cw; y = pin.y - ch / 2; tail = 'r'; }
    else if (fitsR) { x = p2.x + g; y = pin.y - ch / 2; tail = 'l'; }
    else if (p1.y - g - ch >= m) { x = pin.x - cw / 2; y = p1.y - g - ch; tail = 'b'; }
    else if (p2.y + g + ch <= H - m) { x = pin.x - cw / 2; y = p2.y + g; tail = 't'; }
    else { x = m + 46; y = m; tail = 'n'; }
    x = clamp(x, m, Math.max(m, right - cw - m)); y = clamp(y, m, Math.max(m, H - ch - m));
    var kr = ctrlEl.getBoundingClientRect(), kx = kr.right - vr.left + 10, ky = kr.bottom - vr.top + 10;
    if (kr.width && x < kx && y < ky) { if (right - cw - m >= kx) x = kx; else y = Math.min(ky, Math.max(m, H - ch - m)); }
    var tp = (tail === 'l' || tail === 'r') ? pin.y - y : pin.x - x;
    var lim = (tail === 'l' || tail === 'r') ? ch : cw;
    if (tp < 18 || tp > lim - 18) tail = 'n';
    cardEl.setAttribute('data-tail', tail);
    cardEl.style.setProperty('--tp', Math.round(clamp(tp, 18, lim - 18)) + 'px');
    cardEl.style.setProperty('--x', Math.round(x) + 'px');
    cardEl.style.setProperty('--y', Math.round(y) + 'px');
  }

  // Linha da lista até o pino (desktop, quando o destaque vem da lista)
  var lPath = leaderEl.querySelector('path'), lDot = leaderEl.querySelector('circle');
  function drawLeader() {
    var c = activeId && byId.get(activeId);
    if (!c || !c.chip || !c.pillEl || source !== 'list' || !mqDesk.matches) { leaderEl.classList.remove('is-on'); return; }
    var sr = stageEl.getBoundingClientRect(), cr = c.chip.getBoundingClientRect(), lr = listEl.getBoundingClientRect(), br = c.pillEl.getBoundingClientRect(), pr = c.pinEl.getBoundingClientRect();
    if (cr.bottom < lr.top + 4 || cr.top > lr.bottom - 4) { leaderEl.classList.remove('is-on'); return; }
    var x1 = cr.left - sr.left, y1 = cr.top + cr.height / 2 - sr.top;
    var x2 = Math.max(br.right, pr.right) - sr.left + 6, y2 = pr.top + pr.height * 0.4 - sr.top;
    lPath.setAttribute('d', 'M' + x1 + ',' + y1 + 'H' + (x1 - 14) + 'L' + x2 + ',' + y2);
    lDot.setAttribute('cx', x2); lDot.setAttribute('cy', y2);
    leaderEl.classList.add('is-on');
  }

  // Tema: recolore camadas do mapa a partir dos tokens
  var tiles = null;
  function applyTheme() {
    syncTemaButtons();
    paintCities();
    ctxLayer.setStyle(ctxStyle);
    lakeLayer.setStyle({ fillColor: tok('--ma-water') });
    riverLayer.setStyle({ color: tok('--ma-river') });
    meshLayers.forEach(function (l) { l.setStyle({ color: tok('--ma-mesh') }); });
    stateLayers.forEach(function (l) { l.setStyle({ color: tok('--ma-state') }); });
    hlHalo.setStyle({ color: tok('--ma-hl-halo') }); hlLine.setStyle({ color: tok('--ma-hl') });
    var act = activeId && byId.get(activeId);
    srvLayer.eachLayer(function (l) {
      var cc = byId.get(String(l.feature.properties.i));
      l.setStyle(act ? (cc === act ? { fillColor: cc.hot, fillOpacity: 1 } : { fillColor: cc.color, fillOpacity: 0.6 }) : { fillColor: cc.color, fillOpacity: 1 });
    });
    if (tiles) { var el = tiles.getContainer(); if (el) el.classList.toggle('is-dark', scheme() === 'escuro'); }
  }
  temaBox.addEventListener('click', function (e) {
    var b = e.target.closest('[data-tema]'); if (!b) return;
    docEl.setAttribute('data-ma-tema', b.getAttribute('data-tema'));
    applyTheme();
  });
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', applyTheme);
  new MutationObserver(applyTheme).observe(docEl, { attributes: true, attributeFilter: ['data-theme'] });

  var cityDisclosure = root.querySelector('.ma-mobile-cities');
  function cityListLayout() { cityDisclosure.open = mqDesk.matches; }
  cityListLayout(); mqDesk.addEventListener('change', cityListLayout);
  var raf = 0;
  function follow() { if (raf) return; raf = requestAnimationFrame(function () { raf = 0; placeCard(); drawLeader(); }); }
  map.on('move', follow);
  map.on('zoomstart', function () { root.classList.add('ma-zooming'); });
  map.on('zoomend', function () { root.classList.remove('ma-zooming'); });
  map.on('moveend zoomend', function () { layoutLabels(); placeCard(); drawLeader(); });
  map.on('dragstart', function () { userMoved = true; });
  map.on('click', function () { if (pinnedId) unpin(); });
  listEl.addEventListener('scroll', function () { follow(); updateListMask(); }, { passive: true });
  mapEl.addEventListener('mouseleave', function () { if (hoverId && source === 'map') clearHover(hoverId); });

  // Zoom: botões, duplo clique, pinça e Ctrl/⌘ + rolagem (a rolagem simples continua rolando a página).
  root.querySelector('.ma-ctrl').addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]'); if (!b) return;
    var a = b.getAttribute('data-act');
    if (a === 'in') { userMoved = true; map.zoomIn(); }
    else if (a === 'out') { userMoved = true; map.zoomOut(); }
    else { userMoved = false; unpin(); fitAll(true); }
  });
  var wheelAcc = 0, hintT = 0;
  mapEl.addEventListener('wheel', function (e) {
    if (!(e.ctrlKey || e.metaKey)) {
      hintEl.classList.add('is-on'); clearTimeout(hintT);
      hintT = setTimeout(function () { hintEl.classList.remove('is-on'); }, 1100);
      return;
    }
    e.preventDefault(); hintEl.classList.remove('is-on');
    wheelAcc += e.deltaY;
    if (Math.abs(wheelAcc) < 24) return;
    var dz = wheelAcc < 0 ? 0.5 : -0.5; wheelAcc = 0; userMoved = true;
    map.setZoomAround(map.mouseEventToContainerPoint(e), map.getZoom() + dz);
  }, { passive: false });

  // Ajusta ao redimensionar
  var lastDesk = mqDesk.matches;
  new ResizeObserver(function () {
    map.invalidateSize({ animate: false });
    if (lastDesk !== mqDesk.matches) {
      lastDesk = mqDesk.matches;
      cardEl.classList.toggle('is-empty', !activeId);
      if (!activeId) cardEl.classList.remove('is-on');
    }
    if (!userMoved) fitAll(false);
    layoutLabels(); placeCard(); drawLeader(); updateListMask();
  }).observe(viewEl);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutLabels);
  layoutLabels();

  // Mapa de fundo: só entra se o servidor de tiles responder com sucesso (status 200).
  // Aberto direto do computador (file://) o OSM recusa os tiles, então nem tenta.
  (function tryBase() {
    if (!MAPA_BASE.url || location.protocol === 'file:' || !window.fetch) return;
    var z = Math.round(map.getZoom()), pt = map.project(map.getCenter(), z).divideBy(256).floor();
    var url = L.Util.template(MAPA_BASE.url, { s: 'a', z: z, x: pt.x, y: pt.y, r: '' });
    var ctl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 8000);
    fetch(url, { mode: 'cors', referrerPolicy: 'strict-origin-when-cross-origin', signal: ctl ? ctl.signal : undefined })
      .then(function (r) {
        clearTimeout(timer);
        if (!r.ok) return;
        hasBase = true;
        tiles = L.tileLayer(MAPA_BASE.url, { attribution: MAPA_BASE.atribuicao, className: 'ma-tiles', maxZoom: 19, referrerPolicy: 'strict-origin-when-cross-origin' }).addTo(map);
        ctxAlpha = 0.55;
        applyTheme();
      })
      .catch(function () { clearTimeout(timer); });
  })();

  api = { placeCard: placeCard, drawLeader: drawLeader, highlight: highlight };
  root.setAttribute('data-map-ready','true');
})();
