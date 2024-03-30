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
                                        <div className="pl-3 w-full">
                                            {child.name}
                                        </div>
                                    ) : (
                                        <Link
                                            href={child.href}
                                            key={child.name}
                                            className="block pl-3 w-full"
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
