import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumb } from "@/components/breadcrumb"

export const metadata: Metadata = {
  title: "利用規約 | 手取り計算くん",
  description: "手取り計算くんの利用規約です。サイトの利用条件をご確認ください。",
}

export default function TermsPage() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "利用規約" },
          ]}
        />
        <h1 className="mt-6 font-display text-3xl font-bold text-foreground">利用規約</h1>
        <p className="mt-2 text-sm text-muted-foreground">最終更新日: 2026年7月</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-2 font-semibold text-foreground">第1条（適用）</h2>
            <p>
              この利用規約（以下「本規約」）は、「手取り計算くん」（以下「本サイト」）の利用条件を定めるものです。利用者は本サイトの利用を開始した時点で、本規約に同意したものとみなされます。
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-semibold text-foreground">第2条（利用環境）</h2>
            <p>
              本サイトはブラウザ上で動作するウェブアプリケーションです。利用者は、自身の責任においてインターネット接続環境およびブラウザを準備し、利用するものとします。本サイトの利用に必要な機器・通信費は、利用者の負担とします。
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-semibold text-foreground">第3条（コンテンツの正確性）</h2>
            <p>
              本サイトの計算結果は、あくまで概算として提供されるものです。実際の給与や税金の額を保証するものではありません。計算に使用している料率や仕組みは、法令改正等により予告なく変更される場合があります。
            </p>
            <p className="mt-2">
              正確な金額については、勤務先の給与担当部門、税理士、または最寄りの税務署・自治体窓口にご確認ください。
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-semibold text-foreground">第4条（禁止事項）</h2>
            <p>利用者は、本サイトの利用にあたり、以下の行為を行ってはなりません。</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>法令に違反する行為</li>
              <li>本サイトの運営を妨害する行為</li>
              <li>本サイトのサーバーに過度な負荷をかける行為</li>
              <li>不正アクセスまたはそれを試みる行為</li>
              <li>第三者の権利を侵害する行為</li>
              <li>他の利用者に迷惑をかける行為</li>
              <li>公序良俗に反する行為</li>
              <li>本規約に違反する行為</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 font-semibold text-foreground">第5条（知的財産権）</h2>
            <p>
              本サイトに掲載されているテキスト、画像、ロゴ、デザインなどのコンテンツに関する著作権およびその他の知的財産権は、運営者または適切な権利者に帰属します。無断での複製、転載、配布等は禁止されています。
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-semibold text-foreground">第6条（免責事項）</h2>
            <p>
              本サイトの利用により生じた損害について、運営者は一切の責任を負いません。本サイトの情報に基づいて行われた判断についても、同様とします。
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-semibold text-foreground">第7条（広告について）</h2>
            <p>
              本サイトでは、Google AdSenseなどの第三者配信の広告サービスを利用しています。これらの広告はCookieを使用して配信される場合があります。詳細は各広告サービスのプライバシーポリシーをご確認ください。
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-semibold text-foreground">第8条（規約の変更）</h2>
            <p>
              運営者は、本規約を変更する権利を有します。変更後の規約は、本サイトに掲載した時点で効力を生じます。利用者は定期的に本規約を確認するものとします。
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-semibold text-foreground">第9条（準拠法・管轄）</h2>
            <p>
              本規約は日本法に準拠し、紛争が生じた場合は東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
