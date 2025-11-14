# 🎓 Portal de Estágios – Projeto Final de Linguagem de Programação II

O **Portal de Estágios** é uma plataforma web completa que conecta **estudantes**, **empresas** e **administradores**, oferecendo um ambiente moderno para cadastro, busca, gerenciamento e candidatura em vagas de estágio.

A aplicação é composta por:

- ✅ **Backend RESTful** em Java • Spring Boot  
- ✅ **Frontend SPA** em React  
- ✅ **Banco de dados H2** (desenvolvimento)  
- ✅ **Integração completa + Fluxo de autenticação + Painéis personalizados**

---

## 📘 Sumário

- 🎯 Objetivo do Projeto  
- 👥 Perfis de Usuário  
- ⚙️ Requisitos Funcionais  
- 🧩 Tecnologias Utilizadas  
- 💻 Arquitetura da Solução  
- 🌐 Execução e Instalação  
- 🧠 Funcionalidades Inovadoras  
- 📈 Dashboard e Estatísticas  
- 🗃️ Estrutura do Banco de Dados  
- 🔒 Segurança e Criptografia  
- 🛠️ Features Implementadas Recentemente  
- 🧑‍💻 Equipe de Desenvolvimento  

---

## 🎯 Objetivo do Projeto

O Portal de Estágios foi desenvolvido para **simplificar a conexão entre empresas que ofertam vagas de estágio e estudantes** que buscam suas primeiras experiências profissionais.

Entre os objetivos estão:

- Facilitar inscrição em vagas  
- Automatizar criação/gerenciamento de vagas pelas empresas  
- Fornecer dashboards personalizados para cada usuário  
- Criar um ambiente centralizado, simples e seguro  

---

## 👥 Perfis de Usuário

| Perfil | Descrição | Permissões |
|-------|-----------|------------|
| **Administrador** | Gerencia o portal. | CRUD completo de entidades + estatísticas + áreas de interesse |
| **Empresa** | Publica vagas e gerencia candidatos. | CRUD de vagas, encerrar vagas, dashboard |
| **Estudante** | Busca vagas e realiza inscrições. | CRUD de perfil, candidaturas, currículo PDF |

---

## ⚙️ Requisitos Funcionais

### 1. Autenticação e Cadastro  
- Login separado para **estudantes**, **empresas** e **administradores**  
- Senhas criptografadas com **BCrypt**  
- Auto-login após cadastro  

### 2. Áreas de Interesse (Admin)  
- CRUD completo  
- Disponível para estudantes e empresas selecionarem no cadastro  

### 3. Empresas  
- Cadastro com: nome, CNPJ, e-mail, telefone, endereço, áreas de atuação  
- Criar/editar/encerrar vagas  

### 4. Estudantes  
- Cadastro com: nome, CPF, curso, telefone, e-mail, áreas de interesse  

### 5. Vagas  
- Criadas apenas por empresas  
- Campos: título, descrição, área, modalidade, requisitos, carga horária  
- Listagem pública sem login  
- Filtros por área e modalidade  

### 6. Inscrições  
- Estudante se inscreve em qualquer vaga aberta  
- Evita duplicidade (check backend)  

### 7. Painéis  
- **Estudante**: aplicações, vagas relacionadas, currículo PDF  
- **Empresa**: lista de vagas, candidatos, status  
- **Admin**: estatísticas gerais  

### 8. Encerramento de Vagas  
- Empresas encerram vagas → bloqueia novas inscrições  

---

## 🧩 Tecnologias Utilizadas

### Backend (Java)
- Java 11  
- Spring Boot 3.5  
- Spring Data JPA  
- H2 Database (desenvolvimento)  
- Swagger / OpenAPI  
- Lombok  
- BCrypt Password Encoder  
- Maven  

### Frontend (React)
- React 19.2  
- React Router  
- jsPDF (PDF do currículo)  
- Context API (Auth)  
- Fetch API / Axios  
- CSS modular  
- Vite / CRA (compatível)  

---

## 💻 Arquitetura da Solução – Backend

```
src
└── main
    ├── java
    │   └── br
    │       └── com
    │           └── portalestagios
    │               ├── config
    |               │   ├── CorsConfig.java
    │               │   ├── DataLoader.java
    │               │   └── SegurityConfig.java
    │               ├── controller
    │               │   ├── AreaInteresseController.java
    │               │   ├── AuthController.java
    │               │   ├── CurriculoController.java
    │               │   ├── EmpresaController.java
    │               │   ├── EstudanteController.java
    │               │   ├── InscriçãoController.java
    │               │   ├── RegisterController.java
    │               │   ├── UsuarioController.java
    │               │   └── VagaController.java
    │               ├── dao
    │               │   ├── AreaInteresseDao.java
    │               │   ├── EmpresaDao.java
    │               │   ├── EstudanteDao.java
    │               │   ├── InscricaoDao.java
    │               │   ├── UsuarioDao.java
    │               │   └── VagaDao.java
    │               ├── dto
    │               │   ├── IncricaoRequest.java
    │               │   ├── IncricaoResponse.java
    │               │   ├── LoginResponse.java
    │               │   ├── RegisterEmpresaRequest.java
    │               │   ├── RegisterEstudanteRequest.java
    │               │   └── VagaCreateRequest.java
    │               ├── entity
    │               │   ├── AreaInteresse.java
    │               │   ├── Empresa.java
    │               │   ├── Estudante.java
    │               │   ├── Inscricao.java
    │               │   ├── Usuario.java
    │               │   └── Vaga.java
    │               ├── repository
    │               │   ├── AreaInteresseRepository.java
    │               │   ├── EmpresaRepository.java
    │               │   ├── EstudanteRepository.java
    │               │   ├── IncricaoRepository.java
    │               │   ├── UsuarioRepository.java
    │               │   └── VagaRepository.java
    │               ├── service
    │               |   ├── AreaInteresseService.java
    │               |   ├── CurriculoService.java
    │               |   ├── EmpresaService.java
    │               |   ├── EstudanteService.java
    │               |   ├── InscricaoService.java
    │               |   ├── RegisterService.java
    │               |   ├── UsuarioService.java
    │               |   └── VagaService.java
    │               ├── PortalEstagiosApplication.java
    └── resources
          ├── application-local.properties
          ├── application.properties
          └── data.sql
```

**Destaques importantes:**

- API documentada em `/swagger-ui.html`  
- Criptografia de senhas com BCrypt  
- DAO + Repository  
- DTOs para cadastro, login, criação de vaga, candidatura  
- IDs iniciando em **100** para evitar conflitos ao reiniciar H2  

---

## 🌐 Arquitetura do Frontend

```
frontend/
└── src
   ├── pages
   ├── components
   ├── contexts
   ├── api
   └── assets

```

### Páginas principais:
- `/login-estudante`  
- `/login-empresa`  
- `/cadastro-estudante`  
- `/cadastro-empresa`  
- `/painel-estudante`  
- `/painel-empresa`  
- `/vagas` (lista pública)  
- `/vaga/:id` (detalhes)

### Componentes importantes:
- `VagaCard`  
- `Header`  
- `Footer`  
- `ProtectedRoute`  
- `AuthProvider`  

---

## 🌐 Instalação e Execução

### Backend

1. Clonar repositório
```bash
git clone https://github.com/Danibart54/Projeto-Ps2

```
2. Entrar no backend
```bash
cd portal-estagios/backend/portal-estagios

```

3. Compilar
```bash
mvn clean install

```

4. Executar
```bash
mvn spring-boot:run

```

### API disponível em:

- http://localhost:8080
- H2 Console: /h2-console

### Frontend

2. Entrar no Frontend
```bash
cd frontend

```
2. Instalar dependências
```bash
npm install

```

3. Rodar
```bash
npm start
```

### Frontend disponível em:

- http://localhost:5000
- Proxy automático → backend localhost:8080

## 🔒 Segurança e Criptografia
---

### Backend PasswordEncoder

```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```
- Todas as senhas são hashes BCrypt
- Login compara hash usando ```passwordEncoder.matches()```

# 🛠️ Features Recentemente Implementadas

## Sessão 1
- 10 vagas abertas inseridas automaticamente
- Implementação de lista pública de vagas

## Sessão 2
- Sistema completo de inscrições
- Dashboard estudantil com candidaturas
- PDF automático de currículo
- Cadastro completo com validação de senha
- Registro de empresas e estudantes
- Auto-login pós-cadastro

## Sessão 3
- Fluxo completo revisado

## Sessão 4
- DTOs de cadastro
- `RegisterService` com transação atômica
- IDs autoincrement reiniciando em 100
- Novo `LoginResponse` (`usuarioId`, `estudanteId`, `empresaId`)
- Criar vaga via DTO com área e empresa válidas
- Dashboard empresa finalizado

# 🧠 Funcionalidades Inovadoras
## Geração Automática de Currículo PDF
- Feito via jsPDF
- Inclui:
  - Dados pessoais
  - Áreas de interesse
  - Histórico de candidaturas
  - Layout limpo e profissional
- Baixa automaticamente no navegador

## Sistema Futuro (planejado)
- Simulador de entrevista com pontuação
- Envio de e-mails automáticos
- Chatbot para alunos (IA opcional)

# 🗃️ Banco de Dados
- H2 em modo Postgres
- Recriado a cada execução
- Arquivo `data.sql` carrega:
  - Áreas de interesse
  - Empresas e estudantes mock
  - 10 vagas iniciais
  - IDs iniciando em 100

## 🧑‍💻 Equipe de Desenvolvimento

- Dev Backend - José Pedro (https://github.com/JP18090)
- Dev Frontend - Daniel Bartels (https://github.com/Danibart54)
