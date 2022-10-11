FROM node:16

COPY package.json .

RUN npm install

COPY src tsconfig.json ./

CMD npm start