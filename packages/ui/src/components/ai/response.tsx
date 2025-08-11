"use client"

import { cn } from "@workspace/ui/lib/utils"
import type { HTMLAttributes } from "react"
import { memo } from "react"
import ReactMarkdown, { type Options } from "react-markdown"
import remarkGfm from "remark-gfm"

export type AIResponseProps = HTMLAttributes<HTMLDivElement> & {
	options?: Options
	children: Options["children"]
}

const components: Options["components"] = {
	ol: ({ children, className, ...props }) => (
		<ol
			className={cn(
				"ml-6 list-outside list-decimal space-y-2 mt-4 mb-4",
				className
			)}
			{...props}
		>
			{children}
		</ol>
	),
	li: ({ children, className, ...props }) => (
		<li
			className={cn("leading-relaxed", className)}
			{...props}
		>
			{children}
		</li>
	),
	ul: ({ children, className, ...props }) => (
		<ul
			className={cn(
				"ml-6 list-outside list-disc space-y-2 mt-4 mb-4",
				className
			)}
			{...props}
		>
			{children}
		</ul>
	),
	strong: ({ children, className, ...props }) => (
		<span
			className={cn("font-semibold text-foreground", className)}
			{...props}
		>
			{children}
		</span>
	),
	a: ({ children, className, ...props }) => (
		<a
			className={cn(
				"font-medium text-primary underline underline-offset-4 decoration-primary/30",
				"hover:decoration-primary transition-colors duration-200",
				className
			)}
			rel="noreferrer"
			target="_blank"
			{...props}
		>
			{children}
		</a>
	),
	h1: ({ children, className, ...props }) => (
		<h1
			className={cn(
				"mt-8 mb-4 font-bold text-2xl text-foreground leading-tight",
				"first:mt-0",
				className
			)}
			{...props}
		>
			{children}
		</h1>
	),
	h2: ({ children, className, ...props }) => (
		<h2
			className={cn(
				"mt-8 mb-4 font-bold text-xl text-foreground leading-tight",
				"first:mt-0",
				className
			)}
			{...props}
		>
			{children}
		</h2>
	),
	h3: ({ children, className, ...props }) => (
		<h3
			className={cn(
				"mt-6 mb-3 font-semibold text-lg text-foreground leading-tight",
				"first:mt-0",
				className
			)}
			{...props}
		>
			{children}
		</h3>
	),
	h4: ({ children, className, ...props }) => (
		<h4
			className={cn(
				"mt-6 mb-3 font-semibold text-base text-foreground leading-tight",
				"first:mt-0",
				className
			)}
			{...props}
		>
			{children}
		</h4>
	),
	h5: ({ children, className, ...props }) => (
		<h5
			className={cn(
				"mt-4 mb-2 font-semibold text-sm text-foreground leading-tight",
				"first:mt-0",
				className
			)}
			{...props}
		>
			{children}
		</h5>
	),
	h6: ({ children, className, ...props }) => (
		<h6
			className={cn(
				"mt-4 mb-2 font-semibold text-xs text-foreground leading-tight",
				"first:mt-0",
				className
			)}
			{...props}
		>
			{children}
		</h6>
	),
	p: ({ children, className, ...props }) => (
		<p
			className={cn(
				"leading-relaxed mb-4 last:mb-0",
				"text-foreground/90",
				className
			)}
			{...props}
		>
			{children}
		</p>
	),
	blockquote: ({ children, className, ...props }) => (
		<blockquote
			className={cn(
				"border-l-4 border-primary/30 pl-4 py-2 my-4",
				"bg-muted/30 rounded-r-lg",
				"text-muted-foreground italic",
				className
			)}
			{...props}
		>
			{children}
		</blockquote>
	),
	code: ({ children, className, ...props }) => {
		const isInline = typeof children === "string" && !children.includes("\n")

		if (isInline) {
			return (
				<code
					className={cn(
						"px-1.5 py-0.5 rounded-md bg-muted font-mono text-sm",
						"text-foreground border border-border/50",
						className
					)}
					{...props}
				>
					{children}
				</code>
			)
		}
		return (
			<code
				className={cn(
					"block p-4 rounded-lg bg-muted font-mono text-sm",
					"border border-border/50 overflow-x-auto",
					"text-foreground leading-relaxed",
					className
				)}
				{...props}
			>
				{children}
			</code>
		)
	},
	pre: ({ children, className, ...props }) => (
		<pre
			className={cn(
				"my-4 p-4 rounded-lg bg-muted overflow-x-auto",
				"border border-border/50",
				className
			)}
			{...props}
		>
			{children}
		</pre>
	),
}

export const AIResponse = memo(
	({ className, options, children, ...props }: AIResponseProps) => (
		<div
			className={cn(
				"size-full prose prose-sm max-w-none font-sans",
				"prose-headings:text-foreground prose-p:text-foreground/90",
				"prose-strong:text-foreground prose-code:text-foreground",
				"prose-pre:bg-muted prose-pre:border-border/50",
				"[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
				// Override default prose styles for better integration
				"prose-a:text-primary prose-a:decoration-primary/30",
				"prose-blockquote:border-primary/30 prose-blockquote:bg-muted/30",
				className
			)}
			{...props}
		>
			<ReactMarkdown
				components={components}
				remarkPlugins={[remarkGfm]}
				{...options}
			>
				{children}
			</ReactMarkdown>
		</div>
	),
	(prevProps, nextProps) => prevProps.children === nextProps.children
)

AIResponse.displayName = "AIResponse"
