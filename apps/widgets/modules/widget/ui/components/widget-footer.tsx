import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { HomeIcon, InboxIcon } from "lucide-react"
import React from "react"

type Props = {}

const WidgetFooter = (props: Props) => {
	const screen: string = "selection"
	return (
		<footer className="flex items-center justify-center border-t bg-background">
			<Button
				variant="ghost"
				className="flex items-center gap-2"
				size={"icon"}
				onClick={() => {}}
			>
				<HomeIcon
					className={cn(
						"size-5",
						screen === "selection" ? "text-primary" : "text-muted-foreground"
					)}
				/>
			</Button>
			<Button
				variant="ghost"
				className="flex items-center gap-2"
				size={"icon"}
				onClick={() => {}}
			>
				<InboxIcon
					className={cn(
						"size-5",
						screen === "inbox" ? "text-primary" : "text-muted-foreground"
					)}
				/>
			</Button>
		</footer>
	)
}

export default WidgetFooter
