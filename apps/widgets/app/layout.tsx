import { Geist, Geist_Mono } from "next/font/google"

import { Providers } from "@/components/providers"
import "@workspace/ui/globals.css"
import localFont from "next/font/local"

const fontSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
})

const fontSerif = localFont({
	src: "../public/EditorialNew-Regular.woff2",
	variable: "--font-serif",
})

const fontMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<body
				className={`${fontSans.variable} ${fontMono.variable} ${fontSerif.variable} font-sans antialiased `}
				suppressHydrationWarning
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
