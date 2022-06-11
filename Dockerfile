FROM node:14-alpine

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

COPY --chown=node:node ./public ./public
COPY --chown=node:node ./src ./src
COPY --chown=node:node ./.eslintrc.js .
COPY --chown=node:node ./babel.config.js .
COPY --chown=node:node ./package.json .
COPY --chown=node:node ./tsconfig.json .
COPY --chown=node:node ./webpack.config.js .
COPY --chown=node:node ./yarn.lock .

RUN yarn
RUN yarn build

FROM nginx:1-alpine

RUN \
    mkdir -p /etc/nginx/templates \
    && mkdir -p /opt \
    && mkdir -p /opt/app

COPY ./docker/templates/. /etc/nginx/templates/.

COPY --from=0 /home/node/app/dist/. /opt/app/.
