# 🔗 Encurtador de URL em Node.js

Um serviço de back-end simples e eficiente construído com **Node.js** e **Express** para encurtar URLs longas. O projeto utiliza **SQLite** para persistência de dados, garantindo que os links não sejam perdidos quando o servidor é reiniciado.

---

## ✨ Funcionalidades

- **Encurtar URLs**: Converte uma URL longa em um link curto com um código único.
- **Redirecionamento**: Redireciona automaticamente os usuários do link curto para a URL original.
- **Persistência**: Salva os links em um banco de dados local SQLite.
- **Validação**: Verifica se uma URL já foi encurtada para evitar duplicatas e retorna o link já existente.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript.
- **Express.js** – Framework para criação de APIs.
- **SQLite3** – Banco de dados SQL embutido em um único arquivo.
- **shortid** – Biblioteca para gerar IDs curtos e únicos.

---

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (que já vem com o npm)

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para rodar o projeto localmente:

### 1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

### 2. Navegue até a pasta do projeto:

```bash
cd nome-da-pasta
```

### 3. Instale as dependências:

```bash
npm install
```

### 4. Inicie o servidor:

```bash
npm start
```

O servidor estará rodando em **http://localhost:3000**. Você verá uma mensagem de confirmação no terminal.

---

## 📡 Endpoints da API

### 1. Encurtar uma nova URL

Cria e salva um novo link encurtado.

- **Método:** POST  
- **URL:** `/encurtar`

#### Corpo da Requisição (JSON):
```json
{
  "urlOriginal": "https://pt.wikipedia.org/wiki/Node.js"
}
```

#### Resposta de Sucesso (201):
```json
{
  "id": 1,
  "urlOriginal": "https://pt.wikipedia.org/wiki/Node.js",
  "codigoCurto": "B1-7_8fVb",
  "urlEncurtada": "http://localhost:3000/B1-7_8fVb"
}
```

#### Resposta de Erro (400):
```json
{
  "erro": "URL original é obrigatória."
}
```

---

### 2. Redirecionar para a URL Original

Acessa o link encurtado e redireciona para o destino original.

- **Método:** GET  
- **URL:** `/:codigoCurto`  
- **Exemplo:** `http://localhost:3000/B1-7_8fVb`

#### Resposta de Sucesso (302):
Redirecionamento automático para a `urlOriginal` armazenada.

#### Resposta de Erro (404):
```json
{
  "erro": "URL não encontrada."
}
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

## 👨‍💻 Autor

Feito com ❤️ por **Mateus Martini**.
