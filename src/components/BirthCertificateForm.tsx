import React, { useState } from 'react';
import { BirthCertificateData, ColbDetails } from '../types/certificate';
import { calculateAge, formatName } from '../utils/certificateUtils';
import { SAMPLE_BIRTH_DATA } from '../utils/sampleData';
import {
  Baby,
  User,
  Users,
  MapPin,
  Calendar,
  Sparkles,
  RotateCcw,
  AlertCircle,
  Clock,
  Building,
  FileText,
  ShieldCheck,
  Award,
  Eye,
} from 'lucide-react';

interface BirthCertificateFormProps {
  data: BirthCertificateData;
  onChange: (newData: BirthCertificateData) => void;
  onReset: () => void;
  onPreview?: () => void;
  onSaveDraft?: () => void;
}

export const BirthCertificateForm: React.FC<BirthCertificateFormProps> = ({
  data,
  onChange,
  onReset,
  onPreview,
  onSaveDraft,
}) => {
  const [activeTab, setActiveTab] = useState<'child' | 'parents' | 'attendant' | 'registry'>('child');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = () => {
    if (onSaveDraft) {
      onSaveDraft();
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const { child, father, mother, additional, colb } = data;

  const currentColb: ColbDetails = colb || {
    province: child.provinceState || 'RIZAL',
    cityMunicipality: child.cityMunicipality || 'ANTIPOLO CITY',
    registryNo: '2023-081602',
    motherCitizenship: 'Filipino',
    motherReligion: 'Roman Catholic',
    fatherCitizenship: 'Filipino',
    fatherReligion: 'Roman Catholic',
    attendantType: '1',
  };

  const updateChild = (field: keyof typeof child, val: string) => {
    const updated = { ...child, [field]: val };

    if (field === 'firstName' || field === 'middleName' || field === 'lastName') {
      const f = field === 'firstName' ? val : child.firstName;
      const m = field === 'middleName' ? val : child.middleName;
      const l = field === 'lastName' ? val : child.lastName;
      updated.fullName = formatName(f, m, l);
    }

    onChange({ ...data, child: updated });
  };

  const updateColb = (field: keyof ColbDetails, val: any) => {
    const nextColb = { ...currentColb, [field]: val };
    onChange({ ...data, colb: nextColb });
  };

  const updateMotherNames = (first: string, mid: string, last: string) => {
    const fullName = formatName(first, mid, last);
    onChange({
      ...data,
      mother: { ...mother, fullName },
      colb: {
        ...currentColb,
        motherFirstName: first,
        motherMiddleName: mid,
        motherLastName: last,
      },
    });
  };

  const updateFatherNames = (first: string, mid: string, last: string) => {
    const fullName = formatName(first, mid, last);
    onChange({
      ...data,
      father: { ...father, fullName },
      colb: {
        ...currentColb,
        fatherFirstName: first,
        fatherMiddleName: mid,
        fatherLastName: last,
      },
    });
  };

  const handleLoadSample = () => {
    onChange(JSON.parse(JSON.stringify(SAMPLE_BIRTH_DATA)));
  };

  const handleConfirmReset = () => {
    onReset();
    setShowResetConfirm(false);
  };

  const calculatedAge = calculateAge(child.dateOfBirth);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Header Actions */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Baby className="w-4 h-4 text-green-700" />
          <h2 className="font-semibold text-slate-800 text-sm sm:text-base">
            Certificate of Live Birth (COLB Form 102)
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Button 1: Load Sample Data */}
          <button
            type="button"
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-green-50 text-green-800 hover:bg-green-100 border border-green-300 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-green-600" />
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
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Saved!</span>
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5 text-sky-600" />
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

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/50 px-2 pt-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('child')}
          className={`px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'child'
              ? 'border-green-700 text-green-950 bg-white rounded-t-lg shadow-2xs font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>1. Child</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('parents')}
          className={`px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'parents'
              ? 'border-green-700 text-green-950 bg-white rounded-t-lg shadow-2xs font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>2. Parents</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('attendant')}
          className={`px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'attendant'
              ? 'border-green-700 text-green-950 bg-white rounded-t-lg shadow-2xs font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>3. Attendant & Marriage</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('registry')}
          className={`px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'registry'
              ? 'border-green-700 text-green-950 bg-white rounded-t-lg shadow-2xs font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>4. Registry & Affidavits</span>
        </button>
      </div>

      {/* Form Content */}
      <div className="p-4 sm:p-5 space-y-4">
        
        {/* TAB 1: CHILD */}
        {activeTab === 'child' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  1. Child's First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={child.firstName}
                  onChange={(e) => updateChild('firstName', e.target.value)}
                  placeholder="e.g. JUAN MIGUEL"
                  className="w-full px-3 py-2 text-xs sm:text-sm uppercase rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Child's Middle Name
                </label>
                <input
                  type="text"
                  value={child.middleName}
                  onChange={(e) => updateChild('middleName', e.target.value)}
                  placeholder="e.g. SANTOS"
                  className="w-full px-3 py-2 text-xs sm:text-sm uppercase rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Child's Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={child.lastName}
                  onChange={(e) => updateChild('lastName', e.target.value)}
                  placeholder="e.g. DELA CRUZ"
                  className="w-full px-3 py-2 text-xs sm:text-sm uppercase rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  2. Sex <span className="text-red-500">*</span>
                </label>
                <select
                  value={child.sex}
                  onChange={(e) => updateChild('sex', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-600/30"
                >
                  <option value="">Select Sex</option>
                  <option value="Male">1 Male</option>
                  <option value="Female">2 Female</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-700">
                    3. Date of Birth <span className="text-red-500">*</span>
                  </label>
                  {calculatedAge && (
                    <span className="text-[10px] font-semibold text-green-800 bg-green-50 px-1.5 py-0.5 rounded">
                      {calculatedAge}
                    </span>
                  )}
                </div>
                <input
                  type="date"
                  value={child.dateOfBirth}
                  onChange={(e) => updateChild('dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Time of Birth
                </label>
                <input
                  type="text"
                  value={child.timeOfBirth || currentColb.attendantTime || ''}
                  onChange={(e) => {
                    updateChild('timeOfBirth', e.target.value);
                    updateColb('attendantTime', e.target.value);
                  }}
                  placeholder="e.g. 07:35 AM"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 font-mono"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-green-700" />
                4. Place of Birth
              </span>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Hospital / Clinic / House No. & Street
                </label>
                <input
                  type="text"
                  value={child.placeOfBirth}
                  onChange={(e) => updateChild('placeOfBirth', e.target.value)}
                  placeholder="e.g. Rizal Provincial Hospital System"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    City / Municipality <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={child.cityMunicipality}
                    onChange={(e) => {
                      updateChild('cityMunicipality', e.target.value);
                      updateColb('cityMunicipality', e.target.value);
                    }}
                    placeholder="e.g. Antipolo City"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Province <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={child.provinceState}
                    onChange={(e) => {
                      updateChild('provinceState', e.target.value);
                      updateColb('province', e.target.value);
                    }}
                    placeholder="e.g. Rizal"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600/30"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  5a. Type of Birth
                </label>
                <select
                  value={additional.birthType}
                  onChange={(e) => updateChild('additional' as any, { ...additional, birthType: e.target.value } as any)}
                  className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none"
                >
                  <option value="Single">1 Single</option>
                  <option value="Twin">2 Twin</option>
                  <option value="Triplet">3 Triplet / Multiple</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  5b. If Multiple, Child Was
                </label>
                <select
                  value={currentColb.multipleBirthOrder || ''}
                  onChange={(e) => updateColb('multipleBirthOrder', e.target.value)}
                  className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none"
                >
                  <option value="">N/A (Single)</option>
                  <option value="1">1 First</option>
                  <option value="2">2 Second</option>
                  <option value="3">3 Others</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  5c. Birth Order
                </label>
                <input
                  type="text"
                  value={additional.birthOrder || ''}
                  onChange={(e) => onChange({ ...data, additional: { ...additional, birthOrder: e.target.value } })}
                  placeholder="e.g. First"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  5d. Weight at Birth (grams)
                </label>
                <input
                  type="text"
                  value={currentColb.weightAtBirth || ''}
                  onChange={(e) => updateColb('weightAtBirth', e.target.value)}
                  placeholder="e.g. 3250"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PARENTS */}
        {activeTab === 'parents' && (
          <div className="space-y-6">
            {/* Mother Section */}
            <div className="bg-slate-50/80 p-3.5 rounded-lg border border-slate-200 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-green-900 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-rose-600" />
                Mother's Information (COLB Items 6 - 12)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    6. Maiden First Name
                  </label>
                  <input
                    type="text"
                    value={currentColb.motherFirstName || ''}
                    onChange={(e) => updateMotherNames(e.target.value, currentColb.motherMiddleName || '', currentColb.motherLastName || '')}
                    placeholder="e.g. MARIA CLARA"
                    className="w-full px-3 py-2 text-xs sm:text-sm uppercase rounded-lg border border-slate-300 bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Maiden Middle Name
                  </label>
                  <input
                    type="text"
                    value={currentColb.motherMiddleName || ''}
                    onChange={(e) => updateMotherNames(currentColb.motherFirstName || '', e.target.value, currentColb.motherLastName || '')}
                    placeholder="e.g. BAUTISTA"
                    className="w-full px-3 py-2 text-xs sm:text-sm uppercase rounded-lg border border-slate-300 bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Maiden Last Name
                  </label>
                  <input
                    type="text"
                    value={currentColb.motherLastName || ''}
                    onChange={(e) => updateMotherNames(currentColb.motherFirstName || '', currentColb.motherMiddleName || '', e.target.value)}
                    placeholder="e.g. SANTOS"
                    className="w-full px-3 py-2 text-xs sm:text-sm uppercase rounded-lg border border-slate-300 bg-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    7. Citizenship
                  </label>
                  <input
                    type="text"
                    value={currentColb.motherCitizenship || 'Filipino'}
                    onChange={(e) => updateColb('motherCitizenship', e.target.value)}
                    placeholder="e.g. Filipino"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    8. Religion
                  </label>
                  <input
                    type="text"
                    value={currentColb.motherReligion || 'Roman Catholic'}
                    onChange={(e) => updateColb('motherReligion', e.target.value)}
                    placeholder="e.g. Roman Catholic"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    9a. Total Born Alive
                  </label>
                  <input
                    type="text"
                    value={currentColb.totalChildrenBornAlive || '1'}
                    onChange={(e) => updateColb('totalChildrenBornAlive', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded border border-slate-300 bg-white font-mono text-center"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    9b. Still Living
                  </label>
                  <input
                    type="text"
                    value={currentColb.childrenStillLiving || '1'}
                    onChange={(e) => updateColb('childrenStillLiving', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded border border-slate-300 bg-white font-mono text-center"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    9c. Now Dead
                  </label>
                  <input
                    type="text"
                    value={currentColb.childrenNowDead || '0'}
                    onChange={(e) => updateColb('childrenNowDead', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded border border-slate-300 bg-white font-mono text-center"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    10. Occupation
                  </label>
                  <input
                    type="text"
                    value={currentColb.motherOccupation || ''}
                    onChange={(e) => updateColb('motherOccupation', e.target.value)}
                    placeholder="e.g. Teacher"
                    className="w-full px-2 py-1.5 text-xs rounded border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    11. Age at birth
                  </label>
                  <input
                    type="text"
                    value={currentColb.motherAgeAtBirth || ''}
                    onChange={(e) => updateColb('motherAgeAtBirth', e.target.value)}
                    placeholder="e.g. 29"
                    className="w-full px-2 py-1.5 text-xs rounded border border-slate-300 bg-white font-mono text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  12. Residence (House No., Street, Barangay)
                </label>
                <input
                  type="text"
                  value={currentColb.motherResidenceStreet || ''}
                  onChange={(e) => updateColb('motherResidenceStreet', e.target.value)}
                  placeholder="e.g. 142 Sampaguita St., Brgy. San Roque, Antipolo City"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white"
                />
              </div>
            </div>

            {/* Father Section */}
            <div className="bg-slate-50/80 p-3.5 rounded-lg border border-slate-200 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-green-900 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-600" />
                Father's Information (COLB Items 13 - 17)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    13. First Name
                  </label>
                  <input
                    type="text"
                    value={currentColb.fatherFirstName || ''}
                    onChange={(e) => updateFatherNames(e.target.value, currentColb.fatherMiddleName || '', currentColb.fatherLastName || '')}
                    placeholder="e.g. ROBERTO"
                    className="w-full px-3 py-2 text-xs sm:text-sm uppercase rounded-lg border border-slate-300 bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    value={currentColb.fatherMiddleName || ''}
                    onChange={(e) => updateFatherNames(currentColb.fatherFirstName || '', e.target.value, currentColb.fatherLastName || '')}
                    placeholder="e.g. MENDEZ"
                    className="w-full px-3 py-2 text-xs sm:text-sm uppercase rounded-lg border border-slate-300 bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={currentColb.fatherLastName || ''}
                    onChange={(e) => updateFatherNames(currentColb.fatherFirstName || '', currentColb.fatherMiddleName || '', e.target.value)}
                    placeholder="e.g. DELA CRUZ"
                    className="w-full px-3 py-2 text-xs sm:text-sm uppercase rounded-lg border border-slate-300 bg-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    14. Citizenship
                  </label>
                  <input
                    type="text"
                    value={currentColb.fatherCitizenship || 'Filipino'}
                    onChange={(e) => updateColb('fatherCitizenship', e.target.value)}
                    placeholder="e.g. Filipino"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    15. Religion
                  </label>
                  <input
                    type="text"
                    value={currentColb.fatherReligion || 'Roman Catholic'}
                    onChange={(e) => updateColb('fatherReligion', e.target.value)}
                    placeholder="e.g. Roman Catholic"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    16. Occupation
                  </label>
                  <input
                    type="text"
                    value={currentColb.fatherOccupation || ''}
                    onChange={(e) => updateColb('fatherOccupation', e.target.value)}
                    placeholder="e.g. Civil Engineer"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    17. Age at birth
                  </label>
                  <input
                    type="text"
                    value={currentColb.fatherAgeAtBirth || ''}
                    onChange={(e) => updateColb('fatherAgeAtBirth', e.target.value)}
                    placeholder="e.g. 32"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white font-mono text-center"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ATTENDANT & MARRIAGE */}
        {activeTab === 'attendant' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                18. Date and Place of Marriage of Parents
              </label>
              <input
                type="text"
                value={currentColb.parentsMarriageDatePlace || ''}
                onChange={(e) => updateColb('parentsMarriageDatePlace', e.target.value)}
                placeholder="e.g. OCTOBER 18, 2020 - ANTIPOLO CATHEDRAL, ANTIPOLO CITY (or NOT MARRIED)"
                className="w-full px-3 py-2 text-xs sm:text-sm uppercase rounded-lg border border-slate-300 font-mono"
              />
              <span className="text-[10px] text-slate-500 italic">
                * If not married, accomplish Affidavit of Acknowledgement/Admission of Paternity at the back.
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-green-900">
                19a. Attendant at Birth
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: '1', label: '1. Physician' },
                  { id: '2', label: '2. Nurse' },
                  { id: '3', label: '3. Midwife' },
                  { id: '4', label: '4. Hilot' },
                  { id: '5', label: '5. Others' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => updateColb('attendantType', item.id)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                      currentColb.attendantType === item.id
                        ? 'border-green-700 bg-green-50 text-green-950 font-bold ring-1 ring-green-600'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Attendant Name in Print
                  </label>
                  <input
                    type="text"
                    value={currentColb.attendantSignatureName || ''}
                    onChange={(e) => updateColb('attendantSignatureName', e.target.value)}
                    placeholder="e.g. DR. ELEANOR G. MARTINEZ, MD"
                    className="w-full px-3 py-2 text-xs sm:text-sm uppercase rounded-lg border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Title or Position
                  </label>
                  <input
                    type="text"
                    value={currentColb.attendantTitlePosition || ''}
                    onChange={(e) => updateColb('attendantTitlePosition', e.target.value)}
                    placeholder="e.g. OB-GYNECOLOGIST"
                    className="w-full px-3 py-2 text-xs sm:text-sm uppercase rounded-lg border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Attendant Address
                  </label>
                  <input
                    type="text"
                    value={currentColb.attendantAddress || ''}
                    onChange={(e) => updateColb('attendantAddress', e.target.value)}
                    placeholder="e.g. Rizal Provincial Hospital, Antipolo City"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Date Signed by Attendant
                  </label>
                  <input
                    type="date"
                    value={currentColb.attendantDate || ''}
                    onChange={(e) => updateColb('attendantDate', e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-green-900">
                20. Informant
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Informant Name in Print
                  </label>
                  <input
                    type="text"
                    value={currentColb.informantSignatureName || ''}
                    onChange={(e) => updateColb('informantSignatureName', e.target.value)}
                    placeholder="e.g. ROBERTO M. DELA CRUZ"
                    className="w-full px-3 py-2 text-xs sm:text-sm uppercase rounded-lg border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Relationship to Child
                  </label>
                  <input
                    type="text"
                    value={currentColb.informantRelationship || ''}
                    onChange={(e) => updateColb('informantRelationship', e.target.value)}
                    placeholder="e.g. FATHER / MOTHER"
                    className="w-full px-3 py-2 text-xs sm:text-sm uppercase rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Informant Date
                  </label>
                  <input
                    type="date"
                    value={currentColb.informantDate || ''}
                    onChange={(e) => updateColb('informantDate', e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: REGISTRY & AFFIDAVITS */}
        {activeTab === 'registry' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Civil Registry Number
                </label>
                <input
                  type="text"
                  value={currentColb.registryNo || ''}
                  onChange={(e) => updateColb('registryNo', e.target.value)}
                  placeholder="e.g. 2023-081602"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Province
                </label>
                <input
                  type="text"
                  value={currentColb.province || child.provinceState || ''}
                  onChange={(e) => updateColb('province', e.target.value)}
                  placeholder="e.g. RIZAL"
                  className="w-full px-3 py-2 text-xs sm:text-sm uppercase rounded-lg border border-slate-300 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  City / Municipality
                </label>
                <input
                  type="text"
                  value={currentColb.cityMunicipality || child.cityMunicipality || ''}
                  onChange={(e) => updateColb('cityMunicipality', e.target.value)}
                  placeholder="e.g. ANTIPOLO CITY"
                  className="w-full px-3 py-2 text-xs sm:text-sm uppercase rounded-lg border border-slate-300 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
              <div className="p-3 bg-slate-50 rounded-lg space-y-2">
                <span className="text-xs font-bold uppercase text-slate-800 block">
                  21. Prepared By (Clerk)
                </span>
                <input
                  type="text"
                  value={currentColb.preparedByName || ''}
                  onChange={(e) => updateColb('preparedByName', e.target.value)}
                  placeholder="Name: CARMINA R. REYES"
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white font-mono"
                />
                <input
                  type="text"
                  value={currentColb.preparedByTitle || ''}
                  onChange={(e) => updateColb('preparedByTitle', e.target.value)}
                  placeholder="Title: RECORDS CLERK"
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg space-y-2">
                <span className="text-xs font-bold uppercase text-slate-800 block">
                  22. Received by Civil Registrar
                </span>
                <input
                  type="text"
                  value={currentColb.receivedByName || ''}
                  onChange={(e) => updateColb('receivedByName', e.target.value)}
                  placeholder="Name: ATTY. GREGORIO L. SANTOS"
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white font-mono"
                />
                <input
                  type="text"
                  value={currentColb.receivedByTitle || ''}
                  onChange={(e) => updateColb('receivedByTitle', e.target.value)}
                  placeholder="Title: CITY CIVIL REGISTRAR"
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                />
              </div>
            </div>

            {/* Back Page Affidavits Configuration */}
            <div className="p-4 bg-green-50/70 border border-green-200 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-700" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-green-950">
                  Page 2 (Back) Affidavits Configuration
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    Administering Officer (Page 2)
                  </label>
                  <input
                    type="text"
                    value={currentColb.affidavitPaternityAdminOfficer || ''}
                    onChange={(e) => updateColb('affidavitPaternityAdminOfficer', e.target.value)}
                    placeholder="e.g. ATTY. GREGORIO L. SANTOS"
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    Father CTC Number (Page 2)
                  </label>
                  <input
                    type="text"
                    value={currentColb.affidavitPaternityFatherCtc || ''}
                    onChange={(e) => updateColb('affidavitPaternityFatherCtc', e.target.value)}
                    placeholder="e.g. CTC-04829103 / Antipolo"
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white font-mono"
                  />
                </div>
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
              <h3 className="font-semibold text-slate-900">Reset Information?</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Are you sure you want to clear all entered fields? This action cannot be undone.
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
