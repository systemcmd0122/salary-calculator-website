import { yen } from "@/lib/calc"

export type Segment = {
  label: string
  value: number
  color: string
}

export function DonutChart({ segments, centerLabel, centerValue }: { segments: Segment[]; centerLabel: string; centerValue: number }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1
  const radius = 70
  const stroke = 26
  const circumference = 2 * Math.PI * radius

  let offset = 0
  const arcs = segments.map((seg) => {
    const fraction = seg.value / total
    const dash = fraction * circumference
    const arc = {
      ...seg,
      dashArray: `${dash} ${circumference - dash}`,
      dashOffset: -offset,
      fraction,
    }
    offset += dash
    return arc
  })

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-8">
      <div className="relative shrink-0">
        <svg width="180" height="180" viewBox="0 0 180 180" role="img" aria-label="手取りと控除の内訳グラフ">
          <g transform="rotate(-90 90 90)">
            <circle cx="90" cy="90" r={radius} fill="none" stroke="var(--muted)" strokeWidth={stroke} />
            {arcs.map((arc) => (
              <circle
                key={arc.label}
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke={arc.color}
                strokeWidth={stroke}
                strokeDasharray={arc.dashArray}
                strokeDashoffset={arc.dashOffset}
                strokeLinecap="butt"
              />
            ))}
          </g>
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs text-muted-foreground">{centerLabel}</span>
          <span className="font-display text-lg font-bold text-foreground">{yen(centerValue)}</span>
        </div>
      </div>

      <ul className="grid w-full grid-cols-1 gap-x-6 gap-y-2 sm:w-auto sm:grid-cols-1">
        {segments.map((seg) => (
          <li key={seg.label} className="flex items-center justify-between gap-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="size-3 shrink-0 rounded-sm" style={{ backgroundColor: seg.color }} aria-hidden="true" />
              <span className="text-foreground">{seg.label}</span>
            </span>
            <span className="tabular-nums text-muted-foreground">
              {Math.round((seg.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
