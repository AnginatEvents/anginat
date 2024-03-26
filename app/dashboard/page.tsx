"use client";

import { useSession } from "next-auth/react";

export default function Page() {
    const session = useSession();

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
