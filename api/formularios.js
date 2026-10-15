/* Formulários oficiais VITA. Destinos e validação de protocolo são configurados no servidor. */
'use strict';
const destinations={ouvidoria:'VITA_FORM_OUVIDORIA_URL',candidato:'VITA_FORM_CANDIDATO_URL',fornecedor:'VITA_FORM_FORNECEDOR_URL'};
const manifestacoes=['Reclamação','Denúncia','Elogio','Pedido de informação','Sugestão','Solicitação'];
const motivos=['Falta de água','Ligação nova','Informação sobre vazamento','Religação','Segunda via da fatura','Negociação de débitos','Troca de titularidade','Aditivo','Retenção','Desconto','Recebimento de carta','Recebimento de ofício','Envio de carta','Envio de ofício','Fatura por e-mail','Pressão da água','Caixa de inspeção ou tampa de esgoto','Buraco em via ou correção de serviço executado','Outros motivos'];
const maxFilesSize=2*1024*1024;
const text=value=>typeof value==='string'?value.trim():'';
function configuredURL(name){const url=new URL(process.env[name]);if(url.protocol!=='https:'||url.username||url.password)throw new Error('Unconfigured destination');return url.href;}
async function post(url,payload,token){
 const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),8000);
 try{return await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json',...(token?{Authorization:'Bearer '+token}:{})},body:JSON.stringify(payload),signal:controller.signal,redirect:'error'});}
 finally{clearTimeout(timeout);}
}
async function validateProtocol(protocolo){
 let url;try{url=configuredURL('VITA_OUVIDORIA_PROTOCOLO_URL');}catch{return {code:503,message:'A validação do protocolo está indisponível. Tente mais tarde ou utilize os canais de atendimento.'};}
 try{
  const response=await post(url,{protocolo},process.env.VITA_PROTOCOLO_TOKEN||process.env.VITA_FORM_TOKEN);
  if(!response.ok)throw new Error('Protocol service failure');
  const data=await response.json();
  return data.valido===true?{code:200,valido:true}:{code:400,valido:false,message:'Protocolo não validado. Confira o número do atendimento anterior.'};
 }catch{return {code:502,message:'Não foi possível confirmar o protocolo agora. Tente novamente mais tarde.'};}
}
function attachment(file,allowed){
 if(!file||typeof file.name!=='string'||typeof file.data!=='string'||file.data.length>Math.ceil(maxFilesSize/3)*4)return null;
 if(file.data.length%4||!/^[A-Za-z0-9+/]*={0,2}$/.test(file.data))return null;
 const name=file.name.replace(/[^a-zA-Z0-9áéíóúàâêôãõçÁÉÍÓÚÀÂÊÔÃÕÇ._ -]/g,'_').slice(-180),extension=name.split('.').pop().toLowerCase();
 if(!allowed.includes(extension))return null;
 const buffer=Buffer.from(file.data,'base64'),hex=buffer.subarray(0,8).toString('hex');
 const signature=extension==='pdf'?buffer.subarray(0,5).toString()==='%PDF-':extension==='doc'?hex==='d0cf11e0a1b11ae1':['docx','xlsx'].includes(extension)?hex.startsWith('504b0304'):['jpg','jpeg'].includes(extension)?hex.startsWith('ffd8ff'):extension==='png'&&hex==='89504e470d0a1a0a';
 if(!buffer.length||buffer.length>maxFilesSize||!signature)return null;
 const mimes={pdf:'application/pdf',doc:'application/msword',docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png'};
 return {name,type:mimes[extension],size:buffer.length,data:file.data};
}
module.exports=async function handler(req,res){
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({ok:false,message:'Use o formulário para enviar sua solicitação.'});}
 const origin=req.headers?.origin,host=req.headers?.host;
 if(origin&&host){try{if(new URL(origin).host!==host)throw new Error('Origin mismatch');}catch{return res.status(403).json({ok:false,message:'Envie a solicitação pelo site da VITA.'});}}
 let body=req.body;try{if(typeof body==='string')body=JSON.parse(body);}catch{body=null;}
 if(!body||typeof body!=='object'||!Object.hasOwn(destinations,body.tipo))return res.status(400).json({ok:false,message:'Formulário inválido.'});
 if(body.tipo==='ouvidoria'&&body.acao==='validar-protocolo'){
  const protocolo=text(body.protocolo);
  if(!protocolo||protocolo.length>180)return res.status(400).json({ok:false,valido:false,message:'Informe o número do protocolo.'});
  const result=await validateProtocol(protocolo);return res.status(result.code).json({ok:result.valido===true,valido:result.valido===true,message:result.message||'Protocolo validado. Preencha os dados da manifestação.'});
 }
 const input=body.dados;if(!input||typeof input!=='object'||text(input.website))return res.status(400).json({ok:false,message:'Confira os dados do formulário.'});
 const fields={candidato:['nome','endereco','rg','cpf','vaga','descricao'],fornecedor:['nome','endereco','celular','email','cnpj','descricao'],ouvidoria:['protocolo','assunto','descricao','tipo_manifestacao','motivo','canal_contato','contato']}[body.tipo];
 const dados={},errors={};
 for(const key of fields){const value=text(input[key]),limit=key==='descricao'?3000:180;dados[key]=value;if(!value||value.length>limit)errors[key]=!value?'Preencha este campo.':'Reduza o texto para até '+limit+' caracteres.';}
 const email=value=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),phone=value=>/^[+()\d\s.-]{8,30}$/.test(value);
 if(body.tipo==='candidato'&&dados.cpf&&dados.cpf.replace(/\D/g,'').length!==11)errors.cpf='Confira os 11 números do CPF.';
 if(body.tipo==='fornecedor'){
  if(!email(dados.email))errors.email='Informe um e-mail válido.';
  if(!phone(dados.celular))errors.celular='Confira o celular com DDD.';
 }
 if(body.tipo==='ouvidoria'){
  if(!manifestacoes.includes(dados.tipo_manifestacao))errors.tipo_manifestacao='Selecione o tipo de manifestação.';
  if(!motivos.includes(dados.motivo))errors.motivo='Selecione o motivo do contato.';
  if(!['E-mail','Telefone'].includes(dados.canal_contato))errors.canal_contato='Escolha como deseja receber o contato.';
  else if(dados.canal_contato==='E-mail'?!email(dados.contato):!phone(dados.contato))errors.contato='Confira o contato informado.';
 }
 if(input.privacidade!==true)errors.privacidade='Confirme a leitura da Política de Privacidade.';
 const rawFiles=body.anexos===undefined?[]:body.anexos;
 const maxFiles=body.tipo==='ouvidoria'?3:1;
 const allowed=body.tipo==='candidato'?['pdf','doc','docx']:body.tipo==='fornecedor'?['pdf','doc','docx','xlsx','jpg','jpeg','png']:['pdf','doc','docx','jpg','jpeg','png'];
 const files=Array.isArray(rawFiles)&&rawFiles.length<=maxFiles?rawFiles.map(file=>attachment(file,allowed)):null;
 if(!files||files.some(file=>!file)||files.reduce((total,file)=>total+(file?.size||0),0)>maxFilesSize)errors[body.tipo==='candidato'?'curriculo':body.tipo==='fornecedor'?'proposta':'anexos']='Confira o formato e o limite total de 2 MB dos arquivos.';
 else if(body.tipo==='candidato'&&!files.length)errors.curriculo='Anexe seu currículo.';
 if(Object.keys(errors).length)return res.status(400).json({ok:false,message:'Revise os campos indicados. Seus dados continuam no formulário.',errors});
 let target;try{target=configuredURL(destinations[body.tipo]);}catch{return res.status(503).json({ok:false,message:'O envio deste formulário ainda não está disponível. Utilize o canal de contato indicado nesta página.'});}
 if(body.tipo==='ouvidoria'){
  const validation=await validateProtocol(dados.protocolo);
  if(validation.valido!==true)return res.status(validation.code).json({ok:false,message:validation.message,errors:{protocolo:validation.message}});
 }
 try{
  const response=await post(target,{versao:2,tipo:body.tipo,recebidoEm:new Date().toISOString(),dados:{...dados,privacidade:true},anexos:files},process.env.VITA_FORM_TOKEN);
  if(!response.ok)throw new Error('Destination rejected submission');
  return res.status(200).json({ok:true,message:'Seu cadastro foi recebido pelo canal responsável.'});
 }catch{return res.status(502).json({ok:false,message:'Não foi possível confirmar o recebimento. Seus dados continuam no formulário. Tente mais tarde ou utilize o canal de contato indicado.'});}
};
