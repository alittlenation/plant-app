import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PlantEventType } from '@/types/event';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import { eventTypeOptions } from '@/utils/event';

type EventTypeSelectorProps = {
  value: PlantEventType;
  onChange: (value: PlantEventType) => void;
};

export function EventTypeSelector({ value, onChange }: EventTypeSelectorProps) {
  return (
    <View style={styles.grid}>
      {eventTypeOptions.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.option, selected && styles.selected]}
          >
            <Ionicons name={iconFor(option.value)} size={18} color={selected ? colors.primaryDark : colors.textSubtle} />
            <Text style={[styles.label, selected && styles.selectedLabel]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function iconFor(type: PlantEventType): keyof typeof Ionicons.glyphMap {
  switch (type) {
    case 'WATERING':
      return 'water-outline';
    case 'NUTRIENT':
      return 'flask-outline';
    case 'REPOTTING':
      return 'file-tray-stacked-outline';
    case 'PRUNING':
      return 'cut-outline';
    case 'MEMO':
      return 'document-text-outline';
    case 'CUSTOM':
      return 'sparkles-outline';
  }
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  option: {
    minHeight: 46,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  selected: {
    borderColor: '#BBD5B9',
    backgroundColor: colors.primarySoft,
  },
  label: {
    ...typography.label,
    color: colors.textMuted,
  },
  selectedLabel: {
    color: colors.primaryDark,
  },
});
