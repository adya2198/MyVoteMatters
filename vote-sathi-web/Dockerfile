# Build stage
FROM node:24-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine
# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html
# Expose port 8080 as configured in nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
