import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <span className={className} aria-label="Lukyyyyy's Blog">
      <span className="brand-logo-text">Lukyyyyy</span>
      <span aria-hidden="true" className="brand-logo-slash">
        /
      </span>
      <span className="brand-logo-sub">BLOG</span>
    </span>
  )
}
