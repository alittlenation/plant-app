import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/common/AppButton';
import { AppCard } from '@/components/common/AppCard';
import { FormField } from '@/components/common/FormField';
import { Screen } from '@/components/common/Screen';
import { EventTypeSelector } from '@/components/records/EventTypeSelector';
import { useCreateEvent, useCreatePhoto } from '@/hooks/mutations/useRecordMutations';
import { useUploadImage } from '@/hooks/mutations/useUploadImage';
import { useRecordFormStore } from '@/stores/record-form.store';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import { PlantEventType } from '@/types/event';

export default function NewRecordScreen() {
  const params = useLocalSearchParams<{ plantId: string; mode?: 'EVENT' | 'PHOTO' }>();
  const plantId = Number(params.plantId);
  const form = useRecordFormStore();
  const createEvent = useCreateEvent(plantId);
  const createPhoto = useCreatePhoto(plantId);
  const uploadImage = useUploadImage();

  useEffect(() => {
    form.reset();
    form.setPlantId(plantId);
    form.setMode(params.mode === 'PHOTO' ? 'PHOTO' : 'EVENT');
  }, [plantId, params.mode]);

  const submit = async () => {
    if (!Number.isFinite(plantId)) {
      Alert.alert('오류', '식물 정보가 올바르지 않습니다.');
      return;
    }

    if (form.mode === 'PHOTO') {
      if (!form.photoUrl.trim()) {
        Alert.alert('입력 확인', '성장 사진 URL을 입력해주세요.');
        return;
      }
      try {
        await createPhoto.mutateAsync({
          photoUrl: form.photoUrl.trim(),
          takenAt: form.date,
          memo: form.memo || null,
        });
        form.reset();
        router.back();
      } catch (error) {
        Alert.alert('저장 실패', error instanceof Error ? error.message : '성장 사진을 저장하지 못했습니다.');
      }
      return;
    }

    if (form.eventType === 'CUSTOM' && !form.customTitle.trim() && !form.memo.trim()) {
      Alert.alert('입력 확인', '사용자 정의 기록은 제목이나 메모가 필요합니다.');
      return;
    }

    try {
      await createEvent.mutateAsync({
        eventType: form.eventType,
        customTitle: form.eventType === 'CUSTOM' ? form.customTitle.trim() || null : null,
        eventDate: form.date,
        memo: form.memo || null,
      });
      form.reset();
      router.back();
    } catch (error) {
      Alert.alert('저장 실패', error instanceof Error ? error.message : '기록을 저장하지 못했습니다.');
    }
  };

  const uploadPhoto = async () => {
    try {
      const photoUrl = await uploadImage.mutateAsync();
      if (photoUrl) {
        form.setField('photoUrl', photoUrl);
      }
    } catch (error) {
      Alert.alert('업로드 실패', error instanceof Error ? error.message : '사진을 업로드하지 못했습니다.');
    }
  };

  return (
    <Screen>
      <View style={styles.segment}>
        <ModeButton label="기록" selected={form.mode === 'EVENT'} onPress={() => form.setMode('EVENT')} />
        <ModeButton label="성장 사진" selected={form.mode === 'PHOTO'} onPress={() => form.setMode('PHOTO')} />
      </View>

      {form.mode === 'EVENT' ? (
        <AppCard style={styles.section}>
          <Text style={styles.label}>기록 유형</Text>
          <EventTypeSelector value={form.eventType} onChange={(value: PlantEventType) => form.setEventType(value)} />
          {form.eventType === 'CUSTOM' ? (
            <FormField
              label="사용자 정의 제목"
              value={form.customTitle}
              onChangeText={(text) => form.setField('customTitle', text)}
              placeholder="예: 새 잎 발견"
            />
          ) : null}
        </AppCard>
      ) : (
        <AppCard style={styles.photoCard}>
          <View style={styles.photoIcon}>
            <Ionicons name="camera-outline" size={26} color={colors.primary} />
          </View>
          <Text style={styles.photoTitle}>성장 사진</Text>
          <Text style={styles.photoDescription}>오늘의 잎, 줄기, 화분 상태를 사진으로 남겨보세요.</Text>
          <FormField
            label="성장 사진 URL"
            value={form.photoUrl}
            onChangeText={(text) => form.setField('photoUrl', text)}
            placeholder="https://..."
          />
          <AppButton
            label={uploadImage.isPending ? '업로드 중' : '성장 사진 선택'}
            variant="secondary"
            icon="image-outline"
            onPress={uploadPhoto}
            disabled={uploadImage.isPending}
          />
        </AppCard>
      )}

      <FormField label="날짜" value={form.date} onChangeText={(text) => form.setField('date', text)} placeholder="YYYY-MM-DD" />
      <FormField label="메모" value={form.memo} onChangeText={(text) => form.setField('memo', text)} placeholder="상태나 느낌을 남겨보세요." multiline />

      <AppButton
        label={form.mode === 'PHOTO' ? '성장 사진 저장' : '기록 저장'}
        icon="checkmark"
        onPress={submit}
        disabled={createEvent.isPending || createPhoto.isPending}
      />
    </Screen>
  );
}

function ModeButton({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.modeButton, selected && styles.modeButtonSelected]}>
      <Text style={[styles.modeLabel, selected && styles.modeLabelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  segment: {
    flexDirection: 'row',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.xs,
    gap: spacing.xs,
  },
  modeButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeButtonSelected: {
    backgroundColor: colors.primary,
  },
  modeLabel: {
    ...typography.label,
    color: colors.textMuted,
  },
  modeLabelSelected: {
    color: colors.white,
  },
  section: {
    gap: spacing.md,
  },
  label: {
    ...typography.label,
  },
  photoCard: {
    gap: spacing.md,
  },
  photoIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoTitle: {
    ...typography.section,
  },
  photoDescription: {
    ...typography.body,
  },
});
