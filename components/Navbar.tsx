"use client";
import Link from "next/link";
import { Infinity } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import LogOutCard from "@/components/ui/logout-card";

const Navbar = () => {
    const session = useSession();

    return (
        <div className="fixed top-0 z-10 h-16 w-full border-b border-s-zinc-500 bg-zinc-200 py-2">
            <div className="container flex items-center justify-between">
                <Link href="/">
                    <Infinity strokeWidth="3px" size="48px" />
                </Link>
                {session.status == "authenticated" ? (
                    <LogOutCard
                        name={session.data?.user?.name}
                        avatarURL={session.data?.user?.image}
                        email={session.data.user?.email}
                    />
                ) : (
                    <div className="space-x-1">
                        <Link
                            className={buttonVariants({ variant: "default" })}
                            href="/sign-in"
                        >
                            Sign In
                        </Link>
                        <Link
                            className={buttonVariants({ variant: "default" })}
                            href="/sign-up"
                        >
                            Sign up
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
