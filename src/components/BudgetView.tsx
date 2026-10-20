import React, { useState } from 'react';
import { useTripContext } from '../context/TripContext';
import type { BudgetCategory } from '../types';
import { Plus, Trash2, Calculator, Info } from 'lucide-react';

export const BudgetView: React.FC = () => {
  const { activeTrip, budgetItems, updateBudgetItem, addBudgetItem, deleteBudgetItem } = useTripContext();

  // 환율 계산기 상태
  const [foreignAmount, setForeignAmount] = useState<number>(1000);
  const [exchangeRate, setExchangeRate] = useState<number>(() => {
    if (activeTrip?.countryCode === 'JP') return 9.2; // 100엔당 약 920원 -> 1엔당 9.2원
    if (activeTrip?.countryCode === 'US') return 1380;
    if (activeTrip?.countryCode === 'TH') return 38;
    if (activeTrip?.countryCode === 'VN') return 0.054;
    if (activeTrip?.countryCode === 'FR') return 1500;
    if (activeTrip?.countryCode === 'GB') return 1750;
    return 1300;
  });

  // 새 예산 항목 추가 폼
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newPlanned, setNewPlanned] = useState<number>(100000);

  if (!activeTrip) {
    return <div>선택된 여행이 없습니다.</div>;
  }

  const totalPlanned = budgetItems.reduce((acc, cur) => acc + (cur.plannedAmount || 0), 0);
  const totalSpent = budgetItems.reduce((acc, cur) => acc + (cur.spentAmount || 0), 0);
  const remaining = totalPlanned - totalSpent;
  const spentPercent = totalPlanned > 0 ? Math.min(100, Math.round((totalSpent / totalPlanned) * 100)) : 0;

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    addBudgetItem({
      category: 'other' as BudgetCategory,
      categoryName: newCategoryName.trim(),
      plannedAmount: newPlanned,
      spentAmount: 0,
      currency: 'KRW'
    });

    setNewCategoryName('');
    setNewPlanned(100000);
    setShowAddForm(false);
  };

  const calculatedKrw = Math.round(foreignAmount * exchangeRate);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* 요약 배너 */}
      <div className="budget-summary-banner">
        <div className="budget-metric">
          <span className="budget-metric-label">총 예산 계획</span>
          <span className="budget-metric-val">{totalPlanned.toLocaleString()}원</span>
        </div>
        <div className="budget-metric">
          <span className="budget-metric-label">현재 지출액</span>
          <span className="budget-metric-val" style={{ color: '#fed7aa' }}>
            {totalSpent.toLocaleString()}원
          </span>
        </div>
        <div className="budget-metric">
          <span className="budget-metric-label">남은 잔액</span>
          <span 
            className="budget-metric-val"
            style={{ color: remaining >= 0 ? '#bbf7d0' : '#fecdd3' }}
          >
            {remaining.toLocaleString()}원
          </span>
        </div>
      </div>

      {/* 전체 지출 프로그레스 바 */}
      <div className="card">
        <div className="progress-header">
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            총 예산 대비 지출 소진율
          </span>
          <span className="progress-percentage">{spentPercent}%</span>
        </div>
        <div className="progress-bar-bg" style={{ height: '10px' }}>
          <div 
            className="progress-bar-fill" 
            style={{ 
              width: `${spentPercent}%`,
              background: spentPercent > 90 ? '#ef4444' : 'linear-gradient(90deg, #0d9488, #3b82f6)'
            }} 
          />
        </div>
      </div>

      {/* 환율 계산기 (실시간 API 미연결 시 명확한 안내 및 직접 입력 기능) */}
      <div className="card" style={{ background: '#f8fafc' }}>
        <div className="card-header-row">
          <span className="card-title">
            <Calculator size={18} style={{ color: 'var(--color-primary-light)' }} />
            간편 여행 환율 계산기
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
            <Info size={13} /> 기준 환율 직접 수정 가능
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
          <div className="form-group">
            <label className="form-label">현지 외화 금액 ({activeTrip.countryCode})</label>
            <input
              type="number"
              className="form-input"
              value={foreignAmount}
              onChange={(e) => setForeignAmount(Number(e.target.value) || 0)}
              min={0}
            />
          </div>

          <div className="form-group">
            <label className="form-label">적용 환율 (1외화당 원화)</label>
            <input
              type="number"
              step="0.001"
              className="form-input"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(Number(e.target.value) || 0)}
            />
          </div>

          <div className="form-group" style={{ justifyContent: 'flex-end' }}>
            <label className="form-label">원화(KRW) 환산 금액</label>
            <div 
              style={{ 
                padding: '0.6rem 0.85rem', 
                background: '#ffffff', 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-md)',
                fontWeight: 800,
                color: 'var(--color-primary-dark)',
                fontSize: '1.05rem'
              }}
            >
              약 {calculatedKrw.toLocaleString()} 원
            </div>
          </div>
        </div>
      </div>

      {/* 카테고리별 예산 목록 */}
      <div className="card">
        <div className="card-header-row">
          <span className="card-title">카테고리별 예산 및 지출 상세</span>
          <button
            onClick={() => setShowAddForm(prev => !prev)}
            className="btn-primary"
            style={{ fontSize: '0.825rem', padding: '0.45rem 0.75rem' }}
          >
            <Plus size={15} /> 항목 추가
          </button>
        </div>

        {showAddForm && (
          <form 
            onSubmit={handleAddBudget}
            style={{
              padding: '1rem',
              border: '1px dashed var(--color-primary-light)',
              borderRadius: 'var(--radius-md)',
              background: '#f8fafc',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            <div className="form-row">
              <div className="form-group" style={{ flex: 2 }}>
                <label className="form-label">항목명</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="예: 뮤지컬 티켓, 디즈니랜드 입장권"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">계획 금액 (원)</label>
                <input
                  type="number"
                  className="form-input"
                  value={newPlanned}
                  onChange={(e) => setNewPlanned(Number(e.target.value) || 0)}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)} 
                className="btn-secondary"
                style={{ fontSize: '0.825rem' }}
              >
                취소
              </button>
              <button 
                type="submit" 
                className="btn-primary"
                style={{ fontSize: '0.825rem' }}
              >
                추가
              </button>
            </div>
          </form>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {budgetItems.map((item) => {
            const itemDiff = item.plannedAmount - item.spentAmount;

            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  border: '1px solid #f1f5f9',
                  borderRadius: 'var(--radius-md)',
                  background: '#ffffff',
                  gap: '0.75rem',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ minWidth: '140px' }}>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    {item.categoryName}
                  </strong>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-subtle)' }}>계획 예산:</span>
                    <input
                      type="number"
                      value={item.plannedAmount}
                      onChange={(e) => updateBudgetItem({ ...item, plannedAmount: Number(e.target.value) || 0 })}
                      style={{
                        width: '110px',
                        padding: '0.2rem 0.4rem',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.85rem',
                        fontWeight: 600
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-subtle)' }}>실제 지출:</span>
                    <input
                      type="number"
                      value={item.spentAmount}
                      onChange={(e) => updateBudgetItem({ ...item, spentAmount: Number(e.target.value) || 0 })}
                      style={{
                        width: '110px',
                        padding: '0.2rem 0.4rem',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: item.spentAmount > item.plannedAmount ? '#ef4444' : 'inherit'
                      }}
                    />
                  </div>

                  <div style={{ minWidth: '80px', textAlign: 'right', fontSize: '0.825rem' }}>
                    <span style={{ color: 'var(--text-subtle)', display: 'block', fontSize: '0.7rem' }}>잔액</span>
                    <strong style={{ color: itemDiff >= 0 ? '#16a34a' : '#ef4444' }}>
                      {itemDiff.toLocaleString()}원
                    </strong>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteBudgetItem(item.id)}
                    className="btn-icon"
                    style={{ width: '28px', height: '28px', color: '#94a3b8' }}
                    title="항목 삭제"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
