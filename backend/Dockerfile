FROM node:20
USER root
WORKDIR /home/node/app
COPY backend/package.json backend/pnpm-lock.yaml ./
COPY backend/tsconfig.json .
COPY backend/src ./src
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm tsx ./src/swagger.ts
ENV PORT=3000
ENV DATABASE_URL=mongodb://root:mongo2023@localhost:27017

ENV MERCADOPAGO_URL=https://api.mercadopago.com/123
ENV MERCADOPAGO_USERID=8496
ENV MERCADOPAGO_TOKEN=TEST-2
ENV MERCADOPAGO_POS=SU
ENV MERCADOPAGO_WEBHOOK_URL=http:/br

EXPOSE 3000
CMD [ "pnpm", "start"]