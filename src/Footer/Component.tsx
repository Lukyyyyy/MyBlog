import Image from 'next/image'
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

const ICP_BEIAN_NUMBER = '湘ICP备2026037508号-1'
const PUBLIC_SECURITY_BEIAN_NUMBER = '湘公网安备43010502002236号'
const PUBLIC_SECURITY_BEIAN_URL =
  'https://beian.mps.gov.cn/#/query/webSearch?code=43010502002236'

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
          <div className="footer-legal">
            <p>© {new Date().getFullYear()} Lukyyyyy. All Rights Reserved.</p>
            <div aria-label="网站备案信息" className="footer-registration">
              <a href="https://beian.miit.gov.cn/" rel="noreferrer" target="_blank">
                {ICP_BEIAN_NUMBER}
              </a>
              <a href={PUBLIC_SECURITY_BEIAN_URL} rel="noreferrer" target="_blank">
                <Image alt="" aria-hidden="true" height={20} src="/beian.png" width={18} />
                <span>{PUBLIC_SECURITY_BEIAN_NUMBER}</span>
              </a>
            </div>
          </div>
          <Link href="#top" aria-label="返回顶部" className="back-to-top">
            ↑
          </Link>
        </div>
      </div>
    </footer>
  )
}
