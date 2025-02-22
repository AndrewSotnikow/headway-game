# 🏆 Headway Game - Who Wants to Be a Millionaire? 🎮

A **Who Wants to Be a Millionaire** quiz game built with **Next.js**, featuring **state persistence**, **error boundaries**, **SCSS styling**, and a modular, scalable architecture.

## 🚀 Getting Started

### **Installation**
Clone the repository and install dependencies:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used
### Frameworks & Libraries
* Next.js 15 - Optimized React framework for SSR, static generation, and API routes.
* React 19 - Latest version of React with concurrent rendering improvements.
* Zustand - Lightweight state management with persistence support.
* Framer Motion - For smooth animations and transitions.
* SASS (SCSS) - Modular styling with BEM methodology.

## Features

### React optimization
* In this scenario, applying advanced React optimizations would be overkill.

### State Persistence
* Uses Zustand persist middleware to retain game progress across page reloads.
* Ensures smooth user experience even if the page refreshes unexpectedly.

### Error Handling & Boundaries
* Implements React Error Boundaries using react-error-boundary.
* Catches runtime errors and prevents the entire app from crashing.

### Modular & Scalable Codebase
* SCSS Modules for better organization and maintainability.
* Component-Based Architecture for reusability and better scalability.

### Developer Experience
* ESLint & Prettier for consistent code formatting.
* Husky + Lint-Staged to enforce linting and testing before commits.
* Jest & React Testing Library for robust unit and integration testing.

### Testing
* Uses Jest and React Testing Library for unit tests.
* Ensures game logic and UI work as expected through automated tests.
