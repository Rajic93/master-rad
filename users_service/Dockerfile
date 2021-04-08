FROM mhart/alpine-node

WORKDIR /master-users_service

RUN npm install -g nodemon

COPY package.json /master-users_service/package.json
COPY package-lock.json /master-users_service/package-lock.json

COPY . .

# install dependencies
RUN npm ci

# expose port
EXPOSE 9000

# run server
CMD ["npm", "run", "start:dev"]
