import React, { useState } from 'react';
import {
  BirthCertificateData,
  CertificateStyle,
  CertificateType,
  MarriageCertificateData,
} from '../types/certificate';
import { BirthCertificateTemplate } from './BirthCertificateTemplate';
import { MarriageCertificateTemplate } from './MarriageCertificateTemplate';
import { downloadCertificatePDF, printCertificate } from '../utils/certificateUtils';
import {
  Download,
  Eye,
  Maximize2,
  Minimize2,
  Printer,
  RotateCw,
  ZoomIn,
  ZoomOut,
  FileCheck2,
  Loader2,
} from 'lucide-react';

interface CertificatePreviewProps {
  type: CertificateType;
  birthData?: BirthCertificateData;
  marriageData?: MarriageCertificateData;
  style: CertificateStyle;
  onUpdateStyle?: (updates: Partial<CertificateStyle>) => void;
  documentTitle?: string;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  type,
  birthData,
  marriageData,
  style,
  onUpdateStyle,
  documentTitle = 'Sample Certificate',
}) => {
  const [zoom, setZoom] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  const [colbPage, setColbPage] = useState<'page1' | 'page2' | 'both'>('page1');

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 160));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 60));
  const handleZoomReset = () => setZoom(100);

  const handlePrint = () => {
    printCertificate();
  };

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    setExportSuccess(false);

    const filename = `${type === 'birth' ? (style.templateId === 'ph-colb-102' ? 'PH_Form102_Birth_Certificate' : 'Sample_Birth_Certificate') : 'Sample_Marriage_Certificate'}_${Date.now()}`;
    const success = await downloadCertificatePDF(
      'printable-certificate',
      filename,
      style.paperSize,
      style.pageOrientation
    );

    setIsExporting(false);
    if (success) {
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3500);
    }
  };

  const toggleOrientation = () => {
    if (onUpdateStyle) {
      onUpdateStyle({
        pageOrientation: style.pageOrientation === 'portrait' ? 'landscape' : 'portrait',
      });
    }
  };

  const isColb = type === 'birth' && style.templateId === 'ph-colb-102';

  return (
    <div className="flex flex-col h-full bg-slate-100 rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Top Toolbar */}
      <div className="no-print bg-white border-b border-slate-200 px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            Live Preview
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
            {style.paperSize.toUpperCase()} &bull; {style.pageOrientation}
          </span>

          {/* Form Page Switcher for COLB 102 and COM 97 */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setColbPage('page1')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                colbPage === 'page1'
                  ? type === 'birth'
                    ? 'bg-green-700 text-white shadow-xs'
                    : 'bg-rose-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              Page 1 (Front)
            </button>
            <button
              type="button"
              onClick={() => setColbPage('page2')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                colbPage === 'page2'
                  ? type === 'birth'
                    ? 'bg-green-700 text-white shadow-xs'
                    : 'bg-rose-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              Page 2 (Affidavits)
            </button>
            <button
              type="button"
              onClick={() => setColbPage('both')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                colbPage === 'both'
                  ? type === 'birth'
                    ? 'bg-green-700 text-white shadow-xs'
                    : 'bg-rose-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              Both Pages
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 60}
              className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-40"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span
              onClick={handleZoomReset}
              className="text-[11px] font-mono px-1.5 text-slate-700 cursor-pointer select-none"
              title="Reset Zoom"
            >
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 160}
              className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-40"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Orientation switch */}
          {onUpdateStyle && (
            <button
              onClick={toggleOrientation}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
              title="Toggle Portrait / Landscape"
            >
              <RotateCw className="w-3 h-3" />
              <span className="hidden md:inline">Rotate</span>
            </button>
          )}

          {/* Fullscreen modal toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Preview'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-900 text-white shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-navy-800 bg-[#1E3A8A] hover:bg-[#172554] text-white shadow-xs transition-colors disabled:opacity-75"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Exporting...</span>
              </>
            ) : exportSuccess ? (
              <>
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Saved PDF!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Preview Container with scroll and zoom */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-slate-200/70">
        <div
          className="transition-transform duration-200 ease-out origin-top flex flex-col items-center justify-center gap-6"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {/* Printable Certificate Sheet */}
          <div
            id="printable-certificate"
            className="bg-white shadow-2xl rounded-sm transition-all duration-200 relative select-text"
            style={{
              width: style.pageOrientation === 'landscape' ? '820px' : '620px',
              maxWidth: '100%',
              minHeight: style.pageOrientation === 'landscape' ? '580px' : '840px',
            }}
          >
            {type === 'birth' && birthData && (
              <>
                {colbPage === 'both' && isColb ? (
                  <div className="space-y-8">
                    <BirthCertificateTemplate data={birthData} style={style} page="page1" />
                    <div className="no-print border-t-4 border-dashed border-slate-300 my-4 text-center py-2 text-xs font-mono text-slate-400">
                      --- BACK OF FORM (PAGE 2) ---
                    </div>
                    <BirthCertificateTemplate data={birthData} style={style} page="page2" />
                  </div>
                ) : (
                  <BirthCertificateTemplate
                    data={birthData}
                    style={style}
                    page={colbPage === 'page2' ? 'page2' : 'page1'}
                  />
                )}
              </>
            )}
            {type === 'marriage' && marriageData && (
              <>
                {colbPage === 'both' ? (
                  <div className="space-y-8">
                    <MarriageCertificateTemplate data={marriageData} style={style} page="page1" />
                    <div className="no-print border-t-4 border-dashed border-rose-300 my-4 text-center py-2 text-xs font-mono text-rose-500">
                      --- BACK OF FORM (PAGE 2 - AFFIDAVITS & WITNESSES) ---
                    </div>
                    <MarriageCertificateTemplate data={marriageData} style={style} page="page2" />
                  </div>
                ) : (
                  <MarriageCertificateTemplate
                    data={marriageData}
                    style={style}
                    page={colbPage === 'page2' ? 'page2' : 'page1'}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex flex-col p-4 sm:p-6">
          <div className="flex items-center justify-between pb-3 text-white border-b border-slate-700">
            <div>
              <h3 className="font-semibold text-lg">{documentTitle}</h3>
              <p className="text-xs text-slate-300">
                Sample Template Preview &bull; {style.paperSize.toUpperCase()} &bull; {style.pageOrientation}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 text-xs font-semibold rounded bg-white text-slate-900 hover:bg-slate-100 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Print
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={isExporting}
                className="px-3 py-1.5 text-xs font-semibold rounded bg-sky-600 text-white hover:bg-sky-500 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </button>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto flex items-center justify-center p-4">
            <div
              className="bg-white shadow-2xl rounded"
              style={{
                width: style.pageOrientation === 'landscape' ? '880px' : '680px',
                maxWidth: '100%',
              }}
            >
              {type === 'birth' && birthData && (
                <BirthCertificateTemplate data={birthData} style={style} />
              )}
              {type === 'marriage' && marriageData && (
                <MarriageCertificateTemplate data={marriageData} style={style} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
