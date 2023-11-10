import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import '../styles/globals.css'
import {LocationContextProvider} from "@/context/LocationContext";

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
        <body className={inter.className}>
        <LocationContextProvider>
            {children}
        </LocationContextProvider>
        </body>
        </html>
    )
}
