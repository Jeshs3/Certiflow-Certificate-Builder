import React from 'react';
import { BirthCertificateData, CertificateStyle } from '../types/certificate';
import { ShieldAlert } from 'lucide-react';

interface PhilippineColbTemplateProps {
  data: BirthCertificateData;
  style: CertificateStyle;
  page?: 'page1' | 'page2';
}

export const PhilippineColbTemplate: React.FC<PhilippineColbTemplateProps> = ({
  data,
  style,
  page = 'page1',
}) => {
  const { child, father, mother, additional, colb } = data;

  const watermarkOpacity = style.watermarkOpacity ?? 0.12;

  // Split names
  const childFirst = child.firstName || '';
  const childMiddle = child.middleName || '';
  const childLast = child.lastName || '';

  // Dates
  let bDay = '';
  let bMonth = '';
  let bYear = '';
  if (child.dateOfBirth) {
    const parts = child.dateOfBirth.split('-');
    if (parts.length === 3) {
      bYear = parts[0];
      const monthNum = parseInt(parts[1], 10);
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      bMonth = months[monthNum - 1] || parts[1];
      bDay = parts[2];
    }
  }

  // Mother name
  const motherFirst = colb?.motherFirstName || mother.fullName.split(' ')[0] || '';
  const motherLast = colb?.motherLastName || mother.fullName.split(' ').slice(1).join(' ') || '';
  const motherMiddle = colb?.motherMiddleName || '';

  // Father name
  const fatherFirst = colb?.fatherFirstName || father.fullName.split(' ')[0] || '';
  const fatherLast = colb?.fatherLastName || father.fullName.split(' ').slice(1).join(' ') || '';
  const fatherMiddle = colb?.fatherMiddleName || '';

  // Checkbox marker helper
  const CheckX: React.FC<{ checked: boolean; label: string }> = ({ checked, label }) => (
    <span className="inline-flex items-center gap-1">
      <span className="inline-block w-3.5 h-3.5 border border-green-800 text-center leading-none text-[10px] font-bold text-green-950 bg-white">
        {checked ? 'X' : ''}
      </span>
      <span>{label}</span>
    </span>
  );

  if (page === 'page2') {
    return (
      <div
        className="relative w-full h-full bg-white text-green-950 font-serif select-text p-4 sm:p-6 overflow-hidden flex flex-col justify-between border-[3px] border-green-800"
        style={{ aspectRatio: '210 / 297' }}
      >
        {/* Diagonal Watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 select-none overflow-hidden"
          style={{ opacity: watermarkOpacity }}
        >
          <div className="transform -rotate-35 text-center">
            <span className="text-3xl sm:text-5xl font-black tracking-widest uppercase border-y-4 border-dashed border-red-700 py-3 px-6 text-red-800 whitespace-nowrap">
              {style.watermarkText || 'SAMPLE – NOT AN OFFICIAL CIVIL REGISTRY DOCUMENT'}
            </span>
            <p className="text-xs sm:text-sm font-semibold tracking-wider mt-2 text-red-700 uppercase">
              EDUCATIONAL / DEMONSTRATION TEMPLATE ONLY
            </p>
          </div>
        </div>

        {/* Top Notation */}
        <div className="text-center relative z-20 pb-1 border-b border-green-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-green-50 text-green-900 border border-green-300">
            <ShieldAlert className="w-3 h-3 text-green-800" />
            <span>CIVIL REGISTRY AFFIDAVITS • MUNICIPALITY OF SAGBAYAN, BOHOL</span>
          </div>
        </div>

        {/* SECTION 1: AFFIDAVIT OF PATERNITY */}
        <div className="relative z-20 text-[10px] sm:text-[11px] leading-tight space-y-2 border-b-2 border-green-800 pb-3">
          <p className="text-[9px] italic text-center font-sans font-semibold">
            For this before 3 August 1988 / on or after 3 August 1998
          </p>
          <h2 className="text-center font-bold text-xs uppercase tracking-wide">
            AFFIDAVIT OF ACKNOWLEDGEMENT / ADMISSION OF PATERNITY
          </h2>

          <p className="text-justify leading-relaxed">
            We/I,{' '}
            <span className="font-bold underline px-1">
              {father.fullName || `${fatherFirst} ${fatherMiddle} ${fatherLast}` || '_______________________________________'}
            </span>{' '}
            and{' '}
            <span className="font-bold underline px-1">
              {mother.fullName || `${motherFirst} ${motherMiddle} ${motherLast}` || '_______________________________________'}
            </span>
            , parents/parent of the child mentioned in this Certificate of Live Birth, do hereby solemnly swear that the information contained herein are true and correct to the best of our/my knowledge and belief.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-3 text-center">
            <div>
              <div className="border-b border-green-900 font-signature text-xs italic pb-0.5">
                {father.fullName || 'Sample Father Signature'}
              </div>
              <p className="text-[9px] uppercase font-sans mt-0.5">(Signature of Father)</p>
              <div className="text-left text-[9px] space-y-0.5 mt-1 font-sans">
                <p>Community Tax No.: <span className="underline">{colb?.affidavitPaternityFatherCtc || '0829103'}</span></p>
                <p>Date Issued: <span className="underline">{colb?.attendantDate || 'January 15, 2023'}</span></p>
                <p>Place Issued: <span className="underline">{child.cityMunicipality || 'Antipolo City'}</span></p>
              </div>
            </div>

            <div>
              <div className="border-b border-green-900 font-signature text-xs italic pb-0.5">
                {mother.fullName || 'Sample Mother Signature'}
              </div>
              <p className="text-[9px] uppercase font-sans mt-0.5">(Signature of Mother)</p>
              <div className="text-left text-[9px] space-y-0.5 mt-1 font-sans">
                <p>Community Tax No.: <span className="underline">{colb?.affidavitPaternityMotherCtc || '0829104'}</span></p>
                <p>Date Issued: <span className="underline">{colb?.attendantDate || 'January 15, 2023'}</span></p>
                <p>Place Issued: <span className="underline">{child.cityMunicipality || 'Antipolo City'}</span></p>
              </div>
            </div>
          </div>

          <div className="pt-2 text-[9px] leading-relaxed">
            <p>
              SUBSCRIBED AND SWORN to before me this <span className="underline px-2 font-bold">{bDay || '16th'}</span> day of{' '}
              <span className="underline px-2 font-bold">{bMonth || 'August'}</span>,{' '}
              <span className="underline px-2 font-bold">{bYear || '2023'}</span> at{' '}
              <span className="underline px-2 font-bold">{colb?.cityMunicipality || child.cityMunicipality || 'City of Antipolo'}</span>, Philippines.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-2 text-center text-[9px]">
            <div>
              <div className="border-b border-green-900 font-signature text-xs italic pb-0.5">
                {colb?.affidavitPaternityAdminOfficer || 'Sample Administering Officer'}
              </div>
              <p className="uppercase font-sans">(Signature of Administering Officer)</p>
              <p className="mt-1 font-semibold">{colb?.affidavitPaternityAdminOfficer || 'Atty. Gregorio L. Santos'}</p>
              <p className="text-[8px] font-sans text-green-800">(Name in Print)</p>
            </div>
            <div>
              <div className="border-b border-green-900 pb-0.5 font-sans font-semibold">
                City Civil Registrar
              </div>
              <p className="uppercase font-sans">(Title / Designation)</p>
              <p className="mt-1">{colb?.cityMunicipality || child.cityMunicipality || 'City Hall Complex'}, Philippines</p>
              <p className="text-[8px] font-sans text-green-800">(Address)</p>
            </div>
          </div>
        </div>

        {/* SECTION 2: AFFIDAVIT FOR DELAYED REGISTRATION */}
        <div className="relative z-20 text-[9px] sm:text-[10px] leading-tight space-y-1.5 pt-2">
          <p className="text-[8px] italic text-center font-sans font-semibold">
            Not applicable for births before 27 February 1931
          </p>
          <h2 className="text-center font-bold text-xs uppercase tracking-wide">
            AFFIDAVIT FOR DELAYED REGISTRATION OF BIRTH
          </h2>
          <p className="text-center text-[8px] font-sans italic">
            (Either the person himself if 18 years old or over, or father/mother/guardian may accomplish this affidavit.)
          </p>

          <p className="text-justify leading-relaxed text-[9px]">
            I, <span className="underline font-bold px-1">{father.fullName || 'ROBERTO M. DELA CRUZ'}</span>, of legal age, married, and with residence and postal address at <span className="underline px-1">{colb?.motherResidenceStreet || '142 Sampaguita St., Antipolo City'}</span>, after having been duly sworn to in accordance with law, do hereby depose and say:
          </p>

          <ol className="list-decimal list-inside space-y-1 text-[9px] leading-normal pl-1">
            <li>That I am the applicant for the delayed registration of the birth of <span className="underline font-bold px-1">{child.fullName || 'JUAN MIGUEL S. DELA CRUZ'}</span>.</li>
            <li>That he/she was born on <span className="underline px-1 font-bold">{child.dateOfBirth || '2023-08-16'}</span> at <span className="underline px-1">{child.placeOfBirth || 'Rizal Provincial Hospital'}</span>.</li>
            <li>That he/she was attended at birth by <span className="underline px-1">{colb?.attendantSignatureName || 'Dr. Eleanor G. Martinez, MD'}</span> who resides at <span className="underline px-1">{colb?.attendantAddress || 'Antipolo City'}</span>.</li>
            <li>That he/she is a citizen of <span className="underline px-1">Philippines</span>.</li>
            <li>That parents were married on <span className="underline px-1">{colb?.parentsMarriageDatePlace || 'October 18, 2020'}</span>.</li>
            <li>That the reason for delay was due to: <span className="underline px-1">Sample classroom registration demonstration exercise</span>.</li>
            <li>That this record is needed for: <span className="underline px-1">Personal educational and design mockup presentation</span>.</li>
          </ol>

          <div className="pt-2 flex justify-end">
            <div className="text-center w-48 text-[9px]">
              <div className="border-b border-green-900 font-signature text-xs italic pb-0.5">
                {father.fullName || 'Sample Affiant Signature'}
              </div>
              <p className="uppercase font-sans">(Signature of Affiant)</p>
            </div>
          </div>
        </div>

        {/* Footer Notation */}
        <div className="relative z-20 text-center pt-2 border-t border-green-800 text-[8px] sm:text-[9px] text-green-900 leading-tight">
          <p className="font-bold uppercase">
            OFFICE OF THE MUNICIPAL CIVIL REGISTRAR &bull; SAGBAYAN, BOHOL
          </p>
          <p className="text-slate-500 mt-0.5">
            Municipal Form No. 102 (Revised January 1993) &bull; Certiflow Document System
          </p>
        </div>
      </div>
    );
  }

  // PAGE 1: FRONT CERTIFICATE OF LIVE BIRTH
  return (
    <div
      className="relative w-full h-full bg-white text-green-950 font-serif select-text p-2 sm:p-4 overflow-hidden border-[3px] border-green-800 flex flex-col justify-between"
      style={{ aspectRatio: '210 / 297' }}
    >
      {/* Large Diagonal Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 select-none overflow-hidden"
        style={{ opacity: watermarkOpacity }}
      >
        <div className="transform -rotate-35 text-center">
          <span className="text-3xl sm:text-5xl md:text-6xl font-black tracking-widest uppercase border-y-4 border-dashed border-red-700 py-3 px-6 text-red-800 whitespace-nowrap">
            {style.watermarkText || 'SAMPLE – NOT AN OFFICIAL CIVIL REGISTRY DOCUMENT'}
          </span>
          <p className="text-xs sm:text-sm font-semibold tracking-wider mt-2 text-red-700 uppercase">
            EDUCATIONAL / DEMONSTRATION TEMPLATE ONLY
          </p>
        </div>
      </div>

      {/* HEADER SECTION */}
      <div className="relative z-20 border-b-2 border-green-800 pb-1">
        <div className="flex justify-between items-start text-[8px] sm:text-[9px] font-sans">
          <div>
            <p className="font-bold">Municipal Form No. 102</p>
            <p className="italic">(Revised January 1993)</p>
          </div>
          <p className="italic text-right">(To be accomplished in quadruplicate)</p>
        </div>

        <div className="text-center my-0.5 space-y-0.5">
          <p className="text-[9px] sm:text-[10px] tracking-wide uppercase font-semibold">
            Republic of the Philippines
          </p>
          <p className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
            OFFICE OF THE CIVIL REGISTRAR GENERAL
          </p>
          <h1 className="text-base sm:text-xl font-extrabold uppercase tracking-wide text-green-950">
            CERTIFICATE OF LIVE BIRTH
          </h1>
          <p className="text-[7.5px] sm:text-[8.5px] font-sans italic text-green-900">
            (Fill out completely, accurately and legibly. Use ink or typewriter. Place X before the appropriate ANSWER IN ITEMS 2, 5A, 5B AND 19A.)
          </p>
        </div>

        {/* Province / City / Registry Header Row */}
        <div className="grid grid-cols-12 border-t border-green-800 pt-1 text-[8.5px] sm:text-[9.5px]">
          <div className="col-span-8 space-y-0.5 pr-2">
            <div className="flex items-center gap-1">
              <span className="font-sans font-bold">Province:</span>
              <span className="flex-1 border-b border-green-900 uppercase font-semibold pl-1 font-mono">
                {colb?.province || child.provinceState || 'BOHOL'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-sans font-bold">City/Municipality:</span>
              <span className="flex-1 border-b border-green-900 uppercase font-semibold pl-1 font-mono">
                {colb?.cityMunicipality || child.cityMunicipality || 'SAGBAYAN'}
              </span>
            </div>
          </div>

          <div className="col-span-4 border-l border-green-800 pl-2 space-y-0.5">
            <div className="flex items-center gap-1">
              <span className="font-sans font-bold">Registry No.:</span>
              <span className="flex-1 border-b border-green-900 font-mono font-bold pl-1 text-green-900">
                {colb?.registryNo || '2023-081602'}
              </span>
            </div>
            <div className="text-[7px] text-green-800 uppercase tracking-tight text-right font-sans">
              REMARKS / ANNOTATION
            </div>
          </div>
        </div>
      </div>

      {/* MAIN TABULAR FORM BODY */}
      <div className="relative z-20 flex-1 border-b-2 border-green-800 text-[8px] sm:text-[9px] flex">
        
        {/* Left Vertical Label Strip (C H I L D / M O T H E R / F A T H E R) */}
        <div className="w-5 sm:w-6 border-r-2 border-green-800 flex flex-col font-sans font-bold text-center text-[8px] sm:text-[9px] bg-green-50/40 select-none">
          <div className="flex-1 flex items-center justify-center border-b border-green-800 py-2 leading-3">
            <span className="writing-vertical tracking-widest">CHILD</span>
          </div>
          <div className="flex-1 flex items-center justify-center border-b border-green-800 py-2 leading-3">
            <span className="writing-vertical tracking-widest">MOTHER</span>
          </div>
          <div className="flex-1 flex items-center justify-center py-2 leading-3">
            <span className="writing-vertical tracking-widest">FATHER</span>
          </div>
        </div>

        {/* Center Main Form Fields Grid */}
        <div className="flex-1 flex flex-col justify-between">
          
          {/* 1. NAME OF CHILD */}
          <div className="border-b border-green-800 p-1">
            <span className="font-sans font-bold">1. NAME</span>
            <div className="grid grid-cols-3 text-center pt-0.5">
              <div>
                <p className="font-bold text-[9px] sm:text-[10px] uppercase font-mono">{childFirst || 'JUAN MIGUEL'}</p>
                <span className="text-[7px] text-green-800 font-sans">(First)</span>
              </div>
              <div>
                <p className="font-bold text-[9px] sm:text-[10px] uppercase font-mono">{childMiddle || 'SANTOS'}</p>
                <span className="text-[7px] text-green-800 font-sans">(Middle)</span>
              </div>
              <div>
                <p className="font-bold text-[9px] sm:text-[10px] uppercase font-mono">{childLast || 'DELA CRUZ'}</p>
                <span className="text-[7px] text-green-800 font-sans">(Last)</span>
              </div>
            </div>
          </div>

          {/* 2. SEX & 3. DATE OF BIRTH */}
          <div className="grid grid-cols-12 border-b border-green-800">
            <div className="col-span-5 border-r border-green-800 p-1">
              <span className="font-sans font-bold block mb-0.5">2. SEX</span>
              <div className="flex items-center gap-3 pl-1 font-sans text-[8px] sm:text-[9px]">
                <CheckX checked={child.sex === 'Male'} label="1 Male" />
                <CheckX checked={child.sex === 'Female'} label="2 Female" />
              </div>
            </div>

            <div className="col-span-7 p-1">
              <span className="font-sans font-bold block mb-0.5">3. DATE OF BIRTH</span>
              <div className="grid grid-cols-3 text-center font-mono font-bold text-[8.5px] sm:text-[9.5px]">
                <div>
                  <p>{bDay || '16'}</p>
                  <span className="text-[7px] font-sans text-green-800 font-normal">(day)</span>
                </div>
                <div>
                  <p>{bMonth || 'August'}</p>
                  <span className="text-[7px] font-sans text-green-800 font-normal">(month)</span>
                </div>
                <div>
                  <p>{bYear || '2023'}</p>
                  <span className="text-[7px] font-sans text-green-800 font-normal">(year)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. PLACE OF BIRTH */}
          <div className="border-b border-green-800 p-1">
            <span className="font-sans font-bold block">4. PLACE OF BIRTH</span>
            <div className="grid grid-cols-3 gap-1 pt-0.5 font-mono text-[8.5px] sm:text-[9.5px] leading-tight">
              <div>
                <p className="font-bold truncate">{child.placeOfBirth || additional.hospitalFacility || 'Rizal Provincial Hospital'}</p>
                <span className="text-[6.5px] text-green-800 font-sans block">(Hospital/Clinic/House No., Street)</span>
              </div>
              <div>
                <p className="font-bold uppercase truncate">{child.cityMunicipality || 'Antipolo City'}</p>
                <span className="text-[6.5px] text-green-800 font-sans block">(City / Municipality)</span>
              </div>
              <div>
                <p className="font-bold uppercase truncate">{child.provinceState || 'Rizal'}</p>
                <span className="text-[6.5px] text-green-800 font-sans block">(Province)</span>
              </div>
            </div>
          </div>

          {/* 5. TYPE OF BIRTH, MULTIPLE ORDER, BIRTH ORDER, WEIGHT */}
          <div className="grid grid-cols-12 border-b-2 border-green-800">
            <div className="col-span-3 border-r border-green-800 p-1 font-sans">
              <span className="font-bold block mb-0.5 text-[7.5px] sm:text-[8px]">5a. TYPE OF BIRTH</span>
              <div className="space-y-0.5 text-[7.5px]">
                <CheckX checked={additional.birthType === 'Single'} label="1 Single" />
                <br />
                <CheckX checked={additional.birthType === 'Twin'} label="2 Twin" />
                <br />
                <CheckX checked={additional.birthType === 'Triplet' || additional.birthType === 'Multiple'} label="3 Triplet, Etc." />
              </div>
            </div>

            <div className="col-span-3 border-r border-green-800 p-1 font-sans">
              <span className="font-bold block mb-0.5 text-[7.5px] sm:text-[8px]">b. IF MULTIPLE BIRTH, CHILD WAS</span>
              <div className="space-y-0.5 text-[7.5px]">
                <CheckX checked={colb?.multipleBirthOrder === '1'} label="1 First" />
                <br />
                <CheckX checked={colb?.multipleBirthOrder === '2'} label="2 Second" />
                <br />
                <CheckX checked={colb?.multipleBirthOrder === '3'} label="3 Others, Specify" />
              </div>
            </div>

            <div className="col-span-3 border-r border-green-800 p-1">
              <span className="font-sans font-bold block text-[7.5px] sm:text-[8px]">c. BIRTH ORDER</span>
              <p className="font-mono font-bold text-[8.5px] mt-1">{additional.birthOrder || 'First'}</p>
              <span className="text-[6.5px] text-green-800 font-sans">(first, second, third, etc.)</span>
            </div>

            <div className="col-span-3 p-1">
              <span className="font-sans font-bold block text-[7.5px] sm:text-[8px]">d. WEIGHT AT BIRTH</span>
              <p className="font-mono font-bold text-[8.5px] mt-1">{colb?.weightAtBirth || '3250'} <span className="text-[7px] font-normal">grams</span></p>
            </div>
          </div>

          {/* 6. MOTHER'S MAIDEN NAME */}
          <div className="border-b border-green-800 p-1">
            <span className="font-sans font-bold">6. MAIDEN NAME</span>
            <div className="grid grid-cols-3 text-center pt-0.5">
              <div>
                <p className="font-bold text-[8.5px] sm:text-[9.5px] uppercase font-mono">{motherFirst || 'MARIA CLARA'}</p>
                <span className="text-[7px] text-green-800 font-sans">(First)</span>
              </div>
              <div>
                <p className="font-bold text-[8.5px] sm:text-[9.5px] uppercase font-mono">{motherMiddle || 'BAUTISTA'}</p>
                <span className="text-[7px] text-green-800 font-sans">(Middle)</span>
              </div>
              <div>
                <p className="font-bold text-[8.5px] sm:text-[9.5px] uppercase font-mono">{motherLast || 'SANTOS'}</p>
                <span className="text-[7px] text-green-800 font-sans">(Last)</span>
              </div>
            </div>
          </div>

          {/* 7. CITIZENSHIP & 8. RELIGION */}
          <div className="grid grid-cols-2 border-b border-green-800">
            <div className="border-r border-green-800 p-1">
              <span className="font-sans font-bold">7. CITIZENSHIP:</span>{' '}
              <span className="font-mono font-bold uppercase">{colb?.motherCitizenship || mother.nationality || 'FILIPINO'}</span>
            </div>
            <div className="p-1">
              <span className="font-sans font-bold">8. RELIGION:</span>{' '}
              <span className="font-mono font-bold uppercase">{colb?.motherReligion || 'ROMAN CATHOLIC'}</span>
            </div>
          </div>

          {/* 9. CHILDREN COUNTS, 10. OCCUPATION, 11. MOTHER AGE */}
          <div className="grid grid-cols-12 border-b border-green-800 text-[7.5px] sm:text-[8px]">
            <div className="col-span-3 border-r border-green-800 p-1">
              <span className="font-sans font-bold block">9a. Total born alive:</span>
              <span className="font-mono font-bold text-[9px]">{colb?.totalChildrenBornAlive || '1'}</span>
            </div>
            <div className="col-span-3 border-r border-green-800 p-1">
              <span className="font-sans font-bold block">b. Still living:</span>
              <span className="font-mono font-bold text-[9px]">{colb?.childrenStillLiving || '1'}</span>
            </div>
            <div className="col-span-2 border-r border-green-800 p-1">
              <span className="font-sans font-bold block">c. Now dead:</span>
              <span className="font-mono font-bold text-[9px]">{colb?.childrenNowDead || '0'}</span>
            </div>
            <div className="col-span-2 border-r border-green-800 p-1">
              <span className="font-sans font-bold block">10. OCCUPATION:</span>
              <span className="font-mono font-bold truncate block">{colb?.motherOccupation || 'TEACHER'}</span>
            </div>
            <div className="col-span-2 p-1">
              <span className="font-sans font-bold block">11. Age at birth:</span>
              <span className="font-mono font-bold">{colb?.motherAgeAtBirth || '29'} yrs</span>
            </div>
          </div>

          {/* 12. MOTHER RESIDENCE */}
          <div className="border-b-2 border-green-800 p-1">
            <span className="font-sans font-bold block">12. RESIDENCE</span>
            <div className="grid grid-cols-3 gap-1 pt-0.5 font-mono text-[8px] sm:text-[9px]">
              <div>
                <p className="font-bold truncate">{colb?.motherResidenceStreet || '142 Sampaguita St., Brgy. San Roque'}</p>
                <span className="text-[6.5px] text-green-800 font-sans block">(House No., Street, Barangay)</span>
              </div>
              <div>
                <p className="font-bold uppercase truncate">{colb?.motherResidenceCity || child.cityMunicipality || 'Antipolo City'}</p>
                <span className="text-[6.5px] text-green-800 font-sans block">(City / Municipality)</span>
              </div>
              <div>
                <p className="font-bold uppercase truncate">{colb?.motherResidenceProvince || child.provinceState || 'Rizal'}</p>
                <span className="text-[6.5px] text-green-800 font-sans block">(Province)</span>
              </div>
            </div>
          </div>

          {/* 13. FATHER'S NAME */}
          <div className="border-b border-green-800 p-1">
            <span className="font-sans font-bold">13. NAME</span>
            <div className="grid grid-cols-3 text-center pt-0.5">
              <div>
                <p className="font-bold text-[8.5px] sm:text-[9.5px] uppercase font-mono">{fatherFirst || 'ROBERTO'}</p>
                <span className="text-[7px] text-green-800 font-sans">(First)</span>
              </div>
              <div>
                <p className="font-bold text-[8.5px] sm:text-[9.5px] uppercase font-mono">{fatherMiddle || 'MENDEZ'}</p>
                <span className="text-[7px] text-green-800 font-sans">(Middle)</span>
              </div>
              <div>
                <p className="font-bold text-[8.5px] sm:text-[9.5px] uppercase font-mono">{fatherLast || 'DELA CRUZ'}</p>
                <span className="text-[7px] text-green-800 font-sans">(Last)</span>
              </div>
            </div>
          </div>

          {/* 14. FATHER CITIZENSHIP, 15. RELIGION, 16. OCCUPATION, 17. AGE */}
          <div className="grid grid-cols-12 border-b-2 border-green-800 text-[8px] sm:text-[8.5px]">
            <div className="col-span-3 border-r border-green-800 p-1">
              <span className="font-sans font-bold">14. CITIZENSHIP:</span>
              <p className="font-mono font-bold uppercase">{colb?.fatherCitizenship || father.nationality || 'FILIPINO'}</p>
            </div>
            <div className="col-span-3 border-r border-green-800 p-1">
              <span className="font-sans font-bold">15. RELIGION:</span>
              <p className="font-mono font-bold uppercase">{colb?.fatherReligion || 'ROMAN CATHOLIC'}</p>
            </div>
            <div className="col-span-4 border-r border-green-800 p-1">
              <span className="font-sans font-bold">16. OCCUPATION:</span>
              <p className="font-mono font-bold uppercase truncate">{colb?.fatherOccupation || 'CIVIL ENGINEER'}</p>
            </div>
            <div className="col-span-2 p-1">
              <span className="font-sans font-bold">17. Age:</span>
              <p className="font-mono font-bold">{colb?.fatherAgeAtBirth || '32'} yrs</p>
            </div>
          </div>

          {/* 18. MARRIAGE OF PARENTS */}
          <div className="border-b border-green-800 p-1">
            <span className="font-sans font-bold block text-[7.5px] sm:text-[8px]">
              18. DATE AND PLACE OF MARRIAGE OF PARENTS{' '}
              <span className="font-normal italic">(If not married, accomplish Affidavit of Acknowledgement/Admission of Paternity at the back.)</span>
            </span>
            <p className="font-mono font-bold text-[8.5px] uppercase mt-0.5 pl-1">
              {colb?.parentsMarriageDatePlace || 'OCTOBER 18, 2020 - ANTIPOLO CATHEDRAL, ANTIPOLO CITY'}
            </p>
          </div>

          {/* 19a. ATTENDANT & 19b. CERTIFICATION OF BIRTH */}
          <div className="border-b border-green-800 p-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2 font-sans text-[7.5px] sm:text-[8px]">
              <span className="font-bold">19a. ATTENDANT:</span>
              <CheckX checked={Boolean(colb?.attendantType === '1' || additional.attendantAtBirth?.toLowerCase().includes('physician'))} label="1 Physician" />
              <CheckX checked={Boolean(colb?.attendantType === '2')} label="2 Nurse" />
              <CheckX checked={Boolean(colb?.attendantType === '3')} label="3 Midwife" />
              <CheckX checked={Boolean(colb?.attendantType === '4')} label="4 Hilot" />
              <CheckX checked={Boolean(colb?.attendantType === '5')} label="5 Others" />
            </div>

            <div className="text-[7.5px] sm:text-[8px] font-sans leading-tight">
              <p>
                <span className="font-bold">19b. CERTIFICATION OF BIRTH:</span> I hereby certify that I attended the birth of the child who was born alive at{' '}
                <span className="font-mono font-bold underline px-1">{colb?.attendantTime || child.timeOfBirth || '07:35 AM'}</span> on the date stated above.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-1 font-mono text-[7.5px] sm:text-[8px]">
                <div className="space-y-0.5">
                  <p>Signature: <span className="font-signature text-xs italic">{colb?.attendantSignatureName || 'Dr. Eleanor G. Martinez'}</span></p>
                  <p>Name in Print: <span className="font-bold uppercase">{colb?.attendantSignatureName || 'DR. ELEANOR G. MARTINEZ, MD'}</span></p>
                  <p>Title or Position: <span>{colb?.attendantTitlePosition || 'OB-GYNECOLOGIST'}</span></p>
                </div>
                <div className="space-y-0.5">
                  <p>Address: <span className="truncate block">{colb?.attendantAddress || child.placeOfBirth || 'Rizal Provincial Hospital, Antipolo City'}</span></p>
                  <p>Date: <span>{colb?.attendantDate || additional.dateOfRegistration || '2023-08-16'}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* 20. INFORMANT */}
          <div className="border-b border-green-800 p-1 text-[7.5px] sm:text-[8px]">
            <span className="font-sans font-bold">20. INFORMANT:</span>
            <div className="grid grid-cols-2 gap-4 pt-0.5 font-mono text-[7.5px] sm:text-[8px]">
              <div className="space-y-0.5">
                <p>Signature: <span className="font-signature text-xs italic">{colb?.informantSignatureName || 'Roberto Dela Cruz'}</span></p>
                <p>Name in Print: <span className="font-bold uppercase">{colb?.informantSignatureName || 'ROBERTO M. DELA CRUZ'}</span></p>
                <p>Relationship: <span className="uppercase">{colb?.informantRelationship || 'FATHER'}</span></p>
              </div>
              <div className="space-y-0.5">
                <p>Address: <span className="truncate block">{colb?.informantAddress || colb?.motherResidenceStreet || '142 Sampaguita St., Antipolo City'}</span></p>
                <p>Date: <span>{colb?.informantDate || '2023-08-17'}</span></p>
              </div>
            </div>
          </div>

          {/* 21. PREPARED BY & 22. RECEIVED AT OFFICE OF CIVIL REGISTRAR */}
          <div className="grid grid-cols-2 text-[7.5px] sm:text-[8px]">
            <div className="border-r border-green-800 p-1 space-y-0.5 font-mono">
              <span className="font-sans font-bold block">21. PREPARED BY</span>
              <p>Signature: <span className="font-signature text-xs italic">{colb?.preparedByName || 'Carmina Reyes'}</span></p>
              <p>Name: <span className="font-bold uppercase">{colb?.preparedByName || 'CARMINA R. REYES'}</span></p>
              <p>Title: <span>{colb?.preparedByTitle || 'RECORDS CLERK'}</span></p>
              <p>Date: <span>{colb?.preparedByDate || '2023-08-17'}</span></p>
            </div>

            <div className="p-1 space-y-0.5 font-mono">
              <span className="font-sans font-bold block">22. RECEIVED AT OFFICE OF CIVIL REGISTRAR</span>
              <p>Signature: <span className="font-signature text-xs italic">{colb?.receivedByName || 'Atty. Gregorio Santos'}</span></p>
              <p>Name: <span className="font-bold uppercase">{colb?.receivedByName || 'ATTY. GREGORIO L. SANTOS'}</span></p>
              <p>Title: <span>{colb?.receivedByTitle || 'CITY CIVIL REGISTRAR'}</span></p>
              <p>Date: <span>{colb?.receivedByDate || additional.dateOfRegistration || '2023-08-18'}</span></p>
            </div>
          </div>

        </div>

        {/* Right Vertical OCRG Coding Column */}
        <div className="w-14 sm:w-16 border-l-2 border-green-800 p-1 flex flex-col justify-between text-[6.5px] sm:text-[7px] font-sans bg-green-50/20 text-center select-none">
          <div>
            <p className="font-bold text-[6px] uppercase leading-tight text-green-900">
              FOR OCRG USE ONLY:
            </p>
            <p className="text-[5.5px] text-green-800 leading-tight">Population ref No.</p>
            <div className="h-4 border border-green-800 my-1 bg-white"></div>
            <p className="font-bold text-[5.5px] leading-tight uppercase mt-2">
              TO BE FILLED UP AT THE CIVIL REGISTRAR
            </p>
          </div>

          <div className="space-y-1 font-mono text-[7px] text-green-900 my-auto">
            <div className="border border-green-800 p-0.5">41</div>
            <div className="border border-green-800 p-0.5">48</div>
            <div className="grid grid-cols-2 gap-0.5">
              <div className="border border-green-800 p-0.5">49</div>
              <div className="border border-green-800 p-0.5">50</div>
            </div>
            <div className="border border-green-800 p-0.5">56</div>
            <div className="border border-green-800 p-0.5">61</div>
            <div className="grid grid-cols-2 gap-0.5">
              <div className="border border-green-800 p-0.5">62</div>
              <div className="border border-green-800 p-0.5">64</div>
            </div>
            <div className="grid grid-cols-2 gap-0.5">
              <div className="border border-green-800 p-0.5">68</div>
              <div className="border border-green-800 p-0.5">69</div>
            </div>
            <div className="border border-green-800 p-0.5">70-74</div>
            <div className="border border-green-800 p-0.5">76-79</div>
            <div className="border border-green-800 p-0.5">81</div>
            <div className="border border-green-800 p-0.5">86-87</div>
            <div className="border border-green-800 p-0.5">88-91</div>
            <div className="border border-green-800 p-0.5">93-94</div>
          </div>
        </div>

      </div>

      {/* FOOTER RECORD NOTATION */}
      <div className="relative z-20 text-center pt-1 text-[7.5px] sm:text-[8.5px] text-green-900 leading-tight font-sans">
        <p className="font-bold uppercase tracking-wide">
          OFFICE OF THE MUNICIPAL CIVIL REGISTRAR &bull; MUNICIPALITY OF SAGBAYAN, BOHOL
        </p>
        <p className="text-slate-500 text-[7px] sm:text-[7.5px]">
          Philippine Municipal Form No. 102 (Revised January 1993) &bull; Certiflow Document System
        </p>
      </div>
    </div>
  );
};
