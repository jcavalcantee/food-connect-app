# 🍽️ FoodConnect – Mobile App

FoodConnect é um aplicativo mobile desenvolvido para facilitar a rotina dos estudantes do campus SENAC, evitando filas e otimizando o tempo de atendimento. Este repositório contém o app desenvolvido em **React Native**, conectado a uma arquitetura de microserviços no backend.

---

## 📖 Índice

- [📱 Sobre o App](#-sobre-o-app)
- [🖥️ Sobre a Aplicação Web](#-sobre-a-aplicação-web)
- [🧩 Arquitetura de Microserviços](#-arquitetura-de-microserviços)
- [🛠 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [⚙️ Como Executar](#️-como-executar)
- [📦 Funcionalidades do App](#-funcionalidades-do-app)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [👤 Autores](#-autores)

---

## 📱 Sobre o App

O **FoodConnect** foi criado para resolver um problema real vivido por estudantes: as longas filas para comprar alimentos durante os intervalos. Com o app, os usuários podem:

- Visualizar produtos disponíveis nas lojas presentes nas praças de alimentação do campus em tempo real
- Adicionar itens à sacola
- Realizar pedidos com antecedência
- Consultar histórico e status dos pedidos

O objetivo é trazer **praticidade para os alunos** e **organização para o time da cantina**.

---

## 🖥️ Sobre a Aplicação Web

A aplicação web do FoodConnect foi desenvolvida como um sistema de BackOffice voltado à administração das lojas e ao gerenciamento interno da operação.

Seu principal objetivo é fornecer às equipes administrativas uma interface intuitiva e funcional para acompanhar e controlar:

- Informações da loja: dados cadastrais, localização, horários de funcionamento e status da operação.
- Gestão de produtos: cadastro, edição, inativação e controle de estoque dos produtos oferecidos.
- Gestão de funcionários: cadastro de usuários com permissões específicas (atendentes e administradores), além de controle de acesso por meio de autenticação segura.

A aplicação foi projetada para integrar-se com o app mobile via microserviços, permitindo sincronização em tempo real entre pedidos, estoque e operações internas.

---

## 🧩 Arquitetura de Microserviços

O sistema backend do FoodConnect foi estruturado em **microserviços independentes**, seguindo boas práticas de separação de responsabilidades, escalabilidade e segurança. Cada microserviço trata de um domínio específico, possui seu próprio repositório, documentação e endpoints:

- [🔐 Login](https://github.com/LucasGouveia02/FC-login-users-employees)
- [✉️ Envio de e-mail para ativação de usuários](https://github.com/LucasGouveia02/FC-email-sender)
- [🧑‍💼 Gestão de Usuários e Funcionários](https://github.com/LucasGouveia02/FC-register-users-employees)
- [🛍️ Gestão de Produtos](https://github.com/LucasGouveia02/FC-products-manager)
- [🛒 Gestão de Pedidos](https://github.com/GabrielLomba12/FC-order)

---

## 🛠 Tecnologias Utilizadas

### **Mobile App**
- React Native
- JavaScript
- React Navigation
- AsyncStorage
- Axios API

### **Aplicação Web**
- HTML
- CSS
- JavaScript
- Bootstrap
  
### **Backend (microserviços)**
- Java 21
- Spring Boot 3+
- Spring Security
- Spring Data JPA
- Docker
- MySQL
- Redis
- Azure VM
- Azure Blobs Storage

---

## ⚙️ Como Executar

### Pré-requisitos:
- Node.js
- Expo CLI ou emulador Android/iOS configurado
- Acesso aos microserviços backend em execução (local ou hospedado)

### Rodar o app:

```bash
# Clone este repositório
git clone https://github.com/Gabs-Attuy/FoodConnect-App.git

# Acesse o diretório
cd FoodConnect-App

# Instale as dependências
npm install

# Execute o app com Expo
npx expo start
```

---

## 📦 Funcionalidades do App

- Cadastro e login de clientes
- Listagem e busca de produtos
- Adição de produtos ao carrinho
- Escolha de endereço de entrega (sala)
- Envio de pedido e recebimento de resumo
- Visualização de pedidos realizados

---

## 📁 Estrutura do Projeto

```css
FoodConnect-App/
├── assets/
├── components/
├── screens/
│   ├── LoginScreen.js
│   ├── HomeScreen.js
│   ├── ProductScreen.js
│   ├── CheckoutScreen.js
│   └── ...
├── services/
│   └── api.js
├── storage/
│   └── cartStorage.js
├── App.js
└── ...
```

---

## 👤 Autores

**Gabriel Santos Attuy**

🐙 GitHub: [@Gabs-Attuy](https://github.com/Gabs-Attuy)
💼 LinkedIn: [Gabriel Attuy](https://www.linkedin.com/in/gabriel-attuy-197010265)

**Jefferson Cavalcante**

🐙 GitHub: [@jcavalcantee](https://github.com/jcavalcantee)
💼 LinkedIn: [Jefferson Cavalcante](https://www.linkedin.com/in/jeffersoncavalcante8 )

**Lucas Pereira Alves de Gouveia**

🐙 GitHub: [@]()
💼 LinkedIn: []()

**Gabriel Souza Lomba**

🐙 GitHub: [@]()
💼 LinkedIn: []()

**Patrick do Nascimento Santos**

🐙 GitHub: [@]()
💼 LinkedIn: []()

**Pedro Henrique Rodrigues Augusto**

🐙 GitHub: [@]()
💼 LinkedIn: []()
