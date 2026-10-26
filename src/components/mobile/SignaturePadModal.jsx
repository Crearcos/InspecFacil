import React, { useRef, useState, useEffect } from 'react';
import { PenTool, RotateCcw, Check, X, ShieldCheck } from 'lucide-react';

export function SignaturePadModal({ isOpen, onClose, onConfirm, inspectorName }) {
  if (!isOpen) return null;

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    // Set display size and actual buffer size for high DPI
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    ctx.strokeStyle = '#0f172a'; // slate-900
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [isOpen]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    let dataUrl;
    if (hasDrawn && canvas) {
      dataUrl = canvas.toDataURL('image/png');
    } else {
      // Auto generated fallback signature stamp if skipped
      dataUrl = `${inspectorName} (Sello Digital Verificado)`;
    }
    onConfirm(dataUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
        
        {/* Header in Crisp White */}
        <div className="bg-white px-6 py-4.5 border-b border-slate-200 text-slate-900 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold shrink-0">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight text-slate-900">Firma Digital del Inspector</h3>
              <p className="text-xs text-slate-500 font-medium">Cierre y certificación técnica del formulario</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Inspector: <strong className="text-slate-900">{inspectorName}</strong></span>
            <span className="text-[11px] text-slate-500">Trazo táctil con el dedo</span>
          </div>

          {/* Canvas area */}
          <div className="relative border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 overflow-hidden touch-none">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-44 cursor-crosshair block"
            />
            
            {/* Guide line */}
            <div className="absolute bottom-6 left-6 right-6 border-b border-slate-300/80 pointer-events-none flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">X Firma autorizada</span>
              <span className="text-[9px] text-slate-400 uppercase tracking-widest">SST Ecuador</span>
            </div>

            {!hasDrawn && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 text-xs font-medium">
                Dibuja tu firma aquí con el dedo o mouse
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleClear}
              className="flex items-center space-x-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold px-2 py-1 rounded hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar firma</span>
            </button>
            <span className="text-[10px] text-slate-400">
              Certificación de campo conforme a norma
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5"
          >
            Volver
          </button>
          
          <button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-md shadow-emerald-600/20"
          >
            <Check className="w-4 h-4" />
            <span>Confirmar y Finalizar</span>
          </button>
        </div>

      </div>
    </div>
  );
}
