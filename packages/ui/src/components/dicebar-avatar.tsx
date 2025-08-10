import { glass } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"
import { useMemo } from "react"
import { cn } from "../lib/utils"
import { Avatar, AvatarImage } from "./avatar"

interface DicebarAvatarProps {
	seed: string
	size?: number
	className?: string
	badgeClassName?: string
	imageUrl?: string
	badgeImageUrl?: string
	showRing?: boolean
}

export function DicebarAvatar({
	seed,
	size = 48,
	badgeClassName,
	badgeImageUrl,
	imageUrl,
	className,
	showRing = true,
}: DicebarAvatarProps) {
	const avatarMemo = useMemo(() => {
		return createAvatar(glass, {
			seed,
			size: size * 2, // render at 2x for crispness
		})
	}, [seed, size])

	const avatarSrc = imageUrl || avatarMemo.toDataUri()
	const badgeSize = Math.round(size * 0.42) // smaller flair like Reddit

	return (
		<div
			className={cn("relative inline-block", className)}
			style={{ width: size, height: size }}
		>
			{/* Main Avatar */}
			<Avatar
				className={cn(
					"overflow-hidden rounded-full",
					showRing &&
						"ring-2 ring-offset-2 ring-primary/60 hover:ring-primary transition-all rounded-xl duration-200"
				)}
				style={{
					width: size,
					height: size,
					boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
				}}
			>
				<AvatarImage
					src={avatarSrc}
					alt={`Avatar for ${seed}`}
					className="object-cover"
					draggable={false}
				/>
			</Avatar>

			{/* Badge / Flair */}
			{badgeImageUrl && (
				<div
					className={cn(
						"absolute right-0 bottom-0 flex items-center justify-center rounded-xs border border-background bg-background shadow-md",
						badgeClassName
					)}
					style={{
						width: badgeSize,
						height: badgeSize,
						transform: "translate(30%, 30%)",
					}}
				>
					<img
						src={badgeImageUrl}
						alt="badge"
						width={badgeSize}
						height={badgeSize}
						className="size-full object-cover rounded-xs"
						draggable={false}
					/>
				</div>
			)}
		</div>
	)
}
