let carrito = [];
let listaComparar = [];
let guiaCompararMostrada = false;
let categoriaActual = "Todos";
let condicionActual = "Todos";
let textoBusqueda = "";

const grid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const categoryBtns = document.querySelectorAll(".chip");
const conditionBtns = document.querySelectorAll(".cond-chip");
const productModal = document.getElementById("product-modal");
const modalContent = document.getElementById("modal-content");
const compareModal = document.getElementById("compare-modal");
const compareContent = document.getElementById("compare-content");
const compareGuideModal = document.getElementById("compare-guide-modal");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const sendWsBtn = document.getElementById("send-ws-btn");

// Guardar y cargar estado en la memoria del navegador (localStorage)
function guardarEstado() {
  localStorage.setItem("ifox_carrito", JSON.stringify(carrito));
  localStorage.setItem("ifox_comparar", JSON.stringify(listaComparar));
  localStorage.setItem("ifox_guia_comparar", JSON.stringify(guiaCompararMostrada));
}

function cargarEstado() {
  try {
    const carritoGuardado = JSON.parse(localStorage.getItem("ifox_carrito")) || [];
    carrito = carritoGuardado
      .map(item => {
        const prodActual = INVENTARIO_IFOX.find(p => p.id === item.id);
        return prodActual ? { ...prodActual, cantidad: item.cantidad } : null;
      })
      .filter(Boolean);

    const compararGuardado = JSON.parse(localStorage.getItem("ifox_comparar")) || [];
    listaComparar = compararGuardado.filter(id => INVENTARIO_IFOX.some(p => p.id === id));

    guiaCompararMostrada = JSON.parse(localStorage.getItem("ifox_guia_comparar")) === true;
  } catch (error) {
    carrito = [];
    listaComparar = [];
    guiaCompararMostrada = false;
  }
}

// Cargar datos de la tienda
document.getElementById("store-hours").textContent = CONFIG_TIENDA.horario;
document.getElementById("store-location").textContent = CONFIG_TIENDA.ubicacion;
document.getElementById("ig-link").href = CONFIG_TIENDA.instagram;
document.getElementById("whatsapp-float").href =
  `https://wa.me/${CONFIG_TIENDA.telefono}?text=${encodeURIComponent("Hola *IFOX CELL*, me gustaría hacer una consulta.")}`;

// Cambiar entre Catálogo, Servicio Técnico y Conócenos
function cambiarVista(vista) {
  const vistas = {
    catalogo: document.getElementById("vista-catalogo"),
    servicio: document.getElementById("vista-servicio"),
    conocenos: document.getElementById("vista-conocenos")
  };
  const navTabs = document.querySelectorAll(".nav-tab");

  navTabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.vista === vista);
  });

  Object.keys(vistas).forEach(clave => {
    vistas[clave].classList.toggle("hidden", clave !== vista);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Cotizador de Servicio Técnico por WhatsApp
function cotizarServicioTecnico() {
  const modeloInput = document.getElementById("tech-model");
  const fallaSelect = document.getElementById("tech-issue");
  const notasInput = document.getElementById("tech-notes");

  const modelo = modeloInput.value.trim();
  const falla = fallaSelect.value;
  const notas = notasInput.value.trim();

  if (!modelo) {
    modeloInput.focus();
    modeloInput.style.borderColor = "#dc2626";
    return;
  }
  modeloInput.style.borderColor = "#cbd5e1";

  let mensaje = `Hola *IFOX CELL*, me gustaría cotizar una reparación en Servicio Técnico:\n\n`;
  mensaje += `• *Equipo:* ${modelo}\n`;
  mensaje += `• *Falla / Servicio:* ${falla}\n`;
  if (notas) {
    mensaje += `• *Detalle:* ${notas}\n`;
  }
  mensaje += `\n¿Cuál sería el costo aproximado y el tiempo estimado de entrega?`;

  window.open(`https://wa.me/${CONFIG_TIENDA.telefono}?text=${encodeURIComponent(mensaje)}`, "_blank");
}

// Acordeón de Preguntas Frecuentes
function toggleFaq(boton) {
  const itemActual = boton.parentElement;
  const estabaAbierto = itemActual.classList.contains("open");

  document.querySelectorAll(".faq-item").forEach(item => item.classList.remove("open"));
  if (!estabaAbierto) {
    itemActual.classList.add("open");
  }
}

function mostrarProductos() {
  const filtrados = INVENTARIO_IFOX.filter(prod => {
    const coincideCat = categoriaActual === "Todos" || prod.categoria === categoriaActual;
    const coincideCond =
      condicionActual === "Todos" ||
      (condicionActual === "Nuevo" && prod.estado === "Nuevo") ||
      (condicionActual === "Seminuevo" && (prod.estado === "Seminuevo" || prod.estado === "Como nuevo"));
    const coincideTxt = prod.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
                        prod.specs.toLowerCase().includes(textoBusqueda.toLowerCase());
    return coincideCat && coincideCond && coincideTxt;
  });

  if (filtrados.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#64748b; padding:30px 0;">No hay equipos disponibles con ese filtro.</p>`;
    return;
  }

  grid.innerHTML = filtrados.map(prod => {
    const claseEstado = prod.estado.toLowerCase().replace(/\s+/g, "-");
    const textoPrecio = prod.precio > 0 ? `$${prod.precio}` : "Consultar";
    const esEquipo = prod.categoria !== "Accesorios";
    const estaEnComparador = listaComparar.includes(prod.id);

    return `
      <article class="card">
        <span class="badge ${claseEstado}">${prod.estado}</span>
        ${prod.recienLlegado ? `<span class="badge-arrival"><i class="fa-solid fa-bolt"></i> Recién llegado</span>` : ""}
        <div class="card-img" onclick="abrirModal(${prod.id})">
          <img src="${prod.imagen}" alt="${prod.nombre}" 
               onerror="this.outerHTML='<i class=\\'fa-solid fa-mobile-screen-button fallback-icon\\'></i>'">
          <span class="view-hint"><i class="fa-solid fa-eye"></i> Ver ficha</span>
        </div>
        <div class="card-body">
          <div class="card-top-row">
            <span class="card-category">${prod.categoria}</span>
            ${esEquipo ? `
              <button type="button" class="btn-compare ${estaEnComparador ? "selected" : ""}" onclick="toggleComparar(${prod.id})">
                <i class="fa-solid ${estaEnComparador ? "fa-check" : "fa-scale-balanced"}"></i>
                ${estaEnComparador ? "En lista" : "Comparar"}
              </button>
            ` : ""}
          </div>
          <h3 onclick="abrirModal(${prod.id})">${prod.nombre}</h3>
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

// Lógica del Comparador de Equipos
function toggleComparar(id) {
  if (listaComparar.includes(id)) {
    listaComparar = listaComparar.filter(item => item !== id);
  } else {
    if (listaComparar.length >= 2) {
      listaComparar.shift();
    }
    listaComparar.push(id);

    if (listaComparar.length === 1 && !guiaCompararMostrada) {
      guiaCompararMostrada = true;
      const prod = INVENTARIO_IFOX.find(p => p.id === id);
      mostrarGuiaComparar(prod ? prod.nombre : "tu primer equipo");
    }
  }
  guardarEstado();
  actualizarBarraComparar();
  mostrarProductos();
}

function mostrarGuiaComparar(nombreEquipo) {
  document.getElementById("guide-selected-text").textContent =
    `Ya seleccionaste: ${nombreEquipo}`;
  compareGuideModal.classList.add("open");
}

function cerrarGuiaComparar() {
  compareGuideModal.classList.remove("open");
}

function limpiarComparador() {
  listaComparar = [];
  guardarEstado();
  actualizarBarraComparar();
  mostrarProductos();
}

function actualizarBarraComparar() {
  const bar = document.getElementById("compare-bar");
  const status = document.getElementById("compare-status");
  const btnOpen = document.getElementById("open-compare-btn");

  if (listaComparar.length === 0) {
    bar.classList.add("hidden");
    return;
  }

  bar.classList.remove("hidden");
  const nombres = listaComparar.map(id => {
    const p = INVENTARIO_IFOX.find(item => item.id === id);
    return p ? p.nombre : "";
  });

  if (listaComparar.length === 1) {
    status.textContent = `${nombres[0]} (elige 1 más)`;
    btnOpen.disabled = true;
  } else {
    status.textContent = `${nombres[0]} vs ${nombres[1]}`;
    btnOpen.disabled = false;
  }
}

function abrirComparador() {
  if (listaComparar.length < 2) return;
  const p1 = INVENTARIO_IFOX.find(p => p.id === listaComparar[0]);
  const p2 = INVENTARIO_IFOX.find(p => p.id === listaComparar[1]);
  if (!p1 || !p2) return;

  const precio1 = p1.precio > 0 ? `$${p1.precio}` : "Consultar";
  const precio2 = p2.precio > 0 ? `$${p2.precio}` : "Consultar";

  compareContent.innerHTML = `
    <button type="button" class="modal-close" onclick="cerrarComparador()" aria-label="Cerrar">&times;</button>
    <h2><i class="fa-solid fa-scale-balanced"></i> Comparativa de Equipos</h2>
    <table class="compare-table">
      <thead>
        <tr>
          <th class="row-label">Característica</th>
          <th>
            <div class="compare-prod-header">
              <img src="${p1.imagen}" alt="${p1.nombre}">
              <h4>${p1.nombre}</h4>
            </div>
          </th>
          <th>
            <div class="compare-prod-header">
              <img src="${p2.imagen}" alt="${p2.nombre}">
              <h4>${p2.nombre}</h4>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th class="row-label">Condición</th>
          <td>${p1.estado}</td>
          <td>${p2.estado}</td>
        </tr>
        <tr>
          <th class="row-label">Salud de Batería</th>
          <td><strong>${p1.bateria ? p1.bateria + "%" : "N/A"}</strong></td>
          <td><strong>${p2.bateria ? p2.bateria + "%" : "N/A"}</strong></td>
        </tr>
        <tr>
          <th class="row-label">Detalles</th>
          <td>${p1.specs}</td>
          <td>${p2.specs}</td>
        </tr>
        <tr>
          <th class="row-label">Incluye</th>
          <td>${p1.incluye}</td>
          <td>${p2.incluye}</td>
        </tr>
        <tr>
          <th class="row-label">Precio</th>
          <td><strong style="color:var(--accent); font-size:1.05rem;">${precio1}</strong></td>
          <td><strong style="color:var(--accent); font-size:1.05rem;">${precio2}</strong></td>
        </tr>
        <tr>
          <th class="row-label">Acción</th>
          <td>
            <button type="button" class="btn-direct-ws" style="width:100%; font-size:0.8rem; padding:9px;" onclick="consultarEquipoDirecto(${p1.id})">
              <i class="fa-brands fa-whatsapp"></i> Elegir este
            </button>
          </td>
          <td>
            <button type="button" class="btn-direct-ws" style="width:100%; font-size:0.8rem; padding:9px;" onclick="consultarEquipoDirecto(${p2.id})">
              <i class="fa-brands fa-whatsapp"></i> Elegir este
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `;

  compareModal.classList.add("open");
}

function cerrarComparador() {
  compareModal.classList.remove("open");
}

// Modal de Ficha Individual
function abrirModal(id) {
  const prod = INVENTARIO_IFOX.find(p => p.id === id);
  if (!prod) return;

  const textoPrecio = prod.precio > 0 ? `$${prod.precio}` : "Precio por consultar";
  const colorBateria = prod.bateria >= 90 ? "#16a34a" : "#2563eb";

  modalContent.innerHTML = `
    <button type="button" class="modal-close" onclick="cerrarModal()" aria-label="Cerrar">&times;</button>
    <div class="modal-img">
      <img src="${prod.imagen}" alt="${prod.nombre}"
           onerror="this.outerHTML='<i class=\\'fa-solid fa-mobile-screen-button fallback-icon\\'></i>'">
    </div>
    <div class="modal-details">
      <span class="card-category">${prod.categoria} • ${prod.estado}</span>
      <h2>${prod.nombre}</h2>
      <div class="modal-price">${textoPrecio}</div>

      ${prod.bateria ? `
        <div class="battery-box">
          <div class="battery-header">
            <span><i class="fa-solid fa-battery-three-quarters"></i> Salud de Batería</span>
            <span>${prod.bateria}%</span>
          </div>
          <div class="battery-track">
            <div class="battery-fill" style="width:${prod.bateria}%; background:${colorBateria};"></div>
          </div>
        </div>
      ` : ""}

      <ul class="modal-list">
        <li><i class="fa-solid fa-microchip"></i> <span>${prod.specs}</span></li>
        <li><i class="fa-solid fa-box-open"></i> <span><strong>Incluye:</strong> ${prod.incluye}</span></li>
        <li><i class="fa-solid fa-shield-halved"></i> <span>${prod.garantia}</span></li>
      </ul>

      <div class="modal-actions">
        <button type="button" class="btn-direct-ws" onclick="consultarEquipoDirecto(${prod.id})">
          <i class="fa-brands fa-whatsapp"></i> Consultar este equipo por WhatsApp
        </button>
        <button type="button" class="btn-modal-cart" onclick="cerrarModal(); agregarAlCarrito(${prod.id});">
          <i class="fa-solid fa-cart-plus"></i> Agregar a mi lista de pedido
        </button>
      </div>
    </div>
  `;

  productModal.classList.add("open");
}

function cerrarModal() {
  productModal.classList.remove("open");
}

function consultarEquipoDirecto(id) {
  const prod = INVENTARIO_IFOX.find(p => p.id === id);
  if (!prod) return;
  const mensaje = `Hola *IFOX CELL*, me interesa el *${prod.nombre}* (${prod.specs}). ¿Sigue disponible?`;
  window.open(`https://wa.me/${CONFIG_TIENDA.telefono}?text=${encodeURIComponent(mensaje)}`, "_blank");
}

function agregarAlCarrito(id) {
  const producto = INVENTARIO_IFOX.find(p => p.id === id);
  const existente = carrito.find(item => item.id === id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarEstado();
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
  guardarEstado();
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

  window.open(`https://wa.me/${CONFIG_TIENDA.telefono}?text=${encodeURIComponent(mensaje)}`, "_blank");
});

categoryBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    categoriaActual = btn.dataset.category;
    mostrarProductos();
  });
});

conditionBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    conditionBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    condicionActual = btn.dataset.condition;
    mostrarProductos();
  });
});

searchInput.addEventListener("input", (e) => {
  textoBusqueda = e.target.value;
  mostrarProductos();
});

productModal.addEventListener("click", (e) => {
  if (e.target === productModal) cerrarModal();
});

compareModal.addEventListener("click", (e) => {
  if (e.target === compareModal) cerrarComparador();
});

compareGuideModal.addEventListener("click", (e) => {
  if (e.target === compareGuideModal) cerrarGuiaComparar();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    cerrarModal();
    cerrarComparador();
    cerrarGuiaComparar();
    cartOverlay.classList.remove("open");
  }
});

document.getElementById("open-cart-btn").addEventListener("click", () => cartOverlay.classList.add("open"));
document.getElementById("close-cart-btn").addEventListener("click", () => cartOverlay.classList.remove("open"));
cartOverlay.addEventListener("click", (e) => {
  if (e.target === cartOverlay) cartOverlay.classList.remove("open");
});

// Inicializar cargando los datos guardados del usuario
cargarEstado();
actualizarCarrito();
actualizarBarraComparar();
mostrarProductos();