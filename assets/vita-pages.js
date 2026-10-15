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
    const cards = [...root.querySelectorAll('[data-vp-location-card]')];
    const reset = root.querySelector('[data-vp-location-reset]');
    const count = root.querySelector('[data-vp-location-count]');
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
      result.replaceChildren(element('h3',city.name + ' · ' + city.kind),element('p',city.address),element('p',city.hours));
      cards.forEach(card => {
        const selected = card.getAttribute('data-vp-location-card') === key;
        card.hidden = !selected;
        card.classList.toggle('is-selected',selected);
      });
      if (reset) reset.hidden = false;
      if (count) count.textContent = city.confirmed ? '1 ponto de atendimento encontrado' : 'Endereço em confirmação';
      const actions = element('div','', 'vp-actions');
      const link = element('a','Consultar pelo WhatsApp','vp-button');
      link.href = contactLink(city.name); link.target = '_blank'; link.rel = 'noopener noreferrer';
      const phone = element('a','Ligar: 0800 870 8787','vp-button vp-button--outline');
      phone.href = 'tel:08008708787';
      actions.append(link,phone); result.append(actions); result.hidden = false;
    };
    const showAll = () => {
      result.hidden = true;
      cards.forEach(card => {card.hidden = false; card.classList.remove('is-selected');});
      if (reset) reset.hidden = true;
      if (count) count.textContent = '24 municípios · 4 lojas · 16 credenciados · 4 endereços a confirmar';
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
      if (!cityInput.value) {showAll(); return;}
      cepInput.value = '';
      cepInput.removeAttribute('aria-invalid');
      showCity(cityInput.value);
    });
    reset?.addEventListener('click',() => {
      cancel(); cityInput.value = ''; cepInput.value = '';
      cepInput.removeAttribute('aria-invalid'); showAll(); cityInput.focus();
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
})();

/* Formulários oficiais: dados preservados nas falhas e protocolo validado no servidor. */
(() => {
 'use strict';
 const maxBytes=2*1024*1024;
 const readFile=file=>new Promise((resolve,reject)=>{const reader=new FileReader();reader.onerror=()=>reject(new Error('Não foi possível ler o arquivo. Selecione-o novamente.'));reader.onload=()=>resolve({name:file.name,type:file.type,data:String(reader.result).split(',')[1]});reader.readAsDataURL(file);});
 document.querySelectorAll('form[data-vita-form]').forEach(form=>{
  const kind=form.getAttribute('data-vita-form'),submit=form.querySelector('[type="submit"]'),status=form.querySelector('[data-vita-form-status]'),fileInput=form.querySelector('[data-vita-file]'),fileInfo=form.querySelector('[data-vita-file-info]');
  if(!submit||!status)return;
  const fields=[...form.querySelectorAll('input,select,textarea')],originalSubmit=submit.innerHTML,originalFileInfo=fileInfo?.textContent;
  const protocol=form.querySelector('[data-vita-protocol]'),first=form.querySelector('[data-vita-protocol-step]'),second=form.querySelector('[data-vita-manifestation-step]'),validateButton=form.querySelector('[data-vita-protocol-validate]'),protocolStatus=form.querySelector('[data-vita-protocol-status]');
  let sending=false,validating=false,validatedProtocol='';
  const setError=(field,message='')=>{const error=field.id&&document.getElementById(field.id+'-error');message?field.setAttribute('aria-invalid','true'):field.removeAttribute('aria-invalid');if(error)error.textContent=message;};
  fields.forEach(field=>{field.addEventListener('invalid',()=>setError(field,field.validationMessage));field.addEventListener('input',()=>setError(field));});
  const request=async payload=>{
   const endpoint=new URL(form.getAttribute('action'),location.href);
   if(!/^https?:$/.test(endpoint.protocol))throw new Error('Para enviar, acesse o site publicado.');
   const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),25000);
   try{
    const response=await fetch(endpoint.href,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload),signal:controller.signal,credentials:'same-origin'});
    const body=await response.json().catch(()=>({}));
    if(!response.ok||body.ok!==true){
     if(body.errors)for(const [name,message]of Object.entries(body.errors)){const field=form.querySelector('[name="'+name.replace(/[^a-z_]/g,'')+'"]');if(field)setError(field,String(message));}
     throw new Error(body.message||'Não foi possível confirmar o recebimento. Seus dados continuam no formulário.');
    }
    return body;
   }finally{clearTimeout(timeout);}
  };
  const stage=number=>{
   first.hidden=number===2;second.hidden=number!==2;second.disabled=number!==2;
   form.querySelectorAll('[data-vita-progress]').forEach(item=>item.getAttribute('data-vita-progress')===String(number)?item.setAttribute('aria-current','step'):item.removeAttribute('aria-current'));
  };
  const validateProtocol=async()=>{
   if(validating||sending)return;
   const value=protocol.value.trim();if(!value){protocol.reportValidity();return;}
   validating=true;validateButton.disabled=true;protocolStatus.textContent='Validando protocolo…';
   try{
    const data=await request({tipo:'ouvidoria',acao:'validar-protocolo',protocolo:value});
    if(data.valido!==true)throw new Error('O protocolo não foi validado. Confira o número informado.');
    if(value!==protocol.value.trim())throw new Error('O protocolo foi alterado. Valide o número novamente.');
    validatedProtocol=value;stage(2);form.querySelector('[data-vita-protocol-summary]').textContent='Protocolo validado: '+value;protocolStatus.textContent='';
    form.querySelector('[name="assunto"]').focus();
   }catch(error){protocolStatus.textContent=error.name==='AbortError'?'Não foi possível validar o protocolo a tempo. Tente novamente.':error.message;protocolStatus.focus({preventScroll:true});}
   finally{validating=false;validateButton.disabled=false;}
  };
  validateButton?.addEventListener('click',validateProtocol);
  form.querySelector('[data-vita-protocol-edit]')?.addEventListener('click',()=>{validatedProtocol='';stage(1);protocol.focus();});
  const channel=form.querySelector('[data-vita-contact-channel]'),contact=form.querySelector('[data-vita-contact-value]');
  channel?.addEventListener('change',()=>{const isEmail=channel.value==='E-mail';contact.type=isEmail?'email':channel.value==='Telefone'?'tel':'text';contact.autocomplete=isEmail?'email':'tel';contact.placeholder=isEmail?'seuemail@exemplo.com':'(87) 00000-0000';setError(contact);});
  const validateFiles=()=>{
   if(!fileInput)return true;
   const files=[...(fileInput.files||[])],max=kind==='ouvidoria'?3:1,allowed=kind==='candidato'?/\.(pdf|doc|docx)$/i:kind==='fornecedor'?/\.(pdf|doc|docx|xlsx|jpg|jpeg|png)$/i:/\.(pdf|doc|docx|jpg|jpeg|png)$/i;
   const error=files.length>max?'Selecione até '+max+' arquivos.':files.reduce((n,f)=>n+f.size,0)>maxBytes?'O tamanho total deve ser de até 2 MB.':files.some(f=>!allowed.test(f.name))?'Use um dos formatos indicados abaixo.':'';
   fileInput.setCustomValidity(error);setError(fileInput,error);
   if(fileInfo)fileInfo.textContent=files.length&&!error?files.map(f=>f.name).join(', '):originalFileInfo;
   return !error;
  };
  fileInput?.addEventListener('change',validateFiles);
  form.addEventListener('submit',async event=>{
   event.preventDefault();if(sending||validating)return;
   if(protocol&&(!validatedProtocol||protocol.value.trim()!==validatedProtocol)){stage(1);await validateProtocol();return;}
   validateFiles();if(!form.reportValidity())return;
   sending=true;submit.disabled=true;submit.textContent='Enviando…';form.setAttribute('aria-busy','true');status.textContent='Enviando. Aguarde a confirmação.';
   try{
    const dados=Object.fromEntries([...new FormData(form)].filter(([,value])=>typeof value==='string'));dados.privacidade=form.querySelector('[name="privacidade"]').checked;
    const anexos=await Promise.all([...(fileInput?.files||[])].map(readFile));
    const data=await request({tipo:kind,dados,anexos});form.reset();fields.forEach(field=>setError(field));if(fileInput){fileInput.setCustomValidity('');validateFiles();}
    if(protocol){validatedProtocol='';stage(1);}
    status.textContent=data.message||'Seu cadastro foi recebido pelo canal responsável.';
   }catch(error){status.textContent=error.name==='AbortError'?'Não foi possível confirmar o recebimento a tempo. Seus dados continuam no formulário.':error.message;}
   finally{sending=false;submit.disabled=false;submit.innerHTML=originalSubmit;form.removeAttribute('aria-busy');status.focus({preventScroll:true});}
  });
 });
})();

/* Estrutura tarifária: abre somente o PDF configurado para a cidade escolhida. */
(() => {
 'use strict';
 const key=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
 document.querySelectorAll('[data-vita-tariffs]').forEach(root=>{
  const input=root.querySelector('[name="cidade"]'),link=root.querySelector('[data-vita-tariff-pdf]'),status=root.querySelector('[data-vita-tariff-status]');
  let cities;try{cities=JSON.parse(root.getAttribute('data-vita-cities'));}catch{return;}
  const update=()=>{
   link.removeAttribute('href');link.setAttribute('aria-disabled','true');
   const city=key(input.value);input.setCustomValidity('');
   if(!input.value.trim()){status.textContent='Informe sua cidade para consultar a estrutura tarifária.';return;}
   if(!cities[city]){input.setCustomValidity('Selecione um dos 24 municípios atendidos.');status.textContent='Selecione um dos municípios da lista.';return;}
   const config=window.VITA_TARIFAS_PDFS||{},raw=config[city]||config.geral;let target;
   try{target=new URL(raw,location.href);if(!raw||!/^https?:$/.test(target.protocol)||target.username||target.password)throw new Error();}catch{status.textContent='O PDF de '+cities[city]+' ainda não está disponível. Consulte os canais de atendimento.';return;}
   link.href=target.href;link.removeAttribute('aria-disabled');status.textContent='Estrutura tarifária de '+cities[city]+'. O PDF será aberto em uma nova aba.';
  };
  input.addEventListener('input',update);input.addEventListener('change',update);
  root.addEventListener('submit',event=>{event.preventDefault();update();if(!input.checkValidity())input.reportValidity();else if(link.hasAttribute('href'))link.click();});
  link.addEventListener('click',event=>{if(link.getAttribute('aria-disabled')==='true')event.preventDefault();});update();
 });
})();
