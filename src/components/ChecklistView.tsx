import React, { useState } from 'react';
import { useTripContext } from '../context/TripContext';
import type { ChecklistItem, ChecklistCategoryId } from '../types';
import { CHECKLIST_CATEGORIES } from '../utils/recommendations';
import confetti from 'canvas-confetti';
import { 
  Search, 
  Plus, 
  ChevronDown, 
  ChevronRight, 
  Check, 
  RotateCcw, 
  Trash2, 
  Edit2, 
  Sparkles,
  Info
} from 'lucide-react';

interface ChecklistViewProps {
  onEditItem: (item: ChecklistItem) => void;
}

type FilterType = 'all' | 'pending' | 'required' | 'custom';

export const ChecklistView: React.FC<ChecklistViewProps> = ({ onEditItem }) => {
  const { 
    activeTrip, 
    items, 
    toggleItemCheck, 
    addItem, 
    deleteItem, 
    updateItemQuantity, 
    resetToChecklistTemplate, 
    uncheckAllItems 
  } = useTripContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [hideCompleted, setHideCompleted] = useState(false);

  // 새 항목 인라인 추가 상태
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ChecklistCategoryId>('convenience');
  const [newItemIsRequired, setNewItemIsRequired] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  if (!activeTrip) {
    return <div>선택된 여행이 없습니다.</div>;
  }

  // 체크 토글 시 100% 달성 축하 confetti
  const handleToggle = (itemId: string, currentCompleted: boolean) => {
    toggleItemCheck(itemId);
    if (!currentCompleted) {
      const willBeCompletedCount = items.filter(i => i.isCompleted || i.id === itemId).length;
      if (willBeCompletedCount === items.length && items.length > 0) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const toggleCategoryCollapse = (catId: string) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    addItem({
      name: newItemName.trim(),
      categoryId: newItemCategory,
      quantity: 1,
      priority: 'medium',
      isRequired: newItemIsRequired,
      isCompleted: false,
      isCustom: true,
      note: '직접 추가한 준비물'
    });

    setNewItemName('');
    setShowAddForm(false);
  };

  // 필터링 적용
  const filteredItems = items.filter(item => {
    // 텍스트 검색
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchNote = item.note ? item.note.toLowerCase().includes(q) : false;
      const matchReason = item.recommendedReason ? item.recommendedReason.toLowerCase().includes(q) : false;
      if (!matchName && !matchNote && !matchReason) return false;
    }

    // 상태 필터
    if (filterType === 'pending' && item.isCompleted) return false;
    if (filterType === 'required' && !item.isRequired) return false;
    if (filterType === 'custom' && !item.isCustom) return false;

    // 완료 항목 숨기기
    if (hideCompleted && item.isCompleted) return false;

    return true;
  });

  const totalCount = items.length;
  const completedCount = items.filter(i => i.isCompleted).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* 툴바: 검색, 필터, 완료 숨기기, 일괄 버튼 */}
      <div className="checklist-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, flexWrap: 'wrap' }}>
          <div className="search-input-box">
            <Search size={16} style={{ color: 'var(--text-subtle)', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="준비물 검색 (예: 여권, 충전기, 셔츠)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-pills-row">
            <button
              onClick={() => setFilterType('all')}
              className={`filter-pill ${filterType === 'all' ? 'active' : ''}`}
            >
              전체 ({totalCount})
            </button>
            <button
              onClick={() => setFilterType('pending')}
              className={`filter-pill ${filterType === 'pending' ? 'active' : ''}`}
            >
              미완료 ({totalCount - completedCount})
            </button>
            <button
              onClick={() => setFilterType('required')}
              className={`filter-pill ${filterType === 'required' ? 'active' : ''}`}
            >
              필수만
            </button>
            <button
              onClick={() => setFilterType('custom')}
              className={`filter-pill ${filterType === 'custom' ? 'active' : ''}`}
            >
              직접 추가한 항목
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <label 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              fontSize: '0.8rem', 
              cursor: 'pointer',
              userSelect: 'none',
              color: 'var(--text-muted)' 
            }}
          >
            <input
              type="checkbox"
              checked={hideCompleted}
              onChange={(e) => setHideCompleted(e.target.checked)}
            />
            완료 항목 숨기기
          </label>

          <button
            onClick={() => setShowAddForm(prev => !prev)}
            className="btn-primary"
            style={{ padding: '0.45rem 0.8rem', fontSize: '0.825rem' }}
          >
            <Plus size={15} /> 준비물 추가
          </button>

          <button
            onClick={() => {
              if (confirm('모든 준비물의 체크를 해제하시겠습니까?')) {
                uncheckAllItems();
              }
            }}
            className="btn-secondary"
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
            title="모든 항목 체크 해제"
          >
            체크 초기화
          </button>

          <button
            onClick={() => {
              if (confirm('국가 및 일정 조건에 맞춘 기본 스마트 템플릿으로 다시 복구하시겠습니까? (직접 추가한 항목은 보존됩니다)')) {
                resetToChecklistTemplate(true);
              }
            }}
            className="btn-secondary"
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
            title="스마트 템플릿 다시 복구"
          >
            <RotateCcw size={14} /> 템플릿 복구
          </button>
        </div>
      </div>

      {/* 새 항목 인라인 추가 폼 */}
      {showAddForm && (
        <form 
          onSubmit={handleAddNewItem}
          style={{
            background: '#ffffff',
            border: '2px dashed var(--color-primary-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}
        >
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            + 새로운 준비물 직접 추가
          </h4>
          <div className="form-row">
            <div className="form-group" style={{ flex: 2 }}>
              <label className="form-label">준비물 이름</label>
              <input
                type="text"
                className="form-input"
                placeholder="예: 비상용 텀블러, 폴라로이드 필름"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">카테고리</label>
              <select
                className="form-select"
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value as ChecklistCategoryId)}
              >
                {CHECKLIST_CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={newItemIsRequired}
                onChange={(e) => setNewItemIsRequired(e.target.checked)}
              />
              필수 준비물로 지정
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
                style={{ fontSize: '0.85rem' }}
              >
                취소
              </button>
              <button
                type="submit"
                className="btn-primary"
                style={{ fontSize: '0.85rem' }}
              >
                추가 완료
              </button>
            </div>
          </div>
        </form>
      )}

      {/* 카테고리별 아코디언 목록 */}
      {CHECKLIST_CATEGORIES.map((category) => {
        const categoryItems = filteredItems.filter(i => i.categoryId === category.id);
        if (categoryItems.length === 0) return null;

        const isCollapsed = collapsedCategories[category.id];
        const catCompletedCount = categoryItems.filter(i => i.isCompleted).length;
        const allDone = catCompletedCount === categoryItems.length;

        return (
          <div key={category.id} className="category-group-card">
            <div
              className={`category-header ${!isCollapsed ? 'open' : ''}`}
              onClick={() => toggleCategoryCollapse(category.id)}
            >
              <div className="category-title-wrap">
                <span className="category-icon">{category.icon}</span>
                <span className="category-title-text">{category.name}</span>
                <span className={`category-count-badge ${allDone ? 'done' : ''}`}>
                  {catCompletedCount}/{categoryItems.length}
                </span>
              </div>
              <div>
                {isCollapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>

            {!isCollapsed && (
              <div className="checklist-item-list">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className={`checklist-item-row ${item.isCompleted ? 'completed' : ''}`}
                  >
                    <div className="checklist-item-left">
                      <div
                        className={`custom-checkbox ${item.isCompleted ? 'checked' : ''}`}
                        onClick={() => handleToggle(item.id, item.isCompleted)}
                        title={item.isCompleted ? '체크 해제' : '준비 완료'}
                      >
                        {item.isCompleted && <Check size={14} strokeWidth={3} />}
                      </div>

                      <div className="item-content">
                        <div className="item-name-row">
                          <span className="item-name">{item.name}</span>
                          {item.isRequired && (
                            <span className="badge-required">필수</span>
                          )}
                          <span className={`priority-tag ${item.priority}`}>
                            {item.priority === 'high' ? '중요' : item.priority === 'medium' ? '보통' : '선택'}
                          </span>
                          {item.isCustom && (
                            <span 
                              style={{ 
                                fontSize: '0.65rem', 
                                background: '#f3e8ff', 
                                color: '#7e22ce', 
                                padding: '0.1rem 0.35rem', 
                                borderRadius: '4px',
                                fontWeight: 600 
                              }}
                            >
                              직접 추가
                            </span>
                          )}
                        </div>

                        {item.recommendedReason && (
                          <span className="item-reason">
                            <Sparkles size={11} /> {item.recommendedReason}
                          </span>
                        )}

                        {item.note && (
                          <span className="item-note">
                            <Info size={11} style={{ display: 'inline', marginRight: '3px' }} />
                            {item.note}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="checklist-item-actions">
                      {/* 수량 조절 */}
                      <div className="quantity-control">
                        <button
                          type="button"
                          className="quantity-btn"
                          onClick={() => updateItemQuantity(item.id, -1)}
                          title="수량 1 감소"
                        >
                          -
                        </button>
                        <span className="quantity-val">{item.quantity}</span>
                        <button
                          type="button"
                          className="quantity-btn"
                          onClick={() => updateItemQuantity(item.id, 1)}
                          title="수량 1 증가"
                        >
                          +
                        </button>
                      </div>

                      {/* 수정 버튼 */}
                      <button
                        type="button"
                        onClick={() => onEditItem(item)}
                        className="btn-icon"
                        style={{ width: '30px', height: '30px' }}
                        title="항목 세부 수정"
                      >
                        <Edit2 size={13} />
                      </button>

                      {/* 삭제 버튼 */}
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`'${item.name}' 항목을 체크리스트에서 삭제하시겠습니까?`)) {
                            deleteItem(item.id);
                          }
                        }}
                        className="btn-icon"
                        style={{ width: '30px', height: '30px', color: '#ef4444' }}
                        title="항목 삭제"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {filteredItems.length === 0 && (
        <div 
          style={{ 
            textAlign: 'center', 
            padding: '3rem 1rem', 
            color: 'var(--text-muted)',
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)' 
          }}
        >
          <p style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            조건에 일치하는 준비물이 없습니다.
          </p>
          <p style={{ fontSize: '0.85rem' }}>
            검색어나 필터 조건을 변경하거나 새 준비물을 직접 추가해보세요.
          </p>
        </div>
      )}
    </div>
  );
};
