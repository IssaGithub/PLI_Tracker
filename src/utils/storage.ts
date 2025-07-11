import type { KPI, KPIEntry, ExportData } from '../types/kpi';

const STORAGE_KEYS = {
  KPIS: 'kpi-tracker-kpis',
  ENTRIES: 'kpi-tracker-entries',
} as const;

// KPI Storage Functions
export function getKPIs(): KPI[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.KPIS);
    if (!stored) return [];
    
    const kpis = JSON.parse(stored);
    return kpis.map((kpi: any) => ({
      ...kpi,
      createdAt: new Date(kpi.createdAt),
      updatedAt: new Date(kpi.updatedAt),
    }));
  } catch (error) {
    console.error('Error loading KPIs from storage:', error);
    return [];
  }
}

export function saveKPIs(kpis: KPI[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.KPIS, JSON.stringify(kpis));
  } catch (error) {
    console.error('Error saving KPIs to storage:', error);
  }
}

export function addKPI(kpi: Omit<KPI, 'id' | 'createdAt' | 'updatedAt'>): KPI {
  const newKPI: KPI = {
    ...kpi,
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const kpis = getKPIs();
  kpis.push(newKPI);
  saveKPIs(kpis);
  
  return newKPI;
}

export function updateKPI(id: string, updates: Partial<Omit<KPI, 'id' | 'createdAt'>>): KPI | null {
  const kpis = getKPIs();
  const index = kpis.findIndex(kpi => kpi.id === id);
  
  if (index === -1) return null;
  
  const updatedKPI = {
    ...kpis[index],
    ...updates,
    updatedAt: new Date(),
  };
  
  kpis[index] = updatedKPI;
  saveKPIs(kpis);
  
  return updatedKPI;
}

export function deleteKPI(id: string): boolean {
  const kpis = getKPIs();
  const filteredKPIs = kpis.filter(kpi => kpi.id !== id);
  
  if (filteredKPIs.length === kpis.length) return false;
  
  saveKPIs(filteredKPIs);
  
  // Also delete related entries
  const entries = getKPIEntries();
  const filteredEntries = entries.filter(entry => entry.kpiId !== id);
  saveKPIEntries(filteredEntries);
  
  return true;
}

// KPI Entry Storage Functions
export function getKPIEntries(kpiId?: string): KPIEntry[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ENTRIES);
    if (!stored) return [];
    
    const entries = JSON.parse(stored);
    const parsedEntries = entries.map((entry: any) => ({
      ...entry,
      date: new Date(entry.date),
    }));
    
    return kpiId 
      ? parsedEntries.filter((entry: KPIEntry) => entry.kpiId === kpiId)
      : parsedEntries;
  } catch (error) {
    console.error('Error loading KPI entries from storage:', error);
    return [];
  }
}

export function saveKPIEntries(entries: KPIEntry[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving KPI entries to storage:', error);
  }
}

export function addKPIEntry(entry: Omit<KPIEntry, 'id'>): KPIEntry {
  const newEntry: KPIEntry = {
    ...entry,
    id: generateId(),
  };
  
  const entries = getKPIEntries();
  entries.push(newEntry);
  saveKPIEntries(entries);
  
  // Update the KPI's current value
  updateKPI(entry.kpiId, { value: entry.value });
  
  return newEntry;
}

// Utility Functions
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function exportData(): ExportData {
  return {
    kpis: getKPIs(),
    entries: getKPIEntries(),
    exportDate: new Date(),
  };
}

export function importData(data: ExportData): void {
  saveKPIs(data.kpis);
  saveKPIEntries(data.entries);
}

export function clearAllData(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(STORAGE_KEYS.KPIS);
  localStorage.removeItem(STORAGE_KEYS.ENTRIES);
} 