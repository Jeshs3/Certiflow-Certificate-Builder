import React from 'react';
import { CertificateType, SavedDraft } from '../types/certificate';
import { getSavedDrafts } from '../utils/certificateUtils';
import {
  Baby,
  Heart,
  ArrowRight,
  ShieldAlert,
  Clock,
  CheckCircle,
  HelpCircle,
  Award,
  FileCheck2,
} from 'lucide-react';

interface DashboardViewProps {
  onSelectGenerator: (type: CertificateType) => void;
  onViewDrafts: () => void;
  onViewHelp: () => void;
  onLoadDraft: (draft: SavedDraft) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectGenerator,
  onViewDrafts,
  onViewHelp,
  onLoadDraft,
}) => {
  const drafts = getSavedDrafts();
  const recentDrafts = drafts.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#172554] via-[#1E3A8A] to-[#1E40AF] text-white p-6 sm:p-8 shadow-md">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold text-sky-200 border border-white/20">
            <FileCheck2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Certiflow: Sagbayan Civil Documents</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Create, Organize, Print
          </h1>

          <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-medium">
            Generate and manage official civil registry documents for the Municipality of Sagbayan with real-time verification and high-resolution printing.
          </p>
        </div>

        {/* Decorative background watermark graphic */}
        <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none text-white">
          <Award className="w-80 h-80" />
        </div>
      </div>

      {/* Confidential Document Notice */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-start gap-3 shadow-xs">
        <ShieldAlert className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-950 space-y-1">
          <p className="font-bold uppercase tracking-wide text-amber-900">Confidential Document Notice</p>
          <p className="text-amber-900 leading-relaxed">
            This system contains confidential civil registry records. Any unauthorized persons attempting access, reproduction, alteration, or disclosure are strictly prohibited and subject to legal prosecution under data privacy laws.
          </p>
        </div>
      </div>

      {/* Two Main Certificate Generator Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Certiflow Document Registry
          </h2>
          <span className="text-xs text-slate-500 font-medium">Select a certificate to generate</span>
        </div>

        <div className="flex flex-col gap-4">
          {/* Card 1: Certificate of Live Birth */}
          <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-sky-400 p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                <Baby className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  Certificate of Live Birth
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Municipal Form No. 102 &bull; Civil Registry of Sagbayan, Bohol
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectGenerator('birth')}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-[#1E3A8A] hover:bg-[#172554] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors shrink-0"
            >
              <span>Create Birth Certificate</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 2: Certificate of Marriage */}
          <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-rose-400 p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-rose-700 transition-colors">
                  Certificate of Marriage
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Municipal Form No. 97 &bull; Civil Registry of Sagbayan, Bohol
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectGenerator('marriage')}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors shrink-0"
            >
              <span>Create Marriage Certificate</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Drafts Section */}
      {recentDrafts.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Recently Saved Drafts
              </h3>
            </div>
            <button
              onClick={onViewDrafts}
              className="text-xs font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1"
            >
              <span>View All ({drafts.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recentDrafts.map((draft) => {
              const isBirth = draft.type === 'birth';
              const name = isBirth
                ? draft.birthData?.child.fullName || draft.birthData?.child.firstName || 'Untitled Birth'
                : `${draft.marriageData?.groom.firstName || 'Groom'} & ${draft.marriageData?.bride.firstName || 'Bride'}`;

              return (
                <div
                  key={draft.id}
                  onClick={() => onLoadDraft(draft)}
                  className="p-3 rounded-xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50/40 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                        isBirth ? 'bg-sky-100 text-sky-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isBirth ? 'Birth' : 'Marriage'}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-sky-800">
                      {name}
                    </h4>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Workflow Process Guide */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Certiflow Workflow
          </h3>
          <button
            onClick={onViewHelp}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Instructions</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-1.5">
            <span className="font-bold text-sky-800 text-xs">1. Enter Registry Information</span>
            <p className="text-slate-600 leading-relaxed text-xs">
              Complete the required individual, parental, attendant, and civil registry record fields.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-1.5">
            <span className="font-bold text-sky-800 text-xs">2. Format & Verify Details</span>
            <p className="text-slate-600 leading-relaxed text-xs">
              Review formatting, page layout orientation, and affidavit jurat particulars in the live preview.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-1.5">
            <span className="font-bold text-sky-800 text-xs">3. Download PDF or Print</span>
            <p className="text-slate-600 leading-relaxed text-xs">
              Export standard high-resolution PDF documents or send directly to the printer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
