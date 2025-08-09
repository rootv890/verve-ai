"use client"

import { useAtomValue } from "jotai"
import { AlertTriangleIcon } from "lucide-react"
import React from "react"
import { errorMessageAtom } from "../../atoms/widget-atoms"
import WidgetHeader from "../components/widget-header"

type Props = {}

export const WidgetInboxScreen = (props: Props) => {
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
			<div className="flex flex-col  justify-center px-2 py-6 gap-y-2 ">
				INBOX
			</div>
		</>
	)
}
