import type { TimelineTask, BudgetItem } from '../types';

export function getDefaultTimelineTasks(tripId: string): TimelineTask[] {
  return [
    // 1. 여행 전 미리
    {
      id: `task-adv-1-${tripId}`,
      tripId,
      stage: 'advance',
      stageTitle: '여행 전 미리 (D-30 ~ D-14)',
      title: '여권 유효기간 확인 (잔여 6개월 이상)',
      description: '여권 만료일이 6개월 미만일 경우 항공사 탑승 거부 및 목적지 입국 불가',
      isCompleted: false,
      priority: 'high'
    },
    {
      id: `task-adv-2-${tripId}`,
      tripId,
      stage: 'advance',
      stageTitle: '여행 전 미리 (D-30 ~ D-14)',
      title: '비자 또는 전자여행허가(ESTA/ETA 등) 신청 및 승인 확인',
      description: '최소 출국 72시간 전 신청 필요, 대행 사기 사이트 주의',
      isCompleted: false,
      priority: 'high'
    },
    {
      id: `task-adv-3-${tripId}`,
      tripId,
      stage: 'advance',
      stageTitle: '여행 전 미리 (D-30 ~ D-14)',
      title: '해외여행자보험 가입',
      description: '상해/질병 해외 치료비 및 휴대품 도난 보장 한도 확인',
      isCompleted: false,
      priority: 'high'
    },
    {
      id: `task-adv-4-${tripId}`,
      tripId,
      stage: 'advance',
      stageTitle: '여행 전 미리 (D-30 ~ D-14)',
      title: '트래블카드 발급 및 해외원화결제(DCC) 차단 신청',
      description: '불필요한 환전 수수료 및 이중 환전 수수료 방지',
      isCompleted: false,
      priority: 'normal'
    },
    {
      id: `task-adv-5-${tripId}`,
      tripId,
      stage: 'advance',
      stageTitle: '여행 전 미리 (D-30 ~ D-14)',
      title: 'eSIM 구매 또는 포켓와이파이 예약',
      description: '스마트폰 기종의 eSIM 지원 여부(다이얼 *#06# EID 확인) 사전 점검',
      isCompleted: false,
      priority: 'high'
    },

    // 2. 출발 며칠 전
    {
      id: `task-days-1-${tripId}`,
      tripId,
      stage: 'daysBefore',
      stageTitle: '출발 며칠 전 (D-7 ~ D-3)',
      title: '목적지 현지 주간 날씨 예보 확인',
      description: '기온 및 강수 확률에 따라 의류 최종 수정 (비 예보 시 접이식 우산 챙기기)',
      isCompleted: false,
      priority: 'normal'
    },
    {
      id: `task-days-2-${tripId}`,
      tripId,
      stage: 'daysBefore',
      stageTitle: '출발 며칠 전 (D-7 ~ D-3)',
      title: '이용 항공사 무료 위탁수하물 무게 규정 확인',
      description: 'LCC 및 FSC별 15kg / 23kg 수하물 개수 및 초과 요금 확인',
      isCompleted: false,
      priority: 'high'
    },
    {
      id: `task-days-3-${tripId}`,
      tripId,
      stage: 'daysBefore',
      stageTitle: '출발 며칠 전 (D-7 ~ D-3)',
      title: '구글 지도 현지 도시 오프라인 맵 다운로드',
      description: '통신 불통 상황에 대비해 숙소, 역, 주요 관광지 핀 저장',
      isCompleted: false,
      priority: 'normal'
    },
    {
      id: `task-days-4-${tripId}`,
      tripId,
      stage: 'daysBefore',
      stageTitle: '출발 며칠 전 (D-7 ~ D-3)',
      title: '공항 이동 교통편 예약 (공항철도/리무진 버스)',
      description: '출국 항공편 출발 3시간 전 공항 도착 기준 시간 계획',
      isCompleted: false,
      priority: 'normal'
    },

    // 3. 출발 전날
    {
      id: `task-dayb-1-${tripId}`,
      tripId,
      stage: 'dayBefore',
      stageTitle: '출발 전날 (D-1)',
      title: '항공사 모바일 웹/앱 온라인 체크인 완료',
      description: '사전 좌석 지정 및 공항 대기 시간 단축',
      isCompleted: false,
      priority: 'high'
    },
    {
      id: `task-dayb-2-${tripId}`,
      tripId,
      stage: 'dayBefore',
      stageTitle: '출발 전날 (D-1)',
      title: '캐리어 무게 사전 측정 및 100ml 초과 액체류 위탁 캐리어 배치',
      description: '공항 보안검색대에서 화장품 압수 방지',
      isCompleted: false,
      priority: 'high'
    },
    {
      id: `task-dayb-3-${tripId}`,
      tripId,
      stage: 'dayBefore',
      stageTitle: '출발 전날 (D-1)',
      title: '보조배터리 완충 및 기내 휴대용 가방에 분리 보관',
      description: '위탁수하물 캐리어에 넣지 않았는지 반드시 더블 체크',
      isCompleted: false,
      priority: 'high'
    },
    {
      id: `task-dayb-4-${tripId}`,
      tripId,
      stage: 'dayBefore',
      stageTitle: '출발 전날 (D-1)',
      title: '호텔 영문 주소 및 예약 번호 스마트폰 오프라인 저장',
      description: '입국신고서 작성 시 숙소 영문명, 주소, 전화번호 기재 필수',
      isCompleted: false,
      priority: 'normal'
    },

    // 4. 공항 출발 전
    {
      id: `task-dep-1-${tripId}`,
      tripId,
      stage: 'departureDay',
      stageTitle: '공항 출발 직전 (D-Day)',
      title: '여권 실물 및 결제 지갑 최종 소지 확인',
      description: '가방 깊숙한 곳이나 집에 두고 오지 않았는지 마지막 육안 확인',
      isCompleted: false,
      priority: 'high'
    },
    {
      id: `task-dep-2-${tripId}`,
      tripId,
      stage: 'departureDay',
      stageTitle: '공항 출발 직전 (D-Day)',
      title: '출발 공항 여객터미널 번호 확인 (인천공항 제1터미널 vs 제2터미널)',
      description: '항공사별 터미널이 다르므로 오도착 시 최소 30분 소요 주의 (대한항공 T2, 아시아나/LCC 대부분 T1 등)',
      isCompleted: false,
      priority: 'high'
    },
    {
      id: `task-dep-3-${tripId}`,
      tripId,
      stage: 'departureDay',
      stageTitle: '공항 출발 직전 (D-Day)',
      title: '가정 내 가스 밸브 잠금 및 콘센트 소등 확인',
      description: '장기 외출 시 안전 점검',
      isCompleted: false,
      priority: 'normal'
    }
  ];
}

export function getDefaultBudgetItems(tripId: string): BudgetItem[] {
  return [
    { id: `b-1-${tripId}`, tripId, category: 'flight', categoryName: '항공권', plannedAmount: 450000, spentAmount: 432000, currency: 'KRW' },
    { id: `b-2-${tripId}`, tripId, category: 'accommodation', categoryName: '숙소 예약', plannedAmount: 500000, spentAmount: 480000, currency: 'KRW' },
    { id: `b-3-${tripId}`, tripId, category: 'transport', categoryName: '현지 교통비 (지하철/패스/택시)', plannedAmount: 120000, spentAmount: 0, currency: 'KRW' },
    { id: `b-4-${tripId}`, tripId, category: 'food', categoryName: '식비 및 카페/미식', plannedAmount: 350000, spentAmount: 0, currency: 'KRW' },
    { id: `b-5-${tripId}`, tripId, category: 'activity', categoryName: '관광지 입장료 및 액티비티', plannedAmount: 100000, spentAmount: 85000, currency: 'KRW' },
    { id: `b-6-${tripId}`, tripId, category: 'shopping', categoryName: '쇼핑 및 기념품', plannedAmount: 200000, spentAmount: 0, currency: 'KRW' },
    { id: `b-7-${tripId}`, tripId, category: 'connectivity', categoryName: '통신 (eSIM/유심)', plannedAmount: 20000, spentAmount: 18500, currency: 'KRW' },
    { id: `b-8-${tripId}`, tripId, category: 'insurance', categoryName: '여행자보험', plannedAmount: 25000, spentAmount: 23000, currency: 'KRW' },
    { id: `b-9-${tripId}`, tripId, category: 'emergency', categoryName: '비상 예비비', plannedAmount: 150000, spentAmount: 0, currency: 'KRW' }
  ];
}
