FROM node:latest AS build

RUN apt-get update && \
  apt-get install -y --no-install-recommends dumb-init
WORKDIR /app
COPY package*.json ./

RUN npm ci

COPY . .
RUN npm run build

FROM node:20.12.2-bullseye-slim
RUN apt-get update && \
  apt-get install -y --no-install-recommends curl && \
  apt-get reinstall -y ca-certificates && \
  update-ca-certificates

ENV NODE_ENV production
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /app

COPY --chown=node:node --from=build /app/node_modules /app/node_modules
COPY --chown=node:node --from=build /app/dist /app/dist

EXPOSE 3000
CMD ["dumb-init", "node", "dist/index.js"]
