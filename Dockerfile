FROM node:18.11.0-bullseye as build
ENV PATH=/app/node_modules/.bin:$PATH
ENV PORT 2758
ENV MONGO_HOST "mongo"
ENV MONGO_PORT "27017"
ENV COINNEWS_BASE_URL "http://coinnews:8000/api"
WORKDIR /app
COPY package*.json ./

# install npm packages
RUN npm ci && npm cache clean --force

FROM build as production
ENV NODE_ENV production
COPY . .
COPY ./docker-entrypoint.sh /usr/local/bin
ENTRYPOINT [ "docker-entrypoint.sh" ]
CMD [ "node","server" ]
