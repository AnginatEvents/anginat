import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    Accordion,
    AccordionTrigger,
    AccordionItem,
    AccordionContent,
} from "@/components/ui/accordion";
import clsx from "clsx";

interface Link {
    name: string;
    href: string;
    children: Link[];
}

const links: Link[] = [
    {
        name: "Authenticator",
        href: "",
        children: [
            {
                name: "Single Code",
                href: "/dashboard/authenticator/single",
                children: [],
            },
            {
                name: "Dual Code",
                // href: "/dashboard/authenticator/dual",
                href: "",
                children: [],
            },
        ],
    },
    {
        name: "Registration",
        href: "",
        children: [
            {
                name: "OnSite",
                // href: "/dashboard/registration/onsite",
                href: "",
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
                                "w-full hover:bg-secondary",
                                pathName.startsWith(link.href) &&
                                    link.href.length > 0
                                    ? "hover:bg-primary-500 bg-primary text-white"
                                    : "bg-white text-black hover:bg-secondary",
                            )}
                        >
                            <AccordionTrigger>
                                {link.href.length === 0 ? (
                                    <div>{link.name}</div>
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
                                            className="w-full py-2 pl-3"
                                            key={child.name}
                                        >
                                            {child.name}
                                        </div>
                                    ) : (
                                        <Link
                                            href={child.href}
                                            key={child.name}
                                            className={clsx(
                                                "block w-full py-2 pl-2",
                                                pathName.includes(child.href)
                                                    ? "bg-primary text-white"
                                                    : "bg-white text-black",
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
