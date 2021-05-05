# https://docs.docker.com/develop/develop-images/multistage-build/#stop-at-a-specific-build-stage
# https://docs.docker.com/compose/compose-file/#target


# https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact
ARG NODE_VERSION=14

# "common" stage
FROM node:${NODE_VERSION}-alpine AS api_platform_frontend_common

# EXPOSE 80

WORKDIR /usr/src/frontend

ENV NEXT_TELEMETRY_DISABLED 1

# prevent the reinstallation of node modules at every changes in the source code
COPY package.json yarn.lock ./
RUN yarn

COPY . ./

VOLUME /usr/src/frontend/node_modules


# "development" stage
# depends on the "common" stage above
FROM api_platform_frontend_common AS api_platform_frontend_dev

CMD ["yarn", "dev"]


# "build" stage
# depends on the "common" stage above
FROM api_platform_frontend_common AS api_platform_frontend_prod

ENV NODE_ENV production
ARG REACT_APP_API_ENTRYPOINT

RUN set -eux; \
    yarn build

CMD ["yarn", "start"]
