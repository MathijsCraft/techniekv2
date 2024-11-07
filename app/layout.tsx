import type { Metadata } from 'next';
import { Providers } from '@/components/providers/session';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Dashboard Techniek Team',
  description: 'Dashboard voor techniek team van het Jacob van Liesveldt',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='nl'>
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
