FROM node:13-alpine

WORKDIR /master-users_service

COPY . .

RUN apk --no-cache add --virtual native-deps \
  git g++ gcc libgcc libstdc++ linux-headers make python3 postgresql-dev && \
  npm install -g nodemon &&\
  npm install

# expose port
EXPOSE 9000

# run server
CMD ["npm", "start"]
