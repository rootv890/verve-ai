import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { useAtomValue, useSetAtom } from "jotai"
import { HomeIcon, InboxIcon } from "lucide-react"
import React from "react"
import { screenAtom } from "../../atoms/widget-atoms"

type Props = {}

const WidgetFooter = (props: Props) => {
	const screen = useAtomValue(screenAtom)
	const setScreen = useSetAtom(screenAtom)
	return (
		<footer className="flex items-center justify-center border-t bg-background">
			<Button
				variant="ghost"
				className="flex items-center gap-2"
				size={"icon"}
				onClick={() => {
					setScreen("selection")
				}}
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
				onClick={() => {
					setScreen("inbox")
				}}
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
