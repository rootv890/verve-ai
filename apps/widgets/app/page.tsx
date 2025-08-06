"use client"
import { WidgetView } from "@/modules/widget/ui/views/widget-view"
import React, { Suspense } from "react"

type Props = {
	searchParams: Promise<{
		organizationId: string
	}>
}

const WidgetPage = ({ searchParams }: Props) => {
	const { organizationId } = React.use(searchParams)
	return (
		<Suspense fallback={<div>fetching org...</div>}>
			<WidgetView organizationId={organizationId} />
		</Suspense>
	)
}

export default WidgetPage
