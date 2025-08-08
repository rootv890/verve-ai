import { useQueries } from "convex/react"
import { paginationOptsValidator } from "convex/server"
import { ConvexError, v } from "convex/values"
import { internal } from "../_generated/api"
import { action, query } from "../_generated/server"
import { supportAgent } from "../system/ai/agents/supportAgent"

/**
 * Creates a new message in a conversation.
 * This action is used to send a message in a conversation thread.
 * @param {Object} args - The arguments for the action.
 * @param {string} args.prompt - The message content.
 * @param {string} args.threadId - The ID of the conversation thread.
 * @param {string} args.contactSessionId - The ID of the contact session.
 * @returns {Promise<void>} - A promise that resolves when the message is created.
 * @throws {ConvexError} - Throws an error if the contact session is not found
 * or expired, if the conversation is not found, or if the conversation is resolved.
 */
export const create = action({
	args: {
		prompt: v.string(),
		threadId: v.string(),
		contactSessionId: v.id("contactSessions"),
	},
	handler: async (ctx, args) => {
		const contactSession = await ctx.runQuery(
			internal.system.contactSessions.getOne,
			{
				contactSessionId: args.contactSessionId,
			}
		)
		if (!contactSession || contactSession.expiresAt < Date.now())
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "Contact session not found or expired.",
			})
		// get conversation
		const conversation = await ctx.runQuery(
			internal.system.conversations.getByThreadId,
			{
				threadId: args.threadId,
			}
		)
		if (!conversation) {
			throw new ConvexError({
				code: "NOT_FOUND",
				message: "Conversation not found.",
			})
		}

		// status == resolved no messages cane be sent
		if (conversation.status === "resolved") {
			throw new ConvexError({
				code: "FORBIDDEN",
				message: "Conversation is resolved, no messages can be sent.",
			})
		}
		// TODO: Implement subscription check
		await supportAgent.generateText(
			ctx,
			{
				threadId: args.threadId,
			},
			{
				prompt: args.prompt,
				// TODO : tools
			}
		)
	},
})

export const getMany = query({
	args: {
		threadId: v.string(),
		paginationOpts: paginationOptsValidator,
		contactSessionId: v.id("contactSessions"),
	},
	handler: async (ctx, args) => {
		// Validate contact session
		const contactSession = await ctx.db.get(args.contactSessionId)
		if (!contactSession || contactSession.expiresAt < Date.now()) {
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "Contact session not found or expired.",
			})
		}

		const paginatedItems = await supportAgent.listMessages(ctx, {
			threadId: args.threadId,
			paginationOpts: args.paginationOpts,
		})

		return paginatedItems
	},
})
