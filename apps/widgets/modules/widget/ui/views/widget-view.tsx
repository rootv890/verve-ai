"use client"
import React from "react"

import { WidgetAuthScreen } from "../screens/widget-auth-screen"

type Props = {
	organizationId: string
}

export const WidgetView = ({ organizationId }: Props) => {
	return (
		<main className="flex-col items-center justify-center w-full h-full min-h-screen overflow-hidden border rounded-xl bg-muted">
			<WidgetAuthScreen />
			{/* <div className="flex flex-1 "></div>
			Widget View: {organizationId}
			<WidgetFooter /> */}
		</main>
	)
}
