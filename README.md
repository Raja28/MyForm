# MyForm - Multi-Page Form Application

This project is a full-stack web application featuring a multi-page form built with React (Vite) on the frontend, Node.js with Express on the backend, and MongoDB as the database. JWT-based user authentication and secure password hashing with bcrypt. The application allows users to submit personal, educational, and project details across three navigable form pages.

---

## 🚀 Features

- Multi-page form with React + Vite
- Client-side and server-side validation
- RESTful API built with Express.js
- Data persistence with MongoDB
- Dynamic project entry form
- Seamless navigation with data persistence between pages

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB

---

## 📄 Form Pages

1. **Personal Information**
   - Name
   - Email
   - Address (Line 1, Line 2)
   - City, State, Zipcode

2. **Educational Status**
   - Are you still studying? (Yes/No)
   - If Yes: Institution Name

3. **Projects**
   - Add multiple projects dynamically
   - Each project includes: Name and Description

---

## 🧪 Validation

- **Client-Side:** Before navigating between form pages.
- **Server-Side:** On data submission using express-validator.

---

## 🔧 Setup

### Prerequisites

- Node.js (v16+)
- MongoDB
- npm

### Installation

```bash
git clone https://github.com/Raja28/MyForm.git
npm i concurrently
npm install
npm run dev

