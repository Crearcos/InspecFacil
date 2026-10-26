import React, { useState } from 'react';
import { QrCode, Camera, X, Search, ArrowRight, Sparkles } from 'lucide-react';

export function QrScannerModal({ isOpen, onClose, activos, onSelectActivo }) {
  if (!isOpen) return null;

  const [search, setSearch] = useState('');

  const filtered = activos.filter(a => 
    a.codigo.toLowerCase().includes(search.toLowerCase()) ||
    a.nombre.toLowerCase().includes(search.toLowerCase()) ||
    a.tipo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        
        {/* Header in Crisp White */}
        <div className="bg-white px-5 py-4 border-b border-slate-200 text-slate-900 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Identificación de Equipo por QR</h3>
              <p className="text-[11px] text-slate-500 font-medium">Escaneo de cámara o selección directa de catálogo</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder Graphic with Alternative Simulation Button */}
        <div className="relative bg-slate-900 p-5 shrink-0 text-center flex flex-col items-center justify-center min-h-[160px]">
          <div className="w-28 h-28 border-2 border-blue-400 rounded-2xl relative flex items-center justify-center bg-slate-950/40">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-400 -mt-0.5 -ml-0.5"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-400 -mt-0.5 -mr-0.5"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-400 -mb-0.5 -ml-0.5"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-400 -mb-0.5 -mr-0.5"></div>
            
            <QrCode className="w-12 h-12 text-blue-400 animate-pulse" />
          </div>
          
          <p className="text-[11px] text-slate-300 mt-2 font-medium">
            Alinea el código QR del equipo dentro del visor
          </p>

          {/* Botón Alternativo de Simulación para Demostración */}
          <button
            onClick={() => {
              const target = activos.find(a => a.codigo === 'MC-01') || activos[0];
              if (target) {
                onSelectActivo(target);
                onClose();
              }
            }}
            className="mt-3 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            <span>Simular Lectura QR: Montacargas MC-01</span>
          </button>
        </div>

        {/* Equipment Selector */}
        <div className="p-4 flex-1 overflow-y-auto space-y-2.5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text"
              placeholder="Buscar activo (MC-01, EXT-01, GEN-01...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="space-y-1.5">
            {filtered.slice(0, 6).map((activo) => (
              <button
                key={activo.id}
                onClick={() => {
                  onSelectActivo(activo);
                  onClose();
                }}
                className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-between group bg-white"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded bg-slate-100 text-slate-900 font-mono font-bold flex items-center justify-center text-[11px] shrink-0 border border-slate-200">
                    {activo.codigo}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-xs text-slate-900 truncate">
                      {activo.nombre}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {activo.tipo} • {activo.ubicacion}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1"
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
}
