//DEBE contener las funcionalidades del carrito de compras.
import { products } from "../assets/data/data.js";
export let carrito = []

import { calcularTotal, carrito } from "./cart.js";
export function agregarAlCarrito(idproducto) {
    // Buscar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.id === idproducto);

    if (productoExistente) {
        // Si ya está, le sumamos 1 a la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si no está, buscamos el producto original en tu base de datos (products)
        const productoOriginal = products.find(p => p.id === id);
        
        if (productoOriginal) {
            // Lo metemos al carrito con cantidad inicial 1
            carrito.push({
                ...productoOriginal,
                cantidad: 1
            });
        }
    }

    // Cada vez que cambia el carrito, actualizamos la vista
    renderizarCarrito();
}

export function eliminarDelCarrito(id) {
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        if (productoExistente.cantidad > 1) {
            productoExistente.cantidad -= 1;
        } else {
            // Si la cantidad es 1, lo borramos por completo del array
            carrito = carrito.filter(item => item.id !== id);
        }
    }

    renderizarCarrito();
}

export function calcularTotal() {
    return carrito.reduce((acumulado, producto) => {
        return acumulado + (producto.price * producto.cantidad);
    }, 0);
}

/**
 * 5. FUNCIÓN: Dibujar el carrito en el HTML
 * (Aquí debes adaptar los selectores según las clases/IDs que tengas en tu index.html)
 * @returns {void}
 */
function renderizarCarrito() {
    // Ejemplo: Supongamos que tienes un contenedor para los items y otro para el total
    const contenedorCarrito = document.getElementById("carrito-items");
    const contenedorTotal = document.getElementById("carrito-total");

    // Validar que los elementos existan en el HTML para evitar errores
    if (!contenedorCarrito) return;

    // Limpiar el contenedor antes de volver a pintar
    contenedorCarrito.innerHTML = "";

    // Si el carrito está vacío
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>El carrito está vacío.</p>";
        if (contenedorTotal) contenedorTotal.innerText = "$0.00";
        return;
    }

    // Recorrer el carrito y crear el HTML para cada producto
    carrito.forEach(producto => {
        const itemDOMEstructura = document.createElement("div");
        itemDOMEstructura.classList.add("carrito-item"); // Puedes darle estilos en tu CSS
        
        itemDOMEstructura.innerHTML = `
            <p>${producto.name} x${producto.cantidad} - $${(producto.price * producto.cantidad).toFixed(2)} €</p>
            <button class="btn-restar>-</button>
            <button class="btn-sumar">+</button>
        `;

        // Asignar eventos a los botones de dentro del carrito
        itemDOMEstructura.querySelector(".btn-restar").addEventListener("click", () => eliminarDelCarrito(producto.id));
        itemDOMEstructura.querySelector(".btn-sumar").addEventListener("click", () => agregarAlCarrito(producto.id));

        contenedorCarrito.appendChild(itemDOMEstructura);
    });

    // Actualizar el total en la pantalla
    if (contenedorTotal) {
        contenedorTotal.innerText = `${calcularTotal().toFixed(2)} €`;
    }
}

// ...existing code...
export function calcularTotal() {
    return carrito.reduce((acum, p) => acum + Math.round(p.price * 100) * p.cantidad, 0) / 100;
}
// ...existing code...


