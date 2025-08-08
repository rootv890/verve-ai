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
				"bg-linear-to-tr/oklch from-primary to-secondary-foreground p-6 text-white shadow-xl !rounded-none",
				className
			)}
		>
			{children}
		</header>
	)
}

export default WidgetHeader
