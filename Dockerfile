# FROM node:18 as build
# WORKDIR /opt/app
# ARG DATABSE_URL
# COPY package*.json ./
# COPY prisma ./prisma/
# COPY .env ./
# COPY tsconfig.json ./
# COPY . .
# RUN npm ci
# RUN echo DATABSE_URL=${DATABSE_URL} > .env
# RUN npx prisma generate
# RUN npx prisma migrate dev
# RUN npm run build --prod

# FROM node:18
# WORKDIR /opt/app
# ARG DATABSE_URL
# COPY --from=build /opt/app/dist ./dist
# COPY package*.json ./
# COPY ./prisma ./prisma
# COPY .env ./
# COPY tsconfig.json ./
# RUN echo DATABSE_URL=${DATABSE_URL} > .env
# RUN npx prisma generate
# RUN npm ci --omit=dev
# RUN prisma migrate deploy
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
RUN npx prisma migrate:start
EXPOSE 8080
CMD [  "npm", "run", "start:migrate:start" ]

# FROM node:18 AS builder
# WORKDIR /app
# COPY package*.json ./
# COPY prisma ./prisma/
# COPY .env ./
# COPY tsconfig.json ./
# COPY . .
# RUN npm install
# RUN npm run build

# FROM node:18
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/prisma ./prisma
# EXPOSE 8080
# CMD [  "npm", "run", "start:migrate:prod" ]