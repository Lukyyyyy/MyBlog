import { FolderHeart, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export default function ProjectsPage() {
  return (
    <main className="content-page">
      <div className="container content-page-inner">
        <header className="content-page-header">
          <span aria-hidden="true">06</span>
          <FolderHeart aria-hidden="true" />
          <h1>
            作品 <em>/ PROJECTS</em>
          </h1>
          <p>从一个奇怪念头，到可以运行的东西。</p>
        </header>
        <div className="gentle-empty-state">
          <Sparkles aria-hidden="true" />
          <h2>
            WORK IN PROGRESS<span>_</span>
          </h2>
          <p>第一件作品还在编译。等待期间，可以先翻翻现有文章。</p>
          <Link href="/posts">查看文章 →</Link>
        </div>
      </div>
    </main>
  )
}

export const metadata: Metadata = { title: '作品' }
