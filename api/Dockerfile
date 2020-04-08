FROM mhart/alpine-node

WORKDIR /master-api

RUN npm install -g nodemon

COPY package.json /master-api/package.json
COPY package-lock.json /master-api/package-lock.json

COPY ./api .

# install dependencies
RUN npm ci

# expose port
EXPOSE 5000

# run server
CMD ["npm", "run", "dev"]
