import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/common/AppButton';
import { AppCard } from '@/components/common/AppCard';
import { Screen } from '@/components/common/Screen';
import { SectionHeader } from '@/components/common/SectionHeader';
import { PhotoTimeline } from '@/components/photos/PhotoTimeline';
import { EventList } from '@/components/records/EventList';
import { usePlantDetail } from '@/hooks/queries/usePlants';
import { useUiStore } from '@/stores/ui.store';
import { colors, radius, shadow, spacing, typography } from '@/theme/tokens';
import { daysSince, formatDate } from '@/utils/date';

export default function PlantDetailScreen() {
  const { plantId } = useLocalSearchParams<{ plantId: string }>();
  const id = Number(plantId);
  const { data, isLoading, error, refetch } = usePlantDetail(id);
  const viewerImageUrl = useUiStore((state) => state.viewerImageUrl);
  const openViewer = useUiStore((state) => state.openViewer);
  const closeViewer = useUiStore((state) => state.closeViewer);

  if (isLoading) {
    return (
      <Screen>
        <ActivityIndicator color={colors.primary} />
      </Screen>
    );
  }

  if (error || !data) {
    return (
      <Screen>
        <AppCard style={styles.stateBox}>
          <Text style={styles.sectionTitle}>식물을 불러오지 못했습니다.</Text>
          <AppButton label="다시 시도" variant="secondary" icon="refresh" onPress={() => refetch()} />
        </AppCard>
      </Screen>
    );
  }

  const dayCount = daysSince(data.acquiredDate);

  return (
    <Screen>
      <AppCard style={styles.hero} padded={false}>
        {data.coverPhotoUrl ? (
          <Image source={{ uri: data.coverPhotoUrl }} style={styles.heroImage} />
        ) : (
          <View style={styles.heroPlaceholder}>
            <Ionicons name="leaf" size={42} color={colors.primary} />
          </View>
        )}
        <View style={styles.heroText}>
          <View style={styles.nameRow}>
            <View style={styles.nameBox}>
              <Text style={styles.name}>{data.name}</Text>
              <Text style={styles.species}>{data.speciesName || data.nickname || '종류 미입력'}</Text>
            </View>
            <View style={styles.dayBadge}>
              <Text style={styles.dayBadgeLabel}>{dayCount === null ? 'D-' : `D+${dayCount}`}</Text>
            </View>
          </View>
          <View style={styles.metaPill}>
            <Ionicons name="calendar-outline" size={15} color={colors.primary} />
            <Text style={styles.meta}>입양일 {formatDate(data.acquiredDate)}</Text>
          </View>
        </View>
      </AppCard>

      <View style={styles.quickSection}>
        <SectionHeader title="빠른 기록" description="오늘의 돌봄을 바로 남겨보세요" />
        <View style={styles.quickGrid}>
          <QuickAction icon="create-outline" label="기록 추가" onPress={() => router.push(`/records/new?plantId=${id}&mode=EVENT`)} />
          <QuickAction icon="camera-outline" label="사진 추가" onPress={() => router.push(`/records/new?plantId=${id}&mode=PHOTO`)} />
          <QuickAction icon="settings-outline" label="식물 수정" onPress={() => router.push(`/plants/${id}/edit`)} />
        </View>
      </View>

      <View style={styles.summary}>
        <SummaryItem label="물주기" value={formatDate(data.summary.lastWateredAt)} />
        <SummaryItem label="영양제" value={formatDate(data.summary.lastNutrientAt)} />
        <SummaryItem label="분갈이" value={formatDate(data.summary.lastRepottingAt)} />
        <SummaryItem label="가지치기" value={formatDate(data.summary.lastPruningAt)} />
      </View>

      {data.memo ? (
        <AppCard style={styles.section}>
          <SectionHeader title="메모" />
          <Text style={styles.bodyText}>{data.memo}</Text>
        </AppCard>
      ) : null}

      <AppCard style={styles.section}>
        <SectionHeader title="최근 기록" description={`${data.summary.eventCount}개의 관리 기록`} />
        <EventList events={data.recentEvents} />
      </AppCard>

      <AppCard style={styles.section}>
        <SectionHeader title="성장 사진" description={`${data.summary.photoCount}장의 성장 사진`} />
        <PhotoTimeline photos={data.photos} onPressPhoto={openViewer} />
      </AppCard>

      <Modal visible={Boolean(viewerImageUrl)} transparent animationType="fade">
        <Pressable style={styles.modal} onPress={closeViewer}>
          {viewerImageUrl ? <Image source={{ uri: viewerImageUrl }} style={styles.modalImage} /> : null}
        </Pressable>
      </Modal>
    </Screen>
  );
}

function QuickAction({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.quickAction, pressed && styles.quickPressed]}>
      <View style={styles.quickIcon}>
        <Ionicons name={icon} size={22} color={colors.primary} />
      </View>
      <Text style={styles.quickLabel}>{label}</Text>
    </Pressable>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    aspectRatio: 1.25,
    backgroundColor: colors.surfaceMuted,
  },
  heroPlaceholder: {
    width: '100%',
    aspectRatio: 1.25,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {
    gap: spacing.md,
    padding: spacing.lg,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  nameBox: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    ...typography.title,
  },
  species: {
    ...typography.body,
  },
  meta: {
    color: colors.primaryDark,
    fontWeight: '800',
    fontSize: 13,
  },
  dayBadge: {
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  dayBadgeLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
  },
  metaPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  quickSection: {
    gap: spacing.md,
  },
  quickGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  quickAction: {
    flex: 1,
    minHeight: 104,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    ...shadow.card,
  },
  quickPressed: {
    transform: [{ scale: 0.98 }],
  },
  quickIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLabel: {
    ...typography.label,
  },
  summary: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  summaryItem: {
    width: '47.8%',
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
    ...shadow.card,
  },
  summaryLabel: {
    color: colors.textSubtle,
    fontSize: 13,
    fontWeight: '800',
  },
  summaryValue: {
    color: colors.text,
    fontWeight: '900',
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    ...typography.section,
  },
  bodyText: {
    ...typography.body,
  },
  stateBox: {
    gap: spacing.md,
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.86)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalImage: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});
