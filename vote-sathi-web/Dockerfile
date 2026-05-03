# Build stage
FROM node:24-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Accept build arguments and set them as environment variables for the build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

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
