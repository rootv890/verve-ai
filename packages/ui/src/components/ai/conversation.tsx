"use client"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { ArrowDownIcon } from "lucide-react"
import type { ComponentProps } from "react"
import { useCallback } from "react"
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom"

export type AIConversationProps = ComponentProps<typeof StickToBottom>

export const AIConversation = ({
	className,
	...props
}: AIConversationProps) => (
	<StickToBottom
		className={cn(
			"relative flex-1 overflow-y-auto",
			// Vercel/Twitter-like conversation feed styling
			"bg-background",
			className
		)}
		initial="smooth"
		resize="smooth"
		role="log"
		{...props}
	/>
)

export type AIConversationContentProps = ComponentProps<
	typeof StickToBottom.Content
>

export const AIConversationContent = ({
	className,
	...props
}: AIConversationContentProps) => (
	<StickToBottom.Content
		className={cn(
			// Twitter-like feed padding and spacing
			"divide-y divide-border/60",
			// Add some breathing room at the edges
			"pb-8",
			className
		)}
		{...props}
	/>
)

export const AIConversationScrollButton = () => {
	const { isAtBottom, scrollToBottom } = useStickToBottomContext()

	const handleScrollToBottom = useCallback(() => {
		scrollToBottom()
	}, [scrollToBottom])

	return (
		!isAtBottom && (
			<Button
				className={cn(
					"absolute bottom-6 left-[50%] translate-x-[-50%]",
					"rounded-full shadow-lg border border-border/50",
					"bg-background/80 backdrop-blur-sm",
					"hover:bg-background hover:shadow-xl",
					"transition-all duration-200 ease-out",
					"size-12"
				)}
				onClick={handleScrollToBottom}
				size="icon"
				type="button"
				variant="outline"
			>
				<ArrowDownIcon className="size-4" />
				<span className="sr-only">Scroll to bottom</span>
			</Button>
		)
	)
}

export type AIConversationEmptyStateProps = ComponentProps<"div">

export const AIConversationEmptyState = ({
	className,
	children,
	...props
}: AIConversationEmptyStateProps) => (
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
