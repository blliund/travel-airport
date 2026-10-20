import React, { useState } from 'react';
import { TripProvider, useTripContext } from './context/TripContext';
import { Header } from './components/Header';
import { HeroOverview } from './components/HeroOverview';
import { Navigation } from './components/Navigation';
import type { NavTabId } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { ChecklistView } from './components/ChecklistView';
import { SafetyCheckView } from './components/SafetyCheckView';
import { CountryGuideView } from './components/CountryGuideView';
import { TimelineView } from './components/TimelineView';
import { BudgetView } from './components/BudgetView';
import { TripModal } from './components/TripModal';
import { ItemEditModal } from './components/ItemEditModal';
import { ExportImportModal } from './components/ExportImportModal';
import type { ChecklistItem, Trip } from './types';

const MainApp: React.FC = () => {
  const { activeTrip, createTrip, updateTrip, items, updateItem } = useTripContext();

  const [activeTab, setActiveTab] = useState<NavTabId>('dashboard');
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | undefined>(undefined);
  const [isExportImportModalOpen, setIsExportImportModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ChecklistItem | null>(null);

  // 필수 준비물 중 미완료 개수 (네비게이션 뱃지용)
  const pendingRequiredCount = items.filter(i => i.isRequired && !i.isCompleted).length;

  const handleOpenNewTripModal = () => {
    setEditingTrip(undefined);
    setIsTripModalOpen(true);
  };

  const handleOpenEditTripModal = () => {
    if (activeTrip) {
      setEditingTrip(activeTrip);
      setIsTripModalOpen(true);
    }
  };

  const handleSaveTrip = (tripData: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTrip) {
      updateTrip(editingTrip.id, tripData);
    } else {
      createTrip(tripData);
    }
  };

  return (
    <div className="app-container">
      {/* 1. 글로벌 헤더 */}
      <Header
        onOpenNewTripModal={handleOpenNewTripModal}
        onOpenExportImportModal={() => setIsExportImportModalOpen(true)}
      />

      {/* 2. 네비게이션 탭 (데스크톱 상단 / 모바일 하단 동기화) */}
      <Navigation
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        pendingRequiredCount={pendingRequiredCount}
      />

      {/* 3. 메인 콘텐츠 컨테이너 */}
      <main className="main-content">
        {activeTrip && (
          <HeroOverview
            trip={activeTrip}
            onEditTrip={handleOpenEditTripModal}
          />
        )}

        {/* 탭별 뷰 전환 */}
        {activeTab === 'dashboard' && (
          <DashboardView onNavigateTab={setActiveTab} />
        )}

        {activeTab === 'checklist' && (
          <ChecklistView onEditItem={(item) => setEditingItem(item)} />
        )}

        {activeTab === 'safety' && (
          <SafetyCheckView />
        )}

        {activeTab === 'guide' && (
          <CountryGuideView />
        )}

        {activeTab === 'timeline' && (
          <TimelineView />
        )}

        {activeTab === 'budget' && (
          <BudgetView />
        )}
      </main>

      {/* 모달 다이얼로그들 */}
      <TripModal
        isOpen={isTripModalOpen}
        onClose={() => setIsTripModalOpen(false)}
        onSave={handleSaveTrip}
        editingTrip={editingTrip}
      />

      <ItemEditModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        item={editingItem}
        onSave={updateItem}
      />

      <ExportImportModal
        isOpen={isExportImportModalOpen}
        onClose={() => setIsExportImportModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <TripProvider>
      <MainApp />
    </TripProvider>
  );
}
