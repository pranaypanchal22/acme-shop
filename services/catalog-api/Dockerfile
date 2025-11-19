FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install dev deps so tsx is available
RUN corepack enable \
  && if [ -f pnpm-lock.yaml ]; then corepack prepare pnpm@latest --activate && pnpm install --frozen-lockfile; \
     elif [ -f yarn.lock ]; then corepack prepare yarn@stable --activate && yarn install --frozen-lockfile; \
     else npm ci; fi

COPY . .

EXPOSE 4001
# make sure package.json has: "dev": "tsx watch src/index.ts"
CMD ["npm","run","dev"]

