import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP, Poppins } from 'next/font/google'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "手取り計算くん | バイト代・給与の手取り・税金 一発シミュレーター",
    template: "%s | 手取り計算くん",
  },
  description:
    "時給・月給から、社会保険料や所得税・住民税を差し引いた「手取り額」をブラウザ上だけで一発計算。入力データは一切サーバーに送信されず安心して使える無料の給与シミュレーターです。",
  generator: "v0.app",
  keywords: [
    "手取り計算",
    "給与シミュレーター",
    "バイト代 計算",
    "時給 手取り",
    "月給 手取り",
    "社会保険料 計算",
    "所得税 住民税",
    "手取り額 確認",
    "給与 計算 サイト",
  ],
  openGraph: {
    title: "手取り計算くん | 手取り・税金シミュレーター",
    description:
      "時給・月給から手取り額をブラウザ上だけで一発計算。無料・登録不要。",
    type: "website",
    locale: "ja_JP",
    siteName: "手取り計算くん",
    url: "https://tezuri-calc.example.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "手取り計算くん | 手取り・税金シミュレーター",
    description:
      "時給・月給から手取り額をブラウザ上だけで一発計算。無料・登録不要。",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://tezuri-calc.example.com",
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#2563eb',
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "手取り計算くん",
  description:
    "時給・月給から、社会保険料や所得税・住民税を差し引いた「手取り額」をブラウザ上だけで一発計算。入力データは一切サーバーに送信されず安心して使える無料の給与シミュレーターです。",
  url: "https://tezuri-calc.example.com",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "JPY",
  },
  author: {
    "@type": "Organization",
    name: "手取り計算くん",
  },
}

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "計算結果は正確ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "あくまで概算です。実際の手取り額は加入する健康保険組合、扶養状況、年末調整の結果等により異なります。正式な金額は勤務先にご確認ください。",
      },
    },
    {
      "@type": "Question",
      name: "入力データは保存されますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "いいえ、すべての計算はブラウザ上で完結し、サーバーに送信・保存されることはありません。プライバシーを大切にしています。",
      },
    },
    {
      "@type": "Question",
      name: "無料で使えますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい、完全無料・登録不要でご利用いただけます。アプリのインストールも不要です。",
      },
    },
    {
      "@type": "Question",
      name: "なぜ手取りは減るのですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "給与から社会保険料（健康保険・厚生年金・雇用保険・介護保険）と税金（所得税・住民税）が差し引かれるためです。これらは法的に支払いが義務付けられている項目です。",
      },
    },
    {
      "@type": "Question",
      name: "交通費も手取りに含まれますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "通常、通勤手当は非課税のため社会保険料や税金の計算対象外となります。本シミュレーターでは交通費を非課税として計算しています。",
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${poppins.variable} bg-background`}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5931540016126544"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
