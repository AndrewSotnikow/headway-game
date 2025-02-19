import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Who wants to be a millionaire?',
  description: 'Headway test task',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
