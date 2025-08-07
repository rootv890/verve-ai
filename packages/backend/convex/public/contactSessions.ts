import { v } from "convex/values"
import { Doc } from "../_generated/dataModel"
import { mutation } from "../_generated/server"

/*
args. name email orgId metdata(optional, all fields @schema)
handler async ctx\args -> {
now = Date.now()
expiresAt = now + SESSION_DURATION
contactSessId = await ctx.db.insert("contact_sessions", {})
}

*/

const SESSION_DURATION = 24 * 60 * 60 * 1000 // in ms

export type ContactSessionMetadata = Doc<"contactSessions">["metadata"]

export const create = mutation({
	args: {
		name: v.string(),
		email: v.string(),
		organizationId: v.string(),
		metadata: v.optional(
			v.object({
				userAgent: v.optional(v.string()),
				ipAddress: v.optional(v.string()),
				createdAt: v.optional(v.number()),
				platform: v.optional(v.string()),
				vendor: v.optional(v.string()),
				screenResolution: v.optional(v.string()),
				viewportSize: v.optional(v.string()),
				language: v.optional(v.string()),
				languages: v.optional(v.string()),
				timezone: v.optional(v.string()),
				timezoneOffset: v.optional(v.number()),
				cookieEnabled: v.optional(v.boolean()),
				referer: v.optional(v.string()),
				currentUrl: v.optional(v.string()),
			})
		),
	},
	handler: async (ctx, args) => {
		const now = Date.now()
		const expiresAt = now + SESSION_DURATION
		const contactSessionId = await ctx.db.insert("contactSessions", {
			name: args.name,
			email: args.email,
			organizationId: args.organizationId,
			metadata: args.metadata,
			expiresAt,
		})
		return contactSessionId
	},
})
