# PrepGen – GenAI-Powered Mock Interview Platform

PrepGen is an AI-driven mock interview platform designed to help students and professionals prepare for technical and behavioral interviews with realistic simulations, real-time feedback, and performance analytics.

---

##  Overview

PrepGen replicates the pressure and format of real interviews using Generative AI (Google Gemini API). It supports audio + video interviews, evaluates your responses in real time, and helps track your growth over time. It is built with a modern stack including Next.js, Clerk for auth, Drizzle ORM, and PostgreSQL.

---

## Features

*  AI-generated questions based on user-selected role/domain (DSA, System Design, Behavioral)
*  Real-time speech and video interview simulation
*  AI-powered feedback with scores on relevance, confidence, and clarity
* Interview history and performance trends
* Secure user authentication via Clerk
* Persistent data storage with PostgreSQL and Drizzle ORM
* Modern and responsive UI with Tailwind CSS


## 📸 Demo

### Screenshots

![Landing Page](./public/landing.png)
![Login Page](./public/login.png)
![Dashboard](./public/dashboard.png)
![Add Interview](./public/add_interview.png)
![Interview page](./public/interview_page.png)
![Interview Questionnaire](./public/interview_questions.png)




##  Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/prepgen.git
cd prepgen
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file and add the following:

```env
CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=postgresql://user:pass@host:port/dbname
```

### 4. Run the App

```bash
npm run dev
```

The app will be live at `http://localhost:3000`

---

## 📃 License

This project is licensed under the MIT License.

---

## 👤 Author

Developed with ❤️ by [Subhasmita Swain](https://github.com/subhasmita223)

T
