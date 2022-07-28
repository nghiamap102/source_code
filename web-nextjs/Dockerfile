FROM node:16-alpine

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN printf 'NEXT_PUBLIC_CLIENT_ID=effa63de-0736-4082-8bd9-1361df2b3633 \n\
NEXT_PUBLIC_CLIENT_SERECT=123456 \n\ 
NEXT_PUBLIC_GOOGLE_CLIENT_ID=1082242288020-e3ihisr09ba1jku380h6e0d99gn0esa6.apps.googleusercontent.com \n\
NEXT_PUBLIC_FACEBOOK_APP_ID=680709393381022 \n\
NEXT_PUBLIC_IDENTIFY_URL=https://dev-id.nutri.demo-application.net \n\
NEXT_PUBLIC_CMS_URL=https://dev-cms.nutri.demo-application.net \n\
NEXT_PUBLIC_ECOM_URL=https://ecom.nutri-asia.demo-application.net \n\' >> .env

RUN yarn build

CMD yarn start