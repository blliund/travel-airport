import type { ChecklistCategory, ChecklistItem, Trip } from '../types';

export const CHECKLIST_CATEGORIES: ChecklistCategory[] = [
  {
    id: 'documents',
    name: '여권 및 여행 서류',
    icon: '🛂',
    description: '입국과 이동을 위한 필수 공적 서류 및 예약 증빙'
  },
  {
    id: 'clothing',
    name: '의류 및 신발',
    icon: '👕',
    description: '체류 일수와 현지 기후에 맞춘 착용 의류'
  },
  {
    id: 'toiletries',
    name: '세면도구 및 개인위생',
    icon: '🧴',
    description: '기내 반입 규정을 준수한 위생 및 뷰티 용품'
  },
  {
    id: 'electronics',
    name: '전자기기 및 충전',
    icon: '🔌',
    description: '국가별 플러그 규격에 맞는 충전기 및 통신 기기'
  },
  {
    id: 'health',
    name: '건강 및 상비약',
    icon: '💊',
    description: '해외 급변하는 환경에 대비한 안전 필수품'
  },
  {
    id: 'finance',
    name: '금융 및 결제',
    icon: '💳',
    description: '현지 통화 환전, 트래블카드 및 비상 지불 수단'
  },
  {
    id: 'convenience',
    name: '여행 편의용품',
    icon: '🧳',
    description: '장시간 비행 및 패킹을 돕는 유용한 보조 아이템'
  },
  {
    id: 'destination',
    name: '여행지 맞춤 특화',
    icon: '✨',
    description: '목적지 기후, 액티비티, 출장/휴양 목적 특화 장비'
  }
];

export function calculateTripDurationDays(departure: string, returnDate: string): number {
  if (!departure || !returnDate) return 4;
  const start = new Date(departure).getTime();
  const end = new Date(returnDate).getTime();
  if (isNaN(start) || isNaN(end) || end < start) return 4;
  const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, diffDays);
}

export function generateSmartChecklist(trip: Trip): ChecklistItem[] {
  const days = calculateTripDurationDays(trip.departureDate, trip.returnDate);
  const now = new Date().toISOString();
  let items: ChecklistItem[] = [];

  const addItem = (
    catId: ChecklistItem['categoryId'],
    name: string,
    quantity: number,
    priority: ChecklistItem['priority'],
    isRequired: boolean,
    reason?: string,
    note?: string
  ) => {
    items.push({
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      tripId: trip.id,
      categoryId: catId,
      name,
      quantity,
      priority,
      isRequired,
      isCompleted: false,
      isCustom: false,
      recommendedReason: reason,
      note,
      createdAt: now,
      updatedAt: now
    });
  };

  // 1. 여권 및 여행 서류
  addItem('documents', '여권 (잔여 유효기간 6개월 이상)', 1, 'high', true, '해외 출입국 공통 필수');
  addItem('documents', '항공권 e-티켓 및 탑승권 확인서', 1, 'high', true, '공항 체크인 및 입국심사용');
  addItem('documents', '숙소 예약 확인서(바우처)', 1, 'high', true, '입국 심사 시 주소 확인용');
  addItem('documents', '해외여행자보험 가입증명서', 1, 'high', true, '해외 의료비 및 휴대품 도난 보상 대비');
  addItem('documents', '여권 사본 및 증명사진 여분 2매', 2, 'medium', false, '여권 분실 시 영사관 재발급용');
  
  // 목적지 맞춤 입국 서류
  if (trip.countryCode === 'JP') {
    addItem('documents', 'Visit Japan Web (VJW) 사전 등록 QR 캡처', 1, 'high', true, '일본 입국·세관 패스트트랙 통과');
  } else if (trip.countryCode === 'US') {
    addItem('documents', '미국 ESTA 승인 확인서 출력본', 1, 'high', true, '미국 입국 필수 전자여행허가');
  } else if (trip.countryCode === 'AU') {
    addItem('documents', '호주 ETA 승인 확인', 1, 'high', true, '호주 전자여행허가 필수');
  } else if (trip.countryCode === 'SG') {
    addItem('documents', 'SG Arrival Card 전자신고 완료', 1, 'high', true, '싱가포르 입국 3일 전 제출');
  }

  // 2. 의류 및 신발 (체류 일수에 따른 스마트 수량 계산)
  const topCount = Math.min(days, 7);
  const underwearCount = Math.min(days + 1, 8);
  addItem('clothing', '상의 (티셔츠/셔츠)', topCount, 'medium', true, `${days}일 일정에 맞춘 의류 계산`);
  addItem('clothing', '하의 (바지/스커트)', Math.max(2, Math.ceil(days / 2)), 'medium', true, `${days}일 일정 권장량`);
  addItem('clothing', '속옷 및 양말', underwearCount, 'high', true, '매일 교체 및 비상 여분 1벌');
  addItem('clothing', '편안한 도보용 운동화', 1, 'high', true, '하루 1만보 이상 도보 여행 기본');
  addItem('clothing', '편한 실내복/잠옷', Math.min(2, Math.ceil(days / 3)), 'low', false, '숙소 휴식용');

  // 계절/기후별 의류
  if (trip.countryCode === 'JP' && trip.city.includes('홋카이도')) {
    addItem('clothing', '방한 패딩 외투 및 히트텍 발열내의', 2, 'high', true, '홋카이도 한랭지 눈길 대비');
    addItem('clothing', '방한 장갑, 목도리, 귀마개', 1, 'medium', true, '체온 유지 방한용품');
    addItem('clothing', '미끄럼 방지 방한 부츠', 1, 'high', true, '빙판길 낙상 방지');
  } else if (['TH', 'VN', 'PH', 'ID', 'SG'].includes(trip.countryCode)) {
    addItem('clothing', '통풍 잘되는 얇은 반팔/리넨 의류', topCount, 'medium', true, '열대 다습 기후 대비');
    addItem('clothing', '얇은 바람막이 겉옷 (가디건)', 1, 'medium', true, '실내 강력한 에어컨 냉방병 예방');
    addItem('clothing', '모자 및 선글라스', 1, 'medium', true, '강한 자외선 차단');
  } else {
    addItem('clothing', '휴대용 접이식 우산', 1, 'medium', false, '기상 변화 대비');
  }

  // 3. 세면도구 및 개인위생
  addItem('toiletries', '칫솔 및 치약 (100ml 이하)', 1, 'medium', true, '해외 호텔 어메니티 무상 제공 중단 추세');
  addItem('toiletries', '선크림(자외선 차단제)', 1, 'high', true, '여행 중 피부 보호 (100ml 이하 용기)');
  addItem('toiletries', '클렌징폼 및 스킨케어 키트 (100ml 이하)', 1, 'medium', true, '기내 액체류 규격 준수');
  addItem('toiletries', '여행용 샴푸/바디워시 미니어처', 1, 'low', false, '민감성 피부 개인 전용 용품');
  addItem('toiletries', '휴대용 손 세정제 및 물티슈', 2, 'medium', false, '식전 위생 관리용');

  // 4. 전자기기 및 충전
  addItem('electronics', '스마트폰 및 전용 고속 충전 케이블', 2, 'high', true, '여행 정보 검색 및 결제 핵심');
  addItem('electronics', '보조배터리 (반드시 기내 휴대!)', 1, 'high', true, '위탁수하물 절대 금지 품목, 지도/카메라 방전 방지');
  
  // 국가별 플러그 어댑터 스마트 추천
  if (trip.countryCode === 'JP' || trip.countryCode === 'US' || trip.countryCode === 'TW') {
    addItem('electronics', '11자형 변환 어댑터(돼지코) 2개', 2, 'high', true, `${trip.countryName} 콘센트 110V 규격 필수`);
  } else if (trip.countryCode === 'GB' || trip.countryCode === 'SG' || trip.countryCode === 'HK') {
    addItem('electronics', '영국식 3구 G형 멀티 어댑터', 1, 'high', true, `${trip.countryName} 3핀 G형 규격 필수`);
  } else if (trip.countryCode === 'AU' || trip.countryCode === 'NZ') {
    addItem('electronics', '오세아니아 3구 사선 I형 변환 어댑터', 1, 'high', true, `${trip.countryName} 사선 I형 규격 필수`);
  } else {
    addItem('electronics', '전 세계 범용 멀티 어댑터', 1, 'high', true, '다양한 호텔 콘센트 호환');
  }
  addItem('electronics', '유선/무선 이어폰', 1, 'low', false, '기내 엔터테인먼트 및 이동 중 음악 감상');

  // 5. 건강 및 안전 (상비약)
  addItem('health', '종합 감기약 및 해열진통제(타이레놀)', 1, 'high', true, '현지 약국 의사소통 난이도 대비');
  addItem('health', '지사제(정로환) 및 소화제', 1, 'high', true, '물갈이 및 낯선 음식 배탈 대비');
  addItem('health', '밴드(대일밴드) 및 연고(후시딘)', 1, 'medium', true, '도보 중 발 물집 및 찰과상');
  if (['TH', 'VN', 'PH', 'ID', 'IN'].includes(trip.countryCode)) {
    addItem('health', '벌레/모기 기피제 및 바르는 모기약', 1, 'high', true, '열대 뎅기열 및 모기 매개 감염 예방');
  }

  // 6. 금융 및 결제
  addItem('finance', '해외 결제 수수료 무료 트래블카드 (트래블로그/트래블월렛)', 1, 'high', true, '현지 ATM 무료 출금 및 결제 수수료 0%');
  addItem('finance', '비상용 해외 신용카드 (Visa 또는 Mastercard)', 1, 'high', true, '호텔 체크인 디포짓(보증금) 및 카드 분실 대비');
  addItem('finance', '현지 비상 현금 (소액권 위주)', 1, 'high', true, '노점, 팁, 긴급 교통비 대비');

  // 7. 여행 편의용품
  addItem('convenience', '목베개 및 수면 안대', 1, 'medium', false, '비행기 좌석 숙면 지원');
  addItem('convenience', '의류 압축 파우치 또는 지퍼백', 3, 'low', false, '캐리어 수납 공간 극대화');
  addItem('convenience', '휴대용 짐 무게 측정기 (저울)', 1, 'low', false, '귀국 시 수하물 무게 초과 수수료 예방');

  // 8. 여행지 특화 준비물 (스타일 및 목적 기반)
  if (trip.travelStyle === '해변·휴양형' || trip.travelPurpose === '휴양') {
    addItem('destination', '스마트폰 방수 파우치 (방수팩)', 1, 'high', true, '스노클링 및 물놀이 침수 방지');
    addItem('destination', '수영복 및 래시가드', 2, 'high', true, '해변 및 리조트 풀장 이용');
    addItem('destination', '아쿠아슈즈 또는 방수 샌들', 1, 'medium', true, '산호초 발 베임 방지');
  }
  if (trip.travelPurpose === '출장') {
    addItem('destination', '업무용 노트북 및 충전기 (기내 소지)', 1, 'high', true, '업무 수행 필수 기기');
    addItem('destination', '비즈니스 정장/단정한 셔츠', 2, 'high', true, '미팅 및 공식 행사용');
    addItem('destination', '명함 및 회사 서류', 1, 'high', true, '현지 비즈니스 미팅용');
  }
  if (trip.travelStyle === '자연·트레킹형' || trip.travelPurpose === '캠핑') {
    addItem('destination', '접지력 좋은 트레킹화/등산화', 1, 'high', true, '안전한 산악 도보');
    addItem('destination', '방수 방풍 아웃도어 외투 (고어텍스)', 1, 'high', true, '갑작스러운 산악 기상 변화 대비');
  }

  return items;
}
