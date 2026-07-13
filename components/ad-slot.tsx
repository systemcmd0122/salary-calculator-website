import { cn } from "@/lib/utils"

type AdSlotProps = {
  /** aspect / sizing preset */
  variant?: "leaderboard" | "infeed" | "square"
  className?: string
  label?: string
}

const variantClasses: Record<NonNullable<AdSlotProps["variant"]>, string> = {
  // 728x90 相当のリーダーボード
  leaderboard: "h-[90px] w-full max-w-[728px]",
  // インフィード風のワイドバナー
  infeed: "h-[120px] w-full",
  // 300x250 のレクタングル
  square: "h-[250px] w-[300px] max-w-full",
}

export function AdSlot({ variant = "leaderboard", className, label = "広告 / Advertisement" }: AdSlotProps) {
  return (
    <div
      role="complementary"
      aria-label="広告スペース"
      className={cn(
        "mx-auto flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/60",
        variantClasses[variant],
        className,
      )}
    >
      <span className="select-none text-xs font-medium tracking-wide text-muted-foreground/70">{label}</span>
    </div>
  )
}
