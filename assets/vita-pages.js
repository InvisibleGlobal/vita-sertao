/* VITA Sertão · atendimento presencial e reserva de água */
(() => {
  'use strict';
  const digits = value => String(value).replace(/\D/g, '');
  const municipalityKey = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const waterVolume = values => {
    const ranges = { moradores:[1,100], consumo:[1,1000], dias:[1,30] };
    const errors = {};
    const parsed = {};
    for (const [key,[min,max]] of Object.entries(ranges)) {
      const raw = String(values[key] ?? '');
      const value = /^\d+$/.test(raw) ? Number(raw) : NaN;
      if (!Number.isSafeInteger(value) || value < min || value > max) errors[key] = `Informe um número inteiro de ${min} a ${max}.`;
      else parsed[key] = value;
    }
    return Object.keys(errors).length ? {volume:null, errors} : {volume:parsed.moradores * parsed.consumo * parsed.dias, errors};
  };
  const contactLink = city => 'https://wa.me/558008708787?text=' + encodeURIComponent(`Olá! Gostaria de confirmar o endereço e o horário do atendimento presencial da VITA para ${city}.`);
  window.VitaPages = Object.freeze({waterVolume, municipalityKey, contactLink});

  document.querySelectorAll('[data-vp-water-calculator]').forEach(root => {
    const inputs = Object.fromEntries(['moradores','consumo','dias'].map(key => [key,root.querySelector(`[data-vp-water-input="${key}"]`)]));
    const errorNodes = Object.fromEntries(['moradores','consumo','dias'].map(key => [key,root.querySelector(`[data-vp-water-error="${key}"]`)]));
    const status = root.querySelector('[data-vp-water-status]');
    const result = root.querySelector('[data-vp-water-result]');
    if (!status || !result || Object.values(inputs).some(node => !node)) return;
    const update = () => {
      const data = waterVolume(Object.fromEntries(Object.entries(inputs).map(([key,node]) => [key,node.value])));
      for (const [key,node] of Object.entries(inputs)) {
        const error = data.errors[key] || '';
        if (error) node.setAttribute('aria-invalid','true');
        else node.removeAttribute('aria-invalid');
        if (errorNodes[key]) errorNodes[key].textContent = error;
      }
      status.textContent = data.volume === null ? 'Revise os campos destacados para calcular a reserva.' : 'Volume estimado para os valores informados';
      result.textContent = data.volume === null ? '' : new Intl.NumberFormat('pt-BR').format(data.volume) + ' L';
    };
    Object.values(inputs).forEach(node => {
      node.addEventListener('input',update);
      node.addEventListener('change',update);
    });
    root.querySelector('form').addEventListener('submit',event => {event.preventDefault(); update();});
  });

  document.querySelectorAll('[data-vp-locations]').forEach(root => {
    const form = root.querySelector('[data-vp-location-form]');
    const cepInput = root.querySelector('[name="cep"]');
    const cityInput = root.querySelector('[name="municipio"]');
    const result = root.querySelector('[data-vp-location-result]');
    const submit = form?.querySelector('[type="submit"]');
    let cities;
    try {cities = JSON.parse(root.getAttribute('data-vp-municipios') || '{}');} catch {return;}
    if (!form || !cepInput || !cityInput || !result) return;
    let controller = null;
    let requestId = 0;
    const element = (tag,text,className) => {
      const node = document.createElement(tag);
      if (text) node.textContent = text;
      if (className) node.className = className;
      return node;
    };
    const message = (text,error=false) => {
      result.replaceChildren(element('p',text));
      result.classList.toggle('vp-search-result--error',error);
      result.hidden = false;
    };
    const showCity = key => {
      const city = cities[key];
      if (!city) return;
      result.classList.remove('vp-search-result--error');
      result.replaceChildren(element('h3','Atendimento para ' + city.name),element('p','Confirme com a VITA o endereço, o horário e a unidade adequada para o seu serviço antes de sair de casa. Informe seu município e, se possível, tenha o número da matrícula da conta em mãos.'));
      const actions = element('div','', 'vp-actions');
      const link = element('a','Consultar pelo WhatsApp','vp-button');
      link.href = contactLink(city.name); link.target = '_blank'; link.rel = 'noopener noreferrer';
      const phone = element('a','Ligar: 0800 870 8787','vp-button vp-button--outline');
      phone.href = 'tel:08008708787';
      actions.append(link,phone); result.append(actions); result.hidden = false;
    };
    const cancel = () => {
      requestId++;
      if (controller) controller.abort();
      form.removeAttribute('aria-busy');
      if (submit) submit.disabled = false;
    };
    cepInput.addEventListener('input',() => {
      const value = digits(cepInput.value).slice(0,8);
      cepInput.value = value.length > 5 ? value.slice(0,5) + '-' + value.slice(5) : value;
    });
    cityInput.addEventListener('change',() => {
      cancel();
      if (!cityInput.value) {result.hidden = true; return;}
      cepInput.value = '';
      cepInput.removeAttribute('aria-invalid');
      showCity(cityInput.value);
    });
    form.addEventListener('submit',async event => {
      event.preventDefault(); cancel();
      const cep = digits(cepInput.value);
      if (cep.length !== 8) {
        message('Digite um CEP com 8 números ou escolha seu município na lista.',true);
        cepInput.setAttribute('aria-invalid','true'); cepInput.focus(); return;
      }
      cepInput.removeAttribute('aria-invalid');
      const currentRequest = requestId;
      const activeController = new AbortController();
      controller = activeController;
      const timeout = setTimeout(() => activeController.abort(),12000);
      form.setAttribute('aria-busy','true');
      if (submit) submit.disabled = true;
      message('Consultando seu CEP…');
      try {
        const response = await fetch('https://viacep.com.br/ws/' + cep + '/json/',{signal:activeController.signal});
        if (currentRequest !== requestId) return;
        if (!response.ok) throw new Error('CEP lookup failed');
        const data = await response.json();
        if (currentRequest !== requestId) return;
        if (data.erro) {message('CEP não encontrado. Confira os números ou selecione o município.',true); return;}
        const key = municipalityKey(data.localidade || '');
        if (data.uf !== 'PE' || !cities[key]) {message('Esse CEP não corresponde a um dos municípios da concessão. Para orientações, fale com a VITA pelo 0800 870 8787.',true); return;}
        cityInput.value = key; showCity(key);
      } catch {
        if (currentRequest === requestId) message('A consulta do CEP está indisponível agora. Selecione o município para continuar ou fale com a VITA pelo 0800 870 8787.',true);
      } finally {
        clearTimeout(timeout);
        if (currentRequest === requestId) {form.removeAttribute('aria-busy'); if (submit) submit.disabled = false;}
      }
    });
  });

  const openTargetFold = (hash = location.hash) => {
    let id;
    try {id = decodeURIComponent(hash.slice(1));} catch {return;}
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    const fold = target.matches('details.vp-fold') ? target : target.closest('details.vp-fold');
    if (fold) fold.open = true;
  };
  openTargetFold();
  window.addEventListener('hashchange',() => openTargetFold());
  document.addEventListener('click',event => {
    const anchor = event.target.closest?.('a[href^="#"]');
    if (anchor) openTargetFold(anchor.getAttribute('href'));
  });
  document.querySelectorAll('form[data-vita-form]').forEach(form => {
    if ((form.getAttribute('action') || '').trim()) form.querySelector('[data-vp-form-notice]')?.remove();
  });
})();
