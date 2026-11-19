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
  },
  {
    id: 10,
    nombre: "iMac 19,2 (A2116) 2019",
    categoria: "iMac",
    estado: "Seminuevo",
    recienLlegado: true,
    precio: 0,
    bateria: null,
    specs: "1TB HDD + SSD • 16GB RAM • Modelo A2116",
    incluye: "Cable de corriente original",
    garantia: "Garantía verificada por tienda",
    imagen: "assets/img/imac-a2116-1tb.jpeg",
    enfoque: "center 68%"
  },
  {
    id: 11,
    nombre: "iMac 19,2 (A2116) 2019",
    categoria: "iMac",
    estado: "Seminuevo",
    recienLlegado: true,
    precio: 0,
    bateria: null,
    specs: "256GB SSD • 16GB RAM • Modelo A2116",
    incluye: "Cable de corriente original",
    garantia: "Garantía verificada por tienda",
    imagen: "assets/img/imac-a2116-256gb.jpeg",
    enfoque: "center 68%"
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
  },
  {
    id: 105,
    modelo: "iPhone 14",
    tipo: "Flex",
    calidad: "Original Extraída",
    nombre: "Bobina de Carga Inalámbrica con Botones iPhone 14",
    precio: 0,
    imagen: "assets/img/bobina-botones-iphone14.jpeg"
  },
  {
    id: 106,
    modelo: "iPhone 13",
    tipo: "Flex",
    calidad: "Original Extraído",
    nombre: "Flex de Carga iPhone 13",
    precio: 0,
    imagen: "assets/img/flex-carga-iphone13.jpeg"
  },
  {
    id: 107,
    modelo: "iPhone 13",
    tipo: "Sensor",
    calidad: "Original Extraído",
    nombre: "Sensor de Proximidad iPhone 13",
    precio: 0,
    imagen: "assets/img/sensor-proximidad-iphone13.jpeg"
  },
  {
    id: 108,
    modelo: "iPhone 13",
    tipo: "Antena",
    calidad: "Original Extraída",
    nombre: "Antena de Wi-Fi iPhone 13",
    precio: 0,
    imagen: "assets/img/antena-wifi-iphone13.jpeg"
  },
  {
    id: 109,
    modelo: "iPhone 13",
    tipo: "Flash",
    calidad: "Original Extraído",
    nombre: "Flash Trasero iPhone 13",
    precio: 0,
    imagen: "assets/img/flash-iphone13.jpeg"
  },
  {
    id: 110,
    modelo: "iPhone 13",
    tipo: "Flex",
    calidad: "Original Extraído",
    nombre: "Flex de Antena Bluetooth y Micrófono Trasero iPhone 13",
    precio: 0,
    imagen: "assets/img/antena-bt-microfono-iphone13.jpeg"
  },
  {
    id: 111,
    modelo: "iPhone 13",
    tipo: "Altavoz",
    calidad: "Original Extraído",
    nombre: "Auricular Superior iPhone 13",
    precio: 0,
    imagen: "assets/img/auricular-iphone13.jpeg"
  },
  {
    id: 112,
    modelo: "iPhone 13",
    tipo: "Lector SIM",
    calidad: "Original Extraído",
    nombre: "Bandeja / Lector SIM iPhone 13",
    precio: 0,
    imagen: "assets/img/bandeja-sim-iphone13.jpeg"
  },
  {
    id: 113,
    modelo: "iPhone 13",
    tipo: "Vibrador",
    calidad: "Original Extraído",
    nombre: "Vibra col iPhone 13",
    precio: 0,
    imagen: "assets/img/vibra-col-iPhone 13.jpeg"
  },
  {
    id: 114,
    modelo: "iPhone 13",
    tipo: "Antena",
    calidad: "Original Extraída",
    nombre: "Antena GPS iPhone 13",
    precio: 0,
    imagen: "assets/img/antena-gps-iphone13.jpeg"
  }
];