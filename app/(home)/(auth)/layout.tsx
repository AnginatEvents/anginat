"use client";
import AuthSkeleton from "@/components/skeletons/AuthSkeleton";
import { Infinity } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const session = useSession();

    // Redirect to dashboard if user is authenticated on all auth routes
    if (session.status === "authenticated") {
        redirect("/");
    }

    return (
        <div className="flex h-full w-full flex-row items-center justify-center md:justify-between">
            <div className="hidden flex-col items-center justify-center px-20 text-center md:block">
                <Infinity size={200} />
                <p className="text-4xl">Anginat</p>
            </div>
            <div className="w-full rounded-md bg-gray-100 px-10 py-10 sm:w-96">
                {session.status === "loading" ? <AuthSkeleton /> : children}
            </div>
        </div>
    );
};

export default Layout;
