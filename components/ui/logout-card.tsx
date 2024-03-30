import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { FC } from "react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";

interface LogOutCardProps {
    name?: string | null | undefined;
    email?: string | null | undefined;
    avatarURL?: string | null | undefined;
}

const LogOutCard: FC<LogOutCardProps> = (props) => {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <Avatar>
                    <AvatarImage src={props.avatarURL!} alt="User Avatar" />
                    <AvatarFallback>
                        {Array.from(props.name!)[0]}
                    </AvatarFallback>
                </Avatar>
            </HoverCardTrigger>
            <HoverCardContent align="end" className="container">
                <div>
                    <div className="flex gap-2">
                        <Avatar>
                            <AvatarImage
                                src={props.avatarURL!}
                                alt="User Avatar"
                            />
                            <AvatarFallback>
                                {Array.from(props.name!)[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <div>{props.name}</div>
                            <div className="text-gray-400 text-xs">
                                {props.email}
                            </div>
                        </div>
                    </div>
                    <div className="p-2 flex gap-1">
                        <Link
                            className={buttonVariants({
                                size: "sm",
                                variant: "default",
                            })}
                            href="/dashboard"
                        >
                            Go to Dashboard
                        </Link>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => signOut()}
                        >
                            Sign out
                        </Button>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};

export default LogOutCard;
