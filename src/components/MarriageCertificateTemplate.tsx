import {
  CertificateStyle,
  MarriageCertificateData,
} from '../types/certificate';
import { calculateAge, formatDisplayDate } from '../utils/certificateUtils';
import { Calendar, Heart, MapPin, ShieldAlert, Sparkles, User, Users } from 'lucide-react';
import { PhilippineComTemplate } from './PhilippineComTemplate';

interface MarriageCertificateTemplateProps {
  data: MarriageCertificateData;
  style: CertificateStyle;
  isPrintMode?: boolean;
  page?: 'page1' | 'page2';
}

export const MarriageCertificateTemplate: React.FC<MarriageCertificateTemplateProps> = ({
  data,
  style,
  page = 'page1',
}) => {
  // Always use the official Municipal Form No. 97 template as requested
  if (!style?.templateId || style.templateId === 'ph-com-97' || style.templateId === 'official-ceremonial' || style.templateId === 'traditional-filipino') {
    return <PhilippineComTemplate data={data} style={style} page={page} />;
  }
  const { groom, bride, marriage, additional } = data;

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

  const groomDisplayName = groom.fullName?.trim() ||
    [groom.firstName, groom.middleName, groom.lastName].filter(Boolean).join(' ') ||
    'Name of Groom';

  const brideDisplayName = bride.fullName?.trim() ||
    [bride.firstName, bride.middleName, bride.lastName].filter(Boolean).join(' ') ||
    'Name of Bride';

  const formattedMarriageDate = formatDisplayDate(marriage.dateOfMarriage, style.dateFormat);
  const groomAge = calculateAge(groom.dateOfBirth, marriage.dateOfMarriage);
  const brideAge = calculateAge(bride.dateOfBirth, marriage.dateOfMarriage);

  const isLandscape = style.pageOrientation === 'landscape';
  const watermarkOpacity = style.watermarkOpacity ?? 0.12;

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden select-text ${bgClasses[style.backgroundColor] || 'bg-white'} ${marginClasses}`}
      style={{
        aspectRatio: isLandscape ? '297 / 210' : '210 / 297',
      }}
    >
      {/* Outer Certificate Frame */}
      <div className={`w-full h-full relative flex flex-col justify-between ${borderStyles[style.borderStyle] || 'border-4 border-slate-800 p-6'}`}>
        
        {/* Corner Ornaments */}
        {style.showDecorativeElements && (
          <>
            <div className="absolute top-2 left-2 text-rose-800/60 pointer-events-none select-none">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0,0 L40,0 C20,10 10,20 0,40 Z M15,15 C25,5 35,5 45,5 L45,0 L0,0 L0,45 L5,45 C5,35 5,25 15,15 Z" />
              </svg>
            </div>
            <div className="absolute top-2 right-2 text-rose-800/60 pointer-events-none select-none rotate-90">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0,0 L40,0 C20,10 10,20 0,40 Z M15,15 C25,5 35,5 45,5 L45,0 L0,0 L0,45 L5,45 C5,35 5,25 15,15 Z" />
              </svg>
            </div>
            <div className="absolute bottom-2 left-2 text-rose-800/60 pointer-events-none select-none -rotate-90">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0,0 L40,0 C20,10 10,20 0,40 Z M15,15 C25,5 35,5 45,5 L45,0 L0,0 L0,45 L5,45 C5,35 5,25 15,15 Z" />
              </svg>
            </div>
            <div className="absolute bottom-2 right-2 text-rose-800/60 pointer-events-none select-none rotate-180">
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
            <span>SAMPLE CEREMONIAL RECORD &bull; NOT AN OFFICIAL LEGAL RECORD</span>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            {style.showDecorativeElements && (
              <div className="w-10 sm:w-16 h-[1px] bg-slate-400"></div>
            )}
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-100" />
              <span className="text-xs uppercase tracking-widest font-semibold text-slate-500">
                Solemnization of Matrimony
              </span>
            </div>
            {style.showDecorativeElements && (
              <div className="w-10 sm:w-16 h-[1px] bg-slate-400"></div>
            )}
          </div>

          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-wide uppercase text-slate-900 ${fontClass}`}>
            {style.certificateTitle || 'Certificate of Marriage'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium tracking-wide">
            {style.subTitle || 'SAMPLE CEREMONIAL RECORD (NON-OFFICIAL SPECIMEN)'}
          </p>
        </div>

        {/* Main Body */}
        <div className={`relative z-20 my-auto py-3 ${textSizeBase} ${bodyFontClass} space-y-4`}>
          
          {/* Couple Announcement Box */}
          <div className="text-center bg-rose-50/40 rounded-lg p-3 sm:p-5 border border-rose-200/70">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2">
              This specimen certifies that on this day, the marriage covenants were celebrated between
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-6 my-2">
              {/* Groom */}
              <div className="flex-1 text-center">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Groom</span>
                <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 ${style.fontStyle === 'formal' ? 'font-formal italic' : 'font-serif'}`}>
                  {groomDisplayName}
                </h2>
                {groomAge && (
                  <span className="text-[11px] text-slate-500 italic block mt-0.5">
                    Age at marriage: {groomAge}
                  </span>
                )}
              </div>

              {/* Heart Symbol */}
              <div className="px-2 py-1 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shadow-xs border border-rose-200">
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-600" />
                </div>
              </div>

              {/* Bride */}
              <div className="flex-1 text-center">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Bride</span>
                <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 ${style.fontStyle === 'formal' ? 'font-formal italic' : 'font-serif'}`}>
                  {brideDisplayName}
                </h2>
                {brideAge && (
                  <span className="text-[11px] text-slate-500 italic block mt-0.5">
                    Age at marriage: {brideAge}
                  </span>
                )}
              </div>
            </div>

            {/* Marriage Date & Time Ribbon */}
            <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-4 px-4 py-1.5 rounded-full bg-white/80 border border-rose-200/80 shadow-2xs text-xs sm:text-sm">
              <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                <Calendar className="w-4 h-4 text-rose-600" />
                <span>Date: {formattedMarriageDate}</span>
              </span>
              {marriage.timeOfMarriage && (
                <span className="text-slate-600 font-medium">
                  Time: {marriage.timeOfMarriage}
                </span>
              )}
              {marriage.ceremonyType && (
                <span className="text-slate-600 font-medium border-l border-slate-300 pl-3">
                  {marriage.ceremonyType}
                </span>
              )}
            </div>
          </div>

          {/* Place and Officiant Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3 bg-white/80 rounded border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs uppercase tracking-wider mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>Place of Solemnization</span>
              </div>
              <p className="font-semibold text-slate-900">
                {marriage.placeOfMarriage || marriage.cityMunicipality || 'Venue / Place of Marriage'}
              </p>
              <p className="text-slate-600 text-xs">
                {[marriage.cityMunicipality, marriage.provinceState, marriage.country]
                  .filter(Boolean)
                  .join(', ') || 'City, Province/State, Country'}
              </p>
            </div>

            <div className="p-3 bg-white/80 rounded border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>Ceremony & Officiant</span>
              </div>
              <p className="font-semibold text-slate-900">
                {marriage.officiantName || 'Sample Officiant / Solemnizing Authority'}
              </p>
              <p className="text-slate-500 text-xs italic">
                Role: Non-legal ceremonial facilitator (Demonstration sample)
              </p>
            </div>
          </div>

          {/* Groom & Bride Detailed Background */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Groom Details */}
            <div className="p-3 bg-white/90 rounded border border-slate-200/90 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs uppercase tracking-wider border-b border-slate-100 pb-1">
                <User className="w-3.5 h-3.5 text-slate-700" />
                <span>Groom Background</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] sm:text-xs pt-1">
                <div>
                  <span className="text-slate-500">Date of Birth:</span>
                  <p className="font-medium text-slate-800">
                    {formatDisplayDate(groom.dateOfBirth, style.dateFormat)}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">Nationality:</span>
                  <p className="font-medium text-slate-800">{groom.nationality || '—'}</p>
                </div>
              </div>
              {groom.placeOfBirth && (
                <p className="text-[11px] text-slate-600">
                  <span className="text-slate-500">Birthplace:</span> {groom.placeOfBirth}
                </p>
              )}
              {groom.currentAddress && (
                <p className="text-[11px] text-slate-600">
                  <span className="text-slate-500">Residence:</span> {groom.currentAddress}
                </p>
              )}
            </div>

            {/* Bride Details */}
            <div className="p-3 bg-white/90 rounded border border-slate-200/90 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs uppercase tracking-wider border-b border-slate-100 pb-1">
                <User className="w-3.5 h-3.5 text-rose-700" />
                <span>Bride Background</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] sm:text-xs pt-1">
                <div>
                  <span className="text-slate-500">Date of Birth:</span>
                  <p className="font-medium text-slate-800">
                    {formatDisplayDate(bride.dateOfBirth, style.dateFormat)}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">Nationality:</span>
                  <p className="font-medium text-slate-800">{bride.nationality || '—'}</p>
                </div>
              </div>
              {bride.placeOfBirth && (
                <p className="text-[11px] text-slate-600">
                  <span className="text-slate-500">Birthplace:</span> {bride.placeOfBirth}
                </p>
              )}
              {bride.currentAddress && (
                <p className="text-[11px] text-slate-600">
                  <span className="text-slate-500">Residence:</span> {bride.currentAddress}
                </p>
              )}
            </div>
          </div>

          {/* Witnesses Section */}
          <div className="p-3 bg-slate-50/70 rounded border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5 text-slate-700" />
              <span>Attesting Witnesses</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="border-t border-slate-300 pt-1.5">
                <p className="font-medium text-xs sm:text-sm text-slate-900">
                  {additional.witness1Name || 'Sample Witness 1'}
                </p>
                <span className="text-[10px] text-slate-500 uppercase">Witness of Matrimony</span>
              </div>
              <div className="border-t border-slate-300 pt-1.5">
                <p className="font-medium text-xs sm:text-sm text-slate-900">
                  {additional.witness2Name || 'Sample Witness 2'}
                </p>
                <span className="text-[10px] text-slate-500 uppercase">Witness of Matrimony</span>
              </div>
            </div>
          </div>

          {marriage.remarks && (
            <div className="px-3 py-1.5 bg-slate-50/60 rounded border border-slate-200/70 text-[11px] text-slate-600">
              <span className="font-semibold text-slate-700">Remarks:</span> {marriage.remarks}
            </div>
          )}
        </div>

        {/* Footer Attestation & Mock Signature Line */}
        <div className="relative z-20 pt-4 border-t border-slate-300/80 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 items-end gap-4 text-center">
            {/* Left Mock Verification */}
            <div className="flex flex-col items-center">
              <div className="w-24 sm:w-32 border-b border-slate-400 pb-1 text-[11px] sm:text-xs text-slate-700 font-mono">
                {formatDisplayDate(additional.dateOfPreparation, style.dateFormat)}
              </div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">
                Date Prepared (Sample)
              </span>
            </div>

            {/* Middle Mock Emboss Badge */}
            <div className="hidden sm:flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-rose-600/70 flex flex-col items-center justify-center p-1 text-[8px] uppercase tracking-tighter text-rose-800 font-bold text-center bg-rose-50/50">
                <span>Sample</span>
                <span>Matrimony</span>
                <span>Seal</span>
              </div>
            </div>

            {/* Right Mock Officiant Signature */}
            <div className="flex flex-col items-center">
              <div className="w-28 sm:w-36 border-b border-slate-400 pb-1 text-xs font-signature text-slate-700 italic">
                Sample Celebrant
              </div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">
                Mock Officiant / Solemnizer
              </span>
            </div>
          </div>

          {/* Legal Compliance Disclaimer Banner */}
          <div className="text-center pt-2 border-t border-slate-200 text-[9px] sm:text-[10px] text-slate-500 font-medium leading-tight">
            <p className="font-semibold text-red-700 uppercase tracking-wide">
              SAMPLE ONLY &bull; NOT AN OFFICIAL CIVIL REGISTRY DOCUMENT &bull; NO LEGAL STANDING
            </p>
            <p className="mt-0.5 text-slate-400">
              Generated via Certificate Template Generator for educational, personal demonstration, and design mockup purposes only.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
