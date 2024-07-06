## Sobre o projeto 

- Essa é uma API para realizar check-in em academias. Gympass Style App
- Essa aplicação é uma API construída pra estudar desenvolvimento back-end com TypeScript seguindo alguns conceitos de SOLID, Design Patterns, e Docker. 

## Ferramentas

- NodeJs
- TypeScript
- Zod
- Fastify 
- Prisma
- Docker
- EsLint
- Vitest
- BCryptJS
- Supertest


## Requisitos Funcionais

- [x] O usuário poderá fazer cadastro 
- [x] O usuário poderá fazer autenticação
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [x] O usuário poderá ter um histório de check-ins
- [x] O usuário poderá buscar academias próximas (até 10km)
- [x] O usuário poderá buscar academias pelo nome 
- [x] O usuário poderá fazer check-in em uma academia
- [x] Deve ser possível validar o check-in de um usuário 
- [x] Deve ser possível cadastrar uma academia 


## Regras de Negócio 

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado 
- [x] O usuário não pode fazer mais de 1 check-in no mesmo dia
- [x] O usuário não poder fazer check-in se não estiver perto (100m) da academia 
- [x] O check-in só pode ser validado até 20 minutos até criado
- [x] O check-in só pode ser validado por administradores 
- [x] A academia só pode ser cadastrada por administradores 

## Requisitos Não Funcionais 

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL 
- [x] Todas as lista de dados precisam estar paginadas com 20 itens por página 
- [x] O usuário deve ser identificado por um JWT (JSON Web Token)


## Minha experiência com esse projeto 

Foi uma tarefa desafiadora lidar com a construção de uma aplicação com tantas camadas e funcionalidades diferentes.

O aprendizado com esse projeto foi imenso. Dentre os conhecimentos que adquiri, destacam-se: 
    - Como desenvolver a arquitetura de uma aplicação com muitas camadas
    - Como configurar o banco de dados PostgreSQL com Prisma Client e Docker 
