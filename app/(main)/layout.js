import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://fixcarkeys.co.uk'),
  title: {
    default: 'FixCarKeys - Professional Car Key Services',
    template: '%s | FixCarKeys'
  },
  description: 'Professional car key cutting, programming, and replacement services for all vehicle makes and models.',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://fixcarkeys.co.uk',
    siteName: 'FixCarKeys',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Navbar />
        <main style={{ overflowX: 'hidden' }}>{children}</main>
        <FloatingButtons />
        <Footer />
      </body>
    </html >
  );
}
