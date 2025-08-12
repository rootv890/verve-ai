"use client"

import { Button } from "@workspace/ui/components/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@workspace/ui/components/select"
import { Textarea } from "@workspace/ui/components/textarea"
import { cn } from "@workspace/ui/lib/utils"
import { Loader2Icon, SendIcon, SquareIcon, XIcon } from "lucide-react"
import type {
	ComponentProps,
	HTMLAttributes,
	KeyboardEventHandler,
} from "react"
import { Children, useCallback, useEffect, useRef } from "react"

type UseAutoResizeTextareaProps = {
	minHeight: number
	maxHeight?: number
}

const useAutoResizeTextarea = ({
	minHeight,
	maxHeight,
}: UseAutoResizeTextareaProps) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const adjustHeight = useCallback(
		(reset?: boolean) => {
			const textarea = textareaRef.current
			if (!textarea) {
				return
			}

			if (reset) {
				textarea.style.height = `${minHeight}px`
				return
			}

			// Temporarily shrink to get the right scrollHeight
			textarea.style.height = `${minHeight}px`

			// Calculate new height
			const newHeight = Math.max(
				minHeight,
				Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
			)

			textarea.style.height = `${newHeight}px`
		},
		[minHeight, maxHeight]
	)

	useEffect(() => {
		adjustHeight()
	})

	return { textareaRef, adjustHeight }
}

export type InputProps = HTMLAttributes<HTMLFormElement>

export const Input = ({ className, ...props }: InputProps) => (
	<form
		className={cn(
			"w-full divide-y overflow-hidden rounded-xl border bg-background shadow-sm",
			className
		)}
		{...props}
	/>
)

export type InputTextareaProps = ComponentProps<typeof Textarea> & {
	minHeight?: number
	maxHeight?: number
	onEnter?: () => void
}

export const InputTextarea = ({
	className,
	minHeight = 60,
	maxHeight = 200,
	onEnter,
	onKeyDown,
	...props
}: InputTextareaProps) => {
	const { textareaRef, adjustHeight } = useAutoResizeTextarea({
		minHeight,
		maxHeight,
	})

	const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
		(event) => {
			if (event.key === "Enter" && !event.shiftKey) {
				event.preventDefault()
				onEnter?.()
			}

			onKeyDown?.(event)
		},
		[onEnter, onKeyDown]
	)

	useEffect(() => {
		adjustHeight()
	}, [adjustHeight, props.value])

	return (
		<Textarea
			{...props}
			ref={textareaRef}
			className={cn(
				"min-h-0 resize-none border-0 bg-transparent p-4 text-sm shadow-none focus-visible:ring-0",
				className
			)}
			onKeyDown={handleKeyDown}
			style={{
				height: `${minHeight}px`,
				...props.style,
			}}
		/>
	)
}

export type InputToolbarProps = HTMLAttributes<HTMLDivElement>

export const InputToolbar = ({ className, ...props }: InputToolbarProps) => (
	<div
		className={cn(
			"flex items-center justify-between gap-2 p-3 text-xs",
			className
		)}
		{...props}
	/>
)

export type InputToolsProps = HTMLAttributes<HTMLDivElement>

export const InputTools = ({ className, ...props }: InputToolsProps) => (
	<div
		className={cn("flex items-center gap-1", className)}
		{...props}
	/>
)

export type InputButtonProps = ComponentProps<typeof Button>

export const InputButton = ({
	variant = "ghost",
	size = "sm",
	...props
}: InputButtonProps) => (
	<Button
		variant={variant}
		size={size}
		{...props}
	/>
)

export type InputSelectProps = ComponentProps<typeof Select>

export const InputSelect = (props: InputSelectProps) => <Select {...props} />

export const InputSelectTrigger = SelectTrigger
export const InputSelectContent = SelectContent
export const InputSelectItem = SelectItem
export const InputSelectValue = SelectValue

export type InputSubmitProps = ComponentProps<typeof Button> & {
	isLoading?: boolean
	canStop?: boolean
	onStop?: () => void
}

export const InputSubmit = ({
	className,
	children,
	size = "sm",
	isLoading = false,
	canStop = false,
	onStop,
	...props
}: InputSubmitProps) => {
	const handleClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			if (canStop && onStop) {
				event.preventDefault()
				onStop()
				return
			}

			props.onClick?.(event)
		},
		[canStop, onStop, props]
	)

	return (
		<Button
			{...props}
			className={cn("shrink-0", className)}
			onClick={handleClick}
			size={size}
			type={canStop ? "button" : "submit"}
		>
			{children ||
				(isLoading ? <Loader2Icon className="size-4 animate-spin" />
				: canStop ? <SquareIcon className="size-4" />
				: <SendIcon className="size-4" />)}
		</Button>
	)
}

// Aliases for compatibility with AI* naming convention
export const AIInput = Input
export const AIInputTextarea = InputTextarea
export const AIInputToolbar = InputToolbar
export const AIInputTools = InputTools
export const AIInputButton = InputButton
export const AIInputSelect = InputSelect
export const AIInputSelectTrigger = InputSelectTrigger
export const AIInputSelectContent = InputSelectContent
export const AIInputSelectItem = InputSelectItem
export const AIInputSelectValue = InputSelectValue
export const AIInputSubmit = InputSubmit
