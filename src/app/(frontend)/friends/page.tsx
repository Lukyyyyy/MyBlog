import { Link2, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export default function FriendsPage() {
  return (
    <main className="content-page">
      <div className="container content-page-inner">
        <header className="content-page-header">
          <span aria-hidden="true">07</span>
          <Link2 aria-hidden="true" />
          <h1>
            友链 <em>/ LINKS</em>
          </h1>
          <p>互联网仍然应该由人和链接组成。</p>
        </header>
        <div className="gentle-empty-state">
          <Sparkles aria-hidden="true" />
          <h2>
            NO LINKS YET<span>_</span>
          </h2>
          <p>这里暂时空着，给未来遇见的有趣网站。</p>
          <Link href="/">返回首页 →</Link>
        </div>
      </div>
    </main>
  )
}

export const metadata: Metadata = { title: '友链' }
