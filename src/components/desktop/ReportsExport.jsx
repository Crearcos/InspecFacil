import React from 'react';
import { 
  FileSpreadsheet, 
  FileText, 
  TrendingUp, 
  ShieldCheck,
  Building2,
  Calendar,
  Download
} from 'lucide-react';
import { formatDateTimeDMY } from '../../data/seedData';

export function ReportsExport({ 
  inspecciones, 
  company, 
  logs, 
  onExportExcel, 
  onExportPdfSummary 
}) {
  const total = inspecciones.length;
  const conformes = inspecciones.filter(i => i.resultado === 'conforme').length;
  const noConformes = total - conformes;
  const pct = total > 0 ? ((conformes / total) * 100).toFixed(1) : '100.0';

  return (
    <div className="space-y-6">
      
      {/* Header with Export Buttons */}
      <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Informes de Cumplimiento & Auditoría SST
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Descarga de consolidados operacionales e historial de trazabilidad de {company.nombre}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onExportExcel}
            className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Exportar en Excel (.xlsx)</span>
          </button>

          <button
            onClick={onExportPdfSummary}
            className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <FileText className="w-4 h-4 text-sky-400" />
            <span>Certificado PDF de Muestra</span>
          </button>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Inspecciones Totales</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{total}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Historial acumulado</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Inspecciones Conformes</span>
          <div className="text-2xl font-bold text-emerald-700 mt-1">{conformes}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Sin desviaciones</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Con Hallazgos</span>
          <div className="text-2xl font-bold text-rose-700 mt-1">{noConformes}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Acción correctiva emitida</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Tasa de Conformidad</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{pct}%</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Estándar ISO 45001</p>
        </div>

      </div>

      {/* Audit Logs */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Registro de Actividad y Auditoría
            </h3>
            <p className="text-[11px] text-slate-500">
              Historial cronológico de eventos registrados en la base de datos
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-400">tabla: registro_actividad</span>
        </div>

        <div className="space-y-1 max-h-72 overflow-y-auto divide-y divide-slate-100">
          {logs.map((log) => (
            <div key={log.id} className="pt-2.5 pb-1 flex items-start justify-between text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-slate-900">{log.accion}</span>
                  <span className="text-[10px] text-slate-400 font-mono">• {log.fecha}</span>
                </div>
                <p className="text-slate-600 text-[11px]">{log.detalle}</p>
              </div>
              <span className="text-slate-500 font-medium shrink-0 text-[11px] ml-4">
                {log.usuario_nombre}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
