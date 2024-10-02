# [---- Base image ----]
# Set the version of node used as a base template
FROM node:18-alpine AS base
LABEL maintainer="Ignacio Gómez <jgnaciogomez@gmail.com>"
LABEL build_date="10-2-2024"
LABEL description="\
    Dockerfile to containerize nextjs applications \
    in production environments."
# --------------------------------------------------


# [---- Dependencies image ----]
FROM base AS deps
# Install libc6-compat, to set compatibility to musl
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
# Install dependencies if a package-lock.json found
COPY package.json package-lock.json* ./
RUN \
    if [ -f package-lock.json ]; then npm i; \
    else echo "Lockfile not found." && exit 1; \
    fi
# --------------------------------------------------


# [---- Build image ----]
# Rebuild the source code only when needed
FROM base AS build
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build
# --------------------------------------------------

# [---- Production Image ----]
# Copy all the files and run the index.js file
FROM base AS runner
WORKDIR /usr/src/app
# Set a production enviroment
ENV NODE_ENV production
# Add users
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 worker

# Copy all files required
# Automatically leverage output traces to reduce image size
COPY --from=build --chown=worker:nodejs /usr/src/app/dist ./
COPY --from=build --chown=worker:nodejs /usr/src/app/prisma/ ./prisma/
COPY --chown=worker:nodejs ./run.sh ./
COPY --from=deps --chown=worker:nodejs /usr/src/app/node_modules ./node_modules 
COPY --from=build --chown=node:nodejs /usr/src/app/.env ./

# Install pm2 (production process manager for node.js)
RUN npm install pm2@latest -g

# Sets the user to "worker", which is a non-root user for better security.
USER worker

CMD ["/bin/sh", "./run.sh"]