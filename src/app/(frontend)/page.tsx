import { Media } from '@/components/Media'
import configPromise from '@payload-config'
import { ArrowRight, CalendarDays, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'

export const dynamic = 'force-static'
export const revalidate = 600

const formatDate = (value?: null | string) => {
  if (!value) return '未定日期'
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(value))
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 3,
    overrideAccess: false,
    sort: '-publishedAt',
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
  })

  return (
    <main>
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span aria-hidden="true" className="hero-prompt">
              &gt;_
            </span>
            <h1 aria-label="把日常编译成有趣的东西。">
              <span>把日常</span>
              <span>编译成</span>
              <span>
                有趣的东西<span className="hero-period">。</span>
              </span>
            </h1>
            <p>
              写代码，也写生活。
              <br />
              收集问题、灵感和那些值得保存的瞬间。
            </p>
            <Link className="hero-read-link" href="/posts">
              查看最近更新
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="hero-orbit" aria-hidden="true">
            <span className="orbit-label orbit-label-one">
              IDEAS
              <br />
              <b>001</b>
            </span>
            <span className="orbit-label orbit-label-two">
              NOTES
              <br />
              <b>002</b>
            </span>
            <span className="orbit-label orbit-label-three">
              LIFE
              <br />
              <b>003</b>
            </span>
            <i className="orbit orbit-a" />
            <i className="orbit orbit-b" />
            <i className="orbit orbit-c" />
            <i className="planet planet-blue" />
            <i className="planet planet-orange" />
            <i className="planet planet-black" />
          </div>
        </div>
      </section>

      <section className="latest-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-index">02</span>
              <h2>最近更新</h2>
            </div>
            <Link href="/posts">
              查看全部 <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="editorial-list">
            {posts.docs.length > 0 ? (
              posts.docs.map((post, index) => {
                const image = post.meta?.image
                const categories = post.categories?.filter((item) => typeof item === 'object') || []
                return (
                  <article className="editorial-item" key={post.id}>
                    <span className="editorial-index">{String(index + 1).padStart(2, '0')}</span>
                    <Link
                      aria-label={`阅读《${post.title}》`}
                      className="editorial-media"
                      href={`/posts/${post.slug}`}
                    >
                      {image && typeof image === 'object' ? (
                        <Media
                          fill
                          imgClassName="object-cover"
                          resource={image}
                          size="(max-width: 768px) 100vw, 32vw"
                        />
                      ) : (
                        <span className={`editorial-placeholder tone-${index % 2 ? 1 : 2}`}>
                          <Sparkles aria-hidden="true" />
                        </span>
                      )}
                    </Link>
                    <div className="editorial-copy">
                      <div className="post-meta">
                        <span>
                          <CalendarDays aria-hidden="true" />
                          {formatDate(post.publishedAt)}
                        </span>
                        {categories.slice(0, 2).map((category) => (
                          <span key={category.id}>{category.title}</span>
                        ))}
                      </div>
                      <h3>
                        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                      </h3>
                      {post.meta?.description ? <p>{post.meta.description}</p> : null}
                      <Link
                        className="post-arrow"
                        href={`/posts/${post.slug}`}
                        aria-label={`继续阅读《${post.title}》`}
                      >
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                )
              })
            ) : (
              <div className="empty-posts">
                <Sparkles aria-hidden="true" />
                <p>第一条记录还在编译。</p>
                <Link href="/admin/collections/posts/create">去后台写一篇</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="about-band">
        <div className="container about-inner">
          <div className="about-avatar" aria-hidden="true">
            <span>L</span>
            <i />
          </div>
          <div className="about-copy">
            <span>03 / ABOUT</span>
            <h2>LUKYYYYY</h2>
            <p>HUMAN, BUILDER, NOTE-TAKER</p>
          </div>
          <p className="about-note">
            好奇驱动的全栈开发者。喜欢把复杂的事情拆解清楚，也热衷记录和分享思考过程。
          </p>
          <div className="about-values" aria-label="关注方向">
            <span>
              BUILD<small>用代码解决问题</small>
            </span>
            <span>
              NOTE<small>记录思考与灵感</small>
            </span>
            <span>
              SHARE<small>分享让价值流动</small>
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Lukyyyyy's Blog",
  description: '写代码，也写生活。收集问题、灵感和那些值得保存的瞬间。',
}
