"use client"
import { getCountryFlagUrl, getCountryFromTimeZone } from "@/lib/utils"
import { api } from "@workspace/backend/_generated/api"
import { Doc } from "@workspace/backend/_generated/dataModel"
import { ConversationStatusIcon } from "@workspace/ui/components/conversation-status-icon"
import { DicebarAvatar } from "@workspace/ui/components/dicebar-avatar"

import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@workspace/ui/components/select"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll"
import {
	ArrowRightIcon,
	ArrowUpIcon,
	CheckIcon,
	CornerDownRight,
	ListIcon,
} from "@workspace/ui/icons/lucide"
import { cn } from "@workspace/ui/lib/utils"
import { usePaginatedQuery } from "convex/react"
import { formatDistanceToNow } from "date-fns"
import { useAtomValue, useSetAtom } from "jotai/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { statusFilterAtom } from "../../atoms"

// At the top of your ConversationsPanel.tsx file

const statusStyles = {
	all: {
		icon: ListIcon,
		bg: "bg-accent text-accent-foreground",
		text: "!text-accent-foreground",
		hover: "hover:text-accent",
		label: "All",
	},
	unresolved: {
		icon: ArrowRightIcon,
		bg: "bg-rose-400/30 border-rose-500",
		text: "!text-rose-950",
		hover: "hover:!text-rose-600",
		label: "Unresolved",
	},
	escalated: {
		icon: ArrowUpIcon,
		bg: "bg-yellow-400/30 border-yellow-500",
		text: "!text-yellow-950",
		hover: "hover:!text-yellow-600",
		label: "Escalated",
	},
	resolved: {
		icon: CheckIcon,
		bg: "bg-emerald-400/30 border-emerald-500",
		text: "!text-emerald-950",
		hover: "hover:!text-emerald-600",
		label: "Resolved",
	},
} as const

const ConversationsPanel = () => {
	const pathname = usePathname()

	const statusFilter = useAtomValue(statusFilterAtom)
	const setStatusFilter = useSetAtom(statusFilterAtom)

	const conversations = usePaginatedQuery(
		api.private.conversations.getMany,
		{
			status: statusFilter === "all" ? undefined : statusFilter,
		},
		{
			initialNumItems: 10,
		}
	)
	const {
		canLoadMore,
		topElementRef,
		isLoadingFirstPage,
		isLoadingMore,
		handleLoadMore,
	} = useInfiniteScroll({
		status: conversations.status,
		loadMore: conversations.loadMore,
		loadSize: 10,
		observerEnabled: true,
	})
	return (
		<div className="flex h-full w-full flex-col bg-background text-sidebar-foreground">
			<div className="flex flex-col gap-3.5 border-b p-2.5">
				<Select
					defaultValue="all"
					value={statusFilter}
					onValueChange={(value) =>
						setStatusFilter(value as Doc<"conversations">["status"] | "all")
					}
				>
					{/* Select Trigger */}
					<SelectTrigger
						className={cn(
							"h-8 border-none px-1.5 shadow-none ring-0 rounded-md",
							statusStyles[statusFilter]?.bg,
							statusStyles[statusFilter]?.text
						)}
					>
						<SelectValue placeholder="Filter" />
					</SelectTrigger>

					{/* Select Content */}
					<SelectContent>
						<StatusSelectItem
							value="all"
							icon={ListIcon}
							label="All"
						/>
						<StatusSelectItem
							value="unresolved"
							icon={ArrowRightIcon}
							label="Unresolved"
						/>
						<StatusSelectItem
							value="escalated"
							icon={ArrowUpIcon}
							label="Escalated"
						/>
						<StatusSelectItem
							value="resolved"
							icon={CheckIcon}
							label="Resolved"
						/>
					</SelectContent>
				</Select>
			</div>
			{isLoadingFirstPage ?
				<ConversationListSkeleton />
			:	<ScrollArea className="max-h-[calc(100vh-53px)] ">
					<div className="flex w-full flex-1 flex-col text-sm ">
						{/* Conversation list goes here */}
						{conversations.results.map((conv) => {
							const isLastMessageFromUser =
								conv.lastMessage?.message?.role === "user"
							const country = getCountryFromTimeZone(
								conv.contactSession.metadata?.timezone ?? "Etc/UTC"
							)
							const countryFlagUrl =
								country?.code ? getCountryFlagUrl(country.code) : null
							return (
								<Link
									href={`/conversations/${conv._id}`}
									key={conv._id}
									className={cn(
										"relative flex cursor-pointer items-start  gap-3 border-b p-4 py-5 text-sm leading-tight hover:bg-accent hover:text-accent-foreground",
										pathname === `/conversations/${conv._id}` &&
											"bg-accent text-accent-foreground"
									)}
								>
									{/* indicator */}
									<div
										className={cn(
											"-translate-y-1/2 absolute top-1/2 left-0 h-[64%] w-1 rounded-r-full bg-neutral-300 opacity-0 transition-opacity",
											pathname === `/conversations/${conv._id}` && "opacity-100"
										)}
									/>
									<DicebarAvatar
										seed={conv._id}
										size={40}
										badgeImageUrl={countryFlagUrl ?? ""}
										className="shrink-0"
									/>
									<div className="flex-1">
										<div className="flex w-full items-center gap-2">
											<div className="font-bold truncate">
												<span>{conv.contactSession.name}</span>
											</div>
											<span className="ml-auto shrink-0 text-muted-foreground text-xs font-normal italic">
												{formatDistanceToNow(new Date(conv._creationTime))}
											</span>
										</div>
										<div className="flex mt-1  items-center justify-between gap-2">
											<div className="flex w-0 grow items-center gap-1">
												{!isLastMessageFromUser && (
													<CornerDownRight className="size-4 hover:text-accen shrink-0 text-muted-foreground" />
												)}
												<span
													className={cn(
														"line-clamp-1 text-muted-foreground text-xs",
														isLastMessageFromUser && "text-bold font-bold"
													)}
												>
													{conv.lastMessage?.text}
												</span>
											</div>
											<ConversationStatusIcon
												status={conv.status}
												className="size-4 p-1"
											/>
										</div>
									</div>
								</Link>
							)
						})}
					</div>
					<InfiniteScrollTrigger
						onLoadMore={handleLoadMore}
						isLoadingMore={isLoadingMore}
						canLoadMore={canLoadMore}
						ref={topElementRef}
					/>
				</ScrollArea>
			}
		</div>
	)
}

export default ConversationsPanel

type StatusType = keyof typeof statusStyles

const StatusSelectItem = ({
	value,
	icon: Icon,
	label,
}: {
	value: StatusType
	icon: React.ElementType
	label: string
}) => {
	const style = statusStyles[value]
	return (
		<SelectItem value={value}>
			<div
				className={cn(
					"flex items-center gap-2 px-2 py-1 rounded-sm transition-colors cursor-pointer",
					style.hover
				)}
			>
				<Icon
					className={cn(
						"size-4",
						value === "all" && "text-accent-foreground",
						value === "resolved" && "text-green-500",
						value === "unresolved" && "text-rose-500",
						value === "escalated" && "text-yellow-500"
					)}
				/>
				<span
					className={cn(
						value === "all" && "text-accent-foreground",
						value === "resolved" && "text-green-500",
						value === "unresolved" && "text-rose-500",
						value === "escalated" && "text-yellow-500"
					)}
				>
					{label}
				</span>
			</div>
		</SelectItem>
	)
}

export function ConversationListSkeleton({
	count = 8,
	className,
}: {
	count?: number
	className?: string
}) {
	return (
		<ScrollArea
			className={cn(
				"h-[calc(100vh-4rem)] rounded-xl border border-border bg-background/50 backdrop-blur-sm p-4",
				"transition-all duration-300 ease-out hover:shadow-lg",
				className
			)}
		>
			<div className="flex flex-col gap-4">
				{Array.from({ length: count }).map((_, i) => (
					<div
						key={i}
						className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/30 transition-colors duration-200"
					>
						<div className="flex items-center gap-3">
							{/* Avatar Placeholder */}
							<Skeleton className="h-10 w-10 rounded-xl" />

							<div className="flex flex-col gap-1">
								{/* Name + Time */}
								<div className="flex items-center gap-2">
									<Skeleton className="h-4 w-24 rounded" />
									<Skeleton className="h-3 w-16 rounded" />
								</div>

								<div className="w-full justify-between flex items-center gap-2">
									{/* Message preview */}
									<Skeleton className="h-3 w-40 rounded" />
									{/* Status */}
									<Skeleton className="size-3 rounded-md" />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</ScrollArea>
	)
}
