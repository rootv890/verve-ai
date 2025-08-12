/**
 * A tool for resolving conversations by their thread ID.
 *
 * This tool marks a conversation as resolved in the system and saves a confirmation
 * message to the thread. It requires a valid thread ID in the context to function.
 *
 * @throws Will return an error message if no thread ID is provided in the context
 * @returns A success message indicating the conversation has been resolved
 */
import { createTool } from "@convex-dev/agent"
import z from "zod"
import { internal } from "../../../_generated/api"
import { supportAgent } from "../agents/supportAgent"

export const resolveConversation = createTool({
	description: "Resolve a conversation by its thread ID",
	args: z.object({}),
	handler: async (ctx) => {
		if (!ctx.threadId) {
			return "Missing *:threadId* in context. This tool requires a thread ID to resolve the conversation."
		}

		await ctx.runMutation(internal.system.conversations.resolve, {
			threadId: ctx.threadId,
		})
		await supportAgent.saveMessage(ctx, {
			threadId: ctx.threadId,
			message: {
				role: "assistant",
				content: "Conversation resolved successfully.",
			},
		})
		return "Conversation resolved successfully."
	},
})
