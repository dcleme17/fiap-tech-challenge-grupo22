
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
      > domains
        > acesso
            > controllers --> Implemeta a lógica de negócio e expõe adaptadores para os consumidores
              > interfaces --> Todas as interfaces dos controllers
              cliente.controller.ts --> Classe que implementa a lógica de negócio para os clientes do sistema.
            > entities --> Entidades do domínio
            > infra --> Todos os componentes de infraestrutura externa ou interna
              > database --> Componentes e interfaces para conexão com o banco de dados
              > rest --> Adaptadores e rotas para os serviços rest do aplicativo
                > adapters --> Cria adaptadores para os consumidores, no caso, para API's rest
                acesso.rest.ts --> Arquivo com as configurações das rotas
            > tests --> Pacote que implementará os casos de teste do sistema
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
