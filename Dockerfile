# Alpine Linux
FROM node:19-alpine

# Sets the environment variable for the base path of the application
ENV APP_DIR /usr/src/app

# Sets the work dir
WORKDIR $APP_DIR

# Install FFmpeg
RUN apk add --update ffmpeg
RUN apk add --no-cache git gcc musl-dev linux-headers
RUN npm install -g npm@9.8.1 && npm cache clean --force

# Copy the application files
COPY package*.json ./
RUN npm install
COPY . .

# Exposes the application port
EXPOSE 5022
CMD [ "npm", "run", "start" ]