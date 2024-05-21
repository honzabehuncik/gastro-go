import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
 
const prisma = new PrismaClient()
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
        profile(profile) {
            const validRoles = ["admin", "user", "restaurant", "driver"];
            const role = validRoles.includes(profile.role) ? profile.role : "user";
            return { role: role };
            }
        })
    ],
    callbacks: {
        session({ session, user }) {
        session.user.role = user.role
        return session
        }
    }
})