import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Wrench, 
  FileSpreadsheet, 
  ClipboardCheck, 
  ShieldAlert, 
  Calendar, 
  FileText,
  ChevronRight,
  Shield,
  Layers,
  History,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { DashboardKPIs } from './DashboardKPIs';
import { AssetManagement } from './AssetManagement';
import { TemplateBuilder } from './TemplateBuilder';
import { InspectionList } from './InspectionList';
import { CorrectiveActionsList } from './CorrectiveActionsList';
import { PreventiveCalendar } from './PreventiveCalendar';
import { ReportsExport } from './ReportsExport';

export function SupervisorDesktop({ 
  activeTab = 'tablero',
  onTabChange,
  activeCompany,
  currentUser,
  activos,
  plantillas,
  inspecciones,
  acciones,
  mantenimientos,
  logs,
  onStartInspection,
  onOpenQrScanner,
  onSaveActivo,
  onDeleteActivo,
  onToggleActivoEstado,
  onSavePlantilla,
  onDeletePlantilla,
  onTogglePlantillaEstado,
  onUpdateAccion,
  onUpdateMantenimiento,
  onViewPdf,
  onOpenWhatsApp,
  onOpenBilling,
  onExportExcel,
  onExportPdfSummary
}) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabClick = (tabId) => {
    setCurrentTab(tabId);
    if (onTabChange) onTabChange(tabId);
  };

  const openAccionesCount = acciones.filter(a => a.estado === 'abierta').length;
  const alertMantenimientosCount = mantenimientos.filter(m => m.alerta === 'vencido' || m.alerta === 'proximo_a_vencer').length;

  const navGroups = [
    {
      group: 'Operaciones de Campo',
      items: [
        { id: 'tablero', label: 'Panel General', icon: LayoutDashboard },
        { id: 'activos', label: 'Activos y Equipos', count: activos.length, icon: Wrench },
        { id: 'inspecciones', label: 'Registro de Inspecciones', count: inspecciones.length, icon: ClipboardCheck },
      ]
    },
    {
      group: 'Seguridad & Mantenimiento',
      items: [
        { 
          id: 'acciones', 
          label: 'Acciones Correctivas', 
          icon: ShieldAlert,
          badge: openAccionesCount > 0 ? openAccionesCount : null,
          badgeType: 'danger'
        },
        { 
          id: 'calendario', 
          label: 'Programa Preventivo', 
          icon: Calendar,
          badge: alertMantenimientosCount > 0 ? alertMantenimientosCount : null,
          badgeType: 'warning'
        },
      ]
    },
    {
      group: 'Auditoría & Parámetros',
      items: [
        { id: 'plantillas', label: 'Plantillas Checklist', count: plantillas.length, icon: FileSpreadsheet },
        { id: 'reportes', label: 'Informes y Auditoría', icon: FileText }
      ]
    }
  ];

  // Map tab name to breadcrumb label
  const tabNames = {
    tablero: 'Panel General',
    activos: 'Activos y Equipos',
    plantillas: 'Plantillas de Checklist',
    inspecciones: 'Registro de Inspecciones',
    acciones: 'Acciones Correctivas',
    calendario: 'Mantenimiento Preventivo',
    reportes: 'Informes y Auditoría'
  };

  const allTabs = [
    { id: 'tablero', label: 'Panel', icon: LayoutDashboard },
    { id: 'activos', label: 'Activos', count: activos.length, icon: Wrench },
    { id: 'inspecciones', label: 'Inspecciones', count: inspecciones.length, icon: ClipboardCheck },
    { id: 'acciones', label: 'Acciones', badge: openAccionesCount > 0 ? openAccionesCount : null, badgeType: 'danger', icon: ShieldAlert },
    { id: 'calendario', label: 'Preventivo', badge: alertMantenimientosCount > 0 ? alertMantenimientosCount : null, badgeType: 'warning', icon: Calendar },
    { id: 'plantillas', label: 'Plantillas', count: plantillas.length, icon: FileSpreadsheet },
    { id: 'reportes', label: 'Informes', icon: FileText }
  ];

  return (
    <div className="flex-1 flex bg-slate-50/70 min-h-[calc(100vh-3.5rem)] font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200/90 hidden md:flex flex-col justify-between shrink-0 select-none">
        <div className="p-4 space-y-6">
          
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {group.group}
              </div>

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-slate-100 text-slate-900 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge !== undefined && item.badge !== null ? (
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-tight shrink-0 ${
                        item.badgeType === 'danger'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.badge}
                      </span>
                    ) : item.count !== undefined ? (
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">
                        {item.count}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ))}

        </div>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-slate-200/80">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center space-x-2 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
              <span className="font-medium text-slate-700 truncate">{activeCompany.ciudad}, EC</span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">RUC {activeCompany.ruc}</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Breadcrumb Header */}
        <div className="bg-white border-b border-slate-200/90 px-6 py-2.5 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-slate-600">{activeCompany.nombre.replace(' S.A.', '').replace(' Cía. Ltda.', '')}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="font-semibold text-slate-900">{tabNames[currentTab] || 'Panel'}</span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] text-slate-500 font-medium">
            <span className="text-slate-600 font-mono">14/10/2026</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>En línea</span>
            </span>
          </div>
        </div>

        {/* Mobile Tab Scroll Strip (Visible on mobile/tablet screens when desktop sidebar is hidden) */}
        <div className="md:hidden bg-white border-b border-slate-200/90 px-3 py-2.5 overflow-x-auto flex items-center space-x-2 shrink-0">
          {allTabs.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge ? (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {item.badge}
                  </span>
                ) : item.count !== undefined ? (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'text-slate-400'
                  }`}>
                    {item.count}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {currentTab === 'tablero' && (
            <DashboardKPIs 
              inspecciones={inspecciones}
              acciones={acciones}
              mantenimientos={mantenimientos}
              activos={activos}
              plantillas={plantillas}
              onNavigateTab={handleTabClick}
              onOpenQrScanner={onOpenQrScanner}
            />
          )}

          {currentTab === 'activos' && (
            <AssetManagement
              activos={activos}
              plantillas={plantillas}
              inspecciones={inspecciones}
              onSaveActivo={onSaveActivo}
              onDeleteActivo={onDeleteActivo}
              onToggleActivoEstado={onToggleActivoEstado}
              onViewPdf={onViewPdf}
              onStartInspection={onStartInspection}
            />
          )}

          {currentTab === 'plantillas' && (
            <TemplateBuilder
              plantillas={plantillas}
              onSavePlantilla={onSavePlantilla}
              onDeletePlantilla={onDeletePlantilla}
              onTogglePlantillaEstado={onTogglePlantillaEstado}
            />
          )}

          {currentTab === 'inspecciones' && (
            <InspectionList
              inspecciones={inspecciones}
              onViewPdf={onViewPdf}
              onOpenWhatsApp={onOpenWhatsApp}
              onStartInspection={onStartInspection}
            />
          )}

          {currentTab === 'acciones' && (
            <CorrectiveActionsList
              acciones={acciones}
              onUpdateAccion={onUpdateAccion}
              onOpenWhatsApp={onOpenWhatsApp}
            />
          )}

          {currentTab === 'calendario' && (
            <PreventiveCalendar
              mantenimientos={mantenimientos}
              onUpdateMantenimiento={onUpdateMantenimiento}
            />
          )}

          {currentTab === 'reportes' && (
            <ReportsExport
              inspecciones={inspecciones}
              company={activeCompany}
              logs={logs}
              onExportExcel={onExportExcel}
              onExportPdfSummary={onExportPdfSummary}
            />
          )}
        </div>

      </div>

    </div>
  );
}
