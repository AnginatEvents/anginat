"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/signin?callbackUrl=/dashboard");
        },
    });

    return (
        <div>
            <h1>Dashboard</h1>
            <p>This is the dashboard page</p>
            <p>
                <strong>Session:</strong> {JSON.stringify(session)}
            </p>
        </div>
    );
}
