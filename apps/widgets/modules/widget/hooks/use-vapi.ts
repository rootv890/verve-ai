import Vapi from "@vapi-ai/web"
import React from "react"

interface TranscriptMessage {
	role: "user" | "assistant"
	text: string
}

export const useVapi = () => {
	const [vapi, setVapi] = React.useState<Vapi | null>(null)
	const [isConnecting, setIsConnecting] = React.useState(false)
	const [isConnected, setIsConnected] = React.useState(false)
	const [isSpeaking, setIsSpeaking] = React.useState(false)
	const [transcript, setTranscript] = React.useState<TranscriptMessage[]>([])
	const [error, setError] = React.useState<string | null>(null)

	React.useEffect(() => {
		// Only for development purposes - customers will use their own API key 🤭
		const vapiInstance = new Vapi("bb6de61a-da41-48fd-af99-fd5dab6bd0b1")
		setVapi(vapiInstance)

		// Store event handlers to enable proper cleanup
		const handleCallStart = () => {
			setIsConnecting(true)
			setIsConnected(false)
			setIsSpeaking(false)
			setTranscript([])
			setError(null)
		}

		const handleCallConnected = () => {
			setIsConnecting(false)
			setIsConnected(true)
			setError(null)
		}

		const handleCallEnd = () => {
			setIsConnecting(false)
			setIsConnected(false)
			setIsSpeaking(false)
		}

		const handleSpeechStart = () => {
			setIsSpeaking(true)
		}

		const handleSpeechEnd = () => {
			setIsSpeaking(false)
		}

		const handleError = (error: any) => {
			console.error("Vapi error:", error)
			const errorMessage =
				error?.message || "An unexpected error occurred with the voice call"
			setError(errorMessage)
			setIsConnecting(false)
			setIsConnected(false)
		}

		const handleMessage = (message: any) => {
			if (message.type === "transcript" && message.transcriptType === "final") {
				setTranscript((prev) => [
					...prev,
					{
						role: message.role === "user" ? "user" : "assistant",
						text: message.transcript,
					},
				])
			}
		}

		// Attach event listeners
		vapiInstance.on("call-start", handleCallStart)
		vapiInstance.on("call-start-progress", handleCallConnected)
		vapiInstance.on("call-end", handleCallEnd)
		vapiInstance.on("speech-start", handleSpeechStart)
		vapiInstance.on("speech-end", handleSpeechEnd)
		vapiInstance.on("error", handleError)
		vapiInstance.on("message", handleMessage)

		// cleanup - properly remove all event listeners
		return () => {
			vapiInstance.off("call-start", handleCallStart)
			vapiInstance.off("call-start-progress", handleCallConnected)
			vapiInstance.off("call-end", handleCallEnd)
			vapiInstance.off("speech-start", handleSpeechStart)
			vapiInstance.off("speech-end", handleSpeechEnd)
			vapiInstance.off("error", handleError)
			vapiInstance.off("message", handleMessage)
			vapiInstance.stop()
		}
	}, [])

	const startCall = () => {
		setIsConnecting(true)
		setError(null)
		if (vapi) {
			try {
				// Only for development purposes - customers will use their own RAM ID 🤭
				const ramId = process.env.NEXT_PUBLIC_VAPI_RAM_ID
				if (!ramId) {
					const errorMessage =
						"NEXT_PUBLIC_VAPI_RAM_ID environment variable is required"
					setError(errorMessage)
					setIsConnecting(false)
					throw new Error(errorMessage)
				}
				vapi.start(ramId)
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "Failed to start voice call"
				setError(errorMessage)
				setIsConnecting(false)
				console.error("Failed to start call:", err)
			}
		} else {
			const errorMessage = "Vapi instance not initialized"
			setError(errorMessage)
			setIsConnecting(false)
		}
	}

	const endCall = () => {
		if (vapi) {
			try {
				vapi.stop()
				setError(null)
			} catch (err) {
				console.error("Failed to end call:", err)
			}
		}
	}

	return {
		startCall,
		endCall,
		isConnecting,
		isConnected,
		isSpeaking,
		transcript,
		error,
	}
}
