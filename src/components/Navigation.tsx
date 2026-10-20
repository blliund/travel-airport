import React from 'react';
import { LayoutDashboard, CheckSquare, ShieldAlert, BookOpen, Clock, DollarSign } from 'lucide-react';

export type NavTabId = 'dashboard' | 'checklist' | 'safety' | 'guide' | 'timeline' | 'budget';

interface NavigationProps {
  activeTab: NavTabId;
  onChangeTab: (tab: NavTabId) => void;
  pendingRequiredCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onChangeTab, pendingRequiredCount = 0 }) => {
  const tabs = [
    { id: 'dashboard' as NavTabId, label: '대시보드', icon: LayoutDashboard },
    { 
      id: 'checklist' as NavTabId, 
      label: '준비물 체크', 
      icon: CheckSquare,
      badge: pendingRequiredCount > 0 ? pendingRequiredCount : undefined
    },
    { id: 'safety' as NavTabId, label: '항공 안전 점검', icon: ShieldAlert },
    { id: 'guide' as NavTabId, label: '여행지 가이드', icon: BookOpen },
    { id: 'timeline' as NavTabId, label: 'D-Day 일정', icon: Clock },
    { id: 'budget' as NavTabId, label: '여행 예산', icon: DollarSign },
  ];

  return (
    <>
      {/* 데스크톱 상단 탭 네비게이션 */}
      <nav className="desktop-nav" aria-label="메인 메뉴">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`nav-tab-btn ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span 
                  style={{
                    background: '#ef4444',
                    color: '#fff',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.1rem 0.45rem',
                    borderRadius: '999px',
                    marginLeft: '0.2rem'
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 모바일 하단 내비게이션 바 */}
      <nav className="mobile-bottom-nav" aria-label="모바일 하단 메뉴">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <div style={{ position: 'relative' }}>
                <Icon size={20} />
                {tab.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-8px',
                      background: '#ef4444',
                      color: '#fff',
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      padding: '0 0.35rem',
                      borderRadius: '999px',
                      lineHeight: '14px'
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
