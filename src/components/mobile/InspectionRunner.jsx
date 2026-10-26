import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Camera, 
  Save, 
  PenTool, 
  ChevronRight, 
  ChevronLeft, 
  UploadCloud,
  Check,
  AlertCircle,
  FileCheck,
  Image as ImageIcon,
  HardHat,
  AlertTriangle,
  MinusCircle,
  Sparkles,
  Trash2
} from 'lucide-react';
import { MOCK_EVIDENCE_PHOTOS } from '../../data/seedData';
import { SignaturePadModal } from './SignaturePadModal';

export function InspectionRunner({ 
  activo, 
  plantilla, 
  existingInspection, 
  currentUser, 
  onSaveDraft, 
  onFinishInspection, 
  onCancel 
}) {
  const preguntas = plantilla?.preguntas || [];
  
  // Initialize answers state from existing draft or defaults
  const [respuestas, setRespuestas] = useState(() => {
    if (existingInspection?.respuestas && existingInspection.respuestas.length > 0) {
      const map = {};
      existingInspection.respuestas.forEach(r => {
        map[r.pregunta_id] = {
          valor: r.valor,
          conforme: r.conforme,
          observacion: r.observacion || '',
          foto: r.foto || null
        };
      });
      return map;
    }
    return {};
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [observacionesGenerales, setObservacionesGenerales] = useState(
    existingInspection?.observaciones_generales || ''
  );
  const [validationError, setValidationError] = useState('');
  const [draftSavedToast, setDraftSavedToast] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [evidencias, setEvidencias] = useState(existingInspection?.evidencias || []);

  const currentPregunta = preguntas[currentIndex] || {};
  const totalPreguntas = preguntas.length;

  const currentAnswer = respuestas[currentPregunta.id] || {
    valor: '',
    conforme: true,
    observacion: '',
    foto: null
  };

  const handleSetAnswerValue = (val) => {
    let conforme = true;
    if (val === 'na') {
      conforme = true;
    } else if (currentPregunta.valor_esperado !== undefined && currentPregunta.valor_esperado !== null) {
      conforme = String(val).toLowerCase() === String(currentPregunta.valor_esperado).toLowerCase();
    }

    setRespuestas(prev => ({
      ...prev,
      [currentPregunta.id]: {
        ...prev[currentPregunta.id],
        valor: val,
        conforme: conforme,
        observacion: prev[currentPregunta.id]?.observacion || ''
      }
    }));
    setValidationError('');
  };

  const handleSetObservation = (obs) => {
    setRespuestas(prev => ({
      ...prev,
      [currentPregunta.id]: {
        ...prev[currentPregunta.id],
        observacion: obs
      }
    }));
  };

  const handleSetPhoto = (photoBase64) => {
    setRespuestas(prev => ({
      ...prev,
      [currentPregunta.id]: {
        ...prev[currentPregunta.id],
        foto: photoBase64,
        valor: photoBase64 ? (prev[currentPregunta.id]?.valor || '[Foto Adjunta]') : prev[currentPregunta.id]?.valor
      }
    }));

    if (photoBase64) {
      const newEvi = {
        id: `evi-${Date.now()}`,
        respuesta_id: currentPregunta.id,
        archivo: photoBase64,
        descripcion: `Evidencia técnica: ${currentPregunta.texto.slice(0, 45)}...`,
        fecha: new Date().toISOString()
      };
      setEvidencias(prev => [...prev.filter(e => e.respuesta_id !== currentPregunta.id), newEvi]);
    } else {
      setEvidencias(prev => prev.filter(e => e.respuesta_id !== currentPregunta.id));
    }
    setValidationError('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      handleSetPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Quick realistic industrial photo presets for demo speed
  const handlePresetPhoto = (type) => {
    let photo = MOCK_EVIDENCE_PHOTOS.hydraulic_leak;
    if (type === 'extinguisher') photo = MOCK_EVIDENCE_PHOTOS.extinguisher_ok;
    handleSetPhoto(photo);
  };

  // Quick preset observation tags
  const handleApplyObservationTag = (tagText) => {
    const current = currentAnswer.observacion || '';
    const updated = current ? `${current}. ${tagText}` : tagText;
    handleSetObservation(updated);
  };

  const validateInspection = () => {
    const missing = [];
    preguntas.forEach((p, idx) => {
      if (p.obligatoria) {
        const resp = respuestas[p.id];
        if (!resp || resp.valor === undefined || resp.valor === '' || (p.tipo === 'foto' && !resp.foto)) {
          missing.push(`Criterio #${idx + 1}: ${p.texto.slice(0, 40)}...`);
        }
      }
    });

    if (missing.length > 0) {
      setValidationError(`Hay ${missing.length} criterio(s) obligatorio(s) pendiente(s):\n• ${missing.slice(0, 3).join('\n• ')}`);
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleSaveDraftClick = () => {
    const structuredAnswers = preguntas.map(p => {
      const resp = respuestas[p.id] || {};
      return {
        pregunta_id: p.id,
        texto: p.texto,
        valor: resp.valor !== undefined ? resp.valor : '',
        conforme: resp.conforme !== undefined ? resp.conforme : true,
        observacion: resp.observacion || '',
        foto: resp.foto || null
      };
    });

    onSaveDraft({
      id: existingInspection?.id,
      plantilla_id: plantilla.id,
      plantilla_nombre: plantilla.nombre,
      activo_id: activo.id,
      activo_codigo: activo.codigo,
      activo_nombre: activo.nombre,
      respuestas: structuredAnswers,
      evidencias: evidencias,
      observaciones_generales: observacionesGenerales,
      estado: 'borrador',
      resultado: 'pendiente'
    });

    setDraftSavedToast(true);
    setTimeout(() => setDraftSavedToast(false), 2500);
  };

  const handleOpenSignature = () => {
    if (validateInspection()) {
      setShowSignatureModal(true);
    }
  };

  const handleConfirmSignature = (signatureData) => {
    setShowSignatureModal(false);

    const structuredAnswers = preguntas.map(p => {
      const resp = respuestas[p.id] || {};
      return {
        pregunta_id: p.id,
        texto: p.texto,
        valor: resp.valor !== undefined ? resp.valor : '',
        conforme: resp.conforme !== undefined ? resp.conforme : true,
        observacion: resp.observacion || '',
        foto: resp.foto || null
      };
    });

    const hasNonCompliant = structuredAnswers.some(r => r.conforme === false);

    onFinishInspection({
      id: existingInspection?.id,
      plantilla_id: plantilla.id,
      plantilla_nombre: plantilla.nombre,
      activo_id: activo.id,
      activo_codigo: activo.codigo,
      activo_nombre: activo.nombre,
      respuestas: structuredAnswers,
      evidencias: evidencias,
      observaciones_generales: observacionesGenerales || (hasNonCompliant ? 'Inspección finalizada con hallazgos no conformes. Acción correctiva creada.' : 'Inspección completada 100% conforme.'),
      estado: 'completada',
      resultado: hasNonCompliant ? 'no_conforme' : 'conforme',
      firma: signatureData,
      fecha_fin: new Date().toISOString()
    });
  };

  const answeredCount = preguntas.filter(p => {
    const r = respuestas[p.id];
    return r && r.valor !== undefined && r.valor !== '';
  }).length;
  const progressPct = totalPreguntas > 0 ? Math.round((answeredCount / totalPreguntas) * 100) : 0;

  return (
    <div className="bg-slate-50 min-h-screen pb-24 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Toast Notification for Draft Saved */}
      {draftSavedToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700 text-xs font-bold flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Borrador guardado exitosamente en memoria</span>
        </div>
      )}

      {/* Field Inspection Sticky App Bar in Pure Light White */}
      <div className="bg-white text-slate-800 px-4 py-3 sticky top-14 z-30 shadow-xs border-b border-slate-200">
        <div className="flex items-center justify-between">
          <button
            onClick={onCancel}
            className="flex items-center space-x-1 text-slate-600 hover:text-slate-900 text-xs font-bold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span>Volver</span>
          </button>
          
          <div className="text-center min-w-0 px-2">
            <div className="flex items-center justify-center space-x-1.5">
              <span className="font-mono font-bold text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                {activo.codigo}
              </span>
              <span className="text-slate-300 text-xs">•</span>
              <span className="font-extrabold text-xs text-slate-900 truncate max-w-[170px]">
                {activo.nombre}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5 font-medium">
              Criterio {currentIndex + 1} de {totalPreguntas} • {progressPct}% Respondido
            </div>
          </div>

          <button
            onClick={handleSaveDraftClick}
            className="text-xs font-bold text-amber-800 hover:text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-xl transition-colors flex items-center space-x-1 cursor-pointer"
            title="Guardar borrador para retomar después"
          >
            <Save className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Guardar</span>
          </button>
        </div>

        {/* Tactical Progress Meter */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
          <div 
            className="bg-blue-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Main Checklist Card Area */}
      <div className="flex-1 p-4 max-w-2xl mx-auto w-full space-y-4">
        
        {/* Validation Warning Alert */}
        {validationError && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 text-xs text-rose-900 flex items-start space-x-2.5 shadow-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="whitespace-pre-line leading-relaxed font-bold">
              {validationError}
            </div>
          </div>
        )}

        {/* Industrial Checklist Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
          
          {/* Card Header & Requirement Pill */}
          <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
            <span className="font-mono font-bold text-slate-600 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
              <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold">
                {currentIndex + 1}
              </span>
              <span>Criterio de Control</span>
            </span>
            {currentPregunta.obligatoria ? (
              <span className="text-[10px] font-bold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                Obligatorio
              </span>
            ) : (
              <span className="text-[10px] text-slate-400 font-medium">Opcional</span>
            )}
          </div>

          {/* Question Text */}
          <h2 className="text-base font-extrabold text-slate-900 leading-snug">
            {currentPregunta.texto}
          </h2>

          {/* Input Controls (Large Tactile Industrial Buttons) */}
          <div className="space-y-4 pt-1">
            
            {/* 1. SÍ / NO / N/A (Field Tactile 3-State Control) */}
            {currentPregunta.tipo === 'si_no' && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSetAnswerValue('si')}
                  className={`py-4 px-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                    currentAnswer.valor === 'si'
                      ? 'border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-500'
                      : 'border-slate-200 hover:border-emerald-300 text-slate-800 bg-slate-50/70 hover:bg-emerald-50/20'
                  }`}
                >
                  <CheckCircle2 className={`w-5 h-5 ${currentAnswer.valor === 'si' ? 'text-white' : 'text-emerald-600'}`} />
                  <span className="text-sm">CONFORME</span>
                  <span className={`text-[10px] font-medium ${currentAnswer.valor === 'si' ? 'text-emerald-100' : 'text-slate-500'}`}>
                    Cumple estándar
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSetAnswerValue('no')}
                  className={`py-4 px-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                    currentAnswer.valor === 'no'
                      ? 'border-rose-600 bg-rose-600 text-white shadow-md shadow-rose-600/20 ring-2 ring-rose-500'
                      : 'border-slate-200 hover:border-rose-300 text-slate-800 bg-slate-50/70 hover:bg-rose-50/20'
                  }`}
                >
                  <AlertTriangle className={`w-5 h-5 ${currentAnswer.valor === 'no' ? 'text-white' : 'text-rose-600'}`} />
                  <span className="text-sm">NO CONFORME</span>
                  <span className={`text-[10px] font-medium ${currentAnswer.valor === 'no' ? 'text-rose-100' : 'text-slate-500'}`}>
                    Hallazgo / Falla
                  </span>
                </button>
              </div>
            )}

            {/* 2. OPCIÓN MÚLTIPLE */}
            {currentPregunta.tipo === 'opcion' && (
              <div className="space-y-2">
                {(currentPregunta.opciones || []).map((opt) => {
                  const isSelected = currentAnswer.valor === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSetAnswerValue(opt)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-1 ring-blue-600'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-800 bg-white font-medium'
                      }`}
                    >
                      <span className="text-sm">{opt}</span>
                      {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 3. NÚMERO */}
            {currentPregunta.tipo === 'numero' && (
              <div className="relative">
                <input
                  type="number"
                  step="any"
                  placeholder="0.00"
                  value={currentAnswer.valor || ''}
                  onChange={(e) => handleSetAnswerValue(e.target.value)}
                  className="w-full text-lg font-bold p-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none text-slate-900 font-mono"
                />
                {currentPregunta.unidad && (
                  <span className="absolute right-4 top-4 text-xs font-bold text-slate-500 uppercase font-mono">
                    {currentPregunta.unidad}
                  </span>
                )}
              </div>
            )}

            {/* 4. TEXTO */}
            {currentPregunta.tipo === 'texto' && (
              <textarea
                rows={3}
                placeholder="Especifique el diagnóstico técnico observado..."
                value={currentAnswer.valor || ''}
                onChange={(e) => handleSetAnswerValue(e.target.value)}
                className="w-full p-3.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none text-slate-800"
              />
            )}

            {/* 5. DEFECT ACTION BANNER (When No Conforme is Selected) */}
            {currentAnswer.conforme === false && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between text-rose-950 font-bold">
                  <span className="flex items-center gap-1.5 text-sm">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Desviación Registrada</span>
                  </span>
                  <span className="text-[10px] font-mono bg-rose-200/80 text-rose-900 px-2 py-0.5 rounded font-bold">
                    Acción Correctiva
                  </span>
                </div>

                <p className="text-[11px] text-rose-800 leading-relaxed font-medium">
                  Esta desviación generará automáticamente una acción correctiva con responsable y fecha límite, y figurará en el certificado PDF oficial.
                </p>

                {/* Quick Observation Preset Tags for fast demo typing */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-rose-900 uppercase tracking-wider block">
                    Etiquetas rápidas de hallazgo (toque para insertar):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Fuga visible de fluido',
                      'Desgaste crítico excesivo',
                      'Sin manómetro operativo',
                      'Falta pasador de seguridad',
                      'Riesgo inminente de parada'
                    ].map((tag, tIdx) => (
                      <button
                        key={tIdx}
                        type="button"
                        onClick={() => handleApplyObservationTag(tag)}
                        className="px-2.5 py-1 rounded-lg bg-white border border-rose-200 text-rose-900 text-[10px] font-bold hover:bg-rose-100 transition-colors cursor-pointer active:scale-98 shadow-xs"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 6. FOTOGRAFÍA / EVIDENCIA ADJUNTA */}
            {(currentPregunta.tipo === 'foto' || currentAnswer.conforme === false) && (
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-blue-600" />
                    <span>Evidencia Fotográfica Adjunta</span>
                  </span>
                  
                  {/* Subtle preset photo loader for testing */}
                  {!currentAnswer.foto && (
                    <button
                      type="button"
                      onClick={() => handlePresetPhoto('leak')}
                      className="text-[11px] text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer"
                    >
                      Adjuntar foto de prueba
                    </button>
                  )}
                </div>

                {currentAnswer.foto ? (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-300 bg-slate-900 shadow-sm">
                    <img 
                      src={currentAnswer.foto} 
                      alt="Evidencia técnica" 
                      className="w-full h-48 object-cover" 
                    />
                    <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-mono">
                      Timestamp: {new Date().toLocaleTimeString()}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSetPhoto(null)}
                      className="absolute top-2 right-2 bg-rose-600 text-white px-2.5 py-1 rounded-xl text-xs hover:bg-rose-700 transition-colors font-bold flex items-center space-x-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Quitar foto</span>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-2 group-hover:scale-105 transition-transform">
                      <Camera className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Tomar foto o seleccionar archivo</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Captura directa con la cámara (JPG, PNG)</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      capture="environment"
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                  </label>
                )}
              </div>
            )}

            {/* Observación técnica específica por criterio */}
            {currentAnswer.valor && (
              <div className="pt-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Observaciones Técnicas del Inspector:
                </label>
                <input
                  type="text"
                  placeholder="Detalle técnico de la condición observada..."
                  value={currentAnswer.observacion || ''}
                  onChange={(e) => handleSetObservation(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-800 font-medium"
                />
              </div>
            )}

          </div>

        </div>

        {/* Step Navigation Bar */}
        <div className="flex items-center justify-between gap-3 pt-1">
          
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            className="flex-1 bg-white hover:bg-slate-50 border border-slate-300 disabled:opacity-40 py-3 rounded-2xl text-xs font-bold text-slate-700 flex items-center justify-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          {currentIndex < totalPreguntas - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentIndex(prev => Math.min(totalPreguntas - 1, prev + 1))}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md shadow-blue-600/20 transition-colors cursor-pointer active:scale-98"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleOpenSignature}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-600/20 transition-colors cursor-pointer active:scale-98"
            >
              <PenTool className="w-4 h-4" />
              <span>Finalizar y Firmar</span>
            </button>
          )}

        </div>

        {/* Direct Tactical Item Jumper */}
        <div className="pt-3 pb-6 flex flex-wrap gap-2 justify-center">
          {preguntas.map((p, idx) => {
            const r = respuestas[p.id];
            const isAnswered = r && r.valor !== undefined && r.valor !== '';
            const isBad = r && r.conforme === false;
            return (
              <button
                key={p.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-xl text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  idx === currentIndex
                    ? 'ring-2 ring-blue-600 scale-105 z-10'
                    : ''
                } ${
                  isBad
                    ? 'bg-rose-600 text-white'
                    : isAnswered
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
                title={`Pregunta #${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

      </div>

      {/* Signature Modal */}
      <SignaturePadModal
        isOpen={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
        onConfirm={handleConfirmSignature}
        inspectorName={currentUser?.nombre || 'Diana Morales G.'}
      />

    </div>
  );
}
