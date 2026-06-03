import { PlantEventType } from '@/types/event';

export const eventTypeOptions: Array<{ value: PlantEventType; label: string }> = [
  { value: 'WATERING', label: '물주기' },
  { value: 'NUTRIENT', label: '영양제' },
  { value: 'REPOTTING', label: '분갈이' },
  { value: 'PRUNING', label: '가지치기' },
  { value: 'MEMO', label: '메모' },
  { value: 'CUSTOM', label: '직접 입력' },
];

export function eventTypeLabel(type: PlantEventType, customTitle?: string | null) {
  if (type === 'CUSTOM') {
    return customTitle?.trim() || '사용자 정의';
  }
  return eventTypeOptions.find((option) => option.value === type)?.label ?? type;
}
