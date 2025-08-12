import { Doc } from "@workspace/backend/_generated/dataModel"
import { Button } from "@workspace/ui/components/button"
import { Hint } from "@workspace/ui/components/hint"
import { CheckIcon } from "lucide-react"
import React from "react"
type Props = {
	status: Doc<"conversations">["status"]
	onClick: () => void
	disabled?: boolean
}

export const ConversationStatusButton = ({
	status,
	onClick,
	disabled,
}: Props) => {
	if (status === "resolved") {
		return (
			<Hint
				className="bg-foreground text-background"
				label="Mark as unresolved"
			>
				<Button
					onClick={onClick}
					variant={"resolved"}
					size="sm"
					disabled={disabled}
				>
					<CheckIcon />
					Resolved
				</Button>
			</Hint>
		)
	}
	if (status === "escalated") {
		return (
			<Hint
				className="bg-foreground text-background"
				label="Mark as resolved"
			>
				<Button
					onClick={onClick}
					variant={"escalated"}
					size="sm"
					disabled={disabled}
				>
					<CheckIcon />
					Escalated
				</Button>
			</Hint>
		)
	} else {
		return (
			<Hint
				className="bg-foreground text-background"
				label="Mark as escalated"
			>
				<Button
					onClick={onClick}
					variant={"unresolved"}
					size="sm"
					disabled={disabled}
				>
					<CheckIcon />
					Unresolved
				</Button>
			</Hint>
		)
	}
}
