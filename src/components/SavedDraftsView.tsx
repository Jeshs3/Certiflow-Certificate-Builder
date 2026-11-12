import React, { useState } from 'react';
import { CertificateType, SavedDraft } from '../types/certificate';
import { clearAllDrafts, deleteDraft, duplicateDraft, getSavedDrafts } from '../utils/certificateUtils';
import {
  Baby,
  Heart,
  Calendar,
  Copy,
  Trash2,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  FolderOpen,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

interface SavedDraftsViewProps {
  onLoadDraft: (draft: SavedDraft) => void;
  onNavigateToGenerator: (type: CertificateType) => void;
}

export const SavedDraftsView: React.FC<SavedDraftsViewProps> = ({
  onLoadDraft,
  onNavigateToGenerator,
}) => {
  const [drafts, setDrafts] = useState<SavedDraft[]>(getSavedDrafts());
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    const updated = deleteDraft(id);
    setDrafts(updated);
    setDeleteTargetId(null);
  };

  const handleDuplicate = (id: string) => {
    const copy = duplicateDraft(id);
    if (copy) {
      setDrafts(getSavedDrafts());
    }
  };

  const handleClearAll = () => {
    clearAllDrafts();
    setDrafts([]);
    setShowClearConfirm(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <FolderOpen className="w-7 h-7 text-sky-600" />
            Certiflow Saved Registry Drafts
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Access, edit, duplicate, and manage your saved civil registry documents.
          </p>
        </div>

        {drafts.length > 0 && (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Drafts</span>
          </button>
        )}
      </div>

      {/* Privacy Notice Card */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-emerald-900 space-y-1">
          <p className="font-semibold">Local Privacy Guarantee</p>
          <p className="text-emerald-800/90 leading-relaxed">
            All civil registry records and drafts are stored strictly inside your browser's private localStorage.
            No personal information or registry records are ever uploaded to any external server.
          </p>
        </div>
      </div>

      {/* Drafts List or Empty State */}
      {drafts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-4 max-w-lg mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <FolderOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">No Saved Drafts Yet</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            When you create a certificate of birth or marriage, click "Save Draft" in the editor
            to preserve your work locally for future editing and printing.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigateToGenerator('birth')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-colors"
            >
              <Baby className="w-4 h-4" />
              <span>Create Birth Certificate</span>
            </button>
            <button
              onClick={() => onNavigateToGenerator('marriage')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>Create Marriage Certificate</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drafts.map((draft) => {
            const isBirth = draft.type === 'birth';
            const subjectName = isBirth
              ? draft.birthData?.child.fullName ||
                draft.birthData?.child.firstName ||
                'Untitled Birth Draft'
              : `${draft.marriageData?.groom.firstName || 'Groom'} & ${draft.marriageData?.bride.firstName || 'Bride'}`;

            const dateStr = isBirth
              ? draft.birthData?.child.dateOfBirth
              : draft.marriageData?.marriage.dateOfMarriage;

            const updatedDate = new Date(draft.updatedAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={draft.id}
                className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all p-4 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        isBirth
                          ? 'bg-sky-50 text-sky-700 border border-sky-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {isBirth ? <Baby className="w-3.5 h-3.5" /> : <Heart className="w-3.5 h-3.5" />}
                      <span>{isBirth ? 'Certificate of Birth' : 'Certificate of Marriage'}</span>
                    </span>

                    <span className="text-[10px] text-slate-400 font-mono">
                      {draft.style.paperSize.toUpperCase()} &bull; {draft.style.pageOrientation}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base line-clamp-1">
                    {subjectName}
                  </h3>

                  <div className="text-xs text-slate-500 space-y-0.5">
                    {dateStr && (
                      <p className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>Event Date: {dateStr}</span>
                      </p>
                    )}
                    <p className="text-[11px] text-slate-400">Last updated: {updatedDate}</p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleDuplicate(draft.id)}
                      title="Duplicate Draft"
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(draft.id)}
                      title="Delete Draft"
                      className="p-1.5 text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onLoadDraft(draft)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors"
                  >
                    <span>Edit & Preview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Single Draft Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900">Delete this draft?</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              This draft will be removed from your browser's local storage. This action cannot be reversed.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTargetId(null)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteTargetId)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white"
              >
                Delete Draft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900">Clear All Saved Drafts?</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Are you sure you want to delete all saved drafts? All certificate draft data stored in your browser will be permanently cleared.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white"
              >
                Yes, Clear Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
