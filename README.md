# 🎬 CineTrack - Movie Catalog

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=for-the-badge&logo=postgresql&logoColor=white)

CineTrack is a premium, responsive web application designed for movie enthusiasts to discover, track, and manage their favorite films. Built with **Clean Architecture** principles, it features a sleek Glassmorphism UI design, seamless animations, and robust authentication.

## ✨ Key Features

- **🔐 Secure Authentication:** Full authentication flow using Firebase (Email/Password & Google OAuth).
- **🎨 Premium UI/UX:** Stunning glassmorphism design, smooth micro-animations, and fully responsive layouts.
- **🛡️ Protected Routes:** Next.js middleware ensuring secure access control between guest and authenticated areas.
- **🎬 TMDB Integration:** Real-time movie data discovery powered by The Movie Database (TMDB) API.
- **💾 Cloud Database:** Watchlist management using Prisma ORM with Neon PostgreSQL (serverless).
- **🔑 Session Management:** Enterprise-grade session handling with automatic invalidation and graceful redirects.
- **✉️ Forgot Password:** Fully integrated Firebase password reset flow.

## 🏗️ Architecture

This project follows **Clean Architecture** principles with a clear separation of concerns:

```
src/
├── core/                  # Domain Layer (innermost)
│   ├── entities/          # Business models (Movie, etc.)
│   ├── repositories/      # Repository interfaces (contracts)
│   └── usecases/          # Business logic (GetDiscoveryMovies, SearchMovies, etc.)
│
├── data/                  # Data Layer
│   ├── repositories/      # Repository implementations
│   └── sources/           # External data sources (TMDB API)
│
├── presentation/          # Presentation Layer (outermost)
│   ├── components/        # React UI components
│   └── contexts/          # React Context providers (Auth, Theme, Language)
│
├── app/                   # Next.js App Router
│   ├── (auth)/            # Guest-only routes (Login, Register, Forgot Password)
│   ├── (main)/            # Protected routes (Home, Discover, Watchlist, Movie Details)
│   │   └── actions/       # Server Actions (Watchlist CRUD)
│   └── layout.tsx         # Root layout with providers
│
├── lib/                   # Utilities (Firebase config, Prisma client)
└── middleware.ts          # Route protection middleware
```

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **UI** | React 19, Tailwind CSS v4 |
| **Authentication** | Firebase Authentication |
| **Database** | Neon PostgreSQL (serverless) |
| **ORM** | Prisma |
| **API** | TMDB API |
| **Deployment** | Vercel |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- Firebase Project ([console.firebase.google.com](https://console.firebase.google.com))
- TMDB API Key ([themoviedb.org](https://www.themoviedb.org/settings/api))
- Neon Database ([neon.tech](https://neon.tech)) — for production/cloud database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anangapriyanto/cinetrack-movie-catalog.git
   cd cinetrack-movie-catalog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and fill in your credentials:
   ```env
   # Database (Neon PostgreSQL)
   DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

   # TMDB API
   TMDB_API_KEY="your_tmdb_api_key"

   # Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_project.firebasestorage.app"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
   NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"
   ```

4. **Set up the Database**
   Push the Prisma schema to your Neon database:
   ```bash
   npx prisma db push
   ```

5. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment (Vercel)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add all environment variables from `.env.example` in **Settings → Environment Variables**
4. Deploy — Vercel will automatically build and deploy your app

> **Note:** Make sure `DATABASE_URL` points to your Neon PostgreSQL connection string, not a local SQLite file.

## 📸 Screenshots
*(Coming soon)*

---
*Created with ❤️ by Anang Aprilyanto*
