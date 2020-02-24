FROM mhart/alpine-node

WORKDIR /email-service

RUN npm install -g nodemon

COPY package.json /email-service/package.json
COPY package-lock.json /email-service/package-lock.json

COPY . .

# install dependencies
RUN npm ci

# expose port
EXPOSE 5002

# run server
CMD ["npm", "run", "dev"]
