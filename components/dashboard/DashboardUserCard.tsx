"use client";

import { useSession } from "next-auth/react";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function SkeletonDemo() {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-3 w-[150px]" />
            </div>
        </div>
    );
}

const DashboardUserCard = () => {
    const session = useSession();

    // TESTING STRUCT
    // const session = {
    //     data: {
    //         user: {
    //             name: "John Doe",
    //             email: "jdoe23@gmail.com",
    //             image: "https://lh3.googleusercontent.com/a/ACg8ocJz3yKkp6O-4z4gePUozA9Og0FGu-HE3OU7T9EjBbP4Rw=s96-c",
    //         },
    //         expires: "2024-04-30T12:20:07.983Z",
    //     },
    //     status: "authenticated",
    //     status: "loading",
    // };
    //
    return session.status === "loading" ? (
        <SkeletonDemo />
    ) : (
        <div className="flex items-center space-x-4">
            <Avatar>
                <AvatarImage
                    // intentionally throws error here sometimes
                    src={session.data?.user?.image!}
                    alt="User Avatar"
                />
                <AvatarFallback>{session.data?.user?.name![0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
                <div className="text-lg">{session.data?.user?.name}</div>
                <p className="text-s pb-1.5 text-gray-500">
                    {session.data?.user?.email}
                </p>
            </div>
        </div>
    );
};

export default DashboardUserCard;
