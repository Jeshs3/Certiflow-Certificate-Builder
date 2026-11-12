/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  BirthCertificateData,
  CertificateStyle,
  CertificateType,
  MarriageCertificateData,
  SavedDraft,
} from './types/certificate';
import {
  DEFAULT_BIRTH_STYLE,
  DEFAULT_MARRIAGE_STYLE,
  INITIAL_BIRTH_DATA,
  INITIAL_MARRIAGE_DATA,
  SAMPLE_BIRTH_DATA,
  SAMPLE_MARRIAGE_DATA,
} from './utils/sampleData';
import {
  downloadCertificatePDF,
  getSavedDrafts,
  getSessionCount,
  printCertificate,
  saveDraft,
} from './utils/certificateUtils';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { BirthCertificateForm } from './components/BirthCertificateForm';
import { MarriageCertificateForm } from './components/MarriageCertificateForm';
import { CertificatePreview } from './components/CertificatePreview';
import { ActionPanel } from './components/ActionPanel';
import { SavedDraftsView } from './components/SavedDraftsView';
import { AboutView } from './components/AboutView';
import { HelpView } from './components/HelpView';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<
    'dashboard' | 'birth' | 'marriage' | 'drafts' | 'about' | 'help'
  >('dashboard');

  // Birth Certificate State
  const [birthData, setBirthData] = useState<BirthCertificateData>(INITIAL_BIRTH_DATA);
  const [birthStyle, setBirthStyle] = useState<CertificateStyle>(DEFAULT_BIRTH_STYLE);

  // Marriage Certificate State
  const [marriageData, setMarriageData] = useState<MarriageCertificateData>(INITIAL_MARRIAGE_DATA);
  const [marriageStyle, setMarriageStyle] = useState<CertificateStyle>(DEFAULT_MARRIAGE_STYLE);

  // Active Draft tracking
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
  const [draftsCount, setDraftsCount] = useState<number>(0);

  // Mobile view switcher: 'form' | 'preview'
  const [mobileViewMode, setMobileViewMode] = useState<'form' | 'style' | 'preview'>('form');

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  useEffect(() => {
    const list = getSavedDrafts();
    setDraftsCount(list.length);
  }, [currentView]);

  // Load an existing draft
  const handleLoadDraft = (draft: SavedDraft) => {
    setActiveDraftId(draft.id);
    if (draft.type === 'birth' && draft.birthData) {
      setBirthData(draft.birthData);
      setBirthStyle(draft.style || DEFAULT_BIRTH_STYLE);
      setCurrentView('birth');
    } else if (draft.type === 'marriage' && draft.marriageData) {
      setMarriageData(draft.marriageData);
      setMarriageStyle(draft.style || DEFAULT_MARRIAGE_STYLE);
      setCurrentView('marriage');
    }
    setMobileViewMode('form');
    showToast(`Loaded draft: ${draft.title}`, 'info');
  };

  // Save current work as draft
  const handleSaveDraft = () => {
    const isBirth = currentView === 'birth';
    const draftId = activeDraftId || 'draft_' + Date.now();
    setActiveDraftId(draftId);

    const title = isBirth
      ? birthData.child.fullName || birthData.child.firstName || 'Untitled Birth Certificate'
      : `${marriageData.groom.firstName || 'Groom'} & ${marriageData.bride.firstName || 'Bride'}`;

    const newDraft: SavedDraft = {
      id: draftId,
      type: isBirth ? 'birth' : 'marriage',
      title,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      birthData: isBirth ? birthData : undefined,
      marriageData: !isBirth ? marriageData : undefined,
      style: isBirth ? birthStyle : marriageStyle,
    };

    saveDraft(newDraft);
    const updatedDrafts = getSavedDrafts();
    setDraftsCount(updatedDrafts.length);
    showToast('Draft successfully saved to local storage!');
  };

  // Reset Birth Form
  const handleResetBirth = () => {
    setBirthData(INITIAL_BIRTH_DATA);
    setActiveDraftId(null);
    showToast('Birth form cleared to blank state', 'info');
  };

  // Reset Marriage Form
  const handleResetMarriage = () => {
    setMarriageData(INITIAL_MARRIAGE_DATA);
    setActiveDraftId(null);
    showToast('Marriage form cleared to blank state', 'info');
  };

  // Trigger Print
  const handlePrint = () => {
    printCertificate();
  };

  // Trigger Download PDF
  const handleDownloadPDF = async () => {
    const isBirth = currentView === 'birth';
    const filename = `${isBirth ? 'Sample_Birth_Certificate' : 'Sample_Marriage_Certificate'}_${Date.now()}`;
    const style = isBirth ? birthStyle : marriageStyle;

    const success = await downloadCertificatePDF(
      'printable-certificate',
      filename,
      style.paperSize,
      style.pageOrientation
    );

    if (success) {
      showToast('PDF downloaded successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          setMobileViewMode('form');
        }}
        draftsCount={draftsCount}
        sessionCount={getSessionCount()}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 right-4 z-50 animate-bounce duration-300">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xl border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage.text}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* VIEW 1: DASHBOARD */}
        {currentView === 'dashboard' && (
          <DashboardView
            onSelectGenerator={(type) => {
              setCurrentView(type);
              setMobileViewMode('form');
            }}
            onViewDrafts={() => setCurrentView('drafts')}
            onViewHelp={() => setCurrentView('help')}
            onLoadDraft={handleLoadDraft}
          />
        )}

        {/* VIEW 2: BIRTH CERTIFICATE GENERATOR */}
        {currentView === 'birth' && (
          <div className="max-w-[1600px] w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 flex-1 flex flex-col space-y-4">
            {/* Top Action Panel */}
            <ActionPanel
              onBackToDashboard={() => setCurrentView('dashboard')}
              onPrint={handlePrint}
              onDownloadPDF={handleDownloadPDF}
              onSaveDraft={handleSaveDraft}
              onReset={handleResetBirth}
              activeViewMode={mobileViewMode}
              onChangeViewMode={setMobileViewMode}
            />

            {/* Split Screen Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
              {/* Left Column: Official Form Registry */}
              <div
                className={`lg:col-span-5 space-y-4 ${
                  mobileViewMode === 'preview' ? 'hidden lg:block' : 'block'
                }`}
              >
                <BirthCertificateForm
                  data={birthData}
                  onChange={setBirthData}
                  onReset={handleResetBirth}
                  onPreview={() => setMobileViewMode('preview')}
                  onSaveDraft={handleSaveDraft}
                />
              </div>

              {/* Right Column: Live Interactive Preview */}
              <div
                className={`lg:col-span-7 sticky top-20 ${
                  mobileViewMode === 'preview' ? 'block' : 'hidden lg:block'
                }`}
              >
                <CertificatePreview
                  type="birth"
                  birthData={birthData}
                  style={birthStyle}
                  onUpdateStyle={(updates) => setBirthStyle({ ...birthStyle, ...updates })}
                  documentTitle={birthData.child.fullName || 'Certificate of Live Birth'}
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: MARRIAGE CERTIFICATE GENERATOR */}
        {currentView === 'marriage' && (
          <div className="max-w-[1600px] w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 flex-1 flex flex-col space-y-4">
            {/* Top Action Panel */}
            <ActionPanel
              onBackToDashboard={() => setCurrentView('dashboard')}
              onPrint={handlePrint}
              onDownloadPDF={handleDownloadPDF}
              onSaveDraft={handleSaveDraft}
              onReset={handleResetMarriage}
              activeViewMode={mobileViewMode}
              onChangeViewMode={setMobileViewMode}
            />

            {/* Split Screen Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
              {/* Left Column: Official Form Registry */}
              <div
                className={`lg:col-span-5 space-y-4 ${
                  mobileViewMode === 'preview' ? 'hidden lg:block' : 'block'
                }`}
              >
                <MarriageCertificateForm
                  data={marriageData}
                  onChange={setMarriageData}
                  onReset={handleResetMarriage}
                  onPreview={() => setMobileViewMode('preview')}
                  onSaveDraft={handleSaveDraft}
                />
              </div>

              {/* Right Column: Live Interactive Preview */}
              <div
                className={`lg:col-span-7 sticky top-20 ${
                  mobileViewMode === 'preview' ? 'block' : 'hidden lg:block'
                }`}
              >
                <CertificatePreview
                  type="marriage"
                  marriageData={marriageData}
                  style={marriageStyle}
                  onUpdateStyle={(updates) => setMarriageStyle({ ...marriageStyle, ...updates })}
                  documentTitle={`${marriageData.groom.fullName || 'Groom'} & ${marriageData.bride.fullName || 'Bride'} Marriage Certificate`}
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: SAVED DRAFTS */}
        {currentView === 'drafts' && (
          <SavedDraftsView
            onLoadDraft={handleLoadDraft}
            onNavigateToGenerator={(type) => {
              setCurrentView(type);
              setMobileViewMode('form');
            }}
          />
        )}

        {/* VIEW 5: ABOUT */}
        {currentView === 'about' && <AboutView />}

        {/* VIEW 6: HELP */}
        {currentView === 'help' && <HelpView />}
      </main>

      {/* Global Minimal Footer */}
      <footer className="no-print bg-white border-t border-slate-200 mt-auto py-5 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Certiflow: Sagbayan Documents</span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-slate-600">Civil Registry Document System</span>
          </div>

          <p className="text-[11px] text-slate-500 font-medium">
            CONFIDENTIAL CIVIL REGISTRY SYSTEM &bull; MUNICIPALITY OF SAGBAYAN, BOHOL
          </p>
        </div>
      </footer>
    </div>
  );
}
