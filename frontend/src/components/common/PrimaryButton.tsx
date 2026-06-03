import { AppButton } from './AppButton';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
};

export function PrimaryButton({ label, onPress, disabled, variant = 'primary' }: PrimaryButtonProps) {
  return <AppButton label={label} onPress={onPress} disabled={disabled} variant={variant} />;
}
