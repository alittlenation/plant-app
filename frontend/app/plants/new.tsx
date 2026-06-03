import { router } from 'expo-router';
import { Alert } from 'react-native';
import { PlantForm } from '@/components/plants/PlantForm';
import { Screen } from '@/components/common/Screen';
import { useCreatePlant } from '@/hooks/mutations/usePlantMutations';
import { useUploadImage } from '@/hooks/mutations/useUploadImage';
import { usePlantFormStore } from '@/stores/plant-form.store';

export default function NewPlantScreen() {
  const form = usePlantFormStore();
  const createPlant = useCreatePlant();
  const uploadImage = useUploadImage();

  const uploadCover = async () => {
    try {
      const photoUrl = await uploadImage.mutateAsync();
      if (photoUrl) {
        form.setField('coverPhotoUrl', photoUrl);
      }
    } catch (error) {
      Alert.alert('업로드 실패', error instanceof Error ? error.message : '사진을 업로드하지 못했습니다.');
    }
  };

  const submit = async () => {
    if (!form.name.trim()) {
      Alert.alert('입력 확인', '식물 이름을 입력해주세요.');
      return;
    }

    try {
      const response = await createPlant.mutateAsync({
        name: form.name.trim(),
        speciesName: form.speciesName || null,
        nickname: form.nickname || null,
        acquiredDate: form.acquiredDate || null,
        coverPhotoUrl: form.coverPhotoUrl || null,
        memo: form.memo || null,
      });
      form.reset();
      router.replace(`/plants/${response.id}`);
    } catch (error) {
      Alert.alert('저장 실패', error instanceof Error ? error.message : '식물을 저장하지 못했습니다.');
    }
  };

  return (
    <Screen>
      <PlantForm
        value={form}
        onChange={form.setField}
        onSubmit={submit}
        submitLabel="식물 등록"
        disabled={createPlant.isPending}
        onUploadCover={uploadCover}
        uploadingCover={uploadImage.isPending}
      />
    </Screen>
  );
}
