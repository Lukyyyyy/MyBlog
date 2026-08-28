# Production deployment

This repository owns the MyBlog application stack only:

- Next.js/Payload is reachable as `myblog-app:3000` on the external `server_proxy` Docker network.
- MongoDB is restricted to the stack's private internal network and requires authentication.
- The server-level Caddy gateway is maintained in the separate private `server-infra` repository.
- The application has no host port; MongoDB is bound only to `127.0.0.1:27017` for authenticated build-time access.

`https://lukybetter.com` is canonical. `https://www.lukybetter.com` redirects to it at the shared gateway.

## Production environment

Store production variables outside the Git checkout:

```text
/etc/myblog/myblog.env
```

Use `.env.production.example` as the key list. Generate every secret independently with `openssl rand -hex 32`. Generate the MongoDB password as hex so it can be placed in `DATABASE_URL` without URL escaping. Set the file owner to the deployment user and its mode to `600`.

Never commit the production environment file. Never seed the production database.

## Prerequisites

The shared proxy network must exist before starting the application:

```bash
docker network inspect server_proxy
```

The first deployment creates a fresh database. Create the first Payload administrator through an internal one-time request before exposing the public gateway.

## Validate and start

Always supply the external Compose environment file:

```bash
docker compose --env-file /etc/myblog/myblog.env config --quiet
docker compose --env-file /etc/myblog/myblog.env up -d mongo
docker compose --env-file /etc/myblog/myblog.env build app
docker compose --env-file /etc/myblog/myblog.env up -d mongo app
docker compose --env-file /etc/myblog/myblog.env ps
docker compose --env-file /etc/myblog/myblog.env logs --tail=100 mongo app
```

Do not start the shared Caddy gateway or open public TCP 80/443 until the first administrator has been created and verified.

## Updates

Production deploys an explicit Git tag, never an arbitrary working tree or the moving tip of `main`.

Before every update:

1. Create and verify a MongoDB and media backup.
2. Fetch the intended Git tag.
3. Build the new app image before replacing the running container.
4. Start the tagged release and wait for its health check.
5. Roll back to the previous tag if health verification fails.

Allow at least 30 seconds for graceful application shutdown.
