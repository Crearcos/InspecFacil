# InspecFácil • SST Industrial Ecuador

> **Plataforma Integral de Inspección Técnica Operativa, Gestión de Activos Críticos y Control de Acciones Correctivas (CAPA) bajo normativa ecuatoriana e ISO 45001.**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![jsPDF](https://img.shields.io/badge/jsPDF-AutoTable-EA284E?logo=adobe-acrobat-reader&logoColor=white)](https://parall.ax/products/jspdf)
[![ISO 45001](https://img.shields.io/badge/Norma-ISO_45001%3A2018-059669)](https://www.iso.org/standard/63787.html)
[![Licencia](https://img.shields.io/badge/Licencia-Proprietary-slate)](LICENSE)

---

## 📌 Descripción del Proyecto

**InspecFácil** es una solución integral diseñada para modernizar y digitalizar los procesos de auditoría en terreno, inspecciones pre-operacionales de maquinaria y cumplimiento de Seguridad y Salud en el Trabajo (SST) para la industria ecuatoriana.

La plataforma resuelve la dependencia de formularios en papel, la pérdida de evidencia técnica y la lentitud en la notificación de no conformidades críticas, ofreciendo trazabilidad instantánea desde la captura móvil hasta la emisión de certificados de auditoría con validez técnica y legal.

---

## 🚀 Capacidades y Módulos Principales

### 1. Terminal Móvil de Terreno (Mobile PWA Experience)
* **Lanzador Táctico Ergonómico:** Acceso instantáneo a escáner de códigos QR y catálogo de activos con interfaz de diseño nativo (Apple HIG / Android).
* **Checklists Dinámicos e Interactivos:** Verificaciones en 1 toque (`Conforme` / `No Conforme` / `N/A`), mediciones numéricas con tolerancias de ingeniería y campos de diagnóstico.
* **Persistencia de Borradores:** Guardado automático local para reanudar inspecciones en curso ante interrupciones de campo o baja conectividad.
* **Captura de Evidencias Fotográficas:** Registro de fallas mecánicas con visor Lightbox en alta resolución.

### 2. Motor de Certificación Técnica en PDF (Auditoría SST)
* Emisión automatizada del **Certificado Técnico de Inspección Operativa y SST** con diseño ejecutivo dual-accent.
* Matriz completa de metadatos del activo: Código interno, marca, modelo, serie, RUC y ubicación en planta.
* Cuadro de control de cambios (`SST-CHK-024 (R3)`) y sello de dictamen oficial (`APROBADO SST` / `HALLAZGO CRÍTICO`).
* Bloque de validación con **firmas electrónicas bilaterales** (Inspector de Campo y Supervisor de Seguridad Industrial).

### 3. Sistema CAPA (Acciones Correctivas y Desviaciones)
* **Doble Modo de Visualización:**
  * **Tabla de Control Enterprise:** Filtros por severidad (`Crítica`, `Alta`, `Media`), estados con pills semánticas y control de plazos (SLA).
  * **Tablero Kanban Interactivo:** Gestión visual en 3 columnas (`Abiertas`, `En Proceso`, `Resueltas`).
* **Despacho Inmediato por WhatsApp:** Generación de plantillas técnicas automáticas para alertar al jefe de mantenimiento con 1 clic.

### 4. Aislamiento Multi-Tenant & Cumplimiento Local
* Soporte nativo para múltiples organizaciones con aislamiento por **RUC** (Ej. *Industrias Demo del Pacífico S.A.*, *Servicios Técnicos del Ecuador Cía. Ltda.*).
* Formato de fechas adaptado al estándar ecuatoriano (`dd/mm/aaaa`), moneda en USD ($) y referencia al marco regulatorio del Ministerio del Trabajo.

### 5. Reportes & Analítica
* Exportación de informes mensuales de conformidad en formato Microsoft Excel (`.xlsx`).
* Tablero de control con métricas en vivo: % de Conformidad SST, equipos operativos, hallazgos pendientes y calendario de mantenimiento preventivo.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Frontend Core** | React 18 + Vite 6 | Renderizado reactivo de alto rendimiento y arquitectura modular |
| **Estilos & UI** | Tailwind CSS + Lucide Icons | Diseño ergonómico industrial responsivo sin dependencias pesadas |
| **Motor PDF** | jsPDF + AutoTable | Generación client-side de certificados técnicos vectoriales |
| **Hojas de Cálculo** | SheetJS (xlsx) | Exportación de matrices de datos y reportes ejecutivos |
| **Persistencia** | Web Storage API (Local/Session) | Almacenamiento local con seeds industriales preconfiguradas |

---

## 💻 Instalación y Puesta en Marcha (NPM)

### Prerrequisitos
* **Node.js**: Versión 18.0.0 o superior instalada.
* **NPM**: Gestor de paquetes incluido con Node.js (`npm -v`).

### Paso a Paso

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Crearcos/InspecFacil.git
   cd InspecFacil
   ```

2. **Instalar dependencias del proyecto:**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo local:**
   ```bash
   npm run dev
   ```
   > La aplicación se iniciará en `http://localhost:3000` (con soporte para acceso en red local mediante `--host`).

4. **Compilar para producción:**
   ```bash
   npm run build
   ```
   > Genera el paquete optimizado y minificado en la carpeta `/dist`.

5. **Previsualizar la compilación de producción:**
   ```bash
   npm run preview
   ```

---

## 📂 Estructura del Proyecto

```text
InspecFacil/
├── public/                 # Recursos estáticos
├── src/
│   ├── components/         # Componentes transversales
│   │   ├── desktop/        # Módulos para consola de escritorio
│   │   │   ├── AssetManagement.jsx         # Gestión de catálogo de activos
│   │   │   ├── CorrectiveActionsList.jsx   # Matriz y Kanban de acciones CAPA
│   │   │   ├── DashboardKPIs.jsx           # Métricas ejecutivas y gráficos SST
│   │   │   ├── InspectionList.jsx          # Historial de auditorías emitidas
│   │   │   ├── PreventiveCalendar.jsx      # Calendario de mantenimiento preventivo
│   │   │   ├── ReportsExport.jsx           # Centro de exportación de informes
│   │   │   ├── SupervisorDesktop.jsx       # Layout principal de escritorio
│   │   │   └── TemplateBuilder.jsx         # Diseñador de checklists dinámicos
│   │   ├── mobile/         # Módulos para terminal móvil de campo
│   │   │   ├── InspectionRunner.jsx        # Ejecutor táctil de checklists
│   │   │   ├── InspectionSuccessModal.jsx  # Confirmación de finalización y PDF
│   │   │   ├── MobileDashboard.jsx         # Centro de control móvil de 4 pestañas
│   │   │   ├── QrScannerModal.jsx          # Escáner de placas QR vía cámara
│   │   │   └── SignaturePadModal.jsx       # Pad digital de captura de firmas
│   │   ├── LoginScreen.jsx # Portal de autenticación con selector de sesiones
│   │   ├── Navbar.jsx      # Barra de navegación superior con switcher de tenant
│   │   └── WhatsAppModal.jsx # Simulador de despacho de alertas técnicas
│   ├── data/
│   │   └── seedData.js     # Datos iniciales realistas (empresas, activos, checklists)
│   ├── services/
│   │   ├── excelService.js # Exportador de resúmenes de conformidad a .xlsx
│   │   ├── pdfService.js   # Generador oficial de certificados de inspección
│   │   └── storageService.js # Capa de servicio y aislamiento multi-tenant
│   ├── App.jsx             # Orquestador responsivo y enrutador de estados
│   ├── main.jsx            # Punto de entrada de la aplicación React
│   └── index.css           # Configuración de Tailwind CSS y directivas base
├── .gitignore              # Exclusión de node_modules y temporales
├── package.json            # Scripts de NPM y dependencias del sistema
├── vite.config.js          # Configuración del servidor Vite (Puerto 3000)
└── README.md               # Documentación técnica del proyecto
```

---

## 👥 Perfiles de Usuario para Demostración

La plataforma incluye autenticación de acceso rápido por roles preconfigurados para evaluación de flujo completo:

* **Administrador:** Acceso irrestricto, configuración de empresas, auditoría general y reset de datos.
* **Supervisor SST:** Aprobación de certificaciones, seguimiento de acciones correctivas, programación preventiva y descargas ejecutivas.
* **Inspector Técnico:** Ejecución de checklists en planta, escaneo de placas QR, captura fotográfica y registro de desviaciones.

---

## 📄 Licencia y Créditos

Desarrollado para **Crearcos** • Ecuador  
Todos los derechos reservados © 2026.
