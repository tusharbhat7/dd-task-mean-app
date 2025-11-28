# === Stage 1: Build the Angular application ===
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and install all dependencies
COPY package*.json ./
RUN npm install

# Copy the Angular source code
COPY . .

# Build the application for production. 
# The output is placed in the 'dist' directory.
# Note: Angular 15 often places the output in /dist/PROJECT_NAME.
# We will use '.' to simplify path finding.
RUN npm run build -- --output-path=./dist/browser --configuration=production

# === Stage 2: Serve the application with Nginx ===
# Use the lightweight official Nginx image
FROM nginx:stable-alpine

# Copy the compiled static files from the build stage to the Nginx default serving path
# NOTE: You MUST inspect your 'frontend/angular.json' to confirm the output folder name.
# 'dist/browser' is common for Angular 15+ standalone component projects.
COPY --from=build /app/dist/browser /usr/share/nginx/html

# Nginx listens on port 80 by default
EXPOSE 80

# Nginx starts by default (default command of the nginx image)
