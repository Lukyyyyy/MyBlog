import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const projectRoot = resolve(root, '..')
const repositories = {
  nexusmind: resolve(projectRoot, 'NexusMind'),
  'kairo-cli': resolve(projectRoot, 'KairoCLI'),
  agentflow: resolve(projectRoot, 'AgentFlow'),
}

const history = Object.fromEntries(
  Object.entries(repositories).map(([slug, repository]) => {
    const fields = execFileSync(
      'git',
      ['-C', repository, 'log', 'HEAD', '-z', '--date=short', '--format=%H%x00%h%x00%ad%x00%s'],
      { encoding: 'utf8' },
    )
      .split('\0')
      .filter(Boolean)

    const days = []
    if (fields.length % 4 !== 0) throw new Error(`${repository} 的 Git 日志格式不完整`)

    for (let index = 0; index < fields.length; index += 4) {
      const [hash, shortHash, date, subject] = fields.slice(index, index + 4)
      if (!/^[0-9a-f]{40}$/.test(hash) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        throw new Error(`${repository} 包含无法解析的 Git 记录`)
      }
      const current = days.at(-1)
      const day = current?.date === date ? current : { date, commits: [] }
      if (day !== current) days.push(day)
      day.commits.push({ hash, shortHash, subject })
    }

    return [slug, days]
  }),
)

const output = resolve(root, 'src/app/(frontend)/projects/history.generated.json')
writeFileSync(output, `${JSON.stringify(history, null, 2)}\n`)
console.log(`已同步 ${Object.values(history).flat().length} 个提交日到 ${output}`)
