export type ServiceMode = 'home' | 'find_schemes' | 'pmmvy' | 'myscheme';

export type SchemeLinkType = 
  | 'info' 
  | 'eligibility' 
  | 'apply' 
  | 'status' 
  | 'grievance' 
  | 'official';

export interface ActiveSchemeContext {
  currentSchemeId: string;
  currentSchemeName: string;
  category: string;
  officialLink: string;
  officialLinkType: SchemeLinkType | string;
  schemeSource: string;
  linkVerified: boolean;
}

export interface SchemeActionLink {
  label: string;
  url: string;
  type: SchemeLinkType;
  isPmmvyPortal?: boolean;
}

export interface SchemeCardData {
  schemeId?: string;
  schemeName: string;
  nameTa?: string;
  categoryLabel?: string;
  whatItIs: string;
  whatItIsTa?: string;
  officialDepartment: string;
  officialSourceUrl: string;
  officialInfoUrl?: string;
  applicationUrl?: string;
  eligibilityUrl?: string;
  statusUrl?: string;
  grievanceUrl?: string;
  lastVerified?: string;
  actions: SchemeActionLink[];
  noVerifiedAppUrlWarning?: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  stepIndex?: number;
  stepTitle?: string;
  screenVisualHint?: string;
  suggestedResponses?: string[];
  isSensitiveWarning?: boolean;
  audioBase64?: string;
  serviceMode?: ServiceMode;
  matchedSchemes?: string[];
  schemeCard?: SchemeCardData;
  officialLinks?: SchemeActionLink[];
  openUrl?: string;
}

export interface SchemeInfo {
  id: string;
  titleTa: string;
  titleEn: string;
  benefitTa: string;
  descriptionTa: string;
  officialUrl: string;
  departmentTa: string;
  documentsNeeded: string[];
  sampleSteps: {
    stepNumber: number;
    titleTa: string;
    instructionTa: string;
    simplifiedTa: string;
    screenTarget: string;
    targetDescriptionTa: string;
  }[];
}
export interface DiscoveredScheme {
  id: string;
  name: string;
  nameTa: string;
  category: string;
  forWhom: string;
  mainBenefit: string;
  eligibilitySummary: string;
  officialUrl: string;
  ministryOrState: string;
  applicationUrl?: string;
  eligibilityUrl?: string;
  lastVerified?: string;
}

export interface WomenScheme {
  id: string;
  schemeName: string;
  officialName: string;
  nameTa: string;
  description: string;
  descriptionTa: string;
  simpleDescription: string;
  simpleDescriptionTa: string;
  category: string;
  categoryLabel: string;
  whoItIsFor: string;
  whoItIsForTa: string;
  importantEligibility: string[];
  importantEligibilityTa: string[];
  majorBenefit: string;
  majorBenefitTa: string;
  applicationMethod: string;
  applicationMethodTa: string;
  officialWebsite: string;
  officialDepartment: string;
  officialInfoUrl: string;
  officialSourceUrl: string;
  sourceUrl: string;
  officialApplicationUrl: string | null;
  officialStatusUrl: string | null;
  applicationUrl?: string;
  eligibilityUrl?: string;
  statusUrl?: string;
  grievanceUrl?: string;
  lastVerified: string;
  lastVerifiedDate: string;
  keywords: string[];
}

export type VerifiedSchemeEntry = WomenScheme;

export interface WomenUserProfile {
  age?: number;
  state?: string;
  isPregnant?: boolean;
  hasChildren?: boolean;
  childrenAge?: string;
  isStudent?: boolean;
  wantsWork?: boolean;
  wantsBusiness?: boolean;
  needsFinancialHelp?: boolean;
  ruralOrUrban?: 'rural' | 'urban';
}
