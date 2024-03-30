"use client";
import Link from "next/link";
import Navlinks from "./Navlinks";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleHelp, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { signOut } from "next-auth/react";

const Sidenav = () => {
    return (
        <div className="flex h-full w-72 flex-col justify-between ">
            <div className="w-full">
                <Navlinks />
            </div>
            <div>
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
                    onClick={() => signOut()}
                >
                    <LogOut className="mr-1 inline" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
};

export default Sidenav;
