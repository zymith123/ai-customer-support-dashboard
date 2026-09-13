# --- Build stage -----------------------------------------------------------
FROM eclipse-temurin:21-jdk-jammy AS build

RUN apt-get update && apt-get install -y --no-install-recommends curl gnupg \
    && rm -rf /var/lib/apt/lists/*

ARG SBT_VERSION=1.10.7
RUN curl -fsSL -o /tmp/sbt.tgz "https://github.com/sbt/sbt/releases/download/v${SBT_VERSION}/sbt-${SBT_VERSION}.tgz" \
    && tar -xzf /tmp/sbt.tgz -C /opt \
    && rm /tmp/sbt.tgz
ENV PATH="/opt/sbt/bin:${PATH}"

WORKDIR /app

# Cache dependency resolution separately from source changes.
COPY project project
COPY build.sbt .
RUN sbt update

COPY app app
COPY conf conf
RUN sbt stage

# --- Runtime stage -----------------------------------------------------------
FROM eclipse-temurin:21-jre-jammy AS runtime

RUN useradd --system --create-home appuser
WORKDIR /app

COPY --from=build /app/target/universal/stage /app
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh /app/bin/aria-support-backend && chown -R appuser:appuser /app

USER appuser
EXPOSE 9000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
