# 🎵 Music Productivity Frontend

## 📌 Table of Contents

- [🎵 Music Productivity Frontend](#-music-productivity-frontend)
  - [📌 Table of Contents](#-table-of-contents)
  - [🚀 Introduction](#-introduction)
  - [🔗 Features](#-features)
  - [📦 Technologies Used](#-technologies-used)
  - [⚙️ Setup \& Deployment](#️-setup--deployment)
    - [💻 Local Setup](#-local-setup)
    - [🚀 Deployment to Heroku](#-deployment-to-heroku)
  - [📜 License](#-license)

---

## 🚀 Introduction

The **Music Productivity Frontend** is a React-based web application designed to interact with the **Music Productivity API**, providing composers and producers with an intuitive interface to manage their music projects efficiently. Users can track, organize, and review songs, albums, and feedback within a structured system.

---

## 🔗 Features

✅ **User Authentication** (Login & Admin-Only Registration)  
✅ **Track & Album Management** (CRUD Operations)  
✅ **Supervisor Feedback System**  
✅ **Responsive UI with React Bootstrap**  
✅ **Seamless API Integration with Django Rest Framework**

---

## 📦 Technologies Used

-   **Frontend**: React 19, React Bootstrap 5, Axios
-   **State Management**: Context API
-   **Routing**: React Router
-   **Deployment**: Heroku
-   **Authentication**: JWT-based authentication

---

## ⚙️ Setup & Deployment

### 💻 Local Setup

1. **Clone the repository**

    ```bash
    git clone <your-frontend-repo-url>
    cd music-productivity-frontend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the development server**
    ```bash
    npm run dev
    ```

### 🚀 Deployment to Heroku

1. **Login to Heroku**
    ```bash
    heroku login
    ```
2. **Create a Heroku App**
    ```bash
    heroku create <your-app-name>
    ```
3. **Set up environment variables** in Heroku:
    - `REACT_APP_API_BASE_URL`
    - `NODE_ENV`
4. **Deploy to Heroku**
    ```bash
    git push heroku main
    ```
5. **Run the app**
    ```bash
    heroku open
    ```

---

## 📜 License

> **Note**: This project is submitted for educational purposes only and is not open-source. No external use, copying, or distribution is allowed beyond the scope of this assessment.
