class Articulo {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

const articulos = [
    new Articulo("Pantalón jeans", 2000),
    new Articulo("Pantalón de vestir", 2500),
    new Articulo("Remera", 900),
    new Articulo("Buzo", 1200),
    new Articulo("Camisa", 1600),
    new Articulo("Medias", 300),
]
//Variables globales a inicializar.
let articulosSeleccionados = inicializarArticulosSeleccionados();
const descuentosFinales = [];
let descuentoTotal = 0;
let preciosSinDescuento = 0;

//Esta función analiza si hay elementos guardados en el almacenamiento local al cargar la página, si hay más de dos elementos guardados vacía el Local Storage para evitar bug; de lo contrario pushea al array articulosSeleccionados esos artículos o devuelve un array vacío.
function inicializarArticulosSeleccionados() {
    const articulosStorage = localStorage.getItem("articulos_seleccionados");
    const articulosParsed = JSON.parse(articulosStorage);
    if (articulosParsed != null && articulosParsed.length > 2) {
        localStorage.removeItem("articulos_seleccionados")
    }
    return articulosParsed != null ? articulosParsed : [];

};

//Esta función pushea los artículos seleccionados al array articulosSeleccionados y lo almacena en el Local Storage.
function añadirArticulo(x) {
    articulosSeleccionados.push(x);
    const articulosStorage = JSON.stringify(articulosSeleccionados);
    localStorage.setItem("articulos_seleccionados", articulosStorage);
};

//Esta función obtiene del array articulos el artículo seleccionado, lo agrega al array articulosSeleccionados y activa la función agregarAListaSeleccionados. A su vez cuando el length de dicho array es 3 calcula el descuento total y le muestra al cliente el descuento total y el precio a pagar a través de un modal.
function obtenerArticulo(nombreArticulo) {
    const articulo1 = articulos.find(articulo => articulo.nombre == nombreArticulo);
    añadirArticulo(articulo1);
    agregarAListaDeSeleccionados(articulo1)
    const calcularDescuento = articulosSeleccionados.length == 3 ? true : false;
    if (calcularDescuento) {
        obtenerPrecio();
        document.getElementById("modal-calculadora").innerText = `El descuento total será $ ${descuentoTotal} y el pago total $ ${preciosSinDescuento - descuentoTotal}`
        var modal1 = new bootstrap.Modal(document.getElementById('modal'));
        modal1.toggle();
        localStorage.removeItem("articulos_seleccionados");
        articulosSeleccionados = [];
        setTimeout(() => {
            document.getElementById("lista_articulos").innerHTML = "";
        }, 3000);
    }
}

//Esta función manipula el DOM para ir mostrando al cliente los artículos que selecciona.
function agregarAListaDeSeleccionados(articulo) {
    const li = document.createElement("li");
    li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-start");

    const div = document.createElement("div");
    div.setAttribute("class", "ms-2 me-auto");

    const divBold = document.createElement("div");
    divBold.setAttribute("class", "fw-bold");

    divBold.textContent = articulo.nombre;

    div.appendChild(divBold);
    div.appendChild(document.createTextNode(`$ ${articulo.precio}`));
    li.appendChild(div);

    const ol = document.getElementById("lista_articulos");

    ol.appendChild(li);
}

//Esta función le muestra visualmente al cliente que se seleccionó el artículo correctamente.
function agregadoCorrectamente(botonId) {
    document.getElementById(botonId).setAttribute("class", "btn btn-success btn-lg");
    setTimeout(() => {
        document.getElementById(botonId).setAttribute("class", "btn btn-primary btn-lg");
    }, 1000);
    Swal.fire({
        position: 'bottom-end',
        width: '300px',
        icon: 'success',
        title: 'Agregado correctamente',
        showConfirmButton: false,
        timer: 1500
    })
}

//Manejadores de eventos.
document.getElementById("btn-jeans").addEventListener("click", () => {
    obtenerArticulo("Pantalón jeans");
    agregadoCorrectamente("btn-jeans");
})

document.getElementById("btn-vestir").addEventListener("click", () => {
    obtenerArticulo("Pantalón de vestir");
    agregadoCorrectamente("btn-vestir");
})

document.getElementById("btn-remera").addEventListener("click", () => {
    obtenerArticulo("Remera");
    agregadoCorrectamente("btn-remera");
})

document.getElementById("btn-buzo").addEventListener("click", () => {
    obtenerArticulo("Buzo");
    agregadoCorrectamente("btn-buzo");
})

document.getElementById("btn-camisa").addEventListener("click", () => {
    obtenerArticulo("Camisa");
    agregadoCorrectamente("btn-camisa");
})

document.getElementById("btn-medias").addEventListener("click", () => {
    obtenerArticulo("Medias");
    agregadoCorrectamente("btn-medias");
})

articulosSeleccionados.forEach(element => {
    agregarAListaDeSeleccionados(element);
});

//Esta función crea un nuevo array con los precios de los precios del array articulosSeleccionados y le aplica los descuentos indicados en el HTML: 10% al primero, 20% al segundo y 30% al tercero (iterando sobre el nuevo array). A la vez calcula el descuento total y cuánto se pagaría sin descuento.
const obtenerPrecio = () => {
    const preciosSeleccionados = articulosSeleccionados.map(art => art.precio);
    console.log(preciosSeleccionados);
    preciosSeleccionados.forEach((art, i) => {
        let descuentos = 0;
        descuentos += Math.round(0.1 * (i + 1) * art);
        descuentosFinales.push(descuentos);
    });

    descuentosFinales.forEach((descuento) => {

        descuentoTotal += descuento;
    })

    preciosSeleccionados.forEach((precio) => {
        preciosSinDescuento += (precio);
    })
}

console.log(descuentosFinales);

const jasonPlaceHolder = "https://jsonplaceholder.typicode.com/users";
const ulMails = document.getElementById("ulMails");

fetch(jasonPlaceHolder)
    .then(response => response.json())
    .then((datos) => {
        const arrayColaboradores = datos.slice(0, 3);
        mostrarColaboradores(arrayColaboradores);
    })
    .catch(error => console.log(error));
    
function mostrarColaboradores(arrayColaboradores) {
        arrayColaboradores.forEach(colaborador => {
        const li = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.setAttribute("href", `mailto:${colaborador.email}`);
        anchor.setAttribute("class", "anchor");
        anchor.textContent = `${colaborador.name}`;
        li.appendChild(anchor);
        ulMails.appendChild(li);
    })
}