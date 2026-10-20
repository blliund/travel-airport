import React from 'react';
import type { Trip } from '../types';
import { calculateTripDurationDays } from '../utils/recommendations';
import { Calendar, MapPin, Users, Luggage, Edit3, Compass } from 'lucide-react';

interface HeroOverviewProps {
  trip: Trip;
  onEditTrip: () => void;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({ trip, onEditTrip }) => {
  const days = calculateTripDurationDays(trip.departureDate, trip.returnDate);
  const nights = Math.max(0, days - 1);

  // D-Day 계산
  const getDDay = (depDateStr: string) => {
    if (!depDateStr) return 'D-Day';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dep = new Date(depDateStr);
    dep.setHours(0, 0, 0, 0);
    const diffTime = dep.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'D-Day';
    if (diffDays > 0) return `D-${diffDays}`;
    return `D+${Math.abs(diffDays)}`;
  };

  const dDayText = getDDay(trip.departureDate);

  return (
    <section className="trip-overview-card" aria-label="선택된 여행 요약 정보">
      <div className="trip-hero-header">
        <div className="trip-hero-title-area">
          <div className="trip-hero-tags">
            <span className="badge-tag">
              <Compass size={12} /> {trip.region}
            </span>
            <span className="badge-tag">{trip.travelPurpose}</span>
            <span className="badge-tag">{trip.travelStyle}</span>
          </div>
          <h2 className="trip-hero-name">{trip.name}</h2>
          <div className="trip-hero-dest">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
              <MapPin size={16} /> {trip.countryName} · {trip.city}
            </span>
            <span style={{ opacity: 0.8 }}>|</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={15} /> {trip.departureDate} ~ {trip.returnDate} ({nights}박 {days}일)
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div className="trip-hero-dday-badge">
            <span>{dDayText}</span>
            <span className="dday-sub">
              {dDayText === 'D-Day' ? '출국 당일' : dDayText.startsWith('D-') ? '출국 대기' : '여행 진행/완료'}
            </span>
          </div>
          <button
            onClick={onEditTrip}
            className="btn-secondary"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              backdropFilter: 'blur(4px)'
            }}
            title="여행 기본 정보 수정"
          >
            <Edit3 size={15} />
            <span>수정</span>
          </button>
        </div>
      </div>

      <div className="trip-hero-meta-grid">
        <div className="meta-item">
          <span className="meta-label">동행 인원</span>
          <span className="meta-val" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Users size={14} /> {trip.companionsCount}명
          </span>
        </div>
        <div className="meta-item">
          <span className="meta-label">수하물 유형</span>
          <span className="meta-val" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Luggage size={14} /> {trip.luggageType}
          </span>
        </div>
        <div className="meta-item">
          <span className="meta-label">숙소 형태</span>
          <span className="meta-val">{trip.accommodation}</span>
        </div>
        {trip.personalNotes && (
          <div className="meta-item" style={{ gridColumn: '1 / -1' }}>
            <span className="meta-label">여행 메모</span>
            <span className="meta-val" style={{ fontWeight: 400, fontSize: '0.825rem' }}>
              {trip.personalNotes}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
