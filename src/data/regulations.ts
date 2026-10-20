import type { BaggageRegulationItem } from '../types';

export const BAGGAGE_REGULATIONS: BaggageRegulationItem[] = [
  {
    id: 'reg-powerbank',
    name: '보조배터리 (휴대용 리튬이온 배터리)',
    category: '배터리·전자기기',
    carryOnStatus: 'CONDITIONAL',
    checkedStatus: 'PROHIBITED',
    quantityLimit: '100Wh 이하 1인당 최대 5개 (항공사 승인 시 100~160Wh 최대 2개)',
    packagingConditions: '단락(쇼트) 방지를 위해 개별 비닐팩 포장 또는 절연 테이프 부착 권장. 용량(Wh) 표기 필수.',
    rulesSummary: '위탁수하물(부치는 짐) 절대 불가! 반드시 기내로 들고 타야 합니다. 160Wh를 초과하는 대용량 배터리는 운송 자체가 불가합니다. 배터리 용량 표기가 지워진 경우 공항 보안검색대에서 압수될 수 있습니다.',
    destinationRestrictions: '중국 공항 출발 시 Wh 표기 없는 배터리는 100% 압수됩니다.',
    officialSource: '한국교통안전공단 항공보안365 / 국토교통부',
    sourceUrl: 'https://www.avsec365.or.kr',
    lastVerifiedAt: '2026-03-15',
    scope: '대한민국 출국 항공보안'
  },
  {
    id: 'reg-liquids',
    name: '액체·젤·에어로졸류 (화장품, 샴푸, 로션, 치약 등)',
    category: '액체·젤류',
    carryOnStatus: 'CONDITIONAL',
    checkedStatus: 'ALLOWED',
    quantityLimit: '기내: 개별 용기당 100ml(g) 이하, 1인당 1L 투명 지퍼백(20cm×20cm) 1개에 담겨 완전히 닫힌 상태',
    packagingConditions: '위탁수하물: 용기 파손 및 누출 방지를 위해 이중 비닐 포장 후 옷 사이에 완충 포장',
    rulesSummary: '국제선 기내 반입 시 내용물이 50ml만 남아있어도 용기 크기가 100ml를 초과하면 기내 반입 불가(보안검색대 압수). 100ml를 초과하는 화장품은 무조건 위탁수하물로 부치세요. 면세점 구매 액체류는 밀봉 봉투(STEB) 미개봉 시 경유지 규정에 따라 기내 반입 가능.',
    officialSource: '한국교통안전공단 항공보안365 / 인천국제공항공사',
    sourceUrl: 'https://www.airport.kr',
    lastVerifiedAt: '2026-03-15',
    scope: '대한민국 출국 항공보안'
  },
  {
    id: 'reg-korean-food',
    name: '고추장, 된장, 김치, 젓갈, 장아찌류 (반찬류)',
    category: '식품·농축산물',
    carryOnStatus: 'CONDITIONAL',
    checkedStatus: 'ALLOWED',
    quantityLimit: '기내: 100ml 이하 개별 용기만 허용(사실상 불가) / 위탁: 항공사 수하물 무게 한도 내',
    packagingConditions: '기압 변화로 인한 용기 팽창 및 누출 위험이 크므로 김치 전용 캔/밀폐용기 + 랩 3중 포장 필수',
    rulesSummary: '고추장, 김치, 통조림은 액체·젤류로 분류되어 기내 반입 시 100ml 초과로 전량 압수됩니다. 반드시 위탁수하물로 보내야 합니다.',
    destinationRestrictions: '호주, 뉴질랜드, 미국 입국 시 반드시 세관신고서에 식품 반입 신고(Declare)를 해야 벌금을 피할 수 있습니다.',
    officialSource: '관세청 해외통관지원센터 / 농림축산검역본부',
    sourceUrl: 'https://www.customs.go.kr',
    lastVerifiedAt: '2026-02-28',
    scope: '관세청 및 검역소'
  },
  {
    id: 'reg-ecigarette',
    name: '전자담배 (아이코스, 릴, 액상형 전자담배)',
    category: '배터리·전자기기',
    carryOnStatus: 'ALLOWED',
    checkedStatus: 'PROHIBITED',
    quantityLimit: '기내 휴대만 가능 (1인당 통상 기기 1~2개 소지)',
    packagingConditions: '액상 카트리지는 기내 액체류 규정(100ml) 적용. 기내에서 충전 및 흡연 엄격 금지.',
    rulesSummary: '배터리 화재 위험으로 인해 위탁수하물 위탁 절대 금지! 반드시 기내에 휴대하고 탑승해야 합니다.',
    destinationRestrictions: '⚠️ 매우 주의: 태국, 싱가포르, 대만, 인도, 홍콩은 전자담배 소지·반입 자체가 불법이며, 적발 시 막대한 벌금 또는 징역형에 처해집니다. 이들 국가 여행 시 절대 가져가지 마세요.',
    officialSource: '외교부 해외안전여행 / 항공보안365',
    sourceUrl: 'https://www.0404.go.kr',
    lastVerifiedAt: '2026-03-10',
    scope: '대한민국 출국 항공보안'
  },
  {
    id: 'reg-lighter',
    name: '일회용 가스 라이터 및 안전성냥',
    category: '위험물·화기',
    carryOnStatus: 'CONDITIONAL',
    checkedStatus: 'PROHIBITED',
    quantityLimit: '1인당 1개에 한하여 몸(주머니)에 직접 소지',
    packagingConditions: '위탁수하물 캐리어에 넣을 경우 X-ray 적발되어 가방 개봉 및 압수 처리됨',
    rulesSummary: '일반 일회용 라이터나 안전성냥은 1인당 1개만 몸에 소지하여 기내 탑승 가능합니다. 터보 라이터(블루 토치형)나 지포 기름 라이터는 기내/위탁 전면 금지입니다.',
    destinationRestrictions: '중국 공항은 출국 및 환승 시 라이터 소지가 1개도 허용되지 않고 100% 압수됩니다.',
    officialSource: '한국교통안전공단 항공보안365',
    sourceUrl: 'https://www.avsec365.or.kr',
    lastVerifiedAt: '2026-03-01',
    scope: '대한민국 출국 항공보안'
  },
  {
    id: 'reg-laptop-camera',
    name: '노트북, 태블릿, DSLR 카메라 (고가 전자기기)',
    category: '배터리·전자기기',
    carryOnStatus: 'ALLOWED',
    checkedStatus: 'CONDITIONAL',
    quantityLimit: '개인 사용 목적 통상 수량',
    packagingConditions: '위탁수하물로 부칠 경우 전원을 완전히 끄고(절전모드 불가), 완충재로 감싸야 함 (단 파손 면책)',
    rulesSummary: '고가 전자기기는 위탁수하물 파손 시 항공사 보상이 제한되므로 기내 휴대를 강력 권장합니다. 보안검색대 통과 시 노트북 및 태블릿은 가방에서 꺼내 별도 바구니에 담아 통과해야 합니다.',
    officialSource: '인천국제공항공사 보안검색 안내',
    sourceUrl: 'https://www.airport.kr',
    lastVerifiedAt: '2026-03-01',
    scope: '대한민국 출국 항공보안'
  },
  {
    id: 'reg-hair-styler',
    name: '무선 고데기 (충전식 헤어스타일러)',
    category: '배터리·전자기기',
    carryOnStatus: 'CONDITIONAL',
    checkedStatus: 'CONDITIONAL',
    quantityLimit: '배터리 탈착 가능 모델에 한함',
    packagingConditions: '배터리를 본체에서 완전히 분리해야 함',
    rulesSummary: '⚠️ 주의: 리튬 배터리가 본체와 분리되지 않는 일체형 무선 고데기는 기내 및 위탁수하물 모두 운송이 금지될 수 있습니다. (특히 일본 출발/도착 항공편 엄격 단속). 일반 유선 플러그형 고데기는 기내/위탁 모두 자유롭게 가능합니다.',
    officialSource: '일본 국토교통성 항공국(MLIT) / 한국교통안전공단',
    sourceUrl: 'https://www.mlit.go.jp',
    lastVerifiedAt: '2026-02-20',
    scope: '대한민국 출국 항공보안'
  },
  {
    id: 'reg-knife-scissors',
    name: '칼, 가위, 맥가이버칼, 손톱정리용 가위',
    category: '도검·공구류',
    carryOnStatus: 'PROHIBITED',
    checkedStatus: 'ALLOWED',
    quantityLimit: '위탁수하물로만 가능',
    packagingConditions: '날 부분이 노출되지 않도록 안전 덮개나 칼집으로 안전하게 포장',
    rulesSummary: '과도, 커터칼, 다용도 맥가이버칼, 긴 가위는 흉기로 간주되어 기내 반입이 전면 금지됩니다. 반드시 위탁수하물 캐리어 깊숙이 넣어 부치세요. 단, 일반 작은 손톱깎이는 기내 반입이 허용됩니다.',
    officialSource: '한국교통안전공단 항공보안365',
    sourceUrl: 'https://www.avsec365.or.kr',
    lastVerifiedAt: '2026-03-15',
    scope: '대한민국 출국 항공보안'
  },
  {
    id: 'reg-meds-insulin',
    name: '처방 의약품, 인슐린 주사기, 액체 천식 흡입기',
    category: '의약품·위생',
    carryOnStatus: 'ALLOWED',
    checkedStatus: 'ALLOWED',
    quantityLimit: '여행 일정에 필요한 적정량 + 영문 처방전 또는 의사 소견서',
    packagingConditions: '보안검색 시 신속한 확인을 위해 원본 약품 용기와 영문 처방전을 함께 보관',
    rulesSummary: '비행 중 필요한 처방 의약품 및 당뇨 환자용 인슐린 주사기/바늘은 기내 반입이 전면 허용됩니다. 100ml를 초과하는 액체 처방약도 의사 소견서/처방전 제시 시 예외 적용을 받습니다. 수하물 분실에 대비해 필수 상비약은 기내 휴대를 권장합니다.',
    officialSource: '국토교통부 항공보안과 / 인천공항 보안검색과',
    sourceUrl: 'https://www.airport.kr',
    lastVerifiedAt: '2026-03-10',
    scope: '대한민국 출국 항공보안'
  },
  {
    id: 'reg-spray-aerosol',
    name: '인체용 스프레이 (선스프레이, 헤어스프레이, 데오도란트)',
    category: '액체·젤류',
    carryOnStatus: 'CONDITIONAL',
    checkedStatus: 'CONDITIONAL',
    quantityLimit: '기내: 100ml 이하 / 위탁: 1개당 500ml 이하, 1인당 총 2L(2kg) 이하',
    packagingConditions: '분사 밸브가 우발적으로 눌리지 않도록 보호 캡 장착 필수',
    rulesSummary: '피부에 직접 뿌리는 미용·의료용 스프레이에 한하여 허용됩니다. 살충제, 페인트 스프레이, 방청제(WD-40) 등 산업용·가연성 에어로졸은 기내 및 위탁 모두 절대 불가합니다.',
    officialSource: '한국교통안전공단 항공보안365',
    sourceUrl: 'https://www.avsec365.or.kr',
    lastVerifiedAt: '2026-03-15',
    scope: '대한민국 출국 항공보안'
  },
  {
    id: 'reg-alcohol',
    name: '주류 (와인, 위스키, 소주, 맥주)',
    category: '식품·농축산물',
    carryOnStatus: 'CONDITIONAL',
    checkedStatus: 'CONDITIONAL',
    quantityLimit: '알코올 24% 미만 무제한 / 24%~70% 1인당 5L 이하 / 70% 초과 운송 금지',
    packagingConditions: '유리병 파손 방지 에어캡(뾱뾱이) 포장 필수',
    rulesSummary: '일반 주류는 기내 반입 시 100ml 규정에 걸리므로 위탁수하물로 부쳐야 합니다. 단, 면세구역(출국심사 후)에서 구매한 주류는 기내 반입이 가능합니다. (면세 한도: 대한민국 입국 시 1인당 2병, 총 2L 이하, 미화 400달러 이하)',
    officialSource: '관세청 여행자 휴대품 통관 안내',
    sourceUrl: 'https://www.customs.go.kr',
    lastVerifiedAt: '2026-03-01',
    scope: '대한민국 출국 항공보안'
  },
  {
    id: 'reg-meat-fruit',
    name: '육류 가공품 (육포, 소시지, 라면스프 고기분말) 및 생과일',
    category: '식품·농축산물',
    carryOnStatus: 'VERIFY_REQUIRED',
    checkedStatus: 'VERIFY_REQUIRED',
    quantityLimit: '국가별 검역 규정에 따라 상이 (대부분 국가 엄격 금지)',
    packagingConditions: '신고 대상 물품',
    rulesSummary: '아프리카돼지열병(ASF) 및 과수화상병 등 방역을 위해 쇠고기·돼지고기 육포, 소시지, 햄, 생과일류(망고, 사과 등)는 목적지 국가 및 대한민국 재입국 시 전면 반입 금지 품목입니다. 적발 시 최대 수천만 원의 과태료가 부과됩니다.',
    destinationRestrictions: '대만, 호주, 미국, 일본 등 전 세계 주요국에서 적발 시 즉시 압수 및 막대한 벌금 부과.',
    officialSource: '농림축산검역본부 국경검역안내',
    sourceUrl: 'https://www.qia.go.kr',
    lastVerifiedAt: '2026-03-05',
    scope: '관세청 및 검역소'
  },
  {
    id: 'reg-tripod-selfiestick',
    name: '삼각대 및 셀카봉',
    category: '스포츠·레저',
    carryOnStatus: 'CONDITIONAL',
    checkedStatus: 'ALLOWED',
    quantityLimit: '기내: 접었을 때 길이 60cm 이하에 한함 / 위탁: 허용',
    packagingConditions: '끝부분이 날카롭지 않아야 함',
    rulesSummary: '접었을 때 길이가 60cm 이하인 소형 삼각대와 셀카봉은 기내 반입이 가능하지만, 60cm를 초과하거나 끝부분이 뾰족한 대형 삼각대는 흉기로 분류되어 기내 반입이 불가하며 위탁수하물로 부쳐야 합니다.',
    officialSource: '한국교통안전공단 항공보안365',
    sourceUrl: 'https://www.avsec365.or.kr',
    lastVerifiedAt: '2026-02-15',
    scope: '대한민국 출국 항공보안'
  },
  {
    id: 'reg-camping-gas',
    name: '캠핑용 가스 카트리지 (부탄가스, 이소가스)',
    category: '위험물·화기',
    carryOnStatus: 'PROHIBITED',
    checkedStatus: 'PROHIBITED',
    quantityLimit: '운송 전면 금지 (0개)',
    packagingConditions: '반입 불가',
    rulesSummary: '가압 가스용기는 폭발 위험성 때문에 기내수하물 및 위탁수하물 모두 항공기 탑승이 전면 금지됩니다. 캠핑용 가스는 현지에 도착하여 마트나 아웃도어 샵에서 직접 구매해야 합니다.',
    officialSource: '국제민간항공기구(ICAO) 위험물 규정 / 국토교통부',
    sourceUrl: 'https://www.avsec365.or.kr',
    lastVerifiedAt: '2026-03-01',
    scope: '국제민간항공기구(ICAO)'
  },
  {
    id: 'reg-electric-mobility',
    name: '전동 킥보드, 전동 휠, 호버보드 (소형 전동 이동수단)',
    category: '배터리·전자기기',
    carryOnStatus: 'PROHIBITED',
    checkedStatus: 'PROHIBITED',
    quantityLimit: '운송 불가 (대용량 리튬 배터리 내장)',
    packagingConditions: '반입 불가',
    rulesSummary: '160Wh를 크게 초과하는 고용량 리튬 배터리가 장착된 전동 킥보드, 전동 휠, 세그웨이는 화재 폭발 위험으로 모든 항공사에서 기내 및 위탁 운송을 전면 금지하고 있습니다.',
    officialSource: '국토교통부 항공보안과',
    sourceUrl: 'https://www.avsec365.or.kr',
    lastVerifiedAt: '2026-03-01',
    scope: '대한민국 출국 항공보안'
  }
];

export function searchRegulations(query: string, categoryFilter?: string): BaggageRegulationItem[] {
  const q = query.trim().toLowerCase();
  return BAGGAGE_REGULATIONS.filter(item => {
    const matchesQuery = !q || 
      item.name.toLowerCase().includes(q) || 
      item.rulesSummary.toLowerCase().includes(q) ||
      (item.destinationRestrictions && item.destinationRestrictions.toLowerCase().includes(q));
    const matchesCategory = !categoryFilter || categoryFilter === '전체' || item.category === categoryFilter;
    return matchesQuery && matchesCategory;
  });
}
