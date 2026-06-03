import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from './AppButton';
import { AppCard } from './AppCard';
import { colors, radius, spacing, typography } from '@/theme/tokens';

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
};

export function EmptyState({ title, description, actionLabel, onAction, icon = 'leaf-outline' }: EmptyStateProps) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={30} color={colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionLabel && onAction ? <AppButton label={actionLabel} icon="add" onPress={onAction} style={styles.button} /> : null}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
    gap: spacing.md,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: radius.xl,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.section,
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    textAlign: 'center',
  },
  button: {
    alignSelf: 'stretch',
    marginTop: spacing.sm,
  },
});
