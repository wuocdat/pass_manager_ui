# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Enable corepack for Yarn 4
RUN corepack enable

COPY package.json yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn/ .yarn/

# Install dependencies (immutable for reproducible builds)
RUN yarn install --immutable

COPY . .

RUN yarn build

# Runtime stage
FROM nginx:1.27-alpine AS runtime

# Generate a self-signed cert for HTTPS (replace with real certs in production)
RUN apk add --no-cache openssl \
  && mkdir -p /etc/nginx/certs \
  && openssl req -x509 -nodes -newkey rsa:2048 -days 365 \
    -subj "/CN=localhost" \
    -keyout /etc/nginx/certs/server.key \
    -out /etc/nginx/certs/server.crt

# SPA fallback + static assets
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
