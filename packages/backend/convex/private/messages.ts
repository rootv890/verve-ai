import { google } from "@ai-sdk/google"
import { saveMessage } from "@convex-dev/agent"
import { generateText } from "ai"
import {
	GenericActionCtx,
	GenericDataModel,
	GenericQueryCtx,
	paginationOptsValidator,
	UserIdentity,
} from "convex/server"
import { ConvexError, v } from "convex/values"
import { components, internal } from "../_generated/api"
import {
	action,
	ActionCtx,
	mutation,
	query,
	QueryCtx,
} from "../_generated/server"
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
export const create = mutation({
	args: {
		prompt: v.string(),
		conversationId: v.id("conversations"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (identity === null) {
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "Identity not found",
			})
		}

		// Get and validate organization ID
		const organizationId = identity.orgId as string
		if (!organizationId) {
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "Organization not found",
			})
		}
		const conversation = await ctx.db.get(args.conversationId)
		if (!conversation) {
			throw new ConvexError({
				code: "NOT_FOUND",
				message: "Conversation not found",
			})
		}

		if (conversation.organizationId !== organizationId) {
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "Invalid organization access",
			})
		}

		// resolved
		if (conversation.status === "resolved") {
			throw new ConvexError({
				code: "FORBIDDEN",
				message: "Conversation is resolved",
			})
		}
		await saveMessage(ctx, components.agent, {
			threadId: conversation.threadId,
			agentName: identity.familyName,
			message: {
				role: "assistant",
				content: args.prompt,
			},
		})
	},
})

export const getMany = query({
	args: {
		threadId: v.string(),
		paginationOpts: paginationOptsValidator,
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (identity === null) {
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "Identity not found",
			})
		}

		// Get and validate organization ID
		const organizationId = identity.orgId as string
		if (!organizationId) {
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "Organization not found",
			})
		}

		const conversation = await ctx.db
			.query("conversations")
			.withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
			.unique()

		if (!conversation) {
			throw new ConvexError({
				code: "NOT_FOUND",
				message: "Conversation not found",
			})
		}

		if (conversation.organizationId !== organizationId) {
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "Invalid organization access",
			})
		}

		const paginatedItems = await supportAgent.listMessages(ctx, {
			threadId: args.threadId,
			paginationOpts: args.paginationOpts,
		})

		return paginatedItems
	},
})

export const enhanceResponse = action({
	args: {
		prompt: v.string(),
	},
	handler: async (ctx, args) => {
		const { organizationId, identity } = await identityAndOrganizationCheck(ctx)
		const response = await generateText({
			model: google("gemini-1.5-flash"),
			messages: [
				{
					role: "system",
					content:
						"Enhance the operator's message to be more professional, clear, and helpful while maintaining their intent and key information.",
				},
				{
					role: "user",
					content: args.prompt,
				},
			],
		})

		return response.text
	},
})

// helpers
async function identityAndOrganizationCheck<DataModel extends GenericDataModel>(
	ctx: GenericQueryCtx<DataModel> | GenericActionCtx<DataModel>
): Promise<{
	identity: UserIdentity | null
	organizationId: string
}> {
	const identity = await ctx.auth.getUserIdentity()
	if (identity === null) {
		throw new ConvexError({
			code: "UNAUTHORIZED",
			message: "Identity not found",
		})
	}

	const organizationId = identity.orgId as string
	if (!organizationId) {
		throw new ConvexError({
			code: "UNAUTHORIZED",
			message: "Organization not found",
		})
	}

	return { identity, organizationId }
}
