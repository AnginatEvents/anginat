import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { DynamoDBAdapter } from "@next-auth/dynamodb-adapter";
import { verifyUser } from "@/lib/db/dynamo_conn";

const dynamoConfig: DynamoDBClientConfig = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
    region: process.env.AWS_REGION as string,
};

const dynamoClient = DynamoDBDocument.from(new DynamoDB(dynamoConfig), {
    marshallOptions: {
        convertEmptyValues: true,
        removeUndefinedValues: true,
        convertClassInstanceToMap: true,
    },
});

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            async profile(profile) {
                // TODO: Role should be fetched from the database
                let userRole = "basic";
                if (profile.email === "nishant.mishra550@gmail.com") {
                    userRole = "admin";
                }
                const roleProfile = {
                    role: userRole,
                    id: profile.sub,
                    firstName: profile.given_name,
                    email: profile.email,
                    image: profile.picture,
                    ...profile,
                };

                return roleProfile;
            },
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.error("Authorize: Credentials not provided");
                    return null;
                }
                const userdata = await verifyUser(
                    credentials.email,
                    credentials.password,
                );
                // Returning null means the credentials are invalid
                if (!userdata) {
                    return null;
                }
                const user = {
                    name: userdata.name,
                    email: userdata.email,
                    image: userdata.image ?? null,
                    role: userdata.role,
                    id: userdata.id,
                };
                return user;
            },
        }),
    ],
    adapter: DynamoDBAdapter(dynamoClient, { tableName: "user-auth" }),
    session: { strategy: "jwt" },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role ?? "basic";
            }
            return token;
        },
        async session({ session, token, user }) {
            if (session?.user) {
                session.user.role = token?.role ?? "basic";
                session.user.id = token?.id;
            }
            return session;
        },
    },
    pages: {
        signIn: "/sign-in",
        // signOut: "/sign-out",
        //     error: "/auth/error",
        //     verifyRequest: "/auth/verify-request",
        newUser: "/sign-up",
    },
};
