'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/components/providers/SystemProvider';
import { DEFAULT_ENTRY_ROUTE } from '@/components/Routes';
import { AuthForm } from '@/components/auth/AuthForm';

export default function Login() {
  const router = useRouter();
  const supabase = useSupabase();

  return (
    <AuthForm
      title="Log in"
      onSubmit={async (values, e) => {
        if (!supabase) {
          throw new Error('Supabase has not been initialized yet');
        }
        await supabase.login(values.email, values.password);
        router.push(DEFAULT_ENTRY_ROUTE);
      }}
      secondaryAction={{ title: 'Register', onClick: () => router.push('/auth/register') }}
    />
  );
}
