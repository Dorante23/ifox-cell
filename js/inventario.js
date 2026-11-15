// Configuración general de IFOX CELL
const CONFIG_TIENDA = {
  telefono: "584245405259", // <-- Pon aquí tu número de prueba (o el de Luis)
  instagram: "https://instagram.com/",
  horario: "Lunes a Sábado: 9:00 AM - 6:00 PM",
  ubicacion: "C.C. París, Av. Lara, Barquisimeto, Edo. Lara (y delivery coordinado)"
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
  }
];