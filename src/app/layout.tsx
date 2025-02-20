import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/global.scss';
import { ReactNode } from 'react';

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
      <body className={interFont.variable}>{children}</body>
    </html>
  );
}
