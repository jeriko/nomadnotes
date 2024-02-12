import React from 'react';
import type { Metadata } from 'next';
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, Loader } from '@mantine/core'
import { DynamicSystemProvider } from '@/components/providers/DynamicSystemProvider';

export const metadata: Metadata = {
  title: 'Travel app',
  description: 'A travel log app using PowerSync'
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
            {children}
          </MantineProvider>
        </DynamicSystemProvider>
      </body>
    </html>
  );
}
