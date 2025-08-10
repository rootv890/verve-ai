import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@workspace/ui/components/resizable"
import React from "react"
import ConversationsPanel from "../components/conversations-panel"

type Props = {
	children: React.ReactNode
}

const ConversationLayout = ({ children }: Props) => {
	return (
		<ResizablePanelGroup
			direction="horizontal"
			className="h-full flex-1"
		>
			<ResizablePanel
				className="bg-accent"
				defaultSize={20}
				minSize={20}
				maxSize={30}
			>
				<ConversationsPanel />
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel
				className="h-full"
				defaultSize={70}
			>
				{children}
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}

export default ConversationLayout
