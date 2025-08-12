// ConvIdViewLoading.tsx

import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { Skeleton } from "@workspace/ui/components/skeleton"

export function ConversationIdViewLoading() {
	return (
		<div className="flex flex-col h-full bg-background border-l border-border">
			{/* Header */}
			<div className="flex items-center justify-between p-4 border-b border-border">
				{/* Left: menu icon placeholder */}
				<Skeleton className="h-5 w-5 rounded-full" />

				{/* Right: status badge */}
				<div className="flex items-center gap-2">
					<Skeleton className="h-8 w-28 rounded-md" />
				</div>
			</div>

			{/* Scrollable content */}
			<ScrollArea className="flex-1">
				<div className="flex flex-col gap-6 p-2.5">
					{[...Array(14)].map((_, i) => (
						<div
							key={i}
							className="flex gap-3"
						>
							<Skeleton className="h-9 w-9 rounded-full" />
							<div className="flex flex-col gap-2 flex-1">
								<Skeleton className="h-4 w-1/3 bg-primary/40" />
								<Skeleton className="h-3 w-full" />
								<Skeleton className="h-3 w-3/4" />
							</div>
						</div>
					))}
				</div>
			</ScrollArea>

			{/* Footer input */}
			<div className="border-t border-border p-4">
				<Skeleton className="h-10 w-full rounded-full" />
			</div>
		</div>
	)
}
