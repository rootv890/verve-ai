import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@workspace/ui/components/form"
import React from "react"
import { useForm } from "react-hook-form"
import z from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@workspace/backend/_generated/api"
import type { ContactSessionMetadata } from "@workspace/backend/public/contactSessions"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { useMutation } from "convex/react"
import WidgetHeader from "../components/widget-header"
type Props = {}

/* Form Schema */
const schema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address",
	}),
	name: z
		.string({
			message: "Name must be at least 2 characters long",
		})
		.min(6)
		.max(100),
})

// TODO Temp
const organizationId = "123"

export const WidgetAuthScreen = (props: Props) => {
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
	})
	const createContactSession = useMutation(api.public.contactSessions.create)

	// Submit Handler
	const onSubmit = async (data: z.infer<typeof schema>) => {
		if (!organizationId) return
		const metadata: ContactSessionMetadata = {
			userAgent: navigator.userAgent,
			language: navigator.language,
			languages: navigator.languages?.join(","),
			// @ts-ignore
			platform: navigator.userAgentData?.platform,
			// @ts-ignore
			vendor: navigator.vendor,
			screenResolution: `${window.screen.width}x${window.screen.height}`,
			viewportSize: `${window.innerWidth}x${window.innerHeight}`,
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			timezoneOffset: new Date().getTimezoneOffset(),
			cookieEnabled: navigator.cookieEnabled,
			currentUrl: window.location.href,
			ipAddress: "",
		}

		const contactSessionId = await createContactSession({
			...data,
			organizationId,
			metadata,
		})

		console.log(contactSessionId)
	}

	return (
		<>
			<WidgetHeader>
				<div className="flex flex-col items-start justify-between px-2 py-6 gap-y-2 ">
					<h1 className="text-2xl text-primary-foreground font-serif font-semibold text-center">
						Hi there 👋
					</h1>
					<p className="text-sm font-semibold text-center  text-primary-foreground ">
						Let's get you started with Verve AI! Please enter your details below
						to
					</p>
				</div>
			</WidgetHeader>
			<Form {...form}>
				<form
					className="space-y-4 p-4"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-foreground">Email Address</FormLabel>
								<FormControl>
									<Input
										className="bg-foreground focus-within:italic"
										type="email"
										placeholder="awesome.guy@domain.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className="bg-foreground"
										type="text"
										placeholder="••••••"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="cursor-pointer"
						disabled={!form.formState.isValid || form.formState.isSubmitting}
					>
						Submit
					</Button>
				</form>
			</Form>
		</>
	)
}
