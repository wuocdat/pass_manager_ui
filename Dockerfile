# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Enable corepack for Yarn 4
RUN corepack enable

COPY package.json yarn.lock ./

# Install dependencies (immutable for reproducible builds)
RUN yarn install --immutable

COPY . .

RUN yarn build

# Runtime stage
FROM nginx:1.27-alpine AS runtime

# SPA fallback + static assets
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
