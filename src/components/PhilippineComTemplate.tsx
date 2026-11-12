import React from 'react';
import { CertificateStyle, MarriageCertificateData } from '../types/certificate';
import { ShieldAlert } from 'lucide-react';

interface PhilippineComTemplateProps {
  data: MarriageCertificateData;
  style?: CertificateStyle;
  page?: 'page1' | 'page2';
}

export const PhilippineComTemplate: React.FC<PhilippineComTemplateProps> = ({
  data,
  style,
  page = 'page1',
}) => {
  const { groom, bride, marriage, additional, com } = data;

  const watermarkOpacity = style?.watermarkOpacity ?? 0.12;

  // Husband info
  const hFirst = com?.husbandFirstName || groom.firstName || 'ALEXANDER';
  const hMiddle = com?.husbandMiddleName || groom.middleName || 'HENRY';
  const hLast = com?.husbandLastName || groom.lastName || 'HAYES';

  let hDay = com?.husbandDobDay || '';
  let hMonth = com?.husbandDobMonth || '';
  let hYear = com?.husbandDobYear || '';
  if (!hDay && groom.dateOfBirth) {
    const parts = groom.dateOfBirth.split('-');
    if (parts.length === 3) {
      hYear = parts[0];
      const monthNum = parseInt(parts[1], 10);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      hMonth = months[monthNum - 1] || parts[1];
      hDay = parts[2];
    }
  }

  // Wife info
  const wFirst = com?.wifeFirstName || bride.firstName || 'SOPHIA';
  const wMiddle = com?.wifeMiddleName || bride.middleName || 'CLAIRE';
  const wLast = com?.wifeLastName || bride.lastName || 'MONTGOMERY';

  let wDay = com?.wifeDobDay || '';
  let wMonth = com?.wifeDobMonth || '';
  let wYear = com?.wifeDobYear || '';
  if (!wDay && bride.dateOfBirth) {
    const parts = bride.dateOfBirth.split('-');
    if (parts.length === 3) {
      wYear = parts[0];
      const monthNum = parseInt(parts[1], 10);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      wMonth = months[monthNum - 1] || parts[1];
      wDay = parts[2];
    }
  }

  // Marriage date
  let mDay = com?.marriageDay || '';
  let mMonth = com?.marriageMonth || '';
  let mYear = com?.marriageYear || '';
  if (!mDay && marriage.dateOfMarriage) {
    const parts = marriage.dateOfMarriage.split('-');
    if (parts.length === 3) {
      mYear = parts[0];
      const monthNum = parseInt(parts[1], 10);
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      mMonth = months[monthNum - 1] || parts[1];
      mDay = parts[2];
    }
  }

  const CheckX: React.FC<{ checked: boolean; label?: string }> = ({ checked, label }) => (
    <span className="inline-flex items-center gap-1">
      <span className="inline-block w-3.5 h-3.5 border border-rose-700 text-center leading-none text-[10px] font-bold text-rose-950 bg-white">
        {checked ? 'X' : ''}
      </span>
      {label && <span>{label}</span>}
    </span>
  );

  // PAGE 2: BACK AFFIDAVITS & WITNESSES
  if (page === 'page2') {
    return (
      <div
        className="relative w-full h-full bg-white text-rose-950 font-serif select-text p-3 sm:p-5 overflow-hidden flex flex-col justify-between border-[3px] border-rose-700"
        style={{ aspectRatio: '210 / 297' }}
      >
        {/* Diagonal Watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 select-none overflow-hidden"
          style={{ opacity: watermarkOpacity }}
        >
          <div className="transform -rotate-35 text-center">
            <span className="text-3xl sm:text-5xl font-black tracking-widest uppercase border-y-4 border-dashed border-red-700 py-3 px-6 text-red-800 whitespace-nowrap">
              {style?.watermarkText || 'SAMPLE – NOT AN OFFICIAL CIVIL REGISTRY DOCUMENT'}
            </span>
            <p className="text-xs sm:text-sm font-semibold tracking-wider mt-2 text-red-700 uppercase">
              EDUCATIONAL / DEMONSTRATION TEMPLATE ONLY
            </p>
          </div>
        </div>

        {/* Top Header */}
        <div className="relative z-20 pb-2 border-b-2 border-rose-700">
          <span className="font-sans font-bold text-[9px] uppercase tracking-wider block">
            20b. WITNESSES (Print Name and Sign):
          </span>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 pt-2 text-[9px] font-mono">
            <div className="border-b border-rose-800 pb-0.5">
              1. {com?.witness1 || additional.witness1Name || 'JULIAN THOMAS MONTGOMERY'}
            </div>
            <div className="border-b border-rose-800 pb-0.5">
              2. {com?.witness2 || additional.witness2Name || 'CHARLOTTE GRACE STERLING'}
            </div>
            <div className="border-b border-rose-800 pb-0.5">
              3. {com?.witness3 || 'MARCUS AURELIUS VANCE'}
            </div>
            <div className="border-b border-rose-800 pb-0.5">
              4. {com?.witness4 || 'ELEANOR VANCE STERLING'}
            </div>
          </div>
        </div>

        {/* SECTION 1: AFFIDAVIT OF SOLEMNIZING OFFICER */}
        <div className="relative z-20 text-[9px] sm:text-[10px] leading-tight space-y-1.5 border-b-2 border-rose-700 pb-3">
          <h2 className="text-center font-bold text-xs uppercase tracking-wide">
            AFFIDAVIT OF SOLEMNIZING OFFICER
          </h2>
          <p className="text-justify leading-relaxed text-[9px]">
            I, <span className="underline font-bold px-1">{com?.solemnizingOfficerName || marriage.officiantName || 'HON. MARCUS J. VANCE'}</span>, of legal age, Solemnizing Officer of{' '}
            <span className="underline px-1">{marriage.placeOfMarriage || 'Sagbayan Parish Church'}</span>, with address at{' '}
            <span className="underline px-1">{com?.cityMunicipality || 'Sagbayan, Bohol'}</span>, after having been sworn to in accordance with law, do hereby depose and say:
          </p>

          <p className="text-[9px]">1. That I have solemnized the marriage between <span className="underline font-bold px-1">{hFirst} {hMiddle} {hLast}</span> and <span className="underline font-bold px-1">{wFirst} {wMiddle} {wLast}</span>;</p>

          <div className="space-y-1 text-[8.5px] pl-2">
            <div className="flex items-start gap-1.5">
              <CheckX checked={true} />
              <span>a. That I have ascertained the qualifications of the contracting parties and have found no legal impediment for them to marry as required by Article 34 of the Family Code;</span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckX checked={false} />
              <span>b. That this marriage was performed in articulo mortis or at the point of death;</span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckX checked={false} />
              <span>c. That the residence of either party is so located that there is no means of transportation to enable concerned party to appear personally before the civil registrar;</span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <div className="text-center w-56 text-[9px]">
              <div className="border-b border-rose-900 font-signature text-xs italic pb-0.5">
                {com?.solemnizingOfficerName || 'Marcus Vance'}
              </div>
              <p className="uppercase font-sans text-[8px]">(Signature Over Printed Name of Solemnizing Officer)</p>
            </div>
          </div>
        </div>

        {/* SECTION 2: AFFIDAVIT FOR DELAYED REGISTRATION OF MARRIAGE */}
        <div className="relative z-20 text-[8.5px] sm:text-[9.5px] leading-tight space-y-1.5 pt-1">
          <h2 className="text-center font-bold text-xs uppercase tracking-wide">
            AFFIDAVIT FOR DELAYED REGISTRATION OF MARRIAGE
          </h2>
          <p className="text-justify leading-relaxed text-[8.5px]">
            I, <span className="underline font-bold px-1">{hFirst} {hLast}</span>, of legal age, with residence and postal address at{' '}
            <span className="underline px-1">{com?.husbandResidence || 'Poblacion, Sagbayan, Bohol'}</span>, after having been duly sworn to in accordance with law, do hereby depose and say:
          </p>

          <ol className="list-decimal list-inside space-y-0.5 text-[8.5px] leading-normal pl-1">
            <li>That I am the applicant for the delayed registration of marriage between <span className="underline font-bold px-1">{hFirst} {hLast}</span> and <span className="underline font-bold px-1">{wFirst} {wLast}</span> on <span className="underline px-1">{mMonth} {mDay}, {mYear}</span> at <span className="underline px-1">{marriage.placeOfMarriage || 'Sagbayan, Bohol'}</span>.</li>
            <li>That the said marriage was solemnized by <span className="underline px-1">{com?.solemnizingOfficerName || 'Hon. Marcus J. Vance'}</span>.</li>
            <li>That marriage was solemnized: with marriage license no. <span className="underline px-1">{com?.marriageLicenseNo || 'ML-2023-8941'}</span>.</li>
            <li>That the reason for delay was due to: <span className="underline px-1">Late transmittal from church registry office</span>.</li>
          </ol>

          <div className="pt-2 flex justify-between items-end text-[8px]">
            <div>
              <p>SUBSCRIBED AND SWORN to before me this <span className="underline font-bold px-1">{mDay || '23rd'}</span> day of <span className="underline font-bold px-1">{mMonth || 'September'}</span> at <span className="underline px-1">Sagbayan, Bohol</span>.</p>
            </div>
            <div className="text-center w-48">
              <div className="border-b border-rose-900 font-signature text-xs italic pb-0.5">
                {hFirst} {hLast}
              </div>
              <p className="uppercase font-sans text-[7.5px]">(Signature of Affiant)</p>
            </div>
          </div>
        </div>

        {/* Footer Record Notation */}
        <div className="relative z-20 text-center pt-1 border-t border-rose-700 text-[8px] text-rose-950 font-sans">
          <p className="font-bold uppercase tracking-wide">
            OFFICE OF THE MUNICIPAL CIVIL REGISTRAR &bull; SAGBAYAN, BOHOL
          </p>
          <p className="text-slate-500 text-[7px]">
            Municipal Form No. 97 (Revised August 2016) &bull; Certiflow Document System
          </p>
        </div>
      </div>
    );
  }

  // PAGE 1: FRONT CERTIFICATE OF MARRIAGE
  return (
    <div
      className="relative w-full h-full bg-white text-rose-950 font-serif select-text p-2 sm:p-4 overflow-hidden border-[3px] border-rose-700 flex flex-col justify-between"
      style={{ aspectRatio: '210 / 297' }}
    >
      {/* Large Diagonal Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 select-none overflow-hidden"
        style={{ opacity: watermarkOpacity }}
      >
        <div className="transform -rotate-35 text-center">
          <span className="text-3xl sm:text-5xl md:text-6xl font-black tracking-widest uppercase border-y-4 border-dashed border-red-700 py-3 px-6 text-red-800 whitespace-nowrap">
            {style?.watermarkText || 'SAMPLE – NOT AN OFFICIAL CIVIL REGISTRY DOCUMENT'}
          </span>
          <p className="text-xs sm:text-sm font-semibold tracking-wider mt-2 text-red-700 uppercase">
            EDUCATIONAL / DEMONSTRATION TEMPLATE ONLY
          </p>
        </div>
      </div>

      {/* HEADER SECTION */}
      <div className="relative z-20 border-b-2 border-rose-700 pb-1">
        <div className="flex justify-between items-start text-[8px] sm:text-[9px] font-sans">
          <div>
            <p className="font-bold">Municipal Form No. 97</p>
            <p className="italic">(Revised August 2016)</p>
          </div>
          <p className="italic text-right">(To be accomplished in quadruplicate using black ink)</p>
        </div>

        <div className="text-center my-0.5 space-y-0.5">
          <p className="text-[9px] sm:text-[10px] tracking-wide uppercase font-semibold">
            Republic of the Philippines
          </p>
          <p className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
            OFFICE OF THE CIVIL REGISTRAR GENERAL
          </p>
          <h1 className="text-base sm:text-xl font-extrabold uppercase tracking-wide text-rose-950">
            CERTIFICATE OF MARRIAGE
          </h1>
        </div>

        {/* Province / City / Registry Header Row */}
        <div className="grid grid-cols-12 border-t border-rose-700 pt-1 text-[8.5px] sm:text-[9.5px]">
          <div className="col-span-8 space-y-0.5 pr-2">
            <div className="flex items-center gap-1">
              <span className="font-sans font-bold">Province:</span>
              <span className="flex-1 border-b border-rose-900 uppercase font-semibold pl-1 font-mono">
                {com?.province || marriage.provinceState || 'BOHOL'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-sans font-bold">City/Municipality:</span>
              <span className="flex-1 border-b border-rose-900 uppercase font-semibold pl-1 font-mono">
                {com?.cityMunicipality || marriage.cityMunicipality || 'SAGBAYAN'}
              </span>
            </div>
          </div>

          <div className="col-span-4 border-l border-rose-700 pl-2 space-y-0.5">
            <div className="flex items-center gap-1">
              <span className="font-sans font-bold">Registry No.:</span>
              <span className="flex-1 border-b border-rose-900 font-mono font-bold pl-1 text-rose-900">
                {com?.registryNo || '2023-092301'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DUAL COLUMNS: HUSBAND & WIFE TABLE */}
      <div className="relative z-20 flex-1 border-b-2 border-rose-700 text-[8px] sm:text-[8.5px] flex flex-col justify-between">
        
        {/* Column Headers */}
        <div className="grid grid-cols-12 border-b border-rose-700 font-sans font-bold text-center bg-rose-50/50">
          <div className="col-span-6 border-r border-rose-700 py-1 text-rose-950 uppercase tracking-widest text-[9px] sm:text-[10px]">
            HUSBAND
          </div>
          <div className="col-span-6 py-1 text-rose-950 uppercase tracking-widest text-[9px] sm:text-[10px]">
            WIFE
          </div>
        </div>

        {/* 1. Name of Contracting Parties */}
        <div className="grid grid-cols-12 border-b border-rose-700">
          <div className="col-span-6 border-r border-rose-700 p-1">
            <span className="font-sans font-bold block text-[7px] sm:text-[7.5px]">1. Name of Contracting Parties</span>
            <div className="grid grid-cols-3 text-center pt-0.5 font-mono text-[8px] sm:text-[9px]">
              <div>
                <p className="font-bold uppercase truncate">{hFirst}</p>
                <span className="text-[6.5px] font-sans text-rose-800">(First)</span>
              </div>
              <div>
                <p className="font-bold uppercase truncate">{hMiddle}</p>
                <span className="text-[6.5px] font-sans text-rose-800">(Middle)</span>
              </div>
              <div>
                <p className="font-bold uppercase truncate">{hLast}</p>
                <span className="text-[6.5px] font-sans text-rose-800">(Last)</span>
              </div>
            </div>
          </div>

          <div className="col-span-6 p-1">
            <span className="font-sans font-bold block text-[7px] sm:text-[7.5px]">1. Name of Contracting Parties</span>
            <div className="grid grid-cols-3 text-center pt-0.5 font-mono text-[8px] sm:text-[9px]">
              <div>
                <p className="font-bold uppercase truncate">{wFirst}</p>
                <span className="text-[6.5px] font-sans text-rose-800">(First)</span>
              </div>
              <div>
                <p className="font-bold uppercase truncate">{wMiddle}</p>
                <span className="text-[6.5px] font-sans text-rose-800">(Middle)</span>
              </div>
              <div>
                <p className="font-bold uppercase truncate">{wLast}</p>
                <span className="text-[6.5px] font-sans text-rose-800">(Last)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2a. Date of Birth & 2b. Age */}
        <div className="grid grid-cols-12 border-b border-rose-700">
          <div className="col-span-6 border-r border-rose-700 p-1">
            <div className="grid grid-cols-12 text-center font-mono">
              <div className="col-span-8 grid grid-cols-3 border-r border-rose-700 pr-1">
                <div>
                  <p className="font-bold">{hDay || '04'}</p>
                  <span className="text-[6.5px] font-sans text-rose-800 block">(Day)</span>
                </div>
                <div>
                  <p className="font-bold">{hMonth || 'Nov'}</p>
                  <span className="text-[6.5px] font-sans text-rose-800 block">(Month)</span>
                </div>
                <div>
                  <p className="font-bold">{hYear || '1991'}</p>
                  <span className="text-[6.5px] font-sans text-rose-800 block">(Year)</span>
                </div>
              </div>
              <div className="col-span-4 pl-1">
                <span className="text-[6.5px] font-sans text-rose-800 block">2b. Age</span>
                <p className="font-bold">{com?.husbandAge || '32'}</p>
              </div>
            </div>
          </div>

          <div className="col-span-6 p-1">
            <div className="grid grid-cols-12 text-center font-mono">
              <div className="col-span-8 grid grid-cols-3 border-r border-rose-700 pr-1">
                <div>
                  <p className="font-bold">{wDay || '19'}</p>
                  <span className="text-[6.5px] font-sans text-rose-800 block">(Day)</span>
                </div>
                <div>
                  <p className="font-bold">{wMonth || 'Jun'}</p>
                  <span className="text-[6.5px] font-sans text-rose-800 block">(Month)</span>
                </div>
                <div>
                  <p className="font-bold">{wYear || '1993'}</p>
                  <span className="text-[6.5px] font-sans text-rose-800 block">(Year)</span>
                </div>
              </div>
              <div className="col-span-4 pl-1">
                <span className="text-[6.5px] font-sans text-rose-800 block">2b. Age</span>
                <p className="font-bold">{com?.wifeAge || '30'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Place of Birth */}
        <div className="grid grid-cols-12 border-b border-rose-700">
          <div className="col-span-6 border-r border-rose-700 p-1">
            <span className="font-sans font-bold block text-[7px]">3. Place of Birth</span>
            <p className="font-mono font-bold uppercase truncate">{com?.husbandPlaceOfBirth || groom.placeOfBirth || 'Sagbayan, Bohol'}</p>
          </div>
          <div className="col-span-6 p-1">
            <span className="font-sans font-bold block text-[7px]">3. Place of Birth</span>
            <p className="font-mono font-bold uppercase truncate">{com?.wifePlaceOfBirth || bride.placeOfBirth || 'Tagbilaran City, Bohol'}</p>
          </div>
        </div>

        {/* 4a. Sex & 4b. Citizenship */}
        <div className="grid grid-cols-12 border-b border-rose-700">
          <div className="col-span-6 border-r border-rose-700 p-1 flex justify-between items-center font-mono">
            <div><span className="font-sans text-rose-800">4a. Sex:</span> <strong>MALE</strong></div>
            <div><span className="font-sans text-rose-800">4b. Citizenship:</span> <strong>{com?.husbandCitizenship || groom.nationality || 'FILIPINO'}</strong></div>
          </div>
          <div className="col-span-6 p-1 flex justify-between items-center font-mono">
            <div><span className="font-sans text-rose-800">4a. Sex:</span> <strong>FEMALE</strong></div>
            <div><span className="font-sans text-rose-800">4b. Citizenship:</span> <strong>{com?.wifeCitizenship || bride.nationality || 'FILIPINO'}</strong></div>
          </div>
        </div>

        {/* 5. Residence */}
        <div className="grid grid-cols-12 border-b border-rose-700">
          <div className="col-span-6 border-r border-rose-700 p-1">
            <span className="font-sans font-bold block text-[7px]">5. Residence</span>
            <p className="font-mono uppercase truncate">{com?.husbandResidence || groom.currentAddress || 'Poblacion, Sagbayan, Bohol'}</p>
          </div>
          <div className="col-span-6 p-1">
            <span className="font-sans font-bold block text-[7px]">5. Residence</span>
            <p className="font-mono uppercase truncate">{com?.wifeResidence || bride.currentAddress || 'San Agustin, Sagbayan, Bohol'}</p>
          </div>
        </div>

        {/* 6. Religion & 7. Civil Status */}
        <div className="grid grid-cols-12 border-b border-rose-700 font-mono">
          <div className="col-span-6 border-r border-rose-700 p-1 flex justify-between">
            <div><span className="font-sans text-rose-800">6. Religion:</span> <strong>{com?.husbandReligion || 'ROMAN CATHOLIC'}</strong></div>
            <div><span className="font-sans text-rose-800">7. Status:</span> <strong>{com?.husbandCivilStatus || 'SINGLE'}</strong></div>
          </div>
          <div className="col-span-6 p-1 flex justify-between">
            <div><span className="font-sans text-rose-800">6. Religion:</span> <strong>{com?.wifeReligion || 'ROMAN CATHOLIC'}</strong></div>
            <div><span className="font-sans text-rose-800">7. Status:</span> <strong>{com?.wifeCivilStatus || 'SINGLE'}</strong></div>
          </div>
        </div>

        {/* 8. Name of Father */}
        <div className="grid grid-cols-12 border-b border-rose-700 font-mono">
          <div className="col-span-6 border-r border-rose-700 p-1">
            <span className="font-sans font-bold block text-[7px]">8. Name of Father</span>
            <p className="font-bold uppercase truncate">{com?.husbandFatherFirstName || 'EDWARD'} {com?.husbandFatherLastName || 'HAYES'}</p>
          </div>
          <div className="col-span-6 p-1">
            <span className="font-sans font-bold block text-[7px]">8. Name of Father</span>
            <p className="font-bold uppercase truncate">{com?.wifeFatherFirstName || 'JULIAN'} {com?.wifeFatherLastName || 'MONTGOMERY'}</p>
          </div>
        </div>

        {/* 10. Maiden Name of Mother */}
        <div className="grid grid-cols-12 border-b-2 border-rose-700 font-mono">
          <div className="col-span-6 border-r border-rose-700 p-1">
            <span className="font-sans font-bold block text-[7px]">10. Maiden Name of Mother</span>
            <p className="font-bold uppercase truncate">{com?.husbandMotherMaidenFirstName || 'CATHERINE'} {com?.husbandMotherMaidenLastName || 'VANCE'}</p>
          </div>
          <div className="col-span-6 p-1">
            <span className="font-sans font-bold block text-[7px]">10. Maiden Name of Mother</span>
            <p className="font-bold uppercase truncate">{com?.wifeMotherMaidenFirstName || 'MARIA'} {com?.wifeMotherMaidenLastName || 'SANTOS'}</p>
          </div>
        </div>

        {/* 15. Place of Marriage, 16. Date of Marriage, 17. Time of Marriage */}
        <div className="border-b border-rose-700 p-1 font-mono text-[8px] sm:text-[8.5px]">
          <div className="flex flex-wrap justify-between items-center gap-1">
            <div>
              <span className="font-sans font-bold text-rose-900">15. Place of Marriage:</span>{' '}
              <strong className="uppercase">{com?.placeOfMarriage || marriage.placeOfMarriage || 'Sagbayan Parish Church, Sagbayan, Bohol'}</strong>
            </div>
            <div>
              <span className="font-sans font-bold text-rose-900">16. Date:</span>{' '}
              <strong>{mMonth} {mDay}, {mYear}</strong>
            </div>
            <div>
              <span className="font-sans font-bold text-rose-900">17. Time:</span>{' '}
              <strong>{com?.marriageTime || marriage.timeOfMarriage || '04:30 PM'}</strong>
            </div>
          </div>
        </div>

        {/* 18. CERTIFICATION OF THE CONTRACTING PARTIES */}
        <div className="border-b border-rose-700 p-1 text-[7.5px] sm:text-[8px] leading-tight">
          <span className="font-sans font-bold">18. CERTIFICATION OF THE CONTRACTING PARTIES:</span>
          <p className="mt-0.5">
            THIS IS TO CERTIFY: That I, <span className="font-bold underline uppercase">{hFirst} {hLast}</span> and I, <span className="font-bold underline uppercase">{wFirst} {wLast}</span> both of legal age, of our own free will and accord, and in the presence of the person solemnizing this marriage and of the witnesses named below, take each other as husband and wife.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-2 text-center font-mono">
            <div>
              <div className="border-b border-rose-900 font-signature text-xs italic pb-0.5">
                {hFirst} {hLast}
              </div>
              <span className="font-sans text-[7px] text-rose-800 uppercase">(Signature of Husband)</span>
            </div>
            <div>
              <div className="border-b border-rose-900 font-signature text-xs italic pb-0.5">
                {wFirst} {wLast}
              </div>
              <span className="font-sans text-[7px] text-rose-800 uppercase">(Signature of Wife)</span>
            </div>
          </div>
        </div>

        {/* 19. CERTIFICATION OF THE SOLEMNIZING OFFICER */}
        <div className="border-b border-rose-700 p-1 text-[7.5px] sm:text-[8px] leading-tight">
          <span className="font-sans font-bold">19. CERTIFICATION OF THE SOLEMNIZING OFFICER:</span>
          <p className="mt-0.5">
            THIS IS TO CERTIFY: THAT BEFORE ME, on the date and place above-written, personally appeared the above-mentioned parties, with their mutual consent lawfully joined together in holy matrimony.
          </p>
          <div className="pl-2 pt-0.5 space-y-0.5 font-mono">
            <p>License No.: <span className="font-bold underline">{com?.marriageLicenseNo || 'ML-2023-8941'}</span> issued on <span className="underline">{mMonth} {mDay}, {mYear}</span> at <span className="underline">Sagbayan, Bohol</span>.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1 font-mono text-[7.5px] sm:text-[8px]">
            <div>
              <p>Signature: <span className="font-signature text-xs italic">{com?.solemnizingOfficerName || 'Marcus Vance'}</span></p>
              <p>Name: <span className="font-bold uppercase">{com?.solemnizingOfficerName || marriage.officiantName || 'HON. MARCUS J. VANCE'}</span></p>
              <p>Position: <span>{com?.solemnizingOfficerPosition || 'MUNICIPAL TRIAL JUDGE'}</span></p>
            </div>
            <div>
              <p>20a. WITNESSES:</p>
              <p className="truncate">1. {com?.witness1 || additional.witness1Name || 'Julian Thomas Montgomery'}</p>
              <p className="truncate">2. {com?.witness2 || additional.witness2Name || 'Charlotte Grace Sterling'}</p>
            </div>
          </div>
        </div>

        {/* 21. RECEIVED BY & 22. REGISTERED AT OFFICE OF CIVIL REGISTRAR */}
        <div className="grid grid-cols-2 text-[7.5px] sm:text-[8px] font-mono">
          <div className="border-r border-rose-700 p-1 space-y-0.5">
            <span className="font-sans font-bold block">21. RECEIVED BY</span>
            <p>Name: <span className="font-bold uppercase">{com?.receivedByName || 'CARMINA R. REYES'}</span></p>
            <p>Title: <span>{com?.receivedByTitle || 'RECORDS CLERK'}</span></p>
            <p>Date: <span>{com?.receivedByDate || '2023-09-24'}</span></p>
          </div>

          <div className="p-1 space-y-0.5">
            <span className="font-sans font-bold block">22. REGISTERED AT OFFICE OF CIVIL REGISTRAR</span>
            <p>Name: <span className="font-bold uppercase">{com?.registeredByName || 'ATTY. GREGORIO L. SANTOS'}</span></p>
            <p>Title: <span>{com?.registeredByTitle || 'MUNICIPAL CIVIL REGISTRAR'}</span></p>
            <p>Date: <span>{com?.registeredByDate || '2023-09-25'}</span></p>
          </div>
        </div>

      </div>

      {/* FOOTER RECORD NOTATION */}
      <div className="relative z-20 text-center pt-1 text-[7.5px] sm:text-[8.5px] text-rose-900 leading-tight font-sans">
        <p className="font-bold uppercase tracking-wide">
          OFFICE OF THE MUNICIPAL CIVIL REGISTRAR &bull; MUNICIPALITY OF SAGBAYAN, BOHOL
        </p>
        <p className="text-slate-500 text-[7px]">
          Philippine Municipal Form No. 97 (Revised August 2016) &bull; Certiflow Document System
        </p>
      </div>
    </div>
  );
};
