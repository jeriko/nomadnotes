'use client';
import React from 'react';
import { useSupabase } from '@/components/providers/SystemProvider';
import { usePowerSync, usePowerSyncWatchedQuery } from '@journeyapps/powersync-react';
import { useRouter } from 'next/navigation';
import { Button, Image, Flex, Title, Paper, Stack, TextInput, PasswordInput, Group, Textarea, Rating, FileInput } from '@mantine/core';
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications';
import { IconUpload } from '@tabler/icons-react'

export default function DashboardPage() {
  const powerSync = usePowerSync();
  const supabase = useSupabase();
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [photo, setPhoto] = React.useState('');

  const fileInputRef = React.useRef(null);

  const form = useForm({
    initialValues: {
      note: '',
      private_note: '',
      location: '',
      rating: 3,
    },
  })

  const formHandler = async (params) => {
    setLoading(true);

    const allParams = { ...params }
    allParams.photo = photo

    await createJournalEntry(allParams)
    console.log(allParams)

    setLoading(false)
    notifications.show({
      title: 'Your note has been published',
    })
    router.push('/views/dashboard')
  }

  const createJournalEntry = async (params) => {
    const session = await supabase?.client.auth.getSession();
    const userID = session?.data.session?.user?.id;

    const res = await powerSync.execute(
      `INSERT INTO journal_entries
      (id, created_at, note, private_note, location, photo, rating, owner_id)
      VALUES (uuid(), datetime(), ?, ?, ?, ?, ?, ?) RETURNING *`,
      [params.note, params.private_note, params.location, params.photo, params.rating, userID]
    );
  }

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };


  return (
    <>
      <Paper shadow="md" p="xl" mt="lg">
        <Title order={2} mb="md">
          Create a note
        </Title>
        {photo && <Image w={200} radius="md" src={photo} alt="Photo" />}

        <form onSubmit={form.onSubmit(formHandler)}>
          <Stack>
            <FileInput
              label="Select photo"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />

            <div>
              <Button
                leftSection={<IconUpload size={14} />}
                onClick={() => fileInputRef.current.click()}
                variant="transparent"
              >
                Upload photo
              </Button>
            </div>

            <TextInput
              withAsterisk
              label="Location"
              {...form.getInputProps('location')}
            />
            <Textarea
              withAsterisk
              label="Note"
              {...form.getInputProps('note')}
            />
            <Textarea
              withAsterisk
              label="Private note"
              {...form.getInputProps('private_note')}
            />

            <Rating
              size="lg"
              {...form.getInputProps('rating')}
            />

          </Stack>
          <Group justify="flex-start" mt="md">
            <Button type="submit" size="md" loading={loading}>
              Publish note
            </Button>
          </Group>
        </form>
      </Paper>
    </>
  );
}
