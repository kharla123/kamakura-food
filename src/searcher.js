//DEBE buscar los productos por los filtros
import { products } from "../assets/data/data.js";
import { pintaProductos } from "./menu.js";

const inputBusqueda = document.getElementById("search-input");

export function inicializarBusqueda() {
    if (!inputBusqueda) return;

    inputBusqueda.addEventListener("input", (evento) => {
        const textoUsuario = evento.target.value.toLowerCase();

        const productosFiltrados = products.filter((producto) => 
            producto.name.toLowerCase().includes(textoUsuario)
        );

        pintaProductos(productosFiltrados);
    });
}

inicializarBusqueda();
