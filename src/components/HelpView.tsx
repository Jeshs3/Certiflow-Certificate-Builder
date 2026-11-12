import React from 'react';
import {
  HelpCircle,
  CheckCircle2,
  Printer,
  Download,
  Sliders,
  FolderOpen,
  Sparkles,
  Info,
  Layers,
  FileCheck,
} from 'lucide-react';

export const HelpView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-semibold mb-3 border border-sky-200">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Certiflow User Guide</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          How to Generate & Print Sagbayan Registry Certificates
        </h1>
        <p className="text-slate-600 mt-2 text-base leading-relaxed">
          Follow these simple steps to enter registry information, preview documents, and produce high-resolution records.
        </p>
      </div>

      {/* 5-Step Process */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Step-by-Step Instructions</h2>

        <div className="grid grid-cols-1 gap-4">
          {/* Step 1 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-navy-900 bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-sm shrink-0">
              1
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Select the Certificate Type</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                From the Dashboard or top navigation bar, choose either <strong>Certificate of Birth</strong> or{' '}
                <strong>Certificate of Marriage</strong>. You can easily switch between them at any time.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-navy-900 bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-sm shrink-0">
              2
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Fill Out Information or Load Sample Data</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Use the categorized tabs to enter personal details, event date and location, and optional remarks.
                To quickly preview the layout without manual data entry, click the <strong>"Load Sample Data"</strong> button
                to populate the form with safe fictional data.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-navy-900 bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-sm shrink-0">
              3
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Customize the Design & Layout</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Toggle the <strong>"Design & Style"</strong> customization drawer or tab to select from 4 distinct template layouts
                (Classic Minimalist, Modern Professional, Simple Administrative, Elegant Decorative), switch between
                Portrait and Landscape orientations, choose your preferred paper size (A4 / Letter), adjust border designs,
                and pick a warm background tone.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-navy-900 bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-sm shrink-0">
              4
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Review Live Interactive Preview</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                On desktop, the live preview renders immediately on the right side of the screen. You can zoom in/out,
                expand into a distraction-free Fullscreen modal, and verify text wrapping and alignment before exporting.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-navy-900 bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-sm shrink-0">
              5
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Print or Download High-Resolution PDF</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Click <strong>"Download PDF"</strong> to save a vector-sharp PDF document formatted specifically to your selected paper size.
                Or click <strong>"Print"</strong> to send the clean certificate straight to your physical or virtual printer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Print Settings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <Printer className="w-5 h-5 text-sky-600" />
          <span>Optimal Browser Print Settings</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          When using the browser print dialog (Ctrl+P / Cmd+P), configure these recommended settings for best quality:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-800 block">Background Graphics:</span>
            <span className="text-slate-600">Ensure <strong>"Background graphics"</strong> is checked so borders and parchment tones print accurately.</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-800 block">Margins:</span>
            <span className="text-slate-600">Select <strong>"None"</strong> or <strong>"Default"</strong> (the template contains built-in inner borders).</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-800 block">Paper Size:</span>
            <span className="text-slate-600">Match the paper size in printer settings (A4 or US Letter) to what you picked in the template.</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-800 block">Headers & Footers:</span>
            <span className="text-slate-600">Uncheck browser headers/footers (e.g. date & URL) for a clean presentation.</span>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h3 className="font-bold text-slate-900 text-lg">Frequently Asked Questions</h3>

        <div className="space-y-3 text-xs sm:text-sm text-slate-600">
          <div>
            <h4 className="font-semibold text-slate-800">Can I use these certificates for legal purposes?</h4>
            <p className="mt-0.5 leading-relaxed">
              No. Generated documents are strictly non-official sample templates intended for demonstration,
              film props, and educational instruction only. They carry no legal validity.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <h4 className="font-semibold text-slate-800">Where are my drafts saved?</h4>
            <p className="mt-0.5 leading-relaxed">
              Drafts are saved locally in your web browser using HTML5 LocalStorage. Clearing your browser's site data
              or clicking "Clear All Drafts" will remove them.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <h4 className="font-semibold text-slate-800">Can I customize the wording on the certificate?</h4>
            <p className="mt-0.5 leading-relaxed">
              Yes. You can edit the certificate title, subtitle, field values, and administrative remarks directly.
              The SAMPLE watermark is permanent to preserve compliance with ethical document safety rules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
