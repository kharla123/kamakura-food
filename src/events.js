//Intenta separar los eventos en este archivo.
// //Intenta separar los eventos en este archivo.
import { pintaFiltros, pintaProductos } from "./menu.js";
import { inicializarBusqueda } from "./searcher.js";
import { inicializarRecibo } from "./receipt.js";
import { products   } from "../assets/data/data.js";

export function inicializarEventos() {
    console.log("Inicializando todos los módulos de la aplicación...");

    pintaProductos(products); // Mostrar todos los productos al cargar la página
    
    // Ejecutar componentes principales
    pintaFiltros();
    inicializarRecibo();
    inicializarBusqueda();
}

// Asegurar que el DOM esté listo antes de ejecutar código del DOM
document.addEventListener("DOMContentLoaded", () => {
    inicializarEventos();
});
