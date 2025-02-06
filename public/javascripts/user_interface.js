function Resource(name,url) {
this.name = name;
this.url = url;
this.requestedBy = {'script':'','method':''};

 this.requested_by = function (s,m) {
 this.requestedBy.script = s;
 this.requestedBy.method = m;
 };
 
 this.to_s = function () {
 var p = this.requestedBy.script+"\t";
 p += this.name+"\t";
 p += this.requestedBy.method+"\t";
 p += this.url;
 return p;
 };
}

function UIContainer(n) {
this.name = n;
this.container = new Container(byId(n));
 this.none = function () {
 this.container.display("none");
 };
 this.block = function () { 
 this.container.display("block");
 };
}

function Contexto() {
this.ws = {};
this.app = {};
this.ui = {};
this.ws.providers = new SequentialLinkedList();

 this.ws.resourceProvidedBy = function (c) {
 var d = c.split(">");
 var e = new Resource(d[1],d[3]);
 e.requested_by(d[0],d[2]);
 this.providers.set(e,'name');
 };
 
 this.ws.addProvider = function (m,n) {
 var b = new Resource(m,n);
 this.providers.set(b,'name');
 };
 
 this.ws.getProvider = function (m) {
 var e = this.providers.get('name',m);
 return e.elemento;
 };
 
 this.ws.getProviders = function () {
 var s = "";
 var a = this.providers.primeiro;
  while (a)  {
  s += a.elemento.to_s()+"\n";
  a = a.sucessor;
  }
 return s;
 };
 
 this.ui.containers = new SequentialLinkedList();
 this.ui.setContainer = function (g) {
 this.containers.set(g,'name');
 };
 
 this.ui.getContainer = function (m) {
 var o = this.containers.get('name',m);
 return o.elemento.container;
 };

 this.setException = function (m) {
 this.app.exception = m;
 };
 
 this.getException = function () { 
 return this.app.exception;
 };
 
 this.hasException = function () {
 return (this.app.exception != null);
 };
 
 this.unsetException = function () {
 this.app.exception = null;
 };

}

function UserInterface() {
this.feedback = new UIFeedback();
 
 this.setContexto = function (o) {
 this.exception = new UIException(o);
 this.contexto = o;
 };

 this.setContainer = function (k) {
 var p = new Container(byId(k));
 this.feedback.setContainer(p);
 this.exception.setContainer(p);
 this.container = p;
 };
 
 this.form = function (a) {
 this.formulario = document.forms[a];
 return this.formulario;
 };

 this.unsetException = function () {
  if (this.contexto.hasException()) {
  this.exception.hideMessage();
  }
 };
 
 this.output = function (o,p) { 
 this.container.setContent(p,o[p]);
 };
 
 this.init_tabela = function () { 
 this.tabela = new FakeTable();
 var m = this.tableString.split(",");
 this.tabela.tableElement(this.container.get(m[0]));
 this.tabela.set_row_element(m[1]);
 this.tabela.set_template(m[2]);
 };
 
 this.paginas = function (q) { 
 this.paginador = new Paginador(q);
 var o = this;
 this.paginador.set_data = function () { o.init_tabela(); };
 };

}

function UIException(contexto) {
this.contexto = contexto;
 
 this.set = function (elemento) {
 this.container = new Container(elemento);
 var m = this.container.get("message");
 m.elemento.innerHTML = contexto.app.exception;
 };
 
 this.setContainer = function (c) {
 this.elemento = c.get("exception");
 };
 
 this.showMessage = function () {
 this.elemento.setContent("message",this.contexto.getException());
 this.elemento.display("block");
 window.scrollTo(0,this.elemento.offsetTop);
 };
 
 this.show = function () {
 var m = this.elemento.get('message');
 m.text(this.contexto.getException());
 this.elemento.display("inline");
 };
 
 this.hideMessage = function () {
 this.contexto.unsetException();
 this.elemento.display("none");
 };
 
 this.mostrar = function () {
 this.container.display("block");
 };
 
 this.excluir = function () { 
 this.contexto.app.exception = null;
 this.container.display("none");
 };

}

function UIFeedback() {
 this.setContainer = function (c) {
 this.elemento = c.get("feedback");
 };
 this.start = function () { 
 this.elemento.display("block");
 };
 this.stop = function () { 
 this.elemento.display("none");
 };
}

function Janela(n) {
this.nome = n;
 this.setURL = function (u) {
 this.url = u;
 };
 this.setSize = function (w,h) {
 this.width = w;
 this.height = h;
 this.left = (screen.availWidth / 2) - (w / 2);
 this.top = (screen.availHeight / 2) - (h / 2);
 };
 this.abrir = function () {
 this.janela_aberta = open(this.url,this.nome,"width="+this.width+",height="+this.height+",left="+this.left+",top="+this.top);
 };
 this.fechar = function () {
 this.janela_aberta.close(); 
 };
}

function proximaPagina() {
application.paginador.next();
}

function paginaAnterior() {
application.paginador.previous();
}

function primeiraPagina() {
application.paginador.first();
}

function ultimaPagina() {
application.paginador.last();
}

function irPara(b) {
application.paginador.goTo(b);
}

function mostrarTodos() {
application.paginador.all();
}

function ir_para_pagina() {
var p = prompt("Ir para a página: ","");
var m = parseInt(p);
 if (!isNaN(m)) {
  if (m > 0) {
  irPara(m);
  }
 }
}

var menu = {
 set_frame : function (f) {
 var g = byId(f);
 g.onclick = function () {
 menu.hide();
 };
 this.frame = new Container(g);
 this.frame.display("none");
 },
 show : function (a) {
 var c = new Container(a.parentNode);
 this.itens = c.get("itens");
 this.frame.display("block");
 this.itens.display("block");
 },
 hide : function () {
 this.itens.display("none");
 this.frame.display("none");
 }
};

function Menu() {
 
 this.setFrame = function (c) {
 var d = byId(c);
 d.onclick = function () {
 application.menu.hide();
 };
 this.frame = new Container(d);
 this.frame.display("none");
 };
 
 this.bar = function (b) {
 var c = new Container(byId(b));
 this.itens = c.get("itens");
 };
 
 this.mostrar = function () { 
 this.frame.display("block");
 this.itens.display("block");
 };
 
 this.show = function (a) {
 var p = new Container(a.parentNode);
 this.itens = p.get("itens");
 this.frame.display("block");
 this.itens.display("block");
 };
 
 this.hide = function () {
 this.itens.display("none");
 this.frame.display("none");
 };
 
};

var camada = {
 
 bg: function (i) {
 var j = byId(i);
 j.onclick = function () {
 camada.ocultar(); 
 };
 this.frame = new Container(j);
 this.frame.display("none");
 },
 
 fg: function (i) {
 this.elemento = new Container(byId(i));
 },
 
 exibir: function () {
 this.frame.display("block");
 this.elemento.display("block");
 },
 
 ocultar: function () {
 this.elemento.display("none");
 this.frame.display("none");
 },
 
 when: function (q) {
 this.ocultar();
  if (q) {
  this.exibir();
  }
 }

};

function Selecao(n) {
this.name = n;
this.container = new Container(byId(n));
var s = this.container.get("selecionado");
s.display("none");
this.itemSelecionado = s;
this.itemSelecionavel = this.container.get("selecionavel");
this.botaoLimpar = this.itemSelecionado.get("limpar").elemento;
 
 this.selecionar = function (a) {
 this.itemSelecionado.setContent("valor",a);
 this.itemSelecionavel.display("none");
 this.itemSelecionado.display("inline");
 };
 
 this.limpar = function () {
 this.itemSelecionado.display("none");
 this.itemSelecionavel.display("inline");
 this.itemSelecionado.setContent("valor","");
 };
 
};

function Validator() {
	
 this.check = function (n) {
 this.isValid = n;
 };
 
 this.isOk = function () { 
 return (this.isValid == true);
 };
 
 this.focus_on = function (e) {
  if (this.focusOn == false) {
  this.focusOn = e;
  }
 };
 
 this.focus = function () {
  if (this.focusOn) {
  this.focusOn.focus();
  }
 };
  
};

function Contador(m) {
this.mostrador = m;
 this.iniciarEm = function (m) {
 this.iniciar_em = parseInt(m);
 };
 this.mostrar = function (q) {
 this.mostrador.text(q);
 };
 this.decrementar = function (n) {
 var q = this.iniciar_em - n;
 this.mostrar(q);
 };
};

function Peekaboo(a) {
var pkb = {'container': new Container(byId(a))};
 
 pkb.init = function () {
 var i = this.container.get('hitens');
 this.itens = i.elemento;
 this.showButton = this.container.get('sb');
 this.hideButton = this.container.get('hb');
 this.hidden = true;
 };
 
 pkb.hide = function () {
 this.itens.style.visibility = "hidden";
 this.hideButton.hide();
 this.hidden = true;
 this.trocar();
 };
 
 pkb.show = function () {
 this.itens.style.visibility = "visible";
 this.showButton.hide();
 this.hidden = false;
 this.trocar();
 };
 
 pkb.trocar = function () {
  if (this.hidden) {
  this.showButton.display("inline-block");
  }
  else {
  this.hideButton.display("inline-block");
  }
 };

pkb.init();
 pkb.showButton.elemento.onclick = function () {
 pkb.show();
 };
 pkb.hideButton.elemento.onclick = function () { 
 pkb.hide();
 };
pkb.hide();
}

function Peekaboo2(a) {
var pkb = {'container': new Container(byId(a))};
 
 pkb.init = function () {
 var i = this.container.get('hitens');
 this.itens = i.elemento;
 this.showButton = this.container.get('sb');
 this.hideButton = this.container.get('hb');
 this.hidden = true;
 };
 
 pkb.hide = function () {
 this.itens.style.display = "none";
 this.hideButton.hide();
 this.hidden = true;
 this.trocar();
 };
 
 pkb.show = function () {
 this.itens.style.display = "block";
 this.showButton.hide();
 this.hidden = false;
 this.trocar();
 };
 
 pkb.trocar = function () {
  if (this.hidden) {
  this.showButton.display("inline-block");
  }
  else {
  this.hideButton.display("inline-block");
  }
 };
 
 pkb.init();
 pkb.showButton.elemento.onclick = function () {
 pkb.show();
 };
 
 pkb.hideButton.elemento.onclick = function () { 
 pkb.hide();
 };
 
pkb.hide();
return pkb;
}

function Peekaboo3(e) { 
var m = new Container(byId(e));
this.itens = m.get('hitens');
this.sButton = m.get('sb');
this.hButton = m.get('hb');
this.esconder = true;
 
 this.hide = function () { 
 this.itens.display("none");
 this.hButton.display("none");
 this.esconder = true;
 this.trocar();
 };
 
 this.show = function () { 
 this.itens.display("block");
 this.sButton.display("none");
 this.esconder = false;
 this.trocar();
 };
 
 this.trocar = function () {
  if (this.esconder) {  
  this.sButton.display("inline-block");
  }
  else {
  this.hButton.display("inline-block");
  }
 };
}

function Peekaboo4(e) {
this.itens = e.get('hitens');
this.sButton = e.get('sb');
this.hButton = e.get('hb');
this.esconder = true;
 
 this.hide = function () { 
 this.itens.display("none");
 this.hButton.display("none");
 this.esconder = true;
 this.trocar();
 };
 
 this.show = function () { 
 this.itens.display("block");
 this.sButton.display("none");
 this.esconder = false;
 this.trocar();
 };
 
 this.trocar = function () {
  if (this.esconder) {  
  this.sButton.display("inline-block");
  }
  else {
  this.hButton.display("inline-block");
  }
 };
}

function click2hide(p) {
p.sButton.elemento.onclick = function () { p.show(); };
p.hButton.elemento.onclick = function () { p.hide(); };
p.hide();
}

function click2Switch(p,s) {
p.sButton.elemento.onclick = function () {
event.stopPropagation();
p.show();
 if (s.selecionado) {
 s.selecionado.hide();
 }
s.selecionado = p;
};
 p.hButton.elemento.onclick = function () {
 p.hide();
 s.selecionado = null;
 };
p.hide();
}

class Menugroup {
 constructor() {
 this.selecionado = null;
 }
 close() {
  if (this.selecionado) {
  this.selecionado.hide();
  this.selecionado = null;
  }
 }
}