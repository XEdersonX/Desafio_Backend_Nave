# Desafio Backend Nave

![64443730_2461085627264073_2093662059899125760_n](https://user-images.githubusercontent.com/9820600/82946861-7a4bcf00-9f75-11ea-8fd3-611a40669043.png)


## Instalando a aplicação

Primeiro, Clone o repositório.

Depois, navegue até a pasta raíz do projeto e instale as dependências através do Yarn:

	  yarn

Logo após, inicie o servidor através do comando:

    yarn dev:server

Pronto!

**Rota Usuário**
----

| Método HTTP | URL                                                      | Recurso                                                            |
| ----------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| GET         | /users    							         | Lista todos os usuários.        |
| POST        | /users 			                     | Cadastrar um usuário.           |
| PUT         | /users/:id                       | Editar um usuário pelo seu ID.  |
| DELETE      | /users/:id                       | Deletar um usuário pelo seu ID. |


Exemplo de request de usuário:
```
    {
	    "name": "Ederson Luís",
	    "email": "edergp2012@gmail.com",
	    "password": "123456"
    }
```

Exemplo de response de usuário:
```
    {
      "name": "Ederson Luís",
      "email": "edergp2012@gmail.com",
      "id": "5c0cf6ad-b8eb-419f-b70a-707158277b2b",
      "created_at": "2020-05-26T21:06:46.266Z",
      "updated_at": "2020-05-26T21:06:46.266Z"
    }
```

**Rota Session**
----

 Está rota controla os acessos dos usuários, atravé de um Token gerado. Rotas que precisam do token gerado desta rota para funcionar são:

  * Rota Vagas: Precisa do token nos metodos HTTP (POST, PUT, DELETE).
  * Rota Comentários: Precisa do token nos metodos HTTP (GET, POST, PUT, DELETE).


| Método HTTP | URL                                                      | Recurso                                                            |
| ----------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| POST        | /sessions 			                     | Responsavel por criar o TOKEN de Authenticação.     |


Exemplo de request da session:
```
    {
	    "email": "edergp2009@gmail.com",
	    "password": "123456"
    }
```

Exemplo de response da session:
```
    {
      "user": {
        "id": "548db5f6-8e39-419f-a780-5dcf18089445",
        "name": "Ederson",
        "email": "edergp2009@gmail.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTA1MjM1NTYsImV4cCI6MTU5MDYwOTk1Niwic3ViIjoiNTQ4ZGI1ZjYtOGUzOS00MTlmLWE3ODAtNWRjZjE4MDg5NDQ1In0.SepmUD7M5gBUOPE4hdbh0A_mpBV4TeJikLPIQxcanrM"
    }
```

**Rota Candidato**
----

| Método HTTP | URL                                                      | Recurso                                                            |
| ----------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| GET         | /candidate    							         | Lista todos os candidatos.        |
| POST        | /candidate 			                     | Cadastrar um candidato.           |
| PUT         | /candidate/:id                       | Editar um candidato pelo seu ID.  |
| DELETE      | /candidate/:id                       | Deletar um candidato pelo seu ID. |


Exemplo de request de candidato:
```
    {
	    "name": "Felipe Silva",
	    "email": "felipe@gmail.com",
	    "fone": "5332903297",
	    "cpf": "03888392090"
    }
```

Exemplo de response de candidato:
```
    {
      "name": "Felipe Silva",
      "email": "felipe@gmail.com",
      "fone": "5332903297",
      "cpf": "03888392090",
      "id": "9b2e987c-8625-4e63-8e4b-0ece7bc61afb",
      "created_at": "2020-05-26T21:53:40.034Z",
      "updated_at": "2020-05-26T21:53:40.034Z"
    }
```

**Rota Vaga**
----
Precisa do token de authenticação gerado pela rota de session nos metodos HTTP (POST, PUT, DELETE).

| Método HTTP | URL                                                      | Recurso                                                            |
| ----------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| GET         | /vacancies    							         | Lista todos os vagas.        |
| POST        | /vacancies 			                     | Cadastrar uma vaga.           |
| PUT         | /vacancies/:id                       | Editar uma vaga pelo seu ID.  |
| DELETE      | /vacancies/:id                       | Deletar uma vaga pelo seu ID. |


Exemplo de request de vaga:
```
    {
	    "title": "Backend",
	    "description": "Node e Postgresql"
    }
```

Exemplo de response de vaga:
```
    {
      "title": "Backend",
      "description": "Node e Postgresql",
      "id": "90152a56-fd95-49fe-a0d9-1486889fd1ee",
      "created_at": "2020-05-26T22:00:20.192Z",
      "updated_at": "2020-05-26T22:00:20.192Z"
    }
```

**Rota Candidatura**
----

| Método HTTP | URL                                                      | Recurso                                                            |
| ----------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| GET         | /applications    							          | Lista todas as candidaturas.        |
| POST        | /applications 			                    | Cadastrar uma candidatura.           |
| DELETE      | /applications/:id                       | Deletar uma candidatura pelo seu ID. |


Exemplo de request de candidatura:
```
    {
	    "id_candidate": "9b2e987c-8625-4e63-8e4b-0ece7bc61afb",
	    "id_vacancies": "90152a56-fd95-49fe-a0d9-1486889fd1ee"
    }
```

Exemplo de response de candidatura:
```
  {
    "id": "ce676192-c896-4f83-801a-5289a8718a49",
    "id_candidate": "9b2e987c-8625-4e63-8e4b-0ece7bc61afb",
    "id_vacancies": "90152a56-fd95-49fe-a0d9-1486889fd1ee",
    "created_at": "2020-05-26T22:10:48.699Z",
    "updated_at": "2020-05-26T22:10:48.699Z",
    "candidate": {
      "id": "9b2e987c-8625-4e63-8e4b-0ece7bc61afb",
      "name": "Felipe Silva",
      "email": "felipe@gmail.com",
      "fone": "5332903297",
      "cpf": "03888392090",
      "created_at": "2020-05-26T21:53:40.034Z",
      "updated_at": "2020-05-26T21:53:40.034Z"
    },
    "vacancies": {
      "id": "90152a56-fd95-49fe-a0d9-1486889fd1ee",
      "title": "Backend",
      "description": "Node e Postgresql",
      "created_at": "2020-05-26T22:00:20.192Z",
      "updated_at": "2020-05-26T22:00:20.192Z"
    }
  }
```

**Rota Comentários das Candidaturas**
----
Precisa do token de authenticação gerado pela rota de session nos metodos HTTP (GET, POST, PUT, DELETE).

| Método HTTP | URL                                                      | Recurso                                                            |
| ----------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| GET         | /commentsApplications/:id    							          | Lista todos os comentários da candidatura.Tem que passar o ID da candidatura.        |
| POST        | /commentsApplications 			                    | Cadastrar um comentários para candidatura.|
| PUT         | /commentsApplications/:id                       | Editar um comentários da candidatura pelo eu ID.      |
| DELETE      | /commentsApplications/:id                       | Deletar um comentários da candidatura pelo seu ID. |


Exemplo de request do comentários da candidatura:
```
    {
      "id_application": "ce676192-c896-4f83-801a-5289a8718a49",
      "description": "Aprovado no teste",
      "id_user": "548db5f6-8e39-419f-a780-5dcf18089445"
    }
```

Exemplo de response do comentários da candidatura:
```
  {
    "id": "69ab6b54-f1e5-4758-9e02-20c83bbd290a",
    "id_application": "ce676192-c896-4f83-801a-5289a8718a49",
    "description": "Aprovado no teste",
    "id_user": "548db5f6-8e39-419f-a780-5dcf18089445",
    "created_at": "2020-05-26T22:36:20.690Z",
    "updated_at": "2020-05-26T22:36:20.690Z",
    "aplication": {
      "id": "ce676192-c896-4f83-801a-5289a8718a49",
      "id_candidate": "9b2e987c-8625-4e63-8e4b-0ece7bc61afb",
      "id_vacancies": "90152a56-fd95-49fe-a0d9-1486889fd1ee",
      "created_at": "2020-05-26T22:10:48.699Z",
      "updated_at": "2020-05-26T22:10:48.699Z",
      "candidate": {
        "id": "9b2e987c-8625-4e63-8e4b-0ece7bc61afb",
        "name": "Felipe Silva",
        "email": "felipe@gmail.com",
        "fone": "5332903297",
        "cpf": "03888392090",
        "created_at": "2020-05-26T21:53:40.034Z",
        "updated_at": "2020-05-26T21:53:40.034Z"
      },
      "vacancies": {
        "id": "90152a56-fd95-49fe-a0d9-1486889fd1ee",
        "title": "Backend",
        "description": "Node e Postgresql",
        "created_at": "2020-05-26T22:00:20.192Z",
        "updated_at": "2020-05-26T22:00:20.192Z"
      }
    },
    "user": {
      "id": "548db5f6-8e39-419f-a780-5dcf18089445",
      "name": "Ederson",
      "email": "edergp2009@gmail.com",
      "created_at": "2020-05-25T22:49:52.789Z",
      "updated_at": "2020-05-25T22:49:52.789Z"
    }
  }
```
