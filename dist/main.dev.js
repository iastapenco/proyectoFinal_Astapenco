"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Articulo = function Articulo(nombre, precio) {
  _classCallCheck(this, Articulo);

  this.nombre = nombre;
  this.precio = precio;
};

var articulos = [new Articulo("pantalón jeans", 2000), new Articulo("pantalón de vestir", 2500), new Articulo("remera", 900), new Articulo("buzo", 1200), new Articulo("camisa", 1600), new Articulo("medias", 300)];
var articulosSeleccionados = [];
var descuentosFinales = [];
var descuentoTotal = 0;
var preciosSinDescuento = 0;

function inicializarArticulosSeleccionados() {
  var articulosStorage = localStorage.getItem("articulos_seleccionados");
  var articulosParsed = JSON.parse(articulosStorage);
}

function añadirArticulo(x) {
  articulosSeleccionados.push(x);
  var articulosStorage = JSON.stringify(articulosSeleccionados);
  localStorage.setItem("articulos_seleccionados", articulosStorage);
}

;

function obtenerArticulo(nombreArticulo) {
  var articulo1 = articulos.find(function (articulo) {
    return articulo.nombre == nombreArticulo;
  });
  añadirArticulo(articulo1);
  var calcularDescuento = articulosSeleccionados.length == 3 ? true : false;

  if (calcularDescuento) {
    obtenerPrecio();
    document.getElementById("modal-calculadora").innerText = "El descuento total ser\xE1 $ ".concat(descuentoTotal, " y el pago total $ ").concat(preciosSinDescuento - descuentoTotal);
    var modal1 = new bootstrap.Modal(document.getElementById('modal'));
    modal1.toggle();
    localStorage.removeItem("articulos_seleccionados");
  }
}

document.getElementById("btn-jeans").addEventListener("click", function () {
  obtenerArticulo("pantalón jeans");
  document.getElementById("btn-jeans").setAttribute("class", "btn btn-success btn-lg");
});
document.getElementById("btn-vestir").addEventListener("click", function () {
  obtenerArticulo("pantalón de vestir");
  document.getElementById("btn-vestir").setAttribute("class", "btn btn-success btn-lg");
});
document.getElementById("btn-remera").addEventListener("click", function () {
  obtenerArticulo("remera");
  document.getElementById("btn-remera").setAttribute("class", "btn btn-success btn-lg");
});
document.getElementById("btn-buzo").addEventListener("click", function () {
  obtenerArticulo("buzo");
  document.getElementById("btn-buzo").setAttribute("class", "btn btn-success btn-lg");
});
document.getElementById("btn-camisa").addEventListener("click", function () {
  obtenerArticulo("camisa");
  document.getElementById("btn-camisa").setAttribute("class", "btn btn-success btn-lg");
});
document.getElementById("btn-medias").addEventListener("click", function () {
  obtenerArticulo("medias");
  document.getElementById("btn-medias").setAttribute("class", "btn btn-success btn-lg");
});
console.log(articulosSeleccionados);

var obtenerPrecio = function obtenerPrecio() {
  var preciosSeleccionados = articulosSeleccionados.map(function (art) {
    return art.precio;
  });
  console.log(preciosSeleccionados);
  preciosSeleccionados.forEach(function (art, i) {
    var descuentos = 0;
    descuentos += Math.round(0.1 * (i + 1) * art);
    descuentosFinales.push(descuentos);
  });
  descuentosFinales.forEach(function (descuento) {
    descuentoTotal += descuento;
  });
  preciosSeleccionados.forEach(function (precio) {
    preciosSinDescuento += precio;
  });
};

console.log(descuentosFinales);