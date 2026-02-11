// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import admin from 'firebase-admin'

/*Firebase auth*/
declare module 'next-auth' {
  interface Session {
    user: {
      email?: string
      admin: boolean
    }
  }
}

// Init Admin SDK ONCE
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60, // 30 minutes in seconds 
  },
  providers: [
    Credentials({
      name: 'Firebase Admin Login',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        try {
          // 🔥 Verify user via Firebase REST API
          const res = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
                returnSecureToken: true,
              }),
            }
          )

          if (!res.ok) return null

          const data = await res.json()

          // 🔐 Verify claims server-side
          const decoded = await admin.auth().verifyIdToken(data.idToken)

          if (!decoded.admin) {
            throw new Error('Not an admin')
          }

          return {
            id: decoded.uid,
            email: decoded.email,
            admin: true,
          }
        } catch (err) {
            console.log("Error in firebase auth route.ts", err)
            return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.admin = (user as { admin?: boolean }).admin
      }
      return token
    },
    async session({ session, token }) {
      session.user.admin = token.admin as boolean
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }