// Configuración general de IFOX CELL
const CONFIG_TIENDA = {
  nombre: "IFOX CELL",
  telefono: "584226363817",
  telefonoVentas: "584226363817", // Atención de Ventas: 0422-6363817
  telefonoTienda: "584122200980", // Tienda IFOX CELL: 0412-2200980
  instagram: "https://www.instagram.com/ifoxcell_?evlk=MTl6cmZnYzN4dW9nZg==",
  ubicacion: "C.C. París, Av. Lara, Barquisimeto, Edo. Lara",
  horario: "Lunes a Sábado: 10:00 AM - 7:00 PM"
};

// Inventario actual de la tienda
const INVENTARIO_IFOX = [
  {
    id: 1,
    nombre: "iPhone 17 Pro Max Silver",
    categoria: "iPhone",
    estado: "Seminuevo",
    recienLlegado: true,
    precio: 0,
    bateria: 89,
    specs: "256GB • Totalmente liberado • 89% de batería",
    incluye: "Caja original + Cable de carga",
    garantia: "Garantía verificada por tienda",
    imagen: "assets/img/iphone17pm.jpeg"
  },
  {
    id: 2,
    nombre: "iPhone 16 Pro Max Dorado",
    categoria: "iPhone",
    estado: "Seminuevo",
    recienLlegado: false,
    precio: 0,
    bateria: 89,
    specs: "256GB • 89% de batería • Incluye caja",
    incluye: "Caja original + Cable de carga",
    garantia: "Garantía verificada por tienda",
    imagen: "assets/img/iphone16pm.jpeg"
  },
  {
    id: 3,
    nombre: "iPhone 14 Pro Max",
    categoria: "iPhone",
    estado: "Seminuevo",
    recienLlegado: false,
    precio: 0,
    bateria: 100,
    specs: "256GB • SIM física • 100% de batería",
    incluye: "Cable de carga rápido",
    garantia: "Garantía verificada por tienda",
    imagen: "assets/img/iphone14pm.jpeg"
  },
  {
    id: 4,
    nombre: "iPad 11 (A16) Yellow",
    categoria: "iPad",
    estado: "Como nuevo",
    recienLlegado: true,
    precio: 0,
    bateria: 100,
    specs: "128GB • 100% de batería (3 ciclos de carga)",
    incluye: "Equipo impecable (solo 3 ciclos de uso)",
    garantia: "Garantía verificada por tienda",
    imagen: "assets/img/ipad11.jpeg"
  },
  {
    id: 5,
    nombre: "Power Bank 20000mAh",
    categoria: "Accesorios",
    estado: "Nuevo",
    recienLlegado: false,
    precio: 0,
    bateria: null,
    specs: "Capacidad 20.000 mAh • Carga rápida • Múltiples puertos",
    incluye: "Caja original + Cable de carga",
    garantia: "Garantía verificada por tienda",
    imagen: "assets/img/powerbank-20000.jpeg"
  },
  {
    id: 6,
    nombre: "Power Bank 10000mAh",
    categoria: "Accesorios",
    estado: "Nuevo",
    recienLlegado: false,
    precio: 0,
    bateria: null,
    specs: "Capacidad 10.000 mAh • Diseño compacto • Carga rápida",
    incluye: "Caja original + Cable de carga",
    garantia: "Garantía verificada por tienda",
    imagen: "assets/img/powerbank-10000.jpeg",
    enfoque: "center 82%"
  },
  {
    id: 7,
    nombre: "Cargador 20W USB-C",
    categoria: "Accesorios",
    estado: "Nuevo",
    recienLlegado: false,
    precio: 0,
    bateria: null,
    specs: "Adaptador de corriente 20W • Carga rápida para iPhone y iPad",
    incluye: "Cubo cargador 20W en caja",
    garantia: "Garantía verificada por tienda",
    imagen: "assets/img/cargador-20w.jpeg"
  },
  {
    id: 8,
    nombre: "Apple Watch Series 10 GPS",
    categoria: "Accesorios",
    estado: "Nuevo",
    recienLlegado: true,
    precio: 0,
    bateria: null,
    specs: "Versión GPS • Pantalla Retina siempre activa • Nuevo",
    incluye: "Caja sellada + Correa + Cable de carga magnético",
    garantia: "Garantía verificada por tienda",
    imagen: "assets/img/apple-watch-s10.jpeg",
    enfoque: "center 90%"
  },
  {
    id: 9,
    nombre: "Mini UPS 13500mAh",
    categoria: "Accesorios",
    estado: "Nuevo",
    recienLlegado: false,
    precio: 0,
    bateria: null,
    specs: "Respaldo de batería 13.500 mAh para router y módem",
    incluye: "Mini UPS + Cables de conexión + Caja",
    garantia: "Garantía verificada por tienda",
    imagen: "assets/img/mini-ups-13500.jpeg",
    enfoque: "center 90%"
  }
];

// ==========================================
// INVENTARIO DE REPUESTOS POR MODELO
// ==========================================
const REPUESTOS_IFOX = [
  {
    id: 101,
    modelo: "iPhone 13",
    tipo: "Cámara",
    calidad: "Original Extraída",
    nombre: "Módulo Cámara Trasera Dual iPhone 13",
    precio: 0,
    imagen: "assets/img/camara-trasera-iphone13.jpeg"
  },
  {
    id: 102,
    modelo: "iPhone 13",
    tipo: "Cámara",
    calidad: "Original Extraída",
    nombre: "Cámara Frontal + Módulo Face ID iPhone 13",
    precio: 0,
    imagen: "assets/img/camara-frontal-iphone13.jpeg"
  },
  {
    id: 103,
    modelo: "iPhone 13",
    tipo: "Altavoz",
    calidad: "Original Extraído",
    nombre: "Altavoz Inferior / Timbre iPhone 13",
    precio: 0,
    imagen: "assets/img/altavoz-iphone13.jpeg"
  },
  {
    id: 104,
    modelo: "iPhone 13",
    tipo: "Batería",
    calidad: "Certificada 100%",
    nombre: "Batería iPhone 13 (Alta Capacidad)",
    precio: 0,
    imagen: "assets/img/bateria-iphone13.jpeg"
  }

  
  
];

