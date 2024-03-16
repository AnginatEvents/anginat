import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";

export function GoogleButton() {
    return (
        <Button className="w-full " variant="outline">
            <Image src="google.svg" width={20} height={20} alt="Google Logo" />
            <span>Sign in with Google</span>
        </Button>
    );
}
