# in.orbit - Backend

Este repositório contém a parte **backend** da aplicação **in.orbit**, construída com **Node.js** e utilizando **Docker** para o banco de dados. **Postman** é utilizado para testar as requisições da API, enquanto **Drizzle Studio** facilita o gerenciamento visual do banco de dados.

## Tecnologias Utilizadas

- **Node.js**
- **Fastify**
- **Drizzle ORM e Drizzle Studio**
- **Zod**
- **Docker**
- **Postman**
- **WSL (Windows Subsystem for Linux)** com **Ubuntu** para execução do Docker

## Funcionalidades

- Gerenciamento de metas dos usuários (CRUD).
- Validação de dados com **Zod**.
- Integração com o banco de dados relacional usando **Drizzle ORM**.
- Suporte a **CORS** via Fastify.
- Geração de IDs únicos com **cuid2**.
- Testes de requisições HTTP com **Postman**.

## Instalação

### 1. Instalar o Ubuntu no WSL no Windows

Caso você esteja utilizando **Windows** e deseja rodar o projeto com Docker, siga os passos abaixo para configurar o **Ubuntu no WSL**:

1. Abra o **PowerShell** como Administrador e rode o seguinte comando para habilitar o WSL:
    
    ```bash
    bash
    Copiar código
    wsl --install
    
    ```
    
2. Instale a distribuição **Ubuntu** do WSL:
    
    ```bash
    bash
    Copiar código
    wsl --install -d Ubuntu
    
    ```
    
3. Após a instalação, reinicie o computador e configure o **Ubuntu** no primeiro login.
4. Abra o **VS Code** e instale a extensão **Remote - WSL** para trabalhar diretamente com o WSL dentro do VS Code.

### 2. Instalar o Docker no Ubuntu WSL

Com o **Ubuntu WSL** instalado, você pode agora instalar o **Docker**:

1. Atualize os pacotes:
    
    ```bash
    bash
    Copiar código
    sudo apt update
    sudo apt upgrade
    
    ```
    
2. Instale as dependências para usar repositórios HTTPS:
    
    ```bash
    bash
    Copiar código
    sudo apt install apt-transport-https ca-certificates curl software-properties-common
    
    ```
    
3. Adicione a chave GPG do Docker:
    
    ```bash
    bash
    Copiar código
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
    ```
    
4. Adicione o repositório do Docker:
    
    ```bash
    bash
    Copiar código
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    ```
    
5. Instale o Docker:
    
    ```bash
    bash
    Copiar código
    sudo apt update
    sudo apt install docker-ce
    
    ```
    
6. Verifique a instalação:
    
    ```bash
    bash
    Copiar código
    sudo systemctl status docker
    
    ```
    
7. Para rodar o Docker sem precisar de `sudo`, adicione seu usuário ao grupo `docker`:
    
    ```bash
    bash
    Copiar código
    sudo usermod -aG docker $USER
    
    ```
    
8. Reinicie o terminal para aplicar as mudanças.

### 3. Clonar o Repositório

1. Clone o repositório do projeto:
    
    ```bash
    bash
    Copiar código
    git clone https://github.com/seu-usuario/in-orbit-backend.git
    cd in-orbit-backend
    
    ```
    
2. Instale as dependências do projeto:
    
    ```bash
    bash
    Copiar código
    npm install
    
    ```
    

### 4. Configurar o Banco de Dados com Docker

No arquivo `docker-compose.yml`, já incluímos a configuração do banco de dados PostgreSQL. Aqui está o conteúdo do arquivo:

```yaml
yaml
Copiar código
name: pocket-js-server

services:
  pg:
    image: bitnami/postgresql:13.16.0
    ports:
      - '5433:5432'
    environment:
      - POSTGRES_USER=docker
      - POSTGRES_PASSWORD=docker
      - POSTGRES_DB=inorbit

```

Execute o comando abaixo para subir o serviço do banco de dados com Docker:

```bash
bash
Copiar código
docker-compose up -d

```

Isso criará um container com a imagem **PostgreSQL** rodando na porta **5433** e um banco de dados com as credenciais definidas.

### 5. Executar o Servidor e Acessar a Página Principal

Para rodar o servidor de desenvolvimento e abrir a página principal:

```bash
bash
Copiar código
npm run dev

```

A página principal da API estará disponível no navegador no endereço http://localhost:3000.

### 6. Testar a API com o Postman

1. Baixe e instale o Postman.
2. Importe as coleções de requisições para testar os endpoints da API. Para isso, você pode usar a URL da API local (normalmente `http://localhost:3000`) e configurar as rotas disponíveis como **GET**, **POST**, **PUT**, e **DELETE**.
3. Faça os testes de acordo com os endpoints definidos no seu servidor Fastify.

## Dependências

### Instalar Dependências

Abaixo estão as principais dependências do projeto, com os comandos de instalação correspondentes:

| Dependência | Versão | Comando de Instalação |
| --- | --- | --- |
| `@fastify/cors` | ^9.0.1 | `npm install @fastify/cors` |
| `@paralleldrive/cuid2` | ^2.2.2 | `npm install @paralleldrive/cuid2` |
| `dayjs` | ^1.11.13 | `npm install dayjs` |
| `drizzle-orm` | ^0.33.0 | `npm install drizzle-orm` |
| `fastify` | ^4.28.1 | `npm install fastify` |
| `fastify-type-provider-zod` | ^2.0.0 | `npm install fastify-type-provider-zod` |
| `zod` | ^3.23.8 | `npm install zod` |

### Dependências de Desenvolvimento

| Dependência | Versão | Comando de Instalação |
| --- | --- | --- |
| `@biomejs/biome` | 1.9.0 | `npm install --save-dev @biomejs/biome` |
| `@types/node` | ^22.5.4 | `npm install --save-dev @types/node` |
| `drizzle-kit` | ^0.24.2 | `npm install --save-dev drizzle-kit` |
| `tsx` | ^4.19.1 | `npm install --save-dev tsx` |
| `typescript` | ^5.6.2 | `npm install --save-dev typescript` |

## Utilização do Drizzle Studio

Para gerenciar o banco de dados de forma visual, usamos o **Drizzle Studio**. Você pode instalar o Drizzle Studio localmente seguindo as instruções da [documentação oficial](https://github.com/drizzle-team/drizzle-orm).

## Contribuindo

Sinta-se à vontade para enviar issues ou pull requests para melhorias ou correções de bugs.

## Licença

Este projeto está licenciado sob a Licença MIT.

---

Com isso, o projeto backend está completo, incluindo a execução do comando `npm run dev` para iniciar o servidor e acessar a página principal, juntamente com a configuração do banco de dados via `docker-compose.yml`.
