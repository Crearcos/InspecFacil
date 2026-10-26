import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  ChevronDown, 
  RotateCcw, 
  HelpCircle, 
  ShieldCheck, 
  User, 
  Check, 
  LogOut, 
  Sparkles 
} from 'lucide-react';

export function Navbar({ 
  activeCompany, 
  companies, 
  onSwitchCompany, 
  activeUser, 
  users, 
  onSwitchUser, 
  onResetDemo, 
  onOpenDemoGuide, 
  onLogout 
}) {
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const companyMenuRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (companyMenuRef.current && !companyMenuRef.current.contains(e.target)) {
        setShowCompanyMenu(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAdmin = activeUser?.rol === 'Administrador';
  const isInspector = activeUser?.rol === 'Inspector';

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 text-slate-800 sticky top-0 z-40 shadow-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* LEFT: Unified Brand & Multi-Tenant Workspace (Linear/Vercel Style) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Brand Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 font-bold shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 leading-tight">
                  Inspec<span className="text-blue-600">Fácil</span>
                </span>
                <span className="text-[9px] font-semibold text-slate-400 font-mono tracking-wider hidden sm:block">
                  SST INDUSTRIAL
                </span>
              </div>
            </div>

            <span className="text-slate-300 font-light text-lg hidden sm:inline">/</span>

            {/* Enterprise Workspace Dropdown Pill */}
            <div className="relative" ref={companyMenuRef}>
              <button
                onClick={() => {
                  setShowCompanyMenu(!showCompanyMenu);
                  setShowUserMenu(false);
                }}
                className="flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100/90 border border-slate-200/80 transition-all text-xs font-bold text-slate-800 cursor-pointer shadow-xs group"
                title="Cambiar organización (Multi-Tenant)"
              >
                <div className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-extrabold font-mono shrink-0">
                  {activeCompany.nombre.charAt(0)}
                </div>
                <span className="hidden sm:inline max-w-[130px] sm:max-w-[190px] truncate text-slate-900 group-hover:text-blue-600 transition-colors">
                  {activeCompany.nombre.replace(' S.A.', '').replace(' Cía. Ltda.', '')}
                </span>
                <span className="sm:hidden text-[11px] font-bold text-slate-700 max-w-[65px] truncate">
                  {activeCompany.nombre.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
              </button>

              {/* Workspace Popover */}
              {showCompanyMenu && (
                <div className="absolute left-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200 p-2 z-50 text-xs animate-in fade-in slide-in-from-top-1">
                  <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                    <span>Organización Corporativa</span>
                    <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-mono font-semibold border border-emerald-200">
                      Multi-Tenant
                    </span>
                  </div>

                  <div className="space-y-1 mt-1.5">
                    {companies.map(c => {
                      const isSelected = c.id === activeCompany.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => {
                            onSwitchCompany(c.id);
                            setShowCompanyMenu(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl flex items-start space-x-3 transition-colors cursor-pointer ${
                            isSelected 
                              ? 'bg-blue-50/80 border border-blue-200 text-blue-900' 
                              : 'hover:bg-slate-50 border border-transparent text-slate-700'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {c.nombre.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-slate-900 truncate text-xs">{c.nombre}</div>
                            <div className="text-[11px] text-slate-500 font-medium">{c.ciudad} • RUC {c.ruc}</div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0 mt-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT: Quick Guide & Executive User Profile Flyout */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            
            {/* Guía Rápida de Demostración (5 min) */}
            <button
              onClick={onOpenDemoGuide}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
              title="Guía ejecutiva de demostración (5 minutos)"
            >
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span className="hidden lg:inline">Guía 5 min</span>
            </button>

            {/* Profile Menu Trigger Pill */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowCompanyMenu(false);
                }}
                className="flex items-center space-x-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer shadow-xs group"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold flex items-center justify-center text-xs font-mono shadow-xs">
                  {activeUser.nombre.charAt(0)}
                </div>
                <div className="text-left hidden md:block">
                  <div className="font-extrabold text-slate-900 leading-tight text-xs truncate max-w-[130px] group-hover:text-blue-600 transition-colors">
                    {activeUser.nombre}
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold leading-none mt-0.5">
                    {activeUser.rol}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </button>

              {/* Executive User Popover Card */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200 p-3 z-50 text-xs animate-in fade-in slide-in-from-top-1">
                  
                  {/* User Profile Card */}
                  <div className="p-3 bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-xl border border-slate-200/80 mb-2.5">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm shadow-xs font-mono">
                        {activeUser.nombre.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-extrabold text-slate-900 text-sm truncate">{activeUser.nombre}</div>
                        <div className="text-[11px] text-slate-500 font-medium truncate">{activeUser.correo}</div>
                        <div className="inline-flex items-center px-2 py-0.2 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 mt-1">
                          {activeUser.rol} • {activeUser.cargo}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 1-Click Role Switcher Options */}
                  <div className="space-y-1">
                    <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Cambiar de Perfil Demo</span>
                      <span className="text-[9px] text-slate-500 font-mono">Sin contraseña</span>
                    </div>

                    {users.map(u => {
                      const isSelected = u.id === activeUser.id;
                      return (
                        <button
                          key={u.id}
                          onClick={() => {
                            onSwitchUser(u.id);
                            setShowUserMenu(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 font-bold text-blue-900 border border-blue-200/70'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="truncate">
                            <div className="text-slate-900 text-xs font-bold">{u.nombre}</div>
                            <div className="text-[10px] text-slate-500 font-medium">{u.rol} • {u.cargo}</div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Admin Tools: Reset Demo */}
                  {isAdmin && (
                    <div className="mt-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onResetDemo();
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-rose-700 hover:bg-rose-50 rounded-xl font-bold flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="flex items-center space-x-2">
                          <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                          <span>Restablecer Datos Demo</span>
                        </span>
                        <span className="text-[10px] font-mono text-rose-500">Reset</span>
                      </button>
                    </div>
                  )}

                  {/* Logout / Exit to Access Screen */}
                  {onLogout && (
                    <div className="mt-1 pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onLogout();
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl font-bold flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="flex items-center space-x-2">
                          <LogOut className="w-3.5 h-3.5 text-slate-500" />
                          <span>Pantalla de Acceso (Roles)</span>
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Salir</span>
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
