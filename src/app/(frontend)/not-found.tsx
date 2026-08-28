import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container not-found-page">
      <div>
        <span>ERROR / 404</span>
        <h1>
          这页跑丢了<span>。</span>
        </h1>
        <p>可能被移动、删除，或者从来没有存在过。</p>
      </div>
      <Button asChild variant="default">
        <Link href="/">返回首页 →</Link>
      </Button>
    </div>
  )
}
