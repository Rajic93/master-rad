FROM node:13-alpine

WORKDIR /master-artefacts_service

COPY . .

RUN apk --no-cache add --virtual native-deps \
  git g++ gcc libgcc libstdc++ linux-headers make python3 postgresql-dev && \
  npm install node-gyp -g &&\
  npm install -g nodemon &&\
  npm install

# expose port
EXPOSE 9002

# run serverw
CMD ["npm", "run", "start:dev"]
