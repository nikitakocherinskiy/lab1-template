# FROM node:18-alpine As development
# WORKDIR /usr/src/app
# COPY --chown=node:node package*.json ./
# RUN npm ci
# COPY --chown=node:node prisma ./prisma/
# COPY --chown=node:node .env ./
# COPY --chown=node:node tsconfig.json ./
# COPY --chown=node:node . .
# RUN npx prisma generate
# EXPOSE 8080
# USER node


# FROM node:18-alpine As build
# WORKDIR /usr/src/app
# COPY --chown=node:node package*.json ./
# COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node prisma ./prisma/
# COPY --chown=node:node .env ./
# COPY --chown=node:node tsconfig.json ./
# COPY --chown=node:node . .
# RUN npm run build
# ENV NODE_ENV production
# RUN npm ci --only=production && npm cache clean --force
# USER node

# FROM node:18-alpine As production
# COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node --from=build /usr/src/app/dist ./dist
# COPY --chown=node:node .env ./
# CMD [ "node", "dist/main.js" ]

# ---------------------------
FROM node:18
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./
COPY . .
RUN npm ci
RUN npx prisma generate
EXPOSE 8080
CMD [  "npm", "run", "start:migrate:start" ]
#----------------------------

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