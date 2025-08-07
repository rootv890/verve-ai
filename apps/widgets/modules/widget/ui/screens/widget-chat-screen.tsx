"use client"

import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button"
import { useQuery } from "convex/react"
import { useAtomValue, useSetAtom } from "jotai"
import { ArrowLeftIcon, MenuIcon } from "lucide-react"
import React from "react"
import {
	contactSessionIdAtomFamily,
	conversationIdAtom,
	errorMessageAtom,
	organizationIdAtom,
	screenAtom,
} from "../../atoms/widget-atoms"
import WidgetHeader from "../components/widget-header"

type Props = {}

export const WidgetChatScreen = (props: Props) => {
	const setScreen = useSetAtom(screenAtom)
	const conversationId = useAtomValue(conversationIdAtom)
	const setConversationId = useSetAtom(conversationIdAtom)
	const organizationId = useAtomValue(organizationIdAtom)
	const contactSessionId = useAtomValue(
		contactSessionIdAtomFamily(organizationId || "")
	)

	const conversation = useQuery(
		api.public.conversations.getOne,
		conversationId && contactSessionId ?
			{
				conversationId: conversationId,
				contactSessionId: contactSessionId,
			}
		:	"skip"
	)

	// on back
	const handleBack = () => {
		setConversationId(null)
		setScreen("selection")
	}
	return (
		<>
			<WidgetHeader className="flex h-fit items-center justify-between ">
				<div className="flex text-foreground items-center justify-between px-2  gap-x-2 ">
					<Button
						size={"icon"}
						variant={"transparent"}
						onClick={handleBack}
					>
						<ArrowLeftIcon />
					</Button>
					<p className="text-sm ">Chat</p>
				</div>
				<div className="flex items-center gap-x-2">
					<Button
						size={"icon"}
						variant={"transparent"}
					>
						<MenuIcon />
					</Button>
				</div>
			</WidgetHeader>
			<div className="flex flex-col px-2 py-6 gap-y-2 ">
				<p className="text-sm ">
					{JSON.stringify(conversation, null, 2) || "No conversation data"}
				</p>
			</div>
		</>
	)
}
