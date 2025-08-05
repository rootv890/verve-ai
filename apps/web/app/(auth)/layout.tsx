import React from "react"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className="flex justify-center min-h-screen w-full items-center">
			{children}
		</section>
	)
}

export default AuthLayout
