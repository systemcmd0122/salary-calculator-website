import { Calculator } from "lucide-react"

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-12 border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Calculator className="size-4" aria-hidden="true" />
              </span>
              <span className="font-display text-base font-bold text-foreground">手取り計算くん</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              時給・月給から社会保険料や税金を差し引いた手取り額を、ブラウザ上だけで手軽に試算できる無料シミュレーターです。
            </p>
          </div>

          <nav aria-label="フッターナビゲーション">
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a href="#simulator" className="text-muted-foreground transition-colors hover:text-foreground">
                  シミュレーター
                </a>
              </li>
              <li>
                <a href="/guide" className="text-muted-foreground transition-colors hover:text-foreground">
                  手取り計算ガイド
                </a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                  運営者情報
                </a>
              </li>
              <li>
                <a href="/terms" className="text-muted-foreground transition-colors hover:text-foreground">
                  利用規約
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="text-muted-foreground transition-colors hover:text-foreground">
                  免責事項
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>本サイトの計算結果は概算です。実際の金額を保証するものではありません。</p>
          <p className="mt-1">&copy; {year} 手取り計算くん. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
