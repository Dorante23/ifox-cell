let carrito = [];
let listaComparar = [];
let guiaCompararMostrada = false;
let categoriaActual = "Todos";
let condicionActual = "Todos";
let textoBusqueda = "";
let modeloRepuestoActual = "Todos";
let tipoRepuestoActual = "Todos";
let mensajeConsultaPendiente = "";

const grid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const categoryBtns = document.querySelectorAll(".chip:not(.rep-chip)");
const conditionBtns = document.querySelectorAll(".cond-chip");
const productModal = document.getElementById("product-modal");
const modalContent = document.getElementById("modal-content");
const compareModal = document.getElementById("compare-modal");
const compareContent = document.getElementById("compare-content");
const compareGuideModal = document.getElementById("compare-guide-modal");
const wsSelectorModal = document.getElementById("ws-selector-modal");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const sendWsBtn = document.getElementById("send-ws-btn");

function obtenerCatalogoCompleto() {
  return [
    ...INVENTARIO_IFOX,
    ...(typeof REPUESTOS_IFOX !== "undefined" ? REPUESTOS_IFOX : [])
  ];
}

// Guardar y cargar estado en la memoria del navegador (localStorage)
function guardarEstado() {
  localStorage.setItem("ifox_carrito", JSON.stringify(carrito));
  localStorage.setItem("ifox_comparar", JSON.stringify(listaComparar));
  localStorage.setItem("ifox_guia_comparar", JSON.stringify(guiaCompararMostrada));
}

function cargarEstado() {
  try {
    const todosLosProductos = obtenerCatalogoCompleto();
    const carritoGuardado = JSON.parse(localStorage.getItem("ifox_carrito")) || [];
    carrito = carritoGuardado
      .map(item => {
        const prodActual = todosLosProductos.find(p => p.id === item.id);
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

// Selector de WhatsApp para Consultas (Atención de Ventas vs Tienda IFOX CELL)
function abrirSelectorWhatsApp(mensaje) {
  mensajeConsultaPendiente = mensaje;
  wsSelectorModal.classList.add("open");
}

function cerrarSelectorWhatsApp() {
  wsSelectorModal.classList.remove("open");
}

function enviarConsultaA(canal) {
  const numeroDestino = canal === "tienda"
    ? (CONFIG_TIENDA.telefonoTienda || "584122200980")
    : (CONFIG_TIENDA.telefonoVentas || "584226363817");

  const texto = mensajeConsultaPendiente || "Hola *IFOX CELL*, me gustaría hacer una consulta.";
  cerrarSelectorWhatsApp();
  window.open(`https://wa.me/${numeroDestino}?text=${encodeURIComponent(texto)}`, "_blank");
}

function consultarGeneral() {
  abrirSelectorWhatsApp("Hola *IFOX CELL*, me gustaría hacer una consulta.");
}

// Cambiar entre Catálogo, Repuestos, Servicio Técnico y Conócenos
function cambiarVista(vista) {
  const vistas = {
    catalogo: document.getElementById("vista-catalogo"),
    repuestos: document.getElementById("vista-repuestos"),
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

  abrirSelectorWhatsApp(mensaje);
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

// ==========================================
// AVISO DISCRETO PARA VER FOTOS COMPLETAS
// ==========================================
function insertarAvisoEnGrid(gridElement) {
  if (!gridElement || !gridElement.parentElement) return;
  if (gridElement.parentElement.querySelector(".aviso-fotos-tip")) return;

  const aviso = document.createElement("div");
  aviso.className = "aviso-fotos-tip";
  aviso.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    color: #1e3a8a;
    padding: 10px 16px;
    border-radius: 12px;
    margin-bottom: 18px;
    font-size: 0.9rem;
    line-height: 1.4;
    box-shadow: 0 2px 6px rgba(30, 58, 138, 0.06);
    grid-column: 1 / -1;
  `;

  aviso.innerHTML = `
    <div style="display:flex; align-items:center; gap:10px;">
      <i class="fa-solid fa-magnifying-glass-plus" style="color:#2563eb; font-size:1.05rem;"></i>
      <span><strong>Tip:</strong> Presiona cualquier imagen o producto para ver la foto completa, con mayor nitidez y todos sus detalles.</span>
    </div>
    <button type="button" onclick="this.parentElement.remove()" aria-label="Cerrar aviso"
      style="background:none; border:none; color:#64748b; font-size:1.25rem; cursor:pointer; padding:0 4px; line-height:1;">
      &times;
    </button>
  `;

  gridElement.parentElement.insertBefore(aviso, gridElement);
}

function mostrarProductos() {
  insertarAvisoEnGrid(grid);

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
               style="${prod.enfoque ? `object-position: ${prod.enfoque};` : ""}"
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

// Lógica del Módulo de Repuestos por Modelo
function cargarModelosRepuestos() {
  const select = document.getElementById("repuesto-modelo-select");
  if (!select || typeof REPUESTOS_IFOX === "undefined") return;

  const modelosUnicos = [...new Set(REPUESTOS_IFOX.map(r => r.modelo))];
  select.innerHTML = `<option value="Todos">Todos los modelos disponibles</option>` +
    modelosUnicos.map(modelo => `<option value="${modelo}">${modelo}</option>`).join("");
}

function filtrarPorModeloRepuesto(modelo) {
  modeloRepuestoActual = modelo;
  mostrarRepuestos();
}

function mostrarRepuestos() {
  const repGrid = document.getElementById("repuestos-grid");
  if (!repGrid || typeof REPUESTOS_IFOX === "undefined") return;

  insertarAvisoEnGrid(repGrid);

  const filtrados = REPUESTOS_IFOX.filter(rep => {
    const coincideModelo = modeloRepuestoActual === "Todos" || rep.modelo === modeloRepuestoActual;
    const coincideTipo =
      tipoRepuestoActual === "Todos" ||
      (tipoRepuestoActual === "Otros"
        ? rep.tipo !== "Pantalla" && rep.tipo !== "Batería"
        : rep.tipo === tipoRepuestoActual);
    return coincideModelo && coincideTipo;
  });

  if (filtrados.length === 0) {
    repGrid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#64748b; padding:30px 0;">No hay repuestos registrados para este filtro.</p>`;
    return;
  }

  repGrid.innerHTML = filtrados.map(rep => {
    const esOriginal = rep.calidad.toLowerCase().includes("original");
    const textoPrecio = rep.precio > 0 ? `$${rep.precio}` : "Consultar";
    let iconoFallback = "fa-mobile-screen";
    if (rep.tipo === "Batería") iconoFallback = "fa-battery-full";
    else if (rep.tipo === "Cámara") iconoFallback = "fa-camera";
    else if (rep.tipo === "Altavoz") iconoFallback = "fa-volume-high";

    const contenidoImg = rep.imagen
      ? `<img src="${rep.imagen}" alt="${rep.nombre}" style="${rep.enfoque ? `object-position: ${rep.enfoque};` : ""}" onerror="this.outerHTML='<i class=\\'fa-solid ${iconoFallback} fallback-icon\\'></i>'">
         <span class="view-hint"><i class="fa-solid fa-magnifying-glass-plus"></i> Ver foto</span>`
      : `<i class="fa-solid ${iconoFallback} fallback-icon"></i>`;

    return `
      <article class="card">
        <span class="badge-calidad ${esOriginal ? "original" : ""}">${rep.calidad}</span>
        <div class="card-img" onclick="abrirModalRepuesto(${rep.id})">
          ${contenidoImg}
        </div>
        <div class="card-body">
          <div class="card-top-row">
            <span class="card-category">${rep.modelo} • ${rep.tipo}</span>
          </div>
          <h3 onclick="abrirModalRepuesto(${rep.id})">${rep.nombre}</h3>
          <div class="card-footer rep-card-footer">
            <span class="price">${textoPrecio}</span>
            <button type="button" class="btn-add" onclick="agregarAlCarrito(${rep.id})">
              <i class="fa-solid fa-plus"></i> Pedir
            </button>
          </div>
          <div class="rep-actions">
            <button type="button" class="btn-install-ws" onclick="cotizarRepuestoInstalado(${rep.id})">
              <i class="fa-brands fa-whatsapp"></i> Consultar con instalación
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function abrirModalRepuesto(id) {
  if (typeof REPUESTOS_IFOX === "undefined") return;
  const rep = REPUESTOS_IFOX.find(r => r.id === id);
  if (!rep) return;

  const textoPrecio = rep.precio > 0 ? `$${rep.precio}` : "Precio por consultar";
  let iconoFallback = "fa-mobile-screen";
  if (rep.tipo === "Batería") iconoFallback = "fa-battery-full";
  else if (rep.tipo === "Cámara") iconoFallback = "fa-camera";
  else if (rep.tipo === "Altavoz") iconoFallback = "fa-volume-high";

  const contenidoImg = rep.imagen
    ? `<img src="${rep.imagen}" alt="${rep.nombre}" style="object-fit: contain; background: #1e293b; ${rep.enfoque ? `object-position: ${rep.enfoque};` : ""}" onerror="this.outerHTML='<i class=\\'fa-solid ${iconoFallback} fallback-icon\\'></i>'">`
    : `<i class="fa-solid ${iconoFallback} fallback-icon"></i>`;

  modalContent.innerHTML = `
    <button type="button" class="modal-close" onclick="cerrarModal()" aria-label="Cerrar">&times;</button>
    <div class="modal-img" style="background: ${rep.imagen ? "#1e293b" : "#f8fafc"};">
      ${contenidoImg}
    </div>
    <div class="modal-details">
      <span class="card-category">${rep.modelo} • ${rep.tipo}</span>
      <h2>${rep.nombre}</h2>
      <div class="modal-price">${textoPrecio}</div>

      <ul class="modal-list">
        <li><i class="fa-solid fa-award"></i> <span><strong>Calidad:</strong> ${rep.calidad}</span></li>
        <li><i class="fa-solid fa-mobile-screen"></i> <span><strong>Compatible con:</strong> ${rep.modelo}</span></li>
        <li><i class="fa-solid fa-screwdriver-wrench"></i> <span>Disponible para compra directa o instalación en tienda</span></li>
      </ul>

      <div class="modal-actions">
        <button type="button" class="btn-direct-ws" onclick="cerrarModal(); cotizarRepuestoInstalado(${rep.id});">
          <i class="fa-brands fa-whatsapp"></i> Consultar con instalación
        </button>
        <button type="button" class="btn-modal-cart" onclick="cerrarModal(); agregarAlCarrito(${rep.id});">
          <i class="fa-solid fa-cart-plus"></i> Agregar a mi lista de pedido
        </button>
      </div>
    </div>
  `;

  productModal.classList.add("open");
}

function cotizarRepuestoInstalado(id) {
  if (typeof REPUESTOS_IFOX === "undefined") return;
  const rep = REPUESTOS_IFOX.find(r => r.id === id);
  if (!rep) return;

  const precioRef = rep.precio > 0 ? ` (ref. $${rep.precio})` : "";
  const mensaje = `Hola *IFOX CELL*, me interesa el repuesto *${rep.nombre}* calidad *${rep.calidad}*${precioRef}. ¿Qué costo tiene ya instalado y cuánto demora?`;
  abrirSelectorWhatsApp(mensaje);
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
            <button type="button" class="btn-direct-ws" style="width:100%; font-size:0.8rem; padding:9px;" onclick="cerrarComparador(); consultarEquipoDirecto(${p1.id});">
              <i class="fa-brands fa-whatsapp"></i> Elegir este
            </button>
          </td>
          <td>
            <button type="button" class="btn-direct-ws" style="width:100%; font-size:0.8rem; padding:9px;" onclick="cerrarComparador(); consultarEquipoDirecto(${p2.id});">
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
      <img src="${prod.imagen}" alt="${prod.nombre}" style="${prod.enfoque ? `object-position: ${prod.enfoque};` : ""}"
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
        <button type="button" class="btn-direct-ws" onclick="cerrarModal(); consultarEquipoDirecto(${prod.id});">
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
  abrirSelectorWhatsApp(mensaje);
}

function agregarAlCarrito(id) {
  const producto = obtenerCatalogoCompleto().find(p => p.id === id);
  if (!producto) return;
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

// Los pedidos del carrito van directo a Atención de Ventas
sendWsBtn.addEventListener("click", () => {
  if (carrito.length === 0) return;

  let mensaje = "Hola *IFOX CELL* (Atención de Ventas), me gustaría realizar el siguiente pedido:\n\n";
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

  const numeroVentas = CONFIG_TIENDA.telefonoVentas || "584226363817";
  window.open(`https://wa.me/${numeroVentas}?text=${encodeURIComponent(mensaje)}`, "_blank");
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

document.querySelectorAll(".rep-chip").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".rep-chip").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    tipoRepuestoActual = btn.dataset.reptipo;
    mostrarRepuestos();
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

wsSelectorModal.addEventListener("click", (e) => {
  if (e.target === wsSelectorModal) cerrarSelectorWhatsApp();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    cerrarModal();
    cerrarComparador();
    cerrarGuiaComparar();
    cerrarSelectorWhatsApp();
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
cargarModelosRepuestos();
mostrarRepuestos();