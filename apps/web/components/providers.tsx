"use client"

import { ConvexProvider, ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import * as React from "react"

import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { dark, neobrutalism, shadcn } from "@clerk/themes"
const convexClient = new ConvexReactClient(
	process.env.NEXT_PUBLIC_CONVEX_URL || ""
)

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider appearance={{}}>
			<ConvexProviderWithClerk
				useAuth={useAuth}
				client={convexClient}
			>
				{children}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	)
}
