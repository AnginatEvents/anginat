"use client";
import Link from "next/link";
import Navlinks from "./Navlinks";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleHelp, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { signOut } from "next-auth/react";
import LogoCard from "@/components/dashboard/LogoCard";

const Sidenav = () => {
    return (
        <div className="fixed z-0 flex h-full w-72 flex-col justify-between bg-white px-6 ">
            <div>
                <LogoCard />
                <div className="w-full">
                    <Navlinks />
                </div>
            </div>
            <div className="pb-8">
                <Separator />
                <Link
                    href="/help"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "block w-full text-left text-gray-500",
                    )}
                >
                    <CircleHelp className="mr-1 inline" /> Help
                </Link>
                <Button
                    variant={"ghost"}
                    className="block w-full text-left text-gray-500"
                    onClick={() =>
                        signOut({ callbackUrl: "/", redirect: true })
                    }
                >
                    <LogOut className="mr-1 inline" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
};

export default Sidenav;
