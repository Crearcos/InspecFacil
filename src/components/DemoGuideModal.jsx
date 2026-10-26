import React from 'react';
import { 
  Clock, 
  FileText, 
  Calendar, 
  Download, 
  X, 
  ArrowRight,
  ShieldCheck,
  QrCode,
  HelpCircle
} from 'lucide-react';

export function DemoGuideModal({ 
  isOpen, 
  onClose, 
  onSelectStep, 
  onShowQrCode 
}) {
  if (!isOpen) return null;

  const steps = [
    {
      num: "1",
      title: "Configuración de Checklist",
      time: "Paso 1",
      desc: "Revisión de plantillas técnicas, preguntas críticas y valores conformes esperados.",
      roleAction: "Ver Plantillas",
      stepKey: "step-1"
    },
    {
      num: "2",
      title: "Inspección de Campo con Fotografía",
      time: "Paso 2",
      desc: "Modo móvil para el inspector: identificación del equipo MC-01, llenado táctil y registro fotográfico.",
      roleAction: "Iniciar Inspección",
      stepKey: "step-2"
    },
    {
      num: "3",
      title: "Firma Digital & Emisión de Certificado PDF",
      time: "Paso 3",
      desc: "Firma en pantalla del técnico y generación instantánea del certificado técnico oficial.",
      roleAction: "Generar Certificado",
      stepKey: "step-3"
    },
    {
      num: "4",
      title: "Gestión de Hallazgo & Trazabilidad",
      time: "Paso 4",
      desc: "Seguimiento a la acción correctiva generada y simulación de notificación a mantenimiento.",
      roleAction: "Ver Acciones",
      stepKey: "step-4"
    },
    {
      num: "5",
      title: "Cronograma Preventivo & Alertas",
      time: "Paso 5",
      desc: "Visualización de fechas de vencimiento y cálculo dinámico del próximo servicio.",
      roleAction: "Ver Calendario",
      stepKey: "step-5"
    },
    {
      num: "6",
      title: "Consolidado Ejecutivo en Excel",
      time: "Paso 6",
      desc: "Exportación de métricas de cumplimiento y detalle de inspecciones a formato .xlsx.",
      roleAction: "Exportar XLSX",
      stepKey: "step-6"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-xl w-full max-h-[88vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header in Crisp White */}
        <div className="bg-white px-6 py-4.5 border-b border-slate-200 text-slate-900 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold tracking-tight text-slate-900">Guía de Demostración Operativa</h2>
              <p className="text-xs text-slate-500 font-medium">Flujo de verificación en 5 minutos para clientes</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps */}
        <div className="p-5 overflow-y-auto space-y-2.5">
          {steps.map((st) => (
            <div 
              key={st.num}
              className="bg-slate-50 hover:bg-slate-100/80 transition-colors rounded-lg p-3 border border-slate-200 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 font-mono font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                  {st.num}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">{st.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({st.time})</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-0.5">{st.desc}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectStep(st.stepKey);
                  onClose();
                }}
                className="shrink-0 bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600 border border-slate-300 text-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition-colors shadow-xs cursor-pointer"
              >
                <span>{st.roleAction}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={() => {
                onShowQrCode();
                onClose();
              }}
              className="inline-flex items-center space-x-1.5 text-xs text-slate-700 hover:text-slate-900 font-semibold"
            >
              <QrCode className="w-4 h-4 text-slate-500" />
              <span>Abrir código QR para probar en smartphone</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
