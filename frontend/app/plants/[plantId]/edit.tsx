import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import { AppButton } from '@/components/common/AppButton';
import { Screen } from '@/components/common/Screen';
import { PlantForm } from '@/components/plants/PlantForm';
import { useDeletePlant, useUpdatePlant } from '@/hooks/mutations/usePlantMutations';
import { useUploadImage } from '@/hooks/mutations/useUploadImage';
import { usePlantDetail } from '@/hooks/queries/usePlants';
import { colors } from '@/theme/tokens';
import { PlantRequest } from '@/types/plant';

const initialForm: PlantRequest = {
  name: '',
  speciesName: '',
  nickname: '',
  acquiredDate: null,
  coverPhotoUrl: '',
  memo: '',
};

export default function EditPlantScreen() {
  const { plantId } = useLocalSearchParams<{ plantId: string }>();
  const id = Number(plantId);
  const { data, isLoading } = usePlantDetail(id);
  const updatePlant = useUpdatePlant(id);
  const deletePlant = useDeletePlant();
  const uploadImage = useUploadImage();
  const [form, setForm] = useState<PlantRequest>(initialForm);

  useEffect(() => {
    if (!data) {
      return;
    }
    setForm({
      name: data.name,
      speciesName: data.speciesName ?? '',
      nickname: data.nickname ?? '',
      acquiredDate: data.acquiredDate ?? null,
      coverPhotoUrl: data.coverPhotoUrl ?? '',
      memo: data.memo ?? '',
    });
  }, [data]);

  const setField = <K extends keyof PlantRequest>(key: K, value: PlantRequest[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async () => {
    if (!form.name.trim()) {
      Alert.alert('입력 확인', '식물 이름을 입력해주세요.');
      return;
    }
    try {
      await updatePlant.mutateAsync({
        ...form,
        name: form.name.trim(),
        speciesName: form.speciesName || null,
        nickname: form.nickname || null,
        acquiredDate: form.acquiredDate || null,
        coverPhotoUrl: form.coverPhotoUrl || null,
        memo: form.memo || null,
      });
      router.back();
    } catch (error) {
      Alert.alert('저장 실패', error instanceof Error ? error.message : '식물을 수정하지 못했습니다.');
    }
  };

  const confirmDelete = () => {
    Alert.alert('식물 삭제', '식물과 관련 기록을 삭제할까요?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          try {
            await deletePlant.mutateAsync(id);
            router.replace('/');
          } catch (error) {
            Alert.alert('삭제 실패', error instanceof Error ? error.message : '식물을 삭제하지 못했습니다.');
          }
        },
      },
    ]);
  };

  const uploadCover = async () => {
    try {
      const photoUrl = await uploadImage.mutateAsync();
      if (photoUrl) {
        setField('coverPhotoUrl', photoUrl);
      }
    } catch (error) {
      Alert.alert('업로드 실패', error instanceof Error ? error.message : '사진을 업로드하지 못했습니다.');
    }
  };

  if (isLoading) {
    return (
      <Screen>
        <ActivityIndicator color={colors.primary} />
      </Screen>
    );
  }

  return (
    <Screen>
      <PlantForm
        value={form}
        onChange={setField}
        onSubmit={submit}
        submitLabel="수정 저장"
        disabled={updatePlant.isPending}
        onUploadCover={uploadCover}
        uploadingCover={uploadImage.isPending}
      />
      <View>
        <AppButton label="식물 삭제" icon="trash-outline" variant="danger" onPress={confirmDelete} disabled={deletePlant.isPending} />
      </View>
    </Screen>
  );
}
