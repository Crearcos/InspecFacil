import React, { useState } from 'react';
import { MessageSquare, CheckCheck, ExternalLink, X, ShieldAlert, Copy, Check } from 'lucide-react';
import { formatDateTimeDMY } from '../data/seedData';

export function WhatsAppModal({ isOpen, onClose, accionCorrectiva, inspeccion }) {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  const folio = accionCorrectiva?.inspeccion_folio || inspeccion?.codigo_folio || 'INSP-2026-0842';
  const activo = accionCorrectiva?.activo_nombre || inspeccion?.activo_nombre || 'Montacargas Toyota 8FGU25 #01';
  const codigo = accionCorrectiva?.activo_codigo || inspeccion?.activo_codigo || 'MC-01';
  const hallazgo = accionCorrectiva?.hallazgo || 'Fisura en manguera de alta presión con goteo continuo de aceite hidráulico';
  const responsable = accionCorrectiva?.responsable_nombre || 'Ing. Marco Viteri P.';
  const fechaLimite = accionCorrectiva?.fecha_limite || '12/10/2026';
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const messageText = `*INSPECFÁCIL | NOTIFICACIÓN DE HALLAZGO SST*

*Folio:* ${folio}
*Equipo:* ${codigo} — ${activo}
*Responsable:* ${responsable}
*Fecha Límite:* ${fechaLimite}

*Detalle de la No Conformidad:*
${hallazgo}

*Certificado Técnico & Evidencias:*
https://inspecfacil.demo/reportes/${folio}.pdf

_Sistema Integrado de Gestión y Mantenimiento Industrial_`;

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-slate-200">
        
        {/* WhatsApp Web Style Header */}
        <div className="bg-[#075E54] px-4 py-3 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-xs leading-tight">InspecFácil Notificaciones</h3>
              <p className="text-[10px] text-emerald-200">
                Canal Oficial de Alertas Técnicas
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="bg-[#EFEAE2] p-4 min-h-[280px] flex flex-col justify-between" style={{ backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)", backgroundSize: "16px 16px" }}>
          
          <div className="text-center my-1">
            <span className="bg-[#FFEECD] text-[#54656F] text-[10px] px-3 py-0.5 rounded shadow-xs inline-block font-medium">
              Notificación automatizada por cierre de inspección
            </span>
          </div>

          {/* Bubble */}
          <div className="bg-white rounded-lg p-3.5 shadow-xs max-w-[95%] my-2 self-start border border-slate-200/60">
            <div className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-sans">
              <div className="text-slate-900 font-bold mb-1 border-b border-slate-100 pb-1">
                INSPECFÁCIL | NOTIFICACIÓN DE HALLAZGO SST
              </div>
              <p><strong>Folio:</strong> {folio}</p>
              <p><strong>Equipo:</strong> {codigo} — {activo}</p>
              <p><strong>Responsable:</strong> {responsable}</p>
              <p><strong>Fecha Límite:</strong> {fechaLimite}</p>
              
              <div className="my-2 p-2 bg-slate-50 rounded border border-slate-200 text-slate-800 text-[11px]">
                <strong>Detalle de la No Conformidad:</strong><br/>
                {hallazgo}
              </div>

              <p className="text-sky-700 font-medium underline flex items-center space-x-1 cursor-pointer">
                <span>https://inspecfacil.demo/reportes/{folio}.pdf</span>
                <ExternalLink className="w-3 h-3 inline ml-1" />
              </p>
            </div>
            
            <div className="flex items-center justify-end space-x-1 mt-1.5 text-[10px] text-slate-400">
              <span>{currentTime}</span>
              <CheckCheck className="w-3.5 h-3.5 text-sky-600" />
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleCopy}
              className="flex-1 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg py-2 px-3 text-xs font-semibold text-slate-700 flex items-center justify-center space-x-1.5 shadow-xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado al portapapeles' : 'Copiar formato de mensaje'}</span>
            </button>
          </div>
        </div>

        {/* Technical Notice Banner */}
        <div className="p-3.5 bg-slate-900 text-slate-300 border-t border-slate-800 text-xs">
          <div className="flex items-center space-x-2 text-sky-400 font-semibold mb-1 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            <span>Especificación Técnica para Producción</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Integración requerida: <em>Meta Cloud API (WhatsApp Business)</em> mediante webhook activado en el evento de no conformidad hacia el teléfono móvil corporativo del responsable técnico.
          </p>
        </div>

      </div>
    </div>
  );
}
