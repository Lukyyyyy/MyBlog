import Link from 'next/link'
import React from 'react'

import { Logo } from '@/components/Logo/Logo'
import { Archive, FolderHeart, Link2, Tags } from 'lucide-react'

const exploreLinks = [
  { href: '/tags', label: '标签', icon: Tags },
  { href: '/archives', label: '归档', icon: Archive },
  { href: '/projects', label: '作品', icon: FolderHeart },
  { href: '/friends', label: '友链', icon: Link2 },
]

export async function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-explore">
        <div>
          <p className="footer-kicker">KEEP EXPLORING / 04</p>
          <h2>换个入口，继续乱逛。</h2>
        </div>
        <nav aria-label="页脚导航" className="footer-link-rail">
          {exploreLinks.map(({ href, icon: Icon, label }) => (
            <Link href={href} key={href}>
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <Link className="brand-logo footer-logo" href="/">
            <Logo />
          </Link>
          <p>© {new Date().getFullYear()} Lukyyyyy · BUILT WITH CURIOSITY.</p>
          <Link href="#top" aria-label="返回顶部" className="back-to-top">
            ↑
          </Link>
        </div>
      </div>
    </footer>
  )
}
