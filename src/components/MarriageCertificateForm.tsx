import React, { useState } from 'react';
import { ComDetails, MarriageCertificateData } from '../types/certificate';
import { calculateAge, formatName } from '../utils/certificateUtils';
import { SAMPLE_MARRIAGE_DATA } from '../utils/sampleData';
import {
  Heart,
  User,
  Users,
  MapPin,
  Calendar,
  Sparkles,
  RotateCcw,
  AlertCircle,
  Clock,
  Building,
  FileCheck2,
  Check,
  Bookmark,
  Eye,
} from 'lucide-react';

interface MarriageCertificateFormProps {
  data: MarriageCertificateData;
  onChange: (newData: MarriageCertificateData) => void;
  onReset: () => void;
  onPreview?: () => void;
  onSaveDraft?: () => void;
}

export const MarriageCertificateForm: React.FC<MarriageCertificateFormProps> = ({
  data,
  onChange,
  onReset,
  onPreview,
  onSaveDraft,
}) => {
  const [activeTab, setActiveTab] = useState<'groom' | 'bride' | 'marriage' | 'witnesses'>('groom');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = () => {
    if (onSaveDraft) {
      onSaveDraft();
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const { groom, bride, marriage, additional, com } = data;

  const currentCom: ComDetails = com || {
    province: 'BOHOL',
    cityMunicipality: 'SAGBAYAN',
    registryNo: '2023-0941',
    husbandFirstName: groom.firstName || '',
    husbandMiddleName: groom.middleName || '',
    husbandLastName: groom.lastName || '',
    husbandPlaceOfBirth: 'Sagbayan, Bohol',
    husbandCitizenship: 'Filipino',
    husbandResidence: groom.currentAddress || 'Poblacion, Sagbayan, Bohol',
    husbandReligion: 'Roman Catholic',
    husbandCivilStatus: 'Single',
    wifeFirstName: bride.firstName || '',
    wifeMiddleName: bride.middleName || '',
    wifeLastName: bride.lastName || '',
    wifePlaceOfBirth: 'Sagbayan, Bohol',
    wifeCitizenship: 'Filipino',
    wifeResidence: bride.currentAddress || 'San Agustin, Sagbayan, Bohol',
    wifeReligion: 'Roman Catholic',
    wifeCivilStatus: 'Single',
    placeOfMarriage: marriage.placeOfMarriage || 'Sagbayan Parish Church, Sagbayan, Bohol',
    marriageLicenseNo: 'ML-2023-8941',
    licenseIssuedDate: '2023-09-10',
    licenseIssuedPlace: 'Sagbayan, Bohol',
    solemnizingOfficerName: marriage.officiantName || 'REV. FR. BERNARDO M. TORRES',
    solemnizingOfficerPosition: 'PARISH PRIEST',
    solemnizingOfficerReligion: 'ROMAN CATHOLIC CHURCH',
    receivedByName: 'CARMINA R. REYES',
    receivedByTitle: 'RECORDS CLERK',
    receivedByDate: '2023-09-24',
    registeredByName: 'ATTY. GREGORIO L. SANTOS',
    registeredByTitle: 'MUNICIPAL CIVIL REGISTRAR',
    registeredByDate: '2023-09-25',
  };

  const updateCom = (field: keyof ComDetails, val: any) => {
    const nextCom = { ...currentCom, [field]: val };
    onChange({ ...data, com: nextCom });
  };

  const updateGroom = (field: keyof typeof groom, val: string) => {
    const updated = { ...groom, [field]: val };
    if (field === 'firstName' || field === 'middleName' || field === 'lastName') {
      const f = field === 'firstName' ? val : groom.firstName;
      const m = field === 'middleName' ? val : groom.middleName;
      const l = field === 'lastName' ? val : groom.lastName;
      updated.fullName = formatName(f, m, l);
    }
    onChange({
      ...data,
      groom: updated,
      com: {
        ...currentCom,
        husbandFirstName: field === 'firstName' ? val : currentCom.husbandFirstName || groom.firstName,
        husbandMiddleName: field === 'middleName' ? val : currentCom.husbandMiddleName || groom.middleName,
        husbandLastName: field === 'lastName' ? val : currentCom.husbandLastName || groom.lastName,
      },
    });
  };

  const updateBride = (field: keyof typeof bride, val: string) => {
    const updated = { ...bride, [field]: val };
    if (field === 'firstName' || field === 'middleName' || field === 'lastName') {
      const f = field === 'firstName' ? val : bride.firstName;
      const m = field === 'middleName' ? val : bride.middleName;
      const l = field === 'lastName' ? val : bride.lastName;
      updated.fullName = formatName(f, m, l);
    }
    onChange({
      ...data,
      bride: updated,
      com: {
        ...currentCom,
        wifeFirstName: field === 'firstName' ? val : currentCom.wifeFirstName || bride.firstName,
        wifeMiddleName: field === 'middleName' ? val : currentCom.wifeMiddleName || bride.middleName,
        wifeLastName: field === 'lastName' ? val : currentCom.wifeLastName || bride.lastName,
      },
    });
  };

  const updateMarriage = (field: keyof typeof marriage, val: string) => {
    onChange({
      ...data,
      marriage: { ...marriage, [field]: val },
    });
  };

  const updateAdditional = (field: keyof typeof additional, val: string) => {
    onChange({
      ...data,
      additional: { ...additional, [field]: val },
    });
  };

  const handleLoadSample = () => {
    onChange(JSON.parse(JSON.stringify(SAMPLE_MARRIAGE_DATA)));
  };

  const handleConfirmReset = () => {
    onReset();
    setShowResetConfirm(false);
  };

  const groomAge = calculateAge(groom.dateOfBirth, marriage.dateOfMarriage);
  const brideAge = calculateAge(bride.dateOfBirth, marriage.dateOfMarriage);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Header Actions */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-600" />
          <h2 className="font-semibold text-slate-800 text-sm sm:text-base">
            Certificate of Marriage (Form 97)
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Button 1: Load Sample Data */}
          <button
            type="button"
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Load Sample Data</span>
          </button>

          {/* Button 2: Preview (Beside Load Sample Data) */}
          {onPreview && (
            <button
              type="button"
              onClick={onPreview}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300 transition-colors shadow-2xs"
            >
              <Eye className="w-3.5 h-3.5 text-slate-600" />
              <span>Preview</span>
            </button>
          )}

          {/* Button 3: Save Draft (Beside Preview) */}
          {onSaveDraft && (
            <button
              type="button"
              onClick={handleSaveClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-300 transition-colors shadow-2xs"
            >
              {isSaved ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Saved!</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5 text-sky-600" />
                  <span>Save Draft</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/80 transition-colors ml-1"
            title="Reset Form"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/50 px-2 pt-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('groom')}
          className={`px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'groom'
              ? 'border-rose-600 text-rose-900 bg-white rounded-t-lg shadow-2xs font-semibold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className="w-3.5 h-3.5 text-slate-700" />
          <span>Groom</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('bride')}
          className={`px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'bride'
              ? 'border-rose-600 text-rose-900 bg-white rounded-t-lg shadow-2xs font-semibold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className="w-3.5 h-3.5 text-rose-600" />
          <span>Bride</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('marriage')}
          className={`px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'marriage'
              ? 'border-rose-600 text-rose-900 bg-white rounded-t-lg shadow-2xs font-semibold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building className="w-3.5 h-3.5 text-slate-600" />
          <span>Ceremony & Place</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('witnesses')}
          className={`px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'witnesses'
              ? 'border-rose-600 text-rose-900 bg-white rounded-t-lg shadow-2xs font-semibold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-slate-600" />
          <span>Witnesses & Officiant</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('comRegistry' as any)}
          className={`px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            (activeTab as string) === 'comRegistry'
              ? 'border-rose-600 text-rose-900 bg-white rounded-t-lg shadow-2xs font-semibold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5 text-rose-600" />
          <span>Form 97 Registry & Affidavits</span>
        </button>
      </div>

      {/* Form Content */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* TAB 1: GROOM */}
        {activeTab === 'groom' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={groom.firstName}
                  onChange={(e) => updateGroom('firstName', e.target.value)}
                  placeholder="e.g. Alexander"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={groom.middleName}
                  onChange={(e) => updateGroom('middleName', e.target.value)}
                  placeholder="e.g. Henry"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={groom.lastName}
                  onChange={(e) => updateGroom('lastName', e.target.value)}
                  placeholder="e.g. Hayes"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-700">
                  Full Groom Name (Formatted)
                </label>
                <span className="text-[10px] text-slate-500 italic">
                  Auto-formatted or enter custom
                </span>
              </div>
              <input
                type="text"
                value={groom.fullName}
                onChange={(e) => updateGroom('fullName', e.target.value)}
                placeholder="Alexander Henry Hayes"
                className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border border-slate-300 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-700">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  {groomAge && (
                    <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
                      {groomAge}
                    </span>
                  )}
                </div>
                <input
                  type="date"
                  value={groom.dateOfBirth}
                  onChange={(e) => updateGroom('dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Nationality (optional)
                </label>
                <input
                  type="text"
                  value={groom.nationality || ''}
                  onChange={(e) => updateGroom('nationality', e.target.value)}
                  placeholder="e.g. American"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Place of Birth
                </label>
                <input
                  type="text"
                  value={groom.placeOfBirth}
                  onChange={(e) => updateGroom('placeOfBirth', e.target.value)}
                  placeholder="e.g. Boston, Massachusetts"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Current Residence / Address (optional)
                </label>
                <input
                  type="text"
                  value={groom.currentAddress || ''}
                  onChange={(e) => updateGroom('currentAddress', e.target.value)}
                  placeholder="e.g. Springfield, IL"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BRIDE */}
        {activeTab === 'bride' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={bride.firstName}
                  onChange={(e) => updateBride('firstName', e.target.value)}
                  placeholder="e.g. Sophia"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={bride.middleName}
                  onChange={(e) => updateBride('middleName', e.target.value)}
                  placeholder="e.g. Claire"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={bride.lastName}
                  onChange={(e) => updateBride('lastName', e.target.value)}
                  placeholder="e.g. Montgomery"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-700">
                  Full Bride Name (Formatted)
                </label>
                <span className="text-[10px] text-slate-500 italic">
                  Auto-formatted or enter custom
                </span>
              </div>
              <input
                type="text"
                value={bride.fullName}
                onChange={(e) => updateBride('fullName', e.target.value)}
                placeholder="Sophia Claire Montgomery"
                className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border border-slate-300 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-700">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  {brideAge && (
                    <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
                      {brideAge}
                    </span>
                  )}
                </div>
                <input
                  type="date"
                  value={bride.dateOfBirth}
                  onChange={(e) => updateBride('dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Nationality (optional)
                </label>
                <input
                  type="text"
                  value={bride.nationality || ''}
                  onChange={(e) => updateBride('nationality', e.target.value)}
                  placeholder="e.g. American"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Place of Birth
                </label>
                <input
                  type="text"
                  value={bride.placeOfBirth}
                  onChange={(e) => updateBride('placeOfBirth', e.target.value)}
                  placeholder="e.g. Denver, Colorado"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Current Residence / Address (optional)
                </label>
                <input
                  type="text"
                  value={bride.currentAddress || ''}
                  onChange={(e) => updateBride('currentAddress', e.target.value)}
                  placeholder="e.g. Springfield, IL"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MARRIAGE DETAILS */}
        {activeTab === 'marriage' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Date of Marriage <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={marriage.dateOfMarriage}
                  onChange={(e) => updateMarriage('dateOfMarriage', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Time of Marriage (optional)
                </label>
                <input
                  type="text"
                  value={marriage.timeOfMarriage || ''}
                  onChange={(e) => updateMarriage('timeOfMarriage', e.target.value)}
                  placeholder="e.g. 04:30 PM"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Venue / Place of Marriage <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={marriage.placeOfMarriage}
                onChange={(e) => updateMarriage('placeOfMarriage', e.target.value)}
                placeholder="e.g. Grand Oak Botanical Conservatory"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  City / Municipality <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={marriage.cityMunicipality}
                  onChange={(e) => updateMarriage('cityMunicipality', e.target.value)}
                  placeholder="e.g. Springfield"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Province / State
                </label>
                <input
                  type="text"
                  value={marriage.provinceState}
                  onChange={(e) => updateMarriage('provinceState', e.target.value)}
                  placeholder="e.g. Illinois"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={marriage.country}
                  onChange={(e) => updateMarriage('country', e.target.value)}
                  placeholder="e.g. United States"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Ceremony Type (optional)
                </label>
                <input
                  type="text"
                  value={marriage.ceremonyType || ''}
                  onChange={(e) => updateMarriage('ceremonyType', e.target.value)}
                  placeholder="e.g. Civil Solemnization"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Officiant / Celebrant Name (optional)
                </label>
                <input
                  type="text"
                  value={marriage.officiantName || ''}
                  onChange={(e) => updateMarriage('officiantName', e.target.value)}
                  placeholder="e.g. Hon. Marcus J. Vance (Mock Celebrant)"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Additional Remarks (optional)
              </label>
              <input
                type="text"
                value={marriage.remarks || ''}
                onChange={(e) => updateMarriage('remarks', e.target.value)}
                placeholder="e.g. Sample commemorative presentation document"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
              />
            </div>
          </div>
        )}

        {/* TAB 4: WITNESSES & META */}
        {activeTab === 'witnesses' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Witness 1 Name (optional)
                </label>
                <input
                  type="text"
                  value={additional.witness1Name || ''}
                  onChange={(e) => updateAdditional('witness1Name', e.target.value)}
                  placeholder="e.g. Julian Thomas Montgomery"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Witness 2 Name (optional)
                </label>
                <input
                  type="text"
                  value={additional.witness2Name || ''}
                  onChange={(e) => updateAdditional('witness2Name', e.target.value)}
                  placeholder="e.g. Charlotte Grace Sterling"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Witness 3 (optional)
                </label>
                <input
                  type="text"
                  value={currentCom.witness3 || ''}
                  onChange={(e) => updateCom('witness3', e.target.value)}
                  placeholder="e.g. Marcus Aurelius Vance"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Witness 4 (optional)
                </label>
                <input
                  type="text"
                  value={currentCom.witness4 || ''}
                  onChange={(e) => updateCom('witness4', e.target.value)}
                  placeholder="e.g. Eleanor Vance Sterling"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Date of Preparation
                </label>
                <input
                  type="date"
                  value={additional.dateOfPreparation}
                  onChange={(e) => updateAdditional('dateOfPreparation', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Prepared By (optional)
                </label>
                <input
                  type="text"
                  value={additional.preparedBy || ''}
                  onChange={(e) => updateAdditional('preparedBy', e.target.value)}
                  placeholder="e.g. Document Mockup Assistant"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: FORM 97 REGISTRY & AFFIDAVITS */}
        {((activeTab as string) === 'comRegistry') && (
          <div className="space-y-4">
            <div className="bg-rose-50/60 p-3 rounded-lg border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
              <FileCheck2 className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Official Civil Registry Form 97 (Revised August 2016)</span>
                <p className="text-[11px] text-rose-800 mt-0.5">
                  These fields populate the official Philippine Certificate of Marriage layout for Sagbayan, Bohol including Registry Book entry, Solemnizing Officer details, and Page 2 Affidavits.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Province
                </label>
                <input
                  type="text"
                  value={currentCom.province}
                  onChange={(e) => updateCom('province', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  City / Municipality
                </label>
                <input
                  type="text"
                  value={currentCom.cityMunicipality}
                  onChange={(e) => updateCom('cityMunicipality', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Registry Number
                </label>
                <input
                  type="text"
                  value={currentCom.registryNo}
                  onChange={(e) => updateCom('registryNo', e.target.value)}
                  placeholder="e.g. 2023-0941"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30 font-mono"
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Item 19 & 20: Marriage License & Solemnizing Authority
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Marriage License No.
                  </label>
                  <input
                    type="text"
                    value={currentCom.marriageLicenseNo || ''}
                    onChange={(e) => updateCom('marriageLicenseNo', e.target.value)}
                    placeholder="e.g. ML-2023-8941"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    License Issued Date
                  </label>
                  <input
                    type="date"
                    value={currentCom.licenseIssuedDate || ''}
                    onChange={(e) => updateCom('licenseIssuedDate', e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Place Issued
                  </label>
                  <input
                    type="text"
                    value={currentCom.licenseIssuedPlace || 'Sagbayan, Bohol'}
                    onChange={(e) => updateCom('licenseIssuedPlace', e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Solemnizing Officer Name
                  </label>
                  <input
                    type="text"
                    value={currentCom.solemnizingOfficerName || ''}
                    onChange={(e) => updateCom('solemnizingOfficerName', e.target.value)}
                    placeholder="e.g. REV. FR. BERNARDO M. TORRES"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Position / Designation
                  </label>
                  <input
                    type="text"
                    value={currentCom.solemnizingOfficerPosition || ''}
                    onChange={(e) => updateCom('solemnizingOfficerPosition', e.target.value)}
                    placeholder="e.g. PARISH PRIEST / TRIAL JUDGE"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Religious Sect / Civil Agency
                  </label>
                  <input
                    type="text"
                    value={currentCom.solemnizingOfficerReligion || ''}
                    onChange={(e) => updateCom('solemnizingOfficerReligion', e.target.value)}
                    placeholder="e.g. ROMAN CATHOLIC CHURCH"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Item 21 & 22: LCRO Reception & Registration
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-slate-700 uppercase">21. Received By (LCRO Staff)</span>
                  <input
                    type="text"
                    value={currentCom.receivedByName || ''}
                    onChange={(e) => updateCom('receivedByName', e.target.value)}
                    placeholder="Name: CARMINA R. REYES"
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                  />
                  <input
                    type="text"
                    value={currentCom.receivedByTitle || ''}
                    onChange={(e) => updateCom('receivedByTitle', e.target.value)}
                    placeholder="Title: RECORDS CLERK"
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                  />
                  <input
                    type="date"
                    value={currentCom.receivedByDate || ''}
                    onChange={(e) => updateCom('receivedByDate', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-slate-700 uppercase">22. Registered By (Civil Registrar)</span>
                  <input
                    type="text"
                    value={currentCom.registeredByName || ''}
                    onChange={(e) => updateCom('registeredByName', e.target.value)}
                    placeholder="Name: ATTY. GREGORIO L. SANTOS"
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white font-semibold"
                  />
                  <input
                    type="text"
                    value={currentCom.registeredByTitle || ''}
                    onChange={(e) => updateCom('registeredByTitle', e.target.value)}
                    placeholder="Title: MUNICIPAL CIVIL REGISTRAR"
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                  />
                  <input
                    type="date"
                    value={currentCom.registeredByDate || ''}
                    onChange={(e) => updateCom('registeredByDate', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Page 2: Affidavits
              </h4>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="affidavitDelayed"
                  checked={Boolean(currentCom.affidavitDelayedReg)}
                  onChange={(e) => updateCom('affidavitDelayedReg', e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="affidavitDelayed" className="text-xs font-medium text-slate-700">
                  Include Page 2 Affidavit for Delayed Registration of Marriage
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900">Reset Marriage Information?</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Are you sure you want to clear all entered groom, bride, and ceremony fields? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
