import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from "lucide-react"
import { cn } from "../lib/utils"

interface ContactStatusIconProps {
	status: "unresolved" | "resolved" | "escalated"
	className?: string
}

const statusConfig = {
	resolved: {
		icon: CheckIcon,
		bg: "bg-emerald-400", // subtle dark background
		text: "text-emerald-950", // vibrant icon color
	},
	unresolved: {
		icon: ArrowRightIcon,
		bg: "bg-rose-400",
		text: "text-rose-950",
	},
	escalated: {
		icon: ArrowUpIcon,
		bg: "bg-yellow-400",
		text: "text-yellow-950",
	},
} as const

export const ConversationStatusIcon = ({
	status,
	className,
}: ContactStatusIconProps) => {
	const cfg = statusConfig[status] || statusConfig.unresolved
	const Icon = cfg.icon

	return (
		<div
			className={cn(
				"flex items-center justify-center rounded-md p-1.5",
				cfg.bg,
				cfg.text,
				className
			)}
		>
			<Icon className="size-5 stroke-[2.5]" />
		</div>
	)
}
