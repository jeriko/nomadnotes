'use client';
import React from 'react';
import { useSupabase } from '@/components/providers/SystemProvider';
import { usePowerSync, usePowerSyncWatchedQuery } from '@journeyapps/powersync-react';
import { useRouter } from 'next/navigation';
import { Button, TextInput, FileInput, Image, Title, Paper } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

export default function ProfilePage() {
  const powerSync = usePowerSync();
  const supabase = useSupabase();
  const router = useRouter();
  const [profileName, setProfileName] = React.useState('');
  const [profilePhoto, setProfilePhoto] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const fileInputRef = React.useRef(null);

  React.useEffect(() => {
    const fetch = async () => {
      const session = await supabase?.client.auth.getSession();
      const userID = session?.data.session?.user?.id;

      const profiles = await powerSync.getAll(`select * from user_profiles where owner_id = '${userID}'`);
      setProfileName(profiles[0].name)
      setProfilePhoto(profiles[0].photo)
    }

    fetch()
  }, [])

  const save = async () => {
    setLoading(true)
    
    const session = await supabase?.client.auth.getSession();
    const userID = session?.data.session?.user?.id;

    // getting an "undefined is not a function" when using the "?" syntax
    const result = await powerSync.execute(
      `UPDATE user_profiles set name='${profileName}', photo='${profilePhoto}' where owner_id='${userID}'`,
    )

    setLoading(false)
    
    notifications.show({
      title: 'Your profile was updated',
    })
  }

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Paper shadow="md" p="xl" mt="lg">
        <Title order={2} mb="md">
          My Profile
        </Title>

        <TextInput mt="lg" mb="lg" label="Username" value={profileName} onChange={(event) => setProfileName(event.currentTarget.value)} />
        
        {profilePhoto && <Image w={200} radius="md" src={profilePhoto} alt="Profile" />}
        
        <FileInput
          label="Select profile photo"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />

        <Button
          leftSection={<IconUpload size={14} />}
          onClick={() => fileInputRef.current.click()}
          variant="transparent"
        >
          Upload photo
        </Button>
        
        <div>
          <Button onClick={save} loading={loading} size="md" mt="lg">Save</Button>
        </div>
      </Paper>
    </>
  );
}
