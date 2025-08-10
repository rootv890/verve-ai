import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from "lucide-react"
import { config } from "process"
import { cn } from "../lib/utils.js"

interface ContactStatusIconProps {
	status: "unresolved" | "resolved" | "escalated"
	className?: string
}

const statusConfig = {
	resolved: {
		icon: CheckIcon,
		bgColor: "bg-emerald-500",
	},
	unresolved: {
		icon: ArrowRightIcon,
		bgColor: "bg-destructive",
	},
	escalated: {
		icon: ArrowUpIcon,
		bgColor: "bg-yellow-500",
	},
} as const

export const ConversationStatusIcon = ({
	status,
	className,
}: ContactStatusIconProps) => {
	const config = statusConfig[status] || statusConfig.unresolved
	const Icon = config.icon
	return (
		<div
			className={cn(
				"flex items-center justify-center rounded-full p-1.5",
				config.bgColor,
				className
			)}
		>
			{" "}
			<Icon className="h-4 w-4 size-5 stroke-3 text-white" />
		</div>
	)
}
