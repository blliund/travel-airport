export type Region = 
  | '동아시아'
  | '동남아시아'
  | '남아시아 및 중앙아시아'
  | '서유럽'
  | '남유럽'
  | '북유럽'
  | '동유럽 및 중부유럽'
  | '영국·아일랜드'
  | '북미'
  | '중남미'
  | '오세아니아'
  | '중동 및 아프리카';

export type TravelPurpose = '관광' | '휴양' | '출장' | '배낭여행' | '캠핑' | '쇼핑' | '가족여행';
export type TravelStyle = '도시형' | '해변·휴양형' | '자연·트레킹형' | '쇼핑·미식형' | '액티비티형';
export type LuggageType = '기내용 캐리어만 (10kg 이하)' | '위탁 수하물 포함 (20~23kg)' | '배낭 / 백팩 위주';
export type AccommodationType = '호텔/리조트' | '에어비앤비/레지던스' | '게스트하우스/호스텔' | '캠핑/카라반';

export interface Trip {
  id: string;
  name: string;
  region: Region;
  countryCode: string; // ISO code or key e.g., 'JP', 'TH'
  countryName: string; // e.g., '일본', '태국'
  city: string; // e.g., '도쿄', '방콕'
  departureDate: string; // YYYY-MM-DD
  returnDate: string; // YYYY-MM-DD
  companionsCount: number; // 인원 수
  travelPurpose: TravelPurpose;
  travelStyle: TravelStyle;
  accommodation: AccommodationType;
  luggageType: LuggageType;
  personalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export type ChecklistPriority = 'high' | 'medium' | 'low';

export type ChecklistCategoryId = 
  | 'documents'      // 여권 및 여행 서류
  | 'clothing'       // 의류 및 신발
  | 'toiletries'     // 세면도구 및 개인위생
  | 'electronics'    // 전자기기 및 충전
  | 'health'         // 건강 및 안전
  | 'finance'        // 금융 및 결제
  | 'convenience'    // 여행 편의용품
  | 'destination';   // 여행지 특화 준비물

export interface ChecklistCategory {
  id: ChecklistCategoryId;
  name: string;
  icon: string;
  description: string;
}

export interface ChecklistItem {
  id: string;
  tripId: string;
  categoryId: ChecklistCategoryId;
  name: string;
  quantity: number;
  note?: string;
  priority: ChecklistPriority;
  isRequired: boolean;
  isCompleted: boolean;
  isCustom: boolean; // 사용자가 직접 추가한 항목
  recommendedReason?: string; // 추천 이유 (예: "4박 5일 일정에 따른 상의 권장량", "열대 기후 방충 대비")
  createdAt: string;
  updatedAt: string;
}

export type RegulationStatus = 'ALLOWED' | 'CONDITIONAL' | 'PROHIBITED' | 'VERIFY_REQUIRED';

export interface BaggageRegulationItem {
  id: string;
  name: string;
  category: '배터리·전자기기' | '액체·젤류' | '위험물·화기' | '의약품·위생' | '식품·농축산물' | '도검·공구류' | '스포츠·레저' | '기타';
  carryOnStatus: RegulationStatus;       // 기내수하물 규정
  checkedStatus: RegulationStatus;       // 위탁수하물 규정
  quantityLimit: string;                // 수량/용량 제한 (예: 100ml 이하 용기, 1인당 1L 지퍼백)
  packagingConditions: string;          // 포장 조건
  rulesSummary: string;                 // 핵심 규정 요약
  destinationRestrictions?: string;     // 목적지 국가 특별 주의사항 (예: 태국/싱가포르 전자담배 소지 금지)
  officialSource: string;               // 공식 출처 (예: 한국교통안전공단 항공보안365)
  sourceUrl: string;                    // 출처 URL
  lastVerifiedAt: string;               // 최종 검증일자 (YYYY-MM-DD)
  scope: '대한민국 출국 항공보안' | '국제민간항공기구(ICAO)' | '관세청 및 검역소';
}

export interface PlugInfo {
  type: string;        // 'A', 'B', 'C', 'SE', 'G' etc.
  description: string; // 110V 2핀 11자형, 220V 3구 삼각핀 등
  imageSvg?: string;   // 플러그 그래픽 렌더링용 식별자
}

export interface CountryGuide {
  countryCode: string;
  countryName: string;
  region: Region;
  flagEmoji: string;
  majorCities: string[];
  plugTypes: PlugInfo[];
  standardVoltage: string;        // e.g. "100V", "220V", "230V"
  standardFrequency: string;      // e.g. "50/60Hz"
  plugAdapterNeeded: boolean;     // 한국(C/F 220V) 기준 어댑터(돼지코) 필요 여부
  transformerNeeded: boolean;     // 프리볼트 기기 외 변압기 필요 여부
  electricalGuidance: string;     // 전압 관련 상세 안내
  visaInfo: {
    requirement: string;          // 무비자 90일, ESTA 필요, 도착비자 등
    passportValidity: string;     // 6개월 이상 잔여 유효기간 필수 등
    digitalDeclaration: string;   // Visit Japan Web, SG Arrival Card, MDAC 등 전자신고 안내
    officialSiteUrl: string;
  };
  connectivityTips: {
    esimSupported: string;
    recommendedOption: string;
    tips: string[];
  };
  paymentTips: {
    currency: string;
    currencySymbol: string;
    cardAcceptanceRate: string;
    tipCulture: string;
    exchangeTips: string;
  };
  culturalTips: string[];
  safetyTips: string[];
  emergencyContacts: {
    police: string;
    ambulance: string;
    consularCallCenter: string; // 외교부 영사콜센터 (+82-2-3210-0404)
    localEmbassyNote?: string;
  };
  regulatedSubstancesWarning: string; // 대마 등 규제 물질 관련 국내법 및 현지법 엄중 경고
  officialSource: string;
  sourceUrl: string;
  lastVerifiedAt: string;
}

export type TimelineStage = 'advance' | 'daysBefore' | 'dayBefore' | 'departureDay';

export interface TimelineTask {
  id: string;
  tripId: string;
  stage: TimelineStage;
  stageTitle: string;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: 'high' | 'normal';
}

export type BudgetCategory = 
  | 'flight'
  | 'accommodation'
  | 'transport'
  | 'food'
  | 'activity'
  | 'shopping'
  | 'connectivity'
  | 'insurance'
  | 'emergency'
  | 'other';

export interface BudgetItem {
  id: string;
  tripId: string;
  category: BudgetCategory;
  categoryName: string;
  plannedAmount: number;
  spentAmount: number;
  currency: string;
  note?: string;
}
