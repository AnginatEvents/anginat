import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { FC } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

interface LogOutCardProps {
    name?: string | null | undefined;
    email?: string | null | undefined;
    avatarURL?: string | null | undefined;
}

const LogOutCard: FC<LogOutCardProps> = (props) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Avatar>
                    <AvatarImage src={props.avatarURL!} alt="User Avatar" />
                    <AvatarFallback>
                        {Array.from(props.name!)[0]}
                    </AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent align="end" className="container">
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
                            <div className="text-xs text-gray-400">
                                {props.email}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-1 p-2">
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
            </PopoverContent>
        </Popover>
    );
};

export default LogOutCard;
