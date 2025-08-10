"use client"
import React from "react"

import { useAtomValue } from "jotai"
import { Inbox } from "lucide-react"
import { screenAtom } from "../../atoms/widget-atoms"
import { WidgetAuthScreen } from "../screens/widget-auth-screen"
import { WidgetChatScreen } from "../screens/widget-chat-screen"
import WidgetErrorScreen from "../screens/widget-error-screen"
import { WidgetInboxScreen } from "../screens/widget-inbox-screen"
import { WidgetLoadingScreen } from "../screens/widget-loading-screen"
import { WidgetSelectionScreen } from "../screens/widget-selection-screen"

type Props = {
	organizationId: string | null
}

export const WidgetView = ({ organizationId }: Props) => {
	const screen = useAtomValue(screenAtom)
	const screenComponent = {
		error: <WidgetErrorScreen />,
		loading: <WidgetLoadingScreen organizationId={organizationId} />,
		auth: <WidgetAuthScreen />,
		selection: <WidgetSelectionScreen />,
		chat: <WidgetChatScreen />,
		inbox: <WidgetInboxScreen />,
		voice: <div>Voice Screen</div>,
		success: <div>Success Screen</div>,
		contact: <div>Contact Screen</div>,
	}
	return (
		<main className="flex-col items-center justify-between w-full h-full min-h-screen  overflow-hidden border rounded-xl bg-background">
			{screenComponent[screen] || <div>Unknown Screen</div>}
		</main>
	)
}
