import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FixCarKeys - Professional Car Key Services',
  description: 'Professional car key cutting, programming, and replacement services for all vehicle makes and models.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <FloatingButtons />
        <Footer />
      </body>
    </html >
  );
}
