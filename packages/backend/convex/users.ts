import { v } from "convex/values"
import type { MutationCtx, QueryCtx } from "./_generated/server"
import { mutation, query } from "./_generated/server"

export const getMany = query({
	args: {},
	handler: async (ctx) => {
		const users = await ctx.db.query("users").collect()
		return users
	},
})

// identity helper
export const checkIdentity = async (ctx: MutationCtx | QueryCtx) => {
	const identity = await ctx.auth.getUserIdentity()
	if (identity === null) {
		throw new Error("Unauthorized: User must be authenticated.")
	}

	const orgId = identity.orgId
	if (typeof orgId !== "string") {
		throw new Error("Invalid organization ID format.")
	}

	if (!orgId) {
		throw new Error("Unauthorized: User must be part of an organization.")
	}

	return identity
}

export const add = mutation({
	args: { name: v.string() },

	handler: async (ctx, args) => {
		await checkIdentity(ctx)
		const user = await ctx.db.insert("users", { name: args.name })
		return user
	},
})
