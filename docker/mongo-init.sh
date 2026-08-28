#!/bin/sh
set -eu

: "${MONGO_APP_DATABASE:?MONGO_APP_DATABASE is required}"
: "${MONGO_APP_USERNAME:?MONGO_APP_USERNAME is required}"
: "${MONGO_APP_PASSWORD:?MONGO_APP_PASSWORD is required}"

mongosh --host 127.0.0.1 --port 27017 --quiet <<EOF
db = db.getSiblingDB('${MONGO_APP_DATABASE}')

if (db.getUser('${MONGO_APP_USERNAME}') === null) {
  db.createUser({
    user: '${MONGO_APP_USERNAME}',
    pwd: '${MONGO_APP_PASSWORD}',
    roles: [
      {
        role: 'readWrite',
        db: '${MONGO_APP_DATABASE}',
      },
    ],
  })
}
