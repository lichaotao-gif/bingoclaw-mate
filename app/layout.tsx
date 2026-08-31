import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BingoMate 缤果学伴',
  description: '让每一次提问，都成为看得见的成长。',
  openGraph: {
    title: 'BingoMate 缤果学伴',
    description: '让每一次提问，都成为看得见的成长。',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BingoMate 缤果学伴',
    description: '让每一次提问，都成为看得见的成长。',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
