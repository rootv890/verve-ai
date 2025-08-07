import { ConvexError, v } from "convex/values"
import { mutation, query } from "../_generated/server"

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

		// TODO : replace with real threadID
		const threadId = "123"

		const conversationId = await ctx.db.insert("conversations", {
			organizationId: args.organizationId,
			contactSessionId: args.contactSessionId,
			status: "unresolved",
			threadId: threadId,
		})
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
		// check if conversation exists
		const conversation = await ctx.db.get(args.conversationId)
		if (!conversation) {
			return null
		}
		// API return is public, so trimout contactsessionID and organizationId
		const { contactSessionId, organizationId, ...publicConversation } =
			conversation
		return publicConversation
	},
})
