import React from 'react';
import { useTripContext } from '../context/TripContext';
import { Plane, Plus, ChevronDown, Download } from 'lucide-react';

interface HeaderProps {
  onOpenNewTripModal: () => void;
  onOpenExportImportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNewTripModal, onOpenExportImportModal }) => {
  const { trips, activeTripId, setActiveTripId } = useTripContext();

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-icon-box">
          <Plane className="w-5 h-5" />
        </div>
        <div className="brand-titles">
          <h1 className="brand-title">해외여행 스마트 준비 도우미</h1>
          <span className="brand-subtitle">Smart Travel & Baggage Security Assistant</span>
        </div>
      </div>

      <div className="header-actions">
        {/* 여행 전환 셀렉터 */}
        {trips.length > 0 && (
          <div style={{ position: 'relative' }}>
            <select
              value={activeTripId}
              onChange={(e) => setActiveTripId(e.target.value)}
              className="trip-selector-pill"
              style={{ appearance: 'none', paddingRight: '2rem', cursor: 'pointer' }}
              title="여행 프로필 선택"
            >
              {trips.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.countryName})
                </option>
              ))}
            </select>
            <ChevronDown 
              size={14} 
              style={{ 
                position: 'absolute', 
                right: '10px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                pointerEvents: 'none',
                color: 'var(--text-subtle)' 
              }} 
            />
          </div>
        )}

        {/* 새 여행 추가 버튼 */}
        <button
          onClick={onOpenNewTripModal}
          className="btn-primary"
          title="새 해외여행 등록"
        >
          <Plus size={16} />
          <span style={{ display: 'inline-block' }}>새 여행</span>
        </button>

        {/* 백업 / 복원 버튼 */}
        <button
          onClick={onOpenExportImportModal}
          className="btn-icon"
          title="데이터 백업 및 가져오기"
        >
          <Download size={16} />
        </button>
      </div>
    </header>
  );
};
