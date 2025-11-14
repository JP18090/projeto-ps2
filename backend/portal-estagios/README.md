# README.md

# Portal Estágios

Este projeto é uma aplicação Java desenvolvida com Spring Boot, destinada a gerenciar estágios e oportunidades de emprego para estudantes. A aplicação permite que empresas publiquem vagas e que estudantes se inscrevam nelas.

## Estrutura do Projeto

O projeto é organizado da seguinte forma:

```
src
└── main
    ├── java
    │   └── br
    │       └── com
    │           └── portalestagios
    │               ├── PortalEstagiosApplication.java
    │               ├── controller
    │               │   ├── AreaOfInterestController.java
    │               │   └── UserController.java
    │               ├── entity
    │               │   ├── AreaOfInterest.java
    │               │   ├── Company.java
    │               │   ├── JobOffer.java
    │               │   └── Usuario.java
    │               ├── repository
    │               │   ├── AreaOfInterestRepository.java
    │               │   ├── CompanyRepository.java
    │               │   ├── JobOfferRepository.java
    │               │   └── UsuarioRepository.java
    │               ├── dao
    │               │   ├── AreaOfInterestDAO.java
    │               │   ├── CompanyDAO.java
    │               │   ├── JobOfferDAO.java
    │               │   └── UserDAO.java
    │               └── service
    │                   ├── AreaOfInterestService.java
    │                   ├── JobOfferService.java
    │                   └── UserService.java
    └── resources
        └── application.properties
```

## Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até o diretório do projeto:
   ```
   cd portal-estagios
   ```

3. Compile o projeto usando Maven:
   ```
   mvn clean install
   ```

## Execução

Para executar a aplicação, utilize o seguinte comando:

```
mvn spring-boot:run
```

A aplicação estará disponível em `http://localhost:8080`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.