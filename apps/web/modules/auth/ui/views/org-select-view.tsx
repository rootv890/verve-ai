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
			<CardHeader className="gap-0">
				<h2 className="font-serif text-2xl font-semibold leading-snug">
					No Organization Found
				</h2>
				<p className="mb-6 text-sm text-muted-foreground ">
					Please create or join an organization to access this feature.
				</p>
			</CardHeader>
			<CardContent className="leading-none">
				<OrganizationList
					hidePersonal
					skipInvitationScreen
					afterCreateOrganizationUrl={"/"}
					afterSelectOrganizationUrl={"/"}
					appearance={{
						elements: {
							headerTitle: "text-2xl! font-semibold! font-serif! leading-snug!",
						},
					}}
				/>
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	)
}

export default OrganizationSelectListView
