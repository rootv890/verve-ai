import React from "react"

export default function SettingsPage() {
	return (
		<div className="flex h-full flex-col">
			<div className="flex items-center justify-between border-b p-6">
				<h1 className="text-3xl font-bold">Settings</h1>
			</div>
			<div className="flex-1 p-6">
				<p className="text-muted-foreground">
					Configure your application settings and preferences here.
				</p>
			</div>
		</div>
	)
}
