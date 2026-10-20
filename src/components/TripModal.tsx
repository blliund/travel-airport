import React, { useState, useEffect } from 'react';
import type { Trip, Region, TravelPurpose, TravelStyle, AccommodationType, LuggageType } from '../types';
import { REGIONS_DATA, ALL_COUNTRIES } from '../data/regionsAndCountries';
import { X, Calendar, Globe, MapPin, Users, Luggage, Hotel } from 'lucide-react';

interface TripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tripData: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editingTrip?: Trip;
}

export const TripModal: React.FC<TripModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTrip
}) => {
  const [name, setName] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region>('동아시아');
  const [countryCode, setCountryCode] = useState('JP');
  const [city, setCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [companionsCount, setCompanionsCount] = useState(1);
  const [travelPurpose, setTravelPurpose] = useState<TravelPurpose>('관광');
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('도시형');
  const [accommodation, setAccommodation] = useState<AccommodationType>('호텔/리조트');
  const [luggageType, setLuggageType] = useState<LuggageType>('위탁 수하물 포함 (20~23kg)');
  const [personalNotes, setPersonalNotes] = useState('');

  // 편집 모드 또는 생성 모드 초기화
  useEffect(() => {
    if (editingTrip) {
      setName(editingTrip.name);
      setSelectedRegion(editingTrip.region);
      setCountryCode(editingTrip.countryCode);
      setCity(editingTrip.city);
      setDepartureDate(editingTrip.departureDate);
      setReturnDate(editingTrip.returnDate);
      setCompanionsCount(editingTrip.companionsCount);
      setTravelPurpose(editingTrip.travelPurpose);
      setTravelStyle(editingTrip.travelStyle);
      setAccommodation(editingTrip.accommodation);
      setLuggageType(editingTrip.luggageType);
      setPersonalNotes(editingTrip.personalNotes || '');
    } else {
      setName('나의 설레는 해외여행');
      setSelectedRegion('동아시아');
      setCountryCode('JP');
      setCity('도쿄 (대도시·쇼핑·도보)');
      const today = new Date();
      const dep = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
      const ret = new Date(today.getTime() + 18 * 24 * 60 * 60 * 1000);
      setDepartureDate(dep.toISOString().split('T')[0]);
      setReturnDate(ret.toISOString().split('T')[0]);
      setCompanionsCount(1);
      setTravelPurpose('관광');
      setTravelStyle('도시형');
      setAccommodation('호텔/리조트');
      setLuggageType('위탁 수하물 포함 (20~23kg)');
      setPersonalNotes('');
    }
  }, [editingTrip, isOpen]);

  // 대륙 변경 시 국가 및 도시 목록 갱신
  const currentRegionData = REGIONS_DATA.find(r => r.region === selectedRegion);
  const availableCountries = currentRegionData ? currentRegionData.countries : ALL_COUNTRIES;
  const currentCountry = availableCountries.find(c => c.code === countryCode) || availableCountries[0];
  const availableCities = currentCountry ? currentCountry.cities : [];

  const handleRegionChange = (newRegion: Region) => {
    setSelectedRegion(newRegion);
    const reg = REGIONS_DATA.find(r => r.region === newRegion);
    if (reg && reg.countries.length > 0) {
      const firstCountry = reg.countries[0];
      setCountryCode(firstCountry.code);
      if (firstCountry.cities.length > 0) {
        setCity(firstCountry.cities[0].name);
      }
    }
  };

  const handleCountryChange = (newCode: string) => {
    setCountryCode(newCode);
    const c = availableCountries.find(x => x.code === newCode);
    if (c && c.cities.length > 0) {
      setCity(c.cities[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('여행 이름을 입력해주세요.');
      return;
    }
    if (!departureDate || !returnDate) {
      alert('출발일과 귀국일을 입력해주세요.');
      return;
    }
    if (returnDate < departureDate) {
      alert('귀국일은 출발일보다 빠를 수 없습니다.');
      return;
    }

    const countryObj = ALL_COUNTRIES.find(c => c.code === countryCode);
    const countryName = countryObj ? countryObj.name : '해외';

    onSave({
      name: name.trim(),
      region: selectedRegion,
      countryCode,
      countryName,
      city: city || '주요 도시',
      departureDate,
      returnDate,
      companionsCount: Math.max(1, companionsCount),
      travelPurpose,
      travelStyle,
      accommodation,
      luggageType,
      personalNotes: personalNotes.trim()
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {editingTrip ? '✈️ 여행 정보 수정' : '✈️ 새 해외여행 등록'}
          </h3>
          <button onClick={onClose} className="btn-icon" style={{ border: 'none' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* 여행 이름 */}
            <div className="form-group">
              <label className="form-label">여행 이름</label>
              <input
                type="text"
                className="form-input"
                placeholder="예: 도쿄 3박 4일 미식 탐방, 방콕 휴양 여행"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* 대륙 및 국가 선택 */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Globe size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  대륙 / 지역 분류
                </label>
                <select
                  className="form-select"
                  value={selectedRegion}
                  onChange={(e) => handleRegionChange(e.target.value as Region)}
                >
                  {REGIONS_DATA.map(r => (
                    <option key={r.region} value={r.region}>{r.region}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">목적지 국가</label>
                <select
                  className="form-select"
                  value={countryCode}
                  onChange={(e) => handleCountryChange(e.target.value)}
                >
                  {availableCountries.map(c => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 도시 선택 (선택적) */}
            <div className="form-group">
              <label className="form-label">
                <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
                방문 도시 또는 지역 특성
              </label>
              {availableCities.length > 0 ? (
                <select
                  className="form-select"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  {availableCities.map(ct => (
                    <option key={ct.name} value={ct.name}>
                      {ct.name} ({ct.characteristics})
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="form-input"
                  placeholder="도시명을 직접 입력하세요"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              )}
            </div>

            {/* 출발일 및 귀국일 */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  출발일
                </label>
                <input
                  type="date"
                  className="form-input"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">귀국일</label>
                <input
                  type="date"
                  className="form-input"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* 여행 목적 및 스타일 */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">여행 목적</label>
                <select
                  className="form-select"
                  value={travelPurpose}
                  onChange={(e) => setTravelPurpose(e.target.value as TravelPurpose)}
                >
                  <option value="관광">관광 (명소/박물관)</option>
                  <option value="휴양">휴양 (리조트/힐링)</option>
                  <option value="출장">출장 (비즈니스/학회)</option>
                  <option value="배낭여행">배낭여행 (자유여행)</option>
                  <option value="캠핑">캠핑 (아웃도어)</option>
                  <option value="쇼핑">쇼핑·미식</option>
                  <option value="가족여행">가족여행</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">여행 스타일</label>
                <select
                  className="form-select"
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value as TravelStyle)}
                >
                  <option value="도시형">도시형 (대중교통/도보)</option>
                  <option value="해변·휴양형">해변·휴양형 (수영/해양레저)</option>
                  <option value="자연·트레킹형">자연·트레킹형 (산악/하이킹)</option>
                  <option value="쇼핑·미식형">쇼핑·미식형</option>
                  <option value="액티비티형">액티비티형 (스포츠/체험)</option>
                </select>
              </div>
            </div>

            {/* 인원, 숙소 및 수하물 유형 */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Users size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  동행 인원 (본인 포함)
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  className="form-input"
                  value={companionsCount}
                  onChange={(e) => setCompanionsCount(Number(e.target.value) || 1)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Hotel size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  숙소 형태
                </label>
                <select
                  className="form-select"
                  value={accommodation}
                  onChange={(e) => setAccommodation(e.target.value as AccommodationType)}
                >
                  <option value="호텔/리조트">호텔/리조트</option>
                  <option value="에어비앤비/레지던스">에어비앤비/레지던스</option>
                  <option value="게스트하우스/호스텔">게스트하우스/호스텔</option>
                  <option value="캠핑/카라반">캠핑/카라반</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Luggage size={14} style={{ display: 'inline', marginRight: '4px' }} />
                수하물 유형
              </label>
              <select
                className="form-select"
                value={luggageType}
                onChange={(e) => setLuggageType(e.target.value as LuggageType)}
              >
                <option value="위탁 수하물 포함 (20~23kg)">위탁 수하물 포함 (일반 20~23kg 캐리어)</option>
                <option value="기내용 캐리어만 (10kg 이하)">기내용 캐리어만 (수하물 위탁 없음, 10kg 이하)</option>
                <option value="배낭 / 백팩 위주">배낭 / 백팩 위주 (가벼운 패킹)</option>
              </select>
            </div>

            {/* 메모 */}
            <div className="form-group">
              <label className="form-label">개인 여행 메모 (선택)</label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="예: 렌터카 예약 완료, 비건 식당 방문 예정 등"
                value={personalNotes}
                onChange={(e) => setPersonalNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-secondary">
              취소
            </button>
            <button type="submit" className="btn-primary">
              {editingTrip ? '수정 내용 저장' : '새 여행 생성 & 맞춤 준비물 생성'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
