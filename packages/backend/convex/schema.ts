import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
	conversations: defineTable({
		threadId: v.string(), // track convex agent conversation threads
		organizationId: v.string(),
		contactSessionId: v.id("contactSessions"), // Reference to contact session
		status: v.union(
			v.literal("unresolved"),
			v.literal("resolved"),
			v.literal("escalated")
		),
	})
		.index("by_organization_id", ["organizationId"])
		.index("by_contact_session_id", ["contactSessionId"])
		.index("by_thread_id", ["threadId"])
		.index("by_status_and_organization_id", ["status", "organizationId"]),
	contactSessions: defineTable({
		name: v.optional(v.string()),
		email: v.optional(v.string()), // Consider email validation
		organizationId: v.optional(v.string()),
		expiresAt: v.number(), // Make required for automatic cleanup
		metadata: v.optional(
			v.object({
				userAgent: v.optional(v.string()),
				ipAddress: v.optional(v.string()), // Consider hashing for privacy
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
	})
		.index("by_organization_id", ["organizationId"])
		.index("by_expires_at", ["expiresAt"]),
	users: defineTable({
		name: v.string(),
	}),
})
