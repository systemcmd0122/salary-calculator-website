import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumb } from "@/components/breadcrumb"

export const metadata: Metadata = {
  title: "手取り計算ガイド | 手取り計算くん",
  description: "アルバイト・正社員の手取り計算に関する総合ガイド。社会保険料、所得税、住民税の仕組みと計算方法を分かりやすく解説します。",
}

const sections = [
  {
    id: "social-insurance",
    title: "社会保険料とは？",
    content: `社会保険料は、会社勤めの方が毎月の給与から支払う保険料の総称です。主な内訳は以下の通りです。

・健康保険料: 病気やケガの際に医療費の自己負担分を軽減する保険です。労使折半（会社と従業員で半分ずつ負担）となり、従業員の負担は標準報酬月額の約5%です。

・厚生年金保険: 老後や障害、遺族への給付を行う公的年金です。従業員の負担は標準報酬月額の9.15%です。

・雇用保険: 失業時の給付や育児休業給付などを行う保険です。従業員の負担は賃金の0.6%です。

・介護保険: 40歳〜64歳の方が対象で、介護が必要になった場合の給付を行います。従業員の負担は約0.9%です。`,
  },
  {
    id: "tax",
    title: "所得税と住民税の仕組み",
    content: `所得税と住民税は、毎月の給与から差し引かれる税金です。

【所得税】
所得税は、給与所得から社会保険料や基礎控除などの各種控除を差し引いた「課税所得」に対して累進課税制度で計算されます。税率は課税所得の金額に応じて5%〜45%の7段階に分かれています。毎月の給与からは概算で源泉徴収され、年末調整で精算されます。

【住民税】
住民税は、前年の所得を基準に翌年から課税される税金です。均等割（定額）と所得割（所得に応じた割合）で構成されます。税率は自治体によって異なりますが、一般的に所得の約10%程度です。

※本シミュレーターでは、これらの税金を概算料率で計算しています。`,
  },
  {
    id: "net-salary",
    title: "手取り額とは？",
    content: `手取り額（正味賃金）とは、毎月の給与から社会保険料や税金が差し引かれた後に実際に受け取れる金額です。

手取り額 = 総支給額 − 社会保険料 − 所得税 − 住民税

一般的に、手取り額は総支給額の70%〜80%程度と言われています。具体的な割合は、年収や扶養家族の有無、居住地等因素により異なります。

本シミュレーターでは、時給・月給と勤務条件を入力するだけで、この手取り額の概算を即座に計算できます。`,
  },
  {
    id: "commute",
    title: "通勤手当の非課税について",
    content: `通勤手当は、一定の金額まで非課税となります。これは税金計算上のメリットです。

非課税限度額：
・通勤距離5km以下：月額15,000円
・通勤距離5km超〜10km以下：月額25,600円
・通勤距離10km超〜15km以下：月額31,600円
・通勤距離15km超〜25km以下：月額41,500円
・通勤距離25km超〜35km以下：月額50,000円
・通勤距離35km超〜45km以下：月額60,000円
・通勤距離45km超〜55km以下：月額70,000円

限度額を超える部分は課税対象となります。本シミュレーターでは、入力された交通費をすべて非課税として計算しています。実際の計算では、上記の限度額を考慮する必要があります。`,
  },
  {
    id: "year-end",
    title: "年末調整と確定申告",
    content: `【年末調整】
年末調整は、12月最後の給与支払い時に会社が行う税金の精算です。1年間の給与と控除の実績を基に、毎月概算で徴収されていた所得税の過不足を調整します。扶養控除や生命保険料控除など、申告した控除分が適用されます。

【確定申告】
確定申告は、毎年2月16日〜3月15日の間に前年分の所得を税務署に申告する手続きです。以下の方は確定申告が必要です：

・給与の年間収入が2,000万円を超える方
・2か所以上から給与を受け取っている方
・医療費控除やふるさと納税の寄付金額が一定額を超える方
・副業の収入がある方

本シミュレーターの結果は概算であり、年末調整や確定申告後の最終的な手取り額とは異なる場合があります。`,
  },
]

export default function GuidePage() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "手取り計算ガイド" },
          ]}
        />
        <h1 className="mt-6 font-display text-3xl font-bold text-foreground">手取り計算ガイド</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          アルバイト・正社員の手取り計算に関する総合ガイドです。社会保険料や税金の仕組みを分かりやすく解説します。
        </p>

        <nav className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-semibold text-foreground">目次</h2>
          <ul className="mt-2 space-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-sm text-primary underline-offset-2 hover:underline">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 space-y-8">
          {sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="scroll-mt-20 rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <h2 className="font-display text-xl font-bold text-foreground">{s.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {s.content}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-sm font-semibold text-foreground">実際に手計算してみませんか？</p>
          <p className="mt-1 text-sm text-muted-foreground">
            シミュレーターで自分の手取り額の目安を確認できます。
          </p>
          <a
            href="/#simulator"
            className="mt-3 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
          >
            シミュレーターを使う
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
