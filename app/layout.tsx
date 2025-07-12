import type { Metadata } from 'next';
import './globals.css';
import Body from '@/components/Body';

export const metadata: Metadata = {
  title: 'Test Next App',
  description:
    'This is a simple Next.js application, intended for technical tests of frontend capabilities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Body>{children}</Body>
    </html>
  );
}
