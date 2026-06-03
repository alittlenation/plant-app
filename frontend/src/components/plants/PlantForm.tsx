import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/common/AppButton';
import { AppCard } from '@/components/common/AppCard';
import { FormField } from '@/components/common/FormField';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import { PlantRequest } from '@/types/plant';

type PlantFormProps = {
  value: PlantRequest;
  onChange: <K extends keyof PlantRequest>(key: K, value: PlantRequest[K]) => void;
  onSubmit: () => void;
  submitLabel: string;
  disabled?: boolean;
  onUploadCover?: () => void;
  uploadingCover?: boolean;
};

export function PlantForm({ value, onChange, onSubmit, submitLabel, disabled, onUploadCover, uploadingCover }: PlantFormProps) {
  return (
    <View style={styles.container}>
      <AppCard style={styles.photoCard}>
        {value.coverPhotoUrl ? (
          <Image source={{ uri: value.coverPhotoUrl }} style={styles.coverPreview} />
        ) : (
          <View style={styles.coverEmpty}>
            <Ionicons name="image-outline" size={28} color={colors.primary} />
          </View>
        )}
        <View style={styles.photoText}>
          <Text style={styles.photoTitle}>대표 사진</Text>
          <Text style={styles.photoDescription}>식물 목록과 상세 화면에 보여질 사진입니다.</Text>
        </View>
        {onUploadCover ? (
          <AppButton
            label={uploadingCover ? '업로드 중' : '사진 선택'}
            variant="secondary"
            icon="camera-outline"
            onPress={onUploadCover}
            disabled={uploadingCover}
          />
        ) : null}
      </AppCard>

      <View style={styles.fields}>
        <FormField label="식물 이름" value={value.name} onChangeText={(text) => onChange('name', text)} placeholder="예: 몬스테라" />
        <FormField label="종류" value={value.speciesName ?? ''} onChangeText={(text) => onChange('speciesName', text)} placeholder="예: Monstera deliciosa" />
        <FormField label="별명" value={value.nickname ?? ''} onChangeText={(text) => onChange('nickname', text)} placeholder="예: 몬돌이" />
        <FormField label="입양일" value={value.acquiredDate ?? ''} onChangeText={(text) => onChange('acquiredDate', text || null)} placeholder="YYYY-MM-DD" />
        <FormField label="대표 사진 URL" value={value.coverPhotoUrl ?? ''} onChangeText={(text) => onChange('coverPhotoUrl', text)} placeholder="https://..." />
        <FormField label="메모" value={value.memo ?? ''} onChangeText={(text) => onChange('memo', text)} placeholder="처음 데려온 날의 상태를 적어보세요." multiline />
      </View>

      <AppButton label={submitLabel} icon="checkmark" onPress={onSubmit} disabled={disabled} style={styles.submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
  },
  photoCard: {
    gap: spacing.md,
  },
  coverPreview: {
    width: '100%',
    aspectRatio: 1.7,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
  },
  coverEmpty: {
    width: '100%',
    aspectRatio: 1.7,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoText: {
    gap: spacing.xs,
  },
  photoTitle: {
    ...typography.section,
  },
  photoDescription: {
    ...typography.body,
  },
  fields: {
    gap: spacing.lg,
  },
  submit: {
    marginTop: spacing.xs,
  },
});
