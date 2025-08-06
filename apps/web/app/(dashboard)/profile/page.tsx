import React from "react"

export default function ProfilePage() {
	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center justify-between p-6 border-b">
				<h1 className="text-3xl font-serif">Profile</h1>
			</div>
			<div className="flex-1 p-6">
				<p className="text-muted-foreground">
					Manage your profile information and account details here.
				</p>
			</div>
		</div>
	)
}
