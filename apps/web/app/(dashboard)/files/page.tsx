import React from "react"

export default function FilesPage() {
	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center justify-between p-6 border-b">
				<h1 className="font-serif text-3xl">Files</h1>
			</div>
			<div className="flex-1 p-6">
				<p className="text-muted-foreground">
					Manage your files and documents here.
				</p>
			</div>
		</div>
	)
}
