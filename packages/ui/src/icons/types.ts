import { LucideProps } from "lucide-react"
import { IconBaseProps } from "react-icons"

// Common icon props that work for both libraries
export interface IconProps extends Omit<LucideProps, "ref"> {
	size?: string | number
}

// Extended props for react-icons specific features
export interface ReactIconProps extends IconBaseProps {
	// Add any react-icons specific props you might need
}

// Union type for all icon props
export type UnifiedIconProps = IconProps | ReactIconProps

// Icon library types
export type IconLibrary = "lucide" | "react-icons"

// Icon component type
export type IconComponent = React.ComponentType<IconProps>
