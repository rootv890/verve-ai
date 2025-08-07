"use client"
import React from "react"

import { useAtomValue } from "jotai"
import { screenAtom } from "../../atoms/widget-atoms"
import { WidgetAuthScreen } from "../screens/widget-auth-screen"

type Props = {
	organizationId: string
}

export const WidgetView = ({ organizationId }: Props) => {
	const screen = useAtomValue(screenAtom)
	const screenComponent = {
		error: <div>Error loading screen</div>,
		loading: <div>Loading...</div>,
		auth: <WidgetAuthScreen />,
		inbox: <div>Inbox Screen</div>,
		chat: <div>Chat Screen</div>,
		voice: <div>Voice Screen</div>,
		success: <div>Success Screen</div>,
		selection: <div>Selection Screen</div>,
		contact: <div>Contact Screen</div>,
	}
	return (
		<main className="flex-col items-center justify-center w-full h-full min-h-screen overflow-hidden border rounded-xl bg-muted">
			{screenComponent[screen] || <div>Unknown Screen</div>}
			{/* Additional content can be added here */}
			<div className="mt-4 text-center">
				<p>Organization ID: {organizationId}</p>
			</div>
		</main>
	)
}
