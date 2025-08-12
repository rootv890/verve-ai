"use client"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@workspace/ui/components/tabs"
import { cn } from "@workspace/ui/lib/utils"
import { useState } from "react"

// Old message component simulation
const OldMessage = ({
	from,
	children,
}: {
	from: "user" | "assistant"
	children: React.ReactNode
}) => (
	<div
		className={cn(
			"group flex w-full items-end justify-end gap-2 py-2",
			from === "user" ? "is-user" : "is-assistant flex-row-reverse justify-end",
			"[&>div]:max-w-[80%]"
		)}
	>
		<div className="size-8 rounded-full bg-muted flex items-center justify-center text-xs">
			{from === "user" ? "U" : "AI"}
		</div>
		<div
			className={cn(
				"break-words",
				"flex flex-col gap-2 rounded-lg border border-border px-3 py-2 text-sm",
				"bg-background text-foreground",
				from === "user" &&
					"border-transparent bg-gradient-to-b from-primary to-[#0b63f3] text-primary-foreground"
			)}
		>
			<div>{children}</div>
		</div>
	</div>
)

// New message component import
import {
	AIThread,
	AIThreadMessage,
} from "@workspace/ui/components/ai-elements/thread"

const comparisonMessages = [
	{
		id: "1",
		from: "user" as const,
		content: "What's new in the design system?",
		avatar: { src: "/api/placeholder/32/32", name: "User" },
	},
	{
		id: "2",
		from: "assistant" as const,
		content:
			"Great question! The new design features modern spacing, better typography, and smooth animations inspired by Vercel and Twitter's design language.",
		avatar: {
			src: "/api/placeholder/32/32",
			name: "Assistant",
			status: "online" as const,
		},
	},
]

export default function DesignComparisonPage() {
	const [activeTab, setActiveTab] = useState("new")

	return (
		<div className="container mx-auto p-6 max-w-4xl">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">Design System Evolution</h1>
				<p className="text-muted-foreground">
					Compare the old vs new AI chat interface design
				</p>
				<div className="flex gap-2 mt-4">
					<Badge variant="destructive">Before</Badge>
					<Badge variant="secondary">After</Badge>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				{/* Old Design */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							Old Design
							<Badge
								variant="outline"
								className="text-xs"
							>
								Previous
							</Badge>
						</CardTitle>
						<CardDescription>Traditional chat bubble approach</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4 border rounded-lg p-4 bg-muted/30">
							{comparisonMessages.map((message) => (
								<OldMessage
									key={`old-${message.id}`}
									from={message.from}
								>
									{message.content}
								</OldMessage>
							))}
						</div>

						<div className="mt-4 text-sm text-muted-foreground">
							<h4 className="font-medium mb-2">Issues:</h4>
							<ul className="space-y-1 text-xs">
								<li>• Cramped spacing and alignment</li>
								<li>• Basic chat bubble design</li>
								<li>• Limited interaction feedback</li>
								<li>• Inconsistent visual hierarchy</li>
							</ul>
						</div>
					</CardContent>
				</Card>

				{/* New Design */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							New Design
							<Badge className="text-xs">Current</Badge>
						</CardTitle>
						<CardDescription>
							Vercel x Twitter-inspired interface
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="border rounded-lg overflow-hidden bg-background">
							<AIThread>
								{comparisonMessages.map((message) => (
									<AIThreadMessage
										key={`new-${message.id}`}
										from={message.from}
										avatar={message.avatar}
										name={message.avatar.name}
										timestamp="now"
										content={message.content}
										showActions={true}
									/>
								))}
							</AIThread>
						</div>

						<div className="mt-4 text-sm text-muted-foreground">
							<h4 className="font-medium mb-2">Improvements:</h4>
							<ul className="space-y-1 text-xs">
								<li>• Modern threading layout</li>
								<li>• Enhanced typography & spacing</li>
								<li>• Smooth hover interactions</li>
								<li>• Professional status indicators</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Feature Breakdown */}
			<Card>
				<CardHeader>
					<CardTitle>Key Design Improvements</CardTitle>
					<CardDescription>
						What makes the new design system special
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="text-center">
							<div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									className="text-primary"
								>
									<path d="M12 2L2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7l-10-5z" />
								</svg>
							</div>
							<h3 className="font-semibold mb-2">Vercel Aesthetics</h3>
							<p className="text-sm text-muted-foreground">
								Clean rounded corners, subtle shadows, and modern spacing
							</p>
						</div>

						<div className="text-center">
							<div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									className="text-blue-500"
								>
									<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
								</svg>
							</div>
							<h3 className="font-semibold mb-2">Twitter Threading</h3>
							<p className="text-sm text-muted-foreground">
								Left-aligned conversation flow with clear message hierarchy
							</p>
						</div>

						<div className="text-center">
							<div className="size-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									className="text-green-500"
								>
									<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
								</svg>
							</div>
							<h3 className="font-semibold mb-2">Enhanced Interactions</h3>
							<p className="text-sm text-muted-foreground">
								Smooth animations, hover states, and intuitive feedback
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Technical Details */}
			<Card className="mt-6">
				<CardHeader>
					<CardTitle>Implementation Details</CardTitle>
					<CardDescription>
						Technical improvements under the hood
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
					>
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="new">New Components</TabsTrigger>
							<TabsTrigger value="css">CSS Improvements</TabsTrigger>
							<TabsTrigger value="features">New Features</TabsTrigger>
						</TabsList>

						<TabsContent
							value="new"
							className="mt-4"
						>
							<div className="space-y-3">
								<div className="p-3 border rounded-lg">
									<code className="text-sm font-mono">AIThreadMessage</code>
									<p className="text-xs text-muted-foreground mt-1">
										Unified message component with avatar, header, and content
									</p>
								</div>
								<div className="p-3 border rounded-lg">
									<code className="text-sm font-mono">AIMessageHeader</code>
									<p className="text-xs text-muted-foreground mt-1">
										Name, timestamp, and role indicators
									</p>
								</div>
								<div className="p-3 border rounded-lg">
									<code className="text-sm font-mono">
										AIThreadTypingIndicator
									</code>
									<p className="text-xs text-muted-foreground mt-1">
										Animated typing indicator with bouncing dots
									</p>
								</div>
							</div>
						</TabsContent>

						<TabsContent
							value="css"
							className="mt-4"
						>
							<div className="space-y-3">
								<div className="p-3 border rounded-lg">
									<strong className="text-sm">Enhanced Spacing</strong>
									<p className="text-xs text-muted-foreground mt-1">
										Consistent padding, margins, and gap utilities
									</p>
								</div>
								<div className="p-3 border rounded-lg">
									<strong className="text-sm">Modern Animations</strong>
									<p className="text-xs text-muted-foreground mt-1">
										Smooth transitions, hover effects, and loading states
									</p>
								</div>
								<div className="p-3 border rounded-lg">
									<strong className="text-sm">Improved Typography</strong>
									<p className="text-xs text-muted-foreground mt-1">
										Better line-height, letter-spacing, and font weights
									</p>
								</div>
							</div>
						</TabsContent>

						<TabsContent
							value="features"
							className="mt-4"
						>
							<div className="space-y-3">
								<div className="p-3 border rounded-lg">
									<strong className="text-sm">Message Actions</strong>
									<p className="text-xs text-muted-foreground mt-1">
										Copy, share, and interaction buttons on hover
									</p>
								</div>
								<div className="p-3 border rounded-lg">
									<strong className="text-sm">Status Indicators</strong>
									<p className="text-xs text-muted-foreground mt-1">
										Online/offline status for avatars
									</p>
								</div>
								<div className="p-3 border rounded-lg">
									<strong className="text-sm">Better Accessibility</strong>
									<p className="text-xs text-muted-foreground mt-1">
										ARIA labels, screen reader support, keyboard navigation
									</p>
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	)
}
