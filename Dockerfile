# ==========================================
# STAGE 1: Build React/Vite Static Bundle
# ==========================================
FROM node:20-alpine AS build-stage

WORKDIR /app

# Copy package manifests & install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build production bundle
COPY . .
RUN npm run build

# ==========================================
# STAGE 2: Lightweight Nginx Server
# ==========================================
FROM nginx:1.25-alpine AS production-stage

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build artifacts from build-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
