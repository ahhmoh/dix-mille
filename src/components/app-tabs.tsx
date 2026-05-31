import { NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';

import { useTheme } from '@/hooks/use-theme';

export default function AppTabs() {
  const theme = useTheme();

  return (
    <NativeTabs
      backgroundColor={theme.background}
      indicatorColor={theme.primary}
      labelStyle={{ selected: { color: theme.primary } }}
      hidden={true}
    >
      <NativeTabs.Trigger name='index'>
        <NativeTabs.Trigger.Label>Play</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
