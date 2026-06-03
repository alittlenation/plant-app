import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { PlantPhoto } from '@/types/photo';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import { formatDate } from '@/utils/date';

type PhotoTimelineProps = {
  photos: PlantPhoto[];
  onPressPhoto?: (photoUrl: string) => void;
};

export function PhotoTimeline({ photos, onPressPhoto }: PhotoTimelineProps) {
  if (photos.length === 0) {
    return <Text style={styles.empty}>아직 성장 사진이 없습니다. 잎이 자라는 순간을 남겨보세요.</Text>;
  }

  return (
    <View style={styles.grid}>
      {photos.map((photo) => (
        <Pressable key={photo.id} style={styles.item} onPress={() => onPressPhoto?.(photo.photoUrl)}>
          <Image source={{ uri: photo.photoUrl }} style={styles.image} />
          <Text style={styles.date}>{formatDate(photo.takenAt)}</Text>
          {photo.memo ? (
            <Text numberOfLines={2} style={styles.memo}>
              {photo.memo}
            </Text>
          ) : null}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  item: {
    width: '47.8%',
    gap: spacing.xs,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
  },
  date: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 13,
  },
  memo: {
    color: colors.textMuted,
    fontSize: 13,
  },
  empty: {
    ...typography.body,
  },
});
