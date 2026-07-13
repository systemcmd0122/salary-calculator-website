import { ShieldCheck, Zap, WifiOff } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Simulator } from "@/components/simulator"
import { InfoSections } from "@/components/info-sections"
import { AdSlot } from "@/components/ad-slot"

const features = [
  { icon: Zap, title: "入力するだけ", desc: "金額を入れると即座に手取りを自動計算。" },
  { icon: WifiOff, title: "登録・送信不要", desc: "すべてブラウザ内で完結。無料で使えます。" },
  { icon: ShieldCheck, title: "データは安全", desc: "入力内容はサーバーに送信されません。" },
]

export default function Page() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <SiteHeader />

      {/* ヘッダー下：リーダーボード広告 */}
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <AdSlot variant="leaderboard" />
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        {/* ヒーロー */}
        <section className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            無料・登録不要のオンラインツール
          </span>
          <h1 className="mt-4 text-balance font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            バイト代・給与の手取りを
            <span className="text-primary">一発シミュレーション</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            時給や月給を入力するだけで、社会保険料・所得税・住民税を差し引いた
            「毎月の手取り額」の目安がすぐに分かります。
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
            <a href="/guide" className="text-primary underline-offset-2 hover:underline">
              計算ガイドを読む →
            </a>
            <span className="text-muted-foreground">|</span>
            <a href="#faq" className="text-primary underline-offset-2 hover:underline">
              よくある質問
            </a>
            <span className="text-muted-foreground">|</span>
            <a href="/about" className="text-primary underline-offset-2 hover:underline">
              運営者情報
            </a>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {features.map((f) => (
              <li
                key={f.title}
                className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-4 text-center"
              >
                <f.icon className="size-5 text-primary" aria-hidden="true" />
                <span className="text-sm font-semibold text-foreground">{f.title}</span>
                <span className="text-xs text-muted-foreground">{f.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* シミュレーター */}
        <div className="mt-10">
          <Simulator />
        </div>

        {/* コンテンツ + サイドバー */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            <InfoSections />
          </div>

          {/* サイドバー（PC）／コンテンツ下部（スマホ）のスクエア広告 */}
          <aside className="lg:pt-1">
            <div className="lg:sticky lg:top-20">
              <AdSlot variant="square" />
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
