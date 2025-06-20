import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '../../../lib/prisma'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: 'database',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('SignIn callback:', { user, account, profile });
      // Erlaube Account-Linking wenn Email übereinstimmt
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback:', { url, baseUrl });
      return baseUrl;
    },
    async session({ session, user }) {
      console.log('Session callback:', { session, user });
      return session;
    },
  },
  events: {
    async signIn(message) {
      console.log('SignIn event:', message);
    },
    async signOut(message) {
      console.log('SignOut event:', message);
    },
    async createUser(message) {
      console.log('CreateUser event:', message);
    },
    async updateUser(message) {
      console.log('UpdateUser event:', message);
    },
    async linkAccount(message) {
      console.log('LinkAccount event:', message);
    },
  },
  debug: true,
})