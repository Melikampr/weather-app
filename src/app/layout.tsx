import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import '../styles/globals.css'
import {LocationContextProvider} from "@/context/LocationContext";
import {APIContextProvider} from "@/context/APIContext";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Weather App',
    description: 'Forecast Weather',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className={inter.className}>
        <LocationContextProvider>
            <APIContextProvider>
                {children}
            </APIContextProvider>
        </LocationContextProvider>
        </body>
        </html>
    )
}
