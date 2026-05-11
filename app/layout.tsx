import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Gopdfeditor | Free Online PDF Tools & Editor',
  description: 'Gopdfeditor is a free PDF Editor and complete PDF tools website that helps users edit, merge, compress, convert, and manage PDF files online securely and easily.',
  openGraph: {
    title: 'Gopdfeditor | Free Online PDF Tools & Editor',
    description: 'Edit, merge, compress, convert, and manage PDF files online securely and easily.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning className="min-h-screen bg-white font-sans text-slate-900">
        {children}
      </body>
    </html>
  );
}
