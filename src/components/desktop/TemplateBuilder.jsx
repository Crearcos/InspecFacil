import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Camera, 
  Hash, 
  Type, 
  X
} from 'lucide-react';

export function TemplateBuilder({ 
  plantillas, 
  onSavePlantilla, 
  onDeletePlantilla, 
  onTogglePlantillaEstado 
}) {
  const [selectedPlantilla, setSelectedPlantilla] = useState(plantillas[0] || null);
  const [isEditingModal, setIsEditingModal] = useState(false);
  const [deletingPlantillaId, setDeletingPlantillaId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    tipo_activo: 'Montacargas',
    codigo_norma: '',
    frecuencia_sugerida: 'Diaria'
  });

  const [newQuestionModal, setNewQuestionModal] = useState(false);
  const [questionData, setQuestionData] = useState({
    texto: '',
    tipo: 'si_no',
    valor_esperado: 'si',
    obligatoria: true,
    opciones: 'Bueno, Regular, Malo'
  });

  const handleOpenNewPlantilla = () => {
    setFormData({
      nombre: '',
      tipo_activo: 'Seguridad General',
      codigo_norma: 'SST-CHK-2026',
      frecuencia_sugerida: 'Semanal'
    });
    setIsEditingModal(true);
  };

  const handleSavePlantillaForm = (e) => {
    e.preventDefault();
    if (!formData.nombre) return;

    const newPlt = {
      ...formData,
      preguntas: [
        { id: `q-${Date.now()}-1`, orden: 1, texto: 'Condiciones generales de operación y limpieza conformes', tipo: 'si_no', valor_esperado: 'si', obligatoria: true },
        { id: `q-${Date.now()}-2`, orden: 2, texto: 'Registro fotográfico del equipo al inicio de turno', tipo: 'foto', obligatoria: false }
      ]
    };

    onSavePlantilla(newPlt);
    setIsEditingModal(false);
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!questionData.texto || !selectedPlantilla) return;

    const updatedQuestions = [...(selectedPlantilla.preguntas || [])];
    const newQ = {
      id: `q-${Date.now()}`,
      orden: updatedQuestions.length + 1,
      texto: questionData.texto,
      tipo: questionData.tipo,
      valor_esperado: questionData.valor_esperado,
      obligatoria: questionData.obligatoria,
      opciones: questionData.tipo === 'opcion' ? questionData.opciones.split(',').map(s => s.trim()) : undefined
    };

    updatedQuestions.push(newQ);
    const updatedPlantilla = { ...selectedPlantilla, preguntas: updatedQuestions };
    onSavePlantilla(updatedPlantilla);
    setSelectedPlantilla(updatedPlantilla);
    setNewQuestionModal(false);
  };

  const handleDeleteQuestion = (questionId) => {
    if (!selectedPlantilla) return;
    const updatedQuestions = (selectedPlantilla.preguntas || []).filter(q => q.id !== questionId);
    const updatedPlantilla = { ...selectedPlantilla, preguntas: updatedQuestions };
    onSavePlantilla(updatedPlantilla);
    setSelectedPlantilla(updatedPlantilla);
  };

  return (
    <div className="space-y-4">
      
      {/* Header Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Configuración de Plantillas y Checklists
          </h2>
          <p className="text-xs text-slate-500">
            Cuestionarios técnicos de verificación conforme a normativas de seguridad industrial.
          </p>
        </div>

        <button
          onClick={handleOpenNewPlantilla}
          className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5 text-sky-400" />
          <span>Nueva Plantilla</span>
        </button>
      </div>

      {/* Main Grid: Left selector, Right detail & question builder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left: Templates List */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-3.5 space-y-2">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2 px-1">
            Plantillas Disponibles ({plantillas.length})
          </span>

          <div className="space-y-1.5">
            {plantillas.map((plt) => {
              const isSelected = selectedPlantilla?.id === plt.id;
              return (
                <button
                  key={plt.id}
                  onClick={() => setSelectedPlantilla(plt)}
                  className={`w-full text-left p-3 rounded-lg border transition-all text-xs ${
                    isSelected
                      ? 'border-slate-900 bg-slate-50 font-semibold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">
                      {plt.codigo_norma || 'SST-FOR'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {(plt.preguntas || []).length} ítems
                    </span>
                  </div>
                  <h4 className="font-semibold text-slate-900 mt-1 leading-snug">
                    {plt.nombre}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {plt.tipo_activo} • {plt.frecuencia_sugerida}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Template Questions Builder */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-4">
          {selectedPlantilla ? (
            <>
              {/* Template Metadata Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-slate-900">{selectedPlantilla.nombre}</h3>
                    <span className={`inline-flex items-center px-2 py-0.2 rounded-full text-[10px] font-semibold border ${
                      selectedPlantilla.activa !== false
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-300'
                    }`}>
                      {selectedPlantilla.activa !== false ? 'Activa' : 'Desactivada'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Norma: <strong className="text-slate-700 font-mono">{selectedPlantilla.codigo_norma}</strong> • Aplicable: <strong className="text-slate-700">{selectedPlantilla.tipo_activo}</strong>
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      if (onTogglePlantillaEstado) {
                        onTogglePlantillaEstado(selectedPlantilla.id);
                        setSelectedPlantilla(prev => ({ ...prev, activa: !prev.activa }));
                      }
                    }}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                    title={selectedPlantilla.activa !== false ? "Desactivar plantilla" : "Activar plantilla"}
                  >
                    {selectedPlantilla.activa !== false ? 'Desactivar' : 'Activar'}
                  </button>
                  <button
                    onClick={() => setDeletingPlantillaId(selectedPlantilla.id)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition-colors"
                    title="Eliminar plantilla con confirmación"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setNewQuestionModal(true)}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Ítem</span>
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-2">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Criterios de Verificación ({(selectedPlantilla.preguntas || []).length})
                </span>

                {(selectedPlantilla.preguntas || []).map((q, idx) => (
                  <div 
                    key={q.id || idx}
                    className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="w-5 h-5 rounded bg-slate-100 text-slate-700 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="font-medium text-slate-900 leading-snug">{q.texto}</div>
                        <div className="flex items-center space-x-2 mt-1 text-[11px] text-slate-500">
                          <span className="bg-slate-100 px-1.5 py-0.2 rounded font-mono text-[10px]">
                            {q.tipo === 'si_no' ? 'Sí / No' :
                             q.tipo === 'foto' ? 'Fotografía' :
                             q.tipo === 'numero' ? `Número (${q.unidad || 'medida'})` :
                             q.tipo === 'opcion' ? 'Selección múltiple' : 'Texto libre'}
                          </span>
                          {q.obligatoria && (
                            <span className="text-slate-600 font-medium text-[10px]">• Obligatorio</span>
                          )}
                          {q.valor_esperado && (
                            <span className="text-slate-600 text-[10px]">
                              • Esperado: {q.valor_esperado.toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      title="Eliminar ítem"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Selecciona una plantilla del listado para ver sus preguntas.
            </div>
          )}
        </div>

      </div>

      {/* MODAL: AGREGAR PREGUNTA */}
      {newQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="bg-slate-900 px-5 py-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Nuevo Criterio de Inspección</h3>
              <button onClick={() => setNewQuestionModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Descripción del Criterio *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Ej. ¿Nivel de aceite en varilla de medición correcto?"
                  value={questionData.texto}
                  onChange={(e) => setQuestionData({ ...questionData, texto: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tipo de Respuesta</label>
                  <select
                    value={questionData.tipo}
                    onChange={(e) => setQuestionData({ ...questionData, tipo: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="si_no">Sí / No</option>
                    <option value="opcion">Selección Múltiple</option>
                    <option value="numero">Valor Numérico</option>
                    <option value="foto">Fotografía</option>
                    <option value="texto">Texto Libre</option>
                  </select>
                </div>

                {questionData.tipo === 'si_no' && (
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Valor Conforme</label>
                    <select
                      value={questionData.valor_esperado}
                      onChange={(e) => setQuestionData({ ...questionData, valor_esperado: e.target.value })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                    >
                      <option value="si">SÍ es conforme</option>
                      <option value="no">NO es conforme</option>
                    </select>
                  </div>
                )}
              </div>

              {questionData.tipo === 'opcion' && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Opciones separadas por coma</label>
                  <input
                    type="text"
                    value={questionData.opciones}
                    onChange={(e) => setQuestionData({ ...questionData, opciones: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              )}

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="chk-req-2"
                  checked={questionData.obligatoria}
                  onChange={(e) => setQuestionData({ ...questionData, obligatoria: e.target.checked })}
                  className="rounded text-slate-900 focus:ring-slate-900"
                />
                <label htmlFor="chk-req-2" className="font-medium text-slate-700 cursor-pointer">
                  Respuesta obligatoria para cerrar la inspección
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setNewQuestionModal(false)}
                  className="px-3 py-1.5 text-slate-600 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-lg font-semibold shadow-xs"
                >
                  Guardar Criterio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NUEVA PLANTILLA */}
      {isEditingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="bg-slate-900 px-5 py-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Crear Nueva Plantilla</h3>
              <button onClick={() => setIsEditingModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePlantillaForm} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Título del Checklist *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Inspección de Equipos de Soldadura"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tipo de Activo</label>
                  <input
                    type="text"
                    value={formData.tipo_activo}
                    onChange={(e) => setFormData({ ...formData, tipo_activo: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Código de Norma</label>
                  <input
                    type="text"
                    value={formData.codigo_norma}
                    onChange={(e) => setFormData({ ...formData, codigo_norma: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditingModal(false)}
                  className="px-3 py-1.5 text-slate-600 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-lg font-semibold shadow-xs"
                >
                  Crear Plantilla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE PLANTILLA */}
      {deletingPlantillaId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-5 space-y-3">
            <h3 className="font-bold text-sm text-slate-900">¿Eliminar esta plantilla?</h3>
            <p className="text-xs text-slate-600">
              La plantilla de checklist será removida del catálogo. Las inspecciones históricas previamente generadas con esta plantilla se conservarán.
            </p>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setDeletingPlantillaId(null)}
                className="px-3 py-1 text-xs text-slate-600 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (onDeletePlantilla) onDeletePlantilla(deletingPlantillaId);
                  setDeletingPlantillaId(null);
                  setSelectedPlantilla(plantillas[0] || null);
                }}
                className="bg-rose-700 hover:bg-rose-800 text-white px-3.5 py-1 rounded-lg text-xs font-semibold"
              >
                Confirmar Eliminación
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
