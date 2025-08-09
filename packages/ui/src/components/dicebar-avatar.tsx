import { glass } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"
import { Avatar, AvatarImage } from "@workspace/ui/components/avatar.js"
import { useMemo } from "react"
import { cn } from "../lib/utils.js"

interface DicebarAvatarProps {
	seed: string
	size?: number
	className?: string
	badgeClassName?: string
	imageUrl?: string
	badgeImageUrl?: string
}

export function DicebarAvatar({
	seed,
	size = 40,
	badgeClassName,
	badgeImageUrl,
	imageUrl,
	className,
}: DicebarAvatarProps) {
	const avatarMemo = useMemo(() => {
		return createAvatar(glass, {
			seed,
			size,
		})
	}, [seed, size])

	const avatarSrc = imageUrl ? imageUrl : avatarMemo.toDataUri()
	const badgeSize = Math.round(size * 0.5)

	return (
		<div
			className={cn(" relative inline-block")}
			style={{ width: size, height: size }}
		>
			<Avatar
				className={cn("border", className)}
				style={{ width: size, height: size }}
			>
				<AvatarImage
					src={avatarSrc}
					alt={`Avatar for ${seed}`}
				/>
				{badgeImageUrl && (
					<div
						className={cn(
							"absolute  right-0 bottom-0 flex items-center justify-center overflow-visible rounded-full border-2 bg-background",
							badgeClassName
						)}
						style={{
							backgroundImage: `url(${badgeImageUrl})`,
							backgroundSize: "cover",
							width: badgeSize,
							height: badgeSize,
							transform: "translate(15%, 15%)",
						}}
					>
						<img
							src={badgeImageUrl}
							alt="badge"
							width={badgeSize}
							height={badgeSize}
							className="size-full object-cover"
						/>
					</div>
				)}
			</Avatar>
		</div>
	)
}
