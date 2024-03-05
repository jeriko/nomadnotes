'use client';
import React from 'react';

import { usePowerSync } from '@journeyapps/powersync-react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/components/providers/SystemProvider';

import { AppShell, Group, Flex, Title, ActionIcon } from '@mantine/core';
import { IconHome, IconPlus, IconUserCircle, IconFriends, IconDoorExit } from '@tabler/icons-react';
import { PowerSyncConnection } from '@/components/connection/PowerSyncConnection';
import Image from 'next/image'

export default function ViewsLayout({ children }: { children: React.ReactNode }) {
  const powerSync = usePowerSync();
  const router = useRouter();
  const supabase = useSupabase();

  const signOut = async () => {
    await powerSync.disconnectAndClear();
    await supabase?.client.auth.signOut();
    router.push('/auth/login');
  }

  const links = [
    {
      path: '/views/dashboard',
      icon: IconHome,
    },
    {
      path: '/views/create',
      icon: IconPlus,
    },
    {
      path: '/views/sharing',
      icon: IconFriends,
    },
    {
      path: '/views/profile',
      icon: IconUserCircle,
    }
  ]

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <AppShell.Header>
          <Group justify="space-between">
            <Flex mih={60} align="center">
              <Image src="/nomadnoteslogo.png" width={50} height={50} />
              <Title order={3} ml="xs" mr="xl">NomadNotes</Title>

              <Flex gap="md" style={{ marginTop: '5px' }}>
                {links.map((link, index) => (
                  <a key={index} onClick={() => router.push(link.path)}>
                    <link.icon size={25} />
                  </a>
                ))}
              </Flex>
            </Flex>

            <Flex>
              <PowerSyncConnection />
              <ActionIcon variant="transparent" color="gray" onClick={signOut} ml="md" mr="md">
                <IconDoorExit />
              </ActionIcon>
            </Flex>
          </Group>
        </AppShell.Header>

        <AppShell.Main>
          {children}
        </AppShell.Main>
      </AppShell>
    </>
  );
}
