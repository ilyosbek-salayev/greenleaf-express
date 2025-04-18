import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import ClientProviders from '@/components/shared/client-providers'
import { getDirection } from '@/i18n-config'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { getSetting } from '@/lib/actions/setting.actions'
import { cookies } from 'next/headers'
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export async function generateMetadata() {
  const {
    site: { slogan, name, description, url },
  } = await getSetting()
  return {
    title: {
      template: `%s | ${name}`,
      default: `${name}. ${slogan}`,
    },
    description: description,
    metadataBase: new URL(url),

    openGraph: {
      title: `${name} | ${slogan}`,
      description: description,
      url: url,
      siteName: name,
      type: 'website',
      images: [
        {
          url: `${url}/burgut.jpg`, // Saytingiz uchun maxsus Open Graph rasm
          width: 1200,
          height: 630,
          alt: `${name} banner image`,
        },
      ],
    },

    Twitter: {
      card: 'summary_large_image',
      site: '@your_twitter_handle', // O'z Twitteringizni qo'shing
      title: `${name} | ${slogan}`,
      description: description,
      images: [`${url}/burgut.jpg`], // Twitter uchun maxsus rasm
    },

    alternates: {
      canonical: url,
    },

    keywords: ['your', 'main', 'keywords', 'SEO', 'optimized'],

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
      },
    }


  }
}

export default async function AppLayout({
  params,
  children,
}: {
  params: { locale: string }
  children: React.ReactNode
}) {
  const setting = await getSetting()
  const currencyCookie = (await cookies()).get('currency')
  const currency = currencyCookie ? currencyCookie.value : 'USD'

  const { locale } = await params
  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }
  const messages = await getMessages()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Greenleaf Express",
    "url": "https://greenleaf-express.uz",
    "description": "greenleaf mahsulotlari uyingizga boradi",
    "image": "https://greenleaf-express.uz/burgut.jpg",
    "sameAs": [
      "https://facebook.com/greenleaf-express",
      "https://twitter.com/greenleaf-express",
      "https://instagram.com/greenleaf-express"
    ]
  }

  return (


    <html
      lang={locale}
      dir={getDirection(locale) === 'rtl' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientProviders setting={{ ...setting, currency }}>
            {children}
            <SpeedInsights />
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
