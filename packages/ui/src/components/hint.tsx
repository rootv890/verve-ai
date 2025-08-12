"use client"

import React from "react"
import { cn } from "../lib/utils"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./tooltip"

/**
 * A reusable hint/tooltip component that follows the same pattern as used in the dashboard sidebar.
 *
 * This component provides a more convenient API for tooltips with conditional display support,
 * making it perfect for cases like collapsed sidebars where tooltips should only show in certain states.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Hint label="Settings">
 *   <Button>Settings</Button>
 * </Hint>
 *
 * // Conditional tooltip (like in collapsed sidebar)
 * <Hint label="Dashboard" show={sidebarState === "collapsed"} side="right">
 *   <SidebarMenuButton>Dashboard</SidebarMenuButton>
 * </Hint>
 *
 * // Custom positioning and styling
 * <Hint
 *   label="Save changes"
 *   side="bottom"
 *   sideOffset={8}
 *   delayDuration={500}
 * >
 *   <Button>Save</Button>
 * </Hint>
 * ```
 */

interface HintProps {
	/**
	 * The content to display in the tooltip
	 */
	label: string
	/**
	 * The element that triggers the tooltip
	 */
	children: React.ReactNode
	/**
	 * The side where the tooltip should appear
	 * @default "top"
	 */
	side?: "top" | "right" | "bottom" | "left"
	/**
	 * The alignment of the tooltip
	 * @default "center"
	 */
	align?: "start" | "center" | "end"
	/**
	 * The distance in pixels from the trigger
	 * @default 0
	 */
	sideOffset?: number
	/**
	 * Whether to show the tooltip or not
	 * Useful for conditional tooltip display (like collapsed sidebars)
	 * @default true
	 */
	show?: boolean
	/**
	 * Delay before showing the tooltip in milliseconds
	 * @default 200
	 */
	delayDuration?: number
	/**
	 * Custom className for the tooltip content
	 */
	className?: string
	/**
	 * Whether the trigger should be rendered as a child
	 * @default true
	 */
	asChild?: boolean
}

export const Hint: React.FC<HintProps> = ({
	label,
	children,
	side = "top",
	sideOffset = 0,
	show = true,
	delayDuration = 200,
	className,
	asChild = true,
}) => {
	// If show is false, render children without tooltip
	if (!show) {
		return <>{children}</>
	}

	return (
		<TooltipProvider delayDuration={delayDuration}>
			<Tooltip>
				<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
				<TooltipContent
					side={side}
					sideOffset={sideOffset}
					className={cn(className, `[&>*]:${className}`)}
				>
					{label}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
