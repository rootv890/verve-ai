"use client"
import { OrganizationSwitcher } from "@clerk/nextjs"
// import { api } from "@workspace/backend/convex/_generated/api"
import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { BouncyLoading } from "@workspace/ui/components/loadings"
import { useMutation, useQuery } from "convex/react"
import { SaladIcon } from "lucide-react"
import React from "react"
export default function Page() {
	const users = useQuery(api.users.getMany)
	const addUser = useMutation(api.users.add)
	const [inputValue, setInputValue] = React.useState("")

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (inputValue.trim()) {
			await addUser({ name: inputValue })
			setInputValue("") // Clear input after submission
		}
	}

	// Handle loading state
	if (users === undefined) {
		return (
			<div className="flex flex-col items-center justify-center min-h-svh">
				<BouncyLoading label="Loading users" />
			</div>
		)
	}

	// Handle error state
	if (users === null) {
		return (
			<div className="flex flex-col items-center justify-center min-h-svh">
				<SaladIcon className="text-destructive-foreground" />
				<div className="text-lg text-red-600">
					Error loading users. Please try again.
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-svh">
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="font-serif text-6xl ">apps/web</h1>
			</div>
			<OrganizationSwitcher hidePersonal />
			<pre className="p-4 mt-4 bg-gray-100 rounded-md ">
				{JSON.stringify(users, null, 2)}
			</pre>
			<form
				onSubmit={handleSubmit}
				className="flex gap-2 mt-4"
			>
				<Input
					type="text"
					placeholder="Type something..."
					className="p-2"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>

				<Button type="submit">Submit</Button>
			</form>
		</div>
	)
}
