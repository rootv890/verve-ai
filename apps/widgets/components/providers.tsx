"use client"

import { ConvexProvider, ConvexReactClient } from "convex/react"
import { Provider as JotaiProvider } from "jotai"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import * as React from "react"
const convexClient = new ConvexReactClient(
	process.env.NEXT_PUBLIC_CONVEX_URL || ""
)

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ConvexProvider client={convexClient}>
			<NextThemesProvider
				attribute="class"
				enableSystem={false}
				disableTransitionOnChange
				enableColorScheme
			>
				<JotaiProvider>{children}</JotaiProvider>
			</NextThemesProvider>
		</ConvexProvider>
	)
}
