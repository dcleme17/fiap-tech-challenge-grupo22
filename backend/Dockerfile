FROM node:20
USER root
WORKDIR /home/node/app
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json .
COPY src ./src
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm tsx src/swagger.ts
EXPOSE 3000
CMD [ "pnpm", "start"]