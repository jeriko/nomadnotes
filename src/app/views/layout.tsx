'use client';
import React from 'react';

import { usePowerSync } from '@journeyapps/powersync-react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/components/providers/SystemProvider';

import { AppShell, Group, Flex, Title, ActionIcon } from '@mantine/core';
import { IconDoorExit } from '@tabler/icons-react';
import { PowerSyncConnection } from '@/components/connection/PowerSyncConnection';

export default function ViewsLayout({ children }: { children: React.ReactNode }) {
  const powerSync = usePowerSync();
  const router = useRouter();
  const supabase = useSupabase();

  const signOut = async () => {
    await powerSync.disconnectAndClear();
    await supabase?.client.auth.signOut();
    router.push('/auth/login');
  }

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <AppShell.Header>
          <Group justify="space-between">
            <Flex mih={60} align="center">
              <Title order={2} ml="lg" mr="lg">✈️ travelapp</Title>
              <PowerSyncConnection />
            </Flex>

            <ActionIcon variant="transparent" color="gray" onClick={signOut} mr="md">
              <IconDoorExit />
            </ActionIcon>
          </Group>
        </AppShell.Header>

        <AppShell.Main>
          {children}
        </AppShell.Main>
      </AppShell>
    </>
  );
}
