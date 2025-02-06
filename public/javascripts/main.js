Wpp = new UserInterface();

//var Wpp;

//Wpp.init = function () {
//this.form('f-one');
//};

Wpp.queryString = function () {
var s = "api.whatsapp.com/send/?";
s += "phone=55"+this.formulario.telefone.value;
s += "&text="+encodeURIComponent(this.formulario.mensagem.value);
return s;
};

function getQuery() {
var a = Wpp.queryString();
navigator.clipboard.writeText(a);
}


function init() {
var g = document.forms['f-one'];
Wpp.formulario = g;
g.sB.onclick = function () { getQuery(); };
}

init();