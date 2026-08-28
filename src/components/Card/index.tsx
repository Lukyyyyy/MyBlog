'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  index?: number
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, index, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article className={cn('index-card', className)} ref={card.ref}>
      <span className="index-card-number">{String(index || 1).padStart(2, '0')}</span>
      <div className="index-card-copy">
        {showCategories && hasCategories && (
          <div className="index-card-categories">
            {categories?.map((category, categoryIndex) => {
              if (typeof category !== 'object') return null
              return (
                <Fragment key={category.id || categoryIndex}>
                  {category.title}
                  {categoryIndex < categories.length - 1 ? ' / ' : ''}
                </Fragment>
              )
            })}
          </div>
        )}
        {titleToUse && (
          <h3>
            <Link href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </h3>
        )}
        {description && <p>{sanitizedDescription}</p>}
      </div>
      <div className={`index-card-media tone-${((index || 1) % 2) + 1}`}>
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="28vw" />}
      </div>
      <span aria-hidden="true" className="index-card-arrow">
        →
      </span>
    </article>
  )
}
