import React from 'react';
import {
  ShieldAlert,
  Info,
  CheckCircle2,
  FileText,
  Lock,
  Sparkles,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-semibold mb-3 border border-sky-200">
          <Info className="w-3.5 h-3.5" />
          <span>Certiflow Civil Registry System</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Certiflow: Sagbayan Documents
        </h1>
        <p className="text-slate-600 mt-2 text-base leading-relaxed">
          Civil Registry Document Management & Printing System for the Municipality of Sagbayan, Bohol.
          Create, organize, and print standardized civil registry certificates.
        </p>
      </div>

      {/* Prominent Legal Disclaimer Callout */}
      <div className="bg-amber-50/80 border-2 border-amber-300/80 rounded-2xl p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-base sm:text-lg">
          <ShieldAlert className="w-6 h-6 text-amber-700 shrink-0" />
          <span>Important Legal & Compliance Notice</span>
        </div>
        <p className="text-sm text-amber-900/90 leading-relaxed font-medium">
          "This application is designed exclusively for creating sample certificate templates for
          educational, demonstration, and personal design purposes. Generated documents are not
          official birth or marriage certificates and cannot be used as legal proof of birth,
          marriage, identity, or civil status. For authentic civil registry documents, contact
          the appropriate government civil registry office."
        </p>
        <p className="text-xs text-amber-800/80 pt-1 border-t border-amber-200">
          All generated sample certificates are permanently watermarked and clearly labeled as non-official
          specimens. The system does not imitate government seals, security watermarks, or official credentials.
        </p>
      </div>

      {/* Purpose & Target Use Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-700 font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">Educational & Classroom Training</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Ideal for educators teaching public administration, genealogy research, record archiving,
            and legal documentation workflows without handling sensitive real-world records.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">Media & Prop Design</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Provides realistic, aesthetically pleasing document specimens for theater, film,
            novels, ceremonial keepsakes, and graphic design mockups.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">100% Client-Side Privacy</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Everything you type remains solely inside your browser's private memory or local storage.
            Data is never transmitted across the network, ensuring zero external data collection.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-700 font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">Precision PDF & Print Engine</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Engineered with high-DPI canvas rasterization, vector typography, and print-media CSS
            to produce crisp physical prints on A4 or US Letter paper.
          </p>
        </div>
      </div>

      {/* Guidelines & Safety Commitments */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h3 className="font-bold text-slate-900 text-lg">Ethical Document Standards</h3>
        <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Permanent Specimen Markings:</strong> Every certificate generated features a visible
              diagonal watermark and explicit header/footer disclaimers.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>No Government Imitation:</strong> We intentionally do not reproduce real national coats
              of arms, governmental agency seals, security barcodes, or official serial registries.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Sample Data Safety:</strong> Pre-loaded sample presets use fictitious names and places
              to facilitate testing without exposing anyone's identity.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
