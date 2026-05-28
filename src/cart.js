//DEBE contener las funcionalidades del carrito de compras.
import { products } from "../assets/data/data.js";
export let carrito = []

export function agregarAlCarrito(idproducto) {
    
    const productoExistente = carrito.find(item => item.id === idproducto);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        const productoOriginal = products.find(p => p.id === idproducto);
        if (productoOriginal) {
            carrito.push({
                ...productoOriginal,
                cantidad: 1
            });
        }
    }

    renderizarCarrito();
}

export function eliminarDelCarrito(id) {
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        if (productoExistente.cantidad > 1) {
            productoExistente.cantidad -= 1;
        } else {
            carrito = carrito.filter(item => item.id !== id);
        }
    }

    renderizarCarrito();
}

/**
 * 
 * @returns {void}
 */
function renderizarCarrito() {
    
    const contenedorCarrito = document.getElementById("cart-products");
    const contenedorTotal = document.getElementById("cart-total");

    if (!contenedorCarrito) return;

    contenedorCarrito.innerHTML = "";

    
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>El carrito está vacío.</p>";
        if (contenedorTotal) contenedorTotal.innerText = "$0.00";
        return;
    }

    
    carrito.forEach(producto => {
        const itemDOMEstructura = document.createElement("div");
        itemDOMEstructura.classList.add("carrito-item"); // Puedes darle estilos en tu CSS
        
        itemDOMEstructura.innerHTML = `
            <p>${producto.name} x${producto.cantidad} - $${(producto.price * producto.cantidad).toFixed(2)} €</p>
            <button class="btn-restar">-</button>
            <button class="btn-sumar">+</button>
        `;

        
        itemDOMEstructura.querySelector(".btn-restar").addEventListener("click", () => eliminarDelCarrito(producto.id));
        itemDOMEstructura.querySelector(".btn-sumar").addEventListener("click", () => agregarAlCarrito(producto.id));

        contenedorCarrito.appendChild(itemDOMEstructura);
    });

    
    if (contenedorTotal) {
        contenedorTotal.innerText = `${calcularTotal().toFixed(2)} €`;
    }
}

export function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
}

export function calcularTotal() {
    return carrito.reduce((acum, p) => acum + Math.round(p.price * 100) * p.cantidad, 0) / 100;
}

