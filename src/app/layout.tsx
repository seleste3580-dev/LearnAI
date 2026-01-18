import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import PWARegister from '@/components/PWARegister';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorLoggerInit from '@/components/ErrorLoggerInit';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'LearnAI',
  description: 'Your personal AI-powered learning and mentoring platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5a3" />
        <link rel="icon" href="/icons/icon-192.svg" />
      </head>
      <body className={cn('font-body antialiased min-h-screen')}>
        <ErrorBoundary>
          <ErrorLoggerInit />
          {children}
        </ErrorBoundary>
        <Toaster />
        {/* Registers the service worker on client */}
        <PWARegister />
        <SpeedInsights />
      </body>
    </html>
  );
}
