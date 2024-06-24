## Sobre o projeto 

- Essa é uma API para realizar check-in em academias. Gympass Style App
- Essa aplicação é uma API construída pra estudar SOLID 


## Requisitos Funcionais

- [] O usuário poderá fazer cadastro 
- [] O usuário poderá fazer autenticação
- [] Deve ser possível obter o perfil de um usuário logado
- [] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [] O usuário poderá ter um histório de check-ins
- [] O usuário poderá buscar academias próximas 
- [] O usuário poderá buscar academias pelo nome 
- [] O usuário poderá fazer check-in em uma academia
- [] Deve ser possível validar o check-in de um usuário 
- [] Deve ser possível cadastrar uma academia 


## Regras de Negócio 

- [] O usuário não deve poder se cadastrar com um e-mail duplicado 
- [] O usuário não pode fazer mais de 1 check-in no mesmo dia
- [] O usuário não poder fazer check-in se não estiver perto (100m) da academia 
- [] O check-in só pode ser validado até 20 minutos até criado
- [] O check-in só pode ser validado por administradores 
- [] A academia só pode ser cadastrada por administradores 

## Requisitos Não Funcionais 

- [] A senha do uusário precisa estar criptografada
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL 
- [] Todas as lista de dados precisam estar paginadas com 20 itens por página 
- [] O usuário deve ser identificado por um JWT (JSON Web Token)
