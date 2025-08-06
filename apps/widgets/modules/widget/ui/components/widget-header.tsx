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
				"bg-linear-to-b from-primary to-blue-400  p-4 text-primary-foreground",
				className
			)}
		>
			{children}
		</header>
	)
}

export default WidgetHeader
