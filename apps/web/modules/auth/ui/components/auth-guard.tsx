"use client"
import AuthenticationWrapper from "@/app/(auth)/layout"
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react"
import { SignInView } from "../views/sign-in-view"

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<AuthLoading>
				<AuthenticationWrapper>
					<h2>Loading...</h2>
				</AuthenticationWrapper>
			</AuthLoading>
			<Authenticated>{children}</Authenticated>
			<Unauthenticated>
				<AuthenticationWrapper>
					<SignInView />
				</AuthenticationWrapper>
			</Unauthenticated>
		</>
	)
}

export default AuthGuard
