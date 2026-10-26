import React from 'react';
import { ShieldCheck, ShieldAlert, Wrench, User, Building2, CheckCircle, ArrowRight, X } from 'lucide-react';

export function LoginModal({ isOpen, onClose, onSelectUser, users, activeCompany, companies, onSelectCompany }) {
  if (!isOpen) return null;

  const admin = users.find(u => u.rol === 'Administrador') || users[0];
  const supervisor = users.find(u => u.rol === 'Supervisor') || users[1];
  const inspector = users.find(u => u.rol === 'Inspector') || users[2];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-slate-200">
        
        {/* Header in Crisp White */}
        <div className="bg-white px-6 py-4.5 border-b border-slate-200 text-slate-900 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold tracking-tight text-slate-900">Seleccionar Perfil de Usuario</h2>
              <p className="text-xs text-slate-500 font-medium">Cambia de rol sin necesidad de contraseñas</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Company context */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-700">
            <Building2 className="w-4 h-4 text-slate-500" />
            <span className="font-semibold text-slate-800">Organización:</span>
          </div>
          <select
            value={activeCompany.id}
            onChange={(e) => onSelectCompany(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded px-2 py-1 text-slate-700 font-medium focus:ring-1 focus:ring-sky-500 focus:outline-none"
          >
            {companies.map(c => (
              <option key={c.id} value={c.id}>{c.ciudad} — {c.nombre.slice(0, 24)}...</option>
            ))}
          </select>
        </div>

        {/* Profiles */}
        <div className="p-5 space-y-2.5">
          
          {/* Supervisor */}
          <button
            onClick={() => {
              if (supervisor) onSelectUser(supervisor.id);
              onClose();
            }}
            className="w-full text-left p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                {supervisor?.nombre?.charAt(0) || 'S'}
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-xs">
                  {supervisor?.nombre}
                </div>
                <div className="text-[11px] text-slate-500">{supervisor?.rol} • {supervisor?.cargo}</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Inspector */}
          <button
            onClick={() => {
              if (inspector) onSelectUser(inspector.id);
              onClose();
            }}
            className="w-full text-left p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-md bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs border border-slate-200">
                {inspector?.nombre?.charAt(0) || 'I'}
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-xs">
                  {inspector?.nombre}
                </div>
                <div className="text-[11px] text-slate-500">{inspector?.rol} • {inspector?.cargo}</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Administrador */}
          <button
            onClick={() => {
              if (admin) onSelectUser(admin.id);
              onClose();
            }}
            className="w-full text-left p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-md bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                {admin?.nombre?.charAt(0) || 'A'}
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-xs">
                  {admin?.nombre}
                </div>
                <div className="text-[11px] text-slate-500">{admin?.rol} • {admin?.cargo}</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

        </div>

        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
