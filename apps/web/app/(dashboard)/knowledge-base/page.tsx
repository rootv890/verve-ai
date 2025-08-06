import React from "react"

export default function KnowledgeBasePage() {
	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center justify-between p-6 border-b">
				<h1 className="text-3xl font-bold">Knowledge Base</h1>
			</div>
			<div className="flex-1 p-6">
				<p className="text-muted-foreground">
					Manage your knowledge base and documentation here.
				</p>
			</div>
		</div>
	)
}
