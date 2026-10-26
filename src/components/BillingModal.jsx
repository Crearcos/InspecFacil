import React, { useState } from 'react';
import { CreditCard, Check, X, ShieldCheck, Building2, Download, AlertCircle } from 'lucide-react';

export function BillingModal({ isOpen, onClose, activeCompany }) {
  if (!isOpen) return null;

  const [simulatedSuccess, setSimulatedSuccess] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-200 text-xs">
        
        {/* Header in Crisp White */}
        <div className="bg-white px-6 py-4.5 border-b border-slate-200 text-slate-900 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <CreditCard className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Suscripción & Pasarela B2B (USD)</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {/* Active Plan Card */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded uppercase tracking-wider">
                Plan Activo
              </span>
              <h4 className="font-bold text-sm text-slate-900 mt-1">
                Plan Planta Industrial & SST
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {activeCompany.nombre} • RUC {activeCompany.ruc}
              </p>
              <ul className="mt-2 space-y-1 text-slate-600 text-[11px]">
                <li>• Hasta 50 activos monitoreados</li>
                <li>• Generación ilimitada de Certificados PDF</li>
                <li>• Notificaciones automáticas de hallazgos</li>
              </ul>
            </div>

            <div className="text-right">
              <span className="text-2xl font-bold text-slate-900">$149.00</span>
              <span className="text-slate-500 text-[11px] block font-medium">USD / mes</span>
            </div>
          </div>

          {/* Payment Method Details */}
          <div className="border border-slate-200 rounded-lg p-3.5 space-y-2">
            <div className="flex justify-between items-center text-slate-700 font-semibold">
              <span>Método de Pago Registrado</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                Activo
              </span>
            </div>
            <div className="flex items-center space-x-3 text-slate-600">
              <div className="w-8 h-6 bg-slate-800 text-white rounded flex items-center justify-center font-bold text-[10px]">
                VISA
              </div>
              <span>•••• •••• •••• 4242 (Vence 09/2028)</span>
            </div>
          </div>

          {/* Simulated Charge Button */}
          <div>
            <button
              onClick={() => setSimulatedSuccess(true)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center justify-center space-x-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Simular Cobro Mensual ($149.00 USD)</span>
            </button>
            {simulatedSuccess && (
              <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Simulación de cobro autorizada exitosamente. Factura emitida en USD.</span>
              </div>
            )}
          </div>

          {/* Technical Notice Banner (Requisito: Qué servicio real haría falta) */}
          <div className="p-3.5 bg-slate-900 rounded-lg text-slate-300 space-y-1">
            <div className="text-sky-400 font-semibold flex items-center gap-1.5 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Integración Externa Requerida en Producción</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              <strong>Pasarela recomendada:</strong> <em>Stripe Billing</em> o <em>Kushki / Payphone</em> para cobros recurrentes con tarjeta de crédito en Ecuador en moneda USD ($), conectado vía webhook al sistema de facturación electrónica con firma digital del SRI.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
