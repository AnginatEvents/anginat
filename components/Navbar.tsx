"use client";
import Link from "next/link";
import { Infinity } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const session = useSession();
    return (
        <div className="bg-zinc-200 py-2 border-b border-s-zinc-500 fixed w-full z-10 top-0">
            <div className="container items-center flex justify-between">
                <Link href="/">
                    <Infinity strokeWidth="3px" size="48px" />
                </Link>
                {session.status == "authenticated" ? (
                    <Button onClick={() => signOut()}>Sign out</Button>
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
