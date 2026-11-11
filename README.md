<div align="center">

# 🔐 Full-Stack Login Page

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=4F8CFF&center=true&vCenter=true&width=600&lines=Create+an+account.;Log+in+with+your+credentials.;A+simple+Express+%2B+MongoDB+demo." alt="Animated project introduction" />

A responsive account registration and login demo built with **HTML, CSS, JavaScript, Express, and MongoDB**. It includes a separate company-style landing page after login.

[Features](#-features) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [Security Notes](#-security-notes)

</div>

---

## ✨ Features

- **Create account** with username, email, and password.
- **Log in** with a username and password.
- Store user records in MongoDB through Mongoose.
- Responsive registration and login forms with a glass-style interface.
- Express serves the HTML pages and handles form submissions.
- A responsive company landing page with a mobile navigation menu and scroll effect.
- Configurable port and MongoDB connection string through environment variables.

## 🧰 Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | HTML, CSS, browser JavaScript |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose 8 |
| UI extras | Font Awesome, Google Fonts, remote background images |

## 📁 Project Structure

```text
full-stack-login-page/
├── index.html       # Create-account form
├── login.html       # Login form
├── home.html        # Landing page shown after login
├── server.js        # Express app, MongoDB connection, and form routes
├── User.js          # Mongoose user schema and model
├── package.json     # Dependencies and project metadata
└── package-lock.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- A MongoDB database (local MongoDB or MongoDB Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/rupeshbuddhu78-dev/full-stack-login-page.git
cd full-stack-login-page
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure MongoDB

Set `MONGO_URI` to your MongoDB connection string before starting the server.

**macOS / Linux**

```bash
export MONGO_URI="mongodb://127.0.0.1:27017/login_app"
```

**PowerShell**

```powershell
$env:MONGO_URI="mongodb://127.0.0.1:27017/login_app"
```

For MongoDB Atlas, use the connection string provided by your cluster and keep its credentials private. Do not commit secrets to the repository.

### 4. Start the server

```bash
node server.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The default page is the account creation form. The port can be changed with the `PORT` environment variable.

> `package.json` currently does not define a `start` script, so use `node server.js` to run the app.

## 🔁 How It Works

1. `index.html` submits username, email, and password to `POST /register`.
2. Express parses the form data, creates a `User` document, and saves it to MongoDB.
3. On successful registration, the browser is redirected to `login.html`.
4. `login.html` submits username and password to `POST /login`.
5. A successful login redirects to `home.html`.

### Routes

| Method | Path | Purpose | Successful response |
| --- | --- | --- | --- |
| `POST` | `/register` | Create a user record | Redirects to `/login.html` |
| `POST` | `/login` | Check username and password | Redirects to `/home.html` |

## 🔒 Security Notes

This repository is best treated as a **learning/demo project**, not production-ready authentication. In the current implementation, passwords are stored and compared as plain text, and successful login does not create a session or token. Before using this for real users, add password hashing (for example, bcrypt), session/token-based authentication, input validation, rate limiting, secure error handling, and HTTPS. Never store real user credentials in a demo deployment.

## 📝 Current Limitations

- No automated test suite is configured yet (`npm test` is a placeholder that exits with an error).
- Login checks credentials but does not establish a persistent authenticated session.
- The landing page and external fonts/icons/background images rely on third-party URLs.

## 🤝 Contributing

Issues and pull requests are welcome. For significant changes, please open an issue first to discuss the proposed update.

## 📄 License

No explicit open-source license is currently specified in the repository. Contact the repository owner before redistributing this project.

---

<div align="center">

Made with ❤️ using Node.js, Express, and MongoDB

</div>
