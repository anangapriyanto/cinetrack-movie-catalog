# 🎬 CineTrack - Movie Catalog (Pro Edition)

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

CineTrack is a premium, responsive web application designed for movie enthusiasts to discover, track, and manage their favorite films. Built with modern web technologies, it features a sleek "Glassmorphism" UI design, seamless animations, and robust authentication.

## ✨ Key Features

- **🔐 Secure Authentication:** Full authentication flow using Firebase (Email/Password & Google OAuth).
- **🎨 "Pro Max" UI/UX:** Stunning glassmorphism design, smooth micro-animations, and fully responsive layouts.
- **🛡️ Protected Routes:** Next.js middleware ensuring secure access control between guest and authenticated areas.
- **🎬 TMDB Integration:** Real-time movie data discovery powered by The Movie Database (TMDB) API.
- **💾 Local Database:** Watchlist and user profile management using Prisma ORM with SQLite (libSQL).
- **🔑 Session Management:** Enterprise-grade session handling with automatic invalidation and graceful redirects.
- **✉️ Forgot Password:** Fully integrated Firebase password reset flow.

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React 19, Tailwind CSS v4
- **Backend/Auth:** Firebase Authentication
- **Database:** SQLite (via `@libsql/client`)
- **ORM:** Prisma
- **APIs:** TMDB API

## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase Project
- TMDB API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/USERNAME_ANDA/cinetrack-movie-catalog.git
   cd cinetrack-movie-catalog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Rename `.env.example` to `.env.local` and fill in your API keys:
   ```bash
   cp .env.example .env.local
   ```
   *Note: You need to provide your own Firebase configuration and TMDB API key.*

4. **Set up the Database**
   Push the Prisma schema to your local SQLite database:
   ```bash
   npx prisma db push
   ```

5. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

- `src/app`: Next.js App Router (Pages, Layouts, API Routes).
- `src/presentation/components`: Reusable React components (Auth Forms, Sidebar, etc).
- `src/presentation/contexts`: React Context providers (AuthContext, LanguageContext).
- `src/lib`: Core utilities (Firebase config, Prisma client).
- `prisma/`: Database schema configuration.

## 📸 Screenshots
*(You can add your project screenshots here later)*

---
*Created with ❤️ by Anang Aprilyanto*
