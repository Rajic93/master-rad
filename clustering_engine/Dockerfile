FROM mhart/alpine-node

WORKDIR /clustering-engine

RUN ls -la

RUN npm install -g nodemon

COPY ./clustering_engine/package*.json ./

RUN npm i
# RUN npm ci \
#  && npm cache clean --force \
#  && mv /master-api/node_modules /node_modules

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
