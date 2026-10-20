import React, { useState } from 'react';
import { searchRegulations } from '../data/regulations';
import type { RegulationStatus } from '../types';
import { 
  Search, 
  ShieldCheck, 
  ExternalLink, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  HelpCircle,
  PlaneTakeoff,
  Luggage,
  ShieldAlert
} from 'lucide-react';

export const SafetyCheckView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = [
    '전체',
    '배터리·전자기기',
    '액체·젤류',
    '식품·농축산물',
    '위험물·화기',
    '의약품·위생',
    '도검·공구류',
    '스포츠·레저'
  ];

  const filteredRegulations = searchRegulations(searchQuery, selectedCategory);

  const renderStatusBadge = (status: RegulationStatus, type: 'carryOn' | 'checked') => {
    switch (status) {
      case 'ALLOWED':
        return (
          <span className="status-badge allowed">
            <CheckCircle size={13} /> {type === 'carryOn' ? '기내 반입 가능' : '위탁 부치기 가능'}
          </span>
        );
      case 'CONDITIONAL':
        return (
          <span className="status-badge conditional">
            <AlertCircle size={13} /> {type === 'carryOn' ? '기내 조건부 허용' : '위탁 조건부 허용'}
          </span>
        );
      case 'PROHIBITED':
        return (
          <span className="status-badge prohibited">
            <XCircle size={13} /> {type === 'carryOn' ? '기내 휴대 불가' : '위탁 수하물 불가'}
          </span>
        );
      case 'VERIFY_REQUIRED':
        return (
          <span className="status-badge verify_required">
            <HelpCircle size={13} /> 공식 확인 필요
          </span>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* 상단 공식 보안 안내 배너 */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          boxShadow: varCssShadowSm()
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <ShieldAlert size={24} style={{ color: '#38bdf8' }} />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
            대한민국 출국 항공 보안 & 수하물 규정 점검
          </h3>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.5 }}>
          국토교통부, 한국교통안전공단 <strong>항공보안365</strong> 및 인천국제공항공사 공식 보안검색 기준입니다.
          비행기 기내에 들고 탈 수 있는 물품(기내수하물)과 화물칸에 부쳐야 하는 물품(위탁수하물)을 사전에 확인하여
          공항 보안검색대 압수 및 가방 개봉 불이익을 방지하세요.
        </p>
      </div>

      {/* 검색 및 카테고리 필터 */}
      <div className="checklist-toolbar">
        <div className="search-input-box" style={{ flex: 1.5 }}>
          <Search size={16} style={{ color: 'var(--text-subtle)' }} />
          <input
            type="text"
            placeholder="물품명 검색 (예: 보조배터리, 고추장, 전자담배, 선스프레이, 고데기)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-pills-row" style={{ flex: 2 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 규정 물품 카드 목록 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredRegulations.map((item) => {
          return (
            <div key={item.id} className="regulation-card">
              <div className="card-header-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                  <span 
                    style={{ 
                      fontSize: '0.72rem', 
                      background: 'var(--bg-card-subtle)', 
                      padding: '0.2rem 0.5rem', 
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 600,
                      color: 'var(--text-muted)'
                    }}
                  >
                    {item.category}
                  </span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {item.name}
                  </h4>
                </div>
              </div>

              {/* 기내 vs 위탁 규정 뱃지 행 */}
              <div className="regulation-badges-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <PlaneTakeoff size={16} style={{ color: 'var(--color-primary-light)' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>기내수하물:</span>
                  {renderStatusBadge(item.carryOnStatus, 'carryOn')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Luggage size={16} style={{ color: '#64748b' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>위탁수하물:</span>
                  {renderStatusBadge(item.checkedStatus, 'checked')}
                </div>
              </div>

              {/* 세부 규정 요약 */}
              <p className="regulation-rules-text">
                {item.rulesSummary}
              </p>

              {/* 제한 기준 및 포장 조건 */}
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                  gap: '0.5rem',
                  background: 'var(--bg-card-subtle)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.8rem'
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-subtle)', fontWeight: 600 }}>수량/용량 한도: </span>
                  <span style={{ color: 'var(--text-main)' }}>{item.quantityLimit}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-subtle)', fontWeight: 600 }}>포장/소지 조건: </span>
                  <span style={{ color: 'var(--text-main)' }}>{item.packagingConditions}</span>
                </div>
              </div>

              {/* 목적지 국가 추가 제한 경고 */}
              {item.destinationRestrictions && (
                <div className="regulation-warning-box">
                  <strong>목적지 국가 주의: </strong> {item.destinationRestrictions}
                </div>
              )}

              {/* 메타데이터 푸터: 공식 출처 및 검증일자 */}
              <div className="regulation-meta-footer">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={13} style={{ color: 'var(--color-success)' }} />
                  <span>출처: {item.officialSource}</span>
                  <span>({item.scope})</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={12} /> 최종 검증일: {item.lastVerifiedAt}
                  </span>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="official-link"
                  >
                    공식 규정 바로보기 <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        {filteredRegulations.length === 0 && (
          <div 
            style={{ 
              textAlign: 'center', 
              padding: '3rem 1rem', 
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)'
            }}
          >
            <p style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              검색된 항공 규정 품목이 없습니다.
            </p>
            <p style={{ fontSize: '0.85rem' }}>
              검색어를 변경하거나 한국교통안전공단 항공보안365 공식 포털에서 상세 품목을 확인하세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

function varCssShadowSm() {
  return '0 1px 3px rgba(0, 0, 0, 0.07)';
}
