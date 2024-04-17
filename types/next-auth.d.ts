import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            role: "basic" | "premium" | "admin" | undefined | null;
            id: string;
        } & DefaultSession["basic"];
    }
    interface User extends DefaultUser {
        role: "basic" | "premium" | "admin" | undefined | null;
    }
}
