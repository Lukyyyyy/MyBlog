import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn('container collection-index')}>
      {posts?.map((result, index) => {
        if (typeof result !== 'object' || result === null) return null
        return (
          <Card
            className="collection-card"
            doc={result}
            index={index + 1}
            key={result.slug || index}
            relationTo="posts"
            showCategories
          />
        )
      })}
    </div>
  )
}
