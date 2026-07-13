import { BookOpenCheck, ShieldCheck, TriangleAlert, HelpCircle } from "lucide-react"

function SectionCard({
  id,
  icon,
  title,
  children,
}: {
  id: string
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
          {icon}
        </span>
        <h2 className="font-display text-xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

export function InfoSections() {
  return (
    <div className="space-y-6">
      <SectionCard id="how" icon={<BookOpenCheck className="size-5" />} title="計算の仕組み・根拠について">
        <p>
          本シミュレーターは、日本の給与から差し引かれる代表的な項目である「社会保険料」と「税金」を概算し、差引後の手取り額を算出しています。給与形態（時給・月給）と交通費、年齢区分を入力するだけで、毎月の手取りの目安を確認できます。
        </p>
        <div>
          <h3 className="mb-1 font-semibold text-foreground">社会保険料について</h3>
          <p>
            健康保険・厚生年金保険・雇用保険・介護保険の従業員負担分を、総支給額に対する概算料率で計算しています。厚生年金は本人負担9.15%、健康保険はおよそ5%、雇用保険は0.6%を目安としており、40歳〜64歳の方はこれに介護保険（約0.9%）が加算されます。実際には「標準報酬月額」に基づいて等級ごとに決定されるため、金額は前後します。
          </p>
        </div>
        <div>
          <h3 className="mb-1 font-semibold text-foreground">所得税・住民税について</h3>
          <p>
            総支給額から社会保険料および非課税となる通勤手当を差し引いた金額を課税ベースとし、そこに概算料率を乗じて所得税・住民税を試算しています。実際の所得税は累進課税（課税所得が増えるほど税率が上がる仕組み）であり、扶養控除や各種控除、年末調整によって最終的な負担額は変動します。住民税は前年の所得を基準に翌年課税される点にもご注意ください。
          </p>
        </div>
        <p>
          このように、本サイトの結果はあくまで「おおよその目安」を素早く把握するためのものです。正確な金額は、勤務先が発行する給与明細や、お住まいの自治体・加入している健康保険組合の情報をご確認ください。
        </p>
      </SectionCard>

      <SectionCard id="privacy" icon={<ShieldCheck className="size-5" />} title="プライバシーポリシー">
        <div>
          <h3 className="mb-1 font-semibold text-foreground">入力データの取り扱い</h3>
          <p>
            本サイトの計算は、すべてご利用者のブラウザ（クライアントサイド）上でのみ処理されます。入力された給与や交通費などの数値がサーバーに送信・保存されることは一切ありません。安心してご利用いただけます。
          </p>
        </div>
        <div>
          <h3 className="mb-1 font-semibold text-foreground">広告配信について</h3>
          <p>
            当サイトでは、第三者配信の広告サービス「Google
            AdSense」を利用する場合があります。このような広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie（クッキー）を使用することがあります。Cookieを無効にする設定およびGoogle
            AdSenseに関する詳細は、
            <a
              href="https://policies.google.com/technologies/ads?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-2"
            >
              広告 – ポリシーと規約 – Google
            </a>
            をご確認ください。
          </p>
        </div>
        <div>
          <h3 className="mb-1 font-semibold text-foreground">アクセス解析について</h3>
          <p>
            当サイトでは、サイトの利用状況を把握するためにアクセス解析ツールを利用することがあります。これらのツールはトラフィックデータの収集のためにCookieを使用しますが、このデータは匿名で収集されており、個人を特定するものではありません。
          </p>
        </div>
      </SectionCard>

      <SectionCard id="faq" icon={<HelpCircle className="size-5" />} title="よくある質問">
        <div className="space-y-4">
          <div>
            <h3 className="mb-1 font-semibold text-foreground">Q: 計算結果は正確ですか？</h3>
            <p>
              あくまで概算です。実際の手取り額は加入する健康保険組合、扶養状況、年末調整の結果等により異なります。正式な金額は勤務先にご確認ください。
            </p>
          </div>
          <div>
            <h3 className="mb-1 font-semibold text-foreground">Q: 入力データは保存されますか？</h3>
            <p>
              いいえ、すべての計算はブラウザ上で完結し、サーバーに送信・保存されることはありません。プライバシーを大切にしています。
            </p>
          </div>
          <div>
            <h3 className="mb-1 font-semibold text-foreground">Q: 無料で使えますか？</h3>
            <p>
              はい、完全無料・登録不要でご利用いただけます。アプリのインストールも不要です。
            </p>
          </div>
          <div>
            <h3 className="mb-1 font-semibold text-foreground">Q: なぜ手取りは減るのですか？</h3>
            <p>
              給与から社会保険料（健康保険・厚生年金・雇用保険・介護保険）と税金（所得税・住民税）が差し引かれるためです。これらは法的に支払いが義務付けられている項目です。
            </p>
          </div>
          <div>
            <h3 className="mb-1 font-semibold text-foreground">Q: 交通費も手取りに含まれますか？</h3>
            <p>
              通常、通勤手当は非課税のため社会保険料や税金の計算対象外となります。本シミュレーターでは交通費を非課税として計算しています。
            </p>
          </div>
          <div>
            <h3 className="mb-1 font-semibold text-foreground">Q: 65歳以上の計算はできますか？</h3>
            <p>
              現在は19歳〜64歳の方が対象です。65歳以上の場合は健康保険料率や年金制度が異なるため、実際の金額は勤務先にご確認ください。
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard id="disclaimer" icon={<TriangleAlert className="size-5" />} title="免責事項">
        <p>
          本サイトの計算結果はあくまで概算であり、実際の支給額や控除額を保証するものではありません。社会保険料や税額は、加入する健康保険組合、勤務先、お住まいの自治体、扶養家族の有無、各種控除の適用状況などによって大きく異なります。
        </p>
        <p>
          本サイトに掲載された情報を利用して生じたいかなる損害についても、当サイトは一切の責任を負いかねます。実際の給与や税金に関する正式な判断は、必ず勤務先の給与担当部門、税理士、または最寄りの税務署・自治体窓口にご確認のうえ行ってください。
        </p>
        <p>本サイトの内容は、法令や料率の改定により予告なく変更される場合があります。</p>
      </SectionCard>
    </div>
  )
}
