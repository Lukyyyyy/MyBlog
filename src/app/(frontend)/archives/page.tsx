import configPromise from '@payload-config'
import { Archive } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function ArchivesPage() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    limit: 200,
    pagination: false,
    overrideAccess: false,
    sort: '-publishedAt',
    select: { title: true, slug: true, publishedAt: true },
  })

  const grouped = posts.docs.reduce<Record<string, typeof posts.docs>>((years, post) => {
    const year = post.publishedAt ? String(new Date(post.publishedAt).getFullYear()) : '未定日期'
    years[year] ||= []
    years[year].push(post)
    return years
  }, {})

  return (
    <main className="content-page">
      <div className="container content-page-inner">
        <header className="content-page-header">
          <span aria-hidden="true">05</span>
          <Archive aria-hidden="true" />
          <h1>
            归档 <em>/ ARCHIVE</em>
          </h1>
          <p>所有输出，按时间倒序存档。</p>
        </header>
        <div className="archive-years">
          {Object.entries(grouped).map(([year, yearPosts]) => (
            <section key={year}>
              <h2>{year}</h2>
              <div>
                {yearPosts.map((post) => (
                  <Link href={`/posts/${post.slug}`} key={post.id}>
                    <time>
                      {post.publishedAt
                        ? new Intl.DateTimeFormat('zh-CN', {
                            month: '2-digit',
                            day: '2-digit',
                          }).format(new Date(post.publishedAt))
                        : '—'}
                    </time>
                    <span>{post.title}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}

export const metadata: Metadata = { title: '归档' }
