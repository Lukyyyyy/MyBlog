import agentFlowImage from './_assets/agentflow-poster.png'
import kairoCliImage from './_assets/kairocli-poster.png'
import nexusMindImage from './_assets/nexusmind-poster.png'

export type Project = {
  slug: 'nexusmind' | 'kairo-cli' | 'agentflow'
  name: string
  eyebrow: string
  summary: string
  problem: string
  capabilities: string[]
  technologies: string[]
  cardTechnologies: string[]
  nextSteps: string
  image: typeof nexusMindImage
  imageAlt: string
  imageFit?: 'contain' | 'cover'
  github: string
  envKey: string
  localUrl: string
}

export const projects: Project[] = [
  {
    slug: 'nexusmind',
    name: 'NexusMind',
    eyebrow: 'AI 知识库',
    summary: '面向企业与团队的 AI 知识库，让文档从沉淀的信息变成随时可追问的答案。',
    problem:
      '团队文档分散、检索结果缺少上下文，权限边界也常常被忽略。NexusMind 将上传、解析、索引、检索与问答串成完整链路，并按组织与个人空间隔离知识。',
    capabilities: [
      '文档上传、解析、分片、向量化与异步索引',
      '关键词、向量与知识图谱协同检索',
      '面向组织、公共空间和个人空间的权限隔离',
      '支持会话历史的实时 AI 问答',
    ],
    technologies: [
      'Vue 3',
      'TypeScript',
      'Spring Boot',
      'Elasticsearch',
      'Kafka',
      'Redis',
      'MinIO',
      'Neo4j',
    ],
    cardTechnologies: ['Vue 3', 'Spring Boot', 'RAG'],
    nextSteps: '继续完善知识图谱审核、复杂文档解析质量，以及面向真实团队协作的知识治理体验。',
    image: nexusMindImage,
    imageAlt: 'NexusMind 登录页海报',
    github: 'https://github.com/Lukyyyyy/nexusmind',
    envKey: 'NEXUSMIND_APP_URL',
    localUrl: 'http://localhost:9527',
  },
  {
    slug: 'kairo-cli',
    name: 'Kairo CLI',
    eyebrow: 'Agent 工程运行时',
    summary: '把规划、协作、工具和上下文收束进安全可控、可以审计的 Agent 工程运行时。',
    problem:
      '通用 AI 助手能写代码，却很难稳定理解工程边界、控制危险操作并留下可追溯记录。Kairo CLI 将检查、规划、审批、执行和记录固化为一条可控链路。',
    capabilities: [
      'ReAct、Plan-and-Execute 与多 Agent 团队协作模式',
      '受控文件、Shell、代码索引、LSP 与浏览器工具',
      '可恢复会话、长期记忆、上下文压缩与工作区快照',
      'CLI、结构化输出、Runtime API 与 Web 工作台',
    ],
    technologies: ['Python', 'FastAPI', 'Textual', 'SQLite', 'MCP', 'LSP', 'WebSocket'],
    cardTechnologies: ['Python', 'FastAPI', 'MCP'],
    nextSteps: '继续强化 Web 协作体验、模型兼容性，以及长时间运行任务的安全策略与可观测能力。',
    image: kairoCliImage,
    imageAlt: 'Kairo CLI 登录页海报',
    github: 'https://github.com/Lukyyyyy/KairoCLI',
    envKey: 'KAIRO_CLI_APP_URL',
    localUrl: 'http://localhost:8080',
  },
  {
    slug: 'agentflow',
    name: 'AgentFlow',
    eyebrow: 'AI 工作流编排',
    summary: '用可视化画布连接模型、Agent、知识库与工具，构建可以调试和运行的 AI 工作流。',
    problem:
      'AI 应用通常散落着模型调用、工具接入和业务控制代码，修改与排错成本很高。AgentFlow 用统一画布描述依赖关系，并把设计、配置与实时调试放进同一个工作空间。',
    capabilities: [
      '基于 React Flow 的拖拽式工作流设计',
      '面向确定性流程与复杂状态图的双执行引擎',
      '模型、知识库、MCP 工具与媒体能力统一接入',
      '通过 SSE 实时查看节点状态、日志、输出与耗时',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Spring Boot',
      'React Flow',
      'LangGraph4j',
      'MySQL',
      'Redis',
      'MinIO',
    ],
    cardTechnologies: ['React', 'Spring Boot', 'LangGraph4j'],
    nextSteps: '继续扩充可复用节点与工作流模板，并补齐面向生产环境的权限、审计和运行治理能力。',
    image: agentFlowImage,
    imageAlt: 'AgentFlow 登录页海报',
    github: 'https://github.com/Lukyyyyy/AgentFlow',
    envKey: 'AGENTFLOW_APP_URL',
    localUrl: 'http://localhost:5173',
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getProjectAccess(project: Project) {
  const fallback = new URL(project.localUrl)

  try {
    const url = new URL(process.env[project.envKey]?.trim() || project.localUrl)
    const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1'

    return { href: url.toString(), isLocal }
  } catch {
    return { href: fallback.toString(), isLocal: true }
  }
}
