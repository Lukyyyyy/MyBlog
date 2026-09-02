import { ArrowRight, CalendarDays, FolderHeart } from 'lucide-react'
import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'

import { projects } from './data'
import { formatProjectDate, projectHistory } from './history'
export default function ProjectsPage() {
  return (
    <main className="content-page">
      <div className="container content-page-inner">
        <header className="content-page-header">
          <span aria-hidden="true">06</span>
          <FolderHeart aria-hidden="true" />
          <h1>
            作品 <em>/ PROJECTS</em>
          </h1>
          <p>从一个奇怪念头，到可以运行的东西。</p>
        </header>
        <div className="project-list">
          {projects.map((project, index) => {
            const updatedAt = projectHistory[project.slug]?.[0]?.date

            return (
              <Link
                className={`project-card project-${project.slug}`}
                href={`/projects/${project.slug}`}
                key={project.slug}
              >
                <div className="project-card-meta">
                  <span className="project-card-eyebrow">{project.eyebrow}</span>
                  <div className="project-card-meta-side">
                    {updatedAt && (
                      <time dateTime={updatedAt}>
                        <CalendarDays aria-hidden="true" />
                        最近更新 {formatProjectDate(updatedAt)}
                      </time>
                    )}
                    <span className="project-card-status">● 持续开发</span>
                  </div>
                </div>
                <div className="project-card-stage">
                  <span className="project-card-num" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className={`project-card-media is-${project.imageFit || 'cover'}`}>
                    <Image
                      alt={project.imageAlt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 86rem) 92vw, 78rem"
                      src={project.image}
                    />
                  </div>
                </div>
                <div className="project-card-body">
                  <h2>
                    {project.name}
                    <span className="project-card-dot" aria-hidden="true" />
                  </h2>
                  <div className="project-card-info">
                    <p>{project.summary}</p>
                    <ul aria-label="核心技术">
                      {project.cardTechnologies.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                    <span className="project-card-link">
                      查看项目
                      <ArrowRight aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export const metadata: Metadata = { title: '作品' }
