# syntax=docker/dockerfile:1.7

# To use this Dockerfile, you have to set `output: 'standalone'` in your next.config.js file.
# From https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

FROM node:22.17.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

ARG COREPACK_NPM_REGISTRY=https://registry.npmjs.org
ARG PNPM_REGISTRY=https://registry.npmjs.org

# Install dependencies based on the preferred package manager
COPY package.json pnpm-workspace.yaml yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm config --location=project set registry "$PNPM_REGISTRY" && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
ARG COREPACK_NPM_REGISTRY=https://registry.npmjs.org
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are compiled into the client bundle at build time.
ARG NEXT_PUBLIC_SERVER_URL=https://lukybetter.com
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ARG AGENTFLOW_APP_URL=https://agentflow.lukybetter.com
ARG NEXUSMIND_APP_URL=https://nexusmind.lukybetter.com
ARG KAIRO_CLI_APP_URL=https://kairocli.lukybetter.com
ENV AGENTFLOW_APP_URL=$AGENTFLOW_APP_URL
ENV NEXUSMIND_APP_URL=$NEXUSMIND_APP_URL
ENV KAIRO_CLI_APP_URL=$KAIRO_CLI_APP_URL

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Disable telemetry in reproducible production builds.
ENV NEXT_TELEMETRY_DISABLED 1

RUN --mount=type=secret,id=payload_secret \
  --mount=type=secret,id=database_url \
  export PAYLOAD_SECRET="$(cat /run/secrets/payload_secret)"; \
  export DATABASE_URL="$(cat /run/secrets/database_url)"; \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Keep runtime-owned media writable when Docker initializes the named volume.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Set the correct permissions for the prerender cache and media volume.
RUN mkdir -p .next/cache public/media
RUN chown -R nextjs:nodejs .next public/media

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME 0.0.0.0

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
