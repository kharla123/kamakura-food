//DEBE imprimir en pantalla la información de filtros.
import { filters, products } from "../assets/data/data.js";
import { agregarAlCarrito } from "./cart.js";

//DEBE imprimir en pantalla los productos, con su Título, descripción y precio en € y botón de añadir.
const contenedorFiltros = document.getElementById("filters");
const contenedorProductos = document.getElementById("products");

export function pintaFiltros() {
  contenedorFiltros.innerHTML = "";
  filters.forEach((categoria) => {
    const boton = document.createElement("button");
    boton.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    boton.classList.add("filter");

    boton.addEventListener("click", () => {
      if (categoria === "todos") {
        pintaProductos(products);
      } else {
        const productosFiltrados = products.filter(
          (producto) => producto.category === categoria,
        );
        pintaProductos(productosFiltrados);
      }
      console.log(`has pulsado la categoria: ${categoria}`);
    });
    contenedorFiltros.appendChild(boton);
  });
}
pintaFiltros();

export function pintaProductos(listaProductos) {
  contenedorProductos.innerHTML = "";
  listaProductos.forEach((producto) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("producto-tarjeta");
    tarjeta.innerHTML = `
            <img src="../assets/images/${producto.image}" alt="${producto.name}">
            <h3>${producto.name}</h3>
            <p>${producto.description}</p>                                                                                                
            <span>precio: ${producto.price} €</span>
            <button class="btn-agregar" data-id="${producto.id}">Añadir</button>
    `;
    const botonAgregar = tarjeta.querySelector(".btn-agregar");
    botonAgregar.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
      console.log(`has añadido al carrito el producto: ${producto.name}`);
    });
    contenedorProductos.appendChild(tarjeta);
  });
}
