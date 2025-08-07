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
				"bg-linear-to-t to-80% from-primary to-primary/50  p-4 text-primary-foreground",
				className
			)}
		>
			{children}
		</header>
	)
}

export default WidgetHeader
