"use client"

import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button"
import { ConversationStatusIcon } from "@workspace/ui/components/conversation-status-icon"
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger"
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll"
import { usePaginatedQuery } from "convex/react"
import { formatDistanceToNow } from "date-fns"
import { useAtomValue, useSetAtom } from "jotai"
import { ArrowLeftIcon } from "lucide-react"
import React from "react"
import {
	contactSessionIdAtomFamily,
	conversationIdAtom,
	organizationIdAtom,
	screenAtom,
} from "../../atoms/widget-atoms"
import WidgetFooter from "../components/widget-footer"
import WidgetHeader from "../components/widget-header"

type Props = {}

export const WidgetInboxScreen = (props: Props) => {
	const setScreen = useSetAtom(screenAtom)
	const organizationId = useAtomValue(organizationIdAtom)
	const contactSessionId = useAtomValue(
		contactSessionIdAtomFamily(organizationId || "")
	)
	const setConversationId = useSetAtom(conversationIdAtom)
	const conversations = usePaginatedQuery(
		api.public.conversations.getMany,
		contactSessionId ?
			{
				contactSessionId: contactSessionId,
			}
		:	"skip",
		{
			initialNumItems: 10,
		}
	)

	const { canLoadMore, handleLoadMore, isLoadingMore, topElementRef } =
		useInfiniteScroll({
			status: conversations.status,
			loadMore: conversations.loadMore,
			observerEnabled: false,
			loadSize: 10,
		})

	return (
		<>
			<WidgetHeader>
				<div className="flex items-center text-background justify-start px-2 py-6 gap-y-2 ">
					<Button
						variant={"transparent"}
						onClick={() => {
							setScreen("chat")
						}}
					>
						<ArrowLeftIcon className="w-5 h-5 text-background hover:text-primary/70" />
					</Button>
					Inbox
				</div>
			</WidgetHeader>
			<div className="flex flex-col  h-full flex-1 justify-center px-2 py-6 gap-y-2 overflow-y-auto ">
				{conversations.isLoading ?
					<div>Loading...</div>
				: conversations.results?.length > 0 ?
					conversations.results.map((conversation) => (
						<Button
							className="h-20  w-full justify-between"
							key={conversation._id}
							onClick={() => {
								setConversationId(conversation._id)
								setScreen("chat")
							}}
							variant={"outline"}
						>
							<div className="flex w-full flex-col gap-4 overflow-hidden text-start">
								<div className="flex w-full items-center justify-between gap-x-2">
									<p className="text-muted-foreground text-xs">Chat</p>
									<p className="text-muted-foreground text-xs">
										{formatDistanceToNow(new Date(conversation._creationTime))}
									</p>
								</div>

								<div className="flex w-full items-center justify-between gap-x-2">
									<p className="text-foreground  max-w-3/4 truncate text-sm font-semibold">
										{conversation.lastMessage?.text ||
											"Can't find last message"}
									</p>
									<ConversationStatusIcon
										className=" p-1 shrink-0"
										status={conversation.status}
									/>
								</div>
							</div>
						</Button>
					))
				:	<div>No conversations found.</div>}
				<InfiniteScrollTrigger
					canLoadMore={canLoadMore}
					onLoadMore={handleLoadMore}
					ref={topElementRef}
					isLoadingMore={isLoadingMore}
				/>
			</div>
			<div className="flex-1">
				<WidgetFooter />
			</div>
		</>
	)
}
