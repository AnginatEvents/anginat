import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    Accordion,
    AccordionTrigger,
    AccordionItem,
    AccordionContent,
} from "@/components/ui/accordion";
import clsx from "clsx";
import { QrCode, Settings, ShieldCheck, UserRoundCheck } from "lucide-react";

interface Link {
    name: string;
    href: string;
    icon?: JSX.Element;
    children: Link[];
}

const links: Link[] = [
    {
        name: "Authenticator",
        href: "",
        icon: <ShieldCheck />,
        children: [
            {
                name: "Single Code",
                href: "/dashboard/authenticator/single",
                children: [],
            },
            {
                name: "Dual Code",
                href: "/dashboard/authenticator/dual",
                // href: "",
                children: [],
            },
        ],
    },
    {
        name: "Registration",
        href: "",
        icon: <UserRoundCheck />,
        children: [
            {
                name: "OnSite",
                href: "/dashboard/registration/onsite",
                // href: "",
                children: [],
            },
            {
                name: "Online",
                // href: "/dashboard/registration/online",
                href: "",
                children: [],
            },
        ],
    },
    {
        name: "Scanning",
        href: "",
        icon: <QrCode />,
        children: [
            {
                name: "Kit Scanning",
                // href: "/dashboard/scanning/kit",
                href: "",
                children: [],
            },
            {
                name: "Meal Scanning",
                // href: "/dashboard/scanning/meal",
                href: "",
                children: [],
            },
            {
                name: "Hall Scanning",
                // href: "/dashboard/scanning/hall",
                href: "",
                children: [],
            },
        ],
    },
    {
        name: "Settings",
        href: "",
        icon: <Settings />,
        children: [],
    },
];

export default function Navlinks() {
    const pathName = usePathname();
    return (
        <Accordion className="w-full" type="single" collapsible>
            <div className=" flex flex-col">
                {links.map((link) => {
                    return (
                        <AccordionItem
                            value={link.name}
                            key={link.name}
                            disabled={link.children.length === 0}
                            className={clsx(
                                "my-2 w-full rounded-lg px-2 hover:bg-secondary",
                                (pathName.includes(link.href) &&
                                    link.href.length > 0) ||
                                    link.children.some(
                                        (child) =>
                                            pathName.includes(child.href) &&
                                            child.href.length > 0,
                                    )
                                    ? "bg-primary text-white hover:bg-slate-800"
                                    : "bg-white text-black hover:bg-secondary",
                            )}
                        >
                            <AccordionTrigger
                                dropIcon={link.children.length > 0}
                            >
                                {link.href.length === 0 ? (
                                    <div className="flex h-5 flex-row gap-2 align-middle">
                                        {link.icon}
                                        {link.name}
                                    </div>
                                ) : (
                                    <Link href={link.href} key={link.name}>
                                        {link.name}
                                    </Link>
                                )}
                            </AccordionTrigger>
                            <AccordionContent>
                                {link.children.map((child) => {
                                    return child.href.length === 0 ? (
                                        <div
                                            className="w-full rounded-l py-2 pl-3 text-gray-500"
                                            key={child.name}
                                        >
                                            {child.name}
                                        </div>
                                    ) : (
                                        <Link
                                            href={child.href}
                                            key={child.name}
                                            className={clsx(
                                                "block w-full rounded-l py-2 pl-3 font-bold",
                                                pathName.includes(child.href)
                                                    ? "bg-slate-700 text-gray-300 hover:bg-slate-700"
                                                    : "text-gray-500 hover:bg-slate-600 hover:text-gray-400",
                                            )}
                                        >
                                            {child.name}
                                        </Link>
                                    );
                                })}
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </div>
        </Accordion>
    );
}
