'use client';
import React, { Suspense } from 'react';
import { useSupabase } from '@/components/providers/SystemProvider';
import { usePowerSync, usePowerSyncWatchedQuery } from '@journeyapps/powersync-react';
import { useRouter } from 'next/navigation';
import { Button, Image, Flex, Title, Loader, Rating, Paper, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconLock } from '@tabler/icons-react'

export default function DashboardPage() {
  const powerSync = usePowerSync();
  const supabase = useSupabase();
  const router = useRouter();

  const journalEntries = usePowerSyncWatchedQuery(`
    select journal_entries.*, user_profiles.photo as user_photo, user_profiles.name as user_name
    from journal_entries
    inner join user_profiles on journal_entries.owner_id = user_profiles.owner_id
    order by journal_entries.created_at desc
  `)

  return (
    <>
      <Suspense fallback={<Loader />}>
        <div style={{ maxWidth: '800px' }}>
          {journalEntries.map((journalEntry) => (
            <Paper key={journalEntry.id} shadow="md" p="md" mt="lg">
              <Image src={journalEntry.photo} radius="sm" />
              <Flex justify="space-between" mt="sm" mb="sm">
                <Flex align="center">
                  <Image w={30} src={journalEntry.user_photo} radius="xl" mr="sm"/>
                  <strong>{journalEntry.user_name}</strong>
                </Flex>
                <Flex align="center">
                  <Text mr="sm" color="dimmed">{journalEntry.location}</Text>
                  <Rating readOnly value={journalEntry.rating} />
                </Flex>
              </Flex>

              <Text>{journalEntry.note}</Text>
              {(journalEntry.private_note) && <div style={{ marginTop: '10px' }}>
                <Flex align="center">
                  <IconLock color="gray" size={16}/>
                  <Text color="dimmed" size="sm">Private note</Text>
                </Flex>
                <Text color="dimmed">
                  {journalEntry.private_note}
                </Text>
              </div>}
              
              
              <br />
            </Paper>
          ))}
        </div>
      </Suspense>
    </>
  );
}
