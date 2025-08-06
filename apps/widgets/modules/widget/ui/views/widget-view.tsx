"use client"
import React from "react"
import WidgetFooter from "../components/widget-footer"
import WidgetHeader from "../components/widget-header"

type Props = {
	organizationId: string
}

export const WidgetView = ({ organizationId }: Props) => {
	return (
		<main className="flex-col items-center justify-center w-full h-full min-h-screen overflow-hidden border rounded-xl bg-muted">
			<WidgetHeader>
				<div className="flex flex-col items-start justify-between px-2 py-6 gap-y-2 ">
					<h1 className="text-2xl font-bold text-center">Widget Header</h1>
					<p className="text-sm font-semibold text-center ">
						How can we help you today?
					</p>
				</div>
			</WidgetHeader>
			<div className="flex flex-1 "></div>
			Widget View: {organizationId}
			<WidgetFooter />
		</main>
	)
}
