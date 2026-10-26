# Manual de Demostración y Operación — InspecFácil

**Checklists Digitales de Inspección Técnica, Mantenimiento Preventivo y Certificados PDF**

---

## 1. ¿Qué es InspecFácil?
InspecFácil es una plataforma web y PWA diseñada para plantas industriales, empresas de logística y servicios técnicos. Elimina los formularios físicos de papel en auditorías SST y rondas mecánicas, permitiendo:
1. **Inspecciones en campo desde el celular:** Flujo paso a paso con respuestas táctiles de un solo toque y fotos adjuntas.
2. **Generación instantánea de Certificados PDF:** Reportes oficiales con logotipo de la empresa, datos técnicos del equipo, desglose de preguntas, evidencias fotográficas y firma digitalizada del inspector.
3. **Acciones correctivas automáticas:** Detección de no conformidades que disparan tareas con responsable, fecha límite y simulación de notificación por WhatsApp.
4. **Programa preventivo con semáforo de vencimiento:** Monitoreo visual de mantenimientos a 7 días y vencidos con reprogramación automática.

---

## 2. Pantalla de Acceso Rápido y Roles Demo (Sin Contraseñas)
Al abrir la aplicación por primera vez o al hacer clic en **"Salir" / "Cambiar de Rol"**, se presenta la **Pantalla de Acceso Demo**, que incluye:
* **Selector de Organización:** Permite alternar entre las dos empresas ficticias (*Industrias Demo del Pacífico S.A.* y *Servicios Demo Técnicos del Ecuador Cía. Ltda.*) para demostrar el aislamiento multi-tenant.
* **Botones de Acceso Inmediato por Rol:**
  * **"Entrar como Operativo"**: Abre directamente la vista móvil de campo para el inspector.
  * **"Entrar como Supervisor"**: Abre el entorno de escritorio SST con gestión de activos, plantillas, hallazgos y preventivo.
  * **"Entrar como Administrador"**: Concede privilegios completos y acceso al botón *"Restablecer Datos Demo"*.

| Rol | Usuario Demo | Organización | Propósito en la Demostración |
| :--- | :--- | :--- | :--- |
| **Operativo / Inspector** | `Diana Morales G.` | Industrias Demo del Pacífico | Vista táctil de campo: escaneo de QR, checklist con fotos y firma digital. |
| **Supervisor** | `Ing. Marco Viteri P.` | Industrias Demo del Pacífico | Gestión de plantillas, activos, acciones correctivas y calendario preventivo. |
| **Administrador** | `Ing. Carlos Mendoza R.` | Industrias Demo del Pacífico | Control total, reportes ejecutivos y botón *"Restablecer Datos Demo"*. |
| **Operativo (Empresa B)** | `Miguel Ángel Torres` | Servicios Demo Técnicos | Demuestra que los datos de otra empresa están 100% aislados (`empresa_id`). |

---

## 3. Acceso en Celular y Computadora (Sin Instalar Nada)

### Nivel 1: Enlace Web Directo (Obligatorio)
* Abre la URL en cualquier navegador (**Chrome, Safari, Edge**).
* Funciona idénticamente en PC y smartphones con conexión de datos normal.

### Nivel 2: PWA Instalable (Como App Nativa)
* **En iPhone / iPad (Safari):** Toca el botón *"Compartir"* (icono de cuadrado con flecha hacia arriba) y selecciona **"Agregar a pantalla de inicio"**. Se abrirá en pantalla completa con su propio icono sin barra de navegación.
* **En Android (Chrome):** Toca los tres puntos del menú superior y selecciona **"Instalar aplicación"** o **"Agregar a la pantalla principal"**.

### Nivel 3: Empaquetado APK Android (Recomendado)
* El código base está desacoplado para ser envuelto en **Capacitor** o **Bubblewrap (TWA)** ejecutando `npx cap add android && npx cap build`.

---

## 4. Guion de Demostración en 5 Minutos (Paso a Paso)

| Minuto | Rol / Pantalla | Acción a Demostrar | Criterio de Éxito |
| :--- | :--- | :--- | :--- |
| **Min 1** | **Supervisor (PC)** | Entrar como Supervisor y abrir la pestaña **"Plantillas Checklist"**. Mostrar la plantilla de *Montacargas* y los valores esperados. | Se aprecia la facilidad de crear y configurar preguntas y criterios de aceptación. |
| **Min 2** | **Inspector (Celular)** | Cambiar a **Modo Móvil** (o abrir desde el celular con el QR). Presionar *"Escanear QR"*, seleccionar el montacargas **MC-01** y contestar el checklist adjuntando la foto de fuga. | Demuestra la agilidad táctil en campo sin teclear texto innecesario. |
| **Min 3** | **Inspector (Celular)** | Dibujar la firma con el dedo en el canvas táctil, presionar *"Finalizar y Firmar"* y hacer clic en **"Descargar Reporte PDF"**. | El PDF oficial se descarga de inmediato con formato formal, fotos y firmas. |
| **Min 4** | **Supervisor (PC)** | Cambiar a **Modo Escritorio** y abrir **"Acciones Correctivas"**. Mostrar la acción correctiva **AC-1** generada por el hallazgo del montacargas. Pulsar **"WhatsApp"**. | Se ve la trazabilidad del hallazgo y la simulación del mensaje al técnico. |
| **Min 5** | **Supervisor (PC)** | Abrir **"Mantenimiento Preventivo"** para mostrar el semáforo (3 amarillos por vencer esta semana). Presionar *"Marcar Realizado"* en uno. | Se comprueba la reprogramación automática sumando la frecuencia de días. |
| **Min 5.5** | **Supervisor (PC)** | Abrir **"Reportes & Auditoría"** y pulsar **"Descargar en Excel (.xlsx)"**. | Se genera la hoja de cálculo completa con métricas consolidadas. |

---

## 5. Qué se Personaliza por Cliente y Qué Faltaría para Producción

### Elementos Personalizables por Cliente:
* Logotipo corporativo, colores institucionales y RUC en los encabezados de los certificados PDF.
* Catálogo de activos y áreas operativas importables vía archivo Excel.
* Cuestionarios técnicos adaptados a normativas específicas (NFPA 10, OSHA 1910, ISO 45001, normas INEN locales).
* Matriz de criticidad de riesgos para categorizar hallazgos (Leve, Moderado, Crítico).

### Integraciones Reales Requeridas para Fase de Producción:
1. **WhatsApp Notifier:** Conexión con **Meta Cloud API** (WhatsApp Business Platform) o **Twilio Messaging API** para envíos reales a los números celulares de los jefes de mantenimiento.
2. **Almacenamiento Cloud de Fotografías:** Configuración de bucket **AWS S3** o **Google Cloud Storage** con URLs prefirmadas para resguardo seguro de evidencias en alta resolución.
3. **Autenticación Corporativa:** Integración con **Microsoft Azure Active Directory / Google Workspace SSO** para inicio de sesión único con correos de la empresa.
4. **Base de Datos Persistente:** Migración del almacenamiento multi-tenant local a **PostgreSQL en AWS RDS** con control de acceso por `empresa_id` a nivel de base de datos (Row Level Security - RLS).
5. **Pasarela de Cobros B2B & SRI:** Integración con **Kushki / Stripe / Datafast** para cobro recurrente de licencias en USD y emisión de facturación electrónica autorizada por el SRI.
