'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, SearchIcon, X } from 'lucide-react'

const primaryLinks = [
  { href: '/', label: '首页' },
  { href: '/posts', label: '文章' },
  { href: '/tags', label: '标签' },
  { href: '/archives', label: '归档' },
  { href: '/projects', label: '作品' },
  { href: '/friends', label: '友链' },
]

export const HeaderNav: React.FC<{ data: HeaderType }> = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <button
        aria-expanded={open}
        aria-label={open ? '关闭导航' : '打开导航'}
        className="mobile-nav-toggle"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <nav aria-label="主导航" className={open ? 'site-nav is-open' : 'site-nav'}>
        <div className="site-nav-links">
          {primaryLinks.map((item) => (
            <Link
              aria-current={pathname === item.href ? 'page' : undefined}
              className={pathname === item.href ? 'is-active' : undefined}
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          aria-label="搜索"
          className="nav-search"
          href="/search"
          onClick={() => setOpen(false)}
        >
          <SearchIcon aria-hidden="true" />
        </Link>
        <Link className="nav-cta" href="/posts" onClick={() => setOpen(false)}>
          开始阅读
          <ArrowRight aria-hidden="true" />
        </Link>
      </nav>
    </>
  )
}
