FROM mhart/alpine-node

WORKDIR /master-reverse-proxy

RUN npm install -g nodemon

COPY package.json /master-reverse-proxy/package.json
COPY package-lock.json /master-reverse-proxy/package-lock.json

COPY . .

# install dependencies
RUN npm ci

# expose port
EXPOSE 5099

# run server
CMD ["npm", "run", "dev"]
