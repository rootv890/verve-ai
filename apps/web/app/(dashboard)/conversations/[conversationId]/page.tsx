import { ConversationIdView } from "@/modules/dashboard/ui/views/conversations-id-view"
import { Id } from "@workspace/backend/_generated/dataModel"
import { BouncyLoading } from "@workspace/ui/components/loadings"
import React, { Suspense } from "react"

type Props = {
	params: Promise<{ conversationId: string }>
}

const ConversationIdPage = async ({ params }: Props) => {
	const { conversationId } = await params

	return (
		<Suspense
			fallback={
				<BouncyLoading
					takeFullScreen
					label="Loading Conversations"
				/>
			}
		>
			<ConversationIdView
				conversationId={conversationId as Id<"conversations">}
			/>
		</Suspense>
	)
}

export default ConversationIdPage
