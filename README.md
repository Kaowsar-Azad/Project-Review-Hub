# 🚀 ReviewHub - Project Submission & Review Dashboard

ReviewHub is a full-stack, production-ready web application built as an **Associate Web Instructor Assessment Task**. It enables students to submit project details (GitHub repository, live deployment, description) with robust validation, and empowers mentors with an interactive dashboard to review, approve, reject, and leave constructive feedback.

---

## 🌐 Live Deployments & Video Lessons

| Resource | URL |
| :--- | :--- |
| **Frontend (Next.js)** | [https://project-review-hub-lime.vercel.app](https://project-review-hub-lime.vercel.app) |
| **Backend API (Express.js)** | [https://project-review-hub-backend.vercel.app](https://project-review-hub-backend.vercel.app) |
| **Video Lesson 1 (AuthN vs AuthZ / RBAC)** | *[Insert YouTube Unlisted Link]* |
| **Video Lesson 2 (Database Schema & Relations)** | *[Insert YouTube Unlisted Link]* |

---

## 🛠️ Technology Stack

- **Frontend:** Next.js 16 (App Router, Turbopack), TypeScript, TailwindCSS, ShadCN UI, Lucide Icons
- **Backend:** Express.js, TypeScript (ES Modules, NodeNext)
- **Database & ORM:** PostgreSQL (Neon Serverless) via Prisma ORM 7
- **Authentication & RBAC:** Better-Auth, Stateless JWT-based Role-Based Access Control
- **Security & Quality:** Express Rate Limiting, CORS, Zod validation, Compound unique constraints

---

## ✨ Key Features

### 🎓 1. Student Submission Portal
- **Submission Form:** Submit Project Name, GitHub Repository URL, Live Deployment URL, and Description.
- **Robust Validation:** URL format validation, required fields, and prevention of duplicate submissions via database constraints (`@@unique([studentId, repoUrl])`).
- **Student Dashboard:** Real-time list of student's own submissions with status indicators (`PENDING`, `APPROVED`, `REJECTED`) and mentor feedback.

### 🛡️ 2. Mentor Review Dashboard
- **Overview & Statistics:** Total projects, Pending reviews, Approved, and Rejected counts.
- **Filtering & Search:** Real-time filter by submission status (`ALL`, `PENDING`, `APPROVED`, `REJECTED`).
- **Review Actions:** Fast one-click **Approve** / **Reject** with optional feedback modal.
- **Server-Side Pagination:** Efficient 10-per-page pagination with total counts and page jump controls.

### 🔒 3. Authentication & RBAC
- **Strict Role Separation:** Unauthenticated users and students are restricted from accessing mentor controls.
- **Multi-layer Security:** UI-level conditional rendering + Backend `requireMentor` RBAC middleware returning `401 Unauthorized` or `403 Forbidden`.
- **Stateless Performance:** User roles verified via JWT payload without taxing the database on every request.

---

## 📂 Project Structure

```text
project-submission/
├── review-hub-backend/
│   ├── prisma/
│   │   ├── schema.prisma        # Database models & relations
│   │   └── migrations/          # Prisma migrations
│   ├── src/
│   │   ├── lib/                 # Prisma client & Better-Auth configuration
│   │   ├── middlewares/         # Auth & RBAC guard middlewares (requireMentor)
│   │   ├── routes/              # Express API routes (submissions, mentor, auth)
│   │   └── server.ts            # Server entry point
│   ├── package.json
│   └── vercel.json
│
└── review-hub-frontend/
    ├── src/
    │   ├── app/                 # Next.js App Router pages (/, /login, /student, /mentor, /submissions)
    │   ├── components/ui/       # Shared UI components (Navbar, Footer, ShadCN buttons)
    │   ├── modules/             # Modular architecture (auth, student, mentor)
    │   └── lib/                 # Auth client, Axios API client, utils
    ├── package.json
    └── next.config.ts
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
- Node.js (v18+ or v20+)
- PostgreSQL database (or Neon connection string)

### 2. Backend Setup
```bash
cd review-hub-backend
npm install
# Set up .env with DATABASE_URL and BETTER_AUTH_SECRET
npm run build # prisma generate
npm run dev
```

### 3. Frontend Setup
```bash
cd review-hub-frontend
npm install
# Set up .env.local with NEXT_PUBLIC_API_URL and NEXT_PUBLIC_BACKEND_URL
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application locally.

---

## 👨‍💻 Author

- **Name:** Kaowsar Azad
- **GitHub:** [@Kaowsar-Azad](https://github.com/Kaowsar-Azad)
