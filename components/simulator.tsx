"use client"

import { useMemo, useState } from "react"
import { Clock, CalendarDays, Wallet, TramFront, Info, ArrowDownRight } from "lucide-react"
import { calculate, yen, type PayType, type AgeBand } from "@/lib/calc"
import { DonutChart, type Segment } from "@/components/donut-chart"
import { AdSlot } from "@/components/ad-slot"
import { cn } from "@/lib/utils"

function NumberField({
  id,
  label,
  value,
  onChange,
  suffix,
  icon,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  suffix: string
  icon?: React.ReactNode
  placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-center gap-1.5 text-sm font-medium text-foreground">
        {icon}
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={0}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full rounded-lg border border-input bg-card px-3 pr-12 text-right text-base tabular-nums text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
          {suffix}
        </span>
      </div>
    </div>
  )
}

export function Simulator() {
  const [payType, setPayType] = useState<PayType>("hourly")
  const [ageBand, setAgeBand] = useState<AgeBand>("under40")

  const [hourlyWage, setHourlyWage] = useState("1200")
  const [hoursPerDay, setHoursPerDay] = useState("8")
  const [daysPerMonth, setDaysPerMonth] = useState("20")

  const [baseSalary, setBaseSalary] = useState("250000")
  const [allowance, setAllowance] = useState("20000")

  const [commute, setCommute] = useState("10000")

  const result = useMemo(
    () =>
      calculate({
        payType,
        ageBand,
        hourlyWage: Number(hourlyWage),
        hoursPerDay: Number(hoursPerDay),
        daysPerMonth: Number(daysPerMonth),
        baseSalary: Number(baseSalary),
        allowance: Number(allowance),
        commute: Number(commute),
      }),
    [payType, ageBand, hourlyWage, hoursPerDay, daysPerMonth, baseSalary, allowance, commute],
  )

  const segments: Segment[] = [
    { label: "手取り", value: result.net, color: "var(--chart-1)" },
    { label: "厚生年金", value: result.pension, color: "var(--chart-2)" },
    { label: "健康保険", value: result.healthInsurance, color: "var(--chart-3)" },
    {
      label: "税金（所得税・住民税）",
      value: result.taxTotal,
      color: "var(--chart-4)",
    },
    {
      label: "その他保険（雇用・介護）",
      value: result.employmentInsurance + result.careInsurance,
      color: "var(--chart-5)",
    },
  ].filter((s) => s.value > 0)

  const netRate = result.gross > 0 ? Math.round((result.net / result.gross) * 100) : 0

  const tableRows: { label: string; value: number; kind: "plus" | "minus" | "net" }[] = [
    { label: "総支給額", value: result.gross, kind: "plus" },
    { label: "健康保険", value: result.healthInsurance, kind: "minus" },
    { label: "厚生年金", value: result.pension, kind: "minus" },
    { label: "雇用保険", value: result.employmentInsurance, kind: "minus" },
    ...(result.careInsurance > 0
      ? [{ label: "介護保険", value: result.careInsurance, kind: "minus" as const }]
      : []),
    { label: "所得税", value: result.incomeTax, kind: "minus" },
    { label: "住民税", value: result.residentTax, kind: "minus" },
    { label: "差引手取り額", value: result.net, kind: "net" },
  ]

  return (
    <section id="simulator" className="scroll-mt-20">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* 入力エリア */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="font-display text-xl font-bold text-foreground">条件を入力</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            金額を入力すると、右側の結果が自動で更新されます。
          </p>

          {/* 給与形態タブ */}
          <div className="mt-5">
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1" role="tablist" aria-label="給与形態">
              {(
                [
                  { key: "hourly", label: "時給" },
                  { key: "monthly", label: "月給" },
                ] as const
              ).map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={payType === t.key}
                  onClick={() => setPayType(t.key)}
                  className={cn(
                    "h-10 rounded-lg text-sm font-semibold transition-colors",
                    payType === t.key
                      ? "bg-card text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* 入力フィールド */}
          <div className="mt-5 grid gap-4">
            {payType === "hourly" ? (
              <>
                <NumberField
                  id="hourlyWage"
                  label="時給"
                  value={hourlyWage}
                  onChange={setHourlyWage}
                  suffix="円"
                  icon={<Wallet className="size-4 text-muted-foreground" />}
                />
                <div className="grid grid-cols-2 gap-4">
                  <NumberField
                    id="hoursPerDay"
                    label="1日の労働時間"
                    value={hoursPerDay}
                    onChange={setHoursPerDay}
                    suffix="時間"
                    icon={<Clock className="size-4 text-muted-foreground" />}
                  />
                  <NumberField
                    id="daysPerMonth"
                    label="月間の出勤日数"
                    value={daysPerMonth}
                    onChange={setDaysPerMonth}
                    suffix="日"
                    icon={<CalendarDays className="size-4 text-muted-foreground" />}
                  />
                </div>
              </>
            ) : (
              <>
                <NumberField
                  id="baseSalary"
                  label="基本給"
                  value={baseSalary}
                  onChange={setBaseSalary}
                  suffix="円"
                  icon={<Wallet className="size-4 text-muted-foreground" />}
                />
                <NumberField
                  id="allowance"
                  label="手当（月額）"
                  value={allowance}
                  onChange={setAllowance}
                  suffix="円"
                  icon={<Wallet className="size-4 text-muted-foreground" />}
                />
              </>
            )}

            <NumberField
              id="commute"
              label="交通費（月額）"
              value={commute}
              onChange={setCommute}
              suffix="円"
              icon={<TramFront className="size-4 text-muted-foreground" />}
            />
          </div>

          {/* 年齢区分 */}
          <fieldset className="mt-5">
            <legend className="text-sm font-medium text-foreground">年齢区分</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {(
                [
                  { key: "under40", label: "19歳〜39歳", sub: "介護保険なし" },
                  { key: "from40to64", label: "40歳〜64歳", sub: "介護保険あり" },
                ] as const
              ).map((opt) => (
                <label
                  key={opt.key}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors",
                    ageBand === opt.key
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-secondary",
                  )}
                >
                  <input
                    type="radio"
                    name="ageBand"
                    className="mt-0.5 size-4 accent-primary"
                    checked={ageBand === opt.key}
                    onChange={() => setAgeBand(opt.key)}
                  />
                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{opt.label}</span>
                    <span className="text-xs text-muted-foreground">{opt.sub}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* 結果表示エリア */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <div className="rounded-xl bg-primary p-5 text-center text-primary-foreground">
              <p className="text-sm opacity-90">あなたの推定月間の手取り額</p>
              <p className="mt-1 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                {yen(result.net)}
              </p>
              <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium">
                <ArrowDownRight className="size-3.5" aria-hidden="true" />
                総支給額 {yen(result.gross)} の約 {netRate}%
              </p>
            </div>

            <div className="mt-6">
              <DonutChart segments={segments} centerLabel="手取り" centerValue={result.net} />
            </div>
          </div>

          {/* 内訳テーブル */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h3 className="font-display text-lg font-bold text-foreground">内訳</h3>
            <dl className="mt-3 divide-y divide-border">
              {tableRows.map((row) => (
                <div
                  key={row.label}
                  className={cn(
                    "flex items-center justify-between py-2.5",
                    row.kind === "net" && "mt-1 rounded-lg bg-accent/10 px-3",
                  )}
                >
                  <dt
                    className={cn(
                      "text-sm",
                      row.kind === "net" ? "font-bold text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {row.label}
                  </dt>
                  <dd
                    className={cn(
                      "tabular-nums",
                      row.kind === "net" && "font-display text-lg font-bold text-accent",
                      row.kind === "plus" && "font-semibold text-foreground",
                      row.kind === "minus" && "text-foreground",
                    )}
                  >
                    {row.kind === "minus" ? `- ${yen(row.value)}` : yen(row.value)}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground">
              <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              上記は概算です。実際の控除額は加入する健康保険組合や自治体、扶養状況などにより異なります。
            </p>
          </div>
        </div>
      </div>

      {/* 計算結果直下のインフィード風広告 */}
      <div className="mt-6">
        <AdSlot variant="infeed" />
      </div>
    </section>
  )
}
