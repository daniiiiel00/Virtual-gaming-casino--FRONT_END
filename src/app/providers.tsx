import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { queryClient } from '../shared/lib/query-client';
import { LanguageProvider } from '../shared/lib/i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: '#12211E',
              color: '#F3EFE6',
              border: '1px solid rgba(243, 239, 230, 0.1)',
            }
          }}
        />
      </QueryClientProvider>
    </LanguageProvider>
  );
}
