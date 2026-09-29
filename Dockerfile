# Production-ready Node.js Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV MONGO_URL=mongodb://localhost:27017/todos

# Copy package descriptors for optimal layer caching
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production || npm install --production

# Copy application source code
COPY . .

# Expose server port
EXPOSE 5000

# Health check to ensure application responds
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

# Start the application using existing package.json start command
CMD ["npm", "start"]
