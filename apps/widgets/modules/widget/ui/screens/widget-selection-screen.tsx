"use client"

import { api } from "@workspace/backend/_generated/api"
import { Id } from "@workspace/backend/_generated/dataModel"
import { Button } from "@workspace/ui/components/button"
import { useMutation } from "convex/react"
import { ConvexError } from "convex/values"
import { useAtomValue, useSetAtom } from "jotai"
import { ChevronRightIcon, MessageSquareCode } from "lucide-react"
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

export const WidgetSelectionScreen = (props: Props) => {
	const [isPending, setIsPending] = React.useState(false)
	const setScreen = useSetAtom(screenAtom)
	const setErrorMessage = useSetAtom(errorMessageAtom)
	const organizationId = useAtomValue(organizationIdAtom)
	const contactSessionId =
		useAtomValue(contactSessionIdAtomFamily(organizationId || "")) || ""
	const createConversation = useMutation(api.public.conversations.create)
	const setConversationId = useSetAtom(conversationIdAtom)

	const handleNewConversation = async () => {
		//  no contact session no orgId, show error
		if (!organizationId) {
			setScreen("error")
			setErrorMessage("Missing Organization ID")
			return
		}
		if (!contactSessionIdAtomFamily) {
			setScreen("auth")
			return
		}
		try {
			setIsPending(true)
			const result = await createConversation({
				contactSessionId: contactSessionId as Id<"contactSessions">,
				organizationId: organizationId,
			})
			setConversationId(result.conversationId)
			setScreen("chat")
		} catch (error) {
			if (error instanceof ConvexError) {
				setErrorMessage(error.message)
			}

			setScreen("error")
		} finally {
			setIsPending(false)
		}
	}
	return (
		<>
			<WidgetHeader>
				<div className="flex flex-col items-start justify-between px-2  gap-y-2 ">
					<h1 className="text-2xl  font-serif font-semibold text-center">
						Hi there 👋
					</h1>
					<p className="text-sm font-semibold text-center  ">
						Let's get you started with Verve AI! Please enter your details below
						to
					</p>
				</div>
			</WidgetHeader>
			<div className="flex flex-col flex-1 items-center justify-center px-2 p-4 gap-y-4 ">
				<Button
					className="w-full h-16 justify-between"
					variant={"outline"}
					onClick={handleNewConversation}
					disabled={isPending}
				>
					<div className="flex items-center  gap-x-2">
						<MessageSquareCode className="w-5 h-5 text-primary" />
						<span className="text-sm font-semibold text-primary">
							Start Chat
						</span>
					</div>
					<ChevronRightIcon className="w-5 h-5 text-primary" />
				</Button>
			</div>
		</>
	)
}
