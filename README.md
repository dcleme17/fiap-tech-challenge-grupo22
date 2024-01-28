
# FIAP Tech Challenge 5SOAT

Grupo 22
## Stack utilizada

**Front-end:** N/A

**Back-end:** Node 20, Express 4.18.2, Typescript 5.3.3

**Banco:** MongoDB



## Preparação para desenvolver localmente

Clone o projeto

```bash
  git clone https://github.com/dcleme17/fiap-tech-challenge-grupo22.git
```

Vá para o diretório do projeto

```bash
  cd fiap-tech-challenge-grupo22/backend
```

Instale o pnpm (pelo menos 3 vezes mais rápido que o npm)

```bash
  npm install pnpm -g
```

Instale as dependencias

```bash
  pnpm install
```

Inicie o servidor

```bash
  pnpm dev
```

Visão geral da estrutura do projeto

![Hexagonal](hexagonal.jpg)

Estrutura dos arquivos e diretórios do projeto
```shell
src
   ├── application.ts
   ├── 📁 configuration
   │   ├── environment.config.ts
   │   ├── 📁 environments
   │   │   ├── development.env
   │   │   └── production.env
   │   ├── express.config.ts
   │   ├── routes.config.ts
   │   └── server.config.ts
   ├── 📁 domains
   │   ├── 📁 cliente
   │   │   ├── 📁 adapter
   │   │   │   ├── 📁 driven
   │   │   │   │   └── 📁 infra
   │   │   │   │       └── 📁 database
   │   │   │   │           └── cliente.database.ts
   │   │   │   └── 📁 driver
   │   │   │       └── 📁 rest
   │   │   │           ├── 📁 controllers
   │   │   │           │   └── cliente.controller.ts
   │   │   │           ├── 📁 routes
   │   │   │           │   └── cliente.route.ts
   │   │   │           └── 📁 swagger
   │   │   │               └── acesso.swagger.ts
   │   │   └── 📁 core
   │   │       ├── 📁 applications
   │   │       │   ├── 📁 ports
   │   │       │   │   └── cliente.port.ts
   │   │       │   └── 📁 services
   │   │       │       └── cliente.service.ts
   │   │       └── 📁 entities
   │   │           ├── cliente.ts
   │   │           └── cliente.versao.ts
   │   ├── 📁 pagamento
   │   │   ├── 📁 adapter
   │   │   │   ├── 📁 driven
   │   │   │   │   └── 📁 infra
   │   │   │   │       ├── 📁 database
   │   │   │   │       │   └── pagamento.database.ts
   │   │   │   │       └── 📁 pix
   │   │   │   └── 📁 driver
   │   │   │       └── 📁 rest
   │   │   │           ├── 📁 controllers
   │   │   │           │   └── pagamento.controller.ts
   │   │   │           ├── 📁 routes
   │   │   │           │   └── pagamento.route.ts
   │   │   │           └── 📁 swagger
   │   │   │               └── pagamento.swagger.ts
   │   │   └── 📁 core
   │   │       ├── 📁 applications
   │   │       │   ├── 📁 ports
   │   │       │   │   └── pagamento.port.ts
   │   │       │   └── 📁 services
   │   │       │       └── pagamento.service.ts
   │   │       └── 📁 entities
   │   │           ├── pagamento.ts
   │   │           └── pagamento.versao.ts
   │   ├── 📁 pedido
   │   │   ├── 📁 adapter
   │   │   │   ├── 📁 driven
   │   │   │   │   └── 📁 infra
   │   │   │   │       └── 📁 database
   │   │   │   │           ├── pedido.database.ts
   │   │   │   │           └── produto.database.ts
   │   │   │   └── 📁 driver
   │   │   │       └── 📁 rest
   │   │   │           ├── 📁 controllers
   │   │   │           │   ├── pedido.controller.ts
   │   │   │           │   └── produto.controller.ts
   │   │   │           ├── 📁 routes
   │   │   │           │   ├── pedido.route.ts
   │   │   │           │   └── produto.route.ts
   │   │   │           └── 📁 swagger
   │   │   │               ├── pedido.swagger.ts
   │   │   │               └── produto.swagger.ts
   │   │   └── 📁 core
   │   │       ├── 📁 applications
   │   │       │   ├── 📁 ports
   │   │       │   │   ├── pedido.port.ts
   │   │       │   │   └── produto.port.ts
   │   │       │   └── 📁 services
   │   │       │       ├── pedido.service.ts
   │   │       │       └── produto.service.ts
   │   │       └── 📁 entities
   │   │           ├── itempedido.ts
   │   │           ├── pedido.ts
   │   │           ├── pedido.versao.ts
   │   │           ├── produto.ts
   │   │           └── produto.versao.ts
   │   └── 📁 suporte
   │       ├── 📁 entities
   │       │   ├── custom.error.ts
   │       │   └── custom.response.ts
   │       └── 📁 infra
   │           ├── 📁 database
   │           │   └── mongodb.ts
   │           └── error.handler.ts
   ├── 📁 swagger
   │   ├── swagger.json
   │   └── swagger.ts
   └── swagger.ts
```

## Subindo os containers do Docker

Execute os comandos abaixo (o primeiro destrói todos os containers e volumes do docker, incluindo o banco de dados, então cuidado.)

```bash
  docker-compose down -v --rmi local
  docker-compose up -d
```

Após completar a incialização dos containers, os serviços podem ser acessados conforme abaixo:

Backend (API)
```bash
http://localhost:3000/api/<dominio>/<operações>
```
Documentação (Swagger) será exposta na URL abaixo
```bash
http://localhost:3000/api-docs
```

MongoDB (pelo terminal do docker é possível usar o mongosh https://www.mongodb.com/docs/mongodb-shell/)
```bash
localhost:27017
```
Mongo Express (Interface para manutenção do MongoDB)
```bash
http://localhost:8081 
```