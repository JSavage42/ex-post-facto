FROM node:12.13.1-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm i --silent
RUN npm i react-scripts -g --silent
CMD ["npm", "start"]
