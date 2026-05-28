//Aquí intenta poner las funcionalidades del recibo
// 1. Importamos la lógica que necesitamos del carrito
import { calcularTotal, carrito, vaciarCarrito } from "./cart.js";

/**
 * Función principal para generar y mostrar el recibo
 */
export function inicializarRecibo() {
    const botonPagar = document.getElementById("pay-button");
    const botonProceder = document.getElementById("proceedPay-button");
    const contenedorRecibo = document.getElementById("receipt-container");
    const receiptProductList = document.getElementById("receipt-product");
    const receiptTotalEl = document.getElementById("receipt-total");

    function renderizarRecibo() {
        if (!receiptProductList || !receiptTotalEl) return;

        receiptProductList.innerHTML = "";

        if (carrito.length === 0) {
            receiptProductList.innerHTML = "<h3>Carrito vacío</h3>";
            receiptTotalEl.innerText = "Total: 0 €";
            return;
        }

        carrito.forEach(producto => {
            const itemRecibo = document.createElement("div");
            itemRecibo.classList.add("receipt-product-item");
            itemRecibo.innerHTML = `
                <h3>${producto.name}</h3>
                <div class="receipt-price">
                    <p>Cantidad: ${producto.cantidad}</p>
                    <h5>Subtotal: ${(producto.price * producto.cantidad).toFixed(2)} €</h5>
                </div>
            `;
            receiptProductList.appendChild(itemRecibo);
        });

        receiptTotalEl.innerText = `Total: ${calcularTotal().toFixed(2)} €`;
    }

    function procesarPago() {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío. ¡Añade alguna comida antes de pagar!");
            return;
        }

        let resumenTexto = "🧾 --- TICKET DE COMPRA ---\n\n";
        carrito.forEach(producto => {
            resumenTexto += `${producto.name} x${producto.cantidad} - ${(producto.price * producto.cantidad).toFixed(2)} €\n`;
        });

        const total = calcularTotal();
        resumenTexto += `\n-------------------------\n`;
        resumenTexto += `TOTAL A PAGAR: ${total.toFixed(2)} €\n\n`;
        resumenTexto += "¡Gracias por tu compra en Kamakura Food! 🍣";

        alert(resumenTexto);
        vaciarCarrito();
        renderizarRecibo();
        console.log("Compra procesada con éxito.");
    }

    if (botonPagar) {
        botonPagar.addEventListener("click", procesarPago);
    }

    if (botonProceder) {
        botonProceder.addEventListener("click", () => {
            if (contenedorRecibo) {
                contenedorRecibo.style.display = "flex";
            }
            renderizarRecibo();
        });
    }
}
