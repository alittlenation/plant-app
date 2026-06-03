import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { PlantEvent } from '@/types/event';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import { formatDate } from '@/utils/date';
import { eventTypeLabel } from '@/utils/event';

type EventListProps = {
  events: PlantEvent[];
};

export function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return <Text style={styles.empty}>아직 기록이 없습니다. 오늘의 돌봄을 남겨보세요.</Text>;
  }

  return (
    <View style={styles.list}>
      {events.map((event) => (
        <View key={event.id} style={styles.row}>
          <View style={styles.iconBox}>
            <Ionicons name="leaf-outline" size={18} color={colors.primary} />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{eventTypeLabel(event.eventType, event.customTitle)}</Text>
            {event.memo ? <Text style={styles.memo}>{event.memo}</Text> : null}
          </View>
          <Text style={styles.date}>{formatDate(event.eventDate)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    ...typography.label,
  },
  memo: {
    ...typography.caption,
    color: colors.textMuted,
  },
  date: {
    color: colors.textSubtle,
    fontSize: 13,
    fontWeight: '700',
  },
  empty: {
    ...typography.body,
  },
});
