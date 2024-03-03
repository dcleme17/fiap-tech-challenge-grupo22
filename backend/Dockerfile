FROM node:20
USER root
WORKDIR /home/node/app
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json .
COPY src ./src
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm tsx src/swagger.ts
ENV PORT=3000
ENV DATABASE_URL=mongodb://root:mongo2023@localhost:27017
EXPOSE 3000
CMD [ "pnpm", "start"]