import React from "react"

export default function WidgetCustomizationPage() {
	return (
		<div className="flex h-full flex-col">
			<div className="flex items-center justify-between border-b p-6">
				<h1 className="text-3xl font-serif">Widget Customization</h1>
			</div>
			<div className="flex-1 p-6">
				<p className="text-muted-foreground">
					Customize your chat widget appearance and behavior here.
				</p>
			</div>
		</div>
	)
}
