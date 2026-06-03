import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { PlantListItem } from '@/types/plant';
import { colors, radius, shadow, spacing, typography } from '@/theme/tokens';
import { formatDate } from '@/utils/date';

type PlantCardProps = {
  plant: PlantListItem;
  onPress: () => void;
};

export function PlantCard({ plant, onPress }: PlantCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      {plant.coverPhotoUrl ? (
        <Image source={{ uri: plant.coverPhotoUrl }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="leaf" size={28} color={colors.primary} />
        </View>
      )}
      <View style={styles.body}>
        <Text numberOfLines={1} style={styles.name}>
          {plant.name}
        </Text>
        <Text numberOfLines={1} style={styles.species}>
          {plant.speciesName || plant.nickname || '종류 미입력'}
        </Text>
        <View style={styles.metaRow}>
          <Ionicons name="water-outline" size={14} color={colors.primary} />
          <Text style={styles.meta}>물주기 {formatDate(plant.lastWateredAt)}</Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={14} color={colors.textSubtle} />
          <Text style={styles.meta}>최근 기록 {formatDate(plant.latestEventAt)}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSubtle} style={styles.chevron} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    alignItems: 'center',
    ...shadow.card,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.92,
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
  },
  placeholder: {
    width: 88,
    height: 88,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xs,
  },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  species: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  meta: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  chevron: {
    marginLeft: spacing.xs,
  },
});
