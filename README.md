
# FIAP Tech Challenge 5SOAT

Grupo 22
## Stack utilizada

**Front-end:** N/A

**Back-end:** Node 20, Express 4.X.X, Typescript

**Banco:** MongoDB



## Rodando localmente com o Docker

Execute o Docker compose 

```bash
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


## Rodando localmente para desenvolver a API

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
        > acesso
            > routes --> expõe as rotas do projeto e define a estrutura da requisição
            > adapters --> Faz a primeira validação do payload e traduz para as propriedades requeridas pelo controller..
            > controllers --> Implemeta a lógica de negócio e aciona os repositórios necessários
            > models --> Entidades de negócio, náo necessariamente uma ORM.
            > repository --> Classes que fazem persistência de dados e/ou se comunicam com alguma outra infraestrutura
        > pedido
        > pagamento
        > acompanhamento
        > entrega
    > tests

