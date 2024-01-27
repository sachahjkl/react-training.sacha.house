FROM node:alpine AS base

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM busybox:1.35

# Create a non-root user to own the files and run our server
RUN adduser -D static
USER static
WORKDIR /home/static

EXPOSE 3000

# Copy the static website
# Use the .dockerignore file to control what ends up inside the image!
COPY --from=base /app/dist .

# Run BusyBox httpd
CMD ["busybox", "httpd", "-f", "-v", "-p", "3000"]
