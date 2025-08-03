# 🧠 Smart Admin Dashboard

A secure and modular Admin Dashboard built using *Node.js, **Express, **MongoDB, **EJS, and **JWT authentication*. This project includes user registration, login, role-based access, and a dynamic dashboard interface.

## 🚀 Features

- 🔐 User Authentication (Register/Login/Logout)
- 🧾 Secure Password Hashing using bcrypt
- 🪪 JWT-based session management
- 🧭 Role-based access control (Admin/User)
- 📊 Admin Dashboard UI with EJS templating
- 🗂 Organized project structure
- 🌐 MongoDB for storing users and content
- 📁 Clean static asset handling via path

---

## 🛠️ Tech Stack

| Category         | Tech Used              |
|------------------|------------------------|
| Backend          | Node.js, Express       |
| Database         | MongoDB (Mongoose)     |
| View Engine      | EJS                    |
| Authentication   | JWT, bcrypt            |
| Routing          | Express Router         |
| Utilities        | dotenv, path, etc. |

---

## 📁 Project Structure

roject/
│
├── config/            # Configuration files (DB, JWT)
├── controllers/       # Route logic
├── middleware/        # Auth & error handling
├── models/            # Mongoose schemas
├── public/            # Static files (CSS, JS, images)
├── routes/            # Express route definitions
├── views/             # EJS templates
│   ├── partials/
│   └── pages/
├── .env               # Environment variables
├── .gitignore
├── app.js             # Entry point
---

## ⚙️ Installation

# 1. Clone the repository
git clone https://github.com/DaliaTarek96/TeamManagerProject.git

2. Install dependencies
npm install

---
▶️ Run the App

#  production
node server.js

---
👤 User Roles
	•	Admin: Access all dashboard features
	•	User: Limited access to personal area

 ---
 🔐 Authentication Flow
	1.	User registers with name, email, and password.
	2.	Password is hashed using bcrypt before storing.
	3.	Upon login, a JWT is issued and used to authenticate protected routes.
	4.	Middleware verifies token and role before allowing access.

 ---

 🤝 Contribution

Feel free to fork the repo and submit pull requests. Open issues if you find bugs or want to suggest improvements.

💬 Contact
	•	GitHub: DaliaTarek96
	•	Email: daliatakl0@gmail.com
