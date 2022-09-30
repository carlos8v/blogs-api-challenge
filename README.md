# Boas vindas ao repositório do API de Blogs!

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir deste repositório, dando fork e utilizando branchs e Pull Request para colocar seus códigos.
---

# Sumário

- [Habilidades](#habilidades)
- [Entregáveis](#entregáveis)
  - [O que deverá ser desenvolvido](#o-que-deverá-ser-desenvolvido)
  - [Desenvolvimento](#desenvolvimento)
- [Instruções para entregar seu projeto](#instruções-para-entregar-seu-projeto)
  - [Antes de começar a desenvolver](#antes-de-começar-a-desenvolver)
  - [Durante o desenvolvimento](#durante-o-desenvolvimento)
- [Requisitos do projeto](#requisitos-do-projeto)
  - [Antes de começar](#antes-de-começar)
    - [Observações importantes](#-observações-importantes)
    - [Dicas](#dicas)
  - [Critérios de avaliação](#critérios-de-avaliação)
  - [Execução de testes unitários](#execução-de-testes-unitários)
  - [Lista de Requisitos](#lista-de-requisitos)
    - [1 - Sua aplicação deve ter o endpoint POST `/user`](#1---sua-aplicação-deve-ter-o-endpoint-post-user)
    - [2 - Sua aplicação deve ter o endpoint POST `/login`](#2---sua-aplicação-deve-ter-o-endpoint-post-login)
    - [3 - Sua aplicação deve ter o endpoint GET `/user`](#3---sua-aplicação-deve-ter-o-endpoint-get-user)
    - [4 - Sua aplicação deve ter o endpoint GET `/user/:id`](#4---sua-aplicação-deve-ter-o-endpoint-get-userid)
    - [5 - Sua aplicação deve ter o endpoint POST `/categories`](#5---sua-aplicação-deve-ter-o-endpoint-post-categories)
    - [6 - Sua aplicação deve ter o endpoint GET `/categories`](#6---sua-aplicação-deve-ter-o-endpoint-get-categories)
    - [7 - Sua aplicação deve ter o endpoint POST `/post`](#7---sua-aplicação-deve-ter-o-endpoint-post-post)
    - [8 - Sua aplicação deve ter o endpoint GET `/post`](#8---sua-aplicação-deve-ter-o-endpoint-get-post)
    - [9 - Sua aplicação deve ter o endpoint GET `post/:id`](#9---sua-aplicação-deve-ter-o-endpoint-get-postid)
    - [10 - Sua aplicação deve ter o endpoint PUT `/post/:id`](#10---sua-aplicação-deve-ter-o-endpoint-put-postid)
    - [Requisitos Bônus](#requisitos-bônus)
    - [11 - Sua aplicação deve ter o endpoint DELETE `post/:id`](#11---sua-aplicação-deve-ter-o-endpoint-delete-postid)
    - [12 - Sua aplicação deve ter o endpoint DELETE `/user/me`](#12---sua-aplicação-deve-ter-o-endpoint-delete-userme)
    - [13 - Sua aplicação deve ter o endpoint GET `post/search?q=:searchTerm`](#13---sua-aplicação-deve-ter-o-endpoint-get-postsearchqsearchterm)
- [Avisos Finais](#avisos-finais)

# Habilidades 

Nesse projeto, você vai construir um back-end usando `ORM` com o pacote `prisma` do `npm`, e será capaz de:
 - Criar e associar tabelas usando `models` do `prisma`
 - Construir endpoints para consumir os models que criar
 - Fazer um `CRUD` com o `ORM`

# Entregáveis

Para entregar o seu projeto você deverá dar fork do repositório e criar um Pull Request para avaliar seu desenvolvimento.

---

## O que deverá ser desenvolvido

Você vai arquiteturar e desenvolver uma API de um CRUD posts de blog (com o prisma). Começando pela API, você vai desenvolver alguns endpoints (seguindo os princípios do REST) que estarão conectados ao seu banco de dados. Lembre-se de aplicar os princípios SOLID!

Primeiro, você irá criar uma tabela para os usuários que desejam se cadastrar na aplicação. Após isso, criará também uma tabela de Categorias para seus Posts e por fim a tabela de Posts será seu foco, guardando todas as informações dos posts realizados na plataforma. Essa é apenas uma recomendação!

---

## Desenvolvimento

Você deve desenvolver uma aplicação em `Node.js` usando o pacote `prisma` para fazer um `CRUD` de posts.

Para fazer um post é necessário usuário e login, portanto será trabalhada a **relação entre** `user` e `post`. Também será necessário a utlização de categorias para seus posts, assim trabalhando a relação de `posts` para `categories` e de `categories` para `posts`.

---

# Instruções para entregar seu projeto:


### ANTES DE COMEÇAR A DESENVOLVER:

1. Dê um fork no repositório.

2. Clone o repositório
  * Exemplo: `git clone https://github.com/user/blogs-api-challenge.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd blogs-api-challenge`

3. Instale as dependências
  * `npm install`

4. Crie uma branch a partir da branch `main`
  * Verifique que você está na branch `main`
    * Exemplo: `git branch`
  * Se não estiver, mude para a branch `main`
    * Exemplo: `git checkout main`
  * Agora crie uma branch à qual você vai submeter os `commits` do seu projeto
    * Você pode criar uma branch no seguinte formato: `feature/feature-name`
    * Exemplo: `git checkout -b feature/login`

5. Programe :coffee:...

6. Adicione as mudanças ao _stage_ do Git e faça um `commit`
  * Verifique que as mudanças que ainda não estão no _stage_
    * Exemplo: `git status`
  * Adicione o novo arquivo ao _stage_ do Git
      * Exemplo:
        * `git add .`
        * `git status`
  * Faça o `commit` inicial
      * Exemplo:
        * `git commit -m 'iniciando o projeto'` (fazendo o primeiro commit)
        * Se quiser, você pode seguir as regras do [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) para suas mensagens
          * Exemplo: `git commit -m 'feat: adicionado login'`

7. Adicione o novo `commit` à branch do repositório remoto
  * Usando o exemplo anterior: `git push -u origin feature/login`

8. Crie um novo `Pull Request` _(PR)_
  * Vá até a página de _Pull Requests_ do repositório
  * Clique no botão verde _"New pull request"_
  * Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
  * Clique no botão verde _"Create pull request"_
  * Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
  * Volte até a página de _Pull Requests_ do repositório e confira que o seu _Pull Request_ está criado

---

### DURANTE O DESENVOLVIMENTO

* Faça `commits` das alterações que você fizer no código regularmente

* Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto

* Os comandos que você utilizará com mais frequência são:
  1. `git status` _(para verificar o que está fora ou dentrodo stage)_
  2. `git add` _(para adicionar arquivos ao stage do Git)_
  3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_
  4. `git push -u origin nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_
  5. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_

---

# Requisitos do projeto:

## Antes de começar:

### ⚠️ Leia-os atentamente e siga à risca o que for pedido. ⚠️

### 👀 Observações importantes:

Em cada requisito você encontrará uma imagem de um protótipo de como sua aplicação deve ficar. Estilo da página não será avaliado.

O não cumprimento de um requisito, total ou parcialmente, impactará em sua avaliação.

Há um arquivo `src/server.ts` no repositório. Não remova, nele, o seguinte trecho de código:

```javascript
app.get('/', (_request, response) => {
  return response.send()
});
```

**Você irá precisar configurar as variáveis globais do MySQL.** Você pode usar esse [Conteúdo de variáveis de ambiente com NodeJS](https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/) como referência.

**Faça essas configurações também para as variáveis de ambiente usadas nesses arquivo:**
Utilize o arquivo `.env.example` como guia.

`.env`

```shell
DATABASE_URL="mysql://adalovelace:password@localhost:3306/blogs_api_challenge"
```

**(Neste arquivo e obrigatório deixar o nome do database como `'blogs_api_challenge'`)**

**Com elas que iremos conseguir conectar ao banco do avaliador automático**

#### Variável JWT:

`JWT_SECRET`

**É necessário expor esta variável de ambiente parar servir como a chave JWT da aplicação**

### Dicas

#### Status HTTP

Tenha em mente que todas as "respostas" devem respeitar os [status do protocolo HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status) com base no que o REST prega.

Alguns exemplos:

  - Requisições que precisam de token mas não o receberam devem retornar um código de `status 401`;

  - Requisições que não seguem o formato pedido pelo servidor devem retornar um código de `status 400`;

  - Um problema inesperado no servidor deve retornar um código de `status 500`;

  - Um acesso ao criar um recurso, no nosso caso usuário ou post, deve retornar um código de `status 201`.

---

## Critérios de avaliação:

- O seu projeto deverá usar um `ORM` para criar e atualizar o seu banco. A clonagem do projeto seguida de um comando de migrate deve deixá-lo em sua forma esperada.

- Deve conter uma tabela chamada `users` com o model `User`, contendo dados com a seguinte estrutura:

  ```json
  {
    "id": 1,
    "displayName": "Ada Lovelace",
    "email": "ada@lovelace.com", // tem quer ser único
    "password": "123456",
    "image": "https://avatars.dicebear.com/api/adventurer/ada%20lovelace.svg"
  }
  ```
- Deve conter uma tabela chamada `categories` com o model `Category`, contendo dados com a seguinte estrutura:

  ```json
  {
    "id": 18,
    "name": "Notícias"
  }
  ```

- Deve conter uma tabela chamada `posts_categories` com o model `PostCategory`, contendo dados com a seguinte estrutura:

  ```json
  {
    "postId": 50,
    "categoryId": 11
  }
  ```

- Deve conter uma tabela chamada `blog_posts` com o model `BlogPost`, contendo dados com a seguinte estrutura:

  ```json
  {
    "id": 21,
    "title": "Últimas atualizações, Agosto 1",
    "content": "Todo text do post do blog deverá estar aqui",
    "userId": 14, // esse é o id que referência usuário que é o autor do post
    "published": "2022-09-28T19:58:00.000Z",
    "updated": "2022-09-28T19:58:51.947Z",
  }
  ```
  
  **Os dados acima são fictícios, e estão aqui apenas como exemplo**

---

### Execução de testes unitários

Tenha em mente que o banco de dados utilizado pode ser tanto um _Baas_ ou um servidor hospedado na sua máquina. Esse repositório vem com um arquivo `docker-compose.yml` para facilitar o setup de banco de dados, caso utilize banco de dados com **docker** execute o seguinte comando para iniciar o serviço:

```sh
docker-compose up -d
```

Fique atento às credenciais de conexão do banco, checando no arquivo `.env` e siga o formato aprensetado anteriormente

Nesse repositório estaremos usando o [vitest](https://vitest.dev/) para executar os testes, use o comando a seguir para executar todos os testes:

```sh
npm test
```

Caso queria executar só um arquivo de test use o seguinte comando, considerado que quer testar o arquivo `tests/req07-createPost.spec.ts`:

```sh
npm test -- tests/req07-createPost.spec.js
```

---

## Lista de Requisitos:

### 1 - Sua aplicação deve ter o endpoint POST `/user`

#### Os seguintes pontos serão avaliados:

- O endpoint deve ser capaz de adicionar um novo user a sua tabela no banco de dados;

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "displayName": "Ada Lovelace",
    "email": "ada@lovelace.com",
    "password": "123456",
    "image": "https://avatars.dicebear.com/api/adventurer/ada%20lovelace.svg"
  }
  ```
- O campo `displayName` deverá ser uma string com no mínimo de 8 caracteres;

- O campo `email` será considerado válido se tiver o formato `<prefixo>@<domínio>` e se for único. Ele é obrigatório.

- A senha deverá conter 6 caracteres. Ela é obrigatória.

- Caso exista uma pessoa com o mesmo email na base, deve-se retornar o seguinte erro:

  ```json
  {
    "message": "User already registered"
  }
  ```

- Caso contrário, retornar a mesma resposta do endpoint de `/login`, um token `JWT`:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```
  _O token anterior é fictício_

### Além disso, as seguintes verificações serão feitas:

- **[Será validado que é possível cadastrar um usuário com sucesso]**
  * Se o usuário for criado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`

- **[Será validado que não é possível cadastrar usuário com o campo `displayName` menor que 8 caracteres]**
  * Se o usuário tiver o campo "displayName" menor que 8 caracteres o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`

- **[Será validado que não é possível cadastrar usuário com o campo `email` com formato `email: rubinho`]**
  * Se o usuário tiver o campo "email" com o formato `email: rubinho` o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`

- **[Será validado que não é possível cadastrar usuário com o campo `email` com formato `email: @gmail.com`]**
  * Se o usuário tiver o campo "email" com o formato `email: @gmail.com` o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`

- **[Será validado que o campo `email` é obrigatório]**
  * Se o usuário não tiver campo "email" o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`

- **[Será validado que não é possível cadastrar usuário com o campo `password` menor que 6 caracteres]**
  * Se o usuário tiver o campo "password" menor que 6 caracteres o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`

- **[Será validado que o campo `password` é obrigatório]**
  * Se o usuário não tiver campo "password" o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`

- **[Validar que não é possível cadastrar um usuário com email já existente]**
  * Se o usuário cadastrar o campo "email" com um email que já existe, o resultado retornado deverá ser conforme exibido abaixo, com um status http `409`

### 2 - Sua aplicação deve ter o endpoint POST `/login`

#### Os seguintes pontos serão avaliados:

- O corpo da requisição deverá seguir o formato abaixo:

  ```json
  {
    "email": "email@mail.com",
    "password": "123456"
  }
  ```

- Caso algum desses campos seja inválido ou não exista um usuário correspondente no banco de dados, retorne um código de status 400 com o corpo `{ message: "Campos inválidos" }`.

- Caso esteja tudo certo com o login, a resposta deve ser um token `JWT`, no seguinte formato:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```
  _O token anterior é fictício_

### Além disso, as seguintes verificações serão feitas:

- **[Será validado que é possível fazer login com sucesso]**
  * Se o login foi feito com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`

- **[Será validado que não é possível fazer login sem o campo `email`]**
  * Se o login não tiver o campo "email" o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`

- **[Será validado que não é possível fazer login sem o campo `password`]**
  * Se o login não tiver o campo "password" o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`

- **[Será validado que não é possível fazer login com o campo `email` em branco]**
  * Se o login tiver o campo "email" em branco o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`

- **[Será validado que não é possível fazer login com o campo `password` em branco]**
  * Se o login tiver o campo "password" em branco o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`

- **[Será validado que não é possível fazer login com um usuário que não existe]**
  * Se o login for com usuário inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`

### 3 - Sua aplicação deve ter o endpoint GET `/user`

#### Os seguintes pontos serão avaliados:

- Deve listar todos os **Users** e retorná-los na seguinte estrutura:

  ```json
  [
    {
      "id": 1,
      "displayName": "Ada Lovelace",
      "email": "ada@lovelace.com",
      "image": "https://avatars.dicebear.com/api/adventurer/ada%20lovelace.svg"
    }
  ]
  ```

- A requisição deve ter token de autenticação nos headers e, caso contrário, retorne um código de `status 401`.

### Além disso, as seguintes verificações serão feitas:

- **[Será validado que é possível listar todos os usuários]**
  * Ao listar usuários com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`

- **[Será validado que não é possível listar usuários sem o token na requisição]**
  * Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

- **[Será validado que não é possível listar usuários com o token inválido]**
  * Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

### 4 - Sua aplicação deve ter o endpoint GET `/user/:id`

#### Os seguintes pontos serão avaliados:

- Retorna os detalhes do usuário baseado no `id` da rota. Os dados devem ter o seguinte formato:

  ```json
  {
    "id": 1,
    "displayName": "Ada Lovelace",
    "email": "ada@lovelace.com",
    "password": "123456",
    "image": "https://avatars.dicebear.com/api/adventurer/ada%20lovelace.svg"
  }
  ```

- A requisição deve ter token de autenticação nos headers e, caso contrário, retorne um código de `status 401`.

### Além disso, as seguintes verificações serão feitas:

- **[Será validado que é possível listar um usuario específico com sucesso]**
  * Ao listar um usuário com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`

- **[Será validado que não é possível listar um usuário inexistente]**

  * Se o usuário for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`

- **[Será validado que não é possível listar um determinado usuário sem o token na requisição]**
  * Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

- **[Será validado que não é possível listar um determinado usuário com o token inválido]**
  * Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

### 5 - Sua aplicação deve ter o endpoint POST `/categories`

#### Os seguintes pontos serão avaliados:

- Esse endpoint deve receber uma _Categoria_ no corpo da requisição e criá-la no banco. O corpo da requisição deve ter a seguinte estrutura:

 ```json
  {
    "name": "Inovação"
  }
  ```

- Caso a Categoria não contenha o `name` a API deve retornar um erro de `status 400`.

- A requisição deve ter o token de autenticação nos headers e, caso contrário, retorne um código de `status 401`.

### Além disso, as seguintes verificações serão feitas:

- **[Será validado que é possível cadastrar uma categoria com sucesso]**
  * Se cadastrar uma categoria com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`

- **[Será validado que não é possível cadastrar uma categoria sem o campo name]**
  * Se ao tentar cadastrar uma categoria sem o campo name o resultado retornado deverá ser conformo exibido abaixo, com um status http `400`

- **[Será validado que não é possível cadastrar uma determinada categoria com o token inválido]**
  * Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

- **[Será validado que não é possível cadastrar uma determinada categoria sem o token na requisição]**
  * Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

### 6 - Sua aplicação deve ter o endpoint GET `/categories`

#### Os seguintes pontos serão avaliados:

- Esse endpoint deve listar todas as Categorias e retorná-las na seguinte estrutura:

```json
[
  {
    "id": 1,
    "name": "Escola"
  },
  {
    "id": 2,
    "name": "Inovação"
  }
]
```

Além disso, as seguintes verificações serão feitas:
- **[Será validado que é possível listar todas as categoria com sucesso]**
  * Se buscar todas as categorias com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`


- **[Será validado que não é possível listar as categorias com o token inválido]**
  * Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

- **[Será validado que não é possível cadastrar uma determinada categoria sem o token na requisição]**
  * Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`


### 7 - Sua aplicação deve ter o endpoint POST `/post`

#### Os seguintes pontos serão avaliados:

- Esse endpoint deve receber um _BlogPost_ no corpo da requisição e criá-lo no banco. O corpo da requisição deve ter a seguinte estrutura:

  ```json
  {
    "title": "Últimas atualizações, Agosto 1",
    "content": "Todo text do post do blog deverá estar aqui",
    "categoryIds": [1, 2]
  }
  ```

- Caso o post não contenha o `title`, `content` ou `categoryIds` a API deve retornar um erro de `status 400`.

- A requisição deve ter o token de autenticação nos headers e, caso contrário, retorne um código de `status 401`.

### Além disso, as seguintes verificações serão feitas:

- **[Será validado que é possível cadastrar um blogpost com sucesso]**
  * Se cadastrar um blogpost com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`

- **[Será validado que não é possível cadastrar um blogpost sem o campo `title`]**
  * Se não conter o campo `title` o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`

- **[Será validado que não é possível cadastrar um blogpost sem o campo `content`]**
  * Se não conter o campo `content` o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`

- **[Será validado que não é possível cadastrar um blogpost sem o campo `categoryIds`]**
  * Se não conter o campo `categoryIds` o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`

- **[Será validado que não é possível cadastrar um blogpost com uma `categoryIds` inexistente]**
  * Se o campo `categoryIds` tiver uma categoria inexistente, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`

- **[Será validado que não é possível cadastrar um blogpost sem o token]**
  * Se não conter o token o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

- **[Será validado que não é possível cadastrar um blogpost com o token inválido]**
  * Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

### 8 - Sua aplicação deve ter o endpoint GET `/post`

#### Os seguintes pontos serão avaliados:

- Esse endpoint deve listar todos os _BlogPosts_ e retorná-los na seguinte estrutura:

```json
[
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Ada Lovelace",
      "email": "ada@lovelace.com",
      "image": "https://avatars.dicebear.com/api/adventurer/ada%20lovelace.svg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      }
    ]
  }
]
```

### Além disso, as seguintes verificações serão feitas:

- **[Será validado que é possível listar blogpost com sucesso]**
  * Se listar os blogpost com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`

- **[Será validado que não é possível listar blogpost sem token]**
  * Se não conter o token o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

- **[Será validado que não é possível listar blogpost com token inválido]**
  * Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

### 9 - Sua aplicação deve ter o endpoint GET `post/:id`

#### Os seguintes pontos serão avaliados:

- Retorna um **BlogPost** com o `id` especificado. O retorno deve ter os seguinte formato:

```json
  {
  "id": 1,
  "title": "Post do Ano",
  "content": "Melhor post do ano",
  "userId": 1,
  "published": "2011-08-01T19:58:00.000Z",
  "updated": "2011-08-01T19:58:51.000Z",
  "user": {
    "id": 1,
    "displayName": "Ada Lovelace",
    "email": "ada@lovelace.com",
    "password": "123456",
    "image": "https://avatars.dicebear.com/api/adventurer/ada%20lovelace.svg"
  },
  "categories": [
    {
      "id": 1,
      "name": "Inovação"
    }
  ]
}
```

### Além disso, as seguintes verificações serão feitas:

- **[Será validado que é possível listar um blogpost com sucesso]**
  * Se listar um blogpost com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`

- **[Será validado que não é possível listar um blogpost sem token]**
  * Se não conter o token o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

- **[Será validado que não é possível listar um blogpost com token inválido]**
  * Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

- **[Será validado que não é possível listar um blogpost inexistente]**
  * Se o id do post for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`

- **[Será validado que não é possível listar um blogpost com formato inválido]**
  * Se o id do post for um formato inválido (Ex: `/post/invalido`) o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`

### 10 - Sua aplicação deve ter o endpoint PUT `/post/:id`

#### Os seguintes pontos serão avaliados:

- O endpoint deve receber um **BlogPost** que irá sobrescrever o original com o `id` especificado na URL. Só deve ser permitido para o usuário que criou o **BlogPost**.

- A(s) categoria(s) do post **não** podem ser editadas, somente o `title` e `content`.

- O corpo da requisição deve ter a seguinte estrutura:

  ```json
  {
    "title": "Últimas atualizações, Agosto 1",
    "content": "Todo text do post do blog deverá estar aqui"
  }
  ```

- Caso uma pessoa diferente de quem criou faça a requisição, deve retornar um código `status 401`.

- Caso uma requisição sem token seja recebida, deve-se retornar um código de `status 401`.

- Caso o post não contenha o `title` e/ou o `content` a API deve retornar um erro de `status 400`.

### Além disso, as seguintes verificações serão feitas:

- **[Será validado que é possível editar um blogpost com sucesso]**
  * Se editar um blogpost com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`

- **[Será validado que não é possível editar as categorias de um blogpost]**
  * Só será possível editar o título ou o conteúdo de um post.

- **[Será validado que não é possível editar um blogpost com outro usuário]**
  * Somente o usuário que criou o post poderá edita-lo.

- **[Será validado que não possível editar um blogpost sem token]**
  * Se não conter o token o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

- **[Será validado que não possível editar um blogpost com token inválido]**
  * Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

- **[Será validado que não possível editar um blogpost sem o campo `title`]**
  * Se não conter o campo `title` o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`

- **[Será validado que não possível editar um blogpost sem o campo `content`]**
  * Se não conter o campo `content` o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`

## Requisitos Bônus

### 11 - Sua aplicação deve ter o endpoint DELETE `post/:id`

#### Os seguintes pontos serão avaliados:

- Deleta o post com o `id` especificado. Só deve ser permitido para o usuário que criou o **BlogPost**.

- Caso uma pessoa diferente de quem criou faça a requisição, deve retornar um código `status 401`.

- Caso uma requisição sem token seja recebida, deve-se retornar um código de `status 401`.

- Caso o post referido não exista, deve-se retornar um código de `status 404`.

### Além disso, as seguintes verificações serão feitas:

- **[Será validado que é possível deletar um blogpost com sucesso]**
  * Se deletar blogpost com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `204`

- **[Será validado que não é possível deletar um blogpost com outro usuário]**
  * Se não for o dono do blogpost o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

- **[Será validado que não é possível deletar um blogpost inexistente]**
  * Se o blogpost nao existir o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`

- **[Será validado que não é possível deletar um blogpost sem o token]**
  * Se não contém o token o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

- **[Será validado que não é possível deletar um blogpost com o token inválido]**
  * Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

### 12 - Sua aplicação deve ter o endpoint DELETE `/user/me`

#### Os seguintes pontos serão avaliados:

- Utilizando o token de autenticação nos headers, o usuário correspondente deve ser apagado.

### Além disso, as seguintes verificações serão feitas:

- **[Será validado que é possível excluir meu usuário com sucesso]**
  * Ao deletar um usuário com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `204`

- **[Será validado que não é possivel excluir meu usuário com token inválido]**
  * Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

- **[Será validado que não é possivel excluir meu usuário sem o token]**
  * Se não conter o token o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

### 13 - Sua aplicação deve ter o endpoint GET `post/search?q=:searchTerm`

#### Os seguintes pontos serão avaliados:

- Retorna uma array de **BlogPosts** que contenham em seu título, ou conteúdo, o termo pesquisado no `queryParam` da URL. O retorno deve ter o seguinte formato:

```json
[
  {
    "id": 2,
    "title": "Vamos que vamos",
    "content": "Foguete não tem ré",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Ada Lovelace",
      "email": "ada@lovelace.com",
      "password": "123456",
      "image": "https://avatars.dicebear.com/api/adventurer/ada%20lovelace.svg"
    },
    "categories": [
      {
        "id": 2,
        "name": "Escola"
      }
    ]
  }
]
  ```

- Caso nenhum **BlogPost** satisfaça a busca, retorne um array vazio.

### Além disso, as seguintes verificações serão feitas:

- **[Será validado que é possível buscar um blogpost pelo `title`]**
  * Se a buscar for pelo `title` o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`

- **[Será validado que é possível buscar um blogpost pelo `content`]**
  * Se a buscar for pelo `content` o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`

- **[Será validado que é possível buscar todos os blogpost quando passa a busca vazia']**
  * Se a buscar for vazia o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`

- **[Será validado que é possível buscar um blogpost inexistente e retornar array vazio]**
  * Se a buscar um post inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`

- **[Será validado que não é possível buscar um blogpost sem o token]**
  * Se não contém o token o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

- **[Será validado que não é possível buscar um blogpost com o token inválido]**
  * Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`

--- 

# Avisos Finais

O avaliador automático não necessariamente avalia seu projeto na ordem em que os requisitos aparecem no readme. Isso acontece para deixar o processo de avaliação mais rápido. Então, não se assuste se isso acontecer, ok?
