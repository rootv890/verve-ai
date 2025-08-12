"use client"

import { cn } from "@workspace/ui/lib/utils"
import type { HTMLAttributes } from "react"
import {
	Message,
	MessageAvatar,
	MessageContent,
	type MessageProps,
} from "./message"
import { Response } from "./response"

export type AIThreadProps = HTMLAttributes<HTMLDivElement>

export const AIThread = ({ className, ...props }: AIThreadProps) => (
	<div
		className={cn(
			"flex flex-col w-full max-w-4xl mx-auto",
			"divide-y divide-border/30",
			className
		)}
		{...props}
	/>
)

export type AIThreadMessageProps = MessageProps & {
	avatar?: {
		src: string
		name?: string
		status?: "online" | "away" | "offline"
	}
	name?: string
	timestamp?: string
	content: string
	isStreaming?: boolean
	showActions?: boolean
}

export const AIThreadMessage = ({
	from,
	avatar,
	name,
	timestamp,
	content,
	isStreaming = false,
	showActions = true,
	className,
	...props
}: AIThreadMessageProps) => (
	<Message
		from={from}
		className={cn(
			"w-full max-w-none",
			// User messages aligned to right, assistant to left
			from === "user" && "flex-row-reverse",
			className
		)}
		{...props}
	>
		{avatar && (
			<MessageAvatar
				src={avatar.src}
				name={avatar.name || name}
			/>
		)}

		<div className="flex-1 min-w-0 space-y-1">
			{(name || timestamp) && (
				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					{name && <span className="font-medium">{name}</span>}
					{timestamp && <span>{timestamp}</span>}
				</div>
			)}

			<MessageContent>
				{from === "assistant" ?
					<Response>{content}</Response>
				:	<div className="text-sm leading-relaxed">{content}</div>}
			</MessageContent>
		</div>
	</Message>
)

export type AIThreadSeparatorProps = HTMLAttributes<HTMLDivElement> & {
	label?: string
}

export const AIThreadSeparator = ({
	label,
	className,
	...props
}: AIThreadSeparatorProps) => (
	<div
		className={cn("flex items-center justify-center py-4", className)}
		{...props}
	>
		<div className="flex items-center gap-3 text-xs text-muted-foreground">
			<div className="h-px bg-border flex-1" />
			{label && <span className="px-2">{label}</span>}
			<div className="h-px bg-border flex-1" />
		</div>
	</div>
)

export type AIThreadTypingIndicatorProps = HTMLAttributes<HTMLDivElement> & {
	avatar?: {
		src: string
		name?: string
	}
	name?: string
}

export const AIThreadTypingIndicator = ({
	avatar,
	name = "Assistant",
	className,
	...props
}: AIThreadTypingIndicatorProps) => (
	<Message
		from="assistant"
		className={cn("opacity-60", className)}
		{...props}
	>
		{avatar && (
			<MessageAvatar
				src={avatar.src}
				name={avatar.name || name}
			/>
		)}

		<div className="flex-1 min-w-0 space-y-1">
			{name && (
				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					<span className="font-medium">{name}</span>
				</div>
			)}

			<MessageContent>
				<div className="flex items-center gap-1 text-muted-foreground">
					<span className="text-sm">{name} is typing</span>
					<div className="flex gap-1">
						<div
							className="w-1 h-1 bg-current rounded-full animate-bounce"
							style={{ animationDelay: "0ms" }}
						/>
						<div
							className="w-1 h-1 bg-current rounded-full animate-bounce"
							style={{ animationDelay: "150ms" }}
						/>
						<div
							className="w-1 h-1 bg-current rounded-full animate-bounce"
							style={{ animationDelay: "300ms" }}
						/>
					</div>
				</div>
			</MessageContent>
		</div>
	</Message>
)
