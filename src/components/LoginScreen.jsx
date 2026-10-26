import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  HardHat, 
  Monitor, 
  UserCheck, 
  ChevronDown,
  User,
  ShieldCheck,
  CheckCircle2,
  Users,
  Search,
  KeyRound,
  Sparkles
} from 'lucide-react';

export function LoginScreen({ 
  companies = [], 
  activeCompany, 
  onSelectCompany, 
  users = [], 
  onSelectRole 
}) {
  const [selectedCompId, setSelectedCompId] = useState(activeCompany?.id || 'emp-1');
  const [roleFilter, setRoleFilter] = useState('todos'); // 'todos' | 'inspector' | 'supervisor' | 'admin'
  const [searchUser, setSearchUser] = useState('');
  const [showManualForm, setShowManualForm] = useState(false);
  const [loadingUserId, setLoadingUserId] = useState(null);

  // Manual credentials state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sync activeCompany if prop updates
  useEffect(() => {
    if (activeCompany?.id) {
      setSelectedCompId(activeCompany.id);
    }
  }, [activeCompany?.id]);

  // Get users for the selected organization
  const matchingUsers = users.filter(u => u.empresa_id === selectedCompId);
  const currentUsers = matchingUsers.length > 0 ? matchingUsers : users;
  const currentCompany = companies.find(c => c.id === selectedCompId) || activeCompany || companies[0];

  const handleCompanyChange = (e) => {
    const cid = e.target.value;
    setSelectedCompId(cid);
    if (onSelectCompany) {
      onSelectCompany(cid);
    }
  };

  const handleSelectSession = (userId) => {
    setLoadingUserId(userId);
    setTimeout(() => {
      onSelectRole(userId);
    }, 280);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    const userToLogin = currentUsers.find(u => u.correo.toLowerCase() === email.toLowerCase()) || currentUsers[0];
    if (userToLogin) {
      handleSelectSession(userToLogin.id);
    }
  };

  // Filtered sessions list
  const filteredSessions = currentUsers.filter(u => {
    const matchesRole = 
      roleFilter === 'todos' ||
      (roleFilter === 'inspector' && u.rol === 'Inspector') ||
      (roleFilter === 'supervisor' && u.rol === 'Supervisor') ||
      (roleFilter === 'admin' && u.rol === 'Administrador');

    const query = searchUser.toLowerCase();
    const matchesQuery = 
      u.nombre.toLowerCase().includes(query) ||
      u.correo.toLowerCase().includes(query) ||
      (u.cargo || '').toLowerCase().includes(query);

    return matchesRole && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* 2-COLUMN SPLIT */}
      <div className="min-h-screen flex flex-col lg:flex-row w-full">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: BRAND TITLE CENTERED ONLY                    */}
        {/* EXACTLY AS REQUESTED BY USER                              */}
        {/* ======================================================== */}
        <div className="w-full lg:w-1/2 bg-slate-950 text-white p-8 sm:p-12 lg:p-16 flex flex-col items-center justify-center text-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800 select-none">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              Inspec<span className="text-blue-500">Fácil</span>
            </h1>
            <p className="text-xs sm:text-sm font-bold text-slate-400 font-mono tracking-widest uppercase">
              SST INDUSTRIAL • ECUADOR
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: EXECUTIVE SESSION SELECTOR PORTAL          */}
        {/* ======================================================== */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col justify-between p-6 sm:p-10 lg:p-14">
          
          <div className="w-full max-w-lg mx-auto space-y-6 my-auto">
            
            {/* Header Title */}
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono">
                  Control de Acceso Seguro
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {showManualForm ? 'Ingreso con Credenciales' : 'Seleccionar Sesión de Usuario'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {showManualForm 
                  ? 'Ingrese su correo corporativo y contraseña para autenticarse.'
                  : 'Seleccione su perfil de sesión activo para ingresar directamente al sistema.'}
              </p>
            </div>

            {/* Organization / Tenant Dropdown Selector */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <span className="flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Organización Corporativa (Multi-Tenant)</span>
                </span>
              </label>

              <div className="relative">
                <select
                  value={selectedCompId}
                  onChange={handleCompanyChange}
                  className="w-full text-xs font-bold py-3 pl-3.5 pr-10 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:bg-white focus:outline-none transition-all cursor-pointer appearance-none shadow-2xs"
                >
                  {companies.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.nombre} ({c.ciudad}) — RUC {c.ruc}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* ======================================================== */}
            {/* MODE A: HIGH-END SESSION LIST (LISTA DE SESIONES)        */}
            {/* ======================================================== */}
            {!showManualForm ? (
              <div className="space-y-3.5 animate-in fade-in">
                
                {/* Session Dropdown Quick Switcher (Menú Desplegable Directo) */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    <span className="flex items-center space-x-1.5">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      <span>Desplegable Rápido de Sesiones</span>
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      onChange={(e) => {
                        if (e.target.value) handleSelectSession(e.target.value);
                      }}
                      defaultValue=""
                      className="w-full text-xs font-semibold py-2.5 pl-3.5 pr-10 bg-white border border-slate-300 rounded-xl text-slate-700 hover:border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all cursor-pointer appearance-none shadow-2xs"
                    >
                      <option value="" disabled>Seleccione una sesión de la lista para entrar...</option>
                      {currentUsers.map(u => (
                        <option key={u.id} value={u.id}>
                          {u.nombre} ({u.rol} — {u.cargo})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* Role Filter Chips */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-1.5 overflow-x-auto pb-0.5">
                    {[
                      { id: 'todos', label: 'Todos' },
                      { id: 'inspector', label: 'Inspectores' },
                      { id: 'supervisor', label: 'Supervisión' },
                      { id: 'admin', label: 'Admin' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setRoleFilter(tab.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          roleFilter === tab.id
                            ? 'bg-slate-900 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 font-semibold shrink-0">
                    {filteredSessions.length} {filteredSessions.length === 1 ? 'sesión' : 'sesiones'}
                  </span>
                </div>

                {/* The Session List Cards (Lista Ergonómica y Limpia de Sesiones) */}
                <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                  {filteredSessions.map((u) => {
                    const isAdmin = u.rol === 'Administrador';
                    const isSupervisor = u.rol === 'Supervisor';
                    const isInspector = u.rol === 'Inspector';
                    const isLoading = loadingUserId === u.id;

                    const roleBadgeColor = isAdmin
                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                      : isSupervisor
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200';

                    const avatarColor = isAdmin
                      ? 'bg-purple-600 text-white'
                      : isSupervisor
                      ? 'bg-blue-600 text-white'
                      : 'bg-emerald-600 text-white';

                    return (
                      <button
                        key={u.id}
                        type="button"
                        disabled={loadingUserId !== null}
                        onClick={() => handleSelectSession(u.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer group flex items-center justify-between active:scale-98 shadow-2xs ${
                          isLoading 
                            ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-500/20'
                            : 'border-slate-200/90 hover:border-slate-400 hover:bg-slate-50 bg-white'
                        }`}
                      >
                        <div className="flex items-center space-x-3.5 min-w-0 pr-2">
                          
                          {/* User Avatar with Initials */}
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs font-mono ${avatarColor}`}>
                            {u.nombre.charAt(0)}
                          </div>

                          {/* Info */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                {u.nombre}
                              </span>
                              <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border shrink-0 ${roleBadgeColor}`}>
                                {u.rol}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-500 truncate mt-0.5">
                              {u.cargo || 'Personal Técnico'} • <span className="font-mono text-[10px] text-slate-400">{u.correo}</span>
                            </p>
                          </div>
                        </div>

                        {/* Enter Trigger */}
                        <div className="flex items-center space-x-1.5 shrink-0 pl-2">
                          {isLoading ? (
                            <span className="text-[11px] font-bold text-blue-600 animate-pulse font-mono">
                              Entrando...
                            </span>
                          ) : (
                            <div className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-slate-900 text-slate-400 group-hover:text-white flex items-center justify-center transition-all">
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          )}
                        </div>

                      </button>
                    );
                  })}
                </div>

                {/* Footer Switcher to Manual Password */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      const firstUser = currentUsers[0];
                      if (firstUser) setEmail(firstUser.correo);
                      setShowManualForm(true);
                    }}
                    className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors inline-flex items-center space-x-1.5 cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>¿Desea ingresar con correo y contraseña manual?</span>
                  </button>
                </div>

              </div>
            ) : (
              /* ======================================================== */
              /* MODE B: MANUAL CREDENTIALS FORM                          */
              /* ======================================================== */
              <form onSubmit={handleManualSubmit} className="space-y-4 animate-in fade-in">
                
                {/* Email Input */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Correo electrónico corporativo
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="nombre@empresa.com"
                      className="w-full text-xs font-semibold py-3 pl-10 pr-3.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full text-xs font-semibold py-3 pl-10 pr-10 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember device checkbox */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-slate-600 font-medium">Recordar este terminal</span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-blue-600/20 active:scale-98 transition-all cursor-pointer"
                >
                  <span>Iniciar Sesión en InspecFácil</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Return to session list */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setShowManualForm(false)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                  >
                    ← Volver a la lista de sesiones
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Corporate Footer Legal */}
          <div className="w-full max-w-lg mx-auto pt-6 border-t border-slate-100 text-center text-[11px] text-slate-400 font-medium">
            <span>© 2026 InspecFácil Suite • Plataforma Técnica SST Ecuador</span>
          </div>

        </div>

      </div>

    </div>
  );
}
