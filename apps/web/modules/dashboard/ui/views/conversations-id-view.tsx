"use client"
import { toUIMessages, useThreadMessages } from "@convex-dev/agent/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@workspace/backend/_generated/api"
import { Doc, Id } from "@workspace/backend/_generated/dataModel"
import {
	Conversation as AIConversation,
	ConversationContent as AIConversationContent,
	ConversationScrollButton as AIConversationScrollButton,
} from "@workspace/ui/components/ai-elements/conversation"
import {
	AIInput,
	AIInputButton,
	AIInputSubmit,
	AIInputTextarea,
	AIInputToolbar,
	AIInputTools,
} from "@workspace/ui/components/ai-elements/input"
import {
	Message as AIMessage,
	MessageContent as AIMessageContent,
} from "@workspace/ui/components/ai-elements/message"
import { Response as AIResponse } from "@workspace/ui/components/ai-elements/response"
import { Button } from "@workspace/ui/components/button"
import { ConversationStatusIcon } from "@workspace/ui/components/conversation-status-icon"
import { DicebarAvatar } from "@workspace/ui/components/dicebar-avatar"
import { Form, FormField } from "@workspace/ui/components/form"
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger"
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll"
import { cn } from "@workspace/ui/lib/utils"
import { useAction, useMutation, useQuery } from "convex/react"
import { MoreHorizontalIcon, Wand2Icon } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ca } from "zod/v4/locales"
import { ConversationIdViewLoading } from "../components/conversation-id-view-loading"
import { ConversationStatusDropdown } from "../components/conversation-status-dropdown"
type Props = {
	conversationId: string
}

const formSchema = z.object({
	message: z.string().min(1, "Message is required"),
})

export function ConversationIdView({ conversationId }: Props) {
	const [isUpdatingStatus, setIsUpdatingStatus] = React.useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: "",
		},
	})
	const [isEnhancing, setIsEnhancing] = React.useState(false)
	const enhanceResponse = useAction(api.private.messages.enhanceResponse)
	const handleEnhanceResponse = async () => {
		const currentPrompt = form.getValues("message")
		setIsEnhancing(true)
		try {
			const response = await enhanceResponse({
				prompt: currentPrompt,
			})
			form.setValue("message", response)
		} catch (error) {
			// TODO: react-hot-toast
			console.error("Failed to enhance response:", error)
		} finally {
			setIsEnhancing(false)
		}
	}

	const createMessage = useMutation(api.private.messages.create)

	const conversations = useQuery(api.private.conversations.getOne, {
		conversationId: conversationId as Id<"conversations">,
	})
	const messages = useThreadMessages(
		api.private.messages.getMany,
		conversations?.threadId ?
			{
				threadId: conversations.threadId,
			}
		:	"skip",
		{
			initialNumItems: 10,
		}
	)

	const {
		canLoadMore,
		handleLoadMore,
		isLoadingFirstPage,
		isLoadingMore,
		topElementRef,
	} = useInfiniteScroll({
		status: messages.status,
		loadMore: messages.loadMore,
		loadSize: 12,
		observerEnabled: true,
	})

	const handleOnSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			await createMessage({
				prompt: data.message,
				conversationId: conversationId as Id<"conversations">,
			})
			// form reset
			form.reset()
		} catch (error) {
			// TODO : react-hot-toast
			console.error("Failed to create message:", error)
		}
	}

	const updateConversationStatus = useMutation(
		api.private.conversations.udpateStatus
	)
	const handleStatusChange = async (
		newStatus: Doc<"conversations">["status"]
	) => {
		if (!conversations || newStatus === conversations.status) return
		setIsUpdatingStatus(true)
		try {
			await updateConversationStatus({
				conversationId: conversationId as Id<"conversations">,
				status: newStatus,
			})
		} catch (error) {
			// todo: react hot toast
			console.error("Failed to update conversation status:", error)
		} finally {
			setIsUpdatingStatus(false)
		}
	}

	if (conversations === undefined /* meaning still loading */) {
		return <ConversationIdViewLoading />
	}

	return (
		<div className="flex max-h-screen h-full flex-1 flex-col justify-between bg-muted/50">
			<header className="flex items-center justify-between border-b bg-background p-2.5">
				<Button variant={"ghost"}>
					<MoreHorizontalIcon className="h-4 w-4" />
				</Button>
				{!!conversations && (
					<ConversationStatusDropdown
						status={conversations.status}
						onStatusChange={handleStatusChange}
						disabled={isUpdatingStatus}
					/>
				)}
			</header>
			<AIConversation className="max-h-[calc(100vh-180px)]">
				<AIConversationContent className="p-4">
					<InfiniteScrollTrigger
						canLoadMore={canLoadMore}
						isLoadingMore={isLoadingMore}
						onLoadMore={handleLoadMore}
						ref={topElementRef}
					/>
					{toUIMessages(messages.results ?? []).map((message) => (
						<AIMessage
							key={message.id}
							// we are watching from assistant perspective
							// we are the assistant / support agent
							// user = means the agents or the support team
							from={message.role === "assistant" ? "user" : "assistant"}
						>
							<AIMessageContent className={cn("rounded-xl font-sans ")}>
								<AIResponse className="rounded-md font-sans ">
									{(message as any).content}
								</AIResponse>
							</AIMessageContent>
							<DicebarAvatar
								seed={conversations?.threadId ?? "default_seed"}
								size={32}
							/>
						</AIMessage>
					))}
				</AIConversationContent>
				<AIConversationScrollButton />
			</AIConversation>
			{/* form */}
			<div className="p-2">
				<Form {...form}>
					<AIInput onSubmit={form.handleSubmit(handleOnSubmit)}>
						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<AIInputTextarea
									{...field}
									placeholder={
										conversations?.status === "resolved" ?
											"Conversation has ended"
										:	"Type your response here as operator..."
									}
									disabled={
										conversations?.status === "resolved" ||
										form.formState.isSubmitting ||
										isEnhancing
									}
									onChange={field.onChange}
									onKeyDown={(e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault()
											form.handleSubmit(handleOnSubmit)
										}
									}}
								/>
							)}
						/>
						<AIInputToolbar>
							<AIInputTools>
								<AIInputButton
									type="button"
									disabled={
										conversations?.status === "resolved" ||
										form.formState.isSubmitting ||
										!form.formState.isValid ||
										isEnhancing
									}
									onClick={handleEnhanceResponse}
									title="Enhance Response"
								>
									<Wand2Icon
										className={cn("h-4 w-4", isEnhancing && "animate-ping")}
									/>
									{isEnhancing ? "Enhancing..." : "Enhance Response"}
								</AIInputButton>
							</AIInputTools>
							<AIInputSubmit
								disabled={
									conversations?.status === "resolved" ||
									!form.formState.isValid ||
									form.formState.isSubmitting ||
									isEnhancing
								}
							/>
						</AIInputToolbar>
					</AIInput>
				</Form>
			</div>
		</div>
	)
}
