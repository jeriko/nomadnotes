'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/components/providers/SystemProvider';
import { DEFAULT_ENTRY_ROUTE } from '@/components/Routes';
import { AuthForm } from '@/components/auth/AuthForm';

export default function Register() {
  const router = useRouter();
  const supabase = useSupabase();

  return (
    <AuthForm
      title="Register"
      onSubmit={async ({ email, password }) => {
        if (!supabase) {
          throw new Error('Supabase has not been initialized yet');
        }
        const {
          data: { session },
          error
        } = await supabase.client.auth.signUp({ email, password });
        if (error) {
          throw new Error(error.message);
        }

        if (session) {
          supabase.updateSession(session);
          router.push(DEFAULT_ENTRY_ROUTE);
          return;
        }

        // TODO better dialog
        alert('Registration successful, please login');
        router.back();
      }}
      secondaryAction={{ title: 'Log in', onClick: () => router.push('/auth/login') }}
    />
  );
}
