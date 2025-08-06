"use client"
import { useVapi } from "@/modules/widget/hooks/use-vapi"
// import { api } from "@workspace/backend/convex/_generated/api"
import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button"
import { useQuery } from "convex/react"

export default function Page() {
	const users = useQuery(api.users.getMany)
	const {
		startCall,
		endCall,
		isConnected,
		isConnecting,
		isSpeaking,
		transcript,
	} = useVapi()
	return (
		<div className="flex items-center justify-center min-h-svh">
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-2xl font-bold">VAPI boy!</h1>
				<Button
					size="sm"
					variant="outline"
					onClick={startCall}
					disabled={isConnected || isConnecting}
				>
					Start Call
				</Button>
				{/* end call */}
				<Button
					size="sm"
					variant="destructive"
					onClick={() => {
						if (isConnected) {
							endCall()
						}
					}}
					// disabled={!isConnected}
				>
					End Call
				</Button>

				<div>
					{isConnecting && "Connecting..."}
					{isConnected && !isSpeaking && "Connected"}
					{isConnected && isSpeaking && "Speaking..."}
					{!isConnected && !isConnecting && "Disconnected"}
				</div>
				<div
					aria-live="polite"
					aria-label="Voice assistant status"
				>
					{isConnecting && "Connecting..."}
					{isConnected && !isSpeaking && "Connected"}
					{isConnected && isSpeaking && "Speaking..."}
					{!isConnected && !isConnecting && "Disconnected"}
				</div>
			</div>
		</div>
	)
}
