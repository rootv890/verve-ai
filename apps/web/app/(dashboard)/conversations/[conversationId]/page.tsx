import { ConversationIdView } from "@/modules/dashboard/ui/views/conversations-id-view"
import { Id } from "@workspace/backend/_generated/dataModel"
import React, { Suspense } from "react"

type Props = {
	params: Promise<{ conversationId: string }>
}

const ConversationIdPage = async ({ params }: Props) => {
	const { conversationId } = await params

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ConversationIdView
				conversationId={conversationId as Id<"conversations">}
			/>
		</Suspense>
	)
}

export default ConversationIdPage
