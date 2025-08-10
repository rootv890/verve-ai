"use client"

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@workspace/ui/components/sidebar"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { cn } from "@workspace/ui/lib/utils"
import Link from "next/link"
import React from "react"

export interface SidebarItem {
	title: string
	url: string
	icon: React.ElementType
}

interface SidebarSectionProps {
	title: string
	items: SidebarItem[]
	isActive: (url: string) => boolean
}

export const SidebarSection = ({
	title,
	items,
	isActive,
}: SidebarSectionProps) => {
	const { state } = useSidebar()

	return (
		<SidebarGroup>
			<SidebarGroupLabel>{title}</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem
							key={item.title}
							className="perspective-distant"
						>
							{state === "collapsed" ?
								<Tooltip>
									<TooltipTrigger asChild>
										<SidebarMenuButton
											asChild
											size="sm"
											className={cn("py-4 text-[16px] ", {
												"bg-linear-to-br/oklch from-sidebar-primary to-sidebar-primary/70 text-background! hover:to-emerald300":
													isActive(item.url),
											})}
											isActive={isActive(item.url)}
										>
											<Link href={item.url}>
												{item.icon && <item.icon className="size-6" />}
												<span className="ml-2">{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</TooltipTrigger>
									<TooltipContent side="right">{item.title}</TooltipContent>
								</Tooltip>
							:	<SidebarMenuButton
									asChild
									size="sm"
									className={cn("py-4 text-[16px] ", {
										"bg-linear-to-br/oklch from-sidebar-primary to-sidebar-primary/70 text-background! hover:to-emerald300":
											isActive(item.url),
									})}
									isActive={isActive(item.url)}
								>
									<Link href={item.url}>
										{item.icon && <item.icon className="size-6" />}
										<span className="ml-2">{item.title}</span>
									</Link>
								</SidebarMenuButton>
							}
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
