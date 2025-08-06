"use client"

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
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
	return (
		<SidebarGroup>
			<SidebarGroupLabel>{title}</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								asChild
								size="sm"
								className="py-4 text-[16px]"
								isActive={isActive(item.url)}
							>
								<Link href={item.url}>
									{item.icon && <item.icon className="size-6" />}
									<span className="ml-2">{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
