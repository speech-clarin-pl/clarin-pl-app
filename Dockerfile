FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

#RUN npm ci --only=production

COPY . .

RUN npm install typescript moment react-app-rewired copy-webpack-plugin redux-thunk axios react-keyed-file-browser wavesurfer.js

RUN npm run build

RUN npm install -g serve

CMD [ "serve" , "-l" , "8888" , "-s" , "build" ]
