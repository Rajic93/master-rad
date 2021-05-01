FROM node:13-alpine

WORKDIR /master-users_service

RUN apk --no-cache add --virtual native-deps \
  git g++ gcc libgcc libstdc++ linux-headers make python postgresql-dev && \
  npm install node-gyp -g &&\
  npm install &&\
  npm rebuild bcrypt --build-from-source && \
  npm cache clean --force &&\
  apk del native-deps 

COPY . .
# install dependencies
RUN npx ci

RUN npm i -g nodemon

# expose port
EXPOSE 9000

# run server
CMD ["npm", "start"]
