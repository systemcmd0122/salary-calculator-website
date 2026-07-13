export type PayType = "hourly" | "monthly"
export type AgeBand = "under40" | "from40to64"

export interface CalcInput {
  payType: PayType
  ageBand: AgeBand
  // hourly
  hourlyWage: number
  hoursPerDay: number
  daysPerMonth: number
  // monthly
  baseSalary: number
  allowance: number
  // shared
  commute: number
}

export interface CalcResult {
  salary: number // 給与本体（交通費を除く）
  commute: number
  gross: number // 総支給額（交通費含む）
  healthInsurance: number
  pension: number
  employmentInsurance: number
  careInsurance: number
  socialTotal: number
  incomeTax: number
  residentTax: number
  taxTotal: number
  net: number // 差引手取り額
  deductionTotal: number
}

// 従業員負担分の概算料率（2024年度の一般的な水準を参考にした概算値）
const RATE_HEALTH = 0.05 // 健康保険（労使折半後の本人負担 約5%）
const RATE_PENSION = 0.0915 // 厚生年金（本人負担 9.15%）
const RATE_EMPLOYMENT = 0.006 // 雇用保険（本人負担 0.6%）
const RATE_CARE = 0.009 // 介護保険（40〜64歳の本人負担 約0.9%）
const RATE_INCOME_TAX = 0.05 // 所得税の概算（課税ベースの約5%）
const RATE_RESIDENT_TAX = 0.05 // 住民税の概算（課税ベースの約5%）

const clamp = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0)

export function calculate(input: CalcInput): CalcResult {
  const salary =
    input.payType === "hourly"
      ? clamp(input.hourlyWage) * clamp(input.hoursPerDay) * clamp(input.daysPerMonth)
      : clamp(input.baseSalary) + clamp(input.allowance)

  const commute = clamp(input.commute)
  const gross = salary + commute

  // 社会保険料の算定基礎（通勤手当を含む総支給額を基礎として概算）
  const healthInsurance = Math.round(gross * RATE_HEALTH)
  const pension = Math.round(gross * RATE_PENSION)
  const employmentInsurance = Math.round(gross * RATE_EMPLOYMENT)
  const careInsurance = input.ageBand === "from40to64" ? Math.round(gross * RATE_CARE) : 0
  const socialTotal = healthInsurance + pension + employmentInsurance + careInsurance

  // 課税ベース：総支給額から社会保険料と非課税の交通費を差し引く
  const taxBase = Math.max(0, gross - socialTotal - commute)
  const incomeTax = Math.round(taxBase * RATE_INCOME_TAX)
  const residentTax = Math.round(taxBase * RATE_RESIDENT_TAX)
  const taxTotal = incomeTax + residentTax

  const deductionTotal = socialTotal + taxTotal
  const net = Math.max(0, gross - deductionTotal)

  return {
    salary,
    commute,
    gross,
    healthInsurance,
    pension,
    employmentInsurance,
    careInsurance,
    socialTotal,
    incomeTax,
    residentTax,
    taxTotal,
    net,
    deductionTotal,
  }
}

export const yen = (n: number) => `¥${Math.round(n).toLocaleString("ja-JP")}`
