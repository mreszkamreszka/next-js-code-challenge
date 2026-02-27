import type { Metadata, Viewport } from 'next';
import type { Locale} from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { FavoritesProvider } from '@/ui/contexts/FavoritesContext';

import '@/styles/global.css';

type GenerateMetadataParams = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: GenerateMetadataParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: {
      template: `%s | ${t('title')}`,
      default: t('title'),
    },
    description: t('description'),
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    colorScheme: 'dark light',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#dddddd' },
      { media: '(prefers-color-scheme: dark)', color: '#222222' },
    ],
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <FavoritesProvider>
            <MainLayout>{children}</MainLayout>
          </FavoritesProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
