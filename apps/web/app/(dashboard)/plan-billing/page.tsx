import React from "react"

export default function PlanBillingPage() {
	return (
		<div className="flex h-full flex-col">
			<div className="flex items-center justify-between border-b p-6">
				<h1 className="text-3xl font-serif">Plan & Billing</h1>
			</div>
			<div className="flex-1 p-6">
				<p className="text-muted-foreground">
					Manage your subscription plan and billing information here.
				</p>
			</div>
		</div>
	)
}
