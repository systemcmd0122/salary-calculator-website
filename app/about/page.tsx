import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { Calculator, Mail, Shield, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "運営者情報・お問い合わせ | 手取り計算くん",
  description: "手取り計算くんの運営者情報とお問い合わせ方法をご案内します。",
}

const infoItems = [
  {
    icon: Calculator,
    title: "サービス名",
    content: "手取り計算くん",
  },
  {
    icon: Clock,
    title: "運営開始",
    content: "2024年",
  },
  {
    icon: Shield,
    title: "プライバシー",
    content: "入力データはサーバーに送信されません",
  },
  {
    icon: Mail,
    title: "お問い合わせ",
    content: "お問い合わせはメールにてお願いいたします",
  },
]

export default function AboutPage() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "運営者情報" },
          ]}
        />
        <h1 className="mt-6 font-display text-3xl font-bold text-foreground">運営者情報・お問い合わせ</h1>

        <div className="mt-8 space-y-8">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-foreground">このサイトについて</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              「手取り計算くん」は、日本のアルバイト・正社員の方が自分の手取り額を簡単に把握できるよう開発された無料のオンラインシミュレーターです。時給や月給を入力するだけで、社会保険料や税金を差し引いた手取り額の目安を即座に確認できます。
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              すべての計算はブラウザ上で完結し、入力データがサーバーに送信されることはありません。プライバシーを大切にしながら、どなたでも安心してご利用いただけます。
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-foreground">運営情報</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {infoItems.map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-xl border border-border p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-foreground">お問い合わせ</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              本サービスに関するご質問、ご要望、不具合報告などございましたら、下記のメールアドレスにお問い合わせください。
            </p>
            <div className="mt-4 rounded-xl bg-secondary p-4 text-center">
              <p className="text-sm text-muted-foreground">メールアドレス</p>
              <p className="mt-1 font-display text-lg font-bold text-primary">info@tezuri-calc.example.com</p>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              ※ お返信には数日〜1週間程度かかる場合がございます。ご了承ください。
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-foreground">よくあるご質問</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Q: 計算結果は正確ですか？</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  A: あくまで概算です。実際の手取り額は加入する健康保険組合、扶養状況、年末調整の結果等により異なります。正式な金額は勤務先にご確認ください。
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Q: 入力データは保存されますか？</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  A: いいえ、すべての計算はブラウザ上で完結し、サーバーに送信・保存されることはありません。
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Q: 無料で使えますか？</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  A: はい、完全無料・登録不要でご利用いただけます。
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
