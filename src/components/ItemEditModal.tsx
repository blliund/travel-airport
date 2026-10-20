import React, { useState, useEffect } from 'react';
import type { ChecklistItem, ChecklistCategoryId, ChecklistPriority } from '../types';
import { CHECKLIST_CATEGORIES } from '../utils/recommendations';
import { X } from 'lucide-react';

interface ItemEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ChecklistItem | null;
  onSave: (updatedItem: ChecklistItem) => void;
}

export const ItemEditModal: React.FC<ItemEditModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave
}) => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<ChecklistCategoryId>('clothing');
  const [quantity, setQuantity] = useState(1);
  const [priority, setPriority] = useState<ChecklistPriority>('medium');
  const [isRequired, setIsRequired] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (item) {
      setName(item.name);
      setCategoryId(item.categoryId);
      setQuantity(item.quantity);
      setPriority(item.priority);
      setIsRequired(item.isRequired);
      setNote(item.note || '');
    }
  }, [item, isOpen]);

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      ...item,
      name: name.trim(),
      categoryId,
      quantity: Math.max(1, quantity),
      priority,
      isRequired,
      note: note.trim()
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <h3 className="modal-title">준비물 상세 수정</h3>
          <button onClick={onClose} className="btn-icon" style={{ border: 'none' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">준비물 이름</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">카테고리</label>
                <select
                  className="form-select"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value as ChecklistCategoryId)}
                >
                  {CHECKLIST_CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">필요 수량</label>
                <input
                  type="number"
                  min={1}
                  max={99}
                  className="form-input"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">우선순위 (중요도)</label>
                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as ChecklistPriority)}
                >
                  <option value="high">높음 (중요)</option>
                  <option value="medium">보통</option>
                  <option value="low">낮음 (선택)</option>
                </select>
              </div>

              <div className="form-group" style={{ justifyContent: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer', marginTop: '1.25rem' }}>
                  <input
                    type="checkbox"
                    checked={isRequired}
                    onChange={(e) => setIsRequired(e.target.checked)}
                  />
                  <strong>필수 준비물 여부</strong>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">개인 메모 / 보관 위치</label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="예: 작은 앞주머니에 넣음, 유통기한 확인"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-secondary">
              취소
            </button>
            <button type="submit" className="btn-primary">
              저장 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
