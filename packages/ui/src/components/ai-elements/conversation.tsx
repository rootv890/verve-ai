"use client"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { ArrowDownIcon } from "lucide-react"
import type { ComponentProps } from "react"
import { useCallback } from "react"
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom"

export type ConversationProps = ComponentProps<typeof StickToBottom>

export const Conversation = ({ className, ...props }: ConversationProps) => (
	<StickToBottom
		className={cn("relative flex-1 overflow-y-auto", className)}
		initial="smooth"
		resize="smooth"
		role="log"
		{...props}
	/>
)

export type ConversationContentProps = ComponentProps<
	typeof StickToBottom.Content
>

export const ConversationContent = ({
	className,
	...props
}: ConversationContentProps) => (
	<StickToBottom.Content
		className={cn("p-4", className)}
		{...props}
	/>
)

export type ConversationScrollButtonProps = ComponentProps<typeof Button>

export const ConversationScrollButton = ({
	className,
	...props
}: ConversationScrollButtonProps) => {
	const { isAtBottom, scrollToBottom } = useStickToBottomContext()

	const handleScrollToBottom = useCallback(() => {
		scrollToBottom()
	}, [scrollToBottom])

	return (
		!isAtBottom && (
			<Button
				className={cn(
					"absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full",
					className
				)}
				onClick={handleScrollToBottom}
				size="icon"
				type="button"
				variant="outline"
				{...props}
			>
				<ArrowDownIcon className="size-4" />
			</Button>
		)
	)
}

export type ConversationEmptyStateProps = ComponentProps<"div">

export const ConversationEmptyState = ({
	className,
	children,
	...props
}: ConversationEmptyStateProps) => (
	<div
		className={cn(
			"flex flex-col items-center justify-center h-full text-center p-8",
			"text-muted-foreground",
			className
		)}
		{...props}
	>
		{children || (
			<>
				<div className="size-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						className="text-muted-foreground"
					>
						<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
					</svg>
				</div>
				<h3 className="text-lg font-semibold text-foreground mb-2">
					Start a conversation
				</h3>
				<p className="text-sm max-w-md">
					Ask me anything! I'm here to help you with information, analysis, and
					creative tasks.
				</p>
			</>
		)}
	</div>
)
