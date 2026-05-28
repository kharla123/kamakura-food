//Intenta separar los eventos en este archivo.
import { pintaFiltros, pintaProductos } from "./menu.js";
import { inicializarBusqueda } from "./searcher.js";
import { inicializarRecibo } from "./receipt.js";
import { products   } from "../assets/data/data.js";

function inicializarToggleCarrito() {
    const botonCarrito = document.getElementById("cart");
    const contenedorCarrito = document.getElementById("cart-container");

    if (!botonCarrito || !contenedorCarrito) return;

    botonCarrito.addEventListener("click", () => {
        const estaOculto = getComputedStyle(contenedorCarrito).display === "none";
        contenedorCarrito.style.display = estaOculto ? "flex" : "none";
    });
}

export function inicializarEventos() {
    console.log("Inicializando todos los módulos de la aplicación...");

    pintaProductos(products); 
    
    
    pintaFiltros();
    inicializarRecibo();
    inicializarBusqueda();
    inicializarToggleCarrito();
}


document.addEventListener("DOMContentLoaded", () => {
    inicializarEventos();
});

