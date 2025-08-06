import React from "react"

type Props = {}

const VapiPluginpage = (props: Props) => {
	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center justify-between p-6 border-b">
				<h1 className="text-3xl font-serif">VAPI Plugin</h1>
			</div>
			<div className="flex-1 p-6">
				<p className="text-muted-foreground">
					Manage your VAPI plugin settings and configurations here.
				</p>
			</div>
		</div>
	)
}

export default VapiPluginpage
