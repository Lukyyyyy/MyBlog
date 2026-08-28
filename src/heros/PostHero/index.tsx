import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <header className="post-hero">
      <div className="container post-hero-grid">
        <div className="post-hero-copy">
          <div className="post-breadcrumb">
            首页 <span>›</span> 文章 <span>›</span> NOTE
          </div>
          <h1>{title}</h1>
          <div className="post-hero-meta">
            {publishedAt && <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>}
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment> / </React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
            {hasAuthors && <span>BY {formatAuthors(populatedAuthors)}</span>}
          </div>
        </div>
        <div className="post-hero-visual" aria-hidden="true">
          <i />
          <i />
          <span />
        </div>
      </div>
    </header>
  )
}
