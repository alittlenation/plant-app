import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/theme/tokens';

type SectionHeaderProps = {
  title: string;
  description?: string;
  right?: ReactNode;
};

export function SectionHeader({ title, description, right }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  textBox: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    ...typography.section,
  },
  description: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
