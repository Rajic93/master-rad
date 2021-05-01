FROM mhart/alpine-node

WORKDIR /master-artefacts_service

RUN command

RUN npm install -g nodemon

COPY package.json /master-artefacts_service/package.json
COPY package-lock.json /master-artefacts_service/package-lock.json

COPY . .

# install dependencies
RUN npm ci

# expose port
EXPOSE 9002

# run server
CMD ["npm", "run", "start:dev"]
