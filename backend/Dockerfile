FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Use the port specified by Cloud Run or default to 5000
ENV PORT=5000
EXPOSE $PORT

CMD ["npm", "start"]
