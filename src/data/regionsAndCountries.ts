import type { Region } from '../types';

export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  region: Region;
  cities: {
    name: string;
    characteristics: string; // 대도시, 휴양지, 한랭지 등
    seasonNotes?: string;
  }[];
}

export const REGIONS_DATA: { region: Region; description: string; countries: CountryInfo[] }[] = [
  {
    region: '동아시아',
    description: '가까운 비행시간, 대중교통 중심 및 사계절 뚜렷한 인기 여행지',
    countries: [
      {
        code: 'JP',
        name: '일본',
        flag: '🇯🇵',
        region: '동아시아',
        cities: [
          { name: '도쿄 (대도시·쇼핑·도보)', characteristics: '대도시/도보 위주/카드·QR 대중화' },
          { name: '오사카·교토 (미식·전통문화)', characteristics: '역사 관광/도보 위주' },
          { name: '후쿠오카·유후인 (온천·단거리)', characteristics: '휴양/온천/근거리' },
          { name: '홋카이도·삿포로 (한랭·설경)', characteristics: '겨울 방한 필수/렌터카 눈길 주의' },
          { name: '오키나와 (아열대·해변·드라이브)', characteristics: '아열대/해변/렌터카 중심' }
        ]
      },
      {
        code: 'TW',
        name: '대만',
        flag: '🇹🇼',
        region: '동아시아',
        cities: [
          { name: '타이베이 (대도시·야시장)', characteristics: '도시 관광/이지카드 대중교통/우천 대비' },
          { name: '가오슝·타이난 (남부·역사)', characteristics: '온난한 기후/문화 관광' },
          { name: '화롄 (자연·협곡)', characteristics: '자연 관광/편한 운동화' }
        ]
      },
      {
        code: 'HK',
        name: '홍콩·마카오',
        flag: '🇭🇰',
        region: '동아시아',
        cities: [
          { name: '홍콩 (도시·야경·쇼핑)', characteristics: '대중교통 중심/영국식 G형 플러그/에어컨 강함' },
          { name: '마카오 (역사·엔터테인먼트)', characteristics: '도보 및 셔틀버스 이동/홍콩달러 통용' }
        ]
      },
      {
        code: 'CN',
        name: '중국',
        flag: '🇨🇳',
        region: '동아시아',
        cities: [
          { name: '상하이 (현대 대도시)', characteristics: '모바일 결제(알리페이/위챗페이 필수)/로밍 필수' },
          { name: '베이징 (역사 수도)', characteristics: '도보 많음/건조 기후/모바일 결제 필수' },
          { name: '장자제(장가계) (산악 자연)', characteristics: '트레킹/날씨 변화 대비' },
          { name: '하이난 (열대 휴양지)', characteristics: '해변/휴양/자외선 차단' }
        ]
      }
    ]
  },
  {
    region: '동남아시아',
    description: '열대 기후, 가성비 휴양지, 우기/건기 및 해변 활동',
    countries: [
      {
        code: 'TH',
        name: '태국',
        flag: '🇹🇭',
        region: '동남아시아',
        cities: [
          { name: '방콕 (대도시·미식·야시장)', characteristics: '대도시/더위 대비/사원 방문 시 복장 규정' },
          { name: '푸껫·끄라비 (해변·해양 액티비티)', characteristics: '해변/수영/방수 파우치 필수' },
          { name: '치앙마이 (북부·카페·자연)', characteristics: '문화/한 달 살기/모기 기피제' },
          { name: '파타야 (근교 해양휴양)', characteristics: '해변/액티비티' }
        ]
      },
      {
        code: 'VN',
        name: '베트남',
        flag: '🇻🇳',
        region: '동남아시아',
        cities: [
          { name: '다낭·호이안 (중부·해변·휴양)', characteristics: '가족 휴양/해변/그랩(Grab) 앱 필수' },
          { name: '하노이·사파 (북부·역사·고산)', characteristics: '북부 사계절/겨울 쌀쌀/트레킹' },
          { name: '나트랑·푸꾸옥 (남부 해변 휴양)', characteristics: '연중 따뜻/해양 레포츠/리조트' },
          { name: '호찌민 (남부 경제수도)', characteristics: '대도시/오토바이 교통 주의/카페 문화' }
        ]
      },
      {
        code: 'PH',
        name: '필리핀',
        flag: '🇵🇭',
        region: '동남아시아',
        cities: [
          { name: '세부·보홀 (호핑·다이빙 휴양)', characteristics: '해양 액티비티/방수팩/eTravel 필수' },
          { name: '보라카이 (세계적 화이트비치)', characteristics: '해변 산책/친환경 규정 준수' },
          { name: '마닐라 (대도시)', characteristics: '도심 이동/치안 주의/그랩 이용 권장' }
        ]
      },
      {
        code: 'ID',
        name: '인도네시아',
        flag: '🇮🇩',
        region: '동남아시아',
        cities: [
          { name: '발리·롬복 (서핑·힐링 리조트)', characteristics: '도착비자(VoA)/관광세/서핑·스쿠터/C,F형 플러그' },
          { name: '자카르타 (대도시)', characteristics: '비즈니스/교통 체증' }
        ]
      },
      {
        code: 'SG',
        name: '싱가포르',
        flag: '🇸🇬',
        region: '동남아시아',
        cities: [
          { name: '싱가포르 전역 (친환경 스마트 시티)', characteristics: '엄격한 법률(껌 반입금지, 무단횡단 벌금)/G형 플러그/SG입국카드' }
        ]
      },
      {
        code: 'MY',
        name: '말레이시아',
        flag: '🇲🇾',
        region: '동남아시아',
        cities: [
          { name: '쿠알라룸푸르 (도심·쇼핑)', characteristics: 'G형 플러그/MDAC 입국신고서/다문화' },
          { name: '코타키나발루 (석양·반딧불이 투어)', characteristics: '자연 휴양/모기 기피제/방수팩' }
        ]
      },
      {
        code: 'KH_LA',
        name: '캄보디아·라오스',
        flag: '🇰🇭',
        region: '동남아시아',
        cities: [
          { name: '씨엠립 (앙코르와트 역사유적)', characteristics: '유적 탐방/걷기 편한 신발/사원 복장 준수' },
          { name: '방비엥·루앙프라방 (액티비티·자연)', characteristics: '액티비티/현금 위주' }
        ]
      }
    ]
  },
  {
    region: '남아시아 및 중앙아시아',
    description: '고온·고산 기후, 풍부한 역사 종교 유적, 장거리 이동',
    countries: [
      {
        code: 'IN',
        name: '인도·스리랑카·네팔',
        flag: '🇮🇳',
        region: '남아시아 및 중앙아시아',
        cities: [
          { name: '뉴델리·골든트라이앵글 (문화·역사)', characteristics: '식수 주의(생수만 음용)/상비약 필수/종교 복장' },
          { name: '네팔 카트만두·포카라 (히말라야 트레킹)', characteristics: '고산 대비/보온 방한 장비/전문 트레킹화' }
        ]
      },
      {
        code: 'UZ',
        name: '우즈베키스탄·카자흐스탄',
        flag: '🇺🇿',
        region: '남아시아 및 중앙아시아',
        cities: [
          { name: '타슈켄트·사마르칸트 (실크로드 유적)', characteristics: '건조 기후/일교차 큼/보습제/현금(숨/텡게) 준비' },
          { name: '알마티 (자연 호수·설산)', characteristics: '대자연/일교차 주의' }
        ]
      }
    ]
  },
  {
    region: '서유럽',
    description: '문화예술의 중심지, 솅겐 조약 국가, 소매치기 주의 및 도보 여행',
    countries: [
      {
        code: 'FR',
        name: '프랑스',
        flag: '🇫🇷',
        region: '서유럽',
        cities: [
          { name: '파리 (박물관·패션·미식)', characteristics: '많이 걷기/지하철 소매치기 주의/복수 카드 준비' },
          { name: '니스·남프랑스 (지중해 해변)', characteristics: '지중해 기후/선글라스/렌터카' }
        ]
      },
      {
        code: 'DE',
        name: '독일',
        flag: '🇩🇪',
        region: '서유럽',
        cities: [
          { name: '베를린·프랑크푸르트 (역사·비즈니스)', characteristics: '대중교통 티켓 펀칭 필수/일요일 상점 휴무' },
          { name: '뮌헨 (바이에른·맥주 축제)', characteristics: '남부 문화/알프스 근교' }
        ]
      },
      {
        code: 'NL_BE',
        name: '네덜란드·벨기에',
        flag: '🇳🇱',
        region: '서유럽',
        cities: [
          { name: '암스테르담 (운하·자전거)', characteristics: '자전거 도로 주의/비 자주 옴(우산 필수)/규제물질 주의' },
          { name: '브뤼셀·브뤼헤 (초콜릿·고딕 양식)', characteristics: '돌바닥 운동화 필수/미식' }
        ]
      },
      {
        code: 'CH',
        name: '스위스',
        flag: '🇨🇭',
        region: '서유럽',
        cities: [
          { name: '인터라켄·융프라우 (알프스 고산)', characteristics: 'J형 플러그(3구)/스위스패스/방한복/물가 높음' },
          { name: '취리히·루체른 (호수 도시)', characteristics: '친환경 교통/하이킹' }
        ]
      }
    ]
  },
  {
    region: '남유럽',
    description: '온화한 지중해성 기후, 고대 유적, 일조량 풍부 및 소매치기 예방 필수',
    countries: [
      {
        code: 'IT',
        name: '이탈리아',
        flag: '🇮🇹',
        region: '남유럽',
        cities: [
          { name: '로마·바티칸 (고대 유적·종교)', characteristics: '돌바닥 도보 많음/바티칸 복장 단속/소매치기 주의' },
          { name: '피렌체·베네치아 (르네상스·수상도시)', characteristics: '도보 중심/케리어 이동 대비/수상버스' },
          { name: '아말피·남부 (해안 절경)', characteristics: '렌터카 또는 페리 이동/자외선 차단' }
        ]
      },
      {
        code: 'ES',
        name: '스페인',
        flag: '🇪🇸',
        region: '남유럽',
        cities: [
          { name: '바르셀로나 (가우디 건축·해변)', characteristics: '소매치기 각별 주의/시에스타/늦은 저녁 식사' },
          { name: '마드리드 (수도·미술관)', characteristics: '대도시/도보 위주/기차 이동' },
          { name: '세비야·그라나다 (안달루시아 플라멩코)', characteristics: '여름 극심한 고온/모자·선크림 필수' }
        ]
      },
      {
        code: 'PT',
        name: '포르투갈',
        flag: '🇵🇹',
        region: '남유럽',
        cities: [
          { name: '리스본·포르투 (언덕·트램·와인)', characteristics: '가파른 돌 언덕길(미끄럼 방지 운동화)/가성비' }
        ]
      },
      {
        code: 'GR',
        name: '그리스',
        flag: '🇬🇷',
        region: '남유럽',
        cities: [
          { name: '아테네·산토리니 (고대 신전·에게해 섬)', characteristics: '여름 강한 햇빛/페리 이동/백색 마을' }
        ]
      }
    ]
  },
  {
    region: '북유럽',
    description: '청정 대자연, 오로라, 높은 카드 사용률(현금 거의 불필요), 방한 준비',
    countries: [
      {
        code: 'NO_SE_FI',
        name: '노르웨이·스웨덴·핀란드',
        flag: '🇸🇪',
        region: '북유럽',
        cities: [
          { name: '스톡홀름·헬싱키 (디자인 도시)', characteristics: '100% 카드 결제/깔끔한 교통/방풍 의류' },
          { name: '오슬로·피오르드 (대자연 탐방)', characteristics: '피오르드 투어/고어텍스 방수 의류 필수' },
          { name: '로바니에미 (산타마을·오로라)', characteristics: '극저온 방한구/방한화/핫팩/카메라 여분 배터리' }
        ]
      },
      {
        code: 'IS',
        name: '아이슬란드',
        flag: '🇮🇸',
        region: '북유럽',
        cities: [
          { name: '레이캬비크·골든서클 (빙하·화산·온천)', characteristics: '링로드 렌터카/강풍·우천 방수외투 필수/수영복' }
        ]
      }
    ]
  },
  {
    region: '동유럽 및 중부유럽',
    description: '동화 같은 중세 거리, 클래식 음악, 맥주 문화 및 가성비 여행지',
    countries: [
      {
        code: 'CZ',
        name: '체코',
        flag: '🇨🇿',
        region: '동유럽 및 중부유럽',
        cities: [
          { name: '프라하·체스키크롬로프 (구시가지·야경)', characteristics: '체코 코루나(CZK)/돌바닥/도보 관광' }
        ]
      },
      {
        code: 'AT',
        name: '오스트리아',
        flag: '🇦🇹',
        region: '동유럽 및 중부유럽',
        cities: [
          { name: '비엔나·잘츠부르크 (음악·궁전·호수)', characteristics: '문화예술 공연 관람 복장/기차 여행' }
        ]
      },
      {
        code: 'HU',
        name: '헝가리',
        flag: '🇭🇺',
        region: '동유럽 및 중부유럽',
        cities: [
          { name: '부다페스트 (온천·국회의사당 야경)', characteristics: '포린트(HUF)/온천 수영복 준비/유람선' }
        ]
      }
    ]
  },
  {
    region: '영국·아일랜드',
    description: '영국식 3구 G형 플러그, 잦은 비와 변덕스러운 날씨, 좌측통행',
    countries: [
      {
        code: 'GB',
        name: '영국',
        flag: '🇬🇧',
        region: '영국·아일랜드',
        cities: [
          { name: '런던 (박물관·뮤지컬·쇼핑)', characteristics: 'G형 플러그 어댑터 필수/컨택리스 카드/접이식 우산' },
          { name: '에든버러 (스코틀랜드 고성·자연)', characteristics: '바람막이 외투 필수/가을·겨울 추위 대비' }
        ]
      },
      {
        code: 'IE',
        name: '아일랜드',
        flag: '🇮🇪',
        region: '영국·아일랜드',
        cities: [
          { name: '더블린 (펍 문화·문학)', characteristics: 'G형 플러그/유로화(EUR)/도보' }
        ]
      }
    ]
  },
  {
    region: '북미',
    description: '장거리 비행, 110~120V A/B형 플러그, 전자여행허가(ESTA/eTA) 필수',
    countries: [
      {
        code: 'US',
        name: '미국',
        flag: '🇺🇸',
        region: '북미',
        cities: [
          { name: '뉴욕 (동부 대도시·문화)', characteristics: 'ESTA 필수/110V 돼지코/도보 많음/팁 문화(18~22%)' },
          { name: '로스앤젤레스·샌프란시스코 (서부)', characteristics: '렌터카 국제면허/여름 일교차/선글라스' },
          { name: '하와이 (태평양 휴양지)', characteristics: '물놀이 장비/렌터카/산호초 보호 선크림' },
          { name: '라스베이거스·그랜드캐니언 (사막·국립공원)', characteristics: '건조 기후/수분 보충/장거리 운전 대비' }
        ]
      },
      {
        code: 'CA',
        name: '캐나다',
        flag: '🇨🇦',
        region: '북미',
        cities: [
          { name: '밴쿠버·토론토 (대도시·자연 조화)', characteristics: 'eTA 필수/110V 돼지코/팁 문화' },
          { name: '밴프·로키산맥 (국립공원 트레킹)', characteristics: '사계절 보온 의류/등산화/야생동물 주의' }
        ]
      }
    ]
  },
  {
    region: '중남미',
    description: '고산 지대, 광활한 자연 유적, 치안 유의 및 예방접종 확인',
    countries: [
      {
        code: 'MX',
        name: '멕시코',
        flag: '🇲🇽',
        region: '중남미',
        cities: [
          { name: '칸쿤 (카리브해 올인클루시브)', characteristics: '해변 휴양/수영복/자외선 차단/USD 통용' },
          { name: '멕시코시티 (수도·마야 역사)', characteristics: '고산지대(해발 2200m)/소매치기 주의' }
        ]
      },
      {
        code: 'PE',
        name: '페루',
        flag: '🇵🇪',
        region: '중남미',
        cities: [
          { name: '쿠스코·마추픽추 (잉카 고산 유적)', characteristics: '고산병 약 필수/따뜻한 겹쳐입기 옷/편한 등산화' }
        ]
      },
      {
        code: 'BR',
        name: '브라질',
        flag: '🇧🇷',
        region: '중남미',
        cities: [
          { name: '리우데자네이루·상파울루 (열정의 도시)', characteristics: '소지품 간소화/야간 이동 주의/황열병 백신' }
        ]
      }
    ]
  },
  {
    region: '오세아니아',
    description: '계절 반대(남반구), 독특한 생태계, 엄격한 생물 및 식품 검역',
    countries: [
      {
        code: 'AU',
        name: '호주',
        flag: '🇦🇺',
        region: '오세아니아',
        cities: [
          { name: '시드니·멜버른 (해안 대도시)', characteristics: 'ETA 비자/I형 삼각 플러그/엄격한 음식물 검역' },
          { name: '케언즈·골드코스트 (산호초·서핑)', characteristics: '강한 자외선(선크림 50+)/해양 레저' },
          { name: '울루루·아웃백 (붉은 사막)', characteristics: '파리망/충분한 식수/일교차 방한' }
        ]
      },
      {
        code: 'NZ',
        name: '뉴질랜드',
        flag: '🇳🇿',
        region: '오세아니아',
        cities: [
          { name: '오클랜드·퀸스타운 (캠퍼밴·빙하 호수)', characteristics: 'NZeTA/I형 플러그/트레킹화 세척 필수(생태계 보호)' }
        ]
      }
    ]
  },
  {
    region: '중동 및 아프리카',
    description: '종교적 문화 존중, 사막 기후와 실내 에어컨, 지역별 안전 수칙 준수',
    countries: [
      {
        code: 'AE',
        name: '아랍에미리트 (UAE)',
        flag: '🇦🇪',
        region: '중동 및 아프리카',
        cities: [
          { name: '두바이·아부다비 (현대 럭셔리 도시)', characteristics: 'G형 플러그/사원 방문 시 단정한 복장/주류 반입 제한' }
        ]
      },
      {
        code: 'TR',
        name: '튀르키예',
        flag: '🇹🇷',
        region: '중동 및 아프리카',
        cities: [
          { name: '이스탄불·카파도키아 (동서양 융합·열기구)', characteristics: '모스크 스카프 준비/C,F형 플러그/열기구 새벽 추위' }
        ]
      },
      {
        code: 'EG',
        name: '이집트',
        flag: '🇪🇬',
        region: '중동 및 아프리카',
        cities: [
          { name: '카이로·룩소르 (피라미드 고대 문명)', characteristics: '도착비자/더위 대비/호객꾼 주의/생수만 음용' }
        ]
      }
    ]
  }
];

export const ALL_COUNTRIES: CountryInfo[] = REGIONS_DATA.flatMap(r => r.countries);

export function getCountryByCode(code: string): CountryInfo | undefined {
  return ALL_COUNTRIES.find(c => c.code.toLowerCase() === code.toLowerCase());
}
