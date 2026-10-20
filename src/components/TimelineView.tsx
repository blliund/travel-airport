import React from 'react';
import { useTripContext } from '../context/TripContext';
import type { TimelineStage } from '../types';
import { Clock, CheckCircle2, Circle } from 'lucide-react';

export const TimelineView: React.FC = () => {
  const { activeTrip, timelineTasks, toggleTimelineTask } = useTripContext();

  if (!activeTrip) {
    return <div>선택된 여행이 없습니다.</div>;
  }

  const stages: { stage: TimelineStage; title: string; subtitle: string }[] = [
    { stage: 'advance', title: '1. 여행 전 미리 (D-30 ~ D-14)', subtitle: '여권, 비자, 보험, 환전, eSIM 예약' },
    { stage: 'daysBefore', title: '2. 출발 며칠 전 (D-7 ~ D-3)', subtitle: '날씨 확인, 수하물 규정, 오프라인 지도, 공항 교통편' },
    { stage: 'dayBefore', title: '3. 출발 전날 (D-1)', subtitle: '온라인 체크인, 캐리어 무게 측정, 액체류/배터리 분리' },
    { stage: 'departureDay', title: '4. 공항 출발 직전 (D-Day 당일)', subtitle: '여권 실물 확인, 출발 터미널 번호 확인, 가스/소등' },
  ];

  const totalTasks = timelineTasks.length;
  const completedTasks = timelineTasks.filter(t => t.isCompleted).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* 타임라인 진행률 헤더 */}
      <div 
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: 'var(--shadow-xs)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Clock size={24} style={{ color: 'var(--color-primary-light)' }} />
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>출발 전 D-Day 단계별 타임라인</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              출국 직전 깜빡하기 쉬운 점검 사항을 시기별로 차례대로 점검하세요.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '180px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              <span>진행률</span>
              <span style={{ color: 'var(--color-primary-light)' }}>{completedTasks}/{totalTasks} ({progressPercent}%)</span>
            </div>
            <div className="progress-bar-bg" style={{ height: '8px' }}>
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* 4단계 카드 */}
      {stages.map((st) => {
        const stageTasks = timelineTasks.filter(t => t.stage === st.stage);
        if (stageTasks.length === 0) return null;
        const stageDone = stageTasks.filter(t => t.isCompleted).length === stageTasks.length;

        return (
          <div key={st.stage} className="timeline-stage-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h4 className="timeline-stage-title" style={{ marginBottom: '0.15rem' }}>
                  {st.title}
                </h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
                  {st.subtitle}
                </span>
              </div>
              <span className={`status-badge ${stageDone ? 'allowed' : 'conditional'}`}>
                {stageDone ? '모두 완료' : `${stageTasks.filter(t => t.isCompleted).length}/${stageTasks.length} 완료`}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {stageTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="timeline-item-row"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleTimelineTask(task.id)}
                >
                  <div style={{ flexShrink: 0, marginTop: '2px' }}>
                    {task.isCompleted ? (
                      <CheckCircle2 size={20} className="text-success" />
                    ) : (
                      <Circle size={20} style={{ color: '#cbd5e1' }} />
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span 
                        style={{ 
                          fontSize: '0.925rem', 
                          fontWeight: 600,
                          color: task.isCompleted ? '#94a3b8' : 'var(--text-main)',
                          textDecoration: task.isCompleted ? 'line-through' : 'none'
                        }}
                      >
                        {task.title}
                      </span>
                      {task.priority === 'high' && (
                        <span className="priority-tag high">필수</span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {task.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
