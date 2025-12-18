import '../globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Admin Panel - FixCarKeys',
    description: 'Admin panel for managing FixCarKeys website content',
};

export default function AdminLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning style={{ margin: 0, padding: 0 }}>
                {children}
            </body>
        </html>
    );
}
