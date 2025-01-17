# FROM node:18 as build
# WORKDIR /usr/src/app
# COPY package.json .
# COPY package-lock.json .
# RUN npm install
# COPY . .
# RUN npx prisma generate
# RUN npm run build

# FROM node:18-slim
# RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends
# WORKDIR /usr/src/app
# COPY --chown=node:node --from=build /usr/src/app/dist ./dist
# COPY --chown=node:node --from=build /usr/src/app/.env .env
# COPY --chown=node:node --from=build /usr/src/app/package.json .
# COPY --chown=node:node --from=build /usr/src/app/package-lock.json .
# RUN npm install --omit=dev
# COPY --chown=node:node --from=build /usr/src/app/node_modules/.prisma/client  ./node_modules/.prisma/client
# ENV NODE_ENV production
# EXPOSE 8080
# CMD ["node", "dist/main"]

# ---------------------------
# FROM node:18
# WORKDIR /app
# COPY package*.json ./
# COPY prisma ./prisma/
# COPY .env ./
# COPY tsconfig.json ./
# COPY . .
# RUN npm ci
# RUN npx prisma generate
# # RUN npm run prestart:dev
# EXPOSE 8080
# CMD [  "npm", "run", "start" ]
#----------------------------

FROM node:18
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./
RUN npm ci
RUN npx prisma generate
COPY . .
# RUN npm run prestart:dev
EXPOSE 8080
CMD [  "npm", "run", "start:dev" ]

# FROM node:18 as build
# WORKDIR /opt/app
# COPY package*.json ./
# COPY prisma ./prisma/
# COPY .env ./
# COPY tsconfig.json ./
# RUN npm ci
# RUN npx prisma generate
# COPY . .
# RUN npm run build --prod

# FROM node:18
# WORKDIR /opt/app
# COPY --from=build /opt/app/dist ./dist
# COPY package*.json ./
# COPY .env ./dist
# # COPY tsconfig.json ./
# RUN npm ci --omit=dev
# RUN npx prisma generate
# CMD [ "node", "./dist/main.js" ]