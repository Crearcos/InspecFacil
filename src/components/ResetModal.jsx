import React, { useState } from 'react';
import { RotateCcw, AlertTriangle, X } from 'lucide-react';

export function ResetModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setLoading(true);
    setTimeout(() => {
      onConfirm();
      setLoading(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full overflow-hidden border border-slate-200">
        
        {/* Header in Crisp White */}
        <div className="bg-white px-5 py-4 border-b border-slate-200 text-slate-900 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-bold">
              <RotateCcw className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Restablecer Datos Iniciales</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3 text-xs">
          <p className="text-slate-700 leading-relaxed">
            Esta acción restaurará el estado original de la base de datos con los 30 activos, 4 plantillas y el historial auditado de 90 días.
          </p>

          <p className="text-slate-500 text-[11px]">
            Cualquier activo o inspección creada durante esta sesión será reiniciada a los valores de muestra.
          </p>
        </div>

        {/* Actions */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleReset}
            disabled={loading}
            className="bg-rose-700 hover:bg-rose-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 shadow-xs"
          >
            {loading ? (
              <span>Restableciendo...</span>
            ) : (
              <span>Confirmar Restauración</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
