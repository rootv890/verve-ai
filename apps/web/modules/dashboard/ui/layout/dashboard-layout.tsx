import AuthGuard from "@/modules/auth/ui/components/auth-guard"
import OrganizationGuard from "@/modules/auth/ui/components/org-guard"
import { SidebarProvider } from "@workspace/ui/components/sidebar"
import { Provider as JotaiProvider } from "jotai/react"
import { cookies } from "next/headers"
import React from "react"
import { DashboardSidebar } from "../components/dashboard-sidebar"
type Props = {
	children?: React.ReactNode
}

const DashBoardLayout = async ({ children }: Props) => {
	const cookieStore = await cookies()
	// to avoid hydration mismatch, we read the cookie on the server side and pass the value to the provider
	const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
	return (
		<AuthGuard>
			<JotaiProvider>
				<OrganizationGuard>
					<SidebarProvider defaultOpen={defaultOpen}>
						<DashboardSidebar />
						<main className="flex flex-col flex-1">{children}</main>
					</SidebarProvider>
				</OrganizationGuard>
			</JotaiProvider>
		</AuthGuard>
	)
}

export default DashBoardLayout
