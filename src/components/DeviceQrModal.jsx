import React from 'react';
import { QrCode, Smartphone, X, ExternalLink, Check } from 'lucide-react';

export function DeviceQrModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const currentUrl = window.location.href;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full overflow-hidden border border-slate-200 text-center">
        
        {/* Header in Crisp White */}
        <div className="bg-white px-5 py-4 border-b border-slate-200 text-slate-900 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Smartphone className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Acceso Móvil en Campo</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3.5">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 inline-block">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(currentUrl)}`} 
              alt="QR Code"
              className="w-40 h-40 object-contain mx-auto"
            />
          </div>

          <div className="space-y-1">
            <p className="font-semibold text-slate-900 text-xs">
              Escanea este código con la cámara de tu smartphone
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Permite probar el flujo del inspector con controles táctiles nativos y cámara integrada.
            </p>
          </div>

          <div className="text-left bg-slate-50 rounded-lg p-3 border border-slate-200 space-y-1.5 text-[11px] text-slate-600">
            <div className="font-semibold text-slate-800">Modo de Instalación (PWA):</div>
            <p>
              En Safari (iOS) o Chrome (Android), selecciona <strong>"Agregar a pantalla de inicio"</strong> para abrir la app a pantalla completa sin barras del navegador.
            </p>
          </div>
        </div>

        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-98"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
