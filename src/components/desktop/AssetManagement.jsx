import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  QrCode, 
  Edit, 
  Trash2, 
  History, 
  Wrench, 
  X, 
  Check, 
  AlertTriangle,
  FileText,
  Printer,
  Power,
  Play
} from 'lucide-react';
import { formatDateTimeDMY } from '../../data/seedData';

export function AssetManagement({ 
  activos, 
  plantillas, 
  inspecciones, 
  onSaveActivo, 
  onDeleteActivo, 
  onToggleActivoEstado,
  onViewPdf,
  onStartInspection
}) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('todos');
  const [selectedAssetForHistory, setSelectedAssetForHistory] = useState(null);
  const [selectedAssetForQr, setSelectedAssetForQr] = useState(null);
  const [editingAsset, setEditingAsset] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Asset Form State
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    tipo: 'Montacargas',
    ubicacion: '',
    marca: '',
    modelo: '',
    serie: '',
    ano: 2023,
    plantilla_id: ''
  });

  const uniqueTypes = ['todos', ...Array.from(new Set(activos.map(a => a.tipo)))];

  const filtered = activos.filter(a => {
    const matchesSearch = 
      a.codigo.toLowerCase().includes(search.toLowerCase()) ||
      a.nombre.toLowerCase().includes(search.toLowerCase()) ||
      a.ubicacion.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'todos' || a.tipo === filterType;
    return matchesSearch && matchesType;
  });

  const handleOpenCreate = () => {
    setFormData({
      codigo: `ACT-${String(activos.length + 1).padStart(2, '0')}`,
      nombre: '',
      tipo: 'Montacargas',
      ubicacion: '',
      marca: '',
      modelo: '',
      serie: '',
      ano: 2024,
      plantilla_id: plantillas[0]?.id || ''
    });
    setEditingAsset(null);
    setIsCreating(true);
  };

  const handleOpenEdit = (asset) => {
    setFormData({
      codigo: asset.codigo,
      nombre: asset.nombre,
      tipo: asset.tipo,
      ubicacion: asset.ubicacion,
      marca: asset.marca || '',
      modelo: asset.modelo || '',
      serie: asset.serie || '',
      ano: asset.ano || 2023,
      plantilla_id: asset.plantilla_id || ''
    });
    setEditingAsset(asset);
    setIsCreating(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.codigo || !formData.nombre) return;

    onSaveActivo({
      ...(editingAsset ? { id: editingAsset.id } : {}),
      ...formData
    });
    setIsCreating(false);
    setEditingAsset(null);
  };

  const confirmDelete = () => {
    if (deletingId) {
      onDeleteActivo(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Action and Filter Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input 
            type="text"
            placeholder="Buscar por código, descripción o ubicación técnica..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Type Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {uniqueTypes.map(t => (
              <option key={t} value={t}>
                {t === 'todos' ? 'Todos los tipos' : t}
              </option>
            ))}
          </select>
        </div>

        {/* Add Asset Button */}
        <button
          onClick={handleOpenCreate}
          className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4 text-sky-400" />
          <span>Registrar Activo</span>
        </button>

      </div>

      {/* Asset Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Equipo / Denominación</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4">Ubicación Técnica</th>
                <th className="py-3 px-4">Estado Operativo</th>
                <th className="py-3 px-4 text-center">Identificador QR</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    No se encontraron activos con el criterio de búsqueda.
                  </td>
                </tr>
              ) : (
                filtered.map((asset) => {
                  return (
                    <tr key={asset.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {asset.codigo}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{asset.nombre}</div>
                        <div className="text-[11px] text-slate-400">
                          {asset.marca} {asset.modelo} {asset.serie ? `• Serie: ${asset.serie}` : ''}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                          {asset.tipo}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {asset.ubicacion}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          asset.estado === 'operativo'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${asset.estado === 'operativo' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                          {asset.estado === 'operativo' ? 'Operativo' : 'En Revisión'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => setSelectedAssetForQr(asset)}
                          className="px-2 py-1 hover:bg-slate-100 text-slate-700 rounded transition-colors inline-flex items-center space-x-1"
                          title="Ver QR"
                        >
                          <QrCode className="w-3.5 h-3.5 text-slate-500" />
                          <span className="text-[10px] font-mono text-slate-500">{asset.codigo_qr}</span>
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          {onStartInspection && (
                            <button
                              onClick={() => onStartInspection(asset)}
                              className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                              title="Ejecutar Inspección Técnica (Checklist)"
                            >
                              <Play className="w-3.5 h-3.5 fill-blue-600" />
                            </button>
                          )}
                          <button
                            onClick={() => onToggleActivoEstado && onToggleActivoEstado(asset.id)}
                            className={`p-1.5 rounded transition-colors ${
                              asset.estado === 'operativo' 
                                ? 'text-emerald-700 hover:bg-emerald-50' 
                                : 'text-slate-400 hover:text-emerald-700 hover:bg-slate-100'
                            }`}
                            title={asset.estado === 'operativo' ? "Desactivar Activo" : "Activar Activo"}
                          >
                            <Power className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setSelectedAssetForHistory(asset)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                            title="Historial de Inspecciones"
                          >
                            <History className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(asset)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingId(asset.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded transition-colors"
                            title="Eliminar con Confirmación"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: HISTORIAL DEL ACTIVO */}
      {selectedAssetForHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-bold text-sm">Historial Técnico: {selectedAssetForHistory.codigo}</h3>
                <p className="text-xs text-slate-400">{selectedAssetForHistory.nombre}</p>
              </div>
              <button 
                onClick={() => setSelectedAssetForHistory(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-2.5">
              {(() => {
                const history = inspecciones.filter(i => 
                  i.activo_id === selectedAssetForHistory.id || 
                  i.activo_codigo === selectedAssetForHistory.codigo
                );

                if (history.length === 0) {
                  return (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      No hay inspecciones registradas para este activo.
                    </div>
                  );
                }

                return history.map((insp) => (
                  <div 
                    key={insp.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between hover:bg-slate-100/70 transition-colors"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-xs text-slate-900">{insp.codigo_folio}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          insp.resultado === 'conforme' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          {insp.resultado === 'conforme' ? 'Conforme' : 'No Conforme'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 mt-0.5">{insp.plantilla_nombre}</p>
                      <p className="text-[10px] text-slate-400">
                        {formatDateTimeDMY(insp.fecha_fin || insp.fecha_inicio)} • Inspector: {insp.inspector_nombre}
                      </p>
                    </div>

                    <button
                      onClick={() => onViewPdf(insp)}
                      className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 px-2.5 py-1 rounded text-xs font-semibold flex items-center space-x-1 shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span>PDF</span>
                    </button>
                  </div>
                ));
              })()}
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedAssetForHistory(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-1.5 rounded text-xs font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: QR */}
      {selectedAssetForQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full overflow-hidden border border-slate-200 text-center">
            <div className="bg-slate-900 px-5 py-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider">Etiqueta de Activo</h3>
              <button 
                onClick={() => setSelectedAssetForQr(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 inline-block">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(selectedAssetForQr.codigo_qr)}`} 
                  alt="QR Code"
                  className="w-36 h-36 object-contain mx-auto"
                />
              </div>

              <div>
                <span className="font-mono text-sm font-bold text-slate-900 block">
                  {selectedAssetForQr.codigo_qr}
                </span>
                <p className="font-semibold text-slate-800 text-xs mt-0.5">{selectedAssetForQr.nombre}</p>
                <p className="text-[11px] text-slate-500">{selectedAssetForQr.ubicacion}</p>
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedAssetForQr(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-1.5 rounded text-xs font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: FORMULARIO ACTIVO */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">
                {editingAsset ? 'Editar Activo' : 'Nuevo Activo en Planta'}
              </h3>
              <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="p-6 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Código Interno *</label>
                  <input
                    type="text"
                    required
                    value={formData.codigo}
                    onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none uppercase font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tipo de Activo *</label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  >
                    <option value="Montacargas">Montacargas</option>
                    <option value="Extintor">Extintor</option>
                    <option value="Generador">Generador</option>
                    <option value="Compresor">Compresor</option>
                    <option value="Tableros Eléctricos">Tableros Eléctricos</option>
                    <option value="Seguridad General">Seguridad General</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombre Descriptivo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Montacargas Toyota 8FGU25 #01"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ubicación en Planta *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Bodega Central - Nave 2"
                  value={formData.ubicacion}
                  onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Marca</label>
                  <input
                    type="text"
                    value={formData.marca}
                    onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Modelo</label>
                  <input
                    type="text"
                    value={formData.modelo}
                    onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Año</label>
                  <input
                    type="number"
                    value={formData.ano}
                    onChange={(e) => setFormData({ ...formData, ano: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-3 py-1.5 text-slate-600 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-1.5 rounded-lg font-semibold transition-colors"
                >
                  Guardar Activo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-5 space-y-3">
            <h3 className="font-bold text-sm text-slate-900">¿Eliminar este activo?</h3>
            <p className="text-xs text-slate-600">
              El equipo será removido del inventario activo. El historial de inspecciones previas se conservará para fines de auditoría.
            </p>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-3 py-1 text-xs text-slate-600 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="bg-rose-700 hover:bg-rose-800 text-white px-3.5 py-1 rounded-lg text-xs font-semibold"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
