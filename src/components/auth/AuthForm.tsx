'use client';
import React from 'react';
import { Box, Title, Paper, Text, Button, Container, Group, Stack, TextInput, PasswordInput } from '@mantine/core';
import Image from 'next/image';
import { useForm } from '@mantine/form'

export type AuthFormProps = {
  onSubmit: (values) => any;
  isLogIn: boolean;
  secondaryAction: any;
};

export const AuthForm: React.FC<AuthFormProps> = (props) => {
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Must be at least 6 characters' : null)
    },
  })

  const [busy, setBusy] = React.useState(false)

  return (
    <>    
      <Container size="xs" mt="md">
        <Title order={2}>NomadNotes</Title>
        <Paper shadow="md" p="xl" mt="lg">
          <Title order={2} mb="md">
            {props.title}
          </Title>
          <form onSubmit={form.onSubmit(props.onSubmit)}>
            <Stack>
              <TextInput
                withAsterisk
                label="Email"
                placeholder="me@mydomain.com"
                {...form.getInputProps('email')}
              />
              <PasswordInput
                withAsterisk
                label="Password"
                placeholder="**********"
                {...form.getInputProps('password')}
              />
            </Stack>
            <Group justify="flex-end" mt="md">
              <Button variant="transparent" size="md" onClick={props.secondaryAction.onClick}>
                {props.secondaryAction.title}
              </Button>
              <Button type="submit" size="md" loading={busy}>
                {props.title}
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </>
  )
};
