import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Calendar, 
  User, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Camera, 
  ChevronRight, 
  Filter, 
  Search, 
  ExternalLink, 
  AlertTriangle,
  X,
  Maximize2,
  Check,
  LayoutList,
  Kanban,
  AlertCircle,
  FileText,
  ArrowRight,
  RotateCcw,
  Wrench,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { formatDateTimeDMY } from '../../data/seedData';

export function CorrectiveActionsList({ 
  acciones = [], 
  onUpdateAccion, 
  onOpenWhatsApp 
}) {
  const [viewMode, setViewMode] = useState('tabla'); // 'tabla' | 'kanban'
  const [filterStatus, setFilterStatus] = useState('todos'); // 'todos' | 'abierta' | 'en_proceso' | 'resuelta'
  const [filterPriority, setFilterPriority] = useState('todas'); // 'todas' | 'critica' | 'alta' | 'media'
  const [search, setSearch] = useState('');
  const [selectedAction, setSelectedAction] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  // Status counts
  const countAbiertas = acciones.filter(a => a.estado === 'abierta').length;
  const countEnProceso = acciones.filter(a => a.estado === 'en_proceso').length;
  const countResueltas = acciones.filter(a => a.estado === 'resuelta').length;
  const countTotal = acciones.length;

  const filtered = acciones.filter(a => {
    const matchesStatus = filterStatus === 'todos' || a.estado === filterStatus;
    const matchesPriority = filterPriority === 'todas' || (a.prioridad || '').toLowerCase() === filterPriority.toLowerCase();
    const query = search.toLowerCase();
    const matchesSearch = 
      (a.activo_nombre || '').toLowerCase().includes(query) ||
      (a.activo_codigo || '').toLowerCase().includes(query) ||
      (a.descripcion || '').toLowerCase().includes(query) ||
      (a.responsable_nombre || '').toLowerCase().includes(query) ||
      (a.inspeccion_folio || '').toLowerCase().includes(query);

    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-4 font-sans text-slate-900 antialiased">
      
      {/* 1. TOP EXECUTIVE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Acciones Correctivas & CAPA
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 font-mono border border-slate-200">
              ISO 45001 / SST
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Gestión, trazabilidad y cierre técnico de no conformidades detectadas en planta.
          </p>
        </div>

        {/* View Switcher: Tabla vs Kanban */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-2xs">
            <button
              onClick={() => setViewMode('tabla')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                viewMode === 'tabla'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Tabla de Control</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Tablero Kanban</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. REFINED STATUS FILTER BAR (LINEAR / INCIDENT.IO STYLE) */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
        
        {/* Status segment pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-0.5 sm:pb-0">
          <button
            onClick={() => setFilterStatus('todos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              filterStatus === 'todos'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>Todas</span>
            <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
              filterStatus === 'todos' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'
            }`}>
              {countTotal}
            </span>
          </button>

          <button
            onClick={() => setFilterStatus('abierta')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              filterStatus === 'abierta'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'text-rose-700 hover:bg-rose-50'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${filterStatus === 'abierta' ? 'bg-white' : 'bg-rose-500'}`}></span>
            <span>Abiertas</span>
            <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
              filterStatus === 'abierta' ? 'bg-rose-700 text-rose-100' : 'bg-rose-100 text-rose-700'
            }`}>
              {countAbiertas}
            </span>
          </button>

          <button
            onClick={() => setFilterStatus('en_proceso')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              filterStatus === 'en_proceso'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'text-amber-700 hover:bg-amber-50'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${filterStatus === 'en_proceso' ? 'bg-white' : 'bg-amber-500'}`}></span>
            <span>En Proceso</span>
            <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
              filterStatus === 'en_proceso' ? 'bg-amber-700 text-amber-100' : 'bg-amber-100 text-amber-700'
            }`}>
              {countEnProceso}
            </span>
          </button>

          <button
            onClick={() => setFilterStatus('resuelta')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              filterStatus === 'resuelta'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${filterStatus === 'resuelta' ? 'bg-white' : 'bg-emerald-500'}`}></span>
            <span>Resueltas</span>
            <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
              filterStatus === 'resuelta' ? 'bg-emerald-700 text-emerald-100' : 'bg-emerald-100 text-emerald-700'
            }`}>
              {countResueltas}
            </span>
          </button>
        </div>

        {/* Priority quick filter pills */}
        <div className="flex items-center space-x-1.5 shrink-0">
          <span className="text-[11px] text-slate-400 font-medium hidden md:inline">Severidad:</span>
          {['todas', 'critica', 'alta', 'media'].map(p => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer capitalize ${
                filterPriority === p
                  ? 'bg-slate-200 text-slate-900 font-bold'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

      </div>

      {/* 3. SEARCH BAR */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
        <input 
          type="text"
          placeholder="Buscar por código de equipo (MC-01), técnico responsable, folio de inspección o detalle..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs text-slate-900 placeholder:text-slate-400 font-medium"
        />
        {search && (
          <button 
            onClick={() => setSearch('')}
            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 4. MAIN DISPLAY: TABLA O KANBAN */}
      {viewMode === 'tabla' ? (
        /* ======================================================== */
        /* MODE A: HIGH-PRECISION ENTERPRISE TABLE                  */
        /* ======================================================== */
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Estado & Severidad</th>
                  <th className="py-3 px-4">Equipo Afectado</th>
                  <th className="py-3 px-4">Hallazgo Técnico</th>
                  <th className="py-3 px-4">Folio Auditoría</th>
                  <th className="py-3 px-4">Responsable</th>
                  <th className="py-3 px-4">Plazo Límite</th>
                  <th className="py-3 px-4 text-right">Gestión</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <div className="max-w-xs mx-auto space-y-1.5">
                        <CheckCircle2 className="w-8 h-8 text-slate-300 mx-auto" />
                        <p className="font-semibold text-slate-600 text-xs">Sin acciones en este filtro</p>
                        <p className="text-[11px] text-slate-400">No hay desviaciones registradas con los criterios seleccionados.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((action) => {
                    const isAbierta = action.estado === 'abierta';
                    const isEnProceso = action.estado === 'en_proceso';
                    const isResuelta = action.estado === 'resuelta';
                    const isCritica = (action.prioridad || '').toLowerCase() === 'critica' || action.severidad === 'critica';

                    return (
                      <tr key={action.id} className="hover:bg-slate-50/70 transition-colors">
                        
                        {/* Estado & Severidad */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                              isAbierta
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : isEnProceso
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                isAbierta ? 'bg-rose-500 animate-pulse' : isEnProceso ? 'bg-amber-500' : 'bg-emerald-500'
                              }`}></span>
                              {isAbierta ? 'Abierta' : isEnProceso ? 'En Proceso' : 'Resuelta'}
                            </span>

                            <div className="flex items-center space-x-1">
                              <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded font-mono ${
                                isCritica 
                                  ? 'bg-rose-100 text-rose-800' 
                                  : 'bg-slate-100 text-slate-600'
                              }`}>
                                {isCritica ? 'Crítica' : action.prioridad || 'Alta'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Equipo */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px] border border-slate-200">
                              {action.activo_codigo}
                            </span>
                            <div>
                              <div className="font-bold text-slate-900 truncate max-w-[170px]">
                                {action.activo_nombre}
                              </div>
                              <div className="text-[10px] text-slate-400 truncate max-w-[170px]">
                                {action.ubicacion || 'Planta Industrial'}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Hallazgo con miniatura de foto */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-start space-x-2.5 max-w-sm">
                            {action.foto_evidencia && (
                              <button
                                type="button"
                                onClick={() => setPreviewPhoto({
                                  url: action.foto_evidencia,
                                  title: action.descripcion,
                                  folio: action.inspeccion_folio,
                                  activo: `${action.activo_codigo} — ${action.activo_nombre}`
                                })}
                                className="w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-slate-200 hover:border-blue-500 transition-colors cursor-pointer group relative mt-0.5"
                                title="Ver fotografía de evidencia técnica"
                              >
                                <img 
                                  src={action.foto_evidencia} 
                                  alt="Foto" 
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <Maximize2 className="w-3 h-3 text-white" />
                                </div>
                              </button>
                            )}
                            <div className="min-w-0">
                              <p className="text-slate-900 font-semibold text-xs leading-snug">
                                {action.descripcion}
                              </p>
                              {action.hallazgo && (
                                <p className="text-slate-500 text-[11px] line-clamp-1 mt-0.5">
                                  {action.hallazgo}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Folio Origen */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] text-slate-600">
                          {action.inspeccion_folio || 'INSP-2026-0842'}
                        </td>

                        {/* Responsable */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center space-x-1.5">
                            <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[9px] font-bold font-mono">
                              {action.responsable_nombre ? action.responsable_nombre.charAt(0) : 'T'}
                            </div>
                            <span className="text-slate-800 font-medium text-xs">
                              {action.responsable_nombre}
                            </span>
                          </div>
                        </td>

                        {/* Plazo Límite */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="text-slate-900 font-mono text-[11px] font-semibold">
                            {action.fecha_limite}
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {isResuelta ? 'Cerrada' : 'En plazo'}
                          </span>
                        </td>

                        {/* Gestión / Acciones */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end space-x-1.5">
                            
                            {/* Transición de Estado Elegante */}
                            {isAbierta && onUpdateAccion && (
                              <button
                                type="button"
                                onClick={() => onUpdateAccion(action.id, { estado: 'en_proceso' })}
                                className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-bold transition-all cursor-pointer flex items-center space-x-1"
                                title="Pasar hallazgo a reparación técnica"
                              >
                                <span>A Taller</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}

                            {isEnProceso && onUpdateAccion && (
                              <button
                                type="button"
                                onClick={() => onUpdateAccion(action.id, { estado: 'resuelta' })}
                                className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold transition-all cursor-pointer flex items-center space-x-1"
                                title="Marcar hallazgo como resuelto y conforme"
                              >
                                <Check className="w-3 h-3" />
                                <span>Resolver</span>
                              </button>
                            )}

                            {isResuelta && onUpdateAccion && (
                              <button
                                type="button"
                                onClick={() => onUpdateAccion(action.id, { estado: 'abierta' })}
                                className="px-2 py-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-[10px] font-medium transition-colors cursor-pointer"
                                title="Reabrir acción correctiva"
                              >
                                Reabrir
                              </button>
                            )}

                            {/* WhatsApp Dispatcher */}
                            {onOpenWhatsApp && (
                              <button
                                type="button"
                                onClick={() => onOpenWhatsApp(action)}
                                className="p-1.5 rounded-lg text-[#25D366] hover:bg-emerald-50 transition-colors cursor-pointer border border-transparent hover:border-emerald-200"
                                title="Notificar por WhatsApp al técnico responsable"
                              >
                                <MessageSquare className="w-4 h-4 fill-[#25D366]" />
                              </button>
                            )}

                            {/* Ficha Completa */}
                            <button
                              type="button"
                              onClick={() => setSelectedAction(action)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                              title="Ver ficha técnica completa"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>

                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* MODE B: EXECUTIVE KANBAN COLUMNS                         */
        /* ======================================================== */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Column 1: Abiertas */}
          <div className="bg-slate-100/80 rounded-xl p-3.5 space-y-3 border border-slate-200/90 flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-xs text-rose-800 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span>Abiertas (Pendientes)</span>
              </span>
              <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.2 rounded-full font-mono">
                {countAbiertas}
              </span>
            </div>

            <div className="space-y-2.5 flex-1">
              {acciones.filter(a => a.estado === 'abierta').map(action => (
                <div 
                  key={action.id}
                  className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs space-y-2.5 hover:border-slate-300 transition-all group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                      {action.activo_codigo}
                    </span>
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                      {action.prioridad || 'Crítica'}
                    </span>
                  </div>

                  {action.foto_evidencia && (
                    <div 
                      onClick={() => setPreviewPhoto({
                        url: action.foto_evidencia,
                        title: action.descripcion,
                        folio: action.inspeccion_folio,
                        activo: `${action.activo_codigo} — ${action.activo_nombre}`
                      })}
                      className="h-28 rounded-lg overflow-hidden bg-slate-900 cursor-pointer relative group"
                    >
                      <img src={action.foto_evidencia} alt="Evidencia" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Maximize2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-slate-900 font-semibold leading-snug">
                    {action.descripcion}
                  </p>

                  <div className="text-[10px] text-slate-500 space-y-1 border-t border-slate-100 pt-2 font-mono">
                    <div className="flex justify-between">
                      <span>Responsable:</span>
                      <strong className="text-slate-800">{action.responsable_nombre}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Plazo:</span>
                      <strong className="text-slate-800">{action.fecha_limite}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    {onUpdateAccion && (
                      <button
                        type="button"
                        onClick={() => onUpdateAccion(action.id, { estado: 'en_proceso' })}
                        className="text-[10px] font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-md transition-colors flex items-center space-x-1 cursor-pointer"
                      >
                        <span>Pasar a En Proceso</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                    {onOpenWhatsApp && (
                      <button
                        type="button"
                        onClick={() => onOpenWhatsApp(action)}
                        className="p-1 text-[#25D366] hover:bg-emerald-50 rounded cursor-pointer"
                        title="Notificar vía WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: En Proceso */}
          <div className="bg-slate-100/80 rounded-xl p-3.5 space-y-3 border border-slate-200/90 flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-xs text-amber-800 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>En Proceso (En Reparación)</span>
              </span>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.2 rounded-full font-mono">
                {countEnProceso}
              </span>
            </div>

            <div className="space-y-2.5 flex-1">
              {acciones.filter(a => a.estado === 'en_proceso').map(action => (
                <div 
                  key={action.id}
                  className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs space-y-2.5 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                      {action.activo_codigo}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                      En Curso
                    </span>
                  </div>

                  <p className="text-xs text-slate-900 font-semibold leading-snug">
                    {action.descripcion}
                  </p>

                  <div className="text-[10px] text-slate-500 space-y-1 border-t border-slate-100 pt-2 font-mono">
                    <div className="flex justify-between">
                      <span>Responsable:</span>
                      <strong className="text-slate-800">{action.responsable_nombre}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Plazo:</span>
                      <strong className="text-slate-800">{action.fecha_limite}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    {onUpdateAccion && (
                      <button
                        type="button"
                        onClick={() => onUpdateAccion(action.id, { estado: 'resuelta' })}
                        className="text-[10px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md transition-colors flex items-center space-x-1 cursor-pointer"
                      >
                        <Check className="w-3 h-3" />
                        <span>Marcar Resuelta</span>
                      </button>
                    )}
                    {onOpenWhatsApp && (
                      <button
                        type="button"
                        onClick={() => onOpenWhatsApp(action)}
                        className="p-1 text-[#25D366] hover:bg-emerald-50 rounded cursor-pointer"
                        title="Notificar vía WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Resueltas */}
          <div className="bg-slate-100/80 rounded-xl p-3.5 space-y-3 border border-slate-200/90 flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-xs text-emerald-800 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Resueltas (Cerradas SST)</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full font-mono">
                {countResueltas}
              </span>
            </div>

            <div className="space-y-2.5 flex-1">
              {acciones.filter(a => a.estado === 'resuelta').map(action => (
                <div 
                  key={action.id}
                  className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs space-y-2.5 opacity-90"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                      {action.activo_codigo}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      Conforme
                    </span>
                  </div>

                  <p className="text-xs text-slate-800 font-semibold leading-snug">
                    {action.descripcion}
                  </p>

                  <div className="text-[10px] text-slate-500 border-t border-slate-100 pt-2 flex items-center justify-between">
                    <span>Cerrado y validado SST</span>
                    {onUpdateAccion && (
                      <button
                        type="button"
                        onClick={() => onUpdateAccion(action.id, { estado: 'abierta' })}
                        className="text-[10px] text-slate-500 hover:text-slate-800 hover:underline cursor-pointer"
                      >
                        Reabrir
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 5. SLIDE-OVER DETAIL MODAL */}
      {selectedAction && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedAction(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-900 px-5 py-3.5 text-white flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">Detalle de Acción Correctiva (CAPA)</h4>
                <p className="text-[10px] text-slate-400 font-mono">Folio: {selectedAction.inspeccion_folio} • {selectedAction.activo_codigo}</p>
              </div>
              <button
                onClick={() => setSelectedAction(null)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Equipo Afectado</span>
                <div className="text-slate-900 font-bold text-sm">{selectedAction.activo_nombre} ({selectedAction.activo_codigo})</div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Desviación / Hallazgo Técnico</span>
                <p className="text-slate-800 font-medium leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200 mt-1">
                  {selectedAction.descripcion}
                </p>
              </div>

              {selectedAction.foto_evidencia && (
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Evidencia Fotográfica de Campo</span>
                  <div className="mt-1 h-44 rounded-lg overflow-hidden bg-slate-950 border border-slate-200">
                    <img src={selectedAction.foto_evidencia} alt="Evidencia" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-1 text-[11px]">
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Responsable Asignado</span>
                  <strong className="text-slate-800">{selectedAction.responsable_nombre}</strong>
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Plazo Límite de Cierre</span>
                  <strong className="text-slate-800">{selectedAction.fecha_limite}</strong>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                {onOpenWhatsApp && (
                  <button
                    type="button"
                    onClick={() => {
                      onOpenWhatsApp(selectedAction);
                      setSelectedAction(null);
                    }}
                    className="flex-1 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2 px-3 rounded-lg font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Notificar por WhatsApp</span>
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={() => setSelectedAction(null)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  Cerrar
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 6. LIGHTBOX MODAL FOR EVIDENCE PHOTO */}
      {previewPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in"
          onClick={() => setPreviewPhoto(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-900 px-4 py-3 text-white flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">Evidencia Fotográfica de Campo</h4>
                <p className="text-[10px] text-slate-400 font-mono">{previewPhoto.activo} • {previewPhoto.folio}</p>
              </div>
              <button
                onClick={() => setPreviewPhoto(null)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-slate-950 flex items-center justify-center max-h-[60vh] overflow-hidden">
              <img 
                src={previewPhoto.url} 
                alt="Evidencia HD" 
                className="max-h-[55vh] w-auto object-contain rounded"
              />
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-700 font-medium">
              {previewPhoto.title}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
