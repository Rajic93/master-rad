
FROM mhart/alpine-node

WORKDIR /email-service

RUN npm install -g nodemon

COPY package*.json ./

COPY . .

RUN ls -la
RUN cat package.json
#RUN npm i
# RUN npm ci \
#  && npm cache clean --force \
#  && mv /master-api/node_modules /node_modules
RUN ls -la ./node_modules

EXPOSE 5002

CMD ["npm", "start"]
