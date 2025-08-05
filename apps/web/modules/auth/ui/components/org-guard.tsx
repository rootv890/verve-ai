"use client"

import { useOrganization } from "@clerk/nextjs"
import React from "react"
import { AuthLayout } from "../layouts/auth-layout"
import OrganizationSelectListView from "../views/org-select-view"

const OrganizationGuard = ({ children }: { children: React.ReactNode }) => {
	const { organization } = useOrganization()
	if (!organization) {
		return (
			<AuthLayout>
				<OrganizationSelectListView />
			</AuthLayout>
		)
	}
	return <>{children}</>
}

export default OrganizationGuard
