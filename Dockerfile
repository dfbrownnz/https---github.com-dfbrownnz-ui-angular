# STAGE 1: Build the Angular application
FROM node:20-alpine AS build
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build for production
COPY . .
RUN npm run build --configuration=production

# STAGE 2: Serve with Nginx
FROM nginx:alpine
# Replace 'YOUR_PROJECT_NAME' with the 'name' from your package.json
COPY --from=build /usr/src/app/dist/my-app/browser /usr/share/nginx/html

# Optional: Copy a custom nginx.conf if you use Angular Routing
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Build the image: 
    # docker build -t angular-app .
# Run the container: 
    # docker run -p 8080:80 angular-app
