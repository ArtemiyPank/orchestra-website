"use client"

import React from "react"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    />
  ),
)
Avatar.displayName = "Avatar"

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  onLoadingStatusChange?: (status: "loading" | "loaded" | "error") => void
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt = "", onLoadingStatusChange, ...props }, ref) => {
    const [status, setStatus] = React.useState<"loading" | "loaded" | "error">(src ? "loading" : "error")

    React.useEffect(() => {
      if (!src) {
        setStatus("error")
        onLoadingStatusChange?.("error")
        return
      }

      const image = new Image()
      image.src = src
      image.onload = () => {
        setStatus("loaded")
        onLoadingStatusChange?.("loaded")
      }
      image.onerror = () => {
        setStatus("error")
        onLoadingStatusChange?.("error")
      }
    }, [src, onLoadingStatusChange])

    return status === "loaded" ? (
      <img
        ref={ref}
        src={src || "/placeholder.svg"}
        alt={alt}
        className={cn("aspect-square h-full w-full", className)}
        {...props}
      />
    ) : null
  },
)
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
      {...props}
    />
  ),
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }

