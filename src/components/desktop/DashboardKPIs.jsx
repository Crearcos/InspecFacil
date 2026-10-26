import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Wrench, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  TrendingUp,
  Clock,
  ArrowRight,
  ChevronRight,
  QrCode
} from 'lucide-react';
import { formatDateTimeDMY } from '../../data/seedData';

export function DashboardKPIs({ 
  inspecciones, 
  acciones, 
  mantenimientos, 
  activos, 
  plantillas, 
  onNavigateTab,
  onOpenQrScanner
}) {
  const totalInspecciones = inspecciones.length;
  const conformes = inspecciones.filter(i => i.resultado === 'conforme').length;
  const noConformes = totalInspecciones - conformes;
  const tasaConformidad = totalInspecciones > 0 ? ((conformes / totalInspecciones) * 100).toFixed(1) : '100.0';

  const accionesAbiertas = acciones.filter(a => a.estado === 'abierta').length;
  const accionesEnProceso = acciones.filter(a => a.estado === 'en_proceso').length;
  
  const mantenimientosVencidos = mantenimientos.filter(m => m.alerta === 'vencido' && m.estado !== 'realizado').length;
  const mantenimientosEstaSemana = mantenimientos.filter(m => m.alerta === 'proximo_a_vencer' && m.estado !== 'realizado').length;

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">
            Panel General de Operaciones
          </h1>
          <p className="text-xs text-slate-500">
            Control de conformidad en planta, hallazgos de campo y mantenimiento preventivo.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {onOpenQrScanner && (
            <button
              onClick={onOpenQrScanner}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white transition-colors cursor-pointer active:scale-98"
            >
              <QrCode className="w-3.5 h-3.5 text-white" />
              <span>Escanear QR</span>
            </button>
          )}

          <button
            onClick={() => onNavigateTab('reportes')}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Exportar Reporte</span>
          </button>
        </div>
      </div>

      {/* 4 Professional KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Conformidad */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-medium text-slate-600">Conformidad SST</span>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                Meta ≥90%
              </span>
            </div>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">{tasaConformidad}%</span>
              <span className="text-xs text-slate-500 font-normal">índice global</span>
            </div>
            {/* Clean Progress Bar */}
            <div className="mt-2.5 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, parseFloat(tasaConformidad)))}%` }}
              ></div>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>{conformes} conformes</span>
            <span className="text-rose-600 font-medium">{noConformes} con hallazgos</span>
          </div>
        </div>

        {/* KPI 2: Inspecciones Totales */}
        <div 
          onClick={() => onNavigateTab('inspecciones')}
          className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors cursor-pointer group"
        >
          <div>
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-medium text-slate-600">Inspecciones Realizadas</span>
              <span className="text-[10px] text-slate-400 font-mono">90 días</span>
            </div>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">{totalInspecciones}</span>
              <span className="text-xs text-slate-500 font-normal">completadas</span>
            </div>
            <div className="mt-2.5 text-[11px] text-slate-500">
              Sobre <strong>{activos.length}</strong> equipos industriales
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 group-hover:text-blue-600 font-medium">
            <span>Ver historial</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </div>

        {/* KPI 3: Acciones Correctivas */}
        <div 
          onClick={() => onNavigateTab('acciones')}
          className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors cursor-pointer group"
        >
          <div>
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-medium text-slate-600">Hallazgos & Acciones</span>
              {accionesAbiertas > 0 ? (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  {accionesAbiertas} abiertas
                </span>
              ) : (
                <span className="text-[10px] text-emerald-600 font-medium">Al día</span>
              )}
            </div>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">{accionesAbiertas + accionesEnProceso}</span>
              <span className="text-xs text-slate-500 font-normal">en resolución</span>
            </div>
            <div className="mt-2.5 text-[11px] text-slate-500">
              {accionesEnProceso} actualmente en curso
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 group-hover:text-blue-600 font-medium">
            <span>Gestionar hallazgos</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </div>

        {/* KPI 4: Mantenimiento Preventivo */}
        <div 
          onClick={() => onNavigateTab('calendario')}
          className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors cursor-pointer group"
        >
          <div>
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-medium text-slate-600">Mantenimiento Preventivo</span>
              {mantenimientosVencidos > 0 && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                  {mantenimientosVencidos} vencido
                </span>
              )}
            </div>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">{mantenimientosEstaSemana}</span>
              <span className="text-xs text-slate-500 font-normal">esta semana</span>
            </div>
            <div className="mt-2.5 text-[11px] text-slate-500">
              {mantenimientos.length} rutinas programadas
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 group-hover:text-blue-600 font-medium">
            <span>Ver calendario</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </div>

      </div>

      {/* Two Enterprise Widgets Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Widget 1: Acciones Correctivas Prioritarias */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Hallazgos Técnicos & Acciones en Curso</h2>
              <p className="text-[11px] text-slate-500">Desviaciones registradas en campo que requieren atención</p>
            </div>
            <button
              onClick={() => onNavigateTab('acciones')}
              className="text-xs text-sky-700 hover:text-sky-800 font-semibold"
            >
              Ver todas
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {acciones.slice(0, 3).map((ac) => {
              const isAbierta = ac.estado === 'abierta';
              return (
                <div 
                  key={ac.id}
                  onClick={() => onNavigateTab('acciones')}
                  className="p-4 hover:bg-slate-50/70 transition-colors cursor-pointer flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-slate-800">{ac.activo_codigo}</span>
                      <span className="font-medium text-slate-900 truncate max-w-[200px]">{ac.activo_nombre}</span>
                      <span className={`inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-medium border ${
                        isAbierta
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : ac.estado === 'en_proceso'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {isAbierta ? 'Abierta' : ac.estado === 'en_proceso' ? 'En Proceso' : 'Resuelta'}
                      </span>
                    </div>

                    <p className="text-slate-600 text-[11px] line-clamp-1">{ac.descripcion}</p>
                    
                    <div className="text-[10px] text-slate-400">
                      Responsable: <strong className="text-slate-700 font-medium">{ac.responsable_nombre}</strong> • Límite: <strong className="text-slate-700 font-medium">{ac.fecha_limite}</strong>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Widget 2: Mantenimientos Próximos */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Programa Preventivo Próximo</h2>
              <p className="text-[11px] text-slate-500">Rondas y servicios técnicos programados por fecha</p>
            </div>
            <button
              onClick={() => onNavigateTab('calendario')}
              className="text-xs text-sky-700 hover:text-sky-800 font-semibold"
            >
              Ver calendario
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {mantenimientos.slice(0, 4).map((m) => {
              const isVencido = m.alerta === 'vencido' && m.estado !== 'realizado';
              const isProximo = m.alerta === 'proximo_a_vencer' && m.estado !== 'realizado';

              return (
                <div 
                  key={m.id}
                  onClick={() => onNavigateTab('calendario')}
                  className="p-3.5 hover:bg-slate-50/70 transition-colors cursor-pointer flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-slate-800">{m.activo_codigo}</span>
                      <span className="font-medium text-slate-900 truncate max-w-[220px]">{m.activo_nombre}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] truncate max-w-[280px]">{m.tipo}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                      isVencido
                        ? 'bg-rose-50 text-rose-700 border-rose-200 font-semibold'
                        : isProximo
                        ? 'bg-amber-50 text-amber-700 border-amber-200 font-semibold'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>
                      {isVencido ? 'Vencido' : isProximo ? `En ${m.dias_restantes} días` : 'Al día'}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">{m.proxima_fecha}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
