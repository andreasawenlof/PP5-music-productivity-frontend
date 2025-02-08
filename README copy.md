# 🎵 MP App (Frontend)

## 📌 Table of Contents

-   [🚀 Introduction](#-introduction)
-   [🔗 Features](#-features)
-   [📦 Technologies Used](#-technologies-used)
-   [📖 User Stories](#-user-stories)
-   [⚙️ Setup & Deployment](#️-setup--deployment)
    -   [💻 Local Setup](#-local-setup)
    -   [🚀 Deployment to Heroku](#-deployment-to-heroku)
-   [📜 License](#-license)

---

## 🚀 Introduction

The **MP App** is a React-based web application designed to interact with the **MP App API**, providing composers and producers with an intuitive interface to manage their music projects efficiently. Users can track, organize, and review songs, albums, and feedback within a structured system.

---

## 🔗 Features

✅ **User Authentication** (Login & Admin-Only Registration)  
✅ **Track & Album Management** (CRUD Operations)  
✅ **Supervisor Feedback System**  
✅ **Responsive UI with React Bootstrap**  
✅ **Seamless API Integration with Django Rest Framework**  
✅ **Progress Tracking for Songs & Instruments**  
✅ **Comment System for Tracks & Albums**  
✅ **Sorting & Filtering System** (Genre, Mood, Instruments, Date, Progress)  
✅ **Basic Navigation Between Pages**

---

## 📦 Technologies Used

-   **Frontend**: React 19, React Bootstrap 5, Axios
-   **State Management**: Context API
-   **Routing**: React Router
-   **Deployment**: Heroku
-   **Authentication**: JWT-based authentication

---

## 📖 User Stories

### **User Authentication (Signup, Login, Logout)**

_As a USER, I can sign up, log in, and log out so that my data is secure._

**Acceptance Criteria:**

-   Users can sign up with email & password
-   Users can log in and get a token
-   Users can log out and remove the token
-   If credentials are incorrect, the user gets an error message

### **Track Management (CRUD)**

_As a COMPOSER, I can create, edit, delete, and view songs/projects so I can manage my work._

**Acceptance Criteria:**

-   Composers can create a track
-   Composers can edit a track
-   Composers can delete and remove a track
-   If required fields are not filled, the composer gets an error message

### **Filtering & Search**

_As a USER, I want to filter and search tracks and albums by genre, mood, instruments, progress, name, and date so I can quickly find what I need._

**Acceptance Criteria:**

-   Users can filter songs by genre, mood, instruments, progress, name, and date.
-   Users can search for songs by title or keywords.

### **Sorting System**

_As a USER, I can sort tracks by name, date, or progress so I can organize my work better._

**Acceptance Criteria:**

-   Users can sort tracks by date (newest/oldest).
-   Users can sort tracks alphabetically by name.
-   Users can sort tracks by progress (Completed/In Progress).

### **Progress Tracking**

_As a USER, I want to mark a song/project as “In Progress” or “Completed” so I can track my work._

**Acceptance Criteria:**

-   Users can mark a song as “In Progress” or “Completed.”
-   Users can mark specific instruments when they're completed with that instrument.

### **Comment System**

_As a USER, I want to leave comments on a track/album so I can provide feedback or notes._

**Acceptance Criteria:**

-   Users can leave a comment on any track/album.
-   Comments are specific for that track/album.
-   Users can delete and edit their own comments.

### **Basic UI Navigation**

_As a USER, I want to easily navigate between login, tracks, and track details without confusion._

**Acceptance Criteria:**

-   Users can move between Login, tracks, and track details pages.

### **Collaboration (Not Implemented)**

_As a USER, I can invite collaborators to a track/project so multiple people can track progress._

**Acceptance Criteria:**

-   Users can invite collaborators via email.
-   Collaborators can view and edit shared tracks/projects.

### **Upload Audio Preview (Not Implemented)**

_As a USER, I want to upload a short audio clip for each track so that I can preview it._

**Acceptance Criteria:**

-   Users can upload an MP3/WAV file as a preview.
-   The audio file plays on the track page.

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
>
> For inquiries regarding usage or collaboration, please contact the project owner.
