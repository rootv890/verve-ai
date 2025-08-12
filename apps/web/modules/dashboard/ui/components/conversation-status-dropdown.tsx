import { Doc } from "@workspace/backend/_generated/dataModel"
import { Button } from "@workspace/ui/components/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { ArrowUp, CheckIcon, ChevronDownIcon, CircleIcon } from "lucide-react"

type Props = {
	status: Doc<"conversations">["status"]
	onStatusChange: (newStatus: Doc<"conversations">["status"]) => void
	disabled?: boolean
}

const statusConfig = {
	unresolved: {
		label: "Unresolved",
		icon: CircleIcon,
		variant: "unresolved" as const,
		description: "Issue needs attention",
	},
	escalated: {
		label: "Escalated",
		icon: ArrowUp,
		variant: "escalated" as const,
		description: "Escalated to higher level",
	},
	resolved: {
		label: "Resolved",
		icon: CheckIcon,
		variant: "resolved" as const,
		description: "Issue has been resolved",
	},
} as const

export const ConversationStatusDropdown = ({
	status,
	onStatusChange,
	disabled,
}: Props) => {
	const currentStatus = statusConfig[status]
	const CurrentIcon = currentStatus.icon

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant={currentStatus.variant}
					size="sm"
					disabled={disabled}
					className="gap-2"
				>
					<CurrentIcon className="h-4 w-4" />
					{currentStatus.label}
					<ChevronDownIcon className="h-3 w-3 opacity-50" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="w-48"
			>
				{Object.entries(statusConfig).map(([statusKey, config]) => {
					const StatusIcon = config.icon
					const isCurrentStatus = statusKey === status

					return (
						<DropdownMenuItem
							key={statusKey}
							onClick={() =>
								onStatusChange(statusKey as Doc<"conversations">["status"])
							}
							disabled={isCurrentStatus || disabled}
							className="flex items-center gap-3 p-3"
						>
							<StatusIcon className="h-4 w-4" />
							<div className="flex flex-col gap-0.5">
								<span className="font-medium">{config.label}</span>
								<span className="text-xs text-muted-foreground">
									{config.description}
								</span>
							</div>
							{isCurrentStatus && <CheckIcon className="ml-auto h-4 w-4" />}
						</DropdownMenuItem>
					)
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
