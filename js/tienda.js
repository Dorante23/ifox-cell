let carrito = [];
let categoriaActual = "Todos";
let textoBusqueda = "";

const grid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const categoryBtns = document.querySelectorAll(".chip");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const sendWsBtn = document.getElementById("send-ws-btn");

function mostrarProductos() {
  const filtrados = INVENTARIO_IFOX.filter(prod => {
    const coincideCat = categoriaActual === "Todos" || prod.categoria === categoriaActual;
    const coincideTxt = prod.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
                        prod.specs.toLowerCase().includes(textoBusqueda.toLowerCase());
    return coincideCat && coincideTxt;
  });

  if (filtrados.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#64748b;">No hay equipos que coincidan con tu búsqueda.</p>`;
    return;
  }

  grid.innerHTML = filtrados.map(prod => {
    const claseEstado = prod.estado.toLowerCase().replace(/\s+/g, "-");
    const textoPrecio = prod.precio > 0 ? `$${prod.precio}` : "Consultar";

    return `
      <article class="card">
        <span class="badge ${claseEstado}">${prod.estado}</span>
        <div class="card-img">
          <img src="${prod.imagen}" alt="${prod.nombre}" 
               onerror="this.outerHTML='<i class=\\'fa-solid fa-mobile-screen-button fallback-icon\\'></i>'">
        </div>
        <div class="card-body">
          <span class="card-category">${prod.categoria}</span>
          <h3>${prod.nombre}</h3>
          <p class="card-specs">${prod.specs}</p>
          <div class="card-footer">
            <span class="price">${textoPrecio}</span>
            <button type="button" class="btn-add" onclick="agregarAlCarrito(${prod.id})">
              <i class="fa-solid fa-plus"></i> Pedir
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function agregarAlCarrito(id) {
  const producto = INVENTARIO_IFOX.find(p => p.id === id);
  const existente = carrito.find(item => item.id === id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
  cartOverlay.classList.add("open");
}

function cambiarCantidad(id, cambio) {
  const item = carrito.find(i => i.id === id);
  if (!item) return;

  item.cantidad += cambio;
  if (item.cantidad <= 0) {
    carrito = carrito.filter(i => i.id !== id);
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  const totalUnidades = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  const totalDinero = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  cartCount.textContent = totalUnidades;
  cartTotal.textContent = totalDinero > 0 ? `$${totalDinero}` : "Por confirmar";
  sendWsBtn.disabled = carrito.length === 0;

  if (carrito.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-msg">Aún no has seleccionado ningún artículo.</p>`;
    return;
  }

  cartItemsContainer.innerHTML = carrito.map(item => {
    const subtotalTexto = item.precio > 0 ? `$${item.precio * item.cantidad}` : "Precio por consultar";
    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.nombre}</h4>
          <span>${subtotalTexto}</span>
        </div>
        <div class="qty-controls">
          <button type="button" class="qty-btn" onclick="cambiarCantidad(${item.id}, -1)">-</button>
          <strong>${item.cantidad}</strong>
          <button type="button" class="qty-btn" onclick="cambiarCantidad(${item.id}, 1)">+</button>
        </div>
      </div>
    `;
  }).join("");
}

sendWsBtn.addEventListener("click", () => {
  if (carrito.length === 0) return;

  let mensaje = "Hola *IFOX CELL*, me interesa consultar disponibilidad y precio de:\n\n";
  let total = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    if (subtotal > 0) {
      mensaje += `• ${item.cantidad}x ${item.nombre} ($${subtotal})\n`;
      total += subtotal;
    } else {
      mensaje += `• ${item.cantidad}x ${item.nombre}\n`;
    }
  });

  if (total > 0) {
    mensaje += `\n*Total estimado:* $${total}`;
  }
  mensaje += `\n¿Me confirman disponibilidad y método de entrega?`;

  window.open(`https://wa.me/${TELEFONO_TIENDA}?text=${encodeURIComponent(mensaje)}`, "_blank");
});

categoryBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    categoriaActual = btn.dataset.category;
    mostrarProductos();
  });
});

searchInput.addEventListener("input", (e) => {
  textoBusqueda = e.target.value;
  mostrarProductos();
});

document.getElementById("open-cart-btn").addEventListener("click", () => cartOverlay.classList.add("open"));
document.getElementById("close-cart-btn").addEventListener("click", () => cartOverlay.classList.remove("open"));
cartOverlay.addEventListener("click", (e) => {
  if (e.target === cartOverlay) cartOverlay.classList.remove("open");
});

mostrarProductos();