import type { Metadata } from 'next'
import { Bebas_Neue, Outfit } from 'next/font/google'

import LoadingBar from '@/components/ui/loading-bar'

import { ThemeProvider } from '@/components/theme-provider'

import { siteConfig } from '@/constant/config'

import '../styles/globals.css'

const bebasNeue = Bebas_Neue({
    variable: '--font-bebas-neue',
    weight: '400',
    subsets: ['latin'],
})

const outfit = Outfit({
    variable: '--font-outfit',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.title}`,
    },
    description: siteConfig.description,
    icons: {
        icon: [
            {
                url: '/yellow-theme/favicon-16x16.png',
                sizes: '16x16',
                type: 'image/png',
            },
            {
                url: '/yellow-theme/favicon-32x32.png',
                sizes: '32x32',
                type: 'image/png',
            },
        ],
        apple: [{ url: '/yellow-theme/apple-touch-icon.png' }],
        other: [
            {
                url: '/yellow-theme/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                url: '/yellow-theme/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en' suppressHydrationWarning={true}>
            <body
                className={`${bebasNeue.variable} ${outfit.variable} antialiased`}
            >
                <ThemeProvider
                    attribute='class'
                    defaultTheme='dark'
                    enableSystem
                    disableTransitionOnChange
                >
                    <LoadingBar color='#facc15' />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
