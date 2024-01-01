FROM node:20
WORKDIR /home/node/app
COPY package.json pnpm-lock.yaml ./
COPY .tsconfig .
COPY src ./src
RUN npm install -g pnpm
RUN pnpm install
EXPOSE 3002
CMD [ "pnpm", "dev"]