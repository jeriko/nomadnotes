'use client';
import React from 'react';
import { useSupabase } from '@/components/providers/SystemProvider';
import { usePowerSync, usePowerSyncWatchedQuery } from '@journeyapps/powersync-react';
import { useRouter } from 'next/navigation';
import { Button, TextInput, FileInput, Image, Title, Paper, List, Stack, Flex } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

export default function SharingPage() {
  const powerSync = usePowerSync();
  const supabase = useSupabase();
  const router = useRouter();

  const userProfiles = usePowerSyncWatchedQuery(`select * from user_profiles`)
  const userShares = usePowerSyncWatchedQuery(`
    select *, user_shares.id as share_id from user_shares
    left join user_profiles
    on user_shares.user_id = user_profiles.owner_id
  `)

  const nonSharingUserProfiles = usePowerSyncWatchedQuery(`
    select user_profiles.name, user_profiles.photo, user_profiles.owner_id as profile_owner_id
    from user_profiles
    left join user_shares
    on user_profiles.owner_id = user_shares.user_id
    where user_shares.owner_id is null
  `)

  const createShare = async (userID) => {
    const session = await supabase?.client.auth.getSession();
    const ownerID = session?.data.session?.user?.id;

    const result = await powerSync.execute(
      `insert into user_shares (id, owner_id, user_id)
      values (uuid(), ?, ?) RETURNING *`,
      [ownerID, userID]
    );
  }

  const deleteShare = async (shareID) => {
    const result = await powerSync.execute(`delete from user_shares where id='${shareID}'`)
  }

  return (
    <>
      <Paper shadow="md" p="xl" mt="lg">
        <Title order={2}>
          My Sharing
        </Title>

        <Title order={3} mt="lg" mb="md">Sharing with</Title>
        <Stack>
          {userShares.map((userShare, index) => (
            <Flex align="center" gap="sm">
              <Image src={userShare.photo} radius="xl" w={40} />
              <strong>{userShare.name}</strong>
              <Button color="red" variant="transparent" onClick={() => deleteShare(userShare.share_id)}>
                Remove
              </Button>
            </Flex>
          ))}
        </Stack>

        <Title order={3} mt="lg" mb="md">Not sharing with</Title>
        <Stack>
          {nonSharingUserProfiles.map((userProfile, index) => (
            <Flex align="center" gap="sm">
              <Image src={userProfile.photo} radius="xl" w={40} />
              <strong>{userProfile.name}</strong>
              <Button color="green" variant="transparent" onClick={() => createShare(userProfile.profile_owner_id)}>
                Add
              </Button>
            </Flex>
          ))}
        </Stack>
      </Paper>
    </>
  );
}
