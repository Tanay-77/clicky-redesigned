import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Clicky - Your computer. Controlled by AI.',
  description: 'Clicky executes tasks by clicking, typing, and navigating your computer — just from your instructions.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased text-[14px]" suppressHydrationWarning>{children}</body>
    </html>
  );
}
