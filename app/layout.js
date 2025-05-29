  import { Inter } from 'next/font/google';
  import './globals.css';
  import Header from '@/components/Header';
  import { ConvexClientProvider } from '@/components/convex-client-provider';
  import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

  const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
  });

  export const metadata = {
    title: 'Spliter',
    description: 'The smartest way to split expenses with friends',
  };

  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head>
          <link rel="icon" href="/logos/logo-s.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <ClerkProvider>
            <ConvexClientProvider>
              <Header />
              <main>{children}
                <Toaster richColors/>
              </main>
            </ConvexClientProvider>
          </ClerkProvider>
        </body>
      </html>
    );
  }
