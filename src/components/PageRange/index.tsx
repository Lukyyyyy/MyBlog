import React from 'react'

const defaultLabels = {
  plural: '篇文章',
  singular: '篇文章',
}

const defaultCollectionLabels = {
  posts: {
    plural: '篇文章',
    singular: '篇文章',
  },
}

export const PageRange: React.FC<{
  className?: string
  collection?: keyof typeof defaultCollectionLabels
  collectionLabels?: {
    plural?: string
    singular?: string
  }
  currentPage?: number
  limit?: number
  totalDocs?: number
}> = (props) => {
  const {
    className,
    collection,
    collectionLabels: collectionLabelsFromProps,
    currentPage,
    limit,
    totalDocs,
  } = props

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const { plural, singular } =
    collectionLabelsFromProps ||
    (collection ? defaultCollectionLabels[collection] : undefined) ||
    defaultLabels ||
    {}

  return (
    <div className={[className, 'font-semibold'].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && '暂时没有内容。'}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        `${String(totalDocs).padStart(2, '0')} ${totalDocs > 1 ? plural : singular} · ${indexStart}${indexStart > 0 ? `—${indexEnd}` : ''}`}
    </div>
  )
}
