"use client"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	useSidebar,
} from "@workspace/ui/components/sidebar"
import { HeroIcons } from "@workspace/ui/icons/react-icons"
import { cn } from "@workspace/ui/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { SidebarSection } from "./sidebar-section"

import type { SidebarItem } from "./sidebar-section"

const customSupportItems: SidebarItem[] = [
	{
		title: "Conversations",
		url: "/conversations",
		icon: HeroIcons.HiChat,
	},
	{
		title: "Knowledge Base",
		url: "/knowledge-base",
		icon: HeroIcons.HiLibrary,
	},
]

// configuration itms Widget Customization, Integration, Voice Assistant, Settings
const configurationItems: SidebarItem[] = [
	{
		title: "Widget Customization",
		url: "/widget-customization",
		icon: HeroIcons.HiAdjustments,
	},
	{
		title: "Integrations",
		url: "/integrations",
		icon: HeroIcons.HiPuzzle,
	},
	{
		title: "Voice Assistant",
		url: "/plugins/vapi",
		icon: HeroIcons.HiMicrophone,
	},
]

// accounts item = Plan&Billing, Settings, Profile
const accountsItems: SidebarItem[] = [
	{
		title: "Plan & Billing",
		url: "/plan-billing",
		icon: HeroIcons.HiCreditCard,
	},
	{
		title: "Settings",
		url: "/settings",
		icon: HeroIcons.HiCog,
	},
	{
		title: "Profile",
		url: "/profile",
		icon: HeroIcons.HiUser,
	},
]

type Props = {}
export const DashboardSidebar = (props: Props) => {
	const pathname = usePathname()
	const { state } = useSidebar()
	const isActive = (url: string) => {
		if (url === "/") {
			return pathname === "/"
		}
		return pathname.startsWith(url)
	}
	return (
		<Sidebar
			className="group"
			collapsible="icon"
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							size={"lg"}
						/>
						<OrganizationSwitcher
							hidePersonal
							skipInvitationScreen
							appearance={{
								elements: {
									rootBox: "w-full! h-8! ",
									avatarBox: "size-4! rounded-full! bg",
									organizationSwitcherTrigger:
										"w-full! h-8! px-2 	hover:bg-sidebar-accent! hover:text-sidebar-accent-foreground! group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-4! justify-start!",
									organizationSwitcherTriggerIcon:
										"group-data-[collapsible=icon]:hidden! ml-auto text-sidebar-foreground!",
									userButtonAvatarBox: "w-6 h-6 bg",
									organizationPreview:
										"group-data-[collapsible=icon]:justify-center! gap-4!",
									organizationPreviewAvatarBox: "size-6! rounded-md!",
									organizationPreviewTextContainer:
										"group-data-[collapsible=icon]:hidden! text-xs! font-medium! text-sidebar-foreground!",
								},
							}}
						/>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarSection
					title="Customer Support"
					items={customSupportItems}
					isActive={isActive}
				/>
				<SidebarSection
					title="Configuration"
					items={configurationItems}
					isActive={isActive}
				/>
				<SidebarSection
					title="Accounts"
					items={accountsItems}
					isActive={isActive}
				/>
			</SidebarContent>
			<SidebarRail />
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							size="sm"
							className="py-4 text-[16px] will-change-contents"
						>
							<UserButton
								showName={state === "expanded" ? true : false}
								appearance={{
									elements: {
										rootBox: "w-full! h-8! mb-4!",
										userButtonTrigger:
											"w-full!  px-2! hover:bg-sidebar-accent!	hover:text-sidebar-accent-foreground! group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [collapsible=icon]:justify-center! flex! justify-center! items-center! size-full! py-6!",
										userButtonBox:
											"w-full! flex-row-reverse! justify-end! p-0! size-full! [collapsible=icon]:justify-start! gap-4! text-sidebar-foreground!",
										userButtonOuterIdentifier:
											"pl-0! [collapsible=icon]:hidden! ",
										avatarBox: "size-6! rounded-md!",
									},
								}}
							/>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
