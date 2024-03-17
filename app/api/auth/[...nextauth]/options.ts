import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

export const options: NextAuthOptions = {
    // adapter: FirestoreAdapter({
    //     credential: cert({
    //         projectId: process.env.FIREBASE_PROJECT_ID!,
    //         clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    //         privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    //     }),
    // }),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Your Username",
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Your Password",
                },
            },
            async authorize(credentials) {
                // TODO: Replace this with a real database call
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                const user = {
                    id: "42",
                    name: "JohnDoe",
                    password: "anginat@password",
                };

                if (
                    credentials?.username === user.name &&
                    credentials?.password === user.password
                ) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/sign-in",
        // signOut: "/sign-out",
        //     error: "/auth/error",
        //     verifyRequest: "/auth/verify-request",
        newUser: "/sign-up",
    },
};
