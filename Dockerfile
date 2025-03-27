FROM node:18

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN mkdir -p /usr/src/app/node_modules && chmod -R 777 /usr/src/app/node_modules

RUN npm install 

COPY ./ ./

EXPOSE 4000

CMD ["npm", "run", "dev"]