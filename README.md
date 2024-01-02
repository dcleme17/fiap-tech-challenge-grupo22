
# FIAP Tech Challenge 5SOAT

Grupo 22
## Stack utilizada

**Front-end:** N/A

**Back-end:** Node 20, Express 4.X.X, Typescript

**Banco:** MongoDB



## Preparação para desenvolver localmente

Clone o projeto

```bash
  git clone https://github.com/dcleme17/fiap-tech-challenge-grupo22.git
```

Vá para o diretório do projeto

```bash
  cd fiap-tech-challenge-grupo22/api
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

Estrutura de diretórios do projeto

    > src
      > domains --> Todos os domínios mapeados
        > acesso --> domínio
            > adapters --> adaptadores de condutores e conduzidos do projeto 
              > driven --> Adaptadores conduzidos como infra de banco de dados
              > driver --> Adaptadores condutores como a API Rest
                controllers --> controladores (adaptadores) das operações REST
                routes --> Rotas expostas das API's REST
            > core --> recursos que implementam a lógica do domínio
              > applications --> interfaces e serviços do domínio
                > ports --> interfaces expostas para os adaptadores
                > servies --> Lógica de negócio do domínio
              > entities --> Entidades do domínio
      > environments --> arquivos de configuração de ambiente do projeto
      environment.config.ts --> Classe que controla a configuração do ambiente
      express.config.ts --> Comfigurações do express, inclusindo middlewares utilizados no framework
      routes.config.ts --> Configuração das rotas globais
      server.ts --> Ponto de entrada para execução dos servidor express


## Subindo os containers do Docker

Execute os comandos abaixo (o primeiro destroi todos os containers e volumes do docker, incluindo o banco de dados, então cuidado.)

```bash
  docker-compose down -v --rmi local
  docker-compose up -d
```

Após completar a incialização dos containers, os serviços podem ser acessados conforme abaixo:

Backend (API)
```bash
localhost:3002/api/<dominio>/<operações>
```
MongoDB (pelo terminal do docker é possível usar o mongosh https://www.mongodb.com/docs/mongodb-shell/)
```bash
localhost:3000
```
Mongo Express (Interface para manutenção do MongoDB)
```bash
localhost:8081 
```