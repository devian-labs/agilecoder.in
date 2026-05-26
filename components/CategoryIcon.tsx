"use client"
import { Icon } from "@iconify/react"

interface Props {
  icon: string
  color?: string
  size?: number
  className?: string
}

export function CategoryIcon({ icon, color, size = 14, className }: Props) {
  if (!icon) return null
  if (icon.includes(":")) {
    return <Icon icon={icon} width={size} height={size} style={color ? { color } : undefined} className={className} />
  }
  // legacy emoji
  return <span className={className}>{icon}</span>
}
