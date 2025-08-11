import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@workspace/ui/components/avatar"
import { cn } from "@workspace/ui/lib/utils"
import type { ComponentProps, HTMLAttributes } from "react"

export type AIMessageProps = HTMLAttributes<HTMLDivElement> & {
	from: "user" | "assistant"
}

export const AIMessage = ({ className, from, ...props }: AIMessageProps) => (
	<div
		className={cn(
			"font-sans group flex w-full items-end justify-end gap-2 py-2",
			from === "user" ? "is-user" : "is-assistant flex-row-reverse justify-end",
			"[&>div]:max-w-[80%]",
			className
		)}
		{...props}
	/>
)

export type AIMessageContentProps = HTMLAttributes<HTMLDivElement>

export const AIMessageContent = ({
	children,
	className,
	...props
}: AIMessageContentProps) => (
	<div
		className={cn(
			"break-words !font-sans",
			"flex flex-col gap-2 rounded-lg border border-border px-3 py-2 text-sm",
			"bg-background text-foreground",
			"group-[.is-user]:border-transparent group-[.is-user]:bg-primary group-[.is-user]:text-white",
			className
		)}
		{...props}
	>
		<div className="font-sans is-user:dark">{children}</div>
	</div>
)

export type AIMessageAvatarProps = ComponentProps<typeof Avatar> & {
	src: string
	name?: string
}

export const AIMessageAvatar = ({
	src,
	name,
	className,
	...props
}: AIMessageAvatarProps) => (
	<Avatar
		className={cn("font-sans size-8", className)}
		{...props}
	>
		<AvatarImage
			alt=""
			className="font-sans mt-0 mb-0"
			src={src}
		/>
		<AvatarFallback>{name?.slice(0, 2) || "ME"}</AvatarFallback>
	</Avatar>
)
