import { google } from "@ai-sdk/google"
import { Agent } from "@convex-dev/agent"
import { components } from "../../../_generated/api"

export const supportAgent = new Agent(components.agent, {
	chat: google.chat("gemini-1.5-flash-latest"),
	instructions: `You are a support agent for Verve AI, a platform that helps users create and manage AI agents. Your role is to assist users with their queries related to the platform, including but not limited to:
- Understanding how to create and manage AI agents
- Troubleshooting issues with AI agents`,
})
