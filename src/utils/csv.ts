import type { KPI, KPIEntry, ExportData } from '../types/kpi';

export function downloadCSV(content: string, filename: string): void {
  if (typeof window === 'undefined') return;
  
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function formatCSVValue(value: any): string {
  if (value === null || value === undefined) return '';
  
  const stringValue = String(value);
  
  // If the value contains commas, quotes, or newlines, wrap it in quotes and escape quotes
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  
  return stringValue;
}

export function arrayToCSV(data: any[], headers: string[]): string {
  if (data.length === 0) return headers.join(',');
  
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => formatCSVValue(row[header])).join(',')
    )
  ].join('\n');
  
  return csvContent;
}

export function exportKPIsToCSV(kpis: KPI[]): void {
  const headers = [
    'id',
    'name', 
    'description',
    'value',
    'target',
    'unit',
    'category',
    'color',
    'createdAt',
    'updatedAt'
  ];
  
  const csvData = kpis.map(kpi => ({
    id: kpi.id,
    name: kpi.name,
    description: kpi.description || '',
    value: kpi.value,
    target: kpi.target || '',
    unit: kpi.unit,
    category: kpi.category,
    color: kpi.color,
    createdAt: kpi.createdAt.toISOString(),
    updatedAt: kpi.updatedAt.toISOString()
  }));
  
  const csvContent = arrayToCSV(csvData, headers);
  const filename = `kpis-${new Date().toISOString().split('T')[0]}.csv`;
  
  downloadCSV(csvContent, filename);
}

export function exportKPIEntriesToCSV(entries: KPIEntry[], kpis: KPI[]): void {
  const kpiMap = new Map(kpis.map(kpi => [kpi.id, kpi]));
  
  const headers = [
    'id',
    'kpiId',
    'kpiName',
    'value',
    'date',
    'note'
  ];
  
  const csvData = entries.map(entry => {
    const kpi = kpiMap.get(entry.kpiId);
    return {
      id: entry.id,
      kpiId: entry.kpiId,
      kpiName: kpi?.name || 'Unknown KPI',
      value: entry.value,
      date: entry.date.toISOString(),
      note: entry.note || ''
    };
  });
  
  const csvContent = arrayToCSV(csvData, headers);
  const filename = `kpi-entries-${new Date().toISOString().split('T')[0]}.csv`;
  
  downloadCSV(csvContent, filename);
}

export function exportAllDataToCSV(exportData: ExportData): void {
  const { kpis, entries } = exportData;
  
  // Create a comprehensive export with KPIs and their latest values
  const headers = [
    'kpiId',
    'kpiName',
    'description',
    'currentValue',
    'target',
    'unit',
    'category',
    'color',
    'lastUpdated',
    'totalEntries'
  ];
  
  const kpiEntryCount = new Map<string, number>();
  entries.forEach(entry => {
    kpiEntryCount.set(entry.kpiId, (kpiEntryCount.get(entry.kpiId) || 0) + 1);
  });
  
  const csvData = kpis.map(kpi => ({
    kpiId: kpi.id,
    kpiName: kpi.name,
    description: kpi.description || '',
    currentValue: kpi.value,
    target: kpi.target || '',
    unit: kpi.unit,
    category: kpi.category,
    color: kpi.color,
    lastUpdated: kpi.updatedAt.toISOString(),
    totalEntries: kpiEntryCount.get(kpi.id) || 0
  }));
  
  const csvContent = arrayToCSV(csvData, headers);
  const filename = `kpi-dashboard-${new Date().toISOString().split('T')[0]}.csv`;
  
  downloadCSV(csvContent, filename);
}

export function exportKPIHistoryToCSV(kpiId: string, kpiName: string, entries: KPIEntry[]): void {
  const filteredEntries = entries.filter(entry => entry.kpiId === kpiId);
  
  const headers = [
    'date',
    'value',
    'note'
  ];
  
  const csvData = filteredEntries
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map(entry => ({
      date: entry.date.toISOString().split('T')[0],
      value: entry.value,
      note: entry.note || ''
    }));
  
  const csvContent = arrayToCSV(csvData, headers);
  const filename = `${kpiName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-history-${new Date().toISOString().split('T')[0]}.csv`;
  
  downloadCSV(csvContent, filename);
} 