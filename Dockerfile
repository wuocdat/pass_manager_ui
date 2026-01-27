# Build + runtime (no nginx)
FROM node:20-alpine
WORKDIR /app

# Enable corepack for Yarn 4
RUN corepack enable

COPY package.json yarn.lock ./

# Install dependencies (immutable for reproducible builds)
RUN yarn install --immutable

COPY . .

RUN yarn build

EXPOSE 4173

# Vite preview serves the built dist folder
CMD ["yarn", "preview", "--host", "0.0.0.0"]
