import { OrganizationList } from "@clerk/nextjs"
import React from "react"

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@workspace/ui/components/card"

const OrganizationSelectListView = () => {
	return (
		<Card className="min-w-sm w-fit">
			<CardHeader>
				<h2 className="text-lg font-semibold">No Organization Found</h2>
			</CardHeader>
			<CardContent className="">
				<p className="mb-6 text-sm text-muted-foreground ">
					Please create or join an organization to access this feature.
				</p>
				<OrganizationList
					hidePersonal
					skipInvitationScreen
					afterCreateOrganizationUrl={"/"}
					afterSelectOrganizationUrl={"/"}
				/>
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	)
}

export default OrganizationSelectListView
