import React from 'react';
import { 
  CheckCircle2, 
  FileText, 
  MessageSquare, 
  X,
  AlertCircle
} from 'lucide-react';

export function InspectionSuccessModal({ 
  isOpen, 
  onClose, 
  inspeccion, 
  onDownloadPdf, 
  onOpenWhatsApp,
  onNewInspection 
}) {
  if (!isOpen || !inspeccion) return null;

  const isConforme = inspeccion.resultado === 'conforme';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full overflow-hidden border border-slate-200 text-center">
        
        {/* Header in Crisp White */}
        <div className="bg-white p-6 border-b border-slate-100 relative">
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 border ${
            isConforme ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'
          }`}>
            {isConforme ? (
              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
            ) : (
              <AlertCircle className="w-7 h-7 text-rose-600" />
            )}
          </div>

          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
            {isConforme ? 'Inspección Finalizada' : 'Inspección Registrada con Hallazgo'}
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-mono font-medium">
            Folio: <strong className="text-slate-900">{inspeccion.codigo_folio}</strong>
          </p>
        </div>

        {/* Details & Status */}
        <div className="p-5 space-y-3.5 text-xs">
          
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-left space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Equipo:</span>
              <span className="font-semibold text-slate-900">{inspeccion.activo_codigo} — {inspeccion.activo_nombre}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Resultado:</span>
              <span className={`font-semibold px-2 py-0.5 rounded text-[10px] border ${
                isConforme ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}>
                {isConforme ? 'Conforme' : 'No Conforme'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Inspector:</span>
              <span className="text-slate-800 font-medium">{inspeccion.inspector_nombre}</span>
            </div>
          </div>

          {!isConforme && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-left text-[11px] text-rose-800">
              <strong>Acción Correctiva Asignada:</strong>
              <p className="text-rose-700 mt-0.5">
                Se notificó al área de mantenimiento para programación de servicio técnico.
              </p>
            </div>
          )}

          {/* Core Actions */}
          <div className="space-y-2 pt-1">
            
            <button
              onClick={() => onDownloadPdf(inspeccion)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-md shadow-blue-600/20 cursor-pointer active:scale-98"
            >
              <FileText className="w-4 h-4 text-white" />
              <span>Descargar Certificado PDF Oficial</span>
            </button>

            {!isConforme && (
              <button
                onClick={() => onOpenWhatsApp(inspeccion)}
                className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-white" />
                <span>Notificar por WhatsApp</span>
              </button>
            )}

            <button
              onClick={onNewInspection}
              className="w-full text-slate-600 hover:text-slate-900 py-1.5 text-xs font-medium"
            >
              Realizar Otra Inspección
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
