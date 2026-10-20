import type { CountryGuide } from '../types';

export const COUNTRY_GUIDES: Record<string, CountryGuide> = {
  JP: {
    countryCode: 'JP',
    countryName: '일본',
    region: '동아시아',
    flagEmoji: '🇯🇵',
    majorCities: ['도쿄', '오사카', '교토', '후쿠오카', '삿포로', '오키나와'],
    plugTypes: [
      { type: 'A', description: '11자형 2핀 플러그 (100V 전용)' },
      { type: 'B', description: '11자형 + 접지 3핀 플러그' }
    ],
    standardVoltage: '100V',
    standardFrequency: '50Hz (동일본/도쿄) / 60Hz (서일본/오사카)',
    plugAdapterNeeded: true, // 한국 220V 둥근 핀과 다르므로 돼지코 필수
    transformerNeeded: false, // 스마트폰/노트북은 100~240V 프리볼트라 변압기 불필요, 단 국내용 220V 전용 고데기/드라이기는 작동 안 됨
    electricalGuidance: '한국의 둥근 플러그(C/F형)는 전혀 들어가지 않으므로 "11자형 변환 어댑터(돼지코)"가 필수입니다. 휴대폰 충전기, 노트북 등 대부분의 전자기기는 "100-240V 50/60Hz" 프리볼트이므로 돼지코만 끼우면 바로 사용할 수 있습니다. 단, 한국에서 구매한 220V 전용 열기구(다이슨 에어랩, 고데기, 드라이기)는 전압 부족으로 바람이 약하거나 고장 날 수 있으니 프리볼트 여부를 기기 라벨에서 반드시 확인하세요.',
    visaInfo: {
      requirement: '대한민국 여권 소지자 90일 무비자 관광 가능',
      passportValidity: '귀국일까지 유효한 여권 (통상 3~6개월 이상 잔여 유효기간 권장)',
      digitalDeclaration: '출국 전 "Visit Japan Web(VJW)" 등록 권장 (입국심사 및 세관신고 QR코드로 빠른 통과 가능)',
      officialSiteUrl: 'https://vjw-lp.digital.go.jp/ko/'
    },
    connectivityTips: {
      esimSupported: '아이폰 XR 이후, 갤럭시 S23 이후 기종 안정적 지원',
      recommendedOption: 'eSIM 또는 소프트뱅크/도코모 로컬 유심 추천',
      tips: [
        '지하철 환승이 복잡하므로 구글 지도(Google Maps) 및 재팬 트래블 네비게이션 앱 필수 다운로드',
        '스이카(Suica) 또는 파스모(Pasmo) 교통카드를 아이폰 애플월렛에 등록해두면 지하철과 편의점에서 터치 결제 편리'
      ]
    },
    paymentTips: {
      currency: '일본 엔 (JPY)',
      currencySymbol: '¥',
      cardAcceptanceRate: '높음',
      tipCulture: '팁 문화 없음 (팁을 두면 거스름돈을 두고 간 것으로 오해할 수 있음)',
      exchangeTips: '트래블로그, 트래블월렛 카드로 현지 세븐일레븐(Seven Bank) ATM에서 수수료 없이 엔화 인출 가능. 소도시 라멘집, 자판기, 신사 등은 아직 현금만 받는 곳이 많으므로 1일 3,000~5,000엔 정도의 비상 현금 소지 권장.'
    },
    culturalTips: [
      '에스컬레이터 탑승 시 도쿄는 왼쪽, 오사카는 오른쪽에 서서 길을 터줍니다.',
      '전철이나 버스 안에서는 통화가 엄격히 금지되며, 스마트폰은 매너 모드로 설정해야 합니다.',
      '길거리 흡연은 전면 금지되어 있으며, 지정된 흡연 구역(Smoking Area)에서만 가능합니다. (위반 시 과태료 부과)',
      '식당에서 직원을 부를 때 크게 소리치지 않고 눈을 마주치거나 벨을 누릅니다.'
    ],
    safetyTips: [
      '치안이 매우 우수하지만, 신주쿠 가부키초나 롯폰기 등 번화가 호객꾼(바가지 술집)은 절대 따라가지 마세요.',
      '지진 등 자연재해 발생 시 안내방송과 실내 테이블 아래로 머리를 보호하세요.',
      '여권을 분실했을 경우 가까운 파출소(고반)에서 분실신고서(유실신고필증)를 발급받아야 영사관에서 임시여권을 발급받을 수 있습니다.'
    ],
    emergencyContacts: {
      police: '110',
      ambulance: '119',
      consularCallCenter: '+82-2-3210-0404 (대한민국 외교부 영사콜센터 24시간 연중무휴)',
      localEmbassyNote: '주일본 대한민국 대사관(도쿄): +81-3-3452-7611 / 주오사카 총영사관: +81-6-4256-2345'
    },
    regulatedSubstancesWarning: '⚠️ 일본은 마약류 관련 법률(대마단속법)이 극도로 엄격합니다. 대마 및 CBD 성분 함유 제품 반입 시 즉시 체포되어 구속 수사 및 추방 조치됩니다. 국내법 역시 속인주의에 따라 해외에서 대마 섭취 시 귀국 즉시 처벌됩니다.',
    officialSource: '주일본대한민국대사관 / 일본정부관광국(JNTO)',
    sourceUrl: 'https://overseas.mofa.go.kr/jp-ko/index.do',
    lastVerifiedAt: '2026-03-01'
  },

  TH: {
    countryCode: 'TH',
    countryName: '태국',
    region: '동남아시아',
    flagEmoji: '🇹🇭',
    majorCities: ['방콕', '푸껫', '치앙마이', '파타야', '끄라비'],
    plugTypes: [
      { type: 'A', description: '11자형 2핀' },
      { type: 'B', description: '11자형 + 접지핀' },
      { type: 'C', description: '둥근 2핀 (한국형 호환)' }
    ],
    standardVoltage: '220V',
    standardFrequency: '50Hz',
    plugAdapterNeeded: false, // 복합 소켓이라 한국 플러그(C/F) 대부분 바로 꽂힘
    transformerNeeded: false,
    electricalGuidance: '태국의 대부분 호텔 콘센트는 11자형과 한국의 둥근 2핀(C/F형)이 모두 들어가는 "멀티형 콘센트(Universal Socket)"로 제작되어 있어 한국 플러그를 그대로 꽂아 사용할 수 있습니다. 단, 콘센트 구멍이 헐거워 충전기가 쉽게 빠질 수 있으니 보조 고정 멀티탭이나 어댑터를 챙기면 편리합니다.',
    visaInfo: {
      requirement: '대한민국 여권 소지자 90일 무비자 관광 입국 가능',
      passportValidity: '입국일 기준 6개월 이상 유효기간 필수',
      digitalDeclaration: '별도 온라인 사전신고는 불필요하나 귀국 항공권 및 숙소 예약 바우처 소지 필수',
      officialSiteUrl: 'https://www.immigration.go.th'
    },
    connectivityTips: {
      esimSupported: 'AIS, True, Dtac 현지 통신사 eSIM 완벽 지원',
      recommendedOption: 'AIS / True 5G 무제한 데이터 eSIM',
      tips: [
        '차량 호출 및 배달 필수 앱인 "그랩(Grab)" 또는 "볼트(Bolt)"를 출국 전 설치하고 카드 등록 완료 권장',
        '도심 지하철 지상철(BTS)은 래빗카드, 지하철(MRT)은 비자/마스터 컨택리스 카드로 탑승 가능'
      ]
    },
    paymentTips: {
      currency: '태국 바트 (THB)',
      currencySymbol: '฿',
      cardAcceptanceRate: '보통 (현금 비중 필요)',
      tipCulture: '마사지샵(1시간당 50~100바트), 레스토랑(서비스료 미포함 시 잔돈 또는 50바트 정도 매너 팁)',
      exchangeTips: 'GLN(하나은행/토스 모바일 QR 결제)이 태국 전역 야시장과 노점까지 거의 90% 이상 지원되므로 현금을 많이 환전하지 않고 GLN QR과 트래블카드를 병행하면 가장 유리합니다. ATM 출금 시 건당 220바트의 고액 수수료가 부과됩니다.'
    },
    culturalTips: [
      '왕실 모독죄가 매우 엄격합니다. 국왕이나 왕실 가족의 초상화, 화폐를 훼손하거나 불경한 발언을 절대 하지 마세요.',
      '사원(왓 아룬, 왓 프라깨우 등) 방문 시 민소매 나시, 반바지, 무릎 위 짧은 치마, 샌들 슬리퍼 착용이 엄격히 금지됩니다.',
      '어린이의 머리를 쓰다듬는 행동은 영혼이 깃든 곳을 만지는 무례로 여겨지므로 삼가세요.',
      '스님과 마주칠 때 여성은 몸이나 옷깃이 스치지 않도록 거리를 두어야 합니다.'
    ],
    safetyTips: [
      '길거리 툭툭(Tuk-Tuk)은 바가지요금이 심하므로 가격을 미리 흥정하거나 그랩/볼트를 이용하세요.',
      '수돗물(석회수)은 절대 마시지 말고 반드시 편의점에서 구매한 생수를 음용하세요. 식당의 얼음도 위생에 주의합니다.',
      '야생 원숭이(푸껫 원숭이 언덕 등)에게 먹이를 주거나 선글라스/휴대폰을 빼앗기지 않도록 거리를 두세요.'
    ],
    emergencyContacts: {
      police: '191 (일반 경찰) / 1155 (관광경찰 Tourist Police, 영어 지원)',
      ambulance: '1669',
      consularCallCenter: '+82-2-3210-0404 (외교부 영사콜센터)',
      localEmbassyNote: '주태국 대한민국 대사관(방콕): +66-2-247-7537'
    },
    regulatedSubstancesWarning: '🚨 【대마초 및 마약류 절대 주의 경고】: 태국 현지에서 대마초(마리화나/Cannabis/Weed) 성분이 함유된 음료, 아이스크림, 젤리, 요리가 유통되고 있습니다. 대한민국 형법은 "속인주의"를 적용하므로, 한국인이 해외에서 대마를 섭취·소지·흡연할 경우 귀국 시 모발 및 소변 검사로 적발되어 5년 이하의 징역 또는 5천만 원 이하의 벌금에 처해집니다. 식당이나 편의점 구매 시 초록색 단풍잎(대마 잎) 마크, "Cannabis", "Kratom", "THC", "CBD" 표기가 있는지 반드시 확인하고 모르는 음식은 절대 섭취하지 마세요. 또한 전자담배 소지 적발 시 압수 및 징역/고액 벌금이 부과되므로 전자담배를 절대 가져가지 마세요.',
    officialSource: '주태국대한민국대사관 / 태국정부관광청(TAT)',
    sourceUrl: 'https://overseas.mofa.go.kr/th-ko/index.do',
    lastVerifiedAt: '2026-03-01'
  },

  VN: {
    countryCode: 'VN',
    countryName: '베트남',
    region: '동남아시아',
    flagEmoji: '🇻🇳',
    majorCities: ['다낭', '하노이', '호찌민', '나트랑', '푸꾸옥'],
    plugTypes: [
      { type: 'A', description: '11자형 2핀' },
      { type: 'C', description: '둥근 2핀 (한국형 호환)' }
    ],
    standardVoltage: '220V',
    standardFrequency: '50Hz',
    plugAdapterNeeded: false,
    transformerNeeded: false,
    electricalGuidance: '한국의 220V 플러그(C/F형)를 어댑터 없이 그대로 꽂아 쓸 수 있습니다.',
    visaInfo: {
      requirement: '대한민국 여권 소지자 45일 무비자 관광 입국 가능',
      passportValidity: '여권 유효기간 6개월 이상 잔여 필수',
      digitalDeclaration: '별도 사전 온라인 입국신고서 없음 (종이 입국신고서도 폐지됨)',
      officialSiteUrl: 'https://evisa.xuatnhapcanh.gov.vn'
    },
    connectivityTips: {
      esimSupported: 'Viettel, Vinaphone eSIM 안정적 지원',
      recommendedOption: 'Viettel 데이터 무제한 eSIM',
      tips: [
        '택시 바가지 방지를 위해 "그랩(Grab)" 앱 호출 필수',
        '구글 번역기 오프라인 베트남어 팩 미리 다운로드'
      ]
    },
    paymentTips: {
      currency: '베트남 동 (VND)',
      currencySymbol: '₫',
      cardAcceptanceRate: '보통 (야시장/로컬식당 현금 필수)',
      tipCulture: '마사지샵(60분 기준 50,000~100,000동 팁 관례)',
      exchangeTips: '베트남 동은 화폐 단위가 매우 크므로 뒤에 0을 떼고 20으로 나누면 원화 가치가 계산됩니다(예: 100,000동 = 약 5,400원). 계산 시 지폐 단위 혼동에 유의하세요. 트래블카드 VPBank, TPBank ATM 수수료 무료 인출 가능.'
    },
    culturalTips: [
      '사찰 방문 시 반바지와 민소매 착용을 자제합니다.',
      '식당에서 물티슈를 사용하면 별도 요금(약 3,000~5,000동)이 청구될 수 있습니다.'
    ],
    safetyTips: [
      '오토바이를 탄 날치기 소매치기(스마트폰, 크로스백)가 빈번하므로 차도 쪽으로 스마트폰을 들고 걷지 마세요.',
      '수돗물 석회질이 심하므로 양치 시에도 생수를 사용하는 것이 안전합니다.',
      '길거리 얼음이 들어간 음료(카페 쓰어다 등)는 위장이 약한 경우 배탈을 유발할 수 있으니 위생 상태를 확인하세요.'
    ],
    emergencyContacts: {
      police: '113',
      ambulance: '115',
      consularCallCenter: '+82-2-3210-0404',
      localEmbassyNote: '주베트남 대사관(하노이): +84-24-3831-5111 / 다낭 총영사관: +84-23-6356-6100'
    },
    regulatedSubstancesWarning: '⚠️ 베트남은 마약 범죄에 대해 사형까지 처해질 수 있을 만큼 세계에서 가장 가혹한 처벌을 내립니다. 모르는 사람이 주는 물건이나 담배를 절대 받지 마세요.',
    officialSource: '주베트남대한민국대사관',
    sourceUrl: 'https://overseas.mofa.go.kr/vn-ko/index.do',
    lastVerifiedAt: '2026-03-01'
  },

  US: {
    countryCode: 'US',
    countryName: '미국',
    region: '북미',
    flagEmoji: '🇺🇸',
    majorCities: ['뉴욕', '로스앤젤레스', '샌프란시스코', '하와이', '라스베이거스'],
    plugTypes: [
      { type: 'A', description: '11자형 2핀 플러그' },
      { type: 'B', description: '11자형 + 원형 접지핀 3구' }
    ],
    standardVoltage: '120V',
    standardFrequency: '60Hz',
    plugAdapterNeeded: true, // 11자형 돼지코 필수
    transformerNeeded: false,
    electricalGuidance: '11자형 변환 어댑터(돼지코)가 필수입니다. 100~240V 프리볼트 전자기기는 정상 작동하지만, 한국 220V 전용 드라이기나 온열매트는 120V에서 출력이 크게 떨어져 작동하지 않거나 고장 날 수 있습니다.',
    visaInfo: {
      requirement: '미국 전자여행허가(ESTA) 사전 승인 필수 (최대 90일 체류)',
      passportValidity: '출국 예정일 기준 유효한 전자여권(e-Passport)',
      digitalDeclaration: '출국 최소 72시간 전 공식 ESTA 웹사이트에서 신청 필수 (가짜 대행사이트 수수료 사기 주의)',
      officialSiteUrl: 'https://esta.cbp.dhs.gov'
    },
    connectivityTips: {
      esimSupported: 'T-Mobile, AT&T eSIM 완벽 지원',
      recommendedOption: 'T-Mobile 데이터 무제한 eSIM',
      tips: [
        '미국은 국토가 넓어 통신사별 음영 지역이 있을 수 있으니 오프라인 구글 지도 다운로드 필수',
        '우버(Uber) 및 리프트(Lyft) 앱 사전 카드 등록 필수'
      ]
    },
    paymentTips: {
      currency: '미국 달러 (USD)',
      currencySymbol: '$',
      cardAcceptanceRate: '매우 높음 (트래블카드 추천)',
      tipCulture: '식당 서빙 식사 시 18% ~ 22% 팁 기본 (영수증에 Tip란 직접 작성 또는 단말기 선택). 택시 15~20%, 호텔 벨보이/룸메이드 2~5달러.',
      exchangeTips: '현금은 거의 쓰이지 않으며 100달러 고액권은 위조지폐 검사로 거부당할 수 있습니다. 1달러, 5달러 등 소액권 위주로 준비하세요.'
    },
    culturalTips: [
      '상점이나 엘리베이터에서 마주치는 사람과 가볍게 "Hi, how are you?" 눈인사를 건넵니다.',
      '미국은 주(State)마다 소비세(Sales Tax)가 별도로 부과되므로 가격표 표시 금액보다 결제 금액이 높습니다.'
    ],
    safetyTips: [
      '대도시(샌프란시스코, LA 다운타운, 시카고 등) 특정 구역(우범지역, 텐트촌)은 야간 도보 이동을 삼가세요.',
      '렌터카 이용 시 가방, 쇼핑백, 옷가지를 차 안 좌석에 절대 올려두지 마세요. 차량 유리창 파손 절도(Smash-and-Grab)가 극도로 빈번합니다. 모든 짐은 트렁크에 숨겨야 합니다.',
      '경찰관에게 검문을 받을 때는 절대로 갑자기 주머니나 가방에 손을 넣지 말고, 두 손을 운전대 위에 올리고 지시를 따르세요.'
    ],
    emergencyContacts: {
      police: '911',
      ambulance: '911',
      consularCallCenter: '+82-2-3210-0404',
      localEmbassyNote: '주미국 대한민국 대사관(워싱턴): +1-202-939-5600 / 뉴욕 총영사관: +1-646-674-6000'
    },
    regulatedSubstancesWarning: '⚠️ 미국 일부 주(캘리포니아, 뉴욕 등)에서 기호용 대마가 합법이지만, 연방법상으로는 여전히 불법이며, 한국인은 속인주의 원칙에 따라 귀국 시 형사 처벌 대상입니다. 특히 미국 공항에서 연방 세관국경보호국(CBP)의 검색을 받으므로 어떤 경우에도 마약류를 소지하거나 주(State) 경계를 넘지 마세요.',
    officialSource: '주미한국대사관 / 미 관세국경보호청(CBP)',
    sourceUrl: 'https://overseas.mofa.go.kr/us-ko/index.do',
    lastVerifiedAt: '2026-03-01'
  },

  FR: {
    countryCode: 'FR',
    countryName: '프랑스',
    region: '서유럽',
    flagEmoji: '🇫🇷',
    majorCities: ['파리', '니스', '리옹', '마르세유'],
    plugTypes: [
      { type: 'E', description: '둥근 2핀 + 돌출형 접지핀' },
      { type: 'C', description: '둥근 2핀 (한국형 호환)' }
    ],
    standardVoltage: '230V',
    standardFrequency: '50Hz',
    plugAdapterNeeded: false, // 한국 C/F형 플러그와 대부분 직접 호환
    transformerNeeded: false,
    electricalGuidance: '한국의 220V 플러그와 규격이 거의 같아 대부분 어댑터 없이 꽂아 쓸 수 있습니다. 단, 벽면 콘센트 중앙에 접지용 금속 핀이 튀어나와 있는 E형 소켓의 경우, 뒤쪽에 접지 구멍이 뚫려있지 않은 구형 두꺼운 플러그는 꽂히지 않을 수 있으니 유럽 호환 멀티탭을 챙기면 안전합니다.',
    visaInfo: {
      requirement: '솅겐 협약국 (180일 기간 중 최대 90일 무비자 체류 가능)',
      passportValidity: '솅겐 지역 출국 예정일로부터 3개월 이상 유효기간 남은 여권',
      digitalDeclaration: '현재 ETIAS(유럽 사전여행허가제) 도입 준비 중이므로 출국 전 시행 여부 확인 필수',
      officialSiteUrl: 'https://travel-europe.europa.eu/etias_en'
    },
    connectivityTips: {
      esimSupported: 'Orange, Bouygues eSIM 완벽 지원',
      recommendedOption: 'Orange Holiday 유럽 통합 eSIM',
      tips: [
        '파리 지하철 내에서는 통신 신호가 약하거나 끊기는 구간이 많으므로 오프라인 지하철 노선도 앱 필수',
        '나비고(Navigo) 교통패스 모바일 등록 가능'
      ]
    },
    paymentTips: {
      currency: '유로 (EUR)',
      currencySymbol: '€',
      cardAcceptanceRate: '매우 높음 (트래블카드 추천)',
      tipCulture: '법적으로 봉사료가 계산서에 포함(Service Compris)되어 있어 팁 의무 없음. 만족스러운 서비스 시 1~2유로 동전 매너 팁.',
      exchangeTips: '현금은 화장실 이용(0.5~1유로) 등 소액 외에는 95% 이상 신용카드/트래블카드로 결제 가능합니다.'
    },
    culturalTips: [
      '상점이나 카페에 들어갈 때 점원에게 먼저 "Bonjour(봉주르)"라고 인사하는 것이 프랑스 문화의 기본 에티켓입니다. 인사 없이 질문하면 불친절한 응대를 받을 수 있습니다.',
      '식당에서 직원을 향해 손을 흔들거나 부르지 않고 눈이 마주칠 때까지 기다립니다.'
    ],
    safetyTips: [
      '⚠️ 파리 전역(에펠탑, 루브르, 몽마르트르, 북역, 지하철 1호선)에서 소매치기, 팔찌 사기단, 설문조사 서명단이 매우 기승을 부립니다.',
      '스마트폰에 스프링 줄(도난방지 스트랩)을 걸고 다니고, 카페 야외 테라스 테이블 위에 스마트폰을 올려놓지 마세요.',
      '가방은 반드시 지퍼가 달린 크로스백으로 앞으로 메고, 붐비는 지하철 승하차 시 가방을 꼭 쥐고 계세요.'
    ],
    emergencyContacts: {
      police: '17',
      ambulance: '15 (SAMU)',
      consularCallCenter: '+82-2-3210-0404',
      localEmbassyNote: '주프랑스 대한민국 대사관(파리): +33-1-4753-0101'
    },
    regulatedSubstancesWarning: '⚠️ 프랑스는 공공장소에서의 대마 흡연 및 소지가 엄격히 불법이며 경찰의 불시 검문 시 벌금형이 즉시 부과됩니다. 대한민국 형법상 해외 대마 사용 역시 처벌됩니다.',
    officialSource: '주프랑스대한민국대사관 / 프랑스 관광청',
    sourceUrl: 'https://overseas.mofa.go.kr/fr-ko/index.do',
    lastVerifiedAt: '2026-03-01'
  },

  GB: {
    countryCode: 'GB',
    countryName: '영국',
    region: '영국·아일랜드',
    flagEmoji: '🇬🇧',
    majorCities: ['런던', '에든버러', '맨체스터', '옥스퍼드'],
    plugTypes: [
      { type: 'G', description: '영국식 두꺼운 사각 3구 핀 (230V)' }
    ],
    standardVoltage: '230V',
    standardFrequency: '50Hz',
    plugAdapterNeeded: true, // 영국식 3핀 G형 어댑터 필수
    transformerNeeded: false,
    electricalGuidance: '영국은 3구 사각형 핀의 "G형 콘센트"를 사용하므로 한국 플러그(C/F형)는 어댑터 없이는 절대 들어가지 않습니다. 반드시 영국용 멀티 어댑터(G형)를 준비하세요. 콘센트마다 개별 ON/OFF 전원 스위치가 있으므로 스위치를 켜야 충전됩니다.',
    visaInfo: {
      requirement: '대한민국 여권 소지자 6개월 무비자 입국 가능',
      passportValidity: '영국 체류 예정 기간 동안 유효한 여권',
      digitalDeclaration: '영국 전자여행허가(ETA) 단계적 확대 적용 중이므로 최신 영국 정부 공식 사이트(gov.uk) 사전 확인 필수',
      officialSiteUrl: 'https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta'
    },
    connectivityTips: {
      esimSupported: 'EE, Vodafone, O2, Three eSIM 안정적 지원',
      recommendedOption: 'EE 또는 Vodafone 5G eSIM',
      tips: [
        '런던 시내 대중교통(지하철 언더그라운드, 빨간 2층 버스)은 별도 교통카드 없이 해외 결제 컨택리스 카드(트래블로그/애플페이)를 단말기에 터치하면 일일 상한제(Daily Cap)가 자동 적용되어 가장 저렴합니다.'
      ]
    },
    paymentTips: {
      currency: '영국 파운드 (GBP)',
      currencySymbol: '£',
      cardAcceptanceRate: '매우 높음 (현금 없는 cashless 매장 다수)',
      tipCulture: '식당 영수증에 12.5% Optional Service Charge가 기재되어 나오는 경우가 많으며 추가 팁은 불필요',
      exchangeTips: '현금을 받지 않는 매장이 대다수이므로 환전은 최소화하고 컨택리스 카드 위주로 이용하세요.'
    },
    culturalTips: [
      '지하철 에스컬레이터에서는 반드시 오른쪽에 서 있어야 합니다 (왼쪽은 보행자용 추월선).',
      '차량이 좌측통행이므로 길을 건널 때 바닥에 적힌 "LOOK RIGHT(오른쪽을 보세요)" 표시를 확인하세요.'
    ],
    safetyTips: [
      '런던 시내(소호, 웨스트엔드, 피카딜리)에서 자전거/전기 스쿠터를 탄 날치기범이 보행자 손에 쥔 스마트폰을 낚아채 달아나는 사건이 빈번합니다. 길가에서 스마트폰을 볼 때 차도 쪽에 서 있지 마세요.'
    ],
    emergencyContacts: {
      police: '999 (비응급 상황: 101)',
      ambulance: '999',
      consularCallCenter: '+82-2-3210-0404',
      localEmbassyNote: '주영국 대한민국 대사관(런던): +44-20-7227-5500'
    },
    regulatedSubstancesWarning: '⚠️ 영국은 대마초가 불법 Class B 약물로 규정되어 있으며 소지 시 최대 5년의 징역형에 처해질 수 있습니다.',
    officialSource: '주영국대한민국대사관 / 영국 정부 포털(gov.uk)',
    sourceUrl: 'https://overseas.mofa.go.kr/gb-ko/index.do',
    lastVerifiedAt: '2026-03-01'
  },

  AU: {
    countryCode: 'AU',
    countryName: '호주',
    region: '오세아니아',
    flagEmoji: '🇦🇺',
    majorCities: ['시드니', '멜버른', '브리즈번', '골드코스트', '케언즈'],
    plugTypes: [
      { type: 'I', description: '사선 모양 3구 핀 (V자형 핀 + 접지핀)' }
    ],
    standardVoltage: '230V',
    standardFrequency: '50Hz',
    plugAdapterNeeded: true, // 호주 I형 어댑터 필수
    transformerNeeded: false,
    electricalGuidance: '호주는 사선 2개와 접지 핀 1개로 이루어진 "I형 플러그"를 사용합니다. 한국 플러그(C/F형)는 호환되지 않으므로 I형 변환 어댑터가 필수입니다. 콘센트마다 전원 스위치가 부착되어 있습니다.',
    visaInfo: {
      requirement: '호주 전자여행허가(ETA) 사전 승인 필수 (스마트폰 AustralianETA 앱으로 직접 신청)',
      passportValidity: '호주 입국 및 체류 기간 동안 유효한 전자여권',
      digitalDeclaration: '기내에서 작성하는 입국신고서(IPC)에 음식물, 의약품 반입 여부 정직하게 체크 필수',
      officialSiteUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601'
    },
    connectivityTips: {
      esimSupported: 'Telstra, Optus eSIM 지원',
      recommendedOption: 'Telstra 커버리지 우수 eSIM',
      tips: [
        '광활한 대륙 특성상 도시간 장거리 이동이나 국립공원 방문 시 오프라인 지도 필수'
      ]
    },
    paymentTips: {
      currency: '호주 달러 (AUD)',
      currencySymbol: 'A$',
      cardAcceptanceRate: '매우 높음',
      tipCulture: '팁 문화 기본적으로 없음',
      exchangeTips: '트래블카드 또는 컨택리스 카드로 99% 결제 가능'
    },
    culturalTips: [
      '차량 좌측통행(운전석 우측)입니다. 횡단보도를 건널 때 버튼을 눌러야 신호가 바뀝니다.'
    ],
    safetyTips: [
      '🚨 【생태계 및 생물 검역 세계 최강국】: 호주는 고유 생태계 보호를 위해 육류, 생과일, 채소, 씨앗류 반입을 극도로 엄격히 금지합니다. 라면, 한약, 가공식품이라도 조금이라도 의심되는 모든 식품은 입국신고서에 "YES(신고)"를 체크해야 합니다. 미신고 적발 시 즉시 압수 및 최대 A$6,000(약 500만원 이상)의 현장 과태료가 부과되거나 비자가 취소되어 추방될 수 있습니다.',
      '호주의 자외선 지수는 한국의 수배에 달해 피부암 발생률이 세계 최고 수준입니다. 선크림(SPF 50+ Broad Spectrum), 선글라스, 모자는 필수 생존용품입니다.'
    ],
    emergencyContacts: {
      police: '000',
      ambulance: '000',
      consularCallCenter: '+82-2-3210-0404',
      localEmbassyNote: '주호주 대한민국 대사관(캔버라): +61-2-6270-4100 / 시드니 총영사관: +61-2-9210-0200'
    },
    regulatedSubstancesWarning: '⚠️ 호주 연방법상 허가받지 않은 마약 및 규제약물 밀반입은 최대 무기징역까지 선고될 수 있는 중범죄입니다.',
    officialSource: '주호주대한민국대사관 / 호주 이민성(Home Affairs)',
    sourceUrl: 'https://overseas.mofa.go.kr/au-ko/index.do',
    lastVerifiedAt: '2026-03-01'
  }
};

export function getCountryGuide(code: string): CountryGuide | undefined {
  if (COUNTRY_GUIDES[code]) return COUNTRY_GUIDES[code];
  // 매칭되는 기본 데이터가 없는 경우 유사 지역 또는 범용 템플릿 반환
  return undefined;
}
