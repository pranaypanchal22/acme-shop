FROM node:20-alpine

WORKDIR /app

# Copy lockfiles first for layer caching
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# DO NOT set NODE_ENV=production before this step
# Install dev deps so vite is available
RUN corepack enable \
  && if [ -f pnpm-lock.yaml ]; then corepack prepare pnpm@latest --activate && pnpm install --frozen-lockfile; \
     elif [ -f yarn.lock ]; then corepack prepare yarn@stable --activate && yarn install --frozen-lockfile; \
     else npm ci; fi

# App sources
COPY . .

EXPOSE 5173
# make sure package.json has: "dev": "vite"
CMD ["npm","run","dev","--","--host","0.0.0.0"]

