import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { colors } from '@/theme/tokens';

export default function RootLayout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 20_000,
            refetchOnMount: true,
            refetchOnReconnect: true,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '900' },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: '내 식물' }} />
        <Stack.Screen name="plants/new" options={{ title: '식물 등록' }} />
        <Stack.Screen name="plants/[plantId]/index" options={{ title: '식물 상세' }} />
        <Stack.Screen name="plants/[plantId]/edit" options={{ title: '식물 수정' }} />
        <Stack.Screen name="records/new" options={{ title: '기록 추가' }} />
      </Stack>
    </QueryClientProvider>
  );
}
