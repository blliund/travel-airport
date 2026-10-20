import React from 'react';
import { useTripContext } from '../context/TripContext';
import { getCountryGuide } from '../data/countryGuides';
import { 
  Zap, 
  FileText, 
  Wifi, 
  CreditCard, 
  HeartHandshake, 
  PhoneCall, 
  ExternalLink,
  AlertOctagon,
  HelpCircle
} from 'lucide-react';

export const CountryGuideView: React.FC = () => {
  const { activeTrip } = useTripContext();

  if (!activeTrip) {
    return <div>선택된 여행이 없습니다.</div>;
  }

  const guide = getCountryGuide(activeTrip.countryCode);

  if (!guide) {
    return (
      <div 
        style={{ 
          padding: '2.5rem', 
          background: '#ffffff', 
          borderRadius: 'var(--radius-lg)', 
          textAlign: 'center',
          border: '1px solid var(--border-color)' 
        }}
      >
        <HelpCircle size={40} style={{ color: 'var(--text-subtle)', marginBottom: '0.75rem' }} />
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          {activeTrip.countryName} 상세 가이드 준비 중
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          선택하신 여행 국가({activeTrip.countryName})의 최신 공식 출입국 정보 및 전압 규격을 검증 중입니다.
          외교부 해외안전여행 포털(0404.go.kr)에서 최신 국가 정보를 확인하실 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 가이드 헤더 배너 */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '1.75rem' }}>{guide.flagEmoji}</span>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>{guide.countryName} 실용 여행 가이드</h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#e0f2fe' }}>
            {guide.region} · 주요 도시: {guide.majorCities.join(', ')}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <a
            href={guide.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ 
              background: 'rgba(255, 255, 255, 0.2)', 
              borderColor: 'rgba(255, 255, 255, 0.4)', 
              color: '#ffffff',
              fontSize: '0.825rem'
            }}
          >
            대사관 공식 공지 <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* 대마 등 규제 물질 주의 경고 배너 */}
      <div 
        style={{
          background: '#fff1f2',
          border: '2px solid #f43f5e',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#be123c' }}>
          <AlertOctagon size={24} style={{ flexShrink: 0 }} />
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>
            🚨 해외 대마초(마리화나/CBD) 및 규제 물질 엄중 주의 안내
          </h4>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#881337', lineHeight: 1.55 }}>
          {guide.regulatedSubstancesWarning}
        </p>
        <div style={{ fontSize: '0.78rem', color: '#9f1239', fontWeight: 600 }}>
          * 대한민국 형법 제3조(속인주의): "본법은 대한민국영역외에서 죄를 범한 내국인에게 적용한다."
        </div>
      </div>

      {/* 가이드 콘텐츠 2열 그리드 */}
      <div className="country-guide-grid">
        {/* 1. 전기 콘센트 및 전압 호환성 */}
        <div className="card">
          <div className="card-header-row">
            <span className="card-title">
              <Zap size={20} style={{ color: '#eab308' }} />
              전기 규격 & 플러그 호환성
            </span>
            <span 
              className={`status-badge ${guide.plugAdapterNeeded ? 'conditional' : 'allowed'}`}
            >
              {guide.plugAdapterNeeded ? '돼지코 어댑터 필요' : '한국 플러그 직접 호환'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>표준 전압: </span>
                <strong>{guide.standardVoltage}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>주파수: </span>
                <strong>{guide.standardFrequency}</strong>
              </div>
            </div>

            {/* 플러그 도식 UI */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-subtle)' }}>
                사용 중인 콘센트 모양 ({guide.plugTypes.length}종):
              </span>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {guide.plugTypes.map((plug) => (
                  <div key={plug.type} className="plug-diagram-box" style={{ flex: '1 1 180px' }}>
                    <div className="plug-illustration">
                      {plug.type}형
                    </div>
                    <div style={{ fontSize: '0.825rem' }}>
                      <strong style={{ display: 'block', color: 'var(--color-primary-dark)' }}>
                        Type {plug.type} 플러그
                      </strong>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                        {plug.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p style={{ fontSize: '0.825rem', color: 'var(--text-main)', lineHeight: 1.5, background: '#f8fafc', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              💡 {guide.electricalGuidance}
            </p>
          </div>
        </div>

        {/* 2. 입국 요건 및 비자 서류 */}
        <div className="card">
          <div className="card-header-row">
            <span className="card-title">
              <FileText size={20} style={{ color: '#0284c7' }} />
              입국 요건 & 전자 신고
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <div style={{ padding: '0.65rem', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>비자 요건</span>
              <strong style={{ color: 'var(--color-primary-dark)' }}>{guide.visaInfo.requirement}</strong>
            </div>

            <div style={{ padding: '0.65rem', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>여권 잔여 유효기간</span>
              <strong>{guide.visaInfo.passportValidity}</strong>
            </div>

            <div style={{ padding: '0.65rem', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>사전 온라인 신고서</span>
              <span>{guide.visaInfo.digitalDeclaration}</span>
            </div>

            <a
              href={guide.visaInfo.officialSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="official-link"
              style={{ fontSize: '0.825rem', alignSelf: 'flex-start' }}
            >
              공식 출입국/신고 포털 이동 <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* 3. 통신, 지도 및 교통 */}
        <div className="card">
          <div className="card-header-row">
            <span className="card-title">
              <Wifi size={20} style={{ color: '#0d9488' }} />
              현지 통신 & 모바일 이용
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>eSIM 지원 여부: </span>
              <strong>{guide.connectivityTips.esimSupported}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>추천 통신 옵션: </span>
              <span style={{ color: 'var(--color-secondary)', fontWeight: 700 }}>
                {guide.connectivityTips.recommendedOption}
              </span>
            </div>
            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {guide.connectivityTips.tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4. 결제, 환전 및 팁 문화 */}
        <div className="card">
          <div className="card-header-row">
            <span className="card-title">
              <CreditCard size={20} style={{ color: '#8b5cf6' }} />
              통화, 결제 & 팁 문화
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.55rem', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)' }}>
              <span>통화: <strong>{guide.paymentTips.currency} ({guide.paymentTips.currencySymbol})</strong></span>
              <span>카드 수용도: <strong style={{ color: 'var(--color-primary-light)' }}>{guide.paymentTips.cardAcceptanceRate}</strong></span>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-subtle)' }}>팁 문화</strong>
              <p style={{ color: 'var(--text-main)', fontSize: '0.825rem' }}>{guide.paymentTips.tipCulture}</p>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-subtle)' }}>환전 및 결제 팁</strong>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>{guide.paymentTips.exchangeTips}</p>
            </div>
          </div>
        </div>

        {/* 5. 문화, 에티켓 및 안전 수칙 */}
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <div className="card-header-row">
            <span className="card-title">
              <HeartHandshake size={20} style={{ color: '#ec4899' }} />
              현지 필수 에티켓 & 안전 주의사항
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div>
              <h5 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-primary-dark)' }}>
                문화 및 예절
              </h5>
              <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.825rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {guide.culturalTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>

            <div>
              <h5 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.5rem', color: '#b91c1c' }}>
                소매치기 예방 & 안전 가이드
              </h5>
              <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.825rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {guide.safetyTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 긴급 연락처 */}
          <div 
            style={{ 
              marginTop: '1rem', 
              paddingTop: '0.85rem', 
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              fontSize: '0.825rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                <PhoneCall size={14} style={{ color: '#ef4444' }} /> 현지 경찰: {guide.emergencyContacts.police}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                구급차: {guide.emergencyContacts.ambulance}
              </span>
              <span style={{ color: '#0369a1' }}>
                외교부 영사콜센터: {guide.emergencyContacts.consularCallCenter}
              </span>
            </div>
            {guide.emergencyContacts.localEmbassyNote && (
              <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
                {guide.emergencyContacts.localEmbassyNote}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
