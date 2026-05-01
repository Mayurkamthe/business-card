# CardBiz – Digital Business Card Platform

> Like Linktree, but built for business owners. Create a digital visiting card, mini website, shareable link & QR code.

![CardBiz](https://img.shields.io/badge/CardBiz-v1.0-6366f1?style=for-the-badge)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-6db33f?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql)

---

## ✨ Features

- 🪪 **Digital Business Card** – Name, logo, phone, WhatsApp, address, social links
- 🌐 **Public Profile Page** – `yourapp.com/your-slug`
- 🎨 **5 Themes** – Modern, Ocean, Forest, Sunset, Dark
- 📊 **Analytics** – Track views, WhatsApp clicks, phone clicks
- 📦 **Sections** – Services, Gallery, Reviews, About
- 📱 **QR Code** – Auto-generated for each card
- 🔒 **JWT Auth** – Secure login/register
- 🛡️ **Admin Panel** – Manage users & cards

---

## 🏗️ Architecture

```
my-app/
├── backend/          # Spring Boot (Java 17)
│   └── src/main/java/com/digitalcard/
│       ├── controller/   # REST endpoints
│       ├── model/        # JPA entities
│       ├── repository/   # Spring Data repos
│       ├── service/      # Business logic
│       ├── security/     # JWT + Spring Security
│       └── dto/          # Data transfer objects
└── frontend/         # React + Vite + Tailwind
    └── src/
        ├── pages/        # Login, Register, Dashboard, Editor, Public Card, Analytics, Admin
        ├── components/   # Layout, UI components
        ├── services/     # Axios API layer
        └── store/        # Zustand auth store
```

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8+

### 1. Database Setup
```sql
CREATE DATABASE digitalcard_db;
```

### 2. Backend
```bash
cd backend
# Edit src/main/resources/application.properties with your MySQL credentials
mvn spring-boot:run
# Runs on http://localhost:8080
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

---

## 🔑 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register |
| POST | `/api/auth/login` | ❌ | Login |
| GET | `/api/cards` | ✅ | Get my cards |
| POST | `/api/cards` | ✅ | Create card |
| PUT | `/api/cards/{id}` | ✅ | Update card |
| DELETE | `/api/cards/{id}` | ✅ | Delete card |
| GET | `/api/public/card/{slug}` | ❌ | Public card |
| GET | `/api/public/qr/{slug}` | ❌ | QR Code PNG |
| POST | `/api/public/track/view/{slug}` | ❌ | Track view |
| POST | `/api/public/track/click/{slug}/{type}` | ❌ | Track click |
| GET | `/api/analytics/{cardId}` | ✅ | Get analytics |
| GET | `/api/admin/stats` | 🔐 Admin | Platform stats |
| GET | `/api/admin/users` | 🔐 Admin | All users |

---

## 🗄️ Database Schema

```sql
users       → id, name, email, password, role, created_at
cards       → id, user_id, title, slug, theme, phone, whatsapp, email, website, address, social links...
sections    → id, card_id, type, title, content (JSON), sort_order
analytics   → id, card_id, event_date, view_count, whatsapp_clicks, phone_clicks, link_clicks
```

---

## 🎨 Themes

| Theme | Preview |
|-------|---------|
| Modern | Indigo → Purple |
| Ocean | Blue → Cyan |
| Forest | Green → Emerald |
| Sunset | Orange → Pink |
| Dark | Slate 800 → 900 |

---

## 📱 Public Card Features

- One-tap **Call** button
- One-tap **WhatsApp** button
- **Share** via Web Share API
- **QR Code** download
- Services list with prices
- Reviews carousel
- Photo gallery
- Social media links
- Google Maps link

---

## 🛡️ Security

- JWT Bearer token auth
- BCrypt password hashing
- Role-based access (USER / ADMIN)
- CORS configured for frontend origin

---

## 📦 Tech Stack

**Backend:** Spring Boot 3.2, Spring Security, Spring Data JPA, MySQL, JWT (jjwt), ZXing (QR codes), Lombok

**Frontend:** React 18, Vite, Tailwind CSS, React Router 6, Zustand, Axios, Lucide React, React Hot Toast

---

## 🤝 Contributing

PRs welcome! Please open an issue first for major changes.

---

## 📄 License

MIT
