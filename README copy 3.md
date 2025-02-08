# 🎵 Music Productivity App

## 📌 Introduction

The **Music Productivity App** is designed for **composers, producers, and music professionals** to streamline their workflow. It eliminates tedious admin work, allowing users to efficiently **track, manage, and collaborate** on their compositions in a structured system.

---

## 📋 Table of Contents

-   [Features & User Roles](#features--user-roles)
-   [Filtering & Searching](#filtering--searching)
-   [Comments & Reviews](#comments--reviews)
-   [Future Features](#future-features)
-   [Setup & Deployment](#setup--deployment)
-   [Testing](#testing)
-   [User Stories](#user-stories)
-   [Technologies Used](#technologies-used)
-   [Credits](#credits)

---

## ✨ Features & User Roles

### 👨‍🎤 **Composers (Full Access)**

✔ Create, edit, and delete tracks.  
✔ Assign **moods, genres, instruments, project type, and track status**.  
✔ Mark tracks as **Ready for Review**.  
✔ Manage comments for **team collaboration**.  
✔ Assign themselves to tracks so others can see who's working on what.  
✔ _(Future Feature)_ Manage albums, upload audio files, and enhance search filters.

### 🎼 **Reviewers (Limited Access)**

✔ View **only** tracks marked as **Ready for Review**.  
✔ ✔ _(Future Feature)_ Provide **structured feedback** in a dedicated review thread.  
✔ Cannot create or edit tracks—**only review & comment**(✔ _(Future Feature)_).  
✔ _(Future Feature)_ Set Review Status to "Needs Revision".  
✔ _(Future Feature)_ Track review history & revision counts.  
✔ _(Future Feature)_ Mark tracks as **Completed & Approved**.

---

## 🔍 Filtering & Searching

**Powerful filtering options:**
✔ Search by **title**.  
✔ Filter by:

-   **Genre**
-   **Mood**
-   **Status** (_Not Started, In Progress, Ready for Review, etc._)
-   **Project Type**
-   **Vocals Needed (Yes/No)**

_(Future Feature)_ Advanced filtering & search options.

---

## 📝 Comments & Reviews

### 🎤 **Composer Comments**

✔ Track-specific **team collaboration threads**.  
✔ Owners can **edit & delete** their own comments.  
✔ Link avatars and names to **composer profiles**.

### 📝 **Review Feedback**

✔ _(Future Feature)_ Separate from composer comments (**structured review system**).  
✔ _(Future Feature)_ Reviewers set track status to **"Needs Revision"** if necessary.  
✔ _(Future Feature)_ Review log with **revision history**.  
✔ _(Future Feature)_ Revision counter for **internal tracking**.

---

## 🚀 Future Features

💿 **Albums** – Tracks can belong to albums for better organization and bulk update tracks.  
🎧 **Audio Uploads** – Attach sound files for easy review.  
🔎 **Enhanced Search** – More filtering & categorization options.  
🎼 **Instrument Management** – Create & categorize instruments.  
🎼 **Genre/Mood/Project Type** – Create & Edit these features.  
📊 **Dashboard & Analytics** – Insights into track progress & team activity.

📊 **Review System** – Reviewers can give feedback, change status on track have a back and forth with the composers.

---

## 🛠 Setup & Deployment

### **1️⃣ Backend (Django REST Framework)**

```bash
# Clone the backend repository:
git clone <backend_repo_url>
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### **2️⃣ Frontend (React 19)**

```bash
# Clone the frontend repository:
git clone <frontend_repo_url>
cd frontend
npm install
npm start
```

### **3️⃣ Deployment** _(Optional: To be expanded if deployed on Heroku or Vercel)_

-   Frontend hosted on **[Vercel/Netlify](#)**
-   Backend hosted on **[Heroku](#)**

---

## ✅ Testing

A full breakdown of testing procedures is available in [`TESTING.md`](#).

### **Key Tests**

✔ **CRUD Operations** – Create, edit, delete tracks, comments, and reviews.  
✔ **Filtering & Searching** – Ensure smooth user navigation.  
✔ **User Role Access Control** – Reviewers cannot modify tracks.  
✔ **Authentication & Authorization** – Secure login/logout & user permissions.  
✔ **Responsiveness** – Cross-browser and mobile compatibility.

---

## 📌 User Stories

_(Full breakdown in [`USER_STORIES.md`](#))_  
✔ As a **composer**, I want to **add & edit tracks** so I can manage my workflow.  
✔ As a **reviewer**, I want to **provide feedback** so I can ensure quality.  
✔ As a **user**, I want to **filter and search** so I can quickly find what I need.

---

## 🖥 Technologies Used

✔ **Frontend:** React 19, React Bootstrap, CSS Modules  
✔ **Backend:** Django 4.2, Django REST Framework 3.15  
✔ **Authentication:** JWT, dj-rest-auth  
✔ **Deployment:** _(To be documented)_  
✔ **Database:** PostgreSQL  
✔ **Hosting:** _(Optional: Vercel, Heroku, Netlify, etc.)_

---

## 🙌 Credits

This project was developed as part of a **portfolio submission** for Code Institute.

Big thanks to:

-   **OpenAI & Online Resources** – For debugging & research.
-   **Developers & Peers** – For feedback & best practices.

### Special thanks to:

-   To my amazing parents and their idescribable support
-   To my really good mate Pontus Ericson who always checks up on me and always have time to help me and assist me no matter what.
-   Last but not least: Babe (You know who you are).

---

## 🎯 Summary

This app **streamlines music production workflows**, reduces admin tasks, and **keeps teams in sync**—all within one structured system. More music, less hassle. 🎶

---

## 📜 License

> **Note**: This project is submitted for educational purposes only and is not open-source. No external use, copying, or distribution is allowed beyond the scope of this assessment.
>
> For inquiries regarding usage or collaboration, please contact the project owner.

🚀 **Next Steps**:
1️⃣ Add **screenshots & images** where placeholders are.  
2️⃣ Finalize **deployment details** (if applicable).  
3️⃣ Review & submit! 🎯
