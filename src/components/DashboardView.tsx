import React from 'react';
import { useTripContext } from '../context/TripContext';
import { CHECKLIST_CATEGORIES } from '../utils/recommendations';
import { getCountryGuide } from '../data/countryGuides';
import type { NavTabId } from './Navigation';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  BatteryCharging, 
  Droplet,
  ExternalLink 
} from 'lucide-react';

interface DashboardViewProps {
  onNavigateTab: (tab: NavTabId) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigateTab }) => {
  const { activeTrip, items, timelineTasks } = useTripContext();

  if (!activeTrip) {
    return <div>선택된 여행이 없습니다.</div>;
  }

  const guide = getCountryGuide(activeTrip.countryCode);

  // 통계 계산
  const totalCount = items.length;
  const completedCount = items.filter(i => i.isCompleted).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const requiredItems = items.filter(i => i.isRequired);
  const pendingRequiredItems = requiredItems.filter(i => !i.isCompleted);

  // 미완료 타임라인 작업
  const pendingTimelineTasks = timelineTasks.filter(t => !t.isCompleted);
  const nextTask = pendingTimelineTasks[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* 긴급 알림 배너 (필수 준비물 미완료 시) */}
      {pendingRequiredItems.length > 0 ? (
        <div 
          style={{
            background: '#fff1f2',
            border: '1px solid #fecdd3',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
            <AlertTriangle className="text-danger" size={24} style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontWeight: 700, color: '#9f1239', fontSize: '0.95rem' }}>
                출국 전 필수 준비물이 아직 {pendingRequiredItems.length}개 남아있습니다!
              </h4>
              <p style={{ fontSize: '0.825rem', color: '#be123c' }}>
                여권, 항공권 e-티켓, 어댑터 등 미완료 항목을 즉시 확인하고 챙기세요.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('checklist')}
            className="btn-primary"
            style={{ background: '#e11d48', whiteSpace: 'nowrap' }}
          >
            필수 항목 보기 <ArrowRight size={14} />
          </button>
        </div>
      ) : (
        <div 
          style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <CheckCircle2 className="text-success" size={24} />
          <div>
            <h4 style={{ fontWeight: 700, color: '#065f46', fontSize: '0.95rem' }}>
              모든 필수 준비물 확인 완료!
            </h4>
            <p style={{ fontSize: '0.825rem', color: '#047857' }}>
              주요 필수 품목이 모두 준비되었습니다. 세부 짐 싸기를 마무리하세요.
            </p>
          </div>
        </div>
      )}

      {/* 대시보드 메트릭 카드 그리드 */}
      <div className="dashboard-grid">
        {/* 카드 1: 준비물 총 달성률 */}
        <div className="card">
          <div className="card-header-row">
            <span className="card-title">
              <CheckCircle2 size={18} className="text-success" />
              준비물 패킹 달성률
            </span>
            <button
              onClick={() => onNavigateTab('checklist')}
              style={{ fontSize: '0.8rem', color: 'var(--color-primary-light)', fontWeight: 600 }}
            >
              상세보기
            </button>
          </div>

          <div className="progress-container">
            <div className="progress-header">
              <span style={{ color: 'var(--text-muted)' }}>
                {completedCount} / {totalCount}개 챙김 완료
              </span>
              <span className="progress-percentage">{progressPercent}%</span>
            </div>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
            <span>필수 준비물: {requiredItems.length - pendingRequiredItems.length}/{requiredItems.length}</span>
            <span>일반 품목: {completedCount - (requiredItems.length - pendingRequiredItems.length)}개 완료</span>
          </div>
        </div>

        {/* 카드 2: 출국 전 항공 보안 퀵 체크 */}
        <div className="card">
          <div className="card-header-row">
            <span className="card-title">
              <ShieldCheck size={18} style={{ color: '#0284c7' }} />
              출국 항공 보안 핵심 수칙
            </span>
            <button
              onClick={() => onNavigateTab('safety')}
              style={{ fontSize: '0.8rem', color: 'var(--color-primary-light)', fontWeight: 600 }}
            >
              전체 규정 검색
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.825rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b91c1c' }}>
              <BatteryCharging size={16} style={{ flexShrink: 0 }} />
              <span><strong>보조배터리:</strong> 무조건 기내 휴대! 위탁 절대 불가</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0369a1' }}>
              <Droplet size={16} style={{ flexShrink: 0 }} />
              <span><strong>100ml 초과 액체류:</strong> 무조건 위탁수하물로 위탁</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b45309' }}>
              <AlertTriangle size={16} style={{ flexShrink: 0 }} />
              <span><strong>전자담배:</strong> 기내만 가능 (태국/싱가포르 반입 금지)</span>
            </div>
          </div>
        </div>

        {/* 카드 3: 현지 전압 & 어댑터 정보 */}
        <div className="card">
          <div className="card-header-row">
            <span className="card-title">
              <Zap size={18} style={{ color: '#eab308' }} />
              {activeTrip.countryName} 콘센트 & 전압
            </span>
            <button
              onClick={() => onNavigateTab('guide')}
              style={{ fontSize: '0.8rem', color: 'var(--color-primary-light)', fontWeight: 600 }}
            >
              가이드 보기
            </button>
          </div>

          {guide ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>표준 전압 및 주파수</span>
                <span style={{ fontWeight: 700 }}>{guide.standardVoltage} / {guide.standardFrequency}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>변환 어댑터(돼지코)</span>
                <span style={{ fontWeight: 700, color: guide.plugAdapterNeeded ? '#dc2626' : '#16a34a' }}>
                  {guide.plugAdapterNeeded ? '필수 지참 필요' : '한국 플러그 직접 호환'}
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', lineHeight: 1.4 }}>
                {guide.electricalGuidance.substring(0, 80)}...
              </p>
            </div>
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              해당 국가의 전압 정보를 가이드 탭에서 확인하세요.
            </p>
          )}
        </div>
      </div>

      {/* 카테고리별 세부 진행 현황 */}
      <div className="card">
        <div className="card-header-row">
          <span className="card-title">카테고리별 준비 진행 현황</span>
          <button
            onClick={() => onNavigateTab('checklist')}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.65rem' }}
          >
            체크리스트 열기
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
          {CHECKLIST_CATEGORIES.map((cat) => {
            const catItems = items.filter(i => i.categoryId === cat.id);
            if (catItems.length === 0) return null;
            const catCompleted = catItems.filter(i => i.isCompleted).length;
            const catPercent = Math.round((catCompleted / catItems.length) * 100);

            return (
              <div 
                key={cat.id}
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-card-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                    {cat.icon} {cat.name}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    {catCompleted}/{catItems.length}
                  </span>
                </div>
                <div className="progress-bar-bg" style={{ height: '6px' }}>
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${catPercent}%` }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 다음 할 일 (D-Day 타임라인 연동) */}
      {nextTask && (
        <div className="card" style={{ borderLeft: '4px solid var(--color-primary-light)' }}>
          <div className="card-header-row">
            <span className="card-title">
              💡 다음으로 해야 할 일
            </span>
            <button
              onClick={() => onNavigateTab('timeline')}
              style={{ fontSize: '0.8rem', color: 'var(--color-primary-light)', fontWeight: 600 }}
            >
              전체 일정 보기
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: 600 }}>
              [{nextTask.stageTitle}]
            </span>
            <h4 style={{ fontSize: '0.975rem', fontWeight: 700 }}>{nextTask.title}</h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>{nextTask.description}</p>
          </div>
        </div>
      )}

      {/* 공식 여행 정보 출처 안내 */}
      <div 
        style={{
          background: 'var(--bg-card-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.15rem',
          fontSize: '0.78rem',
          color: 'var(--text-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}
      >
        <span>
          출처: 대한민국 국토교통부, 한국교통안전공단 항공보안365, 인천국제공항공사, 외교부 해외안전여행
        </span>
        <a 
          href="https://www.avsec365.or.kr" 
          target="_blank" 
          rel="noopener noreferrer"
          className="official-link"
        >
          항공보안365 공식 포털 <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
};
