"use client"

import {
	Conversation as AIConversation,
	ConversationContent as AIConversationContent,
	ConversationEmptyState as AIConversationEmptyState,
	ConversationScrollButton as AIConversationScrollButton,
} from "@workspace/ui/components/ai-elements/conversation"
import {
	AIInput,
	AIInputButton,
	AIInputSubmit,
	AIInputTextarea,
	AIInputToolbar,
	AIInputTools,
} from "@workspace/ui/components/ai-elements/input"
import {
	Suggestion as AISuggestion,
	Suggestions as AISuggestions,
} from "@workspace/ui/components/ai-elements/suggestion"
import {
	AIThread,
	AIThreadMessage,
	AIThreadSeparator,
	AIThreadTypingIndicator,
} from "@workspace/ui/components/ai-elements/thread"
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
import { MicIcon, PaperclipIcon, SmileIcon } from "lucide-react"
import { useState } from "react"

const mockMessages = [
	{
		id: "1",
		from: "user" as const,
		content:
			"Hey! I'm redesigning our chat interface and looking for some modern design inspiration. What are the latest trends?",
		timestamp: "2:30 PM",
		avatar: {
			src: "/api/placeholder/32/32",
			name: "Alex Chen",
		},
	},
	{
		id: "2",
		from: "assistant" as const,
		content: `Great question! Here are some of the hottest design trends for chat interfaces in 2024:

## Modern Chat Design Trends

### 1. **Minimalist Threading**
- Clean message bubbles with subtle shadows
- Reduced visual noise between messages
- Smart use of whitespace for better readability

### 2. **Twitter/X-inspired Layouts**
- Left-aligned conversation flows
- Avatar-centric designs with status indicators
- Hover states that reveal interaction options

### 3. **Vercel-style Polish**
- Rounded corners with consistent border radius
- Smooth transitions and micro-interactions
- Sophisticated color systems with semantic meaning

### 4. **Enhanced Typography**
- Improved line-height for better readability
- Consistent font sizing across components
- Better contrast ratios for accessibility

Would you like me to elaborate on any of these trends or show you some specific examples?`,
		timestamp: "2:31 PM",
		avatar: {
			src: "/api/placeholder/32/32",
			name: "AI Assistant",
			status: "online" as const,
		},
	},
	{
		id: "3",
		from: "user" as const,
		content:
			"This looks amazing! Can you show me more about the interaction patterns?",
		timestamp: "2:33 PM",
		avatar: {
			src: "/api/placeholder/32/32",
			name: "Alex Chen",
		},
	},
]

const suggestions = [
	"Show me code examples",
	"Explain accessibility features",
	"Compare with other platforms",
	"Design system principles",
]

export default function AIDesignDemoPage() {
	const [isTyping, setIsTyping] = useState(false)
	const [messages, setMessages] = useState(mockMessages)

	const handleSuggestionClick = (suggestion: string) => {
		// Add user message
		const newUserMessage = {
			id: Date.now().toString(),
			from: "user" as const,
			content: suggestion,
			timestamp: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
			avatar: {
				src: "/api/placeholder/32/32",
				name: "Alex Chen",
			},
		}

		setMessages((prev) => [...prev, newUserMessage])
		setIsTyping(true)

		// Simulate AI response
		setTimeout(() => {
			const aiResponse = {
				id: (Date.now() + 1).toString(),
				from: "assistant" as const,
				content: `Great question about **${suggestion.toLowerCase()}**! Here's what makes modern chat interfaces so effective:

## Key Design Principles

- **Consistency**: Every element follows the same design language
- **Clarity**: Clear visual hierarchy and readable typography
- **Feedback**: Immediate visual responses to user actions
- **Accessibility**: Proper contrast ratios and keyboard navigation

The new design system emphasizes smooth animations, thoughtful spacing, and intuitive interaction patterns that users expect from modern applications.`,
				timestamp: new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				}),
				avatar: {
					src: "/api/placeholder/32/32",
					name: "AI Assistant",
					status: "online" as const,
				},
			}

			setMessages((prev) => [...prev, aiResponse])
			setIsTyping(false)
		}, 2000)
	}

	return (
		<div className="container mx-auto p-6 max-w-6xl">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">AI Chat Design System</h1>
				<p className="text-muted-foreground">
					Modern Vercel x Twitter-inspired chat interface components
				</p>
				<div className="flex gap-2 mt-4">
					<Badge variant="outline">Vercel Design</Badge>
					<Badge variant="outline">Twitter-like Threading</Badge>
					<Badge variant="outline">Modern Animations</Badge>
				</div>
			</div>

			<Tabs
				defaultValue="demo"
				className="space-y-6"
			>
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="demo">Live Demo</TabsTrigger>
					<TabsTrigger value="components">Components</TabsTrigger>
					<TabsTrigger value="features">Features</TabsTrigger>
				</TabsList>

				<TabsContent
					value="demo"
					className="space-y-6"
				>
					<Card>
						<CardHeader>
							<CardTitle>Interactive Chat Demo</CardTitle>
							<CardDescription>
								Experience the new Vercel x Twitter-inspired design system
							</CardDescription>
						</CardHeader>
						<CardContent className="p-0">
							<div className="h-[600px] flex flex-col">
								<AIConversation className="flex-1">
									<AIConversationContent>
										<AIThread>
											{messages.map((message) => (
												<AIThreadMessage
													key={message.id}
													from={message.from}
													avatar={message.avatar}
													name={message.avatar.name}
													timestamp={message.timestamp}
													content={message.content}
													showActions={true}
												/>
											))}

											{isTyping && (
												<AIThreadTypingIndicator
													avatar={{
														src: "/api/placeholder/32/32",
														name: "AI Assistant",
													}}
													name="AI Assistant"
												/>
											)}
										</AIThread>
									</AIConversationContent>
									<AIConversationScrollButton />
								</AIConversation>

								<div className="border-t p-4 space-y-4">
									<AISuggestions>
										{suggestions.map((suggestion) => (
											<AISuggestion
												key={suggestion}
												suggestion={suggestion}
												onClick={handleSuggestionClick}
											/>
										))}
									</AISuggestions>

									<AIInput>
										<AIInputTextarea placeholder="Ask about the new design system..." />
										<AIInputToolbar>
											<AIInputTools>
												<AIInputButton size="icon">
													<PaperclipIcon className="size-4" />
												</AIInputButton>
												<AIInputButton size="icon">
													<MicIcon className="size-4" />
												</AIInputButton>
												<AIInputButton size="icon">
													<SmileIcon className="size-4" />
												</AIInputButton>
											</AIInputTools>
											<AIInputSubmit />
										</AIInputToolbar>
									</AIInput>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent
					value="components"
					className="space-y-6"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Card>
							<CardHeader>
								<CardTitle>Message Components</CardTitle>
								<CardDescription>
									Redesigned message bubbles with modern styling
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="p-4 bg-muted/30 rounded-lg">
										<code className="text-sm">AIThreadMessage</code>
										<p className="text-xs text-muted-foreground mt-1">
											Enhanced message component with avatar, timestamp, and
											actions
										</p>
									</div>
									<div className="p-4 bg-muted/30 rounded-lg">
										<code className="text-sm">AIMessageContent</code>
										<p className="text-xs text-muted-foreground mt-1">
											Improved content wrapper with hover actions
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Conversation Flow</CardTitle>
								<CardDescription>
									Twitter-inspired conversation threading
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="p-4 bg-muted/30 rounded-lg">
										<code className="text-sm">AIThread</code>
										<p className="text-xs text-muted-foreground mt-1">
											Container for threaded conversations
										</p>
									</div>
									<div className="p-4 bg-muted/30 rounded-lg">
										<code className="text-sm">AIConversation</code>
										<p className="text-xs text-muted-foreground mt-1">
											Enhanced with dividers and smooth scrolling
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Input System</CardTitle>
								<CardDescription>
									Vercel-style input with modern interactions
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="p-4 bg-muted/30 rounded-lg">
										<code className="text-sm">AIInput</code>
										<p className="text-xs text-muted-foreground mt-1">
											Rounded design with focus states and shadows
										</p>
									</div>
									<div className="p-4 bg-muted/30 rounded-lg">
										<code className="text-sm">AIInputSubmit</code>
										<p className="text-xs text-muted-foreground mt-1">
											Enhanced submit button with status indicators
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Response Rendering</CardTitle>
								<CardDescription>
									Improved markdown rendering with better typography
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="p-4 bg-muted/30 rounded-lg">
										<code className="text-sm">AIResponse</code>
										<p className="text-xs text-muted-foreground mt-1">
											Enhanced with prose styling and better spacing
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent
					value="features"
					className="space-y-6"
				>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<Card>
							<CardHeader>
								<CardTitle>Design Language</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2 text-sm">
									<li>✨ Vercel-inspired rounded corners</li>
									<li>🎨 Twitter-like message threading</li>
									<li>🌊 Smooth transitions and animations</li>
									<li>📱 Mobile-first responsive design</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Interactions</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2 text-sm">
									<li>🎯 Hover states for message actions</li>
									<li>💬 Typing indicators with animations</li>
									<li>📌 Status indicators for avatars</li>
									<li>⚡ Fast response feedback</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Accessibility</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2 text-sm">
									<li>♿ Proper ARIA labels and roles</li>
									<li>🎯 High contrast color ratios</li>
									<li>⌨️ Full keyboard navigation</li>
									<li>📱 Screen reader optimized</li>
								</ul>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Technical Highlights</CardTitle>
							<CardDescription>
								Modern React patterns and performance optimizations
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h4 className="font-medium mb-2">Component Architecture</h4>
									<ul className="space-y-1 text-sm text-muted-foreground">
										<li>• Composition-based design patterns</li>
										<li>• TypeScript for type safety</li>
										<li>• Flexible prop interfaces</li>
										<li>• Consistent naming conventions</li>
									</ul>
								</div>
								<div>
									<h4 className="font-medium mb-2">Performance</h4>
									<ul className="space-y-1 text-sm text-muted-foreground">
										<li>• Optimized re-renders with memo</li>
										<li>• Efficient state management</li>
										<li>• Minimal bundle size impact</li>
										<li>• Smooth 60fps animations</li>
									</ul>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
