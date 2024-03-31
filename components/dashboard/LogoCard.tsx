import { Infinity } from "lucide-react";
import Link from "next/link";

const LogoCard = () => {
    return (
        <Link
            href="/dashboard"
            className="flex items-center gap-3 py-4 pl-2 align-middle"
        >
            <Infinity size="48px" strokeWidth="3px" />
            <strong className="text-4xl">Anginat</strong>
        </Link>
    );
};

export default LogoCard;
