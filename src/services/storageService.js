import {
  INITIAL_COMPANIES,
  INITIAL_USERS,
  INITIAL_PLANTILLAS,
  INITIAL_ACTIVOS,
  INITIAL_ACCIONES_CORRECTIVAS,
  INITIAL_MANTENIMIENTOS,
  INITIAL_REGISTRO_ACTIVIDAD,
  generateInitialInspections
} from '../data/seedData';

const STORAGE_KEYS = {
  COMPANIES: 'inspecfacil_companies_v1',
  USERS: 'inspecfacil_users_v1',
  PLANTILLAS: 'inspecfacil_plantillas_v1',
  ACTIVOS: 'inspecfacil_activos_v1',
  INSPECCIONES: 'inspecfacil_inspecciones_v1',
  ACCIONES: 'inspecfacil_acciones_v1',
  MANTENIMIENTOS: 'inspecfacil_mantenimientos_v1',
  LOGS: 'inspecfacil_logs_v1',
  ACTIVE_COMPANY_ID: 'inspecfacil_active_company_id_v1',
  ACTIVE_USER_ID: 'inspecfacil_active_user_id_v1'
};

function safeGet(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return defaultValue;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

export const StorageService = {
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.COMPANIES)) {
      this.resetDemo();
    }
  },

  resetDemo() {
    safeSet(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
    safeSet(STORAGE_KEYS.USERS, INITIAL_USERS);
    safeSet(STORAGE_KEYS.PLANTILLAS, INITIAL_PLANTILLAS);
    safeSet(STORAGE_KEYS.ACTIVOS, INITIAL_ACTIVOS);
    safeSet(STORAGE_KEYS.INSPECCIONES, generateInitialInspections());
    safeSet(STORAGE_KEYS.ACCIONES, INITIAL_ACCIONES_CORRECTIVAS);
    safeSet(STORAGE_KEYS.MANTENIMIENTOS, INITIAL_MANTENIMIENTOS);
    safeSet(STORAGE_KEYS.LOGS, INITIAL_REGISTRO_ACTIVIDAD);
    safeSet(STORAGE_KEYS.ACTIVE_COMPANY_ID, "emp-1");
    safeSet(STORAGE_KEYS.ACTIVE_USER_ID, "usr-2"); // Supervisor Marco Viteri por defecto
  },

  // Company management
  getCompanies() {
    return safeGet(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
  },

  getActiveCompanyId() {
    return safeGet(STORAGE_KEYS.ACTIVE_COMPANY_ID, "emp-1");
  },

  setActiveCompanyId(companyId) {
    safeSet(STORAGE_KEYS.ACTIVE_COMPANY_ID, companyId);
    // Switch to first admin or supervisor of that company
    const users = this.getUsers(companyId);
    if (users.length > 0) {
      this.setActiveUserId(users[0].id);
    }
  },

  getActiveCompany() {
    const id = this.getActiveCompanyId();
    const companies = this.getCompanies();
    return companies.find(c => c.id === id) || companies[0];
  },

  // User & Auth management
  getUsers(companyId = null) {
    const cid = companyId || this.getActiveCompanyId();
    const allUsers = safeGet(STORAGE_KEYS.USERS, INITIAL_USERS);
    return allUsers.filter(u => u.empresa_id === cid);
  },

  getActiveUserId() {
    return safeGet(STORAGE_KEYS.ACTIVE_USER_ID, "usr-2");
  },

  setActiveUserId(userId) {
    safeSet(STORAGE_KEYS.ACTIVE_USER_ID, userId);
  },

  getActiveUser() {
    const allUsers = safeGet(STORAGE_KEYS.USERS, INITIAL_USERS);
    const activeId = this.getActiveUserId();
    const found = allUsers.find(u => u.id === activeId);
    if (found) return found;
    // Fallback to first user of active company
    const compUsers = this.getUsers();
    return compUsers[0] || allUsers[0];
  },

  // Activos (Assets)
  getActivos(companyId = null) {
    const cid = companyId || this.getActiveCompanyId();
    const all = safeGet(STORAGE_KEYS.ACTIVOS, INITIAL_ACTIVOS);
    return all.filter(a => a.empresa_id === cid);
  },

  getActivoById(id) {
    const all = safeGet(STORAGE_KEYS.ACTIVOS, INITIAL_ACTIVOS);
    return all.find(a => a.id === id || a.codigo_qr === id || a.codigo === id);
  },

  saveActivo(activoData) {
    const all = safeGet(STORAGE_KEYS.ACTIVOS, INITIAL_ACTIVOS);
    const cid = this.getActiveCompanyId();
    if (activoData.id) {
      const idx = all.findIndex(a => a.id === activoData.id);
      if (idx !== -1) {
        all[idx] = { ...all[idx], ...activoData };
      }
    } else {
      const newActivo = {
        ...activoData,
        id: `act-${Date.now()}`,
        empresa_id: cid,
        codigo_qr: `INSPEC-ACT-${activoData.codigo || Date.now().toString().slice(-4)}`,
        estado: activoData.estado || 'operativo'
      };
      all.unshift(newActivo);
    }
    safeSet(STORAGE_KEYS.ACTIVOS, all);
    this.addLog("Gestión de Activos", `Activo ${activoData.codigo || ''} ${activoData.id ? 'actualizado' : 'registrado'}`);
    return all;
  },

  deleteActivo(id) {
    const all = safeGet(STORAGE_KEYS.ACTIVOS, INITIAL_ACTIVOS);
    const filtered = all.filter(a => a.id !== id);
    safeSet(STORAGE_KEYS.ACTIVOS, filtered);
    this.addLog("Baja de Activo", `Activo ID ${id} eliminado del sistema`);
    return filtered;
  },

  toggleActivoEstado(id) {
    const all = safeGet(STORAGE_KEYS.ACTIVOS, INITIAL_ACTIVOS);
    const idx = all.findIndex(a => a.id === id);
    if (idx !== -1) {
      all[idx].estado = all[idx].estado === 'operativo' ? 'inactivo' : 'operativo';
      safeSet(STORAGE_KEYS.ACTIVOS, all);
      this.addLog("Estado de Activo", `Activo ${all[idx].codigo} marcado como ${all[idx].estado}`);
    }
    return all;
  },

  // Plantillas (Templates)
  getPlantillas(companyId = null) {
    const cid = companyId || this.getActiveCompanyId();
    const all = safeGet(STORAGE_KEYS.PLANTILLAS, INITIAL_PLANTILLAS);
    return all.filter(p => p.empresa_id === cid);
  },

  getPlantillaById(id) {
    const all = safeGet(STORAGE_KEYS.PLANTILLAS, INITIAL_PLANTILLAS);
    return all.find(p => p.id === id);
  },

  savePlantilla(plantillaData) {
    const all = safeGet(STORAGE_KEYS.PLANTILLAS, INITIAL_PLANTILLAS);
    const cid = this.getActiveCompanyId();
    if (plantillaData.id) {
      const idx = all.findIndex(p => p.id === plantillaData.id);
      if (idx !== -1) {
        all[idx] = { ...all[idx], ...plantillaData };
      }
    } else {
      const newPlt = {
        ...plantillaData,
        id: `plt-${Date.now()}`,
        empresa_id: cid,
        activa: true
      };
      all.unshift(newPlt);
    }
    safeSet(STORAGE_KEYS.PLANTILLAS, all);
    this.addLog("Configuración de Plantillas", `Plantilla ${plantillaData.nombre} guardada con éxito`);
    return all;
  },

  deletePlantilla(id) {
    const all = safeGet(STORAGE_KEYS.PLANTILLAS, INITIAL_PLANTILLAS);
    const filtered = all.filter(p => p.id !== id);
    safeSet(STORAGE_KEYS.PLANTILLAS, filtered);
    this.addLog("Baja de Plantilla", `Plantilla ID ${id} eliminada`);
    return filtered;
  },

  togglePlantillaEstado(id) {
    const all = safeGet(STORAGE_KEYS.PLANTILLAS, INITIAL_PLANTILLAS);
    const idx = all.findIndex(p => p.id === id);
    if (idx !== -1) {
      all[idx].activa = !all[idx].activa;
      safeSet(STORAGE_KEYS.PLANTILLAS, all);
      this.addLog("Estado de Plantilla", `Plantilla ${all[idx].nombre} ${all[idx].activa ? 'activada' : 'desactivada'}`);
    }
    return all;
  },

  // Inspecciones
  getInspecciones(companyId = null) {
    const cid = companyId || this.getActiveCompanyId();
    const all = safeGet(STORAGE_KEYS.INSPECCIONES, []);
    return all.filter(i => i.empresa_id === cid);
  },

  getInspeccionById(id) {
    const all = safeGet(STORAGE_KEYS.INSPECCIONES, []);
    return all.find(i => i.id === id);
  },

  saveInspeccion(inspData) {
    const all = safeGet(STORAGE_KEYS.INSPECCIONES, []);
    const cid = this.getActiveCompanyId();
    const currentUser = this.getActiveUser();

    let savedItem;
    if (inspData.id) {
      const idx = all.findIndex(i => i.id === inspData.id);
      if (idx !== -1) {
        all[idx] = { ...all[idx], ...inspData };
        savedItem = all[idx];
      } else {
        all.unshift(inspData);
        savedItem = inspData;
      }
    } else {
      const count = all.filter(i => i.empresa_id === cid).length + 1;
      const folio = `INSP-2026-${String(850 + count).padStart(4, "0")}`;
      savedItem = {
        ...inspData,
        id: `insp-${Date.now()}`,
        codigo_folio: folio,
        empresa_id: cid,
        inspector_id: currentUser.id,
        inspector_nombre: currentUser.nombre,
        fecha_inicio: inspData.fecha_inicio || new Date().toISOString()
      };
      all.unshift(savedItem);
    }

    // Regla de Negocio: Si la inspección se cierra y es NO CONFORME, generar automáticamente una Acción Correctiva
    if (savedItem.estado === 'completada' && savedItem.resultado === 'no_conforme') {
      this.ensureAccionCorrectivaForInspeccion(savedItem);
    }

    safeSet(STORAGE_KEYS.INSPECCIONES, all);

    if (savedItem.estado === 'completada') {
      this.addLog(
        savedItem.resultado === 'conforme' ? "Inspección Conforme" : "Hallazgo No Conforme Detectado",
        `Inspección ${savedItem.codigo_folio} de ${savedItem.activo_nombre} completada por ${savedItem.inspector_nombre}`
      );
    } else {
      this.addLog("Borrador Guardado", `Inspección ${savedItem.codigo_folio || 'en curso'} guardada en borrador`);
    }

    return savedItem;
  },

  ensureAccionCorrectivaForInspeccion(inspeccion) {
    const acciones = safeGet(STORAGE_KEYS.ACCIONES, INITIAL_ACCIONES_CORRECTIVAS);
    const existing = acciones.find(a => a.inspeccion_id === inspeccion.id);
    if (!existing) {
      // Find non-conforming responses
      const nonCompliant = (inspeccion.respuestas || []).filter(r => !r.conforme);
      const hallazgoDesc = nonCompliant.map(r => `${r.texto}: ${r.observacion || 'Fuera de norma'}`).join('. ') || inspeccion.observaciones_generales || 'Desviación identificada en inspección técnica';

      const firstEvidencia = (inspeccion.evidencias && inspeccion.evidencias[0]?.archivo) || null;

      // Deadline 5 days from now
      const deadline = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const newAccion = {
        id: `ac-${Date.now()}`,
        empresa_id: inspeccion.empresa_id,
        inspeccion_id: inspeccion.id,
        inspeccion_folio: inspeccion.codigo_folio,
        activo_codigo: inspeccion.activo_codigo,
        activo_nombre: inspeccion.activo_nombre,
        descripcion: `Atención inmediata de hallazgo: ${hallazgoDesc}`,
        hallazgo: hallazgoDesc,
        responsable_id: "usr-2", // Jefe de Mantenimiento por defecto
        responsable_nombre: "Ing. Marco Viteri P.",
        fecha_limite: deadline,
        estado: "abierta",
        prioridad: "alta",
        foto_evidencia: firstEvidencia,
        notificado_whatsapp: false
      };
      acciones.unshift(newAccion);
      safeSet(STORAGE_KEYS.ACCIONES, acciones);
    }
  },

  // Acciones Correctivas
  getAccionesCorrectivas(companyId = null) {
    const cid = companyId || this.getActiveCompanyId();
    const all = safeGet(STORAGE_KEYS.ACCIONES, INITIAL_ACCIONES_CORRECTIVAS);
    return all.filter(a => a.empresa_id === cid);
  },

  updateAccionCorrectiva(id, updates) {
    const all = safeGet(STORAGE_KEYS.ACCIONES, INITIAL_ACCIONES_CORRECTIVAS);
    const idx = all.findIndex(a => a.id === id);
    if (idx !== -1) {
      all[idx] = { ...all[idx], ...updates };
      safeSet(STORAGE_KEYS.ACCIONES, all);
      this.addLog("Acción Correctiva Actualizada", `Acción ${all[idx].id} cambió a estado ${all[idx].estado}`);
    }
    return all;
  },

  // Mantenimiento Preventivo
  getMantenimientos(companyId = null) {
    const cid = companyId || this.getActiveCompanyId();
    const all = safeGet(STORAGE_KEYS.MANTENIMIENTOS, INITIAL_MANTENIMIENTOS);
    // Recalcular dinámicamente semáforo de días restantes
    const today = new Date("2026-10-09T00:00:00").getTime();
    const dayMs = 24 * 60 * 60 * 1000;

    return all.filter(m => m.empresa_id === cid).map(m => {
      const prox = new Date(m.proxima_fecha + "T00:00:00").getTime();
      const diffDays = Math.round((prox - today) / dayMs);
      let alerta = 'al_dia';
      if (diffDays < 0) {
        alerta = 'vencido';
      } else if (diffDays <= 7) {
        alerta = 'proximo_a_vencer';
      }
      return {
        ...m,
        dias_restantes: diffDays,
        alerta: m.estado === 'realizado' ? 'al_dia' : alerta
      };
    });
  },

  updateMantenimiento(id, updates) {
    const all = safeGet(STORAGE_KEYS.MANTENIMIENTOS, INITIAL_MANTENIMIENTOS);
    const idx = all.findIndex(m => m.id === id);
    if (idx !== -1) {
      all[idx] = { ...all[idx], ...updates };
      // Si se marca realizado, calcular próxima fecha según frecuencia
      if (updates.estado === 'realizado') {
        const todayStr = "2026-10-09";
        const prox = new Date(new Date("2026-10-09").getTime() + (all[idx].frecuencia_dias || 90) * 24 * 60 * 60 * 1000);
        all[idx].ultima_fecha = todayStr;
        all[idx].proxima_fecha = prox.toISOString().split('T')[0];
        all[idx].alerta = 'al_dia';
      }
      safeSet(STORAGE_KEYS.MANTENIMIENTOS, all);
      this.addLog("Mantenimiento Preventivo", `Mantenimiento ${all[idx].activo_codigo} actualizado`);
    }
    return all;
  },

  // Registro de Actividad
  getRegistroActividad(companyId = null) {
    const cid = companyId || this.getActiveCompanyId();
    const all = safeGet(STORAGE_KEYS.LOGS, INITIAL_REGISTRO_ACTIVIDAD);
    return all.filter(l => l.empresa_id === cid);
  },

  addLog(accion, detalle) {
    const cid = this.getActiveCompanyId();
    const currentUser = this.getActiveUser();
    const all = safeGet(STORAGE_KEYS.LOGS, INITIAL_REGISTRO_ACTIVIDAD);
    const now = new Date();
    const timeStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth()+1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    all.unshift({
      id: `log-${Date.now()}`,
      empresa_id: cid,
      usuario_nombre: currentUser ? currentUser.nombre : 'Sistema InspecFácil',
      accion,
      detalle,
      fecha: timeStr
    });
    // keep max 50 logs
    safeSet(STORAGE_KEYS.LOGS, all.slice(0, 50));
  }
};
