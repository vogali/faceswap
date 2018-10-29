FROM node:8.11-alpine

ARG DEPLOY_ENV
ARG GAME_ID
ARG DEPLOY_PORT

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
RUN apk --update add graphicsmagick

# Copy all files
COPY ./docker/docker-container-init.sh /usr/local/bin
COPY ./docker/package.json package.json
COPY server/scripts server/scripts
COPY server/services server/services
COPY dist/$DEPLOY_ENV/games/$GAME_ID dist

RUN \
  sed -i "s/<=%/<%/g" dist/views/qrcode.ejs && \
  sed -i "s/%=>/%>/g" dist/views/qrcode.ejs

# install all packages
RUN npm config set unsafe-perm true && \
  npm install -g cnpm --registry=https://registry.npm.taobao.org && \
  cnpm install --production

EXPOSE $DEPLOY_PORT

#CMD ["node", "server/services/index.js"]
CMD [ "sh", "/usr/local/bin/docker-container-init.sh"]
