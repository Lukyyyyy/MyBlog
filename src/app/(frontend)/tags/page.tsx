import configPromise from '@payload-config'
import { Hash } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function TagsPage() {
  const payload = await getPayload({ config: configPromise })
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
    pagination: false,
    sort: 'title',
  })

  return (
    <main className="content-page">
      <div className="container content-page-inner">
        <header className="content-page-header">
          <span aria-hidden="true">04</span>
          <Hash aria-hidden="true" />
          <h1>
            标签 <em>/ TAGS</em>
          </h1>
          <p>按关键词接入不同的脑回路。</p>
        </header>
        <div className="tag-cloud">
          {categories.docs.map((category) => (
            <Link href={`/search?q=${encodeURIComponent(category.title)}`} key={category.id}>
              <span>#</span>
              {category.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

export const metadata: Metadata = { title: '标签' }
