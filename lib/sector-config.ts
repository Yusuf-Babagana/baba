import { SectorConfig } from './types';

export const sectorConfigs: Record<string, SectorConfig> = {
  agriculture: {
    name: 'Agriculture',
    icon: '🌾',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  health: {
    name: 'Health',
    icon: '🏥',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  logistics: {
    name: 'Logistics',
    icon: '🚚',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  }
};