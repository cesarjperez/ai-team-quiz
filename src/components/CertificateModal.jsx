import React, { useEffect, useRef, useState } from 'react';
import { X, Download, Copy, Check, UserPen } from 'lucide-react';
import { buildShareText, renderCredentialCanvas } from '../utils/certificateGenerator';

export default function CertificateModal({ isOpen, onClose, state, onEditProfile }) {
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      renderCredentialCanvas(canvasRef.current, state);
    }
  }, [isOpen, state]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const safeName = (state.profile.name || 'equipo-ia')
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, '-');
    const link = document.createElement('a');
    link.download = `credencial-ai-nexus-${safeName}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildShareText(state));
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Ignorar si clipboard no está disponible
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-up">
      <div className="glass-panel w-full max-w-3xl rounded-3xl p-6 sm:p-8 relative border border-cyan-400/30 max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-mono-tech font-semibold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 mb-2">
            Compartir con el Equipo
          </span>
          <h2 className="text-2xl font-display font-bold text-white">
            Tu Credencial Técnica de IA
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Descarga tu tarjeta en alta definición (PNG) o copia tu resumen para Slack, Teams o WhatsApp.
          </p>
        </div>

        {/* Canvas Preview */}
        <div className="rounded-2xl overflow-hidden border border-white/15 bg-slate-950 shadow-2xl mb-6">
          <canvas
            ref={canvasRef}
            className="w-full h-auto block"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onEditProfile();
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-white/10 transition cursor-pointer"
          >
            <UserPen className="w-4 h-4 text-cyan-300" />
            Personalizar Nombre / Avatar
          </button>

          <div className="flex flex-wrap items-center gap-3 ml-auto">
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-cyan-200 border border-cyan-400/30 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  ¡Copiado al portapapeles!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-cyan-300" />
                  Copiar Resumen (Slack / Teams)
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 text-slate-950 hover:opacity-95 shadow-[0_0_25px_rgba(34,211,238,0.35)] transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Descargar PNG HD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
