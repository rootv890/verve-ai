"use client"

import { useAtom, useAtomValue, useSetAtom } from "jotai"

import { api } from "@workspace/backend/_generated/api"
import { Id } from "@workspace/backend/_generated/dataModel"
import { useAction, useMutation } from "convex/react"
import React from "react"
import {
	contactSessionIdAtomFamily,
	errorMessageAtom,
	loadingMessageAtom,
	organizationIdAtom,
	screenAtom,
} from "../../atoms/widget-atoms"
import WidgetHeader from "../components/widget-header"

type Props = {
	organizationId: string | null
}

type InitStep =
	| "storage"
	| "organization"
	| "session"
	| "settings"
	| "vapi"
	| "done"

export const WidgetLoadingScreen = ({ organizationId }: Props) => {
	const [step, setStep] = React.useState<InitStep>("organization")
	const setErrorMessage = useSetAtom(errorMessageAtom)
	const loadingMessage = useAtomValue(loadingMessageAtom)
	const setScreen = useSetAtom(screenAtom)
	const setOrganizationId = useSetAtom(organizationIdAtom)
	const setLoadingMessage = useSetAtom(loadingMessageAtom)
	const [sessionIsValid, setSessionIsValid] = React.useState(false)
	const contactSessionId = useAtomValue(
		contactSessionIdAtomFamily(organizationId || "")
	)

	// 1. Validate Organization
	const validateOrganization = useAction(api.public.organizations.validate)
	React.useEffect(() => {
		if (step !== "organization") return
		setLoadingMessage("Finding organization...")
		if (!organizationId) {
			setErrorMessage("Organization ID is required to proceed.")
			setScreen("error")
			return
		}
		setLoadingMessage("Verifying organization...")
		validateOrganization({
			organizationId,
		})
			.then((result) => {
				if (result.valid) {
					setOrganizationId(organizationId)
					setSessionIsValid(true)
					setStep("session")
				} else {
					setErrorMessage(result.reason || "Invalid organization ID.")
					setScreen("error")
					console.error("Step 01 : Organization validation failed.")
				}
			})
			.catch(() => {
				setErrorMessage("Failed to validate organization.")
				setScreen("error")
			})
	}, [
		step,
		organizationId,
		loadingMessage,
		setOrganizationId,
		setErrorMessage,
		setStep,
		setScreen,
		validateOrganization,
		setLoadingMessage,
	])

	// 2.  Validate Session
	const validateContactSession = useMutation(
		api.public.contactSessions.validate
	)
	React.useEffect(() => {
		if (step !== "session") return

		if (!contactSessionId) {
			setSessionIsValid(false)
			setStep("done")
			return
		}

		setLoadingMessage("Finding contact session...")

		validateContactSession({
			contactSessionId,
		})
			.then((result) => {
				setSessionIsValid(result.valid)
				setStep("done")
			})
			.catch(() => {
				setSessionIsValid(false)
				setStep("settings")
			})
	}, [step, contactSessionId, setLoadingMessage, validateContactSession])

	// 3. Set Screen based on Session Validity
	React.useEffect(() => {
		if (step !== "done") return
		const hasValidSession = contactSessionId && sessionIsValid
		setScreen(hasValidSession ? "selection" : "auth")
	}, [step, sessionIsValid, contactSessionId, setScreen, setLoadingMessage])

	return (
		<>
			<WidgetHeader>
				<div className="flex flex-col items-start justify-between px-2 py-6 gap-y-2 ">
					<h1 className="text-2xl text-primary-foreground font-serif font-semibold text-center">
						Hi there 👋
					</h1>
					<p className="text-sm font-semibold text-center  text-primary ">
						Let's get you started with Verve AI! Please enter your details below
						to
					</p>
				</div>
			</WidgetHeader>
			<div className="flex flex-col items-center justify-center px-2 py-6 gap-y-2 ">
				<div className="relative h-10 w-10">
					<div className="absolute inset-0 animate-spin rounded-2xl border-4 border-primary border-t-transparent border-b-transparent" />
					<div className="absolute inset-2 rounded-xl animate-spin direction-reverse duration-700 bg-transparent border-4  border-primary  opacity-80" />
				</div>
				Step: {step}
				Session Valid: {sessionIsValid ? "Yes" : "No"}
				Loading Message: {loadingMessage}
				<p className="text-primary text-sm mt-2 animate-pulse">
					{loadingMessage || "Please wait while we set things up for you."}
				</p>
			</div>
		</>
	)
}
