FROM mhart/alpine-node:8.5

RUN apk add --update python make g++ nfs-utils \
  && rm -rf /var/cache/apk/*

ADD . .
RUN npm install && npm run build

ENTRYPOINT ["npm", "start"]
