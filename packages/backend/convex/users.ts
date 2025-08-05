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
export const checkIdentity = (ctx: MutationCtx | QueryCtx) => {
	const identity = ctx.auth.getUserIdentity()
	if (!identity) {
		throw new Error("Unauthorized: User must be authenticated.")
	}
	return identity
}

export const add = mutation({
	args: { name: v.string() },

	handler: async (ctx, args) => {
		checkIdentity(ctx)
		const user = await ctx.db.insert("users", { name: args.name })
		return user
	},
})
