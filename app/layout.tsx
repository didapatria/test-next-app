import type { Metadata } from 'next';
import './globals.css';

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
      <body className="bg-slate-50">{children}</body>
    </html>
  );
}
