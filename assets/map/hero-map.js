/* Native SVG map. Geographic drawing and city list are already present in HTML. */
(function () {
  'use strict';
  var root=document.getElementById('mapa-atuacao');
  if(!root)return;
  root.setAttribute('data-ma-tema','claro');
  var svg=root.querySelector('.ma-native-svg'), surface=root.querySelector('.ma-map'),view=root.querySelector('.ma-view');
  if(!svg||!surface||!view)return;
  var cities=[{"ibge":"2611101","nome":"Petrolina","tipo":"sede","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-7069.055,"y":1646.02},{"ibge":"2601102","nome":"Araripina","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-7067.536,"y":1325.198},{"ibge":"2612208","nome":"Salgueiro","tipo":"unidade","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-6828.548,"y":1413.813},{"ibge":"2609907","nome":"Ouricuri","tipo":"unidade","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-6995.28,"y":1379.535},{"ibge":"2612604","nome":"Santa Maria da Boa Vista","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-6950.617,"y":1541.558},{"ibge":"2603009","nome":"Cabrobó","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-6860.785,"y":1489.972},{"ibge":"2605301","nome":"Exu","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-6933.111,"y":1313.385},{"ibge":"2610400","nome":"Parnamirim","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-6907.926,"y":1416.211},{"ibge":"2608750","nome":"Lagoa Grande","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-7029.61,"y":1576.324},{"ibge":"2615607","nome":"Trindade","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-7027.516,"y":1358.359},{"ibge":"2602001","nome":"Bodocó","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-6969.763,"y":1361.635},{"ibge":"2607307","nome":"Ipubi","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-7007.078,"y":1338.299},{"ibge":"2613503","nome":"São José do Belmonte","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-6764.495,"y":1375.659},{"ibge":"2614006","nome":"Serrita","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-6858.289,"y":1390.319},{"ibge":"2605152","nome":"Dormentes","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-7115.044,"y":1478.626},{"ibge":"2600203","nome":"Afrânio","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-7157.508,"y":1491.014},{"ibge":"2609808","nome":"Orocó","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-6911.958,"y":1508.469},{"ibge":"2614303","nome":"Moreilândia","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-6902.079,"y":1333.756},{"ibge":"2612455","nome":"Santa Cruz","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-7041.252,"y":1443.399},{"ibge":"2612554","nome":"Santa Filomena","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-7087.416,"y":1430.244},{"ibge":"2616100","nome":"Verdejante","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-6801.566,"y":1387.129},{"ibge":"2604304","nome":"Cedro","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-6848.096,"y":1350.045},{"ibge":"2615201","nome":"Terra Nova","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-6873.543,"y":1440.031},{"ibge":"2606309","nome":"Granito","tipo":"atendimento","clientes":1,"itens":["Município integrante da área de concessão da VITA Sertão.","Os endereços das lojas e pontos de atendimento serão disponibilizados após confirmação oficial."],"x":-6914.122,"y":1349.218}], byId={}, selected=null, preview=null, lastTouch=0, suppressClick=0;
  var card=root.querySelector('.ma-card'),list=root.querySelector('.ma-list'),disclosure=root.querySelector('.ma-mobile-cities');
  var leader=root.querySelector('.ma-leader'),controls=root.querySelector('.ma-ctrl');
  var desktop=matchMedia('(min-width:960px)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
  var calm=matchMedia('(prefers-reduced-motion:reduce)');
  var icons=window.VitaIcons||{},types={sede:'Polo operacional · sede administrativa',unidade:'Polo operacional',atendimento:'Município da concessão'};
  function mediaChange(mq,fn){if(mq.addEventListener)mq.addEventListener('change',fn);else if(mq.addListener)mq.addListener(fn);}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function clamp(v,min,max){return Math.max(min,Math.min(max,v));}
  function nearest(target,attr){while(target&&target!==surface){if(target.getAttribute&&target.hasAttribute(attr))return target;target=target.parentNode;}return null;}
  cities.forEach(function(c){c.id=String(c.ibge);c.polygon=root.querySelector('[data-ma-city="'+c.id+'"]');c.marker=root.querySelector('[data-ma-pin="'+c.id+'"]');c.chip=root.querySelector('[data-ma-choice="'+c.id+'"]');byId[c.id]=c;});
  var bounds=svg.getAttribute('data-bounds').split(/\s+/).map(Number),base=null,box=null,zoom=1,size={w:0,h:0};
  function visibleSize(){var r=view.getBoundingClientRect();return {w:r.width||view.clientWidth,h:r.height||view.clientHeight};}
  function fitBox(s){
    var gap=desktop.matches?(list.getBoundingClientRect().width||252)+24:0;
    var aw=Math.max(100,s.w-gap-32),ah=Math.max(120,s.h-128);
    var scale=Math.max((bounds[2]-bounds[0])/aw,(bounds[3]-bounds[1])/ah);
    return {x:(bounds[0]+bounds[2])/2-(s.w-gap)/2*scale,y:(bounds[1]+bounds[3])/2-(s.h/2-20)*scale,w:s.w*scale,h:s.h*scale};
  }
  function limitBox(){
    var cx=box.x+box.w/2,cy=box.y+box.h/2;
    cx=clamp(cx,bounds[0]-base.w*.12,bounds[2]+base.w*.12);cy=clamp(cy,bounds[1]-base.h*.12,bounds[3]+base.h*.12);
    box.x=cx-box.w/2;box.y=cy-box.h/2;
  }
  function pixel(c){return {x:(c.x-box.x)/box.w*size.w,y:(c.y-box.y)/box.h*size.h};}
  function draw(){
    if(!box||!size.w||!size.h)return;
    limitBox();svg.setAttribute('viewBox',[box.x,box.y,box.w,box.h].join(' '));svg.setAttribute('preserveAspectRatio','none');
    cities.forEach(function(c){var p=pixel(c);c.marker.style.left=p.x+'px';c.marker.style.top=p.y+'px';c.marker.hidden=p.x < -24||p.x>size.w+24||p.y < -24||p.y>size.h+24;});
    root.querySelectorAll('[data-map-label]').forEach(function(el){var p=pixel({x:Number(el.getAttribute('data-x')),y:Number(el.getAttribute('data-y'))});el.style.left=p.x+'px';el.style.top=p.y+'px';el.hidden=p.x<20||p.x>size.w-20||p.y<18||p.y>size.h-18;});
    layoutLabels();placeCard();drawLeader();
    controls.querySelector('[data-act="out"]').disabled=zoom<=1.001;controls.querySelector('[data-act="in"]').disabled=zoom>=5.999;
    root.setAttribute('data-map-zoom',zoom.toFixed(3));
  }
  function resize(reset){
    var s=visibleSize();if(s.w<1||s.h<1)return;
    var next=fitBox(s),cx=box?box.x+box.w/2:0,cy=box?box.y+box.h/2:0;
    size=s;base=next;
    if(reset||!box||zoom<=1.001){zoom=1;box={x:base.x,y:base.y,w:base.w,h:base.h};}
    else box={x:cx-base.w/zoom/2,y:cy-base.h/zoom/2,w:base.w/zoom,h:base.h/zoom};
    draw();root.setAttribute('data-map-ready','true');
  }
  function scaleTo(next,point){
    if(!box)return;
    var px=point?clamp(point.x/size.w,0,1):.5,py=point?clamp(point.y/size.h,0,1):.5;
    var anchor={x:box.x+px*box.w,y:box.y+py*box.h};zoom=clamp(next,1,6);
    box={x:anchor.x-px*base.w/zoom,y:anchor.y-py*base.h/zoom,w:base.w/zoom,h:base.h/zoom};
    if(zoom<=1.001)box={x:base.x,y:base.y,w:base.w,h:base.h};draw();
  }
  function layoutLabels(){
    var placed=[],limit=desktop.matches?size.w-(list.getBoundingClientRect().width||252)-24:size.w;
    cities.forEach(function(c){if(c.marker.hidden)return;var p=pixel(c);placed.push({l:p.x-12,r:p.x+12,t:p.y-30,b:p.y+3});});
    function hits(b){return placed.some(function(p){return b.l<p.r&&b.r>p.l&&b.t<p.b&&b.b>p.t;});}
    cities.slice().sort(function(a,b){return (a.id===selected?-10:0)-(b.id===selected?-10:0)||((a.tipo==='atendimento')-(b.tipo==='atendimento'));}).forEach(function(c){
      var label=c.marker.querySelector('.ma-native-label');label.hidden=false;
      if(c.marker.hidden){label.hidden=true;return;}
      var p=pixel(c),width=label.offsetWidth||Math.ceil(c.nome.length*7)+16,height=label.offsetHeight||24;
      var candidates=[{l:p.x+14,t:p.y-29},{l:p.x-14-width,t:p.y-29},{l:p.x-width/2,t:p.y+5},{l:p.x-width/2,t:p.y-32-height}];
      var found=null;
      candidates.some(function(b){b.r=b.l+width;b.b=b.t+height;if(b.l>=6&&b.r<=limit-6&&b.t>=6&&b.b<=size.h-6&&!hits(b)){found=b;return true;}return false;});
      if(found){label.style.left=(found.l-p.x+22)+'px';label.style.top=(found.t-p.y+34)+'px';placed.push(found);}
      else label.hidden=true;
    });
    root.querySelectorAll('[data-map-label]').forEach(function(el){if(el.hidden)return;var p=pixel({x:Number(el.getAttribute('data-x')),y:Number(el.getAttribute('data-y'))}),w=el.offsetWidth||el.textContent.length*7,h=el.offsetHeight||18;var b={l:p.x-w/2,r:p.x+w/2,t:p.y-h/2,b:p.y+h/2};el.hidden=b.l<4||b.r>limit-4||b.t<4||b.b>size.h-4||hits(b);if(!el.hidden)placed.push(b);});
  }
  function fillCard(c){
    card.querySelector('.ma-card-name').textContent=c.nome;card.querySelector('.ma-badge').textContent='PE';
    card.querySelector('.ma-card-sub').innerHTML='<span class="ma-ic">'+(icons[c.tipo==='atendimento'?'wrench':'store']||'')+'</span>'+esc(types[c.tipo]);
    card.querySelector('.ma-card-ls').innerHTML=c.itens.map(function(t){return '<li>'+esc(t)+'</li>';}).join('');
    card.querySelector('.ma-card-ft').innerHTML='<a class="ma-contact-link" href="'+esc(root.getAttribute('data-contact-href')||'fale-conosco/index.html')+'">Consultar atendimento '+(icons['arrow-right']||'')+'</a>';
  }
  function render(){
    var active=preview||selected,c=byId[active];
    cities.forEach(function(city){var on=city.id===active;
      city.polygon.setAttribute('fill',on?'#ffda32':city.polygon.getAttribute('data-color'));city.polygon.setAttribute('fill-opacity',active&&!on?'.65':'1');city.polygon.classList.toggle('is-selected',on);city.polygon.setAttribute('aria-pressed',String(city.id===selected));
      city.marker.classList.toggle('is-active',on);city.marker.setAttribute('aria-pressed',String(city.id===selected));city.chip.classList.toggle('is-on',on);city.chip.setAttribute('aria-pressed',String(city.id===selected));
    });
    card.classList.toggle('is-on',!!c);card.classList.toggle('is-empty',!c);card.classList.toggle('is-pinned',!!selected);root.classList.toggle('ma-has-active',!!c);
    if(c)fillCard(c);if(box){layoutLabels();placeCard();drawLeader();}
  }
  function select(id,source){
    if(Date.now()<suppressClick||!byId[id])return;
    selected=id;preview=null;render();
    if(!desktop.matches){var r=card.getBoundingClientRect();if(r.top<100||r.bottom>window.innerHeight)card.scrollIntoView({block:'nearest',behavior:calm.matches?'auto':'smooth'});}
    if(source==='map'&&desktop.matches){var c=byId[id],r=c.chip.getBoundingClientRect(),lr=list.getBoundingClientRect();if(r.top<lr.top)list.scrollTop-=lr.top-r.top;else if(r.bottom>lr.bottom)list.scrollTop+=r.bottom-lr.bottom;}
  }
  function clear(){selected=null;preview=null;render();}
  function canPreview(){return fine.matches&&Date.now()-lastTouch>700;}
  cities.forEach(function(c){
    c.chip.addEventListener('click',function(){select(c.id,'list');});
    [c.chip,c.marker,c.polygon].forEach(function(el){
      el.addEventListener('mouseenter',function(){if(canPreview()){preview=c.id;render();}});
      el.addEventListener('mouseleave',function(){if(preview===c.id){preview=null;render();}});
      el.addEventListener('focus',function(){if(desktop.matches&&canPreview()){preview=c.id;render();}});
      el.addEventListener('blur',function(){if(preview===c.id){preview=null;render();}});
    });
  });
  surface.addEventListener('click',function(e){if(Date.now()<suppressClick)return;var el=nearest(e.target,'data-ma-pin')||nearest(e.target,'data-ma-city');if(el)select(el.getAttribute('data-ma-pin')||el.getAttribute('data-ma-city'),'map');});
  card.querySelector('.ma-card-x').addEventListener('click',function(){var old=selected;clear();if(old&&card.contains(document.activeElement))byId[old].chip.focus({preventScroll:true});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&(selected||preview))clear();});
  controls.addEventListener('click',function(e){var b=e.target.closest('[data-act]');if(!b)return;var a=b.getAttribute('data-act');if(a==='in')scaleTo(zoom*1.4);else if(a==='out')scaleTo(zoom/1.4);else {clear();resize(true);}});
  function placeCard(){
    var c=byId[preview||selected];if(!desktop.matches||!box||!c){card.style.removeProperty('--x');card.style.removeProperty('--y');return;}
    var p=pixel(c),cw=card.offsetWidth||305,ch=card.offsetHeight||220,right=size.w-(list.getBoundingClientRect().width||252)-24;
    var x=p.x+24;if(x+cw>right-12)x=p.x-cw-24;x=clamp(x,12,Math.max(12,right-cw-12));
    var y=clamp(p.y-ch/2,12,Math.max(12,size.h-ch-12));if(x<68&&y<162)y=clamp(162,12,Math.max(12,size.h-ch-12));
    card.setAttribute('data-tail','n');card.style.setProperty('--x',Math.round(x)+'px');card.style.setProperty('--y',Math.round(y)+'px');
  }
  function drawLeader(){
    var c=byId[preview||selected];leader.classList.remove('is-on');if(!desktop.matches||!c||!box)return;
    var sr=root.querySelector('.ma-stage').getBoundingClientRect(),cr=c.chip.getBoundingClientRect(),vr=view.getBoundingClientRect(),lr=list.getBoundingClientRect();
    if(cr.bottom<lr.top||cr.top>lr.bottom)return;var p=pixel(c),x=cr.left-sr.left,y=cr.top+cr.height/2-sr.top,px=vr.left-sr.left+p.x,py=vr.top-sr.top+p.y-14;
    leader.querySelector('path').setAttribute('d','M'+x+','+y+'H'+(x-14)+'L'+px+','+py);leader.querySelector('circle').setAttribute('cx',px);leader.querySelector('circle').setAttribute('cy',py);leader.classList.add('is-on');
  }
  function listLayout(){disclosure.open=desktop.matches;resize(true);render();}
  mediaChange(desktop,listLayout);list.addEventListener('scroll',drawLeader,{passive:true});
  // One finger scrolls the page. Two fingers pan/zoom the map, independent of PointerEvent support.
  var gesture=null,mouse=null;
  function touchInfo(touches){var a=touches[0],b=touches[1],r=view.getBoundingClientRect();return {x:(a.clientX+b.clientX)/2-r.left,y:(a.clientY+b.clientY)/2-r.top,d:Math.max(1,Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY))};}
  function startGesture(touches){if(!box)return;var p=touchInfo(touches);gesture={z:zoom,d:p.d,anchor:{x:box.x+p.x/size.w*box.w,y:box.y+p.y/size.h*box.h}};root.classList.add('ma-gesturing');}
  surface.addEventListener('touchstart',function(e){lastTouch=Date.now();preview=null;if(e.touches.length===2){startGesture(e.touches);if(e.cancelable)e.preventDefault();}}, {passive:false});
  surface.addEventListener('touchmove',function(e){if(e.touches.length!==2)return;if(!gesture)startGesture(e.touches);if(!gesture)return;if(e.cancelable)e.preventDefault();var p=touchInfo(e.touches);zoom=clamp(gesture.z*p.d/gesture.d,1,6);box={x:gesture.anchor.x-p.x/size.w*base.w/zoom,y:gesture.anchor.y-p.y/size.h*base.h/zoom,w:base.w/zoom,h:base.h/zoom};draw();}, {passive:false});
  function endGesture(e){if(gesture){suppressClick=Date.now()+400;if(e&&e.cancelable)e.preventDefault();}gesture=null;root.classList.remove('ma-gesturing');}
  surface.addEventListener('touchend',function(e){if(e.touches.length<2)endGesture(e);}, {passive:false});surface.addEventListener('touchcancel',function(){endGesture();},{passive:true});
  surface.addEventListener('mousedown',function(e){if(e.button!==0||Date.now()-lastTouch<700||!box)return;mouse={x:e.clientX,y:e.clientY,bx:box.x,by:box.y,moved:false};});
  document.addEventListener('mousemove',function(e){if(!mouse)return;var dx=e.clientX-mouse.x,dy=e.clientY-mouse.y;if(Math.abs(dx)+Math.abs(dy)>6)mouse.moved=true;if(!mouse.moved)return;e.preventDefault();box.x=mouse.bx-dx/size.w*box.w;box.y=mouse.by-dy/size.h*box.h;root.classList.add('ma-gesturing');draw();});
  document.addEventListener('mouseup',function(){if(mouse&&mouse.moved)suppressClick=Date.now()+250;mouse=null;root.classList.remove('ma-gesturing');});
  window.addEventListener('blur',function(){mouse=null;endGesture();});
  surface.addEventListener('wheel',function(e){if(!(e.ctrlKey||e.metaKey))return;if(e.cancelable)e.preventDefault();var r=view.getBoundingClientRect();scaleTo(zoom*(e.deltaY<0?1.15:1/1.15),{x:e.clientX-r.left,y:e.clientY-r.top});},{passive:false});
  surface.addEventListener('keydown',function(e){if(e.target!==surface||!box)return;var delta=40;if(e.key==='+'||e.key==='=')scaleTo(zoom*1.4);else if(e.key==='-')scaleTo(zoom/1.4);else if(e.key==='Home'){clear();resize(true);}else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].indexOf(e.key)!==-1){if(e.key==='ArrowLeft')box.x-=delta/size.w*box.w;if(e.key==='ArrowRight')box.x+=delta/size.w*box.w;if(e.key==='ArrowUp')box.y-=delta/size.h*box.h;if(e.key==='ArrowDown')box.y+=delta/size.h*box.h;draw();}else return;e.preventDefault();});
  var frame=0;function scheduleResize(){if(frame)return;frame=requestAnimationFrame(function(){frame=0;resize(false);});}
  if(window.ResizeObserver)new ResizeObserver(scheduleResize).observe(view);
  window.addEventListener('resize',scheduleResize,{passive:true});window.addEventListener('orientationchange',scheduleResize,{passive:true});window.addEventListener('pageshow',scheduleResize);
  if(window.visualViewport)window.visualViewport.addEventListener('resize',scheduleResize,{passive:true});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(scheduleResize);
  window.addEventListener('load',scheduleResize);disclosure.open=desktop.matches;resize(true);render();
})();
