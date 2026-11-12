import React from 'react';
import {
  BirthCertificateData,
  CertificateStyle,
} from '../types/certificate';
import { calculateAge, formatDisplayDate } from '../utils/certificateUtils';
import { Award, Baby, Calendar, Compass, FileBadge, Heart, MapPin, Sparkles, User, ShieldAlert } from 'lucide-react';
import { PhilippineColbTemplate } from './PhilippineColbTemplate';

interface BirthCertificateTemplateProps {
  data: BirthCertificateData;
  style: CertificateStyle;
  isPrintMode?: boolean;
  page?: 'page1' | 'page2';
}

export const BirthCertificateTemplate: React.FC<BirthCertificateTemplateProps> = ({
  data,
  style,
  page = 'page1',
}) => {
  if (style.templateId === 'ph-colb-102') {
    return <PhilippineColbTemplate data={data} style={style} page={page} />;
  }

  const { child, father, mother, additional } = data;

  const fontClass = {
    serif: 'font-serif-title font-serif',
    formal: 'font-formal',
    modern: 'font-modern font-sans',
    classic: 'font-classic',
  }[style.fontStyle] || 'font-serif';

  const bodyFontClass = {
    serif: 'font-serif',
    formal: 'font-formal',
    modern: 'font-sans-clean',
    classic: 'font-classic',
  }[style.fontStyle] || 'font-sans';

  const bgClasses: Record<string, string> = {
    'pure-white': 'bg-white text-slate-800',
    'warm-ivory': 'bg-[#FAF7F0] text-[#2C2B29]',
    'soft-parchment': 'bg-[#F5EFEB] text-[#2D2A26]',
    'subtle-cream': 'bg-[#FFFDF7] text-[#333029]',
    'cool-slate': 'bg-[#F8FAFC] text-[#1E293B]',
  };

  const borderStyles: Record<string, string> = {
    'double-gold': 'border-8 border-double border-amber-700/70 p-7 shadow-sm',
    'classic-navy': 'border-4 border-navy-900 border-[#1E3A8A] p-7 ring-2 ring-[#1E3A8A]/30 ring-offset-4 ring-offset-transparent',
    'ornate-slate': 'border-2 border-slate-700 p-8 shadow-inner ring-4 ring-slate-300 ring-offset-4 ring-offset-transparent',
    'minimal-subtle': 'border border-slate-300 p-6 shadow-sm',
    'vintage-frame': 'border-[6px] border-[#78350F]/80 p-8 outline outline-2 outline-offset-4 outline-[#B45309]/50',
  };

  const marginClasses = {
    compact: 'p-4 sm:p-6',
    normal: 'p-6 sm:p-10',
    generous: 'p-8 sm:p-14',
  }[style.pageMargins] || 'p-8';

  const textSizeBase = {
    small: 'text-xs leading-relaxed',
    medium: 'text-sm leading-relaxed',
    large: 'text-base leading-relaxed',
  }[style.fontSize] || 'text-sm';

  const calculatedAge = calculateAge(child.dateOfBirth);
  const formattedDob = formatDisplayDate(child.dateOfBirth, style.dateFormat);
  const formattedRegDate = additional.dateOfRegistration
    ? formatDisplayDate(additional.dateOfRegistration, style.dateFormat)
    : null;

  const childDisplayName = child.fullName?.trim() ||
    [child.firstName, child.middleName, child.lastName].filter(Boolean).join(' ') ||
    'Name of Child';

  const isLandscape = style.pageOrientation === 'landscape';

  // Helper for background watermark
  const watermarkOpacity = style.watermarkOpacity ?? 0.12;

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden select-text ${bgClasses[style.backgroundColor] || 'bg-white'} ${marginClasses}`}
      style={{
        aspectRatio: isLandscape ? '297 / 210' : '210 / 297',
      }}
    >
      {/* Outer Border Decorator */}
      <div className={`w-full h-full relative flex flex-col justify-between ${borderStyles[style.borderStyle] || 'border-4 border-slate-800 p-6'}`}>
        
        {/* Corner Ornaments if decorative enabled */}
        {style.showDecorativeElements && (
          <>
            <div className="absolute top-2 left-2 text-amber-700/60 pointer-events-none select-none">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0,0 L40,0 C20,10 10,20 0,40 Z M15,15 C25,5 35,5 45,5 L45,0 L0,0 L0,45 L5,45 C5,35 5,25 15,15 Z" />
              </svg>
            </div>
            <div className="absolute top-2 right-2 text-amber-700/60 pointer-events-none select-none rotate-90">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0,0 L40,0 C20,10 10,20 0,40 Z M15,15 C25,5 35,5 45,5 L45,0 L0,0 L0,45 L5,45 C5,35 5,25 15,15 Z" />
              </svg>
            </div>
            <div className="absolute bottom-2 left-2 text-amber-700/60 pointer-events-none select-none -rotate-90">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0,0 L40,0 C20,10 10,20 0,40 Z M15,15 C25,5 35,5 45,5 L45,0 L0,0 L0,45 L5,45 C5,35 5,25 15,15 Z" />
              </svg>
            </div>
            <div className="absolute bottom-2 right-2 text-amber-700/60 pointer-events-none select-none rotate-180">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0,0 L40,0 C20,10 10,20 0,40 Z M15,15 C25,5 35,5 45,5 L45,0 L0,0 L0,45 L5,45 C5,35 5,25 15,15 Z" />
              </svg>
            </div>
          </>
        )}

        {/* Large Visible Diagonal Watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 select-none overflow-hidden"
          style={{ opacity: watermarkOpacity }}
        >
          <div className="transform -rotate-35 text-center">
            <span className="text-4xl sm:text-5xl md:text-6xl font-black tracking-widest uppercase border-y-4 border-dashed border-red-700 py-3 px-6 text-red-800 whitespace-nowrap">
              {style.watermarkText || 'SAMPLE – NOT AN OFFICIAL CIVIL REGISTRY DOCUMENT'}
            </span>
            <p className="text-xs sm:text-sm font-semibold tracking-wider mt-2 text-red-700 uppercase">
              EDUCATIONAL / DEMONSTRATION TEMPLATE ONLY
            </p>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center relative z-20 space-y-1">
          {/* Top Compliance Notice Bar */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-amber-100/90 text-amber-900 border border-amber-300">
            <ShieldAlert className="w-3 h-3 text-amber-800" />
            <span>SAMPLE RECORD SPECIMEN &bull; NOT AN OFFICIAL GOVERNMENT DOCUMENT</span>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            {style.showDecorativeElements && (
              <div className="w-10 sm:w-16 h-[1px] bg-slate-400"></div>
            )}
            <div className="flex items-center gap-2">
              <Baby className="w-6 h-6 text-navy-800 text-sky-800" />
              <span className="text-xs uppercase tracking-widest font-semibold text-slate-500">
                Civil Registration Template
              </span>
            </div>
            {style.showDecorativeElements && (
              <div className="w-10 sm:w-16 h-[1px] bg-slate-400"></div>
            )}
          </div>

          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-wide uppercase text-slate-900 ${fontClass}`}>
            {style.certificateTitle || 'Certificate of Live Birth'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium tracking-wide">
            {style.subTitle || 'RECORD OF CIVIL INFORMATION SPECIMEN'}
          </p>
        </div>

        {/* Main Body Layout depends on template */}
        <div className={`relative z-20 my-auto py-3 ${textSizeBase} ${bodyFontClass} space-y-4`}>
          
          {/* Child Focus Hero Section */}
          <div className="text-center bg-slate-50/70 rounded-lg p-3 sm:p-4 border border-slate-200/80">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-1">
              This certifies that the personal details recorded herein belong to
            </p>
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 ${style.fontStyle === 'formal' ? 'font-formal italic' : 'font-serif'}`}>
              {childDisplayName}
            </h2>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs sm:text-sm text-slate-700">
              <span className="inline-flex items-center gap-1 font-medium">
                <span className="text-slate-500">Sex:</span>{' '}
                <strong className="text-slate-900">{child.sex || '—'}</strong>
              </span>
              <span className="inline-flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-500">Date of Birth:</span>{' '}
                <strong className="text-slate-900">{formattedDob}</strong>
              </span>
              {child.timeOfBirth && (
                <span className="inline-flex items-center gap-1 font-medium">
                  <span className="text-slate-500">Time:</span>{' '}
                  <strong className="text-slate-900">{child.timeOfBirth}</strong>
                </span>
              )}
              {calculatedAge && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-sky-100 text-sky-800 border border-sky-200">
                  Calculated: {calculatedAge}
                </span>
              )}
            </div>
          </div>

          {/* Place of Birth & Delivery Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3 bg-white/80 rounded border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs uppercase tracking-wider mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-700" />
                <span>Place of Birth</span>
              </div>
              <p className="font-semibold text-slate-900">
                {child.placeOfBirth || child.cityMunicipality || 'City / Municipality'}
              </p>
              <p className="text-slate-600 text-xs">
                {[child.cityMunicipality, child.provinceState, child.country]
                  .filter(Boolean)
                  .join(', ') || 'Province, Country'}
              </p>
              {additional.hospitalFacility && (
                <p className="text-slate-500 text-xs mt-1 italic">
                  Facility: {additional.hospitalFacility}
                </p>
              )}
            </div>

            <div className="p-3 bg-white/80 rounded border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs uppercase tracking-wider mb-1.5">
                <Award className="w-3.5 h-3.5 text-sky-700" />
                <span>Birth Particulars</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500">Type of Birth:</span>
                  <p className="font-medium text-slate-900">{additional.birthType || 'Single'}</p>
                </div>
                <div>
                  <span className="text-slate-500">Birth Order:</span>
                  <p className="font-medium text-slate-900">{additional.birthOrder || '—'}</p>
                </div>
              </div>
              {additional.attendantAtBirth && (
                <p className="text-slate-600 text-xs mt-1.5">
                  <span className="text-slate-500">Attendant:</span> {additional.attendantAtBirth}
                </p>
              )}
            </div>
          </div>

          {/* Parents Information Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Father */}
            <div className="p-3 bg-white/90 rounded border border-slate-200/90 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs uppercase tracking-wider border-b border-slate-100 pb-1">
                <User className="w-3.5 h-3.5 text-indigo-700" />
                <span>Father's Details</span>
              </div>
              <div>
                <p className="text-xs text-slate-500">Full Legal Name</p>
                <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                  {father.fullName || '—'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] sm:text-xs pt-0.5">
                <div>
                  <span className="text-slate-500">Nationality:</span>
                  <p className="font-medium text-slate-800">{father.nationality || '—'}</p>
                </div>
                <div>
                  <span className="text-slate-500">Date of Birth:</span>
                  <p className="font-medium text-slate-800">
                    {formatDisplayDate(father.dateOfBirth, style.dateFormat)}
                  </p>
                </div>
              </div>
              {father.placeOfBirth && (
                <p className="text-[11px] text-slate-600">
                  <span className="text-slate-500">Birthplace:</span> {father.placeOfBirth}
                </p>
              )}
            </div>

            {/* Mother */}
            <div className="p-3 bg-white/90 rounded border border-slate-200/90 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs uppercase tracking-wider border-b border-slate-100 pb-1">
                <User className="w-3.5 h-3.5 text-rose-700" />
                <span>Mother's Details</span>
              </div>
              <div>
                <p className="text-xs text-slate-500">Full Legal / Maiden Name</p>
                <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                  {mother.fullName || '—'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] sm:text-xs pt-0.5">
                <div>
                  <span className="text-slate-500">Nationality:</span>
                  <p className="font-medium text-slate-800">{mother.nationality || '—'}</p>
                </div>
                <div>
                  <span className="text-slate-500">Date of Birth:</span>
                  <p className="font-medium text-slate-800">
                    {formatDisplayDate(mother.dateOfBirth, style.dateFormat)}
                  </p>
                </div>
              </div>
              {mother.placeOfBirth && (
                <p className="text-[11px] text-slate-600">
                  <span className="text-slate-500">Birthplace:</span> {mother.placeOfBirth}
                </p>
              )}
            </div>
          </div>

          {/* Administrative / Remarks Section */}
          {additional.remarks && (
            <div className="px-3 py-2 bg-slate-50/60 rounded border border-slate-200/70 text-[11px] text-slate-600">
              <span className="font-semibold text-slate-700">Administrative Remarks:</span>{' '}
              {additional.remarks}
            </div>
          )}
        </div>

        {/* Footer Attestation & Mock Signature Line */}
        <div className="relative z-20 pt-4 border-t border-slate-300/80 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 items-end gap-4 text-center">
            {/* Left Mock Verification */}
            <div className="flex flex-col items-center">
              <div className="w-24 sm:w-32 border-b border-slate-400 pb-1 text-[11px] sm:text-xs text-slate-700 font-mono">
                {formattedRegDate || formatDisplayDate(new Date().toISOString().split('T')[0], style.dateFormat)}
              </div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">
                Date Recorded (Sample)
              </span>
            </div>

            {/* Middle Mock Emboss Badge */}
            <div className="hidden sm:flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-amber-600/70 flex flex-col items-center justify-center p-1 text-[8px] uppercase tracking-tighter text-amber-800 font-bold text-center bg-amber-50/50">
                <span>Sample</span>
                <span>Registry</span>
                <span>Seal</span>
              </div>
            </div>

            {/* Right Mock Registrar */}
            <div className="flex flex-col items-center">
              <div className="w-28 sm:w-36 border-b border-slate-400 pb-1 text-xs font-signature text-slate-700 italic">
                Sample Officer Signature
              </div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">
                Sample Attendant / Registrar
              </span>
            </div>
          </div>

          {/* Legal Compliance Disclaimer Banner */}
          <div className="text-center pt-2 border-t border-slate-200 text-[9px] sm:text-[10px] text-slate-500 font-medium leading-tight">
            <p className="font-semibold text-red-700 uppercase tracking-wide">
              SAMPLE ONLY &bull; NOT AN OFFICIAL CIVIL REGISTRY DOCUMENT &bull; NO LEGAL STANDING
            </p>
            <p className="mt-0.5 text-slate-400">
              Generated via Certificate Template Generator for educational, design demonstration, and personal mockup purposes only.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
