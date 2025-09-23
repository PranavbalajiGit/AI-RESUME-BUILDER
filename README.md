```bash
## 📝 AI Resume Builder

An AI-powered Resume Builder that helps users create professional resumes tailored to their job title and experience level. The application integrates AI text generation, secure authentication, and a full-stack setup with a modern frontend and backend.

## 🚀 Features

🔑 User Authentication – Secure login and signup using Clerk.

🖋️ AI-Powered Resume Suggestions – Generate resume summaries and experience suggestions using Google Gemini API.

📂 Resume Management – Create, update, and store multiple resumes.

💾 Database Integration – Resume data stored in MySQL through Strapi backend.

🎨 Interactive UI – Built with React, TailwindCSS, and ShadCN UI components.

⚡ REST API with Strapi – Easily extendable and customizable backend.

🛠️ Tech Stack
🔹 Frontend

React.js
 – Component-based UI

Vite
 – Fast development bundler

TailwindCSS
 – Utility-first styling

ShadCN UI
 – Modern UI components

Axios
 – API communication

Clerk
 – Authentication and user management

🔹 Backend

Strapi
 – Headless CMS backend

MySQL
 – Relational database

Knex
 (through Strapi ORM)

🔹 AI Integration

## Google Generative AI (Gemini)
 – AI-powered text generation for resume summaries

## ⚙️ Project Structure

ai-resume-builder/
│── backend/               # Strapi backend
│   ├── config/            # DB & API configurations
│   ├── src/api/           # Resume APIs
│   └── ...
│
│── frontend/              # React frontend
│   ├── src/
│   │   ├── dashboard/     # Dashboard pages & components
│   │   ├── service/       # API & AI service handlers
│   │   └── context/       # Global state (Resume context)
│   └── ...
│
└── README.md

## ⚡ Getting Started
1️⃣ Clone the repo
git clone https://github.com/your-username/ai-resume-builder.git
cd ai-resume-builder

2️⃣ Setup Backend (Strapi)
cd backend
npm install
npm run develop


Configure .env with:

DATABASE_CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=ai_resume
DATABASE_USERNAME=root
DATABASE_PASSWORD=yourpassword
STRAPI_API_KEY=your_strapi_api_key

## 3️⃣ Setup Frontend (React + Vite)
cd frontend
npm install
npm run dev


Configure .env with:

VITE_STRAPI_API_KEY=your_strapi_api_key
VITE_GOOGLE_AI_API_KEY=your_gemini_api_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key

## 🔗 API Endpoints (Strapi)

POST /api/user-resumes → Create new resume

GET /api/user-resumes?filters[userEmail][$eq]=email → Get user resumes

PUT /api/user-resumes/:id → Update resume details


## 🎯 Future Enhancements

Export resumes as PDF/Docx

Deploy backend on Railway/Render and frontend on Vercel

Add custom AI prompts for cover letter generation

Support for multiple templates

