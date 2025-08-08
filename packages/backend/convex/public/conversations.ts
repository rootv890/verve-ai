import { saveMessage, saveMessages } from "@convex-dev/agent"
import { ConvexError, v } from "convex/values"
import { components } from "../_generated/api"
import { mutation, query } from "../_generated/server"
import { supportAgent } from "../system/ai/agents/supportAgent"

export const create = mutation({
	args: {
		organizationId: v.string(),
		contactSessionId: v.id("contactSessions"),
	},
	handler: async (ctx, args) => {
		// Implementation for creating a conversation
		const session = await ctx.db.get(args.contactSessionId)
		// Validate the session
		if (!session || !session.expiresAt) {
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "Invalid Session",
			})
		}

		// Check if session has expired
		if (Date.now() > session.expiresAt) {
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "Session has expired",
			})
		}

		const { threadId } = await supportAgent.createThread(ctx, {
			userId: args.organizationId,
		})

		await saveMessage(ctx, components.agent, {
			threadId,
			message: {
				role: "assistant",
				// TODO : modify to widgets initial configuration (based on customer input)
				content: "Hello, how can I assist you today?",
			},
		})

		const conversationId = await ctx.db.insert("conversations", {
			organizationId: args.organizationId,
			contactSessionId: args.contactSessionId,
			status: "unresolved",
			threadId: threadId,
		})

		return { conversationId }
	},
})

export const getOne = query({
	args: {
		conversationId: v.id("conversations"),
		contactSessionId: v.id("contactSessions"),
	},
	handler: async (ctx, args) => {
		// validate session
		const session = await ctx.db.get(args.contactSessionId)
		// Validate the session
		if (!session || !session.expiresAt) {
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "Invalid Session",
			})
		}

		// Check if session has expired
		if (Date.now() > session.expiresAt) {
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "Session has expired",
			})
		}

		// check if conversation exists
		const conversation = await ctx.db.get(args.conversationId)
		if (!conversation) {
			throw new ConvexError({
				code: "NOT_FOUND",
				message: "Conversation not found",
			})
		}
		if (conversation.contactSessionId !== args.contactSessionId) {
			console.log("Conversation does not belong to this session")

			throw new ConvexError({
				code: "NOT_FOUND",
				message: "Conversation not found for this session",
			})
		}

		// API return is public, so trimout contactsessionID and organizationId

		return {
			_id: conversation._id,
			_creationTime: conversation._creationTime,
			threadId: conversation.threadId,
			status: conversation.status,
		}
	},
})
