"use client"

import { BouncyLoading } from "@workspace/ui/components/loadings"
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react"
import { AuthLayout } from "../layouts/auth-layout"
import { SignInView } from "../views/sign-in-view"

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<AuthLoading>
				<AuthLayout>
					<BouncyLoading label="Setting things up!" />
				</AuthLayout>
			</AuthLoading>
			<Authenticated>{children}</Authenticated>
			<Unauthenticated>
				<AuthLayout>
					<SignInView />
				</AuthLayout>
			</Unauthenticated>
		</>
	)
}

export default AuthGuard
