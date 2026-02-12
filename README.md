# 💸 Finanças Lite

Finanças Lite é uma aplicação fullstack para controle financeiro pessoal, desenvolvida para uso real no dia a dia, permitindo que cada usuário gerencie suas próprias transações de forma segura e simples.

O projeto conta com autenticação, persistência de dados e resumo financeiro.

---

##  Funcionalidades

-  Cadastro e login de usuários
-  Autenticação com JWT
-  CRUD de transações (entradas e saídas)
-  Resumo financeiro (entradas, saídas e saldo)
-  Transações isoladas por usuário
-  Logout com controle de sessão
-  Interface responsiva (desktop e mobile)
-  Deploy em produção

---

##  Tecnologias Utilizadas

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Token)
- Bcrypt
- CORS

### Frontend
- HTML
- CSS (layout responsivo)
- JavaScript puro (Vanilla JS)
- Fetch API

---

## 📂 Estrutura do Projeto

```text
financas-lite/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── config/
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── main.js
│   ├── main.css
│   └── login.css
│
├── .env.example
└── README.md
```

---

##  Autenticação

A autenticação é feita via JWT:
- O backend gera o token
- O frontend armazena no `localStorage`
- Rotas utilizam middleware de autenticação

---

##  Deploy

- Backend + Frontend servidos juntos
- MongoDB em cloud (Atlas)
- Aplicação disponível em produção

🔗 **Demo:**  
👉 https://financas-lite.onrender.com

---

## 📌 Próximos passos (ideias)

- Categorias personalizadas
- Filtros por data
- Gráficos financeiros
- Refresh token
- Perfil do usuário

---

## Autor

Desenvolvido por **Diogo Silva**  
Projeto criado com foco em aprendizado prático e uso real.
