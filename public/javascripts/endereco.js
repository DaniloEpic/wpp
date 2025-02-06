var endereco = new Contexto();
endereco.ws.porCep = function (c) {
var g = new AjaxRequest();
var u = "https://viacep.com.br/ws/";
g.setURL(u+"/"+c+"/json");
g.get();
g.execute(endereco.app.porCep);
};

endereco.app.porCep = {
 response: function (t) {
 var r = new Resposta();
 r.setResponse(t);
  if (r.isOk()) {
  this.data = JSON.parse(r.text());
   if (this.data.cep) {
   endereco.ui.porCep.ok();
   }
  }
 }
};

endereco.ui.porCep = {
 consultar: function (b) {
  if (b.length == 9) {
  endereco.ws.porCep(b);
  }
 }
};
endereco.ui.porCep.dm = endereco.app.porCep;

//endereco.ui.porCep.ok = function () {
//pessoa.ui.cadastrar.set_endereco(this.dm.data);
//};

function Endereco() {
this.form = new FakeForm();
 
 this.add = function (m) {	
 this.form.addElement(m);
 };
 
 this.cep = function () {
 return this.form.getElement("cep");
 };
 
 this.logradouro = function () {
 return this.form.getElement("logradouro");
 };
 
 this.numero = function () {
 return this.form.getElement("numero");
 };
 
 this.bairro = function () {
 return this.form.getElement("bairro");
 };
 
 this.cidade = function () {
 return this.form.getElement("cidade");
 };
 
 this.uf = function () {
 return this.form.getElement("uf");
 };
 
 this.validarCep = function () { 
 this.eValido = true;
 var a = this.cep();
  if (a.obterValor().length < 9) {
  this.incompleto = a.elemento;
  this.eValido = false;
  }
 };
 
 this.validarLogradouro = function () {
  if (this.eValido) {
  var a = this.logradouro();
   if (a.isEmpty()) {
   this.incompleto = a.elemento;
   this.eValido = false;
   }
  }
 };
 
 this.validarNumero = function () {
  if (this.eValido) {
  var a = this.numero();
   if (a.isEmpty()) {
   this.incompleto = a.elemento;
   this.eValido = false;
   }
  }
 };
 
 this.validarBairro = function () {
  if (this.eValido) {
  var a = this.bairro();
   if (a.isEmpty()) {
   this.incompleto = a.elemento;
   this.eValido = false;
   }
  }
 };
 
 this.validarCidade = function () {
  if (this.eValido) {
  var a = this.cidade();
   if (a.isEmpty()) {
   this.incompleto = a.elemento;
   this.eValido = false;
   }
  }
 };
 
 this.validarUf = function () {
  if (this.eValido) {
  var a = this.uf();
   if (a.isEmpty()) {
   this.incompleto = a.elemento;
   this.eValido = false;
   }
  }
 };
 
 this.isOk = function () {
 this.validarCep();
 this.validarLogradouro();
 this.validarNumero();
 this.validarBairro();
 this.validarCidade();
 this.validarUf();
 return this.eValido;
 };
 
 this.limpar = function () {
 this.form.getElement("logradouro").limpar();
 this.form.getElement("numero").limpar();
 this.form.getElement("complemento").limpar();
 this.form.getElement("bairro").limpar();
 this.form.getElement("cidade").limpar();
 this.form.getElement("uf").limpar();
 };
 
 this.set = function (e) { 
 this.form.valueFor("logradouro",e.logradouro);
 this.form.valueFor("complemento",e.complemento);
 this.form.valueFor("bairro",e.bairro);
 this.form.valueFor("cidade",e.localidade);
 this.form.valueFor("uf",e.uf);
 };
}