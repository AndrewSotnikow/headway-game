import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/global.scss';
import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '@/components/ErrorFallback/ErrorFallback';

const interFont = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Who wants to be a millionaire?',
  description: 'Headway test task',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={interFont.variable}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </ErrorBoundary>
      </body>
    </html>
  );
}
