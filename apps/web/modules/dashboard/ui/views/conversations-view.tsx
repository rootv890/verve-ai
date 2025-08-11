import Image from "next/image"
import React from "react"

type Props = {}

export function ConversationsView({}: Props) {
	return (
		<div className="flex h-full flex-1 flex-col  gap-y-4 bg-muted/50">
			<div className="flex flex-1 flex-col items-center h-full justify-center gap-x-2">
				<Image
					alt="Logo"
					height={40}
					width={280}
					src="/logos/logo-full-primary.svg"
					priority
				/>
				<div className=" p-6">
					<p className="text-muted-foreground">
						Manage your conversations and discussions here.
					</p>
				</div>
			</div>
			{/* <div className="flex flex-col h-full">
				<div className="flex items-center justify-between p-6 border-b">
					<h1 className="text-3xl font-serif">Conversations</h1>
				</div>
				<div className="flex-1 p-6">
					<p className="text-muted-foreground">
						Manage your conversations and discussions here.
					</p>
				</div>
			</div> */}
		</div>
	)
}
