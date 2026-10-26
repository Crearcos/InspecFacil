import React, { useState } from 'react';
import { 
  QrCode, 
  Play, 
  Clock, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Wrench, 
  Search, 
  Calendar, 
  Building2, 
  User, 
  Download, 
  HelpCircle, 
  RotateCcw, 
  MessageSquare, 
  ChevronRight, 
  LayoutDashboard, 
  SlidersHorizontal, 
  Check, 
  ArrowRight,
  FileSpreadsheet,
  LogOut,
  Maximize2,
  X,
  HardHat,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { formatDateTimeDMY } from '../../data/seedData';

export function MobileDashboard({ 
  currentUser, 
  activeCompany, 
  companies = [], 
  onSwitchCompany, 
  users = [], 
  onSwitchUser, 
  activos = [], 
  plantillas = [], 
  inspecciones = [], 
  acciones = [], 
  mantenimientos = [], 
  logs = [], 
  onStartInspection, 
  onResumeDraft, 
  onOpenQrScanner, 
  onViewPdf, 
  onOpenWhatsApp, 
  onUpdateAccion,
  onExportExcel, 
  onOpenDemoGuide, 
  onResetDemo, 
  onLogout 
}) {
  // Mobile active navigation tab: 'inicio' | 'equipos' | 'acciones' | 'gestion'
  const [activeMobileTab, setActiveMobileTab] = useState('inicio');

  // Search & Filters in Equipos
  const [assetSearch, setAssetSearch] = useState('');
  const [assetTypeFilter, setAssetTypeFilter] = useState('todos');

  // Filter in Acciones
  const [actionStatusFilter, setActionStatusFilter] = useState('todos');
  const [actionSearch, setActionSearch] = useState('');

  // Lightbox for evidence photos
  const [previewPhoto, setPreviewPhoto] = useState(null);

  // Draft inspection if any
  const draftInspection = inspecciones.find(i => i.estado === 'borrador');
  const completedInspections = inspecciones.filter(i => i.estado === 'completada');

  // Operational metrics
  const totalCompleted = completedInspections.length;
  const totalConformes = completedInspections.filter(i => i.resultado === 'conforme').length;
  const pctConformidad = totalCompleted > 0 ? Math.round((totalConformes / totalCompleted) * 100) : 100;
  const openAcciones = acciones.filter(a => a.estado === 'abierta');
  const inProgressAcciones = acciones.filter(a => a.estado === 'en_proceso');
  const resolvedAcciones = acciones.filter(a => a.estado === 'resuelta');

  // Asset filtering
  const uniqueAssetTypes = ['todos', ...Array.from(new Set(activos.map(a => a.tipo)))];
  const filteredAssets = activos.filter(a => {
    const matchesSearch = 
      a.codigo.toLowerCase().includes(assetSearch.toLowerCase()) ||
      a.nombre.toLowerCase().includes(assetSearch.toLowerCase()) ||
      a.ubicacion.toLowerCase().includes(assetSearch.toLowerCase());
    const matchesType = assetTypeFilter === 'todos' || a.tipo === assetTypeFilter;
    return matchesSearch && matchesType;
  });

  // Actions filtering
  const filteredActions = acciones.filter(a => {
    const matchesStatus = actionStatusFilter === 'todos' || a.estado === actionStatusFilter;
    const query = actionSearch.toLowerCase();
    const matchesQuery = 
      (a.activo_codigo || '').toLowerCase().includes(query) ||
      (a.activo_nombre || '').toLowerCase().includes(query) ||
      (a.descripcion || '').toLowerCase().includes(query) ||
      (a.responsable_nombre || '').toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24 font-sans text-slate-900 selection:bg-slate-900 selection:text-white antialiased">
      
      {/* ======================================================== */}
      {/* TAB 1: INICIO (CENTRO DE OPERACIONES MÓVIL)             */}
      {/* ======================================================== */}
      {activeMobileTab === 'inicio' && (
        <div className="p-4 space-y-4 max-w-lg mx-auto animate-in fade-in">
          
          {/* GREETING & OPERATIONAL CONTEXT */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                  Turno Activo • {activeCompany.ciudad || 'Ecuador'}
                </span>
              </div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight">
                Hola, {currentUser.nombre.split(' ')[0]} 👋
              </h1>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold text-slate-700 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-2xs font-mono">
                {currentUser.rol}
              </span>
            </div>
          </div>

          {/* TACTILE LAUNCHER: TWO BALANCED CARDS (QR SCANNER & CATALOG) */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Primary Action Card: Escanear QR */}
            <button
              onClick={onOpenQrScanner}
              className="bg-[#0B192C] hover:bg-[#1E3E62] text-white p-4 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between text-left transition-all active:scale-97 cursor-pointer group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                  <QrCode className="w-5 h-5 text-white" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-mono">
                  Cámara
                </span>
              </div>

              <div>
                <span className="text-sm font-black text-white block tracking-tight leading-snug">
                  Escanear QR
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
                  Apunta a la placa del equipo
                </p>
              </div>
            </button>

            {/* Secondary Action Card: Explorar Catálogo */}
            <button
              onClick={() => setActiveMobileTab('equipos')}
              className="bg-white hover:bg-slate-50 text-slate-900 p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between text-left transition-all active:scale-97 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-105 transition-transform">
                  <Wrench className="w-5 h-5 text-slate-700" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  {activos.length} Eq.
                </span>
              </div>

              <div>
                <span className="text-sm font-black text-slate-900 block tracking-tight leading-snug">
                  Ver Equipos
                </span>
                <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">
                  Iniciar checklist manual
                </p>
              </div>
            </button>

          </div>

          {/* ACTIVE DRAFT RESUME BANNER (IF ANY) */}
          {draftInspection && (
            <div className="bg-amber-50/90 border border-amber-200 text-amber-950 rounded-2xl p-3.5 space-y-2.5 shadow-2xs animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center space-x-1.5 text-amber-900">
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="font-bold text-[11px] uppercase tracking-wider">Checklist en Curso</span>
                </span>
                <span className="bg-amber-200/70 text-amber-900 text-[10px] font-bold px-2 py-0.2 rounded-full font-mono">
                  Borrador
                </span>
              </div>

              <div>
                <div className="font-bold text-xs text-slate-900">
                  <span className="font-mono bg-white px-1.5 py-0.2 rounded border border-amber-300 mr-1.5 text-amber-950">
                    {draftInspection.activo_codigo}
                  </span>
                  {draftInspection.activo_nombre}
                </div>
                <div className="text-[11px] text-slate-600 mt-1 flex items-center justify-between">
                  <span>{draftInspection.plantilla_nombre}</span>
                  <span className="font-mono font-semibold">{draftInspection.respuestas?.length || 0} respondidas</span>
                </div>
              </div>

              <button
                onClick={() => onResumeDraft(draftInspection)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer active:scale-98 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Continuar Inspección</span>
              </button>
            </div>
          )}

          {/* BALANCED STATS STRIP */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Equipos</span>
              <span className="font-black text-slate-900 text-base font-mono">{activos.length}</span>
              <span className="text-[9px] text-slate-500 block">en planta</span>
            </div>
            
            <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Conformidad</span>
              <span className="font-black text-emerald-600 text-base font-mono">{pctConformidad}%</span>
              <span className="text-[9px] text-slate-500 block">global SST</span>
            </div>

            <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Hallazgos</span>
              <span className={`font-black text-base font-mono ${openAcciones.length > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                {openAcciones.length}
              </span>
              <span className="text-[9px] text-slate-500 block">por cerrar</span>
            </div>
          </div>

          {/* RECENT INSPECTIONS FEED WITH DIRECT PDF ACTION */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="font-black text-slate-900 uppercase tracking-wider text-[11px]">
                Últimas Auditorías Realizadas
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {completedInspections.length} emitidas
              </span>
            </div>

            <div className="space-y-2">
              {completedInspections.slice(0, 5).map((insp) => {
                const isConforme = insp.resultado === 'conforme';
                return (
                  <div 
                    key={insp.id}
                    className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs flex items-center justify-between text-xs hover:border-slate-300 transition-colors"
                  >
                    <div className="space-y-1 flex-1 min-w-0 pr-3">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-1.5 py-0.2 rounded text-[10px]">
                          {insp.activo_codigo}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.2 rounded-full text-[10px] font-bold border ${
                          isConforme
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1 ${isConforme ? 'bg-emerald-600' : 'bg-rose-600'}`}></span>
                          {isConforme ? 'Conforme' : 'No Conforme'}
                        </span>
                      </div>

                      <p className="text-slate-900 font-bold text-xs truncate">
                        {insp.activo_nombre}
                      </p>

                      <div className="text-[10px] text-slate-400 font-mono flex items-center space-x-2">
                        <span>{insp.codigo_folio || `FOL-${insp.id.slice(-6)}`}</span>
                        <span>•</span>
                        <span>{formatDateTimeDMY(insp.fecha_fin || insp.fecha_inicio)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onViewPdf(insp)}
                      className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all shrink-0 flex items-center space-x-1.5 font-bold text-xs cursor-pointer active:scale-95 shadow-2xs"
                      title="Descargar Certificado Oficial en PDF"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: EQUIPOS (DIRECTORIO INDUSTRIAL)                   */}
      {/* ======================================================== */}
      {activeMobileTab === 'equipos' && (
        <div className="p-4 space-y-3.5 max-w-lg mx-auto animate-in fade-in">
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-slate-900 tracking-tight">
                Equipos Industriales
              </h2>
              <p className="text-xs text-slate-500">
                Selecciona un equipo para iniciar su checklist o escanear su código
              </p>
            </div>
            <button
              onClick={onOpenQrScanner}
              className="p-2 rounded-xl bg-[#0B192C] text-white shadow-xs cursor-pointer active:scale-95"
              title="Escanear QR de activo"
            >
              <QrCode className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input 
              type="text"
              placeholder="Buscar por código (MC-01) o nombre..."
              value={assetSearch}
              onChange={(e) => setAssetSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs font-medium"
            />
            {assetSearch && (
              <button 
                onClick={() => setAssetSearch('')}
                className="absolute right-3.5 top-3 text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category filter pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
            {uniqueAssetTypes.map(t => (
              <button
                key={t}
                onClick={() => setAssetTypeFilter(t)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  assetTypeFilter === t
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {t === 'todos' ? 'Todos los tipos' : t}
              </button>
            ))}
          </div>

          {/* Asset list cards */}
          <div className="space-y-2.5">
            {filteredAssets.map(asset => {
              const isOperativo = asset.estado === 'operativo';
              return (
                <div 
                  key={asset.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg text-xs border border-slate-200">
                        {asset.codigo}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        isOperativo
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isOperativo ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                        {isOperativo ? 'Operativo' : 'En Revisión'}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                      {asset.codigo_qr}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-xs text-slate-900 leading-snug">
                      {asset.nombre}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {asset.ubicacion} • {asset.marca} {asset.modelo}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onStartInspection(asset)}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer active:scale-98 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Iniciar Checklist</span>
                    </button>

                    <button
                      onClick={onOpenQrScanner}
                      className="px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-bold text-xs border border-slate-200 flex items-center space-x-1 cursor-pointer"
                      title="Escanear placa QR"
                    >
                      <QrCode className="w-3.5 h-3.5 text-blue-600" />
                      <span>QR</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: ACCIONES (HALLAZGOS & CAPA EN TERRENO)            */}
      {/* ======================================================== */}
      {activeMobileTab === 'acciones' && (
        <div className="p-4 space-y-3.5 max-w-lg mx-auto animate-in fade-in">
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-slate-900 tracking-tight">
                Acciones Correctivas
              </h2>
              <p className="text-xs text-slate-500">
                Control de no conformidades y resolución de hallazgos
              </p>
            </div>
            <span className="bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold px-2.5 py-0.5 rounded-full font-mono">
              {openAcciones.length} abiertas
            </span>
          </div>

          {/* Segmented status filter pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-0.5">
            <button
              onClick={() => setActionStatusFilter('todos')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                actionStatusFilter === 'todos'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Todas ({acciones.length})
            </button>
            <button
              onClick={() => setActionStatusFilter('abierta')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                actionStatusFilter === 'abierta'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100/70'
              }`}
            >
              🔴 Abiertas ({openAcciones.length})
            </button>
            <button
              onClick={() => setActionStatusFilter('en_proceso')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                actionStatusFilter === 'en_proceso'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100/70'
              }`}
            >
              🟡 En Proceso ({inProgressAcciones.length})
            </button>
            <button
              onClick={() => setActionStatusFilter('resuelta')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                actionStatusFilter === 'resuelta'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100/70'
              }`}
            >
              🟢 Resueltas ({resolvedAcciones.length})
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input 
              type="text"
              placeholder="Buscar por equipo, técnico o hallazgo..."
              value={actionSearch}
              onChange={(e) => setActionSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs font-medium"
            />
            {actionSearch && (
              <button 
                onClick={() => setActionSearch('')}
                className="absolute right-3.5 top-3 text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Cards List */}
          <div className="space-y-3">
            {filteredActions.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-2xs space-y-2">
                <CheckCircle2 className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="font-bold text-xs text-slate-700">Sin hallazgos en este filtro</p>
                <p className="text-[11px] text-slate-400">Todos los equipos están conformes bajo este criterio.</p>
              </div>
            ) : (
              filteredActions.map((acc) => {
                const isAbierta = acc.estado === 'abierta';
                const isEnProceso = acc.estado === 'en_proceso';
                const isResuelta = acc.estado === 'resuelta';
                const isCritica = acc.severidad === 'critica' || (acc.prioridad || '').toLowerCase() === 'critica';

                return (
                  <div 
                    key={acc.id}
                    className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3"
                  >
                    {/* Header: Asset Code, Severity, Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-xs border border-slate-200">
                          {acc.activo_codigo}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isCritica
                            ? 'bg-rose-50 text-rose-800 border-rose-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}>
                          {isCritica ? 'Crítica' : 'Alta'}
                        </span>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isAbierta
                          ? 'bg-rose-100 text-rose-800'
                          : isEnProceso
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isAbierta ? 'Abierta' : isEnProceso ? 'En Proceso' : 'Resuelta'}
                      </span>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="font-bold text-xs text-slate-900 leading-snug">
                        {acc.descripcion}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Folio: {acc.inspeccion_folio || 'INSP-2026-0842'}
                      </p>
                    </div>

                    {/* Photo evidence thumbnail with lightbox trigger */}
                    {acc.foto_evidencia && (
                      <div 
                        onClick={() => setPreviewPhoto({
                          url: acc.foto_evidencia,
                          title: acc.descripcion,
                          folio: acc.inspeccion_folio,
                          activo: `${acc.activo_codigo} — ${acc.activo_nombre}`
                        })}
                        className="rounded-xl overflow-hidden border border-slate-200 bg-slate-950 relative h-32 cursor-pointer group"
                      >
                        <img 
                          src={acc.foto_evidencia} 
                          alt="Evidencia fotográfica" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[9px] font-mono px-2 py-0.5 rounded backdrop-blur-xs flex items-center space-x-1">
                          <Maximize2 className="w-3 h-3" />
                          <span>Tocar para ampliar foto</span>
                        </div>
                      </div>
                    )}

                    {/* Assignee & Due date */}
                    <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between font-mono">
                      <span>Resp: <strong className="text-slate-900 font-sans">{acc.responsable_nombre}</strong></span>
                      <span>Plazo: <strong className="text-slate-900">{acc.fecha_limite}</strong></span>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-1 flex items-center space-x-2">
                      
                      {/* State transition trigger */}
                      {isAbierta && onUpdateAccion && (
                        <button
                          type="button"
                          onClick={() => onUpdateAccion(acc.id, { estado: 'en_proceso' })}
                          className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                        >
                          <span>Iniciar Reparación</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}

                      {isEnProceso && onUpdateAccion && (
                        <button
                          type="button"
                          onClick={() => onUpdateAccion(acc.id, { estado: 'resuelta' })}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Marcar Resuelta</span>
                        </button>
                      )}

                      {isResuelta && onUpdateAccion && (
                        <button
                          type="button"
                          onClick={() => onUpdateAccion(acc.id, { estado: 'abierta' })}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                        >
                          <span>Reabrir Hallazgo</span>
                        </button>
                      )}

                      {/* WhatsApp trigger */}
                      {onOpenWhatsApp && (
                        <button
                          onClick={() => onOpenWhatsApp(acc)}
                          className="bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer active:scale-95 shadow-2xs"
                          title="Notificar por WhatsApp al responsable"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </button>
                      )}

                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: GESTIÓN (SUPERVISIÓN, REPORTES & AJUSTES)         */}
      {/* ======================================================== */}
      {activeMobileTab === 'gestion' && (
        <div className="p-4 space-y-4 max-w-lg mx-auto animate-in fade-in">
          
          <div>
            <h2 className="text-base font-black text-slate-900 tracking-tight">
              Gestión & Supervisión
            </h2>
            <p className="text-xs text-slate-500">
              Reportes ejecutivos, configuración multi-empresa y herramientas demo
            </p>
          </div>

          {/* Active Organization & ISO Profile */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs font-mono">
                {activeCompany.nombre.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-900 leading-snug">
                  {activeCompany.nombre}
                </h3>
                <p className="text-[10px] text-slate-500 font-mono">
                  RUC: {activeCompany.ruc} • {activeCompany.ciudad}
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Certificación ISO 45001:2018
              </span>
              <span className="text-slate-400 font-mono">Tenant Aislado</span>
            </div>
          </div>

          {/* Report Export Buttons */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2.5">
            <span className="font-black text-xs text-slate-900 uppercase tracking-wider block">
              Exportación de Auditorías
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onExportExcel}
                className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 p-3 rounded-xl font-bold text-xs flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <span>Exportar Excel</span>
                <span className="text-[9px] text-emerald-700 font-mono">.xlsx mensual</span>
              </button>

              <button
                onClick={() => {
                  const demoInsp = inspecciones[0];
                  if (demoInsp) onViewPdf(demoInsp);
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-xl font-bold text-xs flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer"
              >
                <FileText className="w-5 h-5 text-blue-400" />
                <span>Certificado PDF</span>
                <span className="text-[9px] text-slate-300 font-mono">Descarga directa</span>
              </button>
            </div>
          </div>

          {/* Multi-Tenant Company Switcher */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-black text-xs text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>Cambiar Organización (RUC)</span>
              </span>
            </div>

            <div className="space-y-1.5">
              {companies.map(c => {
                const isSelected = c.id === activeCompany.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => onSwitchCompany(c.id)}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between text-xs transition-colors cursor-pointer ${
                      isSelected 
                        ? 'bg-blue-50 border border-blue-300 text-blue-900 font-bold' 
                        : 'bg-slate-50 border border-slate-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <div>{c.nombre}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{c.ciudad} • RUC {c.ruc}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Role Switcher Demo */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2.5">
            <span className="font-black text-xs text-slate-900 uppercase tracking-wider block">
              Cambiar de Perfil Demo
            </span>

            <div className="space-y-1.5">
              {users.map(u => {
                const isSelected = u.id === currentUser.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => onSwitchUser(u.id)}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between text-xs transition-colors cursor-pointer ${
                      isSelected 
                        ? 'bg-blue-50 border border-blue-300 text-blue-900 font-bold' 
                        : 'bg-slate-50 border border-slate-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <div>{u.nombre}</div>
                      <div className="text-[10px] text-slate-500">{u.rol} • {u.cargo}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Demo & Session Controls */}
          <div className="space-y-2 pt-1">
            <button
              onClick={onOpenDemoGuide}
              className="w-full bg-slate-900 text-white p-3 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-blue-400" />
              <span>Abrir Guía de Demostración (5 min)</span>
            </button>

            {currentUser.rol === 'Administrador' && (
              <button
                onClick={onResetDemo}
                className="w-full bg-rose-50 border border-rose-200 text-rose-700 p-2.5 rounded-2xl text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer Datos Demo</span>
              </button>
            )}

            <button
              onClick={onLogout}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 p-2.5 rounded-2xl text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* BALANCED NATIVE BOTTOM NAVIGATION BAR (APPLE / HIG)     */}
      {/* ======================================================== */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-4 shadow-lg flex items-center justify-around select-none">
        
        {/* TAB 1: Inicio */}
        <button
          onClick={() => setActiveMobileTab('inicio')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeMobileTab === 'inicio' ? 'text-slate-900 font-black' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <LayoutDashboard className={`w-5 h-5 ${activeMobileTab === 'inicio' ? 'text-slate-900 stroke-[2.5]' : 'text-slate-400'}`} />
          <span className="text-[10px] mt-0.5">Inicio</span>
          {activeMobileTab === 'inicio' && <span className="w-1 h-1 rounded-full bg-slate-900 mt-0.5"></span>}
        </button>

        {/* TAB 2: Equipos */}
        <button
          onClick={() => setActiveMobileTab('equipos')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer relative ${
            activeMobileTab === 'equipos' ? 'text-slate-900 font-black' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <Wrench className={`w-5 h-5 ${activeMobileTab === 'equipos' ? 'text-slate-900 stroke-[2.5]' : 'text-slate-400'}`} />
          <span className="text-[10px] mt-0.5">Equipos</span>
          {activeMobileTab === 'equipos' && <span className="w-1 h-1 rounded-full bg-slate-900 mt-0.5"></span>}
        </button>

        {/* TAB 3: Acciones Correctivas */}
        <button
          onClick={() => setActiveMobileTab('acciones')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer relative ${
            activeMobileTab === 'acciones' ? 'text-slate-900 font-black' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <div className="relative">
            <ShieldAlert className={`w-5 h-5 ${activeMobileTab === 'acciones' ? 'text-slate-900 stroke-[2.5]' : 'text-slate-400'}`} />
            {openAcciones.length > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {openAcciones.length}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Acciones</span>
          {activeMobileTab === 'acciones' && <span className="w-1 h-1 rounded-full bg-slate-900 mt-0.5"></span>}
        </button>

        {/* TAB 4: Gestión */}
        <button
          onClick={() => setActiveMobileTab('gestion')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeMobileTab === 'gestion' ? 'text-slate-900 font-black' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <SlidersHorizontal className={`w-5 h-5 ${activeMobileTab === 'gestion' ? 'text-slate-900 stroke-[2.5]' : 'text-slate-400'}`} />
          <span className="text-[10px] mt-0.5">Gestión</span>
          {activeMobileTab === 'gestion' && <span className="w-1 h-1 rounded-full bg-slate-900 mt-0.5"></span>}
        </button>

      </nav>

      {/* LIGHTBOX MODAL FOR EVIDENCE PHOTO ZOOM IN MOBILE */}
      {previewPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xs animate-in fade-in"
          onClick={() => setPreviewPhoto(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-900 px-4 py-3 text-white flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">Evidencia Fotográfica</h4>
                <p className="text-[10px] text-slate-400 font-mono">{previewPhoto.activo}</p>
              </div>
              <button
                onClick={() => setPreviewPhoto(null)}
                className="p-1 rounded-md text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-950 flex items-center justify-center max-h-[60vh]">
              <img 
                src={previewPhoto.url} 
                alt="Evidencia" 
                className="max-h-[50vh] w-auto object-contain rounded"
              />
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-700 font-medium">
              {previewPhoto.title}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
