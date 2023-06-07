#------------------ Builder Image -----------------
FROM node:16-alpine AS builder

RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64


RUN apk update
RUN apk add dumb-init

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY tsconfig*.json ./
COPY src src

RUN yarn build
RUN yarn install --production --frozen-lockfile

#------------------ Prod Image --------------------
FROM node:16-alpine

ENV NODE_ENV production

COPY --from=builder /usr/bin/dumb-init /usr/bin/dumb-init

USER node
WORKDIR /usr/src/app

COPY --chown=node:node --from=builder /usr/src/app/dist ./dist
COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules

CMD ["dumb-init", "node", "dist/index.js"]
