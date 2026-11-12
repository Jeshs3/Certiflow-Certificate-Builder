import React, { useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Check,
  Copy,
  Download,
  Eye,
  Loader2,
  Printer,
  RotateCcw,
  Sliders,
  SlidersHorizontal,
} from 'lucide-react';

interface ActionPanelProps {
  onBackToDashboard: () => void;
  onPrint: () => void;
  onDownloadPDF: () => Promise<void>;
  onSaveDraft: () => void;
  onReset: () => void;
  onDuplicateDraft?: () => void;
  activeViewMode?: 'form' | 'style' | 'preview';
  onChangeViewMode?: (mode: 'form' | 'style' | 'preview') => void;
  isSavingDraft?: boolean;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({
  onBackToDashboard,
  onPrint,
  onDownloadPDF,
  onSaveDraft,
  onReset,
  onDuplicateDraft,
  activeViewMode,
  onChangeViewMode,
  isSavingDraft = false,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    await onDownloadPDF();
    setIsDownloading(false);
  };

  const handleSave = () => {
    onSaveDraft();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="no-print bg-white rounded-xl border border-slate-200 shadow-xs px-4 py-3 flex flex-wrap items-center justify-between gap-3">
      {/* Back button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </button>

        {/* Mobile View Switcher */}
        {onChangeViewMode && (
          <div className="lg:hidden flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => onChangeViewMode('form')}
              className={`px-2.5 py-1 text-xs font-medium rounded ${
                activeViewMode === 'form' ? 'bg-white shadow-2xs font-semibold text-slate-900' : 'text-slate-600'
              }`}
            >
              Form
            </button>
            <button
              onClick={() => onChangeViewMode('preview')}
              className={`px-2.5 py-1 text-xs font-medium rounded flex items-center gap-1 ${
                activeViewMode === 'preview' ? 'bg-white shadow-2xs font-semibold text-slate-900' : 'text-slate-600'
              }`}
            >
              <Eye className="w-3 h-3" />
              Preview
            </button>
          </div>
        )}
      </div>

      {/* Main Actions */}
      <div className="flex flex-wrap items-center gap-2">
        {onDuplicateDraft && (
          <button
            type="button"
            onClick={onDuplicateDraft}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Duplicate Draft"
          >
            <Copy className="w-3.5 h-3.5 text-slate-500" />
            <span>Duplicate</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors shadow-2xs"
        >
          {saveSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Saved to Drafts!</span>
            </>
          ) : (
            <>
              <Bookmark className="w-3.5 h-3.5 text-sky-600" />
              <span>Save Draft</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onPrint}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-900 text-white shadow-xs transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Certificate</span>
        </button>

        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-navy-900 bg-[#1E3A8A] hover:bg-[#172554] text-white shadow-xs transition-colors disabled:opacity-75"
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5 text-sky-200" />
              <span>Download PDF</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
