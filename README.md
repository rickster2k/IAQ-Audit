# IAQ Audit Web App

## Purpose

A free tool for users to generate an Indoor Air Quality (IAQ) report for their home, with an optional premium professional review.

---

## Context

The project was initially prototyped in Google AI Studio — browser-only, using `localStorage`, with several features incomplete. The codebase was migrated into a fresh Next.js project, preserving the original UI components while rebuilding the architecture properly: Firebase + Firestore as the backend, Admin SDK only (no client-side SDK), and a CI/CD pipeline deployed via Google Cloud Run.

---

## Getting Started

### Prerequisites

Create a `.env.local` file in the project root with the following variables:
```env
# AI
API_KEY                               # Gemini API key

# Email (Resend)
RESEND_API_KEY
RESEND_FROM_EMAIL

# Firebase (Client)
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

# Firebase (Admin SDK)
FIREBASE_ADMIN_PROJECT_ID
FIREBASE_ADMIN_CLIENT_EMAIL
FIREBASE_ADMIN_PRIVATE_KEY
FIREBASE_STORAGE_BUCKET

# App
NODE_ENV
NEXT_PUBLIC_APP_URL
NEXTAUTH_URL
NEXTAUTH_SECRET
```

### Running Locally

Clone the repository and install dependencies, then:

**Development**
```bash
npm run dev
```

**Production**
```bash
npm run build
npm run start-standalone
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

Live at **[www.iaqaudit.com](http://www.iaqaudit.com)** via domain mapping on a Google Cloud Run service.

Deployments are automated — any push to the `main` branch triggers the CI/CD pipeline and deploys the latest build to Cloud Run.
