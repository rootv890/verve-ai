"use client"

import { useAtomValue } from "jotai"
import { AlertTriangleIcon } from "lucide-react"
import React from "react"
import { errorMessageAtom } from "../../atoms/widget-atoms"
import WidgetHeader from "../components/widget-header"

type Props = {}

const WidgetErrorScreen = (props: Props) => {
	const errorMessage = useAtomValue(errorMessageAtom)
	console.log("Error Message::::", errorMessage)
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
			<div className="flex flex-col items-center justify-center px-2 py-6 gap-y-2 ">
				<AlertTriangleIcon className="text-orange-500 size-12" />
				<p className="text-sm font-semibold text-center">
					{errorMessage || "Invalid Credentials/Configuration"}
				</p>
			</div>
		</>
	)
}

export default WidgetErrorScreen
