//Aquí intenta poner las funcionalidades del recibo
// 1. Importamos la lógica que necesitamos del carrito
import { calcularTotal, carrito } from "/src/cart.js";

/**
 * Función principal para generar y mostrar el recibo
 */
export function inicializarRecibo() {
    const botonPagar = document.getElementById("pay-button");
    const contenedorRecibo = document.getElementById("receipt-total"); // O el ID de tu contenedor del ticket

    if (!botonPagar) return;

    botonPagar.addEventListener("click", () => {
        // Validamos si el carrito está vacío antes de procesar el pago
        if (carrito.length === 0) {
            alert("Tu carrito está vacío. ¡Añade alguna comida antes de pagar!");
            return;
        }

        // 2. Construimos el cuerpo del recibo de forma amigable
        let resumenTexto = "🧾 --- TICKET DE COMPRA ---\n\n";
        
        carrito.forEach(producto => {
            resumenTexto += `${producto.name} x${producto.cantidad} - ${(producto.price * producto.cantidad).toFixed(2)} €\n`;
        });

        const total = calcularTotal();
        resumenTexto += `\n-------------------------\n`;
        resumenTexto += `TOTAL A PAGAR: ${total.toFixed(2)} €\n\n`;
        resumenTexto += "¡Gracias por tu compra en Kamakura Food! 🍣";

        // 3. Mostramos el recibo (por ahora en un alert, o puedes pintarlo en el HTML)
        alert(resumenTexto);

        // Aquí opcionalmente podrías vaciar el carrito o redirigir al usuario
        console.log("Compra procesada con éxito.");
    });
}