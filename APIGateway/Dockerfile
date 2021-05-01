FROM mhart/alpine-node

WORKDIR /master-api_gateway

RUN npm install -g nodemon

COPY package.json /master-api_gateway/package.json
COPY package-lock.json /master-api_gateway/package-lock.json

COPY . .

run ls -la

# install dependencies
RUN npm i

# expose port
EXPOSE 3000

# run server
CMD ["npm", "run", "startdev"]
