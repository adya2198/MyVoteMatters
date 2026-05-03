# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Need to pass build args if any env vars are required at build time
# ARG VITE_GEMINI_API_KEY
# ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY
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
