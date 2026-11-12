export type CertificateType = 'birth' | 'marriage';

export type DateFormatOption = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'Month DD, YYYY';
export type PaperSize = 'a4' | 'letter';
export type PageOrientation = 'portrait' | 'landscape';
export type PageMargins = 'compact' | 'normal' | 'generous';
export type FontStyle = 'serif' | 'formal' | 'modern' | 'classic';
export type FontSize = 'small' | 'medium' | 'large';
export type TextAlign = 'left' | 'center';

export type BorderStyle = 
  | 'double-gold'
  | 'classic-navy'
  | 'ornate-slate'
  | 'minimal-subtle'
  | 'vintage-frame';

export type BackgroundColor =
  | 'pure-white'
  | 'warm-ivory'
  | 'soft-parchment'
  | 'subtle-cream'
  | 'cool-slate';

export type BirthTemplateId = 
  | 'ph-colb-102'
  | 'classic-minimalist'
  | 'modern-professional'
  | 'simple-admin'
  | 'elegant-decorative';

export type MarriageTemplateId = 
  | 'ph-com-97'
  | 'classic-minimalist'
  | 'elegant-formal'
  | 'modern-professional'
  | 'simple-decorative';

export interface ChildInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  sex: 'Male' | 'Female' | 'Other' | '';
  dateOfBirth: string; // YYYY-MM-DD
  timeOfBirth?: string;
  placeOfBirth: string;
  cityMunicipality: string;
  provinceState: string;
  country: string;
}

export interface ParentInfo {
  fullName: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  nationality?: string;
}

export interface BirthAdditionalInfo {
  birthType: 'Single' | 'Twin' | 'Triplet' | 'Multiple';
  birthOrder?: string;
  hospitalFacility?: string;
  attendantAtBirth?: string;
  dateOfRegistration?: string;
  remarks?: string;
}

export interface ColbDetails {
  formNumber?: string;
  province: string;
  cityMunicipality: string;
  registryNo: string;
  remarksAnnotation?: string;
  
  // Child specifics
  weightAtBirth?: string;
  multipleBirthOrder?: '1' | '2' | '3' | '';
  multipleBirthSpecify?: string;
  
  // Mother specifics
  motherFirstName?: string;
  motherMiddleName?: string;
  motherLastName?: string;
  motherCitizenship?: string;
  motherReligion?: string;
  totalChildrenBornAlive?: string;
  childrenStillLiving?: string;
  childrenNowDead?: string;
  motherOccupation?: string;
  motherAgeAtBirth?: string;
  motherResidenceStreet?: string;
  motherResidenceCity?: string;
  motherResidenceProvince?: string;

  // Father specifics
  fatherFirstName?: string;
  fatherMiddleName?: string;
  fatherLastName?: string;
  fatherCitizenship?: string;
  fatherReligion?: string;
  fatherOccupation?: string;
  fatherAgeAtBirth?: string;

  // Marriage of Parents
  parentsMarriageDatePlace?: string;
  
  // Attendant
  attendantType?: '1' | '2' | '3' | '4' | '5';
  attendantOtherSpecify?: string;
  attendantTime?: string;
  attendantTimeAmPm?: 'am' | 'pm';
  attendantSignatureName?: string;
  attendantTitlePosition?: string;
  attendantAddress?: string;
  attendantDate?: string;

  // Informant
  informantSignatureName?: string;
  informantRelationship?: string;
  informantAddress?: string;
  informantDate?: string;

  // Prepared By
  preparedByName?: string;
  preparedByTitle?: string;
  preparedByDate?: string;

  // Received by Civil Registrar
  receivedByName?: string;
  receivedByTitle?: string;
  receivedByDate?: string;

  // Page 2 Affidavits
  affidavitPaternityEnabled?: boolean;
  affidavitPaternityFatherCtc?: string;
  affidavitPaternityMotherCtc?: string;
  affidavitPaternityAdminOfficer?: string;
  affidavitDelayedRegEnabled?: boolean;
}

export interface BirthCertificateData {
  child: ChildInfo;
  father: ParentInfo;
  mother: ParentInfo;
  additional: BirthAdditionalInfo;
  colb?: ColbDetails;
}

export interface SpouseInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality?: string;
  currentAddress?: string;
}

export interface MarriageDetails {
  dateOfMarriage: string;
  timeOfMarriage?: string;
  placeOfMarriage: string;
  cityMunicipality: string;
  provinceState: string;
  country: string;
  ceremonyType?: string;
  officiantName?: string;
  remarks?: string;
}

export interface MarriageAdditionalDetails {
  witness1Name?: string;
  witness2Name?: string;
  dateOfPreparation: string;
  preparedBy?: string;
}

export interface ComDetails {
  province: string;
  cityMunicipality: string;
  registryNo: string;
  remarksAnnotation?: string;

  // Husband
  husbandFirstName: string;
  husbandMiddleName: string;
  husbandLastName: string;
  husbandDobDay?: string;
  husbandDobMonth?: string;
  husbandDobYear?: string;
  husbandAge?: string;
  husbandPlaceOfBirth?: string;
  husbandCitizenship?: string;
  husbandResidence?: string;
  husbandReligion?: string;
  husbandCivilStatus?: string;
  husbandFatherFirstName?: string;
  husbandFatherMiddleName?: string;
  husbandFatherLastName?: string;
  husbandFatherCitizenship?: string;
  husbandMotherMaidenFirstName?: string;
  husbandMotherMaidenMiddleName?: string;
  husbandMotherMaidenLastName?: string;
  husbandMotherCitizenship?: string;
  husbandConsentPerson?: string;
  husbandConsentRelationship?: string;
  husbandConsentResidence?: string;

  // Wife
  wifeFirstName: string;
  wifeMiddleName: string;
  wifeLastName: string;
  wifeDobDay?: string;
  wifeDobMonth?: string;
  wifeDobYear?: string;
  wifeAge?: string;
  wifePlaceOfBirth?: string;
  wifeCitizenship?: string;
  wifeResidence?: string;
  wifeReligion?: string;
  wifeCivilStatus?: string;
  wifeFatherFirstName?: string;
  wifeFatherMiddleName?: string;
  wifeFatherLastName?: string;
  wifeFatherCitizenship?: string;
  wifeMotherMaidenFirstName?: string;
  wifeMotherMaidenMiddleName?: string;
  wifeMotherMaidenLastName?: string;
  wifeMotherCitizenship?: string;
  wifeConsentPerson?: string;
  wifeConsentRelationship?: string;
  wifeConsentResidence?: string;

  // Marriage Particulars
  placeOfMarriage: string;
  marriageDay?: string;
  marriageMonth?: string;
  marriageYear?: string;
  marriageTime?: string;
  marriageTimeAmPm?: 'am' | 'pm';
  marriageSettlement?: 'entered' | 'not_entered';
  husbandSignature?: string;
  wifeSignature?: string;

  // Solemnizing Officer
  licenseType?: 'license' | 'art_209' | 'pd_1083';
  marriageLicenseNo?: string;
  licenseIssuedDate?: string;
  licenseIssuedPlace?: string;
  art209Specify?: string;
  solemnizingOfficerName?: string;
  solemnizingOfficerPosition?: string;
  solemnizingOfficerReligion?: string;
  solemnizingOfficerRegistryNo?: string;

  // Witnesses
  witness1?: string;
  witness2?: string;
  witness3?: string;
  witness4?: string;

  // Registration
  receivedByName?: string;
  receivedByTitle?: string;
  receivedByDate?: string;
  registeredByName?: string;
  registeredByTitle?: string;
  registeredByDate?: string;

  // Page 2 Affidavits
  affidavitSolemnizingOfficerEnabled?: boolean;
  affidavitDelayedRegMarriageEnabled?: boolean;
  affidavitDelayedReg?: boolean;
}

export interface MarriageCertificateData {
  groom: SpouseInfo;
  bride: SpouseInfo;
  marriage: MarriageDetails;
  additional: MarriageAdditionalDetails;
  com?: ComDetails;
}

export interface CertificateStyle {
  templateId: string;
  certificateTitle: string;
  subTitle?: string;
  fontStyle: FontStyle;
  fontSize: FontSize;
  textAlign: TextAlign;
  pageOrientation: PageOrientation;
  paperSize: PaperSize;
  pageMargins: PageMargins;
  borderStyle: BorderStyle;
  backgroundColor: BackgroundColor;
  showDecorativeElements: boolean;
  dateFormat: DateFormatOption;
  watermarkText: string;
  watermarkOpacity: number;
}

export interface SavedDraft {
  id: string;
  type: CertificateType;
  title: string;
  createdAt: number;
  updatedAt: number;
  birthData?: BirthCertificateData;
  marriageData?: MarriageCertificateData;
  style: CertificateStyle;
}
