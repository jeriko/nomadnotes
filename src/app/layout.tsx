import React from 'react';
import type { Metadata } from 'next';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript, MantineProvider, Loader } from '@mantine/core'
import { DynamicSystemProvider } from '@/components/providers/DynamicSystemProvider';
import { Notifications } from '@mantine/notifications';

export const metadata: Metadata = {
  title: 'Nomad Notes',
  description: 'A travel journal app using PowerSync'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body style={{ backgroundColor: '#eee' }}>
        <DynamicSystemProvider>
          <MantineProvider>
            <Notifications />
            {children}
          </MantineProvider>
        </DynamicSystemProvider>
      </body>
    </html>
  );
}
