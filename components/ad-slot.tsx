"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type AdSlotProps = {
  variant?: "leaderboard" | "infeed" | "square"
  className?: string
}

const variantConfig: Record<NonNullable<AdSlotProps["variant"]>, { style: string; format: string; slot: string }> = {
  leaderboard: {
    style: "display:inline-block;width:728px;height:90px",
    format: "auto",
    slot: "1234567890",
  },
  infeed: {
    style: "display:inline-block;width:100%;height:120px",
    format: "fluid",
    slot: "1234567891",
  },
  square: {
    style: "display:inline-block;width:300px;height:250px",
    format: "auto",
    slot: "1234567892",
  },
}

const variantClasses: Record<NonNullable<AdSlotProps["variant"]>, string> = {
  leaderboard: "h-[90px] w-full max-w-[728px]",
  infeed: "h-[120px] w-full",
  square: "h-[250px] w-[300px] max-w-full",
}

export function AdSlot({ variant = "leaderboard", className }: AdSlotProps) {
  const ref = useRef<HTMLDivElement>(null)
  const config = variantConfig[variant]

  useEffect(() => {
    if (!ref.current) return
    // @ts-expect-error adsbygoogle global
    if (typeof window !== "undefined" && window.adsbygoogle) {
      try {
        ;(window.adsbygoogle as unknown[]).push({})
      } catch {
        // AdSense not loaded yet
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto flex items-center justify-center overflow-hidden",
        variantClasses[variant],
        className,
      )}
    >
      <ins
        className="adsbygoogle"
        style={config.style}
        data-ad-client="ca-pub-5931540016126544"
        data-ad-slot={config.slot}
        data-ad-format={config.format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
