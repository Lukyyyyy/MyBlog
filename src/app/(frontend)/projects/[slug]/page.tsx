import { ArrowLeft, ArrowUpRight, CalendarDays, Github } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getProject, getProjectAccess, projects } from '../data'
import { formatProjectDate, projectHistory, type CommitDay } from '../history'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug)

  return project ? { title: project.name, description: project.summary } : { title: '未找到作品' }
}

function Timeline({ days, github }: { days: CommitDay[]; github: string }) {
  return (
    <ol className="project-timeline">
      {days.map((day) => (
        <li key={day.date}>
          <time dateTime={day.date}>{formatProjectDate(day.date)}</time>
          <ul>
            {day.commits.map((commit) => (
              <li key={commit.hash}>
                <a href={`${github}/commit/${commit.hash}`} rel="noreferrer" target="_blank">
                  <code>{commit.shortHash}</code>
                  <span>{commit.subject}</span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug)
  if (!project) notFound()

  const access = getProjectAccess(project)
  const history = projectHistory[project.slug] || []
  const recentHistory = history.slice(0, 5)
  const olderHistory = history.slice(5)

  return (
    <main className={`project-detail project-${project.slug}`}>
      <div className="container project-detail-inner">
        <Link className="project-back" href="/projects">
          <ArrowLeft aria-hidden="true" />
          返回作品
        </Link>

        <header className="project-detail-hero">
          <div className="project-detail-copy">
            <p className="project-detail-eyebrow">{project.eyebrow} / 持续开发</p>
            <h1>{project.name}</h1>
            <p className="project-detail-summary">{project.summary}</p>
            {history[0] && (
              <p className="project-updated">
                <CalendarDays aria-hidden="true" />
                最近更新于 {formatProjectDate(history[0].date)}
              </p>
            )}
            <div className="project-actions">
              <a href={access.href} rel="noreferrer" target="_blank">
                {access.isLocal ? '打开本地应用' : '在线体验'}
                <ArrowUpRight aria-hidden="true" />
              </a>
              <a className="is-secondary" href={project.github} rel="noreferrer" target="_blank">
                <Github aria-hidden="true" />
                GitHub
              </a>
            </div>
            {access.isLocal && <small>需要先在本机启动项目。</small>}
          </div>
          <div className={`project-detail-media is-${project.imageFit || 'cover'}`}>
            <Image
              alt={project.imageAlt}
              priority
              sizes="(max-width: 60rem) 100vw, 48vw"
              src={project.image}
            />
          </div>
        </header>

        <div className="project-story-grid">
          <section>
            <p className="project-section-number">01 / 项目缘起</p>
            <h2>它解决什么问题？</h2>
            <p>{project.problem}</p>
          </section>
          <section>
            <p className="project-section-number">02 / 核心能力</p>
            <h2>从想法到可运行产品。</h2>
            <ul className="project-capabilities">
              {project.capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="project-tech-section">
          <p className="project-section-number">03 / 技术栈</p>
          <h2>支撑它运行的工具。</h2>
          <ul>
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </section>

        <section className="project-history-section">
          <div className="project-section-heading">
            <div>
              <p className="project-section-number">04 / 开发历史</p>
              <h2>每一次提交，都是作品生长的刻度。</h2>
            </div>
            <span>{history.reduce((total, day) => total + day.commits.length, 0)} 次提交</span>
          </div>
          <Timeline days={recentHistory} github={project.github} />
          {olderHistory.length > 0 && (
            <details className="project-history-more">
              <summary>展开更早历史（{olderHistory.length} 个提交日）</summary>
              <Timeline days={olderHistory} github={project.github} />
            </details>
          )}
        </section>

        <section className="project-next-section">
          <p className="project-section-number">05 / 下一步</p>
          <h2>项目仍在继续。</h2>
          <p>{project.nextSteps}</p>
        </section>
      </div>
    </main>
  )
}
