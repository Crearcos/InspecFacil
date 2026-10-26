import React, { useState, useEffect } from 'react';
import { StorageService } from './services/storageService';
import { PdfService } from './services/pdfService';
import { ExcelService } from './services/excelService';

// Layout & Global Components
import { Navbar } from './components/Navbar';
import { LoginScreen } from './components/LoginScreen';
import { LoginModal } from './components/LoginModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { BillingModal } from './components/BillingModal';
import { ResetModal } from './components/ResetModal';
import { DemoGuideModal } from './components/DemoGuideModal';
import { DeviceQrModal } from './components/DeviceQrModal';

// Mobile Components
import { MobileDashboard } from './components/mobile/MobileDashboard';
import { InspectionRunner } from './components/mobile/InspectionRunner';
import { QrScannerModal } from './components/mobile/QrScannerModal';
import { InspectionSuccessModal } from './components/mobile/InspectionSuccessModal';

// Desktop Components
import { SupervisorDesktop } from './components/desktop/SupervisorDesktop';

export default function App() {
  // Initialize storage
  useEffect(() => {
    StorageService.init();
  }, []);

  // State
  const [activeCompany, setActiveCompany] = useState(() => StorageService.getActiveCompany());
  const [companies, setCompanies] = useState(() => StorageService.getCompanies());
  const [currentUser, setCurrentUser] = useState(() => StorageService.getActiveUser());
  const [users, setUsers] = useState(() => StorageService.getUsers());

  // Entity Data
  const [activos, setActivos] = useState(() => StorageService.getActivos());
  const [plantillas, setPlantillas] = useState(() => StorageService.getPlantillas());
  const [inspecciones, setInspecciones] = useState(() => StorageService.getInspecciones());
  const [acciones, setAcciones] = useState(() => StorageService.getAccionesCorrectivas());
  const [mantenimientos, setMantenimientos] = useState(() => StorageService.getMantenimientos());
  const [logs, setLogs] = useState(() => StorageService.getRegistroActividad());

  // Access State (Muestra la pantalla de acceso con botones por rol al ingresar o cerrar sesión)
  const [isLoggedOut, setIsLoggedOut] = useState(() => {
    return sessionStorage.getItem('inspecfacil_session_active') !== 'true';
  });

  // Responsive screen detection for true native mobile vs desktop adaptation
  const [isMobileScreen, setIsMobileScreen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop active tab
  const [desktopTab, setDesktopTab] = useState('tablero');

  // Mobile Inspection Runner state
  const [runningInspection, setRunningInspection] = useState(null); // { activo, plantilla, existingInspection }
  const [finishedInspection, setFinishedInspection] = useState(null); // inspection object to show in success modal

  // Modals state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [whatsAppTarget, setWhatsAppTarget] = useState(null); // { accion, inspeccion }
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showDemoGuide, setShowDemoGuide] = useState(false);
  const [showDeviceQr, setShowDeviceQr] = useState(false);
  const [showQrScanner, setShowQrScanner] = useState(false);

  // Reload current company & user entities
  const reloadData = () => {
    const comp = StorageService.getActiveCompany();
    const user = StorageService.getActiveUser();
    setActiveCompany(comp);
    setCurrentUser(user);
    setCompanies(StorageService.getCompanies());
    setUsers(StorageService.getUsers(comp.id));
    setActivos(StorageService.getActivos(comp.id));
    setPlantillas(StorageService.getPlantillas(comp.id));
    setInspecciones(StorageService.getInspecciones(comp.id));
    setAcciones(StorageService.getAccionesCorrectivas(comp.id));
    setMantenimientos(StorageService.getMantenimientos(comp.id));
    setLogs(StorageService.getRegistroActividad(comp.id));
  };

  // Switch Company (Multi-tenant)
  const handleSwitchCompany = (companyId) => {
    StorageService.setActiveCompanyId(companyId);
    reloadData();
  };

  // Switch User (Role change)
  const handleSwitchUser = (userId) => {
    StorageService.setActiveUserId(userId);
    const u = StorageService.getActiveUser();
    setCurrentUser(u);
    setRunningInspection(null);
    setIsLoggedOut(false);
  };

  // Login from Dedicated Access Screen
  const handleLoginFromScreen = (userId) => {
    if (userId) StorageService.setActiveUserId(userId);
    try {
      sessionStorage.setItem('inspecfacil_session_active', 'true');
    } catch (e) {}
    reloadData();
    setRunningInspection(null);
    setIsLoggedOut(false);
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('inspecfacil_session_active');
    } catch (e) {}
    setIsLoggedOut(true);
  };

  // Reset Demo
  const handleConfirmReset = () => {
    StorageService.resetDemo();
    reloadData();
    setRunningInspection(null);
    setFinishedInspection(null);
  };

  // Mobile Inspection Handlers
  const handleStartInspection = (activo) => {
    const targetActivo = activo || activos[0];
    if (!targetActivo) return;
    const template = plantillas.find(p => p.id === targetActivo.plantilla_id) || plantillas[0];
    setRunningInspection({
      activo: targetActivo,
      plantilla: template,
      existingInspection: null
    });
  };

  const handleResumeDraft = (draftInspection) => {
    const activo = activos.find(a => a.id === draftInspection.activo_id || a.codigo === draftInspection.activo_codigo) || activos[0];
    const template = plantillas.find(p => p.id === draftInspection.plantilla_id) || plantillas[0];
    setRunningInspection({
      activo,
      plantilla: template,
      existingInspection: draftInspection
    });
  };

  const handleSaveDraft = (draftData) => {
    StorageService.saveInspeccion(draftData);
    reloadData();
    setRunningInspection(null);
  };

  const handleFinishInspection = (finalData) => {
    const saved = StorageService.saveInspeccion(finalData);
    reloadData();
    setRunningInspection(null);
    setFinishedInspection(saved);
  };

  // PDF Download Handler
  const handleDownloadPdf = async (inspeccion) => {
    try {
      await PdfService.generateInspectionPdf(inspeccion, activeCompany, true);
      StorageService.addLog("Descarga de Certificado PDF", `Certificado ${inspeccion.codigo_folio} descargado.`);
      setLogs(StorageService.getRegistroActividad());
    } catch (e) {
      console.error("Error generando PDF:", e);
      alert("Hubo un error al generar el PDF.");
    }
  };

  // Excel Export Handler
  const handleExportExcel = () => {
    try {
      ExcelService.exportMonthlyComplianceReport(inspecciones, activeCompany);
      StorageService.addLog("Exportación a Excel", "Resumen mensual de conformidad exportado a XLSX.");
      setLogs(StorageService.getRegistroActividad());
    } catch (e) {
      console.error("Error exportando a Excel:", e);
      alert("Hubo un error al exportar a Excel.");
    }
  };

  // WhatsApp Simulation Trigger
  const handleOpenWhatsApp = (item) => {
    setWhatsAppTarget({
      accion: item?.inspeccion_folio ? item : null,
      inspeccion: item?.codigo_folio ? item : null
    });
    setShowWhatsAppModal(true);
  };

  // 5-Minute Demo Step Navigator
  const handleSelectDemoStep = (stepKey) => {
    setIsLoggedOut(false);
    switch (stepKey) {
      case 'step-1':
        setRunningInspection(null);
        setDesktopTab('plantillas');
        break;
      case 'step-2':
        // Iniciar inspección técnica en terreno (MC-01)
        const demoActivo = activos.find(a => a.codigo === 'MC-01') || activos[0];
        if (demoActivo) {
          handleStartInspection(demoActivo);
        }
        break;
      case 'step-3':
        setRunningInspection(null);
        setDesktopTab('inspecciones');
        const demoInsp = inspecciones.find(i => i.id === 'insp-demo-noconforme') || inspecciones[0];
        if (demoInsp) handleDownloadPdf(demoInsp);
        break;
      case 'step-4':
        setRunningInspection(null);
        setDesktopTab('acciones');
        const demoAccion = acciones[0];
        if (demoAccion) handleOpenWhatsApp(demoAccion);
        break;
      case 'step-5':
        setRunningInspection(null);
        setDesktopTab('calendario');
        break;
      case 'step-6':
        setRunningInspection(null);
        setDesktopTab('reportes');
        handleExportExcel();
        break;
      default:
        break;
    }
  };

  // Dedicated Access Screen (si el usuario cerró sesión)
  if (isLoggedOut) {
    return (
      <LoginScreen
        companies={companies}
        activeCompany={activeCompany}
        onSelectCompany={handleSwitchCompany}
        users={users}
        onSelectRole={handleLoginFromScreen}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-slate-900 selection:text-white text-slate-800 antialiased">
      
      {/* Top Navigation */}
      <Navbar
        activeCompany={activeCompany}
        companies={companies}
        onSwitchCompany={handleSwitchCompany}
        activeUser={currentUser}
        users={users}
        onSwitchUser={handleSwitchUser}
        onResetDemo={() => setShowResetModal(true)}
        onOpenDemoGuide={() => setShowDemoGuide(true)}
        onLogout={handleLogout}
      />

      {/* RESPONSIVE WORKSPACE BASED ON SCREEN SIZE, ROLE & ACTIVE INSPECTION */}
      {runningInspection ? (
        <div className="flex-1 w-full bg-slate-50">
          <div className="w-full max-w-3xl mx-auto sm:my-6 sm:px-4">
            <div className="bg-white sm:rounded-xl sm:shadow-xs sm:border sm:border-slate-200 overflow-hidden">
              <InspectionRunner
                activo={runningInspection.activo}
                plantilla={runningInspection.plantilla}
                existingInspection={runningInspection.existingInspection}
                currentUser={currentUser}
                onSaveDraft={handleSaveDraft}
                onFinishInspection={handleFinishInspection}
                onCancel={() => setRunningInspection(null)}
              />
            </div>
          </div>
        </div>
      ) : isMobileScreen ? (
        <div className="flex-1 w-full bg-slate-50 flex flex-col">
          <div className="w-full max-w-3xl mx-auto sm:my-6 sm:px-4 flex-1 flex flex-col">
            <div className="bg-slate-50 sm:bg-white sm:rounded-xl sm:shadow-xs sm:border sm:border-slate-200 overflow-hidden flex-1 flex flex-col">
              <MobileDashboard
                currentUser={currentUser}
                activeCompany={activeCompany}
                companies={companies}
                onSwitchCompany={handleSwitchCompany}
                users={users}
                onSwitchUser={handleSwitchUser}
                activos={activos}
                plantillas={plantillas}
                inspecciones={inspecciones}
                acciones={acciones}
                mantenimientos={mantenimientos}
                logs={logs}
                onStartInspection={handleStartInspection}
                onResumeDraft={handleResumeDraft}
                onOpenQrScanner={() => setShowQrScanner(true)}
                onViewPdf={handleDownloadPdf}
                onOpenWhatsApp={handleOpenWhatsApp}
                onUpdateAccion={(id, updates) => {
                  StorageService.updateAccionCorrectiva(id, updates);
                  reloadData();
                }}
                onExportExcel={handleExportExcel}
                onOpenDemoGuide={() => setShowDemoGuide(true)}
                onResetDemo={() => setShowResetModal(true)}
                onLogout={handleLogout}
              />
            </div>
          </div>
        </div>
      ) : (
        <SupervisorDesktop
          activeTab={desktopTab}
          onTabChange={setDesktopTab}
          activeCompany={activeCompany}
          currentUser={currentUser}
          activos={activos}
          plantillas={plantillas}
          inspecciones={inspecciones}
          acciones={acciones}
          mantenimientos={mantenimientos}
          logs={logs}
          onStartInspection={handleStartInspection}
          onOpenQrScanner={() => setShowQrScanner(true)}
          onSaveActivo={(data) => {
            StorageService.saveActivo(data);
            reloadData();
          }}
          onDeleteActivo={(id) => {
            StorageService.deleteActivo(id);
            reloadData();
          }}
          onToggleActivoEstado={(id) => {
            StorageService.toggleActivoEstado(id);
            reloadData();
          }}
          onSavePlantilla={(data) => {
            StorageService.savePlantilla(data);
            reloadData();
          }}
          onDeletePlantilla={(id) => {
            StorageService.deletePlantilla(id);
            reloadData();
          }}
          onTogglePlantillaEstado={(id) => {
            StorageService.togglePlantillaEstado(id);
            reloadData();
          }}
          onUpdateAccion={(id, updates) => {
            StorageService.updateAccionCorrectiva(id, updates);
            reloadData();
          }}
          onUpdateMantenimiento={(id, updates) => {
            StorageService.updateMantenimiento(id, updates);
            reloadData();
          }}
          onViewPdf={handleDownloadPdf}
          onOpenWhatsApp={handleOpenWhatsApp}
          onOpenBilling={() => setShowBillingModal(true)}
          onExportExcel={handleExportExcel}
          onExportPdfSummary={() => {
            const firstInsp = inspecciones[0];
            if (firstInsp) handleDownloadPdf(firstInsp);
          }}
        />
      )}

      {/* MODALS */}
      
      {/* 1. Profile Switcher Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSelectUser={handleSwitchUser}
        users={users}
        activeCompany={activeCompany}
        companies={companies}
        onSelectCompany={handleSwitchCompany}
      />

      {/* 2. WhatsApp Simulator Modal */}
      <WhatsAppModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
        accionCorrectiva={whatsAppTarget?.accion}
        inspeccion={whatsAppTarget?.inspeccion}
      />

      {/* 3. Billing & Payments Simulator Modal */}
      <BillingModal
        isOpen={showBillingModal}
        onClose={() => setShowBillingModal(false)}
        activeCompany={activeCompany}
      />

      {/* 4. Demo Guide 5-Min Modal */}
      <DemoGuideModal
        isOpen={showDemoGuide}
        onClose={() => setShowDemoGuide(false)}
        onSelectStep={handleSelectDemoStep}
        onShowQrCode={() => setShowDeviceQr(true)}
      />

      {/* 5. Reset Demo Confirmation Modal */}
      <ResetModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleConfirmReset}
      />

      {/* 6. Device QR Modal */}
      <DeviceQrModal
        isOpen={showDeviceQr}
        onClose={() => setShowDeviceQr(false)}
      />

      {/* 7. QR Scanner Simulation Modal */}
      <QrScannerModal
        isOpen={showQrScanner}
        onClose={() => setShowQrScanner(false)}
        activos={activos}
        onSelectActivo={handleStartInspection}
      />

      {/* 8. Inspection Success Modal */}
      <InspectionSuccessModal
        isOpen={!!finishedInspection}
        onClose={() => setFinishedInspection(null)}
        inspeccion={finishedInspection}
        onDownloadPdf={handleDownloadPdf}
        onOpenWhatsApp={handleOpenWhatsApp}
        onNewInspection={() => {
          setFinishedInspection(null);
          setShowQrScanner(true);
        }}
      />

    </div>
  );
}
