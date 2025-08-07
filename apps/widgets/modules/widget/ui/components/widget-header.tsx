import { cn } from "@workspace/ui/lib/utils"
import React from "react"

type Props = {
	children?: React.ReactNode
	className?: string
}

const WidgetHeader = ({ children, className }: Props) => {
	return (
		<header
			className={cn(
				"bg-linear-to-br/oklch from-neutral-900 via-neutral-800 to-zinc-700 p-6 text-white shadow-xl rounded-xl",
				className
			)}
		>
			{children}
		</header>
	)
}

export default WidgetHeader
