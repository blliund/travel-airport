import React, { useState } from 'react';
import { useTripContext } from '../context/TripContext';
import { X, Download, Upload, Copy, Check } from 'lucide-react';

interface ExportImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportImportModal: React.FC<ExportImportModalProps> = ({ isOpen, onClose }) => {
  const { exportDataAsJson, importDataFromJson } = useTripContext();
  const [jsonText, setJsonText] = useState('');
  const [copied, setCopied] = useState(false);
  const [importStatus, setImportStatus] = useState<{ message: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!jsonText) {
      const data = exportDataAsJson();
      setJsonText(data);
      navigator.clipboard.writeText(data);
    } else {
      navigator.clipboard.writeText(jsonText);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const data = exportDataAsJson();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `travel-airport-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!jsonText.trim()) {
      setImportStatus({ message: '가져올 JSON 데이터를 입력해주세요.', isError: true });
      return;
    }
    const result = importDataFromJson(jsonText);
    if (result.success) {
      setImportStatus({ message: '성공적으로 데이터를 복원했습니다!', isError: false });
      setTimeout(() => {
        onClose();
        setImportStatus(null);
      }, 1200);
    } else {
      setImportStatus({ message: `복원 실패: ${result.error || '잘못된 형식'}`, isError: true });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonText(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">💾 데이터 백업 및 복원 (Export & Import)</h3>
          <button onClick={onClose} className="btn-icon" style={{ border: 'none' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            여행 프로필, 체크리스트, 예산 및 타임라인 데이터를 JSON 파일로 백업하거나 다른 기기로 안전하게 이전할 수 있습니다.
            개인 식별 정보는 저장되지 않습니다.
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={handleDownloadFile} className="btn-primary" style={{ fontSize: '0.85rem' }}>
              <Download size={15} /> 백업 파일(.json) 다운로드
            </button>
            <button onClick={handleCopy} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
              {copied ? <Check size={15} className="text-success" /> : <Copy size={15} />}
              {copied ? '클립보드 복사됨' : 'JSON 클립보드 복사'}
            </button>
            <label className="btn-secondary" style={{ fontSize: '0.85rem', cursor: 'pointer' }}>
              <Upload size={15} /> 백업 파일 불러오기
              <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">JSON 데이터 보기 / 직접 붙여넣기</label>
            <textarea
              className="form-textarea"
              rows={8}
              placeholder="여기에 백업된 JSON 코드를 붙여넣고 아래 [데이터 복원] 버튼을 누르세요..."
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
            />
          </div>

          {importStatus && (
            <div 
              style={{ 
                padding: '0.65rem 0.85rem', 
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.825rem',
                fontWeight: 600,
                background: importStatus.isError ? '#fee2e2' : '#dcfce7',
                color: importStatus.isError ? '#dc2626' : '#15803d'
              }}
            >
              {importStatus.message}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn-secondary">
            닫기
          </button>
          <button type="button" onClick={handleImport} className="btn-primary">
            데이터 복원 (덮어쓰기)
          </button>
        </div>
      </div>
    </div>
  );
};
