#!/bin/sh
set -eu

# Render (and similar platforms) inject discrete Postgres connection details
# via `fromDatabase` bindings rather than a ready-made JDBC URL. Compose one
# here so conf/application.conf's ${?JDBC_DATABASE_URL} pickup works as-is.
if [ -n "${DB_HOST:-}" ]; then
  export JDBC_DATABASE_URL="jdbc:postgresql://${DB_HOST}:${DB_PORT:-5432}/${DB_NAME}"
  export JDBC_DATABASE_USERNAME="${DB_USER}"
  export JDBC_DATABASE_PASSWORD="${DB_PASSWORD}"
fi

exec /app/bin/aria-support-backend \
  -Dhttp.port="${PORT:-9000}" \
  -Dhttp.address=0.0.0.0 \
  -Dpidfile.path=/dev/null
