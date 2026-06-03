import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/common/AppButton';
import { AppCard } from '@/components/common/AppCard';
import { EmptyState } from '@/components/common/EmptyState';
import { Screen } from '@/components/common/Screen';
import { SectionHeader } from '@/components/common/SectionHeader';
import { PlantCard } from '@/components/plants/PlantCard';
import { usePlants } from '@/hooks/queries/usePlants';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function PlantListScreen() {
  const { data, isLoading, error, refetch } = usePlants();

  return (
    <Screen>
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View style={styles.brandMark}>
            <Ionicons name="leaf" size={20} color={colors.white} />
          </View>
          <Text style={styles.brand}>식집사들</Text>
        </View>
        <Text style={styles.heroTitle}>식물을 smart하게 키우는 식집사들</Text>
        <Text style={styles.heroSubtitle}>물주기, 성장사진, 관리기록까지 한 곳에서</Text>
        <AppButton
          label="첫 식물 등록하기"
          icon="add"
          onPress={() => router.push('/plants/new')}
          style={styles.heroButton}
        />
      </View>

      {isLoading ? (
        <AppCard style={styles.loadingCard}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.stateText}>식물 목록을 불러오는 중입니다.</Text>
        </AppCard>
      ) : null}

      {error ? (
        <AppCard style={styles.stateBox}>
          <Text style={styles.stateTitle}>목록을 불러오지 못했습니다.</Text>
          <Text style={styles.stateText}>잠시 후 다시 시도해주세요.</Text>
          <AppButton label="다시 시도" variant="secondary" icon="refresh" onPress={() => refetch()} />
        </AppCard>
      ) : null}

      {!isLoading && !error && data?.length === 0 ? (
        <EmptyState
          title="아직 식물 가족이 없어요"
          description="첫 번째 반려 식물을 등록하고 물주기와 성장 사진을 차곡차곡 기록해보세요."
          actionLabel="첫 식물 등록하기"
          onAction={() => router.push('/plants/new')}
        />
      ) : null}

      {!isLoading && !error && data && data.length > 0 ? (
        <View style={styles.listSection}>
          <SectionHeader
            title="내 식물"
            description={`${data.length}개의 식물을 돌보고 있어요`}
            right={<AppButton label="추가" variant="ghost" icon="add" onPress={() => router.push('/plants/new')} style={styles.smallButton} />}
          />
          <View style={styles.list}>
            {data.map((plant) => (
              <PlantCard key={plant.id} plant={plant} onPress={() => router.push(`/plants/${plant.id}`)} />
            ))}
          </View>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radius.xl,
    backgroundColor: colors.primaryDark,
    padding: spacing.xl,
    gap: spacing.md,
    overflow: 'hidden',
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  brandMark: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '900',
  },
  heroTitle: {
    color: colors.white,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  heroSubtitle: {
    color: '#DDEBDD',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  heroButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
  },
  listSection: {
    gap: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
  loadingCard: {
    alignItems: 'center',
    gap: spacing.md,
  },
  stateBox: {
    gap: spacing.md,
  },
  stateTitle: {
    ...typography.section,
  },
  stateText: {
    ...typography.body,
  },
  smallButton: {
    minHeight: 42,
    paddingHorizontal: spacing.md,
  },
});
