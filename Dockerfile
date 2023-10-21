# FROM node:18 as build
# WORKDIR /opt/app
# ARG DATABSE_URL
# ADD . .
# ADD package*.json ./
# RUN npm ci
# RUN echo DATABSE_URL=${DATABSE_URL} > .env
# RUN npx prisma generate
# RUN npm run build --prod

# FROM node:18
# WORKDIR /opt/app
# ARG DATABSE_URL
# COPY --from=build /opt/app/dist ./dist
# ADD package*.json ./
# ADD ./prisma ./prisma
# RUN echo DATABSE_URL=${DATABSE_URL} > .env
# RUN npx prisma generate
# RUN npm ci --omit=dev
# CMD [ "node", "./dist/main.js" ]

FROM node:alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./
COPY . .
RUN npm install
RUN npx prisma generate
EXPOSE 8080
CMD npm start