"use client"
// import { api } from "@workspace/backend/convex/_generated/api"
import { api } from "@workspace/backend/_generated/api"
import { mutation } from "@workspace/backend/_generated/server"
import { Button } from "@workspace/ui/components/button"
import { useMutation, useQuery } from "convex/react"
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

	return (
		<div className="flex items-center justify-center min-h-svh">
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-2xl font-bold">apps/web</h1>
			</div>
			<form
				onSubmit={handleSubmit}
				className="mt-4"
			>
				<input
					type="text"
					placeholder="Type something..."
					className="border p-2 rounded"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white p-2 rounded"
				>
					Submit
				</button>
			</form>
		</div>
	)
}
