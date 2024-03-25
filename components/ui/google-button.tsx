import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

export function GoogleButton() {
    const onClick = () => {
        signIn("google", {
            callbackUrl: "/",
        });
    };
    return (
        <Button className="w-full" variant="outline" onClick={() => onClick()}>
            <Image src="google.svg" width={20} height={20} alt="Google Logo" />
            <span>Sign in with Google</span>
        </Button>
    );
}
