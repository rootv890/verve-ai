"use client"
import { toUIMessages, useThreadMessages } from "@convex-dev/agent/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@workspace/backend/_generated/api"
import { Id } from "@workspace/backend/_generated/dataModel"
import {
	AIConversation,
	AIConversationContent,
	AIConversationScrollButton,
} from "@workspace/ui/components/ai/conversation"
import {
	AIInput,
	AIInputButton,
	AIInputSubmit,
	AIInputTextarea,
	AIInputToolbar,
	AIInputTools,
} from "@workspace/ui/components/ai/input"
import {
	AIMessage,
	AIMessageContent,
} from "@workspace/ui/components/ai/message"
import { AIResponse } from "@workspace/ui/components/ai/response"
import { Button } from "@workspace/ui/components/button"
import { DicebarAvatar } from "@workspace/ui/components/dicebar-avatar"
import { Form, FormField } from "@workspace/ui/components/form"
import { cn } from "@workspace/ui/lib/utils"
import { useMutation, useQuery } from "convex/react"
import { MoreHorizontalIcon, Wand2Icon } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ca } from "zod/v4/locales"
type Props = {
	conversationId: string
}

const formSchema = z.object({
	message: z.string().min(1, "Message is required"),
})

export function ConversationIdView({ conversationId }: Props) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: "",
		},
	})

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

	return (
		<div className="flex h-screen flex-1 flex-col justify-between  bg-muted/50">
			<header className="flex items-center justify-between border-b bg-background p-2.5">
				<Button variant={"ghost"}>
					<MoreHorizontalIcon className="h-4 w-4" />
				</Button>
			</header>
			<AIConversation className="max-h-[calc(100vh-180px)]">
				<AIConversationContent className="p-4">
					{toUIMessages(messages.results ?? []).map((message) => (
						<AIMessage
							key={message.id}
							// we are watching from assistant perspective
							// we are the assistant / support agent
							// user = means the agents or the support team
							from={message.role === "assistant" ? "user" : "assistant"}
						>
							<AIMessageContent
								className={cn("rounded-xl font-sans !text-white")}
							>
								<AIResponse className="rounded-md font-sans !text-white">
									{message.content}
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
										form.formState.isSubmitting
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
									type="submit"
									disabled={
										conversations?.status === "resolved" ||
										form.formState.isSubmitting
									}
								>
									<Wand2Icon className="h-4 w-4" />
									Enhance Response
								</AIInputButton>
							</AIInputTools>
							<AIInputSubmit
								disabled={
									conversations?.status === "resolved" ||
									!form.formState.isValid ||
									form.formState.isSubmitting
									// TODO if enhancing response, disable submit button
								}
							/>
						</AIInputToolbar>
					</AIInput>
				</Form>
			</div>
		</div>
	)
}
