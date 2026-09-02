import history from './history.generated.json'

export type Commit = {
  hash: string
  shortHash: string
  subject: string
}

export type CommitDay = {
  date: string
  commits: Commit[]
}

export const projectHistory = history as Record<string, CommitDay[]>

export function formatProjectDate(date: string) {
  return date.replaceAll('-', '.')
}
