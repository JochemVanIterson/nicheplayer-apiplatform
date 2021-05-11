# https://docs.docker.com/develop/develop-images/multistage-build/#stop-at-a-specific-build-stage
# https://docs.docker.com/compose/compose-file/#target


# https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact
ARG NODE_VERSION=14

# "common" stage
FROM node:${NODE_VERSION}-alpine AS api_platform_message_relay_common

# EXPOSE 8080

WORKDIR /usr/src/message_relay

# prevent the reinstallation of node modules at every changes in the source code
COPY package.json package-lock.json ./
RUN npm install

COPY . ./

VOLUME /usr/src/message_relay/node_modules


# "development" stage
# depends on the "common" stage above
FROM api_platform_message_relay_common AS api_platform_message_relay_dev

CMD ["npm", "start"]

# "build" stage
# depends on the "common" stage above
FROM api_platform_message_relay_common AS api_platform_message_relay_prod

ENV NODE_ENV production

RUN set -eux; \
    npm install

CMD ["npm", "start"]
