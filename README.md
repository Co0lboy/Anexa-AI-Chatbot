# 🤖 Anexa AI Chatbot

> A production-ready AI chatbot built with **Spring Boot**, **React**, **MySQL**, and **OpenAI GPT**.

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.4-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🚀 Overview

**Anexa AI Chatbot** is a full-stack conversational AI system that enables real-time chat interactions using OpenAI's language model with persistent chat storage and modern UI.

### ✅ Key Highlights

- 💬 Real-time chatbot interaction
- 🧠 AI-powered responses
- 💾 Persistent chat storage
- ⚡ Fast REST APIs
- 🎨 Responsive UI with Tailwind CSS
- 🔐 Secure environment-based configuration

---

## ⚙️ Architecture

```
User → React Frontend → Spring Boot API → OpenAI API
                         ↓
                      MySQL DB
```

---

## 🏗 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java 21, Spring Boot 3.4, JPA |
| Frontend | React 18, Tailwind CSS, Axios |
| Database | MySQL 8.0 |
| AI Engine | OpenAI GPT-3.5 Turbo |

---

## 📁 Project Structure

```
anexa-ai-chatbot/
│
├── backend/
│   ├── controller
│   ├── service
│   ├── repository
│   └── model
│
├── anexa-ui/
│   ├── components
│   ├── services
│   └── pages
│
└── README.md
```

---

## 🛠 Setup Instructions

---

### 🖥 Backend Setup

### 1. Create MySQL Database

```sql
CREATE DATABASE chatbot_db;
```

### 2. Set OpenAI API Key

```bash
export OPENAI_API_KEY=your_api_key_here
```

### 3. Configure Database

Create:

```
src/main/resources/application.properties
```

Example configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/chatbot_db
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 4. Run Backend

```bash
mvn spring-boot:run
```

Backend runs at:

```
http://localhost:8080
```

---

### 🌐 Frontend Setup

```bash
cd anexa-ui
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🔌 API Flow

1. User sends message from React UI
2. Spring Boot receives request
3. Backend calls OpenAI API
4. Response stored in MySQL
5. AI response returned to frontend

---

## 📊 Database Schema (Example)

| Table | Description |
|---|---|
| messages | Stores user and AI messages |
| users (optional) | User session data |

---

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| OPENAI_API_KEY | OpenAI API authentication key |

---

## 🎯 Use Cases

- AI customer support chatbot
- OpenAI API learning projects
- Full-stack development practice
- Production chatbot systems
- AI SaaS foundation

---

## 🚀 Future Improvements

- User authentication
- Chat sessions
- Streaming responses
- Docker deployment
- Conversation memory
- Rate limiting & caching

---

## 🤝 Contributing

Contributions are welcome!

```
Fork → Create Branch → Commit → Push → Pull Request
```

---

## 📜 License

Licensed under the MIT License.
