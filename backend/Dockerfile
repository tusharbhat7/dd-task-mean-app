# === Stage 1: Build & Dependencies ===
# Use a robust Node base image for installing packages
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to cache dependency installation
COPY package*.json ./

# Install production dependencies only (using the --omit=dev flag)
# This keeps the final image smaller
RUN npm install --omit=dev

# Copy the rest of the application source code
COPY . .

# === Stage 2: Production Runtime ===
# Use the same base image for consistency and stability
FROM node:20-alpine

WORKDIR /app

# Copy necessary files from the build stage: node_modules and the app code
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app .

# The backend (server.js) runs on port 3000 by default (a common Node port)
# We expose this internal port, which will be mapped later by Docker Compose
EXPOSE 3000

# Command to start the application (from your README)
CMD ["node", "server.js"]
