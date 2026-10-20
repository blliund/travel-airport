import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Trip, ChecklistItem, TimelineTask, BudgetItem } from '../types';
import { generateSmartChecklist } from '../utils/recommendations';
import { getDefaultTimelineTasks, getDefaultBudgetItems } from '../data/defaultTimeline';

interface TripContextType {
  trips: Trip[];
  activeTrip: Trip | undefined;
  activeTripId: string;
  setActiveTripId: (id: string) => void;
  createTrip: (tripData: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateTrip: (id: string, tripData: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  
  // Checklist
  items: ChecklistItem[];
  toggleItemCheck: (itemId: string) => void;
  addItem: (item: Omit<ChecklistItem, 'id' | 'tripId' | 'createdAt' | 'updatedAt'>) => void;
  updateItem: (item: ChecklistItem) => void;
  deleteItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, delta: number) => void;
  resetToChecklistTemplate: (preserveCustom?: boolean) => void;
  uncheckAllItems: () => void;

  // Timeline
  timelineTasks: TimelineTask[];
  toggleTimelineTask: (taskId: string) => void;

  // Budget
  budgetItems: BudgetItem[];
  updateBudgetItem: (item: BudgetItem) => void;
  addBudgetItem: (item: Omit<BudgetItem, 'id' | 'tripId'>) => void;
  deleteBudgetItem: (itemId: string) => void;

  // Export / Import
  exportDataAsJson: () => string;
  importDataFromJson: (jsonString: string) => { success: boolean; error?: string };
}

const STORAGE_KEY = 'TRAVEL_AIRPORT_ASSISTANT_V1';

const INITIAL_TRIPS: Trip[] = [
  {
    id: 'trip-sample-tokyo',
    name: '도쿄 3박 4일 미식 & 쇼핑 투어',
    region: '동아시아',
    countryCode: 'JP',
    countryName: '일본',
    city: '도쿄 (대도시·쇼핑·도보)',
    departureDate: '2026-11-15',
    returnDate: '2026-11-18',
    companionsCount: 2,
    travelPurpose: '쇼핑',
    travelStyle: '쇼핑·미식형',
    accommodation: '호텔/리조트',
    luggageType: '위탁 수하물 포함 (20~23kg)',
    personalNotes: '신주쿠와 긴자 위주 일정, 디즈니랜드 방문 고려 중',
    createdAt: '2026-10-01T00:00:00.000Z',
    updatedAt: '2026-10-01T00:00:00.000Z'
  },
  {
    id: 'trip-sample-bangkok',
    name: '방콕 & 파타야 4박 6일 힐링 휴양',
    region: '동남아시아',
    countryCode: 'TH',
    countryName: '태국',
    city: '방콕 (대도시·미식·야시장)',
    departureDate: '2026-12-20',
    returnDate: '2026-12-25',
    companionsCount: 1,
    travelPurpose: '휴양',
    travelStyle: '해변·휴양형',
    accommodation: '호텔/리조트',
    luggageType: '위탁 수하물 포함 (20~23kg)',
    personalNotes: '야시장 미식 탐방, 마사지 1일 1회',
    createdAt: '2026-10-05T00:00:00.000Z',
    updatedAt: '2026-10-05T00:00:00.000Z'
  }
];

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_TRIPS');
      return saved ? JSON.parse(saved) : INITIAL_TRIPS;
    } catch {
      return INITIAL_TRIPS;
    }
  });

  const [activeTripId, setActiveTripId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_ACTIVE_ID');
      if (saved && trips.some(t => t.id === saved)) return saved;
      return trips[0]?.id || '';
    } catch {
      return trips[0]?.id || '';
    }
  });

  const [checklistsMap, setChecklistsMap] = useState<Record<string, ChecklistItem[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_CHECKLISTS');
      if (saved) return JSON.parse(saved);
      // 초기 여행들 스마트 체크리스트 생성
      const initialMap: Record<string, ChecklistItem[]> = {};
      INITIAL_TRIPS.forEach(t => {
        initialMap[t.id] = generateSmartChecklist(t);
      });
      return initialMap;
    } catch {
      const initialMap: Record<string, ChecklistItem[]> = {};
      INITIAL_TRIPS.forEach(t => {
        initialMap[t.id] = generateSmartChecklist(t);
      });
      return initialMap;
    }
  });

  const [timelineMap, setTimelineMap] = useState<Record<string, TimelineTask[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_TIMELINE');
      if (saved) return JSON.parse(saved);
      const initialMap: Record<string, TimelineTask[]> = {};
      INITIAL_TRIPS.forEach(t => {
        initialMap[t.id] = getDefaultTimelineTasks(t.id);
      });
      return initialMap;
    } catch {
      const initialMap: Record<string, TimelineTask[]> = {};
      INITIAL_TRIPS.forEach(t => {
        initialMap[t.id] = getDefaultTimelineTasks(t.id);
      });
      return initialMap;
    }
  });

  const [budgetMap, setBudgetMap] = useState<Record<string, BudgetItem[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_BUDGET');
      if (saved) return JSON.parse(saved);
      const initialMap: Record<string, BudgetItem[]> = {};
      INITIAL_TRIPS.forEach(t => {
        initialMap[t.id] = getDefaultBudgetItems(t.id);
      });
      return initialMap;
    } catch {
      const initialMap: Record<string, BudgetItem[]> = {};
      INITIAL_TRIPS.forEach(t => {
        initialMap[t.id] = getDefaultBudgetItems(t.id);
      });
      return initialMap;
    }
  });

  // LocalStorage 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_TRIPS', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_ACTIVE_ID', activeTripId);
  }, [activeTripId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_CHECKLISTS', JSON.stringify(checklistsMap));
  }, [checklistsMap]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_TIMELINE', JSON.stringify(timelineMap));
  }, [timelineMap]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_BUDGET', JSON.stringify(budgetMap));
  }, [budgetMap]);

  const activeTrip = trips.find(t => t.id === activeTripId) || trips[0];
  const currentItems = (activeTrip && checklistsMap[activeTrip.id]) || [];
  const currentTimeline = (activeTrip && timelineMap[activeTrip.id]) || [];
  const currentBudget = (activeTrip && budgetMap[activeTrip.id]) || [];

  const createTrip = (tripData: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>): string => {
    const id = `trip-${Date.now()}`;
    const now = new Date().toISOString();
    const newTrip: Trip = {
      ...tripData,
      id,
      createdAt: now,
      updatedAt: now
    };

    setTrips(prev => [newTrip, ...prev]);
    const generatedItems = generateSmartChecklist(newTrip);
    setChecklistsMap(prev => ({ ...prev, [id]: generatedItems }));
    setTimelineMap(prev => ({ ...prev, [id]: getDefaultTimelineTasks(id) }));
    setBudgetMap(prev => ({ ...prev, [id]: getDefaultBudgetItems(id) }));
    setActiveTripId(id);
    return id;
  };

  const updateTrip = (id: string, tripData: Partial<Trip>) => {
    setTrips(prev => prev.map(t => {
      if (t.id !== id) return t;
      const updated = { ...t, ...tripData, updatedAt: new Date().toISOString() };
      return updated;
    }));
  };

  const deleteTrip = (id: string) => {
    if (trips.length <= 1) {
      alert('최소 1개의 여행 프로필이 유지되어야 합니다.');
      return;
    }
    setTrips(prev => {
      const nextTrips = prev.filter(t => t.id !== id);
      if (activeTripId === id && nextTrips.length > 0) {
        setActiveTripId(nextTrips[0].id);
      }
      return nextTrips;
    });

    setChecklistsMap(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    setTimelineMap(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    setBudgetMap(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const toggleItemCheck = (itemId: string) => {
    if (!activeTrip) return;
    setChecklistsMap(prev => {
      const tripItems = prev[activeTrip.id] || [];
      const updated = tripItems.map(item => 
        item.id === itemId ? { ...item, isCompleted: !item.isCompleted, updatedAt: new Date().toISOString() } : item
      );
      return { ...prev, [activeTrip.id]: updated };
    });
  };

  const addItem = (itemData: Omit<ChecklistItem, 'id' | 'tripId' | 'createdAt' | 'updatedAt'>) => {
    if (!activeTrip) return;
    const now = new Date().toISOString();
    const newItem: ChecklistItem = {
      ...itemData,
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      tripId: activeTrip.id,
      createdAt: now,
      updatedAt: now
    };
    setChecklistsMap(prev => {
      const tripItems = prev[activeTrip.id] || [];
      return { ...prev, [activeTrip.id]: [newItem, ...tripItems] };
    });
  };

  const updateItem = (item: ChecklistItem) => {
    if (!activeTrip) return;
    setChecklistsMap(prev => {
      const tripItems = prev[activeTrip.id] || [];
      return {
        ...prev,
        [activeTrip.id]: tripItems.map(i => i.id === item.id ? { ...item, updatedAt: new Date().toISOString() } : i)
      };
    });
  };

  const deleteItem = (itemId: string) => {
    if (!activeTrip) return;
    setChecklistsMap(prev => {
      const tripItems = prev[activeTrip.id] || [];
      return {
        ...prev,
        [activeTrip.id]: tripItems.filter(i => i.id !== itemId)
      };
    });
  };

  const updateItemQuantity = (itemId: string, delta: number) => {
    if (!activeTrip) return;
    setChecklistsMap(prev => {
      const tripItems = prev[activeTrip.id] || [];
      return {
        ...prev,
        [activeTrip.id]: tripItems.map(i => {
          if (i.id !== itemId) return i;
          const newQty = Math.max(1, i.quantity + delta);
          return { ...i, quantity: newQty, updatedAt: new Date().toISOString() };
        })
      };
    });
  };

  const resetToChecklistTemplate = (preserveCustom: boolean = true) => {
    if (!activeTrip) return;
    const existingItems = checklistsMap[activeTrip.id] || [];
    const customItems = preserveCustom ? existingItems.filter(i => i.isCustom) : [];
    const generated = generateSmartChecklist(activeTrip);
    const combined = [...customItems, ...generated];
    setChecklistsMap(prev => ({
      ...prev,
      [activeTrip.id]: combined
    }));
  };

  const uncheckAllItems = () => {
    if (!activeTrip) return;
    setChecklistsMap(prev => {
      const tripItems = prev[activeTrip.id] || [];
      return {
        ...prev,
        [activeTrip.id]: tripItems.map(i => ({ ...i, isCompleted: false, updatedAt: new Date().toISOString() }))
      };
    });
  };

  const toggleTimelineTask = (taskId: string) => {
    if (!activeTrip) return;
    setTimelineMap(prev => {
      const tasks = prev[activeTrip.id] || [];
      return {
        ...prev,
        [activeTrip.id]: tasks.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t)
      };
    });
  };

  const updateBudgetItem = (item: BudgetItem) => {
    if (!activeTrip) return;
    setBudgetMap(prev => {
      const items = prev[activeTrip.id] || [];
      return {
        ...prev,
        [activeTrip.id]: items.map(b => b.id === item.id ? item : b)
      };
    });
  };

  const addBudgetItem = (item: Omit<BudgetItem, 'id' | 'tripId'>) => {
    if (!activeTrip) return;
    const newItem: BudgetItem = {
      ...item,
      id: `budget-${Date.now()}`,
      tripId: activeTrip.id
    };
    setBudgetMap(prev => {
      const items = prev[activeTrip.id] || [];
      return {
        ...prev,
        [activeTrip.id]: [...items, newItem]
      };
    });
  };

  const deleteBudgetItem = (itemId: string) => {
    if (!activeTrip) return;
    setBudgetMap(prev => {
      const items = prev[activeTrip.id] || [];
      return {
        ...prev,
        [activeTrip.id]: items.filter(b => b.id !== itemId)
      };
    });
  };

  const exportDataAsJson = (): string => {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      trips,
      activeTripId,
      checklistsMap,
      timelineMap,
      budgetMap
    };
    return JSON.stringify(data, null, 2);
  };

  const importDataFromJson = (jsonString: string): { success: boolean; error?: string } => {
    try {
      const data = JSON.parse(jsonString);
      if (!data.trips || !Array.isArray(data.trips) || data.trips.length === 0) {
        return { success: false, error: '유효한 여행 데이터가 포함되어 있지 않습니다.' };
      }
      setTrips(data.trips);
      if (data.checklistsMap) setChecklistsMap(data.checklistsMap);
      if (data.timelineMap) setTimelineMap(data.timelineMap);
      if (data.budgetMap) setBudgetMap(data.budgetMap);
      if (data.activeTripId && data.trips.some((t: Trip) => t.id === data.activeTripId)) {
        setActiveTripId(data.activeTripId);
      } else {
        setActiveTripId(data.trips[0].id);
      }
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : 'JSON 파싱 오류' };
    }
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        activeTrip,
        activeTripId,
        setActiveTripId,
        createTrip,
        updateTrip,
        deleteTrip,
        items: currentItems,
        toggleItemCheck,
        addItem,
        updateItem,
        deleteItem,
        updateItemQuantity,
        resetToChecklistTemplate,
        uncheckAllItems,
        timelineTasks: currentTimeline,
        toggleTimelineTask,
        budgetItems: currentBudget,
        updateBudgetItem,
        addBudgetItem,
        deleteBudgetItem,
        exportDataAsJson,
        importDataFromJson
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTripContext must be used within a TripProvider');
  return ctx;
};
