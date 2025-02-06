class Data {
 constructor(d,m,a) {
 this.dt = new Date(a,m-1,d);
 this.isValid = false;
 var x = (this.dt.getFullYear() == a);
 var y = (m >= 1) && (m <= 12) && ((this.dt.getMonth()+1) == m);
 var z = (d >= 1) && (d <= 31) && (this.dt.getDate() == d);
  if (x && y && z) {
  this.isValid = true;
  }
 }
 ano() {
 return this.dt.getFullYear();
 }
 mes() {
 return this.dt.getMonth() + 1;
 }
 nomedomes() {
 var n = ['janeiro','fevereiro','março','abril',
          'maio','junho','julho','agosto',
		  'setembro','outubro','novembro','dezembro'];
 return n[this.dt.getMonth()];
 }
 diadomes() {
 return this.dt.getDate();
 }
 diadasemana() {
 return this.dt.getDay();
 }
 nomedodiadasemana() {
 var n = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
 return n[this.diadasemana()];
 }
 add_dia(i) {
 var d = this.diadomes() + i;
 var e = new Data(d,this.mes(),this.ano());
 return e;
 }
 add_mes(i) {
 var m = this.mes() + i;
 var e = new Data(this.diadomes(),m,this.ano());
 return e;
 }
 add_ano(i) {
 var a = this.ano() + i;
 var e = new Data(this.diadomes(),this.mes(),a);
 return e;
 }
 toS() {
 var d = {'diadasemana':this.diadasemana(),
          'diadomes':this.diadomes(),
		  'mes':this.mes(),
		  'ano':this.ano()}
 return JSON.stringify(d);
 }
}

function Calendario() {
 this.semana = function (data) {
 var s = new Array(); 
 var dt = data.add_dia(0 - data.diadasemana());
  while (s.length < 7) {
  s.push(dt);
  dt = dt.add_dia(1);
  }
 return s;
 }
}

function get_dias(c) {
var d = new Array();
 for (i = 0; i < 31; i++) {
 var f = i+1;
 d.push(f+"");
 }
var e = new TagLista2(d,c);
return e;
}

function get_meses(c) {
var d = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
         'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
var e = new TagLista2(d,c);
return e;
}

function esteano() {
var a = new Date();
return parseInt(a.getFullYear());
}

var decada = {
 avancar: function () {
 var a = this.selecionada + 10;
  if (a < esteano()) {
  this.selecionada = a;
  this.get_anos();
  this.elemento.focus();
  }
 },
 voltar: function () {
 this.selecionada -= 10;
 this.get_anos();
 this.elemento.focus();
 },
 get_anos: function () {
 this.elemento.innerText = "";
 var o = new_element("option","value=0");
 o.innerText = "Ano";
 this.elemento.appendChild(o);
 var i;
  for (i = 0; i < 10; i++) {
  var n = this.selecionada + i;
  var p = new_element("option");
  p.innerText = n;
  this.elemento.appendChild(p);
   if (n == esteano()) {
   i = 10;
   }
  }
 }
};