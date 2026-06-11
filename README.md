# 🎬 CineTrack - Premium Movie Catalog

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=for-the-badge&logo=postgresql&logoColor=white" alt="Neon" />
</div>

<br />

**CineTrack** is a modern, responsive, and robust web application designed for movie enthusiasts to discover, track, and manage their favorite films. Built meticulously with **Clean Architecture** principles, this project demonstrates enterprise-level scalability, secure authentication, and a stunning "Glassmorphism" user interface.

---

## ✨ Highlights & Key Features

### 🔐 Authentication & Security
- **Comprehensive Auth Flow:** Powered by Firebase Authentication, supporting traditional Email/Password login, Google OAuth, and secure Password Reset flows.
- **Route Protection (Middleware):** Next.js Edge Middleware rigorously guards private routes. Unauthenticated users are seamlessly redirected to the login page.
- **Data Isolation:** Watchlists are strictly separated per account (`userId` indexing in the database), ensuring complete privacy and data integrity between users.

### 🏗️ Architecture & Best Practices
- **Clean Architecture:** The codebase is heavily decoupled into layers (Core Domain, Data Sources, Repositories, Use Cases, and Presentation). This ensures business logic is entirely independent of UI and database frameworks.
- **Next.js App Router & Server Actions:** Leverages Next.js 16 features like Server Components for optimal SEO/performance, and Server Actions for seamless, zero-API-route database mutations.
- **Lazy Prisma Instantiation:** Custom proxy-based lazy loading of the Prisma Client to ensure serverless edge environments (like Vercel) compile cleanly without premature database connections.

### 🎨 Premium UI/UX
- **Pro-Max Aesthetics:** Features a highly polished, responsive "Glassmorphism" design with backdrop filters, subtle micro-animations, and dynamic hover states.
- **Internationalization (i18n):** Full bilingual support (English & Indonesian) managed via a highly optimized React Context.
- **Dark Mode Support:** Built-in dynamic theme toggling (Light, Dark, System preferences) utilizing Tailwind's modern `dark:` classes.

### 🎬 Dynamic Data & Storage
- **TMDB API Integration:** Fetches real-time movie catalogs, search results, genres, and rich media (posters, backdrops) directly from The Movie Database.
- **Serverless PostgreSQL:** Uses **Neon Database** alongside `@prisma/adapter-neon` for lightning-fast, highly-available cloud database storage without connection pooling limits.

---

## 🏗️ Project Architecture

This project strictly adheres to **Clean Architecture** to maintain high testability and separation of concerns:

```text
src/
├── core/                  # 🟢 DOMAIN LAYER (Innermost)
│   ├── entities/          # Pure TypeScript business models (Movie, Watchlist)
│   ├── repositories/      # Interfaces (Contracts) defining data operations
│   └── usecases/          # Application business rules (e.g., SearchMoviesUseCase)
│
├── data/                  # 🔵 DATA LAYER
│   ├── repositories/      # Concrete implementations of core repository interfaces
│   └── sources/           # External API wrappers (TMDB API source)
│
├── presentation/          # 🟡 PRESENTATION LAYER
│   ├── components/        # Reusable React UI elements (Auth, Layout, Buttons)
│   └── contexts/          # React Contexts (Language, Authentication)
│
├── app/                   # 🟣 NEXT.JS APP ROUTER
│   ├── (auth)/            # Guest-only routing logic (Login, Register)
│   ├── (main)/            # Protected app routes (Discover, Watchlist, Details)
│   │   └── actions/       # Next.js Server Actions (Database CRUD)
│   └── layout.tsx         # Global layout and providers wrapper
│
├── lib/                   # 🛠️ UTILITIES & CONFIG
│   ├── firebase.ts        # Firebase initialization & exports
│   └── prisma.ts          # Lazy-loaded Prisma Client + Neon adapter
│
└── middleware.ts          # 🛡️ EDGE MIDDLEWARE (Route protection)
```

---

## 🛠️ Tech Stack

| Domain | Technology / Tool |
|---|---|
| **Framework** | Next.js 16 (App Router, Server Actions, Turbopack) |
| **Frontend UI** | React 19, Tailwind CSS v4, Lucide Icons |
| **Authentication** | Firebase Auth (Client-side tracking & Server-side cookies) |
| **Database** | Neon Serverless PostgreSQL |
| **ORM** | Prisma v7 (with `@prisma/adapter-neon`) |
| **External APIs**| The Movie Database (TMDB) REST API |
| **Deployment** | Vercel (Edge network optimized) |

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
- **Node.js** (v18 or higher)
- **Firebase Project** ([console.firebase.google.com](https://console.firebase.google.com))
- **TMDB API Key** ([themoviedb.org](https://www.themoviedb.org/settings/api))
- **Neon Database** ([neon.tech](https://neon.tech))

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
   Rename the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your specific API keys and connection strings:
   ```env
   # Database (Neon PostgreSQL)
   DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

   # TMDB API
   TMDB_API_KEY="your_tmdb_api_key"

   # Firebase Config
   NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_project.firebasestorage.app"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
   NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"
   ```

4. **Initialize the Database**
   Push the Prisma schema to your remote Neon database:
   ```bash
   npx prisma db push
   ```

5. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🌐 Deployment (Vercel)

CineTrack is fully optimized for Vercel deployment.

1. Push your local code to your GitHub repository.
2. Import the project into your [Vercel Dashboard](https://vercel.com).
3. Copy all the environment variables from your `.env.local` into the **Environment Variables** settings in Vercel.
4. Click **Deploy**. Vercel will automatically handle the build process, generate the Prisma client via the `postinstall` script, and deploy your site to their edge network.

> ⚠️ **Important Note:** Ensure `DATABASE_URL` is pointing directly to your Neon connection string. The application will securely connect to the database via Next.js Server Actions.

---

## 📸 Screenshots

*(Add screenshots of your application here—such as the login screen, discover page, movie details, and dark mode interface).*

---

<div align="center">
  <p>Created with ❤️ by <b>Anang Aprilyanto</b></p>
  <p><i>A showcase of modern web development and software architecture.</i></p>
</div>
