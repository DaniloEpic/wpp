function verificar(f) {
camposFaltando = new Array();
 for (i = 0; i < f.length; i++) {
  if (f.elements[i].getAttribute("required") == "true") {
  str = f.elements[i].value;
   if (str == "" || str.split(" ")[0].length == 0) {
   camposFaltando.push(f.elements[i]);
   }
  }
 }
 if (camposFaltando.length == 0) {
 return true;
 }
 else {
  for (j = 0; j < camposFaltando.length; j++) {
  camposFaltando[j].style.backgroundColor = "deeppink";
  }
  alert("Campos de preenchimento obrigatório!");
  for (j = 0; j < camposFaltando.length; j++) {
  camposFaltando[j].style.backgroundColor = "";
  }
 return false;
 }
}

function frm_validate(f) {
c = new Array();
 for (i = 0; i < f.elements.length; i = i + 1) {
  if (f.elements[i].getAttribute("required") == "1") {
  str = f.elements[i].value;
   if (str.length == 0 || str.split(" ")[0].length == 0) {
   c.push(f.elements[i]);
   }
  }
 }
 if (c.length == 0) {
 f.submit();
 }
 else {
  for (j = 0; j < c.length; j = j + 1) {
  c[j].style.backgroundColor = "tomato";
  }
  alert("Campos de preenchimento obrigatório!");
  for (j = 0; j < c.length; j = j + 1) {
  c[j].style.backgroundColor = "";
  }
  c[0].focus();
 }
}

function check_frm(f) {
c = new Array();
 for (i = 0; i < f.elements.length; i = i + 1) {
  if (f.elements[i].getAttribute("required") == "1") {
  str = f.elements[i].value;
   if (str.length == 0 || str.split(" ")[0].length == 0) {
   c.push(f.elements[i]);
   }
  }
 }
 if (c.length > 0) {
  for (j = 0; j < c.length; j = j + 1) {
  c[j].style.backgroundColor = "tomato";
  }
 alert("Campos de preenchimento obrigatório!");
  for (j = 0; j < c.length; j = j + 1) {
  c[j].style.backgroundColor = "";
  }
 c[0].focus();
 }
return (c.length == 0);
}

function campos_requeridos(f) {
s = "";
 for (i = 0; i < f.elements.length; i = i + 1) {
  if (f.elements[i].getAttribute("required") == "1") {
   if (s.length > 0) {
   s += ",";
   }
  s += f.elements[i].getAttribute("name");
  }
 }
return s;
}

function remover_espaco(str) {
k = str.indexOf(" ");
if (k != -1) {
p1 = str.split(" ")[0];
t = str.length;
p2 = str.substr(k+1,t-k);
str = p1+p2;
}
return str;
}

function remover_espacos(str) {
k = str.indexOf(" ");
if (k != -1) {
p1 = str.split(" ")[0];
t = str.length;
p2 = str.substr(k+1,t-k);
str = remover_espacos(p1+p2);
}
return str;
}

function get_not_null(frm) {
s = "";
 for (i = 0; i < frm.elements.length; i++) {
 cam = frm.elements[i];
 noc = cam.getAttribute("name");
  if (noc) {
   if (cam.value.length > 0) {
    if (s.length > 0) {
	s += "&";
	}
   s += noc+"="+encodeURIComponent(cam.value);
   }
  }
 }
return s;
}

function frm_to_json(g) {
s = "";
 for (i = 0; i < g.elements.length; i++) {
 cm = g.elements[i];
 nc = cm.getAttribute("name");
  if (nc) {
   if (cm.value.length > 0) {
    if (s.length > 0) {
    s += ",";
    }
   s += "\""+nc+"\" : \""+cm.value+"\"";
   }
  }
 }
s = "{"+s+"}";
return s;
}

function check_email(e) {
pu = e.indexOf('@');
val = (pu > 0 && (pu + 1 < e.length));
return val;
}

function MyForm(x) {
this.formulario = x;
this.isValid;
this.whatIsYourProblem;
 
 this.validate = function () {
 this.isValid = true;
 };
 
 this.send = function () {
  if (this.isValid) {
  this.formulario.submit();
  }
  else {
  this.whatIsYourProblem();
  }
 };
 
 this.fromObject = function (o,attrs) {
 var at = attrs.split(",");
 var i;
  for (i = 0; i < at.length; i++) {
  this.formulario[at[i]].value = o[at[i]];
  }
 };
 
 this.getFormField = function (n) {
 return this.formulario[n];
 };
 
}

function Elfo(q) {
this.elemento = q;
this.nome = q.name;
 
 this.definirValor = function (v) {
 this.elemento.value = v;
 };
 
 this.obterValor = function () {
 return this.elemento.value.trim();
 };
 
 this.queryString = function () {
 var v = this.obterValor();
 var s = "";
  if (v.length > 0) {
  s += this.nome+"="+v;
  }
 return s;
 };
 
 this.quest = function () {
 var v = this.obterValor();
 var s = "";
  if (v.length > 0) {
  s += this.nome+"="+encodeURIComponent(v);
  }
 return s;
 };
 
 this.isEmpty = function () {
 var c = this.obterValor();
 return (c.length == 0);
 };
 
 this.limpar = function () { 
 this.definirValor("");
 };
 
 this.jsonVal = function () {
 var s = "\""+this.nome+"\":";
 var v = this.obterValor();
 var p = v.indexOf("{");
  if (p === 0) {
  s += v;
  }
  else {
  s += "\""+v+"\"";
  }
 return s;
 };

}

function FakeForm() {
this.elementos = new SequentialLinkedList();
 
 this.addElement = function (m) {
 var n = new Elfo(m);
 this.elementos.set(n,"nome");
 };
 
 this.getElement = function (m) {
 var e = this.elementos.get("nome",m).elemento;
 return e;
 };
 
 this.valueFor = function (m,n) {
 var e = this.getElement(m);
 e.definirValor(n);
 };
 
 this.data = function () {
 var i;
 var n = this.elementos.primeiro;
 var s = "";
  for (i = 0; i < this.elementos.tamanho; i++) {
  var q = n.elemento.queryString();
   if (q.length > 0) {
    if (s.length > 0) {
    s += "&";
    }
   s += q;
   }
  n = n.sucessor;
  }
 return s;
 };
 
 this.query_string_data = function (d) {
 var a = this.getElement(d);
 return a.quest();
 };
 
 this.dataManager = function (q) {
 this.datamanager = q.data;
 };
 
 this.fromDM = function (m) {
 this.valueFor(m,this.datamanager[m]);
 };
 
 this.json = function () {
 var s = ""; 
 var e = this.elementos.primeiro;
 var i;
  for (i = 0; i < this.elementos.tamanho; i++) {
   if (s.length > 0) {
   s += ",";
   }
  s += e.elemento.jsonVal();
  e = e.sucessor;
  }
 s = "{"+s+"}";
 return s;
 };

}

function onEnter(e) {
var a = e.getAttribute('onEnter');
 if (a) { 
 e.onkeydown = function (x) { 
  if (x.keyCode == 13) {
  eval(a);
  }
 };
 }
}

// <input type="text" onkeypress="apenas_numeros()"/>
function apenas_numeros() {
var k = parseInt(event.key);
 if (isNaN(k)) {
 event.preventDefault();
 }
 else {
 return true;
 }
}

// <input type="text" maxlength="9" onkeypress="apenas_numeros()" onkeyup="traduzir_para_cep()"/>
function traduzir_para_cep() {
var e = event.target;
var v = e.value;
var m = isNaN(event.key);
 if ((v.length == 8) && (m === false) && (v.indexOf('-') < 0)) {
 var o = translate(v,"5:-");
 e.value = o;
 }
};

// <input type="text" maxlength="14" onkeypress="apenas_numeros()" onkeyup="traduzir_para_cpf()"/>
function traduzir_para_cpf() {
var e = event.target;
var v = e.value;
var u = v.replace(/\./g,"");
var w = u.replace("-","");
 if (v.length == 11) {
  if (cpf_valido() == false) {
  e.value = translate(v,"3:.,3:.,3:-");
  var cpfval = new CPF(v);
  validar_cpf(cpfval.eValido(),true);
  }
 }
 if (v.length > 11) {
  if ((v.length == 14) && (cpf_valido() == false)) {
  var cpfval = new CPF(w);
  validar_cpf(cpfval.eValido(),true);
  }
  if (v.length < 14) {
  validar_cpf(false,false);
  e.value = w;
  traduzir_para_cpf();
  }
 }
}

function traduzir_para_cnpj() {
var e = event.target;
var v = e.value;
var u = v.replace(/\./g,"");
u = u.replace("/","");
u = u.replace("-","");
 if (v.length == 14) {
 var o = translate(v,"2:.,3:.,3:/,4:-");
 e.value = o;
 //validar_cnpj()
 }
 if (v.length > 14) {
  if (v.length == 18) {
  // validar_cnpj()
  }
  if (v.length < 18) {
  // invalidar_cnpj()
  e.value = u;
  traduzir_para_cnpj();
  }
 }
};

function traduzir_para_data() {
var e = event.target;
var v = e.value;
var u = v.replace(/\//g,"");
 if (v.length == 8) {
 e.value = translate(v,"2:/,2:/");
 //validar_data();
 }
 if (v.length > 8) {
  if (v.length == 10) {
  //validar_data();
  }
  if (v.length < 10) {
  //invalidar_data();
  e.value = u;
  traduzir_para_data();
  }
 }
}

function traduzir_para_telefone() {
var e = event.target;
var v = e.value;
u = v.replace("(","");
u = u.replace(")","");
u = u.replace("-","");
 if (v.length == 10) {
 e.value = translate(v,"0:(,2:),4:-");
 }
 if (v.length == 11) {
 e.value = translate(v,"0:(,2:),5:-");
 }
 if (v.length >= 12) {
 e.value = u;
 traduzir_para_telefone();
 }
}