import Link from "next/link";
import {
    Accordion,
    AccordionTrigger,
    AccordionItem,
    AccordionContent,
} from "@/components/ui/accordion";

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
                href: "/dashboard/registration/onsite",
                children: [],
            },
            {
                name: "Online",
                href: "/dashboard/registration/online",
                children: [],
            },
        ],
    },
    {
        name: "Scanning",
        href: "/dashboard/scanning",
        children: [
            {
                name: "Kit Scanning",
                href: "/dashboard/scanning/kit",
                children: [],
            },
            {
                name: "Meal Scanning",
                href: "/dashboard/scanning/meal",
                children: [],
            },
            {
                name: "Hall Scanning",
                href: "/dashboard/scanning/hall",
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
    return (
        <Accordion type="single" collapsible>
            <div className=" flex flex-col">
                {links.map((link) => {
                    return (
                        <AccordionItem
                            value={link.name}
                            key={link.name}
                            disabled={link.children.length === 0}
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
                                        <div className="w-full">
                                            {child.name}
                                        </div>
                                    ) : (
                                        <Link
                                            href={child.href}
                                            key={child.name}
                                            className="block w-full"
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
