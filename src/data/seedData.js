// Base64 sample industrial photos (zero external dependency, instant load in PDF & UI)
// Realistic industrial photos: hydraulic leak, pressure gauge in green, fire extinguisher pin, electrical panel
export const MOCK_EVIDENCE_PHOTOS = {
  hydraulic_leak: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'><rect width='600' height='450' fill='%231e293b'/><rect x='40' y='40' width='520' height='370' rx='8' fill='%23334155'/><circle cx='300' cy='225' r='120' fill='%230f172a'/><path d='M250,210 Q300,160 350,210 Q390,260 300,320 Q210,260 250,210 Z' fill='%23ea580c' opacity='0.85'/><path d='M285,180 L315,180 L300,240 Z' fill='%23f97316'/><circle cx='300' cy='265' r='10' fill='%23f97316'/><text x='300' y='380' font-family='sans-serif' font-size='16' fill='%23f8fafc' text-anchor='middle' font-weight='bold'>EVIDENCIA: FISURA EN MANGUERA HIDRÁULICA RETORNO</text><rect x='60' y='60' width='140' height='28' rx='4' fill='%23dc2626'/><text x='130' y='79' font-family='sans-serif' font-size='12' fill='%23ffffff' text-anchor='middle' font-weight='bold'>NO CONFORME</text></svg>",
  extinguisher_ok: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'><rect width='600' height='450' fill='%230f172a'/><rect x='40' y='40' width='520' height='370' rx='8' fill='%231e293b'/><circle cx='300' cy='225' r='110' fill='%23064e3b'/><circle cx='300' cy='225' r='90' fill='%23059669'/><line x1='300' y1='225' x2='300' y2='160' stroke='%23ffffff' stroke-width='8' stroke-linecap='round'/><circle cx='300' cy='225' r='16' fill='%23ffffff'/><text x='300' y='380' font-family='sans-serif' font-size='16' fill='%23f8fafc' text-anchor='middle' font-weight='bold'>MANÓMETRO EN RANGO OPERATIVO (195 PSI)</text><rect x='60' y='60' width='120' height='28' rx='4' fill='%23059669'/><text x='120' y='79' font-family='sans-serif' font-size='12' fill='%23ffffff' text-anchor='middle' font-weight='bold'>CONFORME</text></svg>",
  electrical_panel: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'><rect width='600' height='450' fill='%230f172a'/><rect x='40' y='40' width='520' height='370' rx='8' fill='%23334155'/><rect x='100' y='100' width='180' height='120' fill='%23475569' rx='6'/><rect x='320' y='100' width='180' height='120' fill='%23475569' rx='6'/><rect x='100' y='240' width='400' height='70' fill='%231e293b' rx='6'/><circle cx='130' cy='130' r='12' fill='%2322c55e'/><circle cx='170' cy='130' r='12' fill='%2322c55e'/><circle cx='210' cy='130' r='12' fill='%2322c55e'/><circle cx='350' cy='130' r='12' fill='%23eab308'/><text x='300' y='380' font-family='sans-serif' font-size='16' fill='%23f8fafc' text-anchor='middle' font-weight='bold'>TABLERO PRINCIPAL TGD-01 - INSPECCIÓN TERMOGRÁFICA</text><rect x='60' y='60' width='120' height='28' rx='4' fill='%23059669'/><text x='120' y='79' font-family='sans-serif' font-size='12' fill='%23ffffff' text-anchor='middle' font-weight='bold'>OPERATIVO</text></svg>",
  generic_inspection: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'><rect width='600' height='450' fill='%230f172a'/><rect x='40' y='40' width='520' height='370' rx='8' fill='%231e293b'/><circle cx='300' cy='210' r='80' fill='%230284c7'/><path d='M270,210 L290,230 L330,190' stroke='%23ffffff' stroke-width='12' stroke-linecap='round' stroke-linejoin='round' fill='none'/><text x='300' y='360' font-family='sans-serif' font-size='16' fill='%23f8fafc' text-anchor='middle' font-weight='bold'>REGISTRO DE CAMPO - EVIDENCIA VERIFICADA</text></svg>"
};

export const INITIAL_COMPANIES = [
  {
    id: "emp-1",
    nombre: "Industrias Demo del Pacífico S.A.",
    ruc: "0992345678001",
    ciudad: "Guayaquil",
    direccion: "Vía a Daule Km 12.5, Parque Industrial Sauces",
    telefono: "04-2890100",
    sector: "Manufactura y Envasado Industrial",
    logoColor: "#0284c7"
  },
  {
    id: "emp-2",
    nombre: "Servicios Demo Técnicos del Ecuador Cía. Ltda.",
    ruc: "1791823456001",
    ciudad: "Quito",
    direccion: "Av. Galo Plaza Lasso y De los Cipreses, Carcelén Industrial",
    telefono: "02-2483900",
    sector: "Mantenimiento Electromecánico & Logística",
    logoColor: "#059669"
  }
];

export const INITIAL_USERS = [
  // Empresa 1
  {
    id: "usr-1",
    empresa_id: "emp-1",
    nombre: "Ing. Carlos Mendoza R.",
    correo: "carlos.mendoza@demo.com",
    rol: "Administrador",
    cargo: "Gerente de Operaciones y SST",
    activo: true
  },
  {
    id: "usr-2",
    empresa_id: "emp-1",
    nombre: "Ing. Marco Viteri P.",
    correo: "marco.viteri@demo.com",
    rol: "Supervisor",
    cargo: "Jefe de Mantenimiento Preventivo",
    activo: true
  },
  {
    id: "usr-3",
    empresa_id: "emp-1",
    nombre: "Ing. Patricia Andrade",
    correo: "patricia.andrade@demo.com",
    rol: "Supervisor",
    cargo: "Coordinadora de Seguridad Industrial",
    activo: true
  },
  {
    id: "usr-4",
    empresa_id: "emp-1",
    nombre: "Diana Morales G.",
    correo: "diana.morales@demo.com",
    rol: "Inspector",
    cargo: "Inspectora Técnica de Seguridad",
    activo: true
  },
  {
    id: "usr-5",
    empresa_id: "emp-1",
    nombre: "Roberto Noboa C.",
    correo: "roberto.noboa@demo.com",
    rol: "Inspector",
    cargo: "Técnico Mecánico de Planta",
    activo: true
  },
  {
    id: "usr-6",
    empresa_id: "emp-1",
    nombre: "Luis Cevallos M.",
    correo: "luis.cevallos@demo.com",
    rol: "Inspector",
    cargo: "Operador Líder de Montacargas",
    activo: true
  },
  {
    id: "usr-7",
    empresa_id: "emp-1",
    nombre: "Andrea Villacís T.",
    correo: "andrea.villacis@demo.com",
    rol: "Inspector",
    cargo: "Inspectora de Aseguramiento de Calidad",
    activo: true
  },
  {
    id: "usr-8",
    empresa_id: "emp-1",
    nombre: "Javier Zambrano B.",
    correo: "javier.zambrano@demo.com",
    rol: "Inspector",
    cargo: "Técnico Electricista",
    activo: true
  },
  // Empresa 2 (Para validar aislamiento multi-tenant)
  {
    id: "usr-9",
    empresa_id: "emp-2",
    nombre: "Ing. Fernando Castro",
    correo: "fernando.castro@demo.com",
    rol: "Administrador",
    cargo: "Director de Servicios Técnicos",
    activo: true
  },
  {
    id: "usr-10",
    empresa_id: "emp-2",
    nombre: "Ing. Gabriela Salazar",
    correo: "gabriela.salazar@demo.com",
    rol: "Supervisor",
    cargo: "Supervisora de Operaciones Quito",
    activo: true
  },
  {
    id: "usr-11",
    empresa_id: "emp-2",
    nombre: "Miguel Ángel Torres",
    correo: "miguel.torres@demo.com",
    rol: "Inspector",
    cargo: "Técnico Inspector de Flota",
    activo: true
  }
];

export const INITIAL_PLANTILLAS = [
  {
    id: "plt-1",
    empresa_id: "emp-1",
    nombre: "Inspección Pre-Operacional de Montacargas",
    tipo_activo: "Montacargas",
    codigo_norma: "SST-CHK-MC01 / OSHA 1910.178",
    frecuencia_sugerida: "Diaria / Turno",
    activa: true,
    preguntas: [
      { id: "p1-1", orden: 1, texto: "¿Horquillas y cadenas de elevación sin fisuras ni desgaste severo?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p1-2", orden: 2, texto: "¿Sistema hidráulico libre de fugas de aceite (cilindro y mangueras)?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p1-3", orden: 3, texto: "¿Presión y estado físico de neumáticos adecuado (sin cortes)?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p1-4", orden: 4, texto: "Nivel de aceite de motor (15W-40) y líquido de frenos", tipo: "opcion", opciones: ["Nivel Óptimo", "Bajo (Rellenar)", "Crítico"], valor_esperado: "Nivel Óptimo", obligatoria: true },
      { id: "p1-5", orden: 5, texto: "Horómetro actual del equipo", tipo: "numero", obligatoria: true, unidad: "Horas" },
      { id: "p1-6", orden: 6, texto: "¿Cinturón de seguridad y enclavamiento operativo?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p1-7", orden: 7, texto: "¿Alarma de reversa, claxon y baliza estroboscópica funcionando?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p1-8", orden: 8, texto: "¿Extintor PQS 5 lbs a bordo con pasador, precinto y manómetro verde?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p1-9", orden: 9, texto: "Fotografía de evidencia general del equipo al iniciar turno", tipo: "foto", obligatoria: false },
      { id: "p1-10", orden: 10, texto: "Observaciones del operador o ruidos extraños", tipo: "texto", obligatoria: false }
    ]
  },
  {
    id: "plt-2",
    empresa_id: "emp-1",
    nombre: "Inspección Mensual de Extintores Portátiles",
    tipo_activo: "Extintor",
    codigo_norma: "SST-EXT-NFPA10 / INEN 739",
    frecuencia_sugerida: "Mensual",
    activa: true,
    preguntas: [
      { id: "p2-1", orden: 1, texto: "¿Ubicación libre de obstáculos (acceso 100% despejado a 1 metro)?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p2-2", orden: 2, texto: "¿Señalética fotoluminiscente y número de identificación visible a 2m?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p2-3", orden: 3, texto: "¿Manómetro indicador de presión en rango operativo (zona verde)?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p2-4", orden: 4, texto: "¿Pasador metálico y precinto plástico de seguridad intactos?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p2-5", orden: 5, texto: "¿Manguera y corneta de descarga sin fisuras ni obstrucciones?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p2-6", orden: 6, texto: "¿Cilindro sin corrosión, abolladuras ni soldaduras deterioradas?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p2-7", orden: 7, texto: "Registro de peso actual del extintor (lbs)", tipo: "numero", obligatoria: true, unidad: "lbs" },
      { id: "p2-8", orden: 8, texto: "Fotografía del manómetro y precinto de seguridad", tipo: "foto", obligatoria: true }
    ]
  },
  {
    id: "plt-3",
    empresa_id: "emp-1",
    nombre: "Mantenimiento & Chequeo de Generador Diésel",
    tipo_activo: "Generador",
    codigo_norma: "MP-GEN-ISO8528",
    frecuencia_sugerida: "Semanal / Mensual",
    activa: true,
    preguntas: [
      { id: "p3-1", orden: 1, texto: "Nivel de combustible diésel en tanque diario (%)", tipo: "numero", obligatoria: true, unidad: "%" },
      { id: "p3-2", orden: 2, texto: "¿Nivel de refrigerante en tanque de expansión óptimo?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p3-3", orden: 3, texto: "¿Nivel de aceite de motor 15W-40 en varilla de medición correcto?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p3-4", orden: 4, texto: "Voltaje en bornes de baterías de arranque (DC)", tipo: "numero", obligatoria: true, unidad: "VDC" },
      { id: "p3-5", orden: 5, texto: "¿Calefactor de camisas de agua (precalentador) operando tibio?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p3-6", orden: 6, texto: "¿Selector del módulo DeepSea / ComAp en modo AUTOMÁTICO?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p3-7", orden: 7, texto: "¿Ausencia de fugas de combustible, aceite o refrigerante en bandeja?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p3-8", orden: 8, texto: "Prueba de arranque sin carga (3 minutos) exitosa", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p3-9", orden: 9, texto: "Frecuencia generada en vacío (Hz)", tipo: "numero", obligatoria: true, unidad: "Hz" },
      { id: "p3-10", orden: 10, texto: "Fotografía del panel de control con parámetros en marcha", tipo: "foto", obligatoria: false },
      { id: "p3-11", orden: 11, texto: "Observaciones del técnico mecánico", tipo: "texto", obligatoria: false }
    ]
  },
  {
    id: "plt-4",
    empresa_id: "emp-1",
    nombre: "Inspección de Seguridad Industrial y Orden (5S)",
    tipo_activo: "Seguridad General",
    codigo_norma: "SST-GEN-ISO45001",
    frecuencia_sugerida: "Semanal",
    activa: true,
    preguntas: [
      { id: "p4-1", orden: 1, texto: "¿Pasillos y demarcaciones peatonales amarillas 100% despejadas?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p4-2", orden: 2, texto: "¿Salidas de emergencia y puertas de escape sin cerrojos ni estibas?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p4-3", orden: 3, texto: "¿Personal en planta con casco, gafas, calzado de seguridad y chaleco?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p4-4", orden: 4, texto: "¿Estaciones lavaojos y duchas de emergencia con presión adecuada?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p4-5", orden: 5, texto: "¿Productos químicos con rombo NFPA 704 / SGA y bandeja antiderrame?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p4-6", orden: 6, texto: "¿Iluminación general y luces de emergencia operativas?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p4-7", orden: 7, texto: "Registro fotográfico de condición de riesgo detectada", tipo: "foto", obligatoria: false },
      { id: "p4-8", orden: 8, texto: "Detalle de hallazgo o recomendación correctiva", tipo: "texto", obligatoria: false }
    ]
  },
  // Plantilla para Empresa 2
  {
    id: "plt-5",
    empresa_id: "emp-2",
    nombre: "Checklist Pre-Ruta de Vehículos de Servicio",
    tipo_activo: "Flota Vehicular",
    codigo_norma: "SERV-CHK-V01",
    frecuencia_sugerida: "Diaria",
    activa: true,
    preguntas: [
      { id: "p5-1", orden: 1, texto: "¿Niveles de aceite y refrigerante correctos?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p5-2", orden: 2, texto: "¿Luces altas, bajas, direccionales e intermitentes?", tipo: "si_no", valor_esperado: "si", obligatoria: true },
      { id: "p5-3", orden: 3, texto: "Kilometraje inicial de salida", tipo: "numero", obligatoria: true, unidad: "Km" },
      { id: "p5-4", orden: 4, texto: "¿Botiquín y kit de carretera completos y vigentes?", tipo: "si_no", valor_esperado: "si", obligatoria: true }
    ]
  }
];

export const INITIAL_ACTIVOS = [
  // Empresa 1 (Industrias Demo del Pacífico) - 26 activos variados
  {
    id: "act-1",
    empresa_id: "emp-1",
    codigo: "MC-01",
    nombre: "Montacargas Combustión Toyota 8FGU25 #01",
    tipo: "Montacargas",
    ubicacion: "Bodega de Producto Terminado - Vía a Daule",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-MC01",
    plantilla_id: "plt-1",
    marca: "Toyota",
    modelo: "8FGU25 (Capacidad 2.5 Ton)",
    serie: "8FGU25-68214",
    ano: 2022
  },
  {
    id: "act-2",
    empresa_id: "emp-1",
    codigo: "MC-02",
    nombre: "Montacargas Eléctrico Crown FC5200 #02",
    tipo: "Montacargas",
    ubicacion: "Cámara de Frío y Despachos",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-MC02",
    plantilla_id: "plt-1",
    marca: "Crown",
    modelo: "FC5225-50",
    serie: "CRW-2023-9941",
    ano: 2023
  },
  {
    id: "act-3",
    empresa_id: "emp-1",
    codigo: "GEN-01",
    nombre: "Generador Diésel Cummins C150D5 150kVA",
    tipo: "Generador",
    ubicacion: "Caseta Técnica de Fuerza Eléctrica",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-GEN01",
    plantilla_id: "plt-3",
    marca: "Cummins",
    modelo: "C150D5 PowerCommand",
    serie: "CUM-EC-2021-410",
    ano: 2021
  },
  {
    id: "act-4",
    empresa_id: "emp-1",
    codigo: "EXT-01",
    nombre: "Extintor PQS 10 lbs Amerex - Bodega Químicos",
    tipo: "Extintor",
    ubicacion: "Nave 2 - Estación de Carga de Baterías",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-EXT01",
    plantilla_id: "plt-2",
    marca: "Amerex",
    modelo: "B441 (PQS ABC)",
    serie: "AMX-88319-PQS",
    ano: 2024
  },
  {
    id: "act-5",
    empresa_id: "emp-1",
    codigo: "EXT-02",
    nombre: "Extintor CO2 10 lbs Badger - Tablero TGD-01",
    tipo: "Extintor",
    ubicacion: "Subestación Eléctrica 480V",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-EXT02",
    plantilla_id: "plt-2",
    marca: "Badger",
    modelo: "Extra Carbon Dioxide 10",
    serie: "BDG-2023-7721",
    ano: 2023
  },
  {
    id: "act-6",
    empresa_id: "emp-1",
    codigo: "COMP-01",
    nombre: "Compresor de Tornillo Ingersoll Rand Nirvana 50HP",
    tipo: "Compresor",
    ubicacion: "Sala de Compresores y Neumática",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-COMP01",
    plantilla_id: "plt-3",
    marca: "Ingersoll Rand",
    modelo: "Nirvana 50 HP VSD",
    serie: "IR-NIR-55102",
    ano: 2020
  },
  {
    id: "act-7",
    empresa_id: "emp-1",
    codigo: "EXT-03",
    nombre: "Extintor Rodante PQS 50 lbs Buckeye",
    tipo: "Extintor",
    ubicacion: "Patio de Tanques de Almacenamiento Diésel",
    estado: "mantenimiento_requerido",
    codigo_qr: "INSPEC-ACT-EXT03",
    plantilla_id: "plt-2",
    marca: "Buckeye",
    modelo: "Wheeled 50 lb Regular",
    serie: "BCK-2022-3341",
    ano: 2022
  },
  {
    id: "act-8",
    empresa_id: "emp-1",
    codigo: "TAB-01",
    nombre: "Tablero de Distribución General Schneider TGD-01",
    tipo: "Tableros Eléctricos",
    ubicacion: "Subestación Principal de Mando",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-TAB01",
    plantilla_id: "plt-4",
    marca: "Schneider Electric",
    modelo: "PrismaSeT P 3200A",
    serie: "SCH-TGD-2021",
    ano: 2021
  },
  {
    id: "act-9",
    empresa_id: "emp-1",
    codigo: "SEG-01",
    nombre: "Nave 1 - Línea de Envasado de Líquidos",
    tipo: "Seguridad General",
    ubicacion: "Nave 1 - Envasado Automatizado",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-SEG01",
    plantilla_id: "plt-4",
    marca: "Planta Industrial",
    modelo: "Línea Alta Velocidad Krones",
    serie: "L1-ENV-2020",
    ano: 2020
  },
  {
    id: "act-10",
    empresa_id: "emp-1",
    codigo: "MC-03",
    nombre: "Montacargas Apilador Raymond Reach 7500",
    tipo: "Montacargas",
    ubicacion: "Racks de Alta Densidad - Pasillo 4",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-MC03",
    plantilla_id: "plt-1",
    marca: "Raymond",
    modelo: "Reach-Fork 7500",
    serie: "RAY-7500-1192",
    ano: 2023
  },
  {
    id: "act-11",
    empresa_id: "emp-1",
    codigo: "EXT-04",
    nombre: "Extintor PQS 20 lbs Ansul Sentry - Taller Mecánico",
    tipo: "Extintor",
    ubicacion: "Taller Central de Torno y Soldadura",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-EXT04",
    plantilla_id: "plt-2",
    marca: "Ansul",
    modelo: "Sentry AA20",
    serie: "ANS-8841-02",
    ano: 2022
  },
  {
    id: "act-12",
    empresa_id: "emp-1",
    codigo: "COMP-02",
    nombre: "Compresor Pistón Kaeser Airtower 19",
    tipo: "Compresor",
    ubicacion: "Laboratorio de Control de Calidad",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-COMP02",
    plantilla_id: "plt-3",
    marca: "Kaeser",
    modelo: "Airtower 19 Plus",
    serie: "KSR-AIR-994",
    ano: 2021
  },
  {
    id: "act-13",
    empresa_id: "emp-1",
    codigo: "GEN-02",
    nombre: "Generador Diésel Auxiliar Kohler 60kVA",
    tipo: "Generador",
    ubicacion: "Edificio Administrativo y TI",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-GEN02",
    plantilla_id: "plt-3",
    marca: "Kohler",
    modelo: "60REOZJC",
    serie: "KOH-60-2022",
    ano: 2022
  },
  {
    id: "act-14",
    empresa_id: "emp-1",
    codigo: "EXT-05",
    nombre: "Extintor Acetato de Potasio Tipo K - Comedor",
    tipo: "Extintor",
    ubicacion: "Cocina y Comedor de Personal",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-EXT05",
    plantilla_id: "plt-2",
    marca: "Amerex",
    modelo: "B260 Wet Chemical",
    serie: "AMX-K-2210",
    ano: 2023
  },
  {
    id: "act-15",
    empresa_id: "emp-1",
    codigo: "TAB-02",
    nombre: "Tablero Secundario de Fuerza CCM-02",
    tipo: "Tableros Eléctricos",
    ubicacion: "Área de Calderas y Tratamiento de Agua",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-TAB02",
    plantilla_id: "plt-4",
    marca: "ABB",
    modelo: "MNS 3.0 Motor Control Center",
    serie: "ABB-CCM-02",
    ano: 2021
  },
  {
    id: "act-16",
    empresa_id: "emp-1",
    codigo: "MC-04",
    nombre: "Montacargas Yale GLP GP050VX #04",
    tipo: "Montacargas",
    ubicacion: "Patio de Carga y Descarga de Trailers",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-MC04",
    plantilla_id: "plt-1",
    marca: "Yale",
    modelo: "GP050VX Veracitor",
    serie: "YAL-GP50-554",
    ano: 2021
  },
  {
    id: "act-17",
    empresa_id: "emp-1",
    codigo: "EXT-06",
    nombre: "Extintor PQS 10 lbs - Bodega de Repuestos",
    tipo: "Extintor",
    ubicacion: "Mezanine de Almacén Técnico",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-EXT06",
    plantilla_id: "plt-2",
    marca: "Amerex",
    modelo: "B402",
    serie: "AMX-402-990",
    ano: 2024
  },
  {
    id: "act-18",
    empresa_id: "emp-1",
    codigo: "SEG-02",
    nombre: "Área de Tratamiento de Aguas Residuales (PTAR)",
    tipo: "Seguridad General",
    ubicacion: "Planta de Tratamiento Posterior",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-SEG02",
    plantilla_id: "plt-4",
    marca: "BioPlanta",
    modelo: "Reactor Aeróbico 120m3",
    serie: "PTAR-2019-EC",
    ano: 2019
  },
  {
    id: "act-19",
    empresa_id: "emp-1",
    codigo: "COMP-03",
    nombre: "Secador Frigorífico de Aire Comprimido SMC",
    tipo: "Compresor",
    ubicacion: "Sala Neumática Nave 1",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-COMP03",
    plantilla_id: "plt-3",
    marca: "SMC",
    modelo: "IDF55E Refrigerated Dryer",
    serie: "SMC-IDF-330",
    ano: 2022
  },
  {
    id: "act-20",
    empresa_id: "emp-1",
    codigo: "EXT-07",
    nombre: "Extintor CO2 15 lbs - Sala de Servidores TI",
    tipo: "Extintor",
    ubicacion: "Centro de Cómputo Datacenter",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-EXT07",
    plantilla_id: "plt-2",
    marca: "Badger",
    modelo: "CO2 Model 15",
    serie: "BDG-TI-150",
    ano: 2023
  },
  {
    id: "act-21",
    empresa_id: "emp-1",
    codigo: "MC-05",
    nombre: "Montacargas Transpaleta Eléctrica BT Levio",
    tipo: "Montacargas",
    ubicacion: "Zona de Picking y Packing",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-MC05",
    plantilla_id: "plt-1",
    marca: "Toyota BT",
    modelo: "LWE180",
    serie: "BT-LWE-771",
    ano: 2023
  },
  {
    id: "act-22",
    empresa_id: "emp-1",
    codigo: "TAB-03",
    nombre: "Tablero de Alumbrado y Tomacorrientes TD-B1",
    tipo: "Tableros Eléctricos",
    ubicacion: "Bodega de Insumos y Empaques",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-TAB03",
    plantilla_id: "plt-4",
    marca: "Square D",
    modelo: "NQ Panelboard 42 Circuitos",
    serie: "SQD-NQ-229",
    ano: 2022
  },
  {
    id: "act-23",
    empresa_id: "emp-1",
    codigo: "EXT-08",
    nombre: "Extintor PQS 10 lbs - Caseta de Guardia Principal",
    tipo: "Extintor",
    ubicacion: "Garita de Acceso Vehicular Vía Daule",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-EXT08",
    plantilla_id: "plt-2",
    marca: "Amerex",
    modelo: "B441",
    serie: "AMX-GAR-01",
    ano: 2024
  },
  {
    id: "act-24",
    empresa_id: "emp-1",
    codigo: "GEN-03",
    nombre: "Generador Portátil a Gasolina Honda EU7000is",
    tipo: "Generador",
    ubicacion: "Vehículo Móvil de Mantenimiento",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-GEN03",
    plantilla_id: "plt-3",
    marca: "Honda",
    modelo: "EU7000is Inverter",
    serie: "HND-7000-88",
    ano: 2023
  },
  {
    id: "act-25",
    empresa_id: "emp-1",
    codigo: "EXT-09",
    nombre: "Extintor PQS 10 lbs - Muelle de Descarga 3",
    tipo: "Extintor",
    ubicacion: "Muelle de Embarque y Logística",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-EXT09",
    plantilla_id: "plt-2",
    marca: "Amerex",
    modelo: "B441",
    serie: "AMX-MUE-03",
    ano: 2024
  },
  // Empresa 2 (Servicios Demo Técnicos) - 5 activos para validar tenant aislado
  {
    id: "act-26",
    empresa_id: "emp-2",
    codigo: "FLOT-01",
    nombre: "Camioneta Chevrolet D-Max 4x4 Diésel #01",
    tipo: "Flota Vehicular",
    ubicacion: "Base Operativa Quito Carcelén",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-FLOT01",
    plantilla_id: "plt-5",
    marca: "Chevrolet",
    modelo: "D-Max High Country 3.0",
    serie: "CHV-DMAX-2023",
    ano: 2023
  },
  {
    id: "act-27",
    empresa_id: "emp-2",
    codigo: "FLOT-02",
    nombre: "Camioneta Hino 300 Furgón Taller #02",
    tipo: "Flota Vehicular",
    ubicacion: "Taller Móvil Ruta Sierra Centro",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-FLOT02",
    plantilla_id: "plt-5",
    marca: "Hino",
    modelo: "300 Series 714",
    serie: "HNO-300-994",
    ano: 2022
  },
  {
    id: "act-28",
    empresa_id: "emp-2",
    codigo: "GEN-T01",
    nombre: "Generador Móvil de Alquiler Doosan G70",
    tipo: "Generador",
    ubicacion: "Patio de Equipos de Alquiler",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-GENT01",
    plantilla_id: "plt-5",
    marca: "Doosan",
    modelo: "G70 Tier 4 Final",
    serie: "DSN-G70-112",
    ano: 2021
  },
  {
    id: "act-29",
    empresa_id: "emp-2",
    codigo: "EXT-Q01",
    nombre: "Extintor PQS 20 lbs Oficina Principal Quito",
    tipo: "Extintor",
    ubicacion: "Recepción y Sala de Capacitación",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-EXTQ01",
    plantilla_id: "plt-5",
    marca: "Ansul",
    modelo: "Sentry 20 lb",
    serie: "ANS-UIO-01",
    ano: 2023
  },
  {
    id: "act-30",
    empresa_id: "emp-2",
    codigo: "COMP-Q01",
    nombre: "Compresor Móvil Sullair 185 CFM Remolcable",
    tipo: "Compresor",
    ubicacion: "Bodega de Herramientas Mayores",
    estado: "operativo",
    codigo_qr: "INSPEC-ACT-COMPQ01",
    plantilla_id: "plt-5",
    marca: "Sullair",
    modelo: "185 Tier 4 Final",
    serie: "SUL-185-339",
    ano: 2022
  }
];

// Helper to calculate realistic ISO date strings in dd/mm/aaaa
export function formatDateDMY(dateInput) {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return dateInput;
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatDateTimeDMY(dateInput) {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return dateInput;
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const mins = String(d.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${mins}`;
}

// Generate realistic 3-month history of inspections
export function generateInitialInspections() {
  const inspections = [];
  const baseTime = new Date("2026-10-09T09:30:00").getTime();
  const dayMs = 24 * 60 * 60 * 1000;

  // CASO DE DEMO OBLIGATORIO 1:
  // Inspección NO CONFORME con foto y acción correctiva abierta (Montacargas MC-01)
  inspections.push({
    id: "insp-demo-noconforme",
    empresa_id: "emp-1",
    codigo_folio: "INSP-2026-0842",
    plantilla_id: "plt-1",
    plantilla_nombre: "Inspección Pre-Operacional de Montacargas",
    activo_id: "act-1",
    activo_codigo: "MC-01",
    activo_nombre: "Montacargas Combustión Toyota 8FGU25 #01",
    inspector_id: "usr-4",
    inspector_nombre: "Diana Morales G.",
    fecha_inicio: new Date(baseTime - 2 * 3600 * 1000).toISOString(),
    fecha_fin: new Date(baseTime - 1.5 * 3600 * 1000).toISOString(),
    resultado: "no_conforme",
    estado: "completada",
    firma: "Diana Morales G. (Firma Digital Validada SST-ID-4409)",
    observaciones_generales: "ALERTA SST: Manguera de retorno de cilindro elevador principal con fisura superficial y goteo de aceite hidráulico ISO 68. Se detiene operación hasta reemplazo de manga.",
    respuestas: [
      { pregunta_id: "p1-1", texto: "¿Horquillas y cadenas de elevación sin fisuras ni desgaste severo?", valor: "si", conforme: true, observacion: "Horquillas sin deformaciones" },
      { pregunta_id: "p1-2", texto: "¿Sistema hidráulico libre de fugas de aceite (cilindro y mangueras)?", valor: "no", conforme: false, observacion: "Fisura en manguera de alta presión con goteo continuo (Aprox. 10 gotas/min)" },
      { pregunta_id: "p1-3", texto: "¿Presión y estado físico de neumáticos adecuado (sin cortes)?", valor: "si", conforme: true, observacion: "Presión a 90 PSI" },
      { pregunta_id: "p1-4", texto: "Nivel de aceite de motor (15W-40) y líquido de frenos", valor: "Nivel Óptimo", conforme: true, observacion: "" },
      { pregunta_id: "p1-5", texto: "Horómetro actual del equipo", valor: "3412.5", conforme: true, observacion: "Lectura de cabina" },
      { pregunta_id: "p1-6", texto: "¿Cinturón de seguridad y enclavamiento operativo?", valor: "si", conforme: true, observacion: "" },
      { pregunta_id: "p1-7", texto: "¿Alarma de reversa, claxon y baliza estroboscópica funcionando?", valor: "si", conforme: true, observacion: "" },
      { pregunta_id: "p1-8", texto: "¿Extintor PQS 5 lbs a bordo con pasador, precinto y manómetro verde?", valor: "si", conforme: true, observacion: "Vigente hasta nov 2026" },
      { pregunta_id: "p1-9", texto: "Fotografía de evidencia general del equipo al iniciar turno", valor: "[Foto Adjunta]", conforme: true, foto: MOCK_EVIDENCE_PHOTOS.hydraulic_leak },
      { pregunta_id: "p1-10", texto: "Observaciones del operador o ruidos extraños", valor: "Goteo perceptible al acelerar mástil", conforme: false }
    ],
    evidencias: [
      { id: "evi-1", respuesta_id: "p1-2", archivo: MOCK_EVIDENCE_PHOTOS.hydraulic_leak, descripcion: "Fuga hidráulica en manguera de elevación principal", fecha: new Date(baseTime - 1.8 * 3600 * 1000).toISOString() }
    ]
  });

  // CASO DE DEMO OBLIGATORIO 4:
  // Inspección a medias guardada para retomar (Extintor EXT-01)
  inspections.push({
    id: "insp-demo-borrador",
    empresa_id: "emp-1",
    codigo_folio: "INSP-2026-0843",
    plantilla_id: "plt-2",
    plantilla_nombre: "Inspección Mensual de Extintores Portátiles",
    activo_id: "act-4",
    activo_codigo: "EXT-01",
    activo_nombre: "Extintor PQS 10 lbs Amerex - Bodega Químicos",
    inspector_id: "usr-4",
    inspector_nombre: "Diana Morales G.",
    fecha_inicio: new Date(baseTime - 45 * 60 * 1000).toISOString(),
    fecha_fin: null,
    resultado: "pendiente",
    estado: "borrador",
    firma: null,
    observaciones_generales: "Inspección en curso, pendiente toma de foto y verificación de peso",
    respuestas: [
      { pregunta_id: "p2-1", texto: "¿Ubicación libre de obstáculos (acceso 100% despejado a 1 metro)?", valor: "si", conforme: true, observacion: "Despejado" },
      { pregunta_id: "p2-2", texto: "¿Señalética fotoluminiscente y número de identificación visible a 2m?", valor: "si", conforme: true, observacion: "Señal visible" },
      { pregunta_id: "p2-3", texto: "¿Manómetro indicador de presión en rango operativo (zona verde)?", valor: "si", conforme: true, observacion: "Aguja en zona verde" }
    ],
    evidencias: []
  });

  // CASO DE DEMO OBLIGATORIO 3:
  // Activo con historial de varias inspecciones CONFORMES (Generador Diésel GEN-01)
  for (let i = 1; i <= 6; i++) {
    const inspDate = new Date(baseTime - i * 14 * dayMs);
    inspections.push({
      id: `insp-gen-hist-${i}`,
      empresa_id: "emp-1",
      codigo_folio: `INSP-2026-07${80 - i}`,
      plantilla_id: "plt-3",
      plantilla_nombre: "Mantenimiento & Chequeo de Generador Diésel",
      activo_id: "act-3",
      activo_codigo: "GEN-01",
      activo_nombre: "Generador Diésel Cummins C150D5 150kVA",
      inspector_id: "usr-5",
      inspector_nombre: "Roberto Noboa C.",
      fecha_inicio: new Date(inspDate.getTime() - 40 * 60 * 1000).toISOString(),
      fecha_fin: inspDate.toISOString(),
      resultado: "conforme",
      estado: "completada",
      firma: "Roberto Noboa C. (Certificación Mecánica)",
      observaciones_generales: `Chequeo preventivo quincenal #${i} ejecutado con éxito. Pruebas dinámicas en vacío sin variaciones de frecuencia. Baterías a 26.8 VDC en flotación.`,
      respuestas: [
        { pregunta_id: "p3-1", texto: "Nivel de combustible diésel en tanque diario (%)", valor: `${85 + (i % 10)}`, conforme: true, observacion: "Nivel óptimo" },
        { pregunta_id: "p3-2", texto: "¿Nivel de refrigerante en tanque de expansión óptimo?", valor: "si", conforme: true, observacion: "50/50 etilenglicol" },
        { pregunta_id: "p3-3", texto: "¿Nivel de aceite de motor 15W-40 en varilla de medición correcto?", valor: "si", conforme: true, observacion: "En marca FULL" },
        { pregunta_id: "p3-4", texto: "Voltaje en bornes de baterías de arranque (DC)", valor: "26.8", conforme: true, observacion: "Cargador operativo" },
        { pregunta_id: "p3-5", texto: "¿Calefactor de camisas de agua (precalentador) operando tibio?", valor: "si", conforme: true, observacion: "Block a 42°C" },
        { pregunta_id: "p3-6", texto: "¿Selector del módulo DeepSea / ComAp en modo AUTOMÁTICO?", valor: "si", conforme: true, observacion: "Led auto activo" },
        { pregunta_id: "p3-7", texto: "¿Ausencia de fugas de combustible, aceite o refrigerante en bandeja?", valor: "si", conforme: true, observacion: "Bandeja limpia" },
        { pregunta_id: "p3-8", texto: "Prueba de arranque sin carga (3 minutos) exitosa", valor: "si", conforme: true, observacion: "Arranque en 3.2s" },
        { pregunta_id: "p3-9", texto: "Frecuencia generada en vacío (Hz)", valor: "60.1", conforme: true, observacion: "Estable" },
        { pregunta_id: "p3-10", texto: "Fotografía del panel de control con parámetros en marcha", valor: "[Foto Adjunta]", conforme: true, foto: MOCK_EVIDENCE_PHOTOS.electrical_panel }
      ],
      evidencias: [
        { id: `evi-gen-${i}`, respuesta_id: "p3-10", archivo: MOCK_EVIDENCE_PHOTOS.electrical_panel, descripcion: "Panel de control en modo automático", fecha: inspDate.toISOString() }
      ]
    });
  }

  // Generar 52 inspecciones adicionales realistas para completar 60 en los últimos 3 meses
  const assetsForHistory = INITIAL_ACTIVOS.filter(a => a.empresa_id === "emp-1" && a.id !== "act-1" && a.id !== "act-3");
  const inspectors = [
    { id: "usr-4", nombre: "Diana Morales G." },
    { id: "usr-5", nombre: "Roberto Noboa C." },
    { id: "usr-6", nombre: "Luis Cevallos M." },
    { id: "usr-7", nombre: "Andrea Villacís T." },
    { id: "usr-8", nombre: "Javier Zambrano B." }
  ];

  for (let i = 1; i <= 52; i++) {
    const daysAgo = Math.floor((i / 52) * 85) + 1;
    const inspDate = new Date(baseTime - daysAgo * dayMs);
    const asset = assetsForHistory[i % assetsForHistory.length];
    const inspector = inspectors[i % inspectors.length];
    // 90% conformes, 10% con alguna observación leve
    const isConforme = (i % 7 !== 0);
    const folioNumber = String(800 - i).padStart(4, "0");

    inspections.push({
      id: `insp-hist-${i}`,
      empresa_id: "emp-1",
      codigo_folio: `INSP-2026-${folioNumber}`,
      plantilla_id: asset.plantilla_id || "plt-4",
      plantilla_nombre: asset.plantilla_id === "plt-1" ? "Inspección Pre-Operacional de Montacargas" :
                        asset.plantilla_id === "plt-2" ? "Inspección Mensual de Extintores Portátiles" :
                        asset.plantilla_id === "plt-3" ? "Mantenimiento & Chequeo de Generador Diésel" : "Inspección de Seguridad Industrial y Orden (5S)",
      activo_id: asset.id,
      activo_codigo: asset.codigo,
      activo_nombre: asset.nombre,
      inspector_id: inspector.id,
      inspector_nombre: inspector.nombre,
      fecha_inicio: new Date(inspDate.getTime() - 25 * 60 * 1000).toISOString(),
      fecha_fin: inspDate.toISOString(),
      resultado: isConforme ? "conforme" : "no_conforme",
      estado: "completada",
      firma: `${inspector.nombre} (Validado)`,
      observaciones_generales: isConforme ? "Inspección periódica completada conforme a norma. Sin observaciones críticas." : "Se detecta desviación menor en elementos de sujeción. Reportado a supervisor de turno.",
      respuestas: [
        { pregunta_id: "q-gen-1", texto: "Condición física y operativa general", valor: isConforme ? "si" : "no", conforme: isConforme, observacion: isConforme ? "Operativo" : "Requiere ajuste preventivo" },
        { pregunta_id: "q-gen-2", texto: "Señalética y rotulado de seguridad", valor: "si", conforme: true, observacion: "Visible y limpio" },
        { pregunta_id: "q-gen-3", texto: "Registro fotográfico de rutina", valor: "[Foto Adjunta]", conforme: true, foto: isConforme ? MOCK_EVIDENCE_PHOTOS.extinguisher_ok : MOCK_EVIDENCE_PHOTOS.generic_inspection }
      ],
      evidencias: [
        { id: `evi-h-${i}`, respuesta_id: "q-gen-3", archivo: isConforme ? MOCK_EVIDENCE_PHOTOS.extinguisher_ok : MOCK_EVIDENCE_PHOTOS.generic_inspection, descripcion: "Inspección de rutina", fecha: inspDate.toISOString() }
      ]
    });
  }

  // Inspecciones de Empresa 2 (para probar que Empresa 1 no las ve)
  for (let j = 1; j <= 5; j++) {
    const inspDate = new Date(baseTime - j * 5 * dayMs);
    inspections.push({
      id: `insp-emp2-${j}`,
      empresa_id: "emp-2",
      codigo_folio: `INSP-UIO-2026-00${j}`,
      plantilla_id: "plt-5",
      plantilla_nombre: "Checklist Pre-Ruta de Vehículos de Servicio",
      activo_id: "act-26",
      activo_codigo: "FLOT-01",
      activo_nombre: "Camioneta Chevrolet D-Max 4x4 Diésel #01",
      inspector_id: "usr-11",
      inspector_nombre: "Miguel Ángel Torres",
      fecha_inicio: new Date(inspDate.getTime() - 15 * 60 * 1000).toISOString(),
      fecha_fin: inspDate.toISOString(),
      resultado: "conforme",
      estado: "completada",
      firma: "Miguel Torres (Flota UIO)",
      observaciones_generales: "Vehículo listo para ruta técnica Quito - Ambato.",
      respuestas: [],
      evidencias: []
    });
  }

  return inspections;
}

// CASO DE DEMO OBLIGATORIO:
// Acciones correctivas ligadas a hallazgos
export const INITIAL_ACCIONES_CORRECTIVAS = [
  {
    id: "ac-1",
    empresa_id: "emp-1",
    inspeccion_id: "insp-demo-noconforme",
    inspeccion_folio: "INSP-2026-0842",
    activo_codigo: "MC-01",
    activo_nombre: "Montacargas Toyota 8FGU25 #01",
    descripcion: "Reemplazo urgente de manguera de retorno del sistema hidráulico del mástil y reposición de 1.5 galones de aceite hidráulico ISO 68.",
    hallazgo: "Fisura en manguera de alta presión con goteo continuo detectada en checklist pre-operacional.",
    responsable_id: "usr-2",
    responsable_nombre: "Ing. Marco Viteri P.",
    fecha_limite: "2026-10-12",
    estado: "abierta", // 'abierta', 'en_proceso', 'resuelta'
    prioridad: "alta",
    foto_evidencia: MOCK_EVIDENCE_PHOTOS.hydraulic_leak,
    notificado_whatsapp: false
  },
  {
    id: "ac-2",
    empresa_id: "emp-1",
    inspeccion_id: "insp-hist-7",
    inspeccion_folio: "INSP-2026-0793",
    activo_codigo: "EXT-03",
    activo_nombre: "Extintor Rodante PQS 50 lbs Buckeye",
    descripcion: "Recarga hidrostática y reemplazo de válvula dosificadora de polvo químico.",
    hallazgo: "Manómetro de extintor fuera de rango operativo en patio de tanques.",
    responsable_id: "usr-3",
    responsable_nombre: "Ing. Patricia Andrade",
    fecha_limite: "2026-10-14",
    estado: "en_proceso",
    prioridad: "media",
    foto_evidencia: MOCK_EVIDENCE_PHOTOS.extinguisher_ok,
    notificado_whatsapp: true
  },
  {
    id: "ac-3",
    empresa_id: "emp-1",
    inspeccion_id: "insp-hist-14",
    inspeccion_folio: "INSP-2026-0786",
    activo_codigo: "TAB-01",
    activo_nombre: "Tablero General Schneider TGD-01",
    descripcion: "Ajuste de torque en bornes de alimentación disyuntor principal de 400A tras termografía.",
    hallazgo: "Punto caliente detectado a 68°C en fase S.",
    responsable_id: "usr-2",
    responsable_nombre: "Ing. Marco Viteri P.",
    fecha_limite: "2026-09-30",
    estado: "resuelta",
    prioridad: "alta",
    foto_evidencia: MOCK_EVIDENCE_PHOTOS.electrical_panel,
    notificado_whatsapp: true
  }
];

// CASOS DE DEMO OBLIGATORIOS:
// 3 mantenimientos que vencen esta semana (alerta semáforo amarillo) + vencidos (rojo) + al día (verde)
export const INITIAL_MANTENIMIENTOS = [
  // 1. Vence en 2 días (AMARILLO - ESTA SEMANA)
  {
    id: "mnt-1",
    empresa_id: "emp-1",
    activo_id: "act-1",
    activo_codigo: "MC-01",
    activo_nombre: "Montacargas Combustión Toyota 8FGU25 #01",
    tipo: "Mantenimiento Preventivo 250 Horas (Filtros, Aceite 15W40 y Engrase de Mástil)",
    frecuencia_dias: 90,
    ultima_fecha: "2026-07-13",
    proxima_fecha: "2026-10-11", // En 2 días
    estado: "programado",
    responsable_id: "usr-2",
    responsable_nombre: "Ing. Marco Viteri P.",
    alerta: "proximo_a_vencer",
    dias_restantes: 2
  },
  // 2. Vence en 4 días (AMARILLO - ESTA SEMANA)
  {
    id: "mnt-2",
    empresa_id: "emp-1",
    activo_id: "act-3",
    activo_codigo: "GEN-01",
    activo_nombre: "Generador Diésel Cummins C150D5 150kVA",
    tipo: "Mantenimiento Trimestral A (Cambio de Filtros Diésel Fleetguard y Chequeo Calefactor)",
    frecuencia_dias: 90,
    ultima_fecha: "2026-07-15",
    proxima_fecha: "2026-10-13", // En 4 días
    estado: "programado",
    responsable_id: "usr-2",
    responsable_nombre: "Ing. Marco Viteri P.",
    alerta: "proximo_a_vencer",
    dias_restantes: 4
  },
  // 3. Vence en 5 días (AMARILLO - ESTA SEMANA)
  {
    id: "mnt-3",
    empresa_id: "emp-1",
    activo_id: "act-6",
    activo_codigo: "COMP-01",
    activo_nombre: "Compresor de Tornillo Ingersoll Rand Nirvana 50HP",
    tipo: "Reemplazo de Elemento Separador Aire/Aceite y Purga de Condensados",
    frecuencia_dias: 180,
    ultima_fecha: "2026-04-17",
    proxima_fecha: "2026-10-14", // En 5 días
    estado: "programado",
    responsable_id: "usr-5",
    responsable_nombre: "Roberto Noboa C.",
    alerta: "proximo_a_vencer",
    dias_restantes: 5
  },
  // 4. Mantenimiento VENCIDO hace 3 días (ROJO - CRÍTICO)
  {
    id: "mnt-4",
    empresa_id: "emp-1",
    activo_id: "act-7",
    activo_codigo: "EXT-03",
    activo_nombre: "Extintor Rodante PQS 50 lbs Buckeye",
    tipo: "Prueba Hidrostática Quinquenal y Recarga Certificada INEN",
    frecuencia_dias: 365,
    ultima_fecha: "2025-10-06",
    proxima_fecha: "2026-10-06", // Vencido hace 3 días
    estado: "vencido",
    responsable_id: "usr-3",
    responsable_nombre: "Ing. Patricia Andrade",
    alerta: "vencido",
    dias_restantes: -3
  },
  // 5. Mantenimiento al día (VERDE)
  {
    id: "mnt-5",
    empresa_id: "emp-1",
    activo_id: "act-2",
    activo_codigo: "MC-02",
    activo_nombre: "Montacargas Eléctrico Crown FC5200 #02",
    tipo: "Inspección de Celdas de Batería de Plomo-Ácido y Densidad de Electrolito",
    frecuencia_dias: 30,
    ultima_fecha: "2026-09-25",
    proxima_fecha: "2026-10-25", // En 16 días
    estado: "programado",
    responsable_id: "usr-2",
    responsable_nombre: "Ing. Marco Viteri P.",
    alerta: "al_dia",
    dias_restantes: 16
  },
  // 6. Mantenimiento al día (VERDE)
  {
    id: "mnt-6",
    empresa_id: "emp-1",
    activo_id: "act-8",
    activo_codigo: "TAB-01",
    activo_nombre: "Tablero General Schneider TGD-01",
    tipo: "Inspección Termográfica Semestral y Limpieza con Dieléctrico",
    frecuencia_dias: 180,
    ultima_fecha: "2026-08-10",
    proxima_fecha: "2027-02-10",
    estado: "programado",
    responsable_id: "usr-8",
    responsable_nombre: "Javier Zambrano B.",
    alerta: "al_dia",
    dias_restantes: 124
  },
  // 7. Mantenimiento ya realizado
  {
    id: "mnt-7",
    empresa_id: "emp-1",
    activo_id: "act-4",
    activo_codigo: "EXT-01",
    activo_nombre: "Extintor PQS 10 lbs Amerex - Bodega Químicos",
    tipo: "Inspección y Certificación Anual contra Incendios",
    frecuencia_dias: 365,
    ultima_fecha: "2026-09-01",
    proxima_fecha: "2027-09-01",
    estado: "realizado",
    responsable_id: "usr-3",
    responsable_nombre: "Ing. Patricia Andrade",
    alerta: "al_dia",
    dias_restantes: 327
  },
  // 8. Mantenimiento ya realizado
  {
    id: "mnt-8",
    empresa_id: "emp-1",
    activo_id: "act-10",
    activo_codigo: "MC-03",
    activo_nombre: "Montacargas Apilador Raymond Reach 7500",
    tipo: "Calibración de Sensor de Altura y Frenos Electromagnéticos",
    frecuencia_dias: 120,
    ultima_fecha: "2026-09-18",
    proxima_fecha: "2027-01-18",
    estado: "realizado",
    responsable_id: "usr-2",
    responsable_nombre: "Ing. Marco Viteri P.",
    alerta: "al_dia",
    dias_restantes: 101
  }
];

export const INITIAL_REGISTRO_ACTIVIDAD = [
  {
    id: "act-log-1",
    empresa_id: "emp-1",
    usuario_nombre: "Diana Morales G.",
    accion: "Inspección No Conforme Registrada",
    detalle: "Se registró hallazgo crítico en Montacargas MC-01 (Fisura en manguera hidráulica). Folio INSP-2026-0842.",
    fecha: "2026-10-09 08:00"
  },
  {
    id: "act-log-2",
    empresa_id: "emp-1",
    usuario_nombre: "Sistema InspecFácil",
    accion: "Acción Correctiva Generada",
    detalle: "Se creó automáticamente la acción correctiva AC-1 asignada a Ing. Marco Viteri P.",
    fecha: "2026-10-09 08:01"
  },
  {
    id: "act-log-3",
    empresa_id: "emp-1",
    usuario_nombre: "Roberto Noboa C.",
    accion: "Inspección Conforme Completada",
    detalle: "Inspección rutinaria Generador GEN-01 completada al 100%. Folio INSP-2026-0775.",
    fecha: "2026-10-08 16:45"
  },
  {
    id: "act-log-4",
    empresa_id: "emp-1",
    usuario_nombre: "Ing. Carlos Mendoza R.",
    accion: "Descarga de Informe Mensual",
    detalle: "Reporte consolidado de cumplimiento SST del mes de Septiembre exportado a PDF y Excel.",
    fecha: "2026-10-05 10:15"
  }
];
