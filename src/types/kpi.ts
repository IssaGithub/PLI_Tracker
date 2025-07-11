export interface KPI {
  id: string;
  name: string;
  description?: string;
  value: number;
  target?: number;
  unit: string;
  category: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface KPIFormData {
  name: string;
  description?: string;
  value: number;
  target?: number;
  unit: string;
  category: string;
  color: string;
}

export interface KPIEntry {
  id: string;
  kpiId: string;
  value: number;
  date: Date;
  note?: string;
}

export type KPICategories = 
  | 'Financial'
  | 'Marketing'
  | 'Sales'
  | 'Operations'
  | 'Customer'
  | 'HR'
  | 'Product'
  | 'Custom';

export const KPI_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#84CC16', // Lime
] as const;

export const KPI_CATEGORIES: KPICategories[] = [
  'Financial',
  'Marketing', 
  'Sales',
  'Operations',
  'Customer',
  'HR',
  'Product',
  'Custom'
];

export interface ExportData {
  kpis: KPI[];
  entries: KPIEntry[];
  exportDate: Date;
} 