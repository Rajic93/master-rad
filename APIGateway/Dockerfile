FROM mhart/alpine-node

WORKDIR /master-api_gateway

RUN npm install -g nodemon

COPY package.json /master-api_gateway/package.json
COPY package-lock.json /master-api_gateway/package-lock.json

COPY . .

# install dependencies
RUN npm ci

# expose port
EXPOSE 9080

# run server
CMD ["npm", "run", "startdev"]
