import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Wrench, 
  Check, 
  Search,
  Filter,
  CheckCircle
} from 'lucide-react';

export function PreventiveCalendar({ 
  mantenimientos, 
  onUpdateMantenimiento 
}) {
  const [filterTraffic, setFilterTraffic] = useState('todos');
  const [search, setSearch] = useState('');

  const filtered = mantenimientos.filter(m => {
    const matchesTraffic = 
      filterTraffic === 'todos' || 
      m.alerta === filterTraffic ||
      (filterTraffic === 'realizado' && m.estado === 'realizado');

    const matchesSearch = 
      (m.activo_nombre || '').toLowerCase().includes(search.toLowerCase()) ||
      (m.activo_codigo || '').toLowerCase().includes(search.toLowerCase()) ||
      (m.tipo || '').toLowerCase().includes(search.toLowerCase());

    return matchesTraffic && matchesSearch;
  });

  const countVencidos = mantenimientos.filter(m => m.alerta === 'vencido' && m.estado !== 'realizado').length;
  const countProximos = mantenimientos.filter(m => m.alerta === 'proximo_a_vencer' && m.estado !== 'realizado').length;
  const countAlDia = mantenimientos.filter(m => m.alerta === 'al_dia' || m.estado === 'realizado').length;

  return (
    <div className="space-y-4">
      
      {/* 3 Metric Filter Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        {/* Vencidos */}
        <button 
          onClick={() => setFilterTraffic('vencido')}
          className={`p-4 rounded-xl border text-left transition-all ${
            filterTraffic === 'vencido'
              ? 'bg-rose-50/70 border-rose-300 ring-1 ring-rose-400'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-800 inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>Vencidos</span>
            </span>
            <span className="text-2xl font-bold text-rose-700">{countVencidos}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Requieren ejecución técnica inmediata</p>
        </button>

        {/* Por vencer (<= 7 días) */}
        <button 
          onClick={() => setFilterTraffic('proximo_a_vencer')}
          className={`p-4 rounded-xl border text-left transition-all ${
            filterTraffic === 'proximo_a_vencer'
              ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-400'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-800 inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Por Vencer (&le; 7 días)</span>
            </span>
            <span className="text-2xl font-bold text-amber-700">{countProximos}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Servicios programados para esta semana</p>
        </button>

        {/* Al día */}
        <button 
          onClick={() => setFilterTraffic('al_dia')}
          className={`p-4 rounded-xl border text-left transition-all ${
            filterTraffic === 'al_dia'
              ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-400'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-800 inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Al Día</span>
            </span>
            <span className="text-2xl font-bold text-emerald-700">{countAlDia}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Conforme al cronograma preventivo</p>
        </button>

      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input 
            type="text"
            placeholder="Buscar por código de equipo, nombre o rutina..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterTraffic('todos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterTraffic === 'todos' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Ver todos ({mantenimientos.length})
          </button>
        </div>
      </div>

      {/* Maintenance Table / List */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Equipo</th>
                <th className="py-3 px-4">Rutina de Mantenimiento</th>
                <th className="py-3 px-4">Frecuencia</th>
                <th className="py-3 px-4">Último Servicio</th>
                <th className="py-3 px-4">Próxima Fecha</th>
                <th className="py-3 px-4">Estado / Alerta</th>
                <th className="py-3 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => {
                const isVencido = item.alerta === 'vencido' && item.estado !== 'realizado';
                const isProximo = item.alerta === 'proximo_a_vencer' && item.estado !== 'realizado';
                const isRealizado = item.estado === 'realizado';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-slate-900">{item.activo_codigo}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[200px]">{item.activo_nombre}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-800 font-medium max-w-[260px]">
                      {item.tipo}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {item.frecuencia_dias} días
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono">
                      {item.ultima_fecha}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                      {item.proxima_fecha}
                    </td>
                    <td className="py-3 px-4">
                      {isRealizado ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Ejecutado
                        </span>
                      ) : isVencido ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          Vencido ({Math.abs(item.dias_restantes)} d)
                        </span>
                      ) : isProximo ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          En {item.dias_restantes} días
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-50 text-slate-700 border border-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Al día ({item.dias_restantes} d)
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {!isRealizado && (
                        <button
                          onClick={() => onUpdateMantenimiento(item.id, { estado: 'realizado' })}
                          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-emerald-700 text-white text-[11px] font-semibold shadow-xs transition-colors"
                        >
                          <Check className="w-3 h-3" />
                          <span>Completar</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
