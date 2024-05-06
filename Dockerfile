FROM node:16.20.0

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn

# Bundle app source
COPY . .

# Making entrypoint files executable
RUN ["chmod", "+x", "/app/entrypoint/entrypoint.sh"]
RUN ["chmod", "+x", "/app/entrypoint/wait-for-it.sh"]

# Build production code
RUN yarn build

# start application
EXPOSE 8080
CMD ["node", "./dist/main.js", "--env=production"]