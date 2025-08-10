"use client"
import { toUIMessages, useThreadMessages } from "@convex-dev/agent/react"
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { api } from "@workspace/backend/_generated/api"
import { Id } from "@workspace/backend/_generated/dataModel"
import {
	AIConversation,
	AIConversationContent,
} from "@workspace/ui/components/ai/conversation"
import {
	AIInput,
	AIInputSubmit,
	AIInputTextarea,
	AIInputToolbar,
} from "@workspace/ui/components/ai/input"
import {
	AIMessage,
	AIMessageContent,
} from "@workspace/ui/components/ai/message"
import { AIResponse } from "@workspace/ui/components/ai/response"
import { Button } from "@workspace/ui/components/button"
import { DicebarAvatar } from "@workspace/ui/components/dicebar-avatar"
import { Form, FormField } from "@workspace/ui/components/form"
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger"
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll"
import { useAction, useQuery } from "convex/react"
import { useAtomValue, useSetAtom } from "jotai"
import { ArrowLeftIcon, MenuIcon } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
	contactSessionIdAtomFamily,
	conversationIdAtom,
	errorMessageAtom,
	organizationIdAtom,
	screenAtom,
} from "../../atoms/widget-atoms"
import WidgetHeader from "../components/widget-header"

type Props = {}

const formSchema = z.object({
	message: z
		.string({
			message: "Message cannot be empty",
		})
		.min(1)
		.max(1000),
})

export const WidgetChatScreen = (props: Props) => {
	const setScreen = useSetAtom(screenAtom)
	const conversationId = useAtomValue(conversationIdAtom)
	const setConversationId = useSetAtom(conversationIdAtom)
	const setErrorMessage = useSetAtom(errorMessageAtom)
	const organizationId = useAtomValue(organizationIdAtom)
	const contactSessionId = useAtomValue(
		contactSessionIdAtomFamily(organizationId || "")
	)

	// Validate that conversationId is a proper Convex ID
	const isValidConversationId =
		conversationId &&
		typeof conversationId === "string" &&
		conversationId.length > 0

	const conversation = useQuery(
		api.public.conversations.getOne,
		isValidConversationId && contactSessionId ?
			{
				conversationId: conversationId as Id<"conversations">,
				contactSessionId: contactSessionId,
			}
		:	"skip"
	)

	// Handle invalid conversation ID on component mount
	React.useEffect(() => {
		if (conversationId && !isValidConversationId) {
			setErrorMessage("Invalid conversation ID")
			setScreen("error")
		}
	}, [conversationId, isValidConversationId, setErrorMessage, setScreen])

	console.log("Debug values:", {
		conversationId,
		contactSessionId,
		organizationId,
		conversation,
		isValidConversationId,
		isSkipped: !(isValidConversationId && contactSessionId),
	})

	// on back
	const handleBack = () => {
		setConversationId(null)
		setScreen("selection")
	}

	const messages = useThreadMessages(
		api.public.messages.getMany,
		conversation?.threadId && contactSessionId ?
			{
				threadId: conversation.threadId,
				contactSessionId: contactSessionId,
			}
		:	"skip",
		{
			initialNumItems: 10,
		}
	)

	const {
		canLoadMore,
		handleLoadMore,
		isExhausted,
		isLoadingFirstPage,
		isLoadingMore,
		topElementRef,
	} = useInfiniteScroll({
		status: messages.status,
		loadMore: messages.loadMore,
		observerEnabled: true,
		loadSize: 10, // Load 10 items at a time
	})

	// Define Form
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: "",
		},
	})

	// createMessage
	const create_message = useAction(api.public.messages.create)
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		if (!conversation || !contactSessionId) return
		form.reset()
		await create_message({
			contactSessionId: contactSessionId,
			threadId: conversation.threadId,
			prompt: values.message,
		})
	}

	return (
		<div className="flex flex-col bg-background justify-between w-screen h-screen">
			<WidgetHeader className="flex h-fit items-center justify-between flex-shrink-0">
				<div className="flex text-foreground items-center justify-between px-2 gap-x-2">
					<Button
						size={"icon"}
						variant={"transparent"}
						onClick={handleBack}
					>
						<ArrowLeftIcon />
					</Button>
					<p className="text-sm">Chat</p>
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

			{/* Conversation area - takes remaining space and is scrollable */}
			<div className="flex-1 min-h-0">
				<AIConversation className="size-full">
					<AIConversationContent className="size-full">
						<div className="w-full ">
							<InfiniteScrollTrigger
								canLoadMore={canLoadMore}
								onLoadMore={handleLoadMore}
								ref={topElementRef}
								isLoadingMore={isLoadingMore}
								// className="flex w-full justify-center"
							/>
						</div>
						{toUIMessages(messages.results ?? [])?.map((message) => {
							return (
								<AIMessage
									from={message.role === "user" ? "user" : "assistant"}
									key={message.id}
								>
									<AIMessageContent>
										<AIResponse>{message.content}</AIResponse>
									</AIMessageContent>
									{message.role === "assistant" && (
										<DicebarAvatar
											seed={message.role}
											size={40}
											badgeImageUrl={"/logo.png"}
										/>
									)}
								</AIMessage>
							)
						})}
					</AIConversationContent>
				</AIConversation>
			</div>

			{/* Input area - pinned to bottom */}
			<div className="flex-shrink-0 border-t ">
				<Form {...form}>
					<AIInput
						className="rounded-none border-0"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							control={form.control}
							disabled={
								conversation?.status === "resolved" ||
								!conversation ||
								!contactSessionId
							}
							name="message"
							render={({ field }) => (
								<AIInputTextarea
									disabled={
										conversation?.status === "resolved" ||
										!conversation ||
										!contactSessionId
									}
									onChange={field.onChange}
									value={field.value}
									onKeyDown={(e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault()
											form.handleSubmit(onSubmit)()
										}
									}}
									placeholder={
										conversation?.status === "resolved" ?
											"This conversation is resolved. You can no longer send messages."
										:	"Type your message here..."
									}
								/>
							)}
						/>
						<AIInputToolbar>
							<AIInputToolbar />
							<AIInputSubmit
								status="ready"
								disabled={
									conversation?.status === "resolved" ||
									!form.formState.isValid ||
									!conversation ||
									!contactSessionId
								}
							/>
						</AIInputToolbar>
					</AIInput>
				</Form>
			</div>
		</div>
	)
}
