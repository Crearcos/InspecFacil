import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  FileText, 
  Eye, 
  Camera, 
  X, 
  MessageSquare,
  ShieldAlert,
  ArrowRight,
  Plus
} from 'lucide-react';
import { formatDateTimeDMY } from '../../data/seedData';

export function InspectionList({ 
  inspecciones, 
  onViewPdf, 
  onOpenWhatsApp,
  onStartInspection
}) {
  const [search, setSearch] = useState('');
  const [filterResult, setFilterResult] = useState('todos');
  const [selectedInspection, setSelectedInspection] = useState(null);

  const filtered = inspecciones.filter(i => {
    const matchesSearch = 
      (i.codigo_folio || '').toLowerCase().includes(search.toLowerCase()) ||
      (i.activo_codigo || '').toLowerCase().includes(search.toLowerCase()) ||
      (i.activo_nombre || '').toLowerCase().includes(search.toLowerCase()) ||
      (i.inspector_nombre || '').toLowerCase().includes(search.toLowerCase());
    
    const matchesResult = 
      filterResult === 'todos' || 
      i.resultado === filterResult;

    return matchesSearch && matchesResult;
  });

  return (
    <div className="space-y-4">
      
      {/* Search and Filter Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input 
            type="text"
            placeholder="Buscar por folio (INSP-...), código de equipo o inspector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterResult}
            onChange={(e) => setFilterResult(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="todos">Todos los dictámenes</option>
            <option value="conforme">Conformes</option>
            <option value="no_conforme">No Conformes (Hallazgos)</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs text-slate-500 font-medium">
            {filtered.length} inspecciones
          </span>
          {onStartInspection && (
            <button
              onClick={() => onStartInspection()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer active:scale-98"
            >
              <Plus className="w-3.5 h-3.5 text-white" />
              <span>Nueva Inspección</span>
            </button>
          )}
        </div>

      </div>

      {/* Inspections Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Folio</th>
                <th className="py-3 px-4">Fecha / Hora</th>
                <th className="py-3 px-4">Activo Inspeccionado</th>
                <th className="py-3 px-4">Checklist / Norma</th>
                <th className="py-3 px-4">Inspector</th>
                <th className="py-3 px-4 text-center">Dictamen</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    No se encontraron inspecciones con el criterio de búsqueda.
                  </td>
                </tr>
              ) : (
                filtered.map((insp) => {
                  const isConforme = insp.resultado === 'conforme';
                  const isBorrador = insp.estado === 'borrador';

                  return (
                    <tr key={insp.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {insp.codigo_folio}
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                        {formatDateTimeDMY(insp.fecha_fin || insp.fecha_inicio)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{insp.activo_codigo}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[200px]">
                          {insp.activo_nombre}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-700 truncate max-w-[200px]">
                        {insp.plantilla_nombre}
                      </td>
                      <td className="py-3 px-4 text-slate-800">
                        {insp.inspector_nombre}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {isBorrador ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            Borrador
                          </span>
                        ) : isConforme ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Conforme
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            No Conforme
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            onClick={() => setSelectedInspection(insp)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                            title="Ver Detalle"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => onViewPdf(insp)}
                            className="inline-flex items-center space-x-1 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                            title="Descargar PDF"
                          >
                            <FileText className="w-3.5 h-3.5 text-slate-500" />
                            <span>PDF</span>
                          </button>

                          {!isConforme && !isBorrador && (
                            <button
                              onClick={() => onOpenWhatsApp(insp)}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                              title="Notificación WhatsApp"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          )}
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

      {/* Modal Detalle de Inspección */}
      {selectedInspection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            
            <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs text-sky-400 font-bold">{selectedInspection.codigo_folio}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    selectedInspection.resultado === 'conforme' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                  }`}>
                    {selectedInspection.resultado === 'conforme' ? 'Conforme' : 'No Conforme'}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white mt-1">
                  {selectedInspection.activo_codigo} — {selectedInspection.activo_nombre}
                </h3>
              </div>
              
              <button 
                onClick={() => setSelectedInspection(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-700">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Plantilla</span>
                  <span className="font-semibold text-slate-900">{selectedInspection.plantilla_nombre}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Inspector</span>
                  <span className="font-semibold text-slate-900">{selectedInspection.inspector_nombre}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Fecha</span>
                  <span className="font-semibold text-slate-900">{formatDateTimeDMY(selectedInspection.fecha_fin || selectedInspection.fecha_inicio)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Estado</span>
                  <span className="font-semibold text-slate-900 uppercase">{selectedInspection.estado}</span>
                </div>
              </div>

              {selectedInspection.observaciones_generales && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800">
                  <strong className="block text-[11px] text-slate-700 mb-0.5">Observaciones de Cierre:</strong>
                  {selectedInspection.observaciones_generales}
                </div>
              )}

              <div>
                <h4 className="font-bold text-slate-900 mb-2 uppercase text-[11px] tracking-wider">
                  Respuestas del Checklist Técnico ({(selectedInspection.respuestas || []).length})
                </h4>
                
                <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100">
                  {(selectedInspection.respuestas || []).map((r, idx) => (
                    <div key={idx} className="p-3 flex items-start justify-between gap-3 bg-white hover:bg-slate-50/70 transition-colors">
                      <div className="flex items-start space-x-2.5">
                        <span className="w-5 h-5 rounded bg-slate-100 text-slate-700 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-medium text-slate-900">{r.texto}</p>
                          {r.observacion && (
                            <p className="text-[11px] text-slate-500 mt-0.5">Nota: {r.observacion}</p>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          r.conforme === false 
                            ? 'bg-rose-50 text-rose-700 border-rose-200' 
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {r.valor === 'si' ? 'Sí' : r.valor === 'no' ? 'No' : r.valor}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {(selectedInspection.evidencias || []).length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 uppercase text-[11px] tracking-wider flex items-center space-x-1">
                    <Camera className="w-3.5 h-3.5 text-slate-500" />
                    <span>Evidencias Fotográficas ({selectedInspection.evidencias.length})</span>
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    {selectedInspection.evidencias.map((evi) => (
                      <div key={evi.id} className="rounded-lg overflow-hidden border border-slate-200 bg-slate-900">
                        <img src={evi.archivo} alt="Evidencia" className="w-full h-36 object-cover" />
                        <div className="p-2 bg-slate-800 text-[10px] text-slate-200 truncate">
                          {evi.descripcion}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <button
                onClick={() => setSelectedInspection(null)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cerrar
              </button>

              <button
                onClick={() => onViewPdf(selectedInspection)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 shadow-xs"
              >
                <FileText className="w-4 h-4 text-sky-400" />
                <span>Descargar Reporte PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
